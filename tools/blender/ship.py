"""Serpent galleon. Kenney-compatible proportions (units x2.6 = metres in the harbor):
main deck y=2.1 (z -4.1..1.2), quarterdeck y=3.5 (stern), forecastle y=2.8 (bow),
stairs at |x| 0.85..1.6, gangway gaps both sides at z -2.3..-1.3, hatch grate at z -2.5..-1.5."""
import sys, math, random
sys.path.insert(0, "/home/claude/work/blender")
from lib import *

reset()
HULL = mat("hull", 0.85); HULL.use_backface_culling = False
WOODM = mat("wood", 0.9)
SAILM = mat("sail", 0.95); SAILM.use_backface_culling = False
FLAGM = mat("flag", 0.9); FLAGM.use_backface_culling = False
GLOW = mat("glow", 0.6, emit="#ffcf6a")
METAL = mat("metal", 0.45, 0.6)

def smooth(e0, e1, x):
    t = min(max((x - e0) / (e1 - e0), 0), 1); return t * t * (3 - 2 * t)
def W(z):
    if z <= -4: return 2.05 + (z + 6.4) * (0.35 / 2.4)
    if z <= 1.5: return 2.4
    return max(0.12, 2.4 * math.sqrt(max(0, 1 - ((z - 1.5) / 5.05) ** 2)))
def BOT(z): return 0.12 + 0.55 * smooth(-3.5, -6.4, z) + 1.4 * smooth(3.0, 6.4, z) ** 1.5
def SHEER(z):
    if -2.3 <= z <= -1.3: return 2.13          # gangway openings
    s = 2.62
    s += (4.06 - 2.62) * smooth(-2.95, -4.5, z)  # quarterdeck bulwark
    s += (3.32 - 2.62) * smooth(0.9, 1.8, z)     # forecastle bulwark
    s += 0.35 * smooth(4.5, 6.4, z)              # bow rises
    return s

ZS = [-6.4, -6.1, -5.6, -5.0, -4.5, -4.1, -3.7, -3.3, -2.95, -2.3001, -2.3, -1.8, -1.3, -1.2999, -0.6, 0.2, 0.9, 1.35, 1.8, 2.6, 3.4, 4.2, 4.9, 5.5, 6.0, 6.4]

def section(z):
    w, b, s = W(z), BOT(z), SHEER(z)
    def hw(y):
        if y >= 2.0: return w * (1 - 0.015 * (y - 2.0))
        t = max(0.0, min(1.0, (y - b) / max(0.05, 2.0 - b)))
        return w * (1 - (1 - t) ** 2.4) ** 0.55
    levels = [0.95, 1.12, 1.45, 1.72, 1.98, s - 0.1, s]
    out = [(0, b), (hw(b + 0.04) * 0.55, b + 0.04)]
    last = b + 0.04
    for y in levels:
        if y <= last + 0.02: continue
        out.append((hw(y), y)); last = y
    if out[-1][1] < s - 0.001: out.append((hw(s), s))
    return out

def section_full(z):
    out = section(z)
    left = [(-x, y) for x, y in reversed(out)]
    return left + out[1:]

def resample(pts, n):
    # keep the keel and the top, fill the middle so every section has the same count
    while len(pts) < n:
        # split the longest segment
        k = max(range(len(pts) - 1), key=lambda i: (pts[i+1][1]-pts[i][1]))
        a, b2 = pts[k], pts[k + 1]
        pts.insert(k + 1, ((a[0] + b2[0]) / 2, (a[1] + b2[1]) / 2))
    return pts
NP = max(len(section(z)) for z in ZS)
def section_eq(z):
    out = resample(section(z), NP)
    left = [(-x, y) for x, y in reversed(out)]
    return left + out[1:]
secs = [section_eq(z) for z in ZS]
verts, faces = [], []
n = len(secs[0])
for zi, z in enumerate(ZS):
    for (x, y) in secs[zi]: verts.append((x, y, z))
for zi in range(len(ZS) - 1):
    for k in range(n - 1):
        a = zi * n + k; faces.append([a, a + 1, a + 1 + n, a + n])
