/* Serpent Seas — Python worker. Runs learner code in Pyodide off the main thread,
   so a runaway loop can be stopped by terminating the worker. */
importScripts("pyodide/pyodide.js");

let py = null;
const ready = (async () => {
  const base = new URL("pyodide/", self.location.href).href;
  py = await loadPyodide({ indexURL: base, stdLibURL: base + "python_stdlib.zip.wasm" });
  const src = await (await fetch(new URL("harness.py", self.location.href).href)).text();
  py.runPython(src);
  self.postMessage({ type: "ready" });
})().catch((e) => {
  self.postMessage({ type: "fatal", msg: String(e && e.message ? e.message : e) });
  throw e;
});

self.onmessage = async (e) => {
  const { id, mode, code, stdin, tests, setup } = e.data;
  try {
    await ready;
    self.postMessage({ type: "started", id });
    let raw;
    if (mode === "check") raw = py.globals.get("check_code")(code, JSON.stringify(tests || []));
    else raw = py.globals.get("run_code")(code, JSON.stringify(stdin || []), setup || "");
    self.postMessage({ type: "result", id, data: JSON.parse(raw) });
  } catch (x) {
    self.postMessage({ type: "result", id, data: { internal: String(x && x.message ? x.message : x) } });
  }
};
