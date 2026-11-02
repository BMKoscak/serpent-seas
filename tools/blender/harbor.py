"""Harbor & market buildings and props, authored in metres (front faces +z)."""
import sys, math, random
sys.path.insert(0, "/home/claude/work/blender")
from lib import *

OUT = "/home/claude/work/out/"
def save(name, parts):
    ob = join(parts, name); export(OUT + name + ".glb", [ob]); print(name, tris([ob])); return ob

def M(): return mat("wood", 0.9)
def awning(w, d, y, z0, colors, M_, slope=0.6, scallop=True):
    """striped sloping canvas from the back (high) to the front (low)"""
    parts = []
    n = 8; sw = w / n
    for i in range(n):
        x0 = -w / 2 + i * sw
        parts.append(poly([(x0, y + slope, z0 - d), (x0 + sw, y + slope, z0 - d), (x0 + sw, y, z0), (x0, y, z0)], [[0, 1, 2, 3]], "aw", colors[i % 2], 0.02, M_))
        if scallop:
            parts.append(poly([(x0, y, z0), (x0 + sw, y, z0), (x0 + sw / 2, y - 0.22, z0 + 0.02)], [[0, 1, 2]], "sc", colors[i % 2], 0.02, M_))
    return parts

def stall(name, colors, goods, sign=None):
    reset(); W_ = M(); C = mat("canvas", 0.95); C.use_backface_culling = False
    p = []
    w, d = 3.6, 2.0
    # counter
    p.append(box(w, 1.0, 0.7, (0, 0.5, 0.55), color="#8a5a30", material=W_))
    p.append(box(w + 0.1, 0.08, 0.85, (0, 1.04, 0.55), color="#6b4428", material=W_))
    for i in range(6): p.append(box(0.04, 0.9, 0.02, (-w / 2 + 0.3 + i * 0.6, 0.48, 0.91), color="#6b4428", material=W_))
    # posts
    for x in (-w / 2 + 0.1, w / 2 - 0.1):
        p.append(box(0.14, 2.7, 0.14, (x, 1.35, 0.85), color="#5a3920", material=W_))
        p.append(box(0.14, 3.3, 0.14, (x, 1.65, -d + 0.4), color="#5a3920", material=W_))
    p.append(box(w, 0.1, 0.1, (0, 2.68, 0.85), color="#5a3920", material=W_))
    # back shelf
    p.append(box(w - 0.3, 1.6, 0.4, (0, 0.8, -d + 0.45), color="#7a5233", material=W_))
    for yy in (0.6, 1.15, 1.6): p.append(box(w - 0.3, 0.05, 0.42, (0, yy, -d + 0.46), color="#5a3920", material=W_))
    p += awning(w + 0.5, d + 0.5, 2.68, 1.15, colors, C, 0.75)
    p += goods(W_)
    if sign:
        p.append(box(1.4, 0.45, 0.06, (0, 3.25, 0.95), color="#3d2615", material=W_))
        p.append(box(1.25, 0.32, 0.03, (0, 3.25, 0.99), color=sign, material=W_))
        for x in (-0.5, 0.5): p.append(beam((x, 3.48, 0.95), (x, 3.62, 0.85), 0.015, 4, "#2b2b2b"))
    return save(name, p)

