# Serpent Seas — Python runner harness (runs inside Pyodide)
import sys, io, os, json, builtins, traceback, random, tempfile

MAX_OUT = 20000


class _OutputLimit(Exception):
    pass


class _Capture(io.TextIOBase):
    def __init__(self):
        self.parts = []
        self.size = 0

    def write(self, s):
        s = str(s)
        self.size += len(s)
        if self.size > MAX_OUT:
            self.parts.append(s[: max(0, MAX_OUT - (self.size - len(s)))])
            raise _OutputLimit()
        self.parts.append(s)
        return len(s)

    def getvalue(self):
        return "".join(self.parts)


def _err_info(e, code):
    lines = code.splitlines()
    etype = type(e).__name__
    lineno = None
    if isinstance(e, SyntaxError):
        lineno = e.lineno
        msg = e.msg
    else:
        msg = str(e)
        for fr in traceback.extract_tb(e.__traceback__):
            if fr.filename == "main.py":
                lineno = fr.lineno
    text = ""
    if lineno and 0 < lineno <= len(lines):
        text = lines[lineno - 1]
    return {"type": etype, "msg": msg, "line": lineno, "text": text}


def _fresh_dir(setup):
    d = tempfile.mkdtemp(prefix="run_", dir="/tmp")
    os.chdir(d)
    if setup:
        exec(compile(setup, "setup.py", "exec"), {"__name__": "__setup__"})


def _execute(code, stdin_lines, setup=""):
    _fresh_dir(setup)
    cap = _Capture()
    feed = iter(stdin_lines or [])

    def _input(prompt=""):
        cap.write(str(prompt))
        try:
            v = next(feed)
        except StopIteration:
            raise EOFError("input() wanted a line, but the Input box is empty")
        cap.write(v + "\n")
        return v

    ns = {"__name__": "__main__", "__builtins__": builtins}
    old_out, old_err, old_input = sys.stdout, sys.stderr, builtins.input
    sys.stdout = cap
    sys.stderr = cap
    builtins.input = _input
    err = None
    try:
        exec(compile(code, "main.py", "exec"), ns)
    except _OutputLimit:
        err = {"type": "OutputLimit", "msg": "", "line": None, "text": ""}
    except SystemExit:
        pass
    except BaseException as e:  # noqa
        err = _err_info(e, code)
    finally:
        sys.stdout, sys.stderr, builtins.input = old_out, old_err, old_input
    return cap.getvalue(), err, ns


def run_code(code, stdin_json, setup=""):
    out, err, _ = _execute(code, json.loads(stdin_json), setup)
    return json.dumps({"out": out, "err": err})


def _norm(s):
    return " ".join(str(s).strip().lower().split())


def _capture_call(fn, *a, **k):
    """Call fn and return (result, printed_text)."""
    cap = _Capture()
    old = sys.stdout
    sys.stdout = cap
    try:
        r = fn(*a, **k)
    finally:
        sys.stdout = old
    return r, cap.getvalue()


class _feed:
    """Context manager that feeds lines to input() while a check calls user code."""
    def __init__(self, *lines):
        self.lines = iter(lines)
    def __enter__(self):
        self.old = builtins.input
        builtins.input = lambda prompt="": next(self.lines)
        return self
    def __exit__(self, *a):
        builtins.input = self.old


def check_code(code, tests_json):
    tests = json.loads(tests_json)
    results = []
    first_out, first_err = None, None
    for i, t in enumerate(tests):
        random.seed(t.get("seed", 1234))
        out, err, ns = _execute(code, t.get("stdin", []), t.get("setup", ""))
        if first_out is None:
            first_out, first_err = out, err
        lines = [l.rstrip() for l in out.splitlines()]
        env = {
            "out": out,
            "lines": lines,
            "clean": [l.strip() for l in lines if l.strip()],
            "ns": ns,
            "err": err,
            "code": code,
            "norm": _norm,
            "capture": _capture_call,
            "feed": _feed,
        }
        ok = True
        detail = None
        if err and not t.get("allow_error"):
            ok = False
            detail = "error"
        else:
            try:
                exec(t["check"], env)
            except AssertionError as a:
                ok = False
                detail = str(a) or None
            except Exception as x:  # noqa
                ok = False
                detail = type(x).__name__ + ": " + str(x)
        results.append({"ok": ok, "detail": detail, "err": err})
        if not ok:
            break
    return json.dumps({"results": results, "out": first_out or "", "err": first_err})