# transom (stern) and bow caps
faces.append(list(range(0, n))[::-1])
faces.append([ (len(ZS) - 1) * n + k for k in range(n)])

def hull_col(c, nrm):
    y, z = c.y, c.z
    s = SHEER(min(max(z, -6.4), 6.4))
    if abs(nrm.z) > 0.9 and z < -6.3:   # transom
        return "#6c472b" if y < 3.0 else "#55371f"
    if y > s - 0.11: return "#3a2414"
    if y < 0.95: return "#93402c"
    if y < 1.12: return "#efe3c6"
    if 1.72 < y < 1.98: return "#d39b3a"
    if y < 1.45: return "#7a5233"
    return "#6c472b" if y < 1.72 else "#5e3d24"
hull = poly(verts, faces, "hull", hull_col, 0.05, HULL)

parts = [hull]
P = lambda o: parts.append(o) or o

# ---------- decks ----------
def deck(y, z0, z1, wfun, name, inset=0.06, hole=None, extra_z=()):
    vs, fs = [], []
    zl = sorted(set([z0] + [z for z in list(ZS) + list(extra_z) if z0 < z < z1] + [z1]))
    xs = [-2.6 + i * 0.2 for i in range(27)]
    for zi in range(len(zl) - 1):
        za, zb = zl[zi], zl[zi + 1]
        wa, wb = wfun(za) - inset, wfun(zb) - inset
        for xi in range(len(xs) - 1):
            xa, xb = xs[xi], xs[xi + 1]
            q = [(max(-wa, min(wa, xa)), za), (max(-wa, min(wa, xb)), za), (max(-wb, min(wb, xb)), zb), (max(-wb, min(wb, xa)), zb)]
            if abs(q[0][0] - q[1][0]) < 1e-4 and abs(q[2][0] - q[3][0]) < 1e-4: continue
            if hole and hole[0] <= xa and xb <= hole[1] and hole[2] <= za and zb <= hole[3]: continue
            i = len(vs)
            for (x, z) in q: vs.append((x, y, z))
            fs.append([i, i + 3, i + 2, i + 1])
    def plank(c, nrm):
        k = int((c.x + 2.6) / 0.2)
        return ["#b5875a", "#a97c50", "#bf9364", "#a47548"][k % 4]
    return poly(vs, fs, name, plank, 0.03, WOODM)

P(deck(2.1, -4.1, 1.2, W, "deck-main", hole=(-0.61, 0.61, -2.5, -1.5), extra_z=(-2.5, -1.5)))
# cabin floor under the quarterdeck, and the cargo hold floor below the main deck
P(deck(2.1, -6.36, -4.1, W, "deck-cabin"))
def hold_w(z):
    return W(z) * 0.74
P(deck(0.7, -4.3, 1.4, hold_w, "deck-hold"))
P(deck(3.5, -6.38, -4.1, W, "deck-quarter"))
P(deck(2.8, 1.2, 6.25, W, "deck-fore"))

# quarterdeck front wall with cabin door and windows
for sx in (-1, 1):
    P(box(2.1, 1.4, 0.14, (sx * 1.36, 2.8, -4.17), color="#6b4428", material=WOODM))
P(box(0.62, 0.36, 0.14, (0, 3.32, -4.17), color="#6b4428", material=WOODM))
for sx in (-1, 1): P(box(0.07, 1.1, 0.18, (sx * 0.34, 2.65, -4.15), color="#3b2212", material=WOODM))
P(box(0.76, 0.08, 0.2, (0, 3.2, -4.14), color="#3b2212", material=WOODM))
# the cabin door stands open against the wall inside
P(box(0.6, 1.05, 0.05, (0.62, 2.63, -4.55), (0, 70, 0), "#4a2a16", material=WOODM))
for x in (-0.75, 0.75):
    P(box(0.34, 0.3, 0.05, (x, 2.95, -4.09), color="#ffd27a", material=GLOW))
    P(box(0.42, 0.06, 0.07, (x, 2.78, -4.08), color="#3b2212"))