def g_silas(W_):
    p = []
    GOLD = mat("gold", 0.35, 0.7)
    # treasure chest, maps, bottles, a globe
    p.append(box(0.6, 0.35, 0.4, (-1.1, 1.26, 0.5), color="#7a4a24", material=W_)); p.append(box(0.62, 0.06, 0.42, (-1.1, 1.45, 0.5), color="#c99b3a", material=GOLD))
    for i in range(5): p.append(ball(0.06, (-1.25 + i * 0.07, 1.47, 0.5), color="#f1c84b", sub=0, material=GOLD))
    for i in range(3): p.append(cyl(0.05, 0.05, 0.5, 6, (-0.25 + i * 0.12, 1.12, 0.45), (0, 0, 90), ["#efe2c0", "#e6d3a8", "#efe2c0"][i], axis="y"))
    p.append(ball(0.2, (0.6, 1.33, 0.5), color="#3c7ca8", sub=1)); p.append(cyl(0.12, 0.08, 0.1, 6, (0.6, 1.08, 0.5), color="#7a4a24"))
    for i in range(4): p.append(cyl(0.06, 0.04, 0.26, 6, (1.05 + i * 0.13, 1.08, 0.55), color=["#3f8f3a", "#8a3a8a", "#2c5aa0", "#c0392b"][i]))
    for yy in (0.62, 1.17, 1.62):
        for i in range(6):
            p.append(box(0.18, 0.22, 0.18, (-1.3 + i * 0.52, yy + 0.12, -1.55), color=["#c0392b", "#2c5aa0", "#e2b04a", "#3f8f3a", "#8a3a8a", "#efe2c0"][(i + int(yy * 10)) % 6]))
    p.append(box(0.24, 0.32, 0.24, (1.55, 2.45, 0.85), color="#ffcf6a", material=mat("glow", 0.6, emit="#ffcf6a")))
    return p
def g_fish(W_):
    p = [box(3.2, 0.12, 0.6, (0, 1.14, 0.5), color="#d9eef2")]
    for i in range(9):
        x = -1.4 + i * 0.35
        p.append(ball(0.16, (x, 1.24, 0.5), (1.6, 0.5, 0.6), ["#8aa6b8", "#c0854a", "#b8c4cc"][i % 3], sub=1))
        p.append(poly([(x - 0.24, 1.24, 0.5), (x - 0.38, 1.33, 0.5), (x - 0.38, 1.15, 0.5)], [[0, 1, 2]], "tail", "#6f8a9a", 0.05))
    for i in range(3): p.append(cyl(0.25, 0.22, 0.45, 8, (-1.2 + i * 1.2, 0.0, 1.35), color="#8a5a30", material=W_))
    return p
def g_fruit(W_):
    p = []
    for i, c in enumerate(["#d23b2b", "#e9b23a", "#6fae3a", "#e07a2a", "#8a3a8a"]):
        x = -1.4 + i * 0.7
        p.append(box(0.6, 0.18, 0.5, (x, 1.17, 0.5), color="#a77a4c", material=W_))
        for k in range(6): p.append(ball(0.09, (x - 0.18 + (k % 3) * 0.18, 1.32, 0.38 + (k // 3) * 0.22), color=c, sub=1))
    for i in range(3): p.append(box(0.6, 0.4, 0.5, (-1.2 + i * 1.2, 0.2, 1.4), color="#8a5a30", material=W_))
    return p

def house(name, w, d, floors, wall, beam_c, roof_c, seed, chimney=True, tavern=False):
    reset(); rnd = random.Random(seed); W_ = M(); R = mat("roof", 0.85); GLOW = mat("glow", 0.6, emit="#ffcf6a")
    p = []
    fh = 2.8; H = floors * fh
    # stone base
    p.append(box(w + 0.2, 0.5, d + 0.2, (0, 0.25, 0), color="#8d8a84", bevel=0.05))
    p.append(box(w, H - 0.5, d, (0, 0.5 + (H - 0.5) / 2, 0), color=wall))
    # timber frame
    for sz, zf in ((1, d / 2 + 0.03), (-1, -d / 2 - 0.03)):
        for x in [-w / 2 + 0.06, w / 2 - 0.06] + [(-w / 2 + w * k / 3) for k in (1, 2)]:
            p.append(box(0.14, H - 0.5, 0.06, (x, 0.5 + (H - 0.5) / 2, zf), color=beam_c))
        for f in range(floors + 1):
            p.append(box(w + 0.05, 0.14, 0.06, (0, 0.5 + f * fh - (0.07 if f else -0.07), zf), color=beam_c))
        for k in range(3):
            x0 = -w / 2 + w * k / 3
            if floors > 1: p.append(beam((x0 + 0.1, 0.5 + fh + 0.1, zf), (x0 + w / 3 - 0.1, 0.5 + 2 * fh - 0.15, zf), 0.05, 4, beam_c))
    for sx in (-1, 1):
        for z in (-d / 2 + 0.06, d / 2 - 0.06):
            p.append(box(0.06, H - 0.5, 0.14, (sx * (w / 2 + 0.03), 0.5 + (H - 0.5) / 2, z), color=beam_c))
    # door and windows
    p.append(box(1.0, 1.9, 0.08, (0, 1.45, d / 2 + 0.05), color="#5a3420"))
    p.append(box(1.2, 0.12, 0.1, (0, 2.45, d / 2 + 0.06), color=beam_c))
    p.append(ball(0.05, (0.3, 1.45, d / 2 + 0.11), color="#e2b04a", sub=0))
    for f in range(floors):
        for x in ((-w / 3, w / 3) if f == 0 else (-w / 3, 0, w / 3)):
            if f == 0 and abs(x) < 0.8: continue
            y = 0.5 + f * fh + 1.5
            p.append(box(0.8, 0.8, 0.06, (x, y, d / 2 + 0.05), color="#ffd98a" if rnd.random() < 0.6 else "#5d7f99", material=GLOW if rnd.random() < 0.6 else None))
            p.append(box(0.06, 0.8, 0.08, (x, y, d / 2 + 0.07), color=beam_c)); p.append(box(0.8, 0.06, 0.08, (x, y, d / 2 + 0.07), color=beam_c))
            for sx in (-1, 1): p.append(box(0.36, 0.86, 0.05, (x + sx * 0.6, y, d / 2 + 0.06), color=["#2f6f6a", "#8a3a2a", "#2c5aa0"][seed % 3]))
            p.append(box(0.95, 0.08, 0.2, (x, y - 0.46, d / 2 + 0.1), color=beam_c))
        for x in (-w / 4, w / 4):
            p.append(box(0.06, 0.7, 0.7, (w / 2 + 0.04, 0.5 + f * fh + 1.5, x * d / w), color="#ffd98a", material=GLOW))
    # gabled roof (ridge along x)
    rh = 2.0; ov = 0.45
    yb = 0.5 + H - 0.5 + 0.5
    for sz in (1, -1):
        rows = 5
        for r in range(rows):
            t0, t1 = r / rows, (r + 1) / rows
            z0 = sz * (d / 2 + ov) * (1 - t0); z1 = sz * (d / 2 + ov) * (1 - t1)
            y0 = yb - 0.35 + rh * t0; y1 = yb - 0.35 + rh * t1
            q = [(-w / 2 - ov, y0, z0), (w / 2 + ov, y0, z0), (w / 2 + ov, y1, z1), (-w / 2 - ov, y1, z1)]
            p.append(poly(q, [[0, 1, 2, 3] if sz > 0 else [3, 2, 1, 0]], "roof", roof_c if r % 2 else _shade(roof_c, 0.88), 0.05, R))
            p.append(box(w + 2 * ov, 0.08, 0.12, (0, y0 + 0.02, z0), color=_shade(roof_c, 0.7), material=R))
    p.append(box(w + 2 * ov + 0.1, 0.14, 0.2, (0, yb - 0.35 + rh, 0), color=_shade(roof_c, 0.7), material=R))
    for sx in (-1, 1):
        p.append(poly([(sx * w / 2, yb - 0.5, d / 2), (sx * w / 2, yb - 0.5, -d / 2), (sx * w / 2, yb - 0.4 + rh, 0)], [[0, 1, 2] if sx > 0 else [2, 1, 0]], "gable", wall, 0.03))
    if chimney:
        p.append(box(0.6, 2.0, 0.6, (w / 2 - 0.8, yb + rh - 0.5, -d / 4), color="#8d8a84", bevel=0.03))
        p.append(box(0.7, 0.12, 0.7, (w / 2 - 0.8, yb + rh + 0.5, -d / 4), color="#6a665f"))
    if tavern:
        # hanging sign with a mug, barrels, a bench
        p.append(beam((-w / 2 + 0.6, 3.2, d / 2), (-w / 2 + 0.6, 3.2, d / 2 + 1.1), 0.05, 4, beam_c))
        p.append(box(0.9, 0.7, 0.07, (-w / 2 + 0.6, 2.7, d / 2 + 0.9), color="#3d2615"))
        p.append(cyl(0.16, 0.16, 0.34, 8, (-w / 2 + 0.6, 2.53, d / 2 + 0.95), color="#e2b04a", axis="y"))
        p.append(box(0.1, 0.14, 0.05, (-w / 2 + 0.8, 2.7, d / 2 + 0.95), color="#e2b04a"))
        p.append(ball(0.16, (-w / 2 + 0.6, 2.9, d / 2 + 0.95), (1, 0.5, 1), "#fbfaf6", sub=1))
        for i, x in enumerate((w / 2 - 0.6, w / 2 - 1.3)):
            p.append(cyl(0.38, 0.38, 0.9, 10, (x, 0.0, d / 2 + 0.7), color="#8a5a30"))
            for yy in (0.15, 0.7): p.append(cyl(0.4, 0.4, 0.06, 10, (x, yy, d / 2 + 0.7), color="#3b3b40"))
        p.append(box(1.8, 0.1, 0.4, (-0.2, 0.45, d / 2 + 0.9), color="#8a5a30"))
        for x in (-0.9, 0.5): p.append(box(0.1, 0.45, 0.35, (x, 0.22, d / 2 + 0.9), color="#5a3920"))
    return save(name, p)

def _shade(h, k):
    r, g, b = hexrgb(h); return "#%02x%02x%02x" % (int(r * 255 * k), int(g * 255 * k), int(b * 255 * k))

def lighthouse(name):
    reset(); GLOW = mat("glow", 0.5, emit="#fff1b0"); GL = mat("glass", 0.2)
    p = []
    p.append(cyl(2.6, 2.6, 1.0, 10, (0, 0, 0), color="#8d8a84"))
    rings = 6; H = 11.0
    for i in range(rings):
        y0 = 1.0 + H * i / rings; r0 = 1.9 - 0.55 * i / rings; r1 = 1.9 - 0.55 * (i + 1) / rings
        p.append(cyl(r0, r1, H / rings, 12, (0, y0, 0), color="#f2ece0" if i % 2 == 0 else "#c0392b", jitter=0.02))
    top = 1.0 + H
    p.append(cyl(1.75, 1.75, 0.25, 12, (0, top, 0), color="#3b3b40"))
    for k in range(16):
        a = k / 16 * math.tau
        p.append(cyl(0.04, 0.04, 0.8, 4, (math.cos(a) * 1.65, top + 0.25, math.sin(a) * 1.65), color="#2b2b30"))
    p.append(cyl(1.68, 1.68, 0.06, 16, (0, top + 1.05, 0), color="#2b2b30", caps=False))
    p.append(cyl(0.95, 0.95, 1.5, 10, (0, top + 0.25, 0), color="#fff1b0", material=GLOW))
    for k in range(10):
        a = k / 10 * math.tau
        p.append(box(0.08, 1.5, 0.08, (math.cos(a) * 0.98, top + 1.0, math.sin(a) * 0.98), (0, -math.degrees(a), 0), "#2b2b30"))
    p.append(cyl(1.15, 0.2, 1.0, 10, (0, top + 1.75, 0), color="#c0392b"))
    p.append(ball(0.18, (0, top + 2.85, 0), color="#e2b04a", sub=1))
    # door and little windows
    p.append(box(1.0, 1.8, 0.2, (0, 1.9, 1.88), color="#5a3420"))
    for i in range(3): p.append(box(0.4, 0.6, 0.12, (0, 4.5 + i * 2.7, 1.85 - 0.18 * (i + 1)), color="#ffd98a", material=GLOW))
    return save(name, p)

def props():
    W_ = None
    reset(); W_ = M()
    save("barrel", [cyl(0.42, 0.42, 1.0, 12, (0, 0, 0), color="#8a5a30", material=W_), cyl(0.45, 0.45, 0.07, 12, (0, 0.15, 0), color="#3b3b40"), cyl(0.45, 0.45, 0.07, 12, (0, 0.78, 0), color="#3b3b40"),
                    cyl(0.38, 0.38, 0.02, 12, (0, 1.0, 0), color="#6b4428", material=W_)])
    reset(); W_ = M()
    p = [box(0.9, 0.8, 0.9, (0, 0.4, 0), color="#a77a4c", material=W_, bevel=0.02)]
    for sz in (1, -1):
        p.append(box(0.92, 0.1, 0.06, (0, 0.06, sz * 0.45), color="#6b4428")); p.append(box(0.92, 0.1, 0.06, (0, 0.74, sz * 0.45), color="#6b4428"))
        p.append(box(0.08, 0.8, 0.06, (sz * 0.42, 0.4, 0.455), color="#6b4428"))
    p.append(beam((-0.42, 0.06, 0.47), (0.42, 0.74, 0.47), 0.04, 4, "#6b4428"))
    save("crate", p)
    reset(); W_ = M(); GLOW = mat("glow", 0.6, emit="#ffcf6a")
    save("lamp-post", [cyl(0.12, 0.08, 3.0, 6, (0, 0, 0), color="#2b2b30"), cyl(0.25, 0.25, 0.3, 6, (0, 0, 0), color="#2b2b30"), beam((0, 2.9, 0), (0.55, 2.9, 0), 0.04, 4, "#2b2b30"),
                       box(0.3, 0.4, 0.3, (0.55, 2.55, 0), color="#ffcf6a", material=GLOW), cyl(0.24, 0.05, 0.2, 4, (0.55, 2.75, 0), (0, 45, 0), "#2b2b30")])
    reset(); W_ = M()
    p = [box(1.8, 0.1, 0.45, (0, 0.48, 0), color="#9a6a3c", material=W_), box(1.8, 0.4, 0.08, (0, 0.85, -0.2), (-8, 0, 0), "#9a6a3c", material=W_)]
    for x in (-0.75, 0.75): p.append(box(0.1, 0.48, 0.42, (x, 0.24, 0), color="#5a3920", material=W_))
    save("bench", p)
    reset(); W_ = M()
    p = [cyl(1.0, 1.05, 0.8, 12, (0, 0, 0), color="#8d8a84", jitter=0.06), cyl(0.85, 0.85, 0.05, 12, (0, 0.7, 0), color="#2d5a7a")]
    for x in (-0.9, 0.9): p.append(box(0.12, 1.8, 0.12, (x, 1.0, 0), color="#5a3920", material=W_))
    p.append(cyl(0.06, 0.06, 1.9, 5, (-0.95, 1.8, 0), axis="x", color="#5a3920", material=W_))
    p += [poly([(-1.25, 2.0, -0.7), (1.25, 2.0, -0.7), (1.25, 2.7, 0), (-1.25, 2.7, 0)], [[0, 1, 2, 3]], "r", "#8a3a2a", 0.04, mat("roof", 0.85)),
          poly([(-1.25, 2.0, 0.7), (1.25, 2.0, 0.7), (1.25, 2.7, 0), (-1.25, 2.7, 0)], [[3, 2, 1, 0]], "r", "#9a4a32", 0.04, mat("roof", 0.85))]
    p.append(cyl(0.18, 0.15, 0.3, 8, (0.1, 1.2, 0), color="#8a5a30"))
    save("well", p)
    reset(); W_ = M()
    p = [box(1.4, 0.12, 2.4, (0, 0.75, 0), color="#9a6a3c", material=W_)]
    for sx in (-1, 1):
        p.append(box(0.08, 0.45, 2.4, (sx * 0.68, 1.0, 0), color="#8a5a30", material=W_))
        p.append(cyl(0.45, 0.45, 0.1, 10, (sx * 0.78, 0.45, -0.3), axis="x", color="#6b4428", material=W_))
        p.append(cyl(0.12, 0.12, 0.14, 8, (sx * 0.8, 0.45, -0.3), axis="x", color="#3b3b40"))
    for sx in (-1, 1): p.append(beam((sx * 0.4, 0.75, 1.2), (sx * 0.35, 0.55, 2.4), 0.04, 4, "#6b4428"))
    for k in range(4): p.append(cyl(0.3, 0.3, 0.6, 8, (-0.3 + (k % 2) * 0.6, 0.8, -0.6 + (k // 2) * 0.8), color="#8a5a30"))
    save("cart", p)
    reset(); W_ = M()
    p = []
    for x in (-1.4, 1.4): p.append(cyl(0.07, 0.06, 2.3, 6, (x, 0, 0), color="#5a3920"))
    p.append(cyl(0.05, 0.05, 2.9, 5, (-1.45, 2.2, 0), axis="x", color="#5a3920"))
    net = []
    for i in range(9):
        x = -1.3 + i * 0.325
        net.append(beam((x, 2.15, 0), (x + 0.08 * math.sin(i), 0.6, 0.06), 0.008, 3, "#c7b48a"))
    for j in range(6):
        y = 2.1 - j * 0.27
        net.append(beam((-1.33, y, 0.02), (1.33, y - 0.04, 0.02 + 0.03 * (j % 2)), 0.008, 3, "#c7b48a"))
    p += net
    for k in range(3): p.append(ball(0.09, (-0.8 + k * 0.8, 0.6 + (k % 2) * 0.4, 0.05), color="#e2b04a", sub=0))
    save("net-rack", p)
    reset(); GOLD = mat("metal", 0.4, 0.6)
    p = [cyl(0.09, 0.09, 1.8, 6, (0, 0.2, 0), color="#3b3b40", material=GOLD), cyl(0.06, 0.06, 0.9, 6, (-0.45, 1.6, 0), axis="x", color="#3b3b40", material=GOLD),
         cyl(0.18, 0.18, 0.06, 10, (0, 2.0, 0), axis="z", color="#3b3b40", caps=False, material=GOLD)]
    for sx in (-1, 1):
        p.append(beam((0, 0.3, 0), (sx * 0.7, 0.75, 0), 0.08, 5, "#3b3b40", material=GOLD)); p.append(cyl(0.16, 0.02, 0.35, 4, (sx * 0.75, 0.68, 0), (0, 0, -sx * 50), "#3b3b40", material=GOLD))
    save("anchor-deco", p)
    reset(); W_ = M()
    p = [cyl(0.08, 0.07, 2.4, 6, (0, 0, 0), color="#5a3920")]
    for i, (y, ang, c) in enumerate(((2.05, 20, "#a77a4c"), (1.65, -35, "#9a6a3c"), (1.25, 160, "#a77a4c"))):
        p.append(box(1.0, 0.24, 0.05, (0.4 * math.cos(math.radians(ang)), y, -0.4 * math.sin(math.radians(ang))), (0, ang, 0), c, material=W_))
    save("signpost", p)
    reset(); W_ = M()
    hull = []
    for sx in (-1, 1):
        hull.append(poly([(0, 0.1, 1.6), (sx * 0.7, 0.2, 0.5), (sx * 0.65, 0.2, -1.2), (0, 0.15, -1.3), (0, 0.6, -1.3), (sx * 0.72, 0.62, -1.2), (sx * 0.78, 0.62, 0.5), (0, 0.75, 1.75)],
                         [[0, 1, 6, 7], [1, 2, 5, 6], [2, 3, 4, 5]] if sx < 0 else [[7, 6, 1, 0], [6, 5, 2, 1], [5, 4, 3, 2]], "h", "#8a5a30", 0.04, W_))
    hull.append(poly([(0, 0.1, 1.6), (0.7, 0.2, 0.5), (0.65, 0.2, -1.2), (0, 0.15, -1.3), (-0.65, 0.2, -1.2), (-0.7, 0.2, 0.5)], [[0, 1, 2, 3, 4, 5]], "b", "#6b4428", 0.04, W_))
    hull.append(box(1.4, 0.06, 0.3, (0, 0.45, 0), color="#9a6a3c")); hull.append(box(1.25, 0.06, 0.3, (0, 0.45, -0.8), color="#9a6a3c"))
    hull.append(beam((-0.9, 0.55, -0.3), (1.3, 0.3, 0.6), 0.03, 4, "#c9a26a")); hull.append(box(0.06, 0.04, 0.5, (1.25, 0.32, 0.85), color="#c9a26a"))
    save("rowboat", hull)
    reset(); W_ = M()
    save("bollard", [cyl(0.25, 0.3, 0.7, 8, (0, 0, 0), color="#3b3b40"), cyl(0.33, 0.33, 0.1, 8, (0, 0.62, 0), color="#2b2b30"), cyl(0.27, 0.27, 0.12, 8, (0, 0.35, 0), color="#c7b48a")])
    reset(); W_ = M(); GOLD = mat("gold", 0.35, 0.7)
    p = [box(0.9, 0.5, 0.6, (0, 0.25, 0), color="#7a4a24", material=W_), box(0.92, 0.22, 0.62, (0, 0.6, 0), color="#6b3e1e", material=W_)]
    for x in (-0.3, 0.3): p.append(box(0.08, 0.74, 0.64, (x, 0.37, 0), color="#c99b3a", material=GOLD))
    p.append(box(0.14, 0.16, 0.05, (0, 0.5, 0.32), color="#e2b04a", material=GOLD))
    save("chest", p)
    reset(); W_ = M()
    p = []
    for k, (x, z, y) in enumerate(((0, 0, 0), (0.95, 0.05, 0), (0.45, 0.0, 0.8), (-0.2, 0.9, 0))):
        p.append(box(0.9, 0.8, 0.9, (x, y + 0.4, z), (0, k * 9, 0), "#a77a4c" if k % 2 else "#9a6a3c", material=W_, bevel=0.02))
    p.append(cyl(0.42, 0.42, 1.0, 10, (1.35, 0, 1.1), color="#8a5a30")); p.append(cyl(0.45, 0.45, 0.07, 10, (1.35, 0.78, 1.1), color="#3b3b40"))
    save("crate-stack", p)

if __name__ == "__main__":
    stall("stall-silas", ["#b8322a", "#f2ece0"], g_silas, sign="#e2b04a")
    stall("stall-fish", ["#2c5aa0", "#f2ece0"], g_fish)
    stall("stall-fruit", ["#3f8f3a", "#f2e6b8"], g_fruit)
    house("house-a", 6.0, 4.6, 2, "#efe4cc", "#4a2e1a", "#a8452f", 1)
    house("house-b", 5.0, 4.4, 1, "#e6d6b4", "#5a3920", "#3f6f8a", 2)
    house("tavern", 7.5, 5.4, 2, "#f2e8d2", "#3d2615", "#8a3a2a", 3, tavern=True)
    lighthouse("lighthouse")
    props()