# forecastle front wall
P(box(4.8, 0.7, 0.14, (0, 2.45, 1.2), color="#6b4428", material=WOODM))
P(box(0.55, 0.55, 0.06, (0, 2.38, 1.12), color="#3b2212"))
# stairs (step tops at 2.45 / 2.8 / 3.15, then the deck)
for sx in (-1, 1):
    x0, x1 = 0.85, 1.6
    cx = sx * (x0 + x1) / 2
    for i, (za, zb) in enumerate([(-3.0, -3.37), (-3.37, -3.73), (-3.73, -4.1)]):
        top = 2.45 + 0.35 * i
        P(box(x1 - x0, top - 2.1, zb - za if zb > za else za - zb, (cx, (top + 2.1) / 2, (za + zb) / 2), color="#a77a4c", material=WOODM, jitter=0.02))
        P(box(x1 - x0 + 0.02, 0.04, 0.06, (cx, top - 0.02, max(za, zb) - 0.01 if za > zb else za), color="#6b4428"))
    P(box(x1 - x0, 0.35, 0.35, (cx, 2.275, 1.025), color="#a77a4c", material=WOODM))
    # banisters
    P(beam((sx * x0, 2.6, -2.95), (sx * x0, 3.95, -4.1), 0.035, color="#4a2e1a"))
    P(cyl(0.04, 0.04, 0.55, 6, (sx * x0, 2.05, -2.97), color="#4a2e1a"))
# balustrades
for (z, y) in ((-4.12, 3.5), (1.22, 2.8)):
    P(box(1.76, 0.07, 0.09, (0, y + 0.5, z), color="#4a2e1a"))
    for i in range(8):
        P(cyl(0.035, 0.03, 0.47, 6, (-0.8 + i * 0.228, y, z), color="#7a5230"))
# open cargo hatch: coaming around the hole and stairs down to the hold (tops 1.75 / 1.4 / 1.05 / hold floor 0.7)
for sx in (-1, 1):
    P(box(0.07, 0.09, 1.1, (sx * 0.64, 2.14, -2.0), color="#4a2e1a"))
P(box(1.34, 0.09, 0.07, (0, 2.14, -1.47), color="#4a2e1a"))
for i, top in enumerate((1.75, 1.4, 1.05)):
    zc = -1.62 - i * 0.26
    P(box(1.1, 0.08, 0.26, (0, top - 0.04, zc), color="#9a6a3c", material=WOODM))
    for sx in (-1, 1): P(box(0.06, top - 0.7 + 0.02, 0.26, (sx * 0.56, (top + 0.7) / 2, zc), color="#4a2e1a"))
for sx in (-1, 1): P(beam((sx * 0.6, 2.6, -1.5), (sx * 0.6, 1.25, -2.5), 0.03, 5, "#4a2e1a"))

# ---------- captain's cabin furniture (under the quarterdeck, floor 2.1, ceiling 3.5) ----------
GOLDM = mat("gold", 0.42, 0.3)
P(box(1.3, 0.08, 0.8, (0, 2.82, -5.5), color="#7a4a26", material=WOODM))                # table
for sx in (-1, 1):
    for sz in (-1, 1): P(cyl(0.04, 0.04, 0.68, 6, (sx * 0.55, 2.1, -5.5 + sz * 0.32), color="#4a2e1a"))
P(box(0.9, 0.012, 0.6, (0.05, 2.87, -5.5), (0, 8, 0), "#e8d5a6"))                       # chart on the table
P(beam((-0.25, 2.885, -5.45), (0.25, 2.885, -5.65), 0.01, 4, "#a33a2a"))
P(cyl(0.05, 0.04, 0.12, 8, (0.45, 2.86, -5.35), color="#f2ecdc"))                       # candle
P(box(0.04, 0.05, 0.04, (0.45, 3.0, -5.35), color="#ffcf6a", material=GLOW))
P(cyl(0.1, 0.12, 0.18, 8, (-0.45, 2.86, -5.62), color="#3c7ca8"))                       # globe stand
P(ball(0.12, (-0.45, 3.12, -5.62), color="#3c7ca8", sub=2))
for sx in (-1, 1):                                                                       # chairs
    P(box(0.4, 0.06, 0.4, (sx * 0.95, 2.55, -5.5), color="#6b4428", material=WOODM))
    P(box(0.4, 0.5, 0.06, (sx * 1.13, 2.82, -5.5), (0, 90, 0), "#6b4428", material=WOODM))
    for k in range(4): P(cyl(0.025, 0.025, 0.45, 5, (sx * 0.95 + (k % 2 - 0.5) * 0.3, 2.1, -5.5 + (k // 2 - 0.5) * 0.3), color="#4a2e1a"))
P(box(1.5, 0.9, 0.35, (-1.35, 2.55, -4.5), (0, 90, 0), "#5a3920", material=WOODM))      # bookshelf
for k in range(10):
    P(box(0.06, 0.24, 0.18, (-1.25, 2.4 + (k // 5) * 0.4, -5.1 + (k % 5) * 0.28), color=["#8a3a2a", "#2c5aa0", "#3f8f3a", "#c99b3a", "#6b2e6a"][k % 5]))
P(box(0.7, 0.36, 0.45, (1.45, 2.28, -6.0), color="#7a4a24", material=WOODM))           # sea chest
P(box(0.72, 0.06, 0.47, (1.45, 2.48, -6.0), color="#c99b3a", material=GOLDM))
for k in range(9): P(ball(0.05, (1.25 + (k % 3) * 0.1, 2.5, -6.1 + (k // 3) * 0.1), color="#f1c84b", sub=1, material=GOLDM))
P(box(0.8, 0.08, 1.6, (1.45, 2.4, -4.9), color="#7a5233", material=WOODM))             # bunk
P(box(0.72, 0.1, 1.5, (1.45, 2.48, -4.9), color="#a33a2a"))
P(box(0.5, 0.08, 0.3, (1.45, 2.55, -5.5), color="#efe6cf"))
P(box(0.9, 0.012, 0.9, (0, 2.11, -5.5), color="#7a2e2a"))                               # rug
P(box(0.16, 0.24, 0.16, (0, 3.3, -5.5), color="#ffcf6a", material=GLOW))               # hanging lantern
P(beam((0, 3.42, -5.5), (0, 3.5, -5.5), 0.01, 4, "#2b2b30"))

# ---------- cargo hold (floor 0.7) ----------
def hull_hw(z, y):
    w, b = W(z), BOT(z)
    if y >= 2.0: return w * (1 - 0.015 * (y - 2.0))
    t = max(0.0, min(1.0, (y - b) / max(0.05, 2.0 - b)))
    return w * (1 - (1 - t) ** 2.4) ** 0.55
lz = [-4.3 + i * 0.47 for i in range(13)]
for sx in (-1, 1):
    vs, fs = [], []
    ys = [0.6, 1.0, 1.4, 1.75, 2.09]
    for z in lz:
        for y in ys: vs.append((sx * (hull_hw(z, y) * 0.93 - 0.12), y, z))
    n = len(ys)
    for i in range(len(lz) - 1):
        for j in range(n - 1):
            a0 = i * n + j
            fs.append([a0, a0 + 1, a0 + n + 1, a0 + n] if sx > 0 else [a0, a0 + n, a0 + n + 1, a0 + 1])
    P(poly(vs, fs, "lining", lambda c, nn: ["#7a5233", "#6b4428", "#84593a"][int((c.y - 0.6) / 0.35) % 3], 0.05, WOODM))
for z in (-4.3, 1.4):
    P(box(3.4, 1.4, 0.08, (0, 1.38, z), color="#6b4428", material=WOODM))

for (x, z) in ((-1.1, -3.6), (-1.25, -3.0), (1.15, -3.5), (1.2, 0.6), (-1.15, 0.9)):
    P(cyl(0.22, 0.22, 0.48, 10, (x, 0.7, z), color="#8a5a30"))
    for yy in (0.78, 1.06): P(cyl(0.23, 0.23, 0.04, 10, (x, yy, z), color="#3b3b40"))
for (x, z, y) in ((1.0, -2.6, 0.7), (1.05, -2.1, 0.7), (1.0, -2.35, 1.08), (-1.0, 0.0, 0.7)):
    P(box(0.4, 0.38, 0.4, (x, y + 0.19, z), (0, 12, 0), "#a77a4c", material=WOODM))
for k in range(4): P(ball(0.18, (-1.1 + (k % 2) * 0.3, 0.86, -1.7 + (k // 2) * 0.35), (1, 0.75, 1), "#c9b38a", sub=2))   # sacks
# the treasure pile at the bow end of the hold
for k in range(40):
    a = k * 2.4; r = 0.05 + (k % 9) * 0.04
    P(ball(0.05, (math.cos(a) * r * 1.4, 0.72 + max(0, 0.32 - r) * 0.9, 1.05 + math.sin(a) * r), color="#f1c84b", sub=1, material=GOLDM))
P(box(0.55, 0.32, 0.38, (0.3, 0.86, 1.25), (0, -20, 0), "#7a4a24", material=WOODM)); P(box(0.57, 0.05, 0.4, (0.3, 1.04, 1.25), (0, -20, 0), "#c99b3a", material=GOLDM))
for k in range(3): P(beam((-1.5, 1.85, -3.2 + k * 1.3), (1.5, 1.7, -2.8 + k * 1.3), 0.012, 4, "#b39b72"))   # hammock ropes
P(box(0.14, 0.2, 0.14, (0, 1.75, -0.8), color="#ffcf6a", material=GLOW))
P(box(0.14, 0.2, 0.14, (0, 1.75, -3.6), color="#ffcf6a", material=GLOW))

# ---------- masts, yards, sails ----------
MASTS = [  # z, base y, top y, yards [(y, half width)]
    ("main", 0.0, 2.1, 10.2, [(5.1, 2.25), (8.1, 1.7)]),
    ("fore", 4.4, 2.8, 8.9, [(4.9, 1.9), (7.3, 1.45)]),
    ("mizzen", -5.85, 3.5, 8.1, [(6.3, 1.35)]),
]
sails, flags = [], []
def sail(name, yt, yb, hw_t, hw_b, z, bulge=0.45, curve=0.12):
    vs, fs = [], []
    NX, NY = 6, 4
    for j in range(NY + 1):
        t = j / NY; y = yt + (yb - yt) * t; hw = hw_t + (hw_b - hw_t) * t
        for i in range(NX + 1):
            u = i / NX; x = -hw + 2 * hw * u
            b = bulge * math.sin(math.pi * u) * math.sin(math.pi * (0.15 + 0.85 * t))
            vs.append((x, y - curve * math.sin(math.pi * u) * (t == 1), z + 0.05 + b))
    for j in range(NY):
        for i in range(NX):
            a = j * (NX + 1) + i; fs.append([a, a + 1, a + NX + 2, a + NX + 1])
    def sc(c, nrm):
        return "#f1e7cf" if int((c.x + 3) / 0.6) % 2 else "#e6dabb"
    return poly(vs, fs, name, sc, 0.02, SAILM)

for mi, (mn, z, yb, yt, yards) in enumerate(MASTS):
    P(cyl(0.15, 0.09, yt - yb, 8, (0, yb, z), color="#7b5532", material=WOODM))
    P(cyl(0.2, 0.2, 0.25, 8, (0, yb, z), color="#4a2e1a"))
    for (y, hw) in yards:
        P(cyl(0.065, 0.065, 2 * hw, 6, (-hw, y, z), color="#6b4428", axis="x"))
    # sails hang from each yard down to the next lower yard (or above the deck)
    lows = [yb + (1.0 if mn != "mizzen" else 0.95)] + [y + 0.25 for (y, _) in yards[:-1]]
    for si, (y, hw) in enumerate(yards):
        s = sail(f"sail-{mn}-{si}", y - 0.06, lows[si] if si == 0 else yards[si - 1][0] + 0.3, hw * 0.92, hw * (1.05 if si == 0 else 0.98), z, 0.42 if si == 0 else 0.34)
        sails.append(s)
    # flag at the top
    fz, fy = z, yt + 0.05
    P(cyl(0.025, 0.02, 0.5, 5, (0, yt, z), color="#4a2e1a"))
    fv, ff = [], []
    for j in range(3):
        for i in range(5):
            u = i / 4
            fv.append((0.02, fy + 0.45 - j * 0.22, fz - 0.04 - u * 0.95))
    for i in range(len(fv)):
        x, y, zz = fv[i]; u = (i % 5) / 4
        fv[i] = (x + 0.12 * math.sin(u * 5.5) * u, y - 0.08 * u, zz)
    for j in range(2):
        for i in range(4):
            a = j * 5 + i; ff.append([a, a + 1, a + 6, a + 5])
    flags.append(poly(fv, ff, f"flag-{mn}", "#1b1b1f", 0.04, FLAGM))
    # skull and crossbones (separate so the cloth can be recoloured)
    sk = [ball(0.075, (0.09, fy + 0.31, fz - 0.42), (1, 1.05, 0.6), "#f2ecdc", sub=1, material=FLAGM),
          box(0.04, 0.03, 0.3, (0.09, fy + 0.2, fz - 0.42), (35, 0, 0), "#f2ecdc", material=FLAGM),
          box(0.04, 0.03, 0.3, (0.09, fy + 0.2, fz - 0.42), (-35, 0, 0), "#f2ecdc", material=FLAGM)]
    flags.append(join(sk, f"jolly-{mn}"))

# crow's nest
P(cyl(0.42, 0.36, 0.32, 10, (0, 9.05, 0.0), color="#6b4428", material=WOODM, caps=True))
P(cyl(0.44, 0.44, 0.06, 10, (0, 9.37, 0.0), color="#3d2615"))
# bowsprit and jib
P(beam((0, 3.25, 5.9), (0, 4.4, 8.3), 0.08, 6, "#7b5532"))
jib = poly([(0, 4.35, 8.2), (0, 8.4, 4.5), (0, 3.35, 5.5)], [[0, 1, 2]], "sail-jib", "#efe4c9", 0.02, SAILM)
sails.append(jib)

# rigging (thin ropes), all in one object
rig = []
for (mn, z, yb, yt, yards) in MASTS:
    for sx in (-1, 1):
        for k in range(3):
            zz = z - 0.5 + k * 0.5
            zz = max(-6.2, min(5.6, zz))
            if -2.4 < zz < -1.2: zz = -2.5 if zz < -1.8 else -1.1
            w = W(zz) * 0.97
            rig.append(beam((sx * w, SHEER(zz) - 0.02, zz), (sx * 0.12, yt - 1.2, z), 0.018, 4, "#3a2a1a"))
    rig.append(beam((0, yt - 0.3, z), (0, yb + 0.3, z + (1.8 if z < 4 else 2.2)), 0.016, 4, "#3a2a1a"))
rig.append(beam((0, 4.35, 8.2), (0, 8.6, 4.4), 0.018, 4, "#3a2a1a"))
rig_ob = join(rig, "rig-ropes")

# cannons on deck + gunports
for (x, z) in ((-1.95, -0.55), (-1.95, 0.45), (1.95, 0.55), (-1.95, -3.25), (1.95, -3.25)):
    sx = 1 if x > 0 else -1
    P(box(0.42, 0.18, 0.5, (x - sx * 0.05, 2.19, z), color="#5a3920"))
    for dz in (-0.2, 0.2):
        P(cyl(0.1, 0.1, 0.05, 8, (x - sx * 0.05 - 0.025, 2.12, z + dz), color="#3d2615", axis="x"))
    P(cyl(0.12, 0.08, 0.75, 8, (x - sx * 0.35, 2.36, z), (0, 0, 0), "#2b2b30", axis="x", material=METAL) if sx > 0 else
      cyl(0.12, 0.08, 0.75, 8, (x + sx * 0.35, 2.36, z), (0, 180, 0), "#2b2b30", axis="x", material=METAL))
for sx in (-1, 1):
    for z in (-3.6, -0.5, 0.5, 2.4):
        w = W(z)
        P(box(0.04, 0.3, 0.34, (sx * (w + 0.01), 1.5, z), color="#1d130b"))

# wheel
P(box(0.12, 0.42, 0.12, (0, 3.71, -5.0), color="#5a3920"))
ring = []
WR, WY, WZ = 0.2, 3.98, -4.93
for i in range(10):
    a0, a1 = i / 10 * math.tau, (i + 1) / 10 * math.tau
    ring.append(beam((math.cos(a0) * WR, WY + math.sin(a0) * WR, WZ), (math.cos(a1) * WR, WY + math.sin(a1) * WR, WZ), 0.022, 4, "#8a5a30"))
for i in range(8):
    a = i / 8 * math.tau
    ring.append(beam((0, WY, WZ), (math.cos(a) * 0.28, WY + math.sin(a) * 0.28, WZ), 0.016, 4, "#6b4428"))
ring.append(cyl(0.05, 0.05, 0.06, 10, (0, WY, WZ - 0.03), color="#d6a640", axis="z", material=METAL))
for i in range(8):
    a = i / 8 * math.tau
    ring.append(ball(0.022, (math.cos(a) * 0.3, WY + math.sin(a) * 0.3, WZ), color="#6b4428", sub=1))
P(join(ring, "wheel"))

# stern: windows, lanterns, carvings
for x in (-1.1, -0.37, 0.37, 1.1):
    P(box(0.4, 0.42, 0.04, (x, 3.1, -6.42), color="#ffd27a", material=GLOW))
    P(box(0.48, 0.06, 0.06, (x, 2.86, -6.43), color="#c58f33"))
P(box(4.0, 0.08, 0.1, (0, 3.42, -6.44), color="#c58f33"))
for x in (-1.75, 1.75):
    P(cyl(0.03, 0.03, 0.55, 5, (x, 4.05, -6.25), color="#2c1b0f"))
    P(box(0.18, 0.24, 0.18, (x, 4.68, -6.25), color="#ffcf6a", material=GLOW))
    P(cyl(0.13, 0.02, 0.12, 6, (x, 4.8, -6.25), color="#2c1b0f"))
# mast lantern
P(box(0.16, 0.22, 0.16, (0.0, 3.3, 0.22), color="#ffcf6a", material=GLOW))
# serpent figurehead
P(ball(0.2, (0, 3.45, 6.5), (0.8, 0.8, 1.2), "#3f9b5c", sub=1))
P(cyl(0.12, 0.03, 0.3, 6, (0, 3.42, 6.68), (90, 0, 0), "#3f9b5c"))
for sx in (-1, 1):
    P(ball(0.04, (sx * 0.1, 3.55, 6.6), color="#ffd27a", sub=0))
# rope coils
for (x, y, z) in ((1.5, 2.1, -0.2), (-0.5, 3.5, -6.0), (-1.4, 2.8, 2.6)):
    for k in range(3):
        P(cyl(0.2 - k * 0.04, 0.2 - k * 0.04, 0.03, 12, (x, y + k * 0.028, z), color="#c2a476", caps=False))
    P(cyl(0.08, 0.08, 0.03, 10, (x, y, z), color="#7a6040"))
# barrels lashed by the main mast
for (x, z) in ((-0.55, 0.45), (0.55, 0.45)):
    P(cyl(0.2, 0.2, 0.42, 8, (x, 2.1, z), color="#8a5a30"))
    for yy in (2.18, 2.4):
        P(cyl(0.21, 0.21, 0.04, 8, (x, yy, z), color="#3b3b40"))

for o in sails + flags:
    bpy.ops.object.select_all(action="DESELECT"); o.select_set(True); bpy.context.view_layer.objects.active = o
    bpy.ops.object.origin_set(type="ORIGIN_GEOMETRY", center="BOUNDS")
hullmesh = join(parts, "ship-hull")
objs = [hullmesh, rig_ob] + sails + flags
print("tris", tris(objs))
export("/home/claude/work/out/ship-galleon.glb", objs)
