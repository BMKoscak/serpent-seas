"""Sea-of-Thieves-style village and adventure pieces: crooked houses with shingle roofs, a walk-in tavern,
stone well, cauldron, treasure chests, message bottle, fishing spot, cannon targets, jungle plants, cliff, cave."""
import sys, math, random
sys.path.insert(0, "/home/claude/work/blender")
from lib import *

OUT = "/home/claude/work/out/"
def save(name, parts, wob=None):
    ob = join(parts, name)
    if wob: wobble(ob, **wob);
    export(OUT + name + ".glb", [ob]); print(name, tris([ob])); return ob

def shade(h, k):
    r, g, b = hexrgb(h); return "#%02x%02x%02x" % (min(255, int(r * 255 * k)), min(255, int(g * 255 * k)), min(255, int(b * 255 * k)))

def shingle_roof(w, d, yb, rh, ov, color, R, rows=7, tab=0.34):
    """two slopes of overlapping shingle rows with tabbed bottom edges (ridge along x)"""
    p = []
    L = math.hypot(d / 2 + ov, rh)
    for sz in (1, -1):
        for r in range(rows):
            t0 = r / rows; t1 = min(1.0, (r + 1.35) / rows)
            z0 = sz * (d / 2 + ov) * (1 - t0); z1 = sz * (d / 2 + ov) * (1 - t1)
            y0 = yb - 0.35 + rh * t0 + 0.02 * r; y1 = yb - 0.35 + rh * t1 + 0.02 * r
            n = int((w + 2 * ov) / tab)
            vs = [(-w / 2 - ov, y1, z1), (w / 2 + ov, y1, z1)]
            for i in range(n, -1, -1):
                x = -w / 2 - ov + (w + 2 * ov) * i / n
                drop = 0.0 if i % 2 == 0 else 0.1
                vs.append((x, y0 - drop * rh / L, z0 + sz * drop * (d / 2 + ov) / L))
            f = list(range(len(vs)))
            col = shade(color, 0.9 + 0.12 * ((r * 7) % 3) / 2)
            p.append(poly(vs, [f if sz < 0 else f[::-1]], "shingles", col, 0.08, R))
    p.append(box(w + 2 * ov + 0.12, 0.16, 0.26, (0, yb - 0.35 + rh + 0.06, 0), (0, 0, 0), shade(color, 0.7), material=R))
    return p

def timber_house(name, w, d, floors, wall, beam_c, roof_c, seed, chimney=True, walkin=False, extra=None):
    reset(); rnd = random.Random(seed)
    W_ = mat("wood", 0.9); R = mat("roof", 0.85); R.use_backface_culling = False
    PL = mat("plaster", 0.95); PL.use_backface_culling = False
    GLOW = mat("glow", 0.6, emit="#ffcf6a"); ST = mat("stone", 0.95)
    p = []
    fh = 2.8; H = floors * fh
    p.append(box(w + 0.3, 0.5, d + 0.3, (0, 0.25, 0), color="#8d8a84", material=ST, bevel=0.08))
    for k in range(int((w + d) * 1.2)):  # stones poking out of the base
        side = rnd.random(); x = (rnd.random() - 0.5) * w; z = d / 2 + 0.16 if side < 0.5 else -d / 2 - 0.16
        p.append(box(0.4 + rnd.random() * 0.3, 0.22, 0.12, (x, 0.12 + rnd.random() * 0.25, z), color=["#9a968f", "#85817a", "#a8a49c"][k % 3], material=ST))
    T = 0.18  # wall thickness
    def wall_panel(x0, x1, y0, y1, z, along="x"):
        if along == "x": return box(x1 - x0, y1 - y0, T, ((x0 + x1) / 2, (y0 + y1) / 2, z), color=wall, material=PL)
        return box(T, y1 - y0, x1 - x0, (z, (y0 + y1) / 2, (x0 + x1) / 2), color=wall, material=PL)
    door_w, door_h = (1.5, 2.4) if walkin else (1.0, 1.9)
    # walls (front split around the door)
    p.append(wall_panel(-w / 2, -door_w / 2, 0.5, H + 0.5, d / 2 - T / 2))
    p.append(wall_panel(door_w / 2, w / 2, 0.5, H + 0.5, d / 2 - T / 2))
    p.append(wall_panel(-door_w / 2, door_w / 2, 0.5 + door_h, H + 0.5, d / 2 - T / 2))
    p.append(wall_panel(-w / 2, w / 2, 0.5, H + 0.5, -d / 2 + T / 2))
    for sx in (-1, 1): p.append(wall_panel(-d / 2, d / 2, 0.5, H + 0.5, sx * (w / 2 - T / 2), along="z"))
    # timber frame
    for zf in (d / 2 + 0.02, -d / 2 - 0.02):
        for x in [-w / 2 + 0.08, w / 2 - 0.08] + [(-w / 2 + w * k / 3) for k in (1, 2)]:
            if zf > 0 and abs(x) < door_w / 2 + 0.05: continue
            p.append(box(0.16, H, 0.08, (x, 0.5 + H / 2, zf), color=beam_c, material=W_))
        for f in range(floors + 1):
            p.append(box(w + 0.1, 0.16, 0.08, (0, 0.5 + f * fh, zf), color=beam_c, material=W_))
        for k in range(3):
            x0 = -w / 2 + w * k / 3
            if floors > 1: p.append(beam((x0 + 0.12, 0.5 + fh + 0.12, zf), (x0 + w / 3 - 0.12, 0.5 + 2 * fh - 0.15, zf), 0.06, 5, beam_c, material=W_))
    for sx in (-1, 1):
        for z in (-d / 2 + 0.08, d / 2 - 0.08):
            p.append(box(0.08, H, 0.16, (sx * (w / 2 + 0.02), 0.5 + H / 2, z), color=beam_c, material=W_))
        for f in range(floors + 1): p.append(box(0.08, 0.16, d + 0.1, (sx * (w / 2 + 0.02), 0.5 + f * fh, 0), color=beam_c, material=W_))
    # door frame (and a door for closed houses)
    for sx in (-1, 1): p.append(box(0.14, door_h + 0.1, 0.24, (sx * (door_w / 2 + 0.05), 0.5 + door_h / 2, d / 2), color=beam_c, material=W_))
    p.append(box(door_w + 0.4, 0.18, 0.26, (0, 0.5 + door_h + 0.05, d / 2), color=beam_c, material=W_))
    if not walkin:
        p.append(box(door_w, door_h, 0.08, (0, 0.5 + door_h / 2, d / 2 + 0.02), color="#5a3420", material=W_))
        for k in range(4): p.append(box(0.02, door_h - 0.1, 0.02, (-door_w / 2 + 0.2 + k * 0.2, 0.5 + door_h / 2, d / 2 + 0.07), color="#3d2214"))
        p.append(ball(0.05, (0.32, 1.45, d / 2 + 0.1), color="#e2b04a", sub=1))
    # windows with shutters and flower boxes
    for f in range(floors):
        xs = (-w / 3, w / 3) if f == 0 else (-w / 3, 0, w / 3)
        for x in xs:
            if f == 0 and abs(x) < door_w / 2 + 0.6: continue
            y = 0.5 + f * fh + 1.55
            lit = rnd.random() < 0.65
            p.append(box(0.85, 0.9, 0.06, (x, y, d / 2 + 0.01), color="#ffd98a" if lit else "#5d7f99", material=GLOW if lit else None))
            p.append(box(0.06, 0.9, 0.1, (x, y, d / 2 + 0.04), color=beam_c)); p.append(box(0.85, 0.06, 0.1, (x, y, d / 2 + 0.04), color=beam_c))
            sc = ["#2f6f6a", "#8a3a2a", "#2c5aa0", "#6b8a3a"][seed % 4]
            for sx in (-1, 1): p.append(box(0.4, 0.95, 0.06, (x + sx * 0.64, y, d / 2 + 0.05), (0, -sx * 12, 0), sc))
            p.append(box(1.0, 0.2, 0.26, (x, y - 0.56, d / 2 + 0.14), color="#7a5233", material=W_))
            for k in range(5): p.append(ball(0.08, (x - 0.4 + k * 0.2, y - 0.4, d / 2 + 0.16), color=["#e04a5a", "#f2c84b", "#f4f1ea", "#b28be0", "#ef6b54"][k], sub=1))
        for z in (-d / 4, d / 4):
            p.append(box(0.06, 0.75, 0.75, (w / 2 + 0.03, 0.5 + f * fh + 1.55, z), color="#ffd98a", material=GLOW))
            p.append(box(0.06, 0.75, 0.75, (-w / 2 - 0.03, 0.5 + f * fh + 1.55, z), color="#ffd98a", material=GLOW))
    # roof
    rh = 2.4; ov = 0.55; yb = 0.5 + H + 0.35
    p += shingle_roof(w, d, yb, rh, ov, roof_c, R)
    for sx in (-1, 1):
        p.append(poly([(sx * (w / 2 - 0.02), yb - 0.4, d / 2), (sx * (w / 2 - 0.02), yb - 0.4, -d / 2), (sx * (w / 2 - 0.02), yb - 0.35 + rh, 0)], [[0, 1, 2] if sx > 0 else [2, 1, 0]], "gable", wall, 0.03, PL))
        p.append(box(0.1, 0.14, d + 0.2, (sx * (w / 2 + 0.03), yb - 0.36, 0), color=beam_c, material=W_))
    if chimney:
        cx = w / 2 - 0.9
        for k in range(8): p.append(box(0.72 - (k % 2) * 0.04, 0.32, 0.72 - (k % 2) * 0.04, (cx, yb + rh - 1.1 + k * 0.32, -d / 4), (0, (k % 3 - 1) * 4, 0), ["#8d8a84", "#9a968f", "#7e7a73"][k % 3], material=ST))
        p.append(box(0.85, 0.12, 0.85, (cx, yb + rh + 1.5, -d / 4), color="#6a665f", material=ST))
    if walkin:
        p += tavern_inside(w, d, fh, W_, GLOW, ST)
    if extra: p += extra(w, d, W_)
    return save(name, p, {"amp": 0.1, "freq": 0.4, "seed": seed, "lean": 0.03})

def tavern_inside(w, d, fh, W_, GLOW, ST):
    GOLD = mat("gold", 0.42, 0.3)
    p = []
    fy = 0.5
    # plank floor
    for i in range(int(w / 0.3)):
        p.append(box(0.29, 0.04, d - 0.4, (-w / 2 + 0.2 + i * 0.3 + 0.15, fy + 0.02, 0), color=["#8a5a30", "#7a4e2a", "#946236"][i % 3], material=W_, bevel=0.01))
    # ceiling and beams
    p.append(box(w - 0.3, 0.12, d - 0.3, (0, fy + fh - 0.06, 0), color="#6b4428", material=W_))
    for k in range(4): p.append(box(w - 0.3, 0.2, 0.22, (0, fy + fh - 0.2, -d / 2 + 0.8 + k * (d - 1.6) / 3), color="#4a2e1a", material=W_))
    # bar counter along the back wall
    bz = -d / 2 + 1.25
    p.append(box(4.4, 1.1, 0.6, (-0.6, fy + 0.55, bz), color="#7a4a26", material=W_))
    p.append(box(4.6, 0.1, 0.8, (-0.6, fy + 1.15, bz), color="#5a3420", material=W_))
    for k in range(9): p.append(box(0.04, 1.0, 0.04, (-2.7 + k * 0.52, fy + 0.5, bz + 0.31), color="#4a2e1a"))
    # shelves with bottles on the back wall
    for row in range(3):
        y = fy + 1.4 + row * 0.5
        p.append(box(4.0, 0.06, 0.32, (-0.6, y, -d / 2 + 0.36), color="#5a3420", material=W_))
        for k in range(12):
            c = ["#3f8f3a", "#8a3a2a", "#c99b3a", "#2c5aa0", "#6b2e6a", "#e9dfc8"][(k + row) % 6]
            p.append(cyl(0.05, 0.035, 0.26 + (k % 3) * 0.04, 8, (-2.4 + k * 0.33, y + 0.03, -d / 2 + 0.36), color=c))
    # kegs behind the bar
    for k in range(2):
        p.append(cyl(0.38, 0.38, 0.8, 12, (1.9, fy + 0.4 + k * 0.82, -d / 2 + 0.55), color="#8a5a30", axis="x"))
    # tables, stools and mugs
    for (tx, tz) in ((-1.8, 0.9), (1.6, 0.6)):
        p.append(cyl(0.6, 0.6, 0.08, 14, (tx, fy + 0.8, tz), color="#8a5a30", material=W_))
        p.append(cyl(0.08, 0.12, 0.8, 8, (tx, fy, tz), color="#5a3420", material=W_))
        for k in range(3):
            a = k / 3 * math.tau + 0.4
            p.append(cyl(0.2, 0.2, 0.06, 10, (tx + math.cos(a) * 0.95, fy + 0.5, tz + math.sin(a) * 0.95), color="#7a4a26", material=W_))
            p.append(cyl(0.05, 0.05, 0.5, 6, (tx + math.cos(a) * 0.95, fy, tz + math.sin(a) * 0.95), color="#4a2e1a"))
            p.append(cyl(0.07, 0.065, 0.16, 8, (tx + math.cos(a + 0.6) * 0.35, fy + 0.88, tz + math.sin(a + 0.6) * 0.35), color="#c99b3a", material=GOLD))
            p.append(cyl(0.06, 0.06, 0.02, 8, (tx + math.cos(a + 0.6) * 0.35, fy + 1.04, tz + math.sin(a + 0.6) * 0.35), color="#fbfaf6"))
    # fireplace on the right wall
    fx = w / 2 - 0.45
    p.append(box(0.6, 2.0, 2.0, (fx, fy + 1.0, -0.4), color="#8d8a84", material=ST, bevel=0.06))
    p.append(box(0.62, 0.9, 1.1, (fx - 0.03, fy + 0.45, -0.4), color="#1e1712"))
    for k in range(3): p.append(cyl(0.07, 0.07, 0.8, 6, (fx - 0.15, fy + 0.08 + k * 0.08, -0.8 + k * 0.05), (0, 0, 0), "#5a3420", axis="z"))
    for k in range(4): p.append(cyl(0.14 - k * 0.025, 0.0, 0.5 - k * 0.08, 6, (fx - 0.15, fy + 0.15, -0.6 + k * 0.13), color="#ff9a3a", material=GLOW))
    p.append(box(0.8, 0.12, 2.2, (fx - 0.1, fy + 2.0, -0.4), color="#5a3420", material=W_))
    # chandelier
    p.append(cyl(0.7, 0.7, 0.08, 12, (0, fy + fh - 0.9, 0.3), color="#4a2e1a", caps=False))
    for k in range(6):
        a = k / 6 * math.tau
        p.append(cyl(0.035, 0.035, 0.12, 6, (math.cos(a) * 0.7, fy + fh - 0.86, 0.3 + math.sin(a) * 0.7), color="#f2ecdc"))
        p.append(ball(0.04, (math.cos(a) * 0.7, fy + fh - 0.7, 0.3 + math.sin(a) * 0.7), color="#ffcf6a", sub=1, material=GLOW))
    for k in range(3): p.append(beam((0, fy + fh - 0.2, 0.3), (math.cos(k * 2.1) * 0.7, fy + fh - 0.86, 0.3 + math.sin(k * 2.1) * 0.7), 0.012, 4, "#2b2b2b"))
    # barrels in the corner and a notice board
    for (x, z) in ((-w / 2 + 0.6, d / 2 - 0.8), (-w / 2 + 0.6, d / 2 - 1.6), (-w / 2 + 1.35, d / 2 - 0.85)):
        p.append(cyl(0.36, 0.36, 0.9, 12, (x, fy, z), color="#8a5a30"))
        for yy in (0.15, 0.72): p.append(cyl(0.38, 0.38, 0.05, 12, (x, fy + yy, z), color="#3b3b40"))
    p.append(box(1.2, 0.8, 0.06, (-w / 2 + 0.2, fy + 1.7, -0.6), (0, 90, 0), "#8a5a30", material=W_))
    for k in range(4): p.append(box(0.3, 0.36, 0.02, (-w / 2 + 0.24, fy + 1.6 + (k // 2) * 0.25, -0.95 + (k % 2) * 0.5 + (k // 2) * 0.1), (0, 90, (k - 1.5) * 5), "#efe2c0"))
    return p

def well():
    reset(); ST = mat("stone", 0.95); W_ = mat("wood", 0.9); R = mat("roof", 0.85); R.use_backface_culling = False
    p = []; rnd = random.Random(4)
    for course in range(4):
        n = 12
        for k in range(n):
            a = (k + 0.5 * (course % 2)) / n * math.tau
            p.append(box(0.52, 0.24, 0.32, (math.cos(a) * 0.95, 0.12 + course * 0.24, math.sin(a) * 0.95), (0, -math.degrees(a) + 90, 0), ["#9a968f", "#85817a", "#a8a49c", "#8f8a80"][(k + course) % 4], material=ST, bevel=0.06))
    p.append(cyl(0.82, 0.82, 0.05, 14, (0, 0.6, 0), color="#1d3c50"))
    for x in (-1.0, 1.0): p.append(box(0.16, 2.3, 0.16, (x, 1.2, 0), color="#6b4428", material=W_))
    p.append(cyl(0.07, 0.07, 2.3, 8, (-1.15, 1.85, 0), axis="x", color="#5a3920", material=W_))
    p.append(box(0.06, 0.3, 0.06, (1.2, 1.7, 0), color="#5a3920", material=W_))
    p.append(cyl(0.11, 0.11, 0.5, 10, (-0.25, 1.85, 0), axis="x", color="#c2a476"))
    p.append(beam((0.0, 1.8, 0), (0.0, 1.1, 0), 0.012, 4, "#c2a476"))
    p.append(cyl(0.15, 0.12, 0.26, 10, (0.0, 0.85, 0), color="#7a5233", material=W_))
    p += shingle_roof(2.3, 1.7, 2.45, 0.85, 0.15, "#5a4a3a", R, rows=4, tab=0.28)
    return save("well", p)

def cauldron():
    reset(); IRON = mat("iron", 0.55, 0.5); GLOW = mat("glow", 0.5, emit="#ffa040"); STEW = mat("stew", 0.4, emit="#7cff5a"); W_ = mat("wood", 0.9); ST = mat("stone", 0.95)
    p = []
    p.append(loft([(0.32, 0, 0, 0.3, 0.3), (0.45, 0, 0, 0.48, 0.48), (0.75, 0, 0, 0.55, 0.55), (1.0, 0, 0, 0.5, 0.5), (1.05, 0, 0, 0.56, 0.56), (1.1, 0, 0, 0.53, 0.53)], 16, "pot", "#2a2a2e", IRON, caps=(True, False)))
    p.append(cyl(0.5, 0.5, 0.02, 16, (0, 0.98, 0), color="#6fe04a", material=STEW))
    for k in range(6):
        a = k * 1.7; r = 0.1 + (k % 3) * 0.12
        p.append(ball(0.045 + (k % 2) * 0.03, (math.cos(a) * r, 1.0, math.sin(a) * r), (1, 0.6, 1), "#9cff7a", sub=1, material=STEW))
    for k in range(3):
        a = k / 3 * math.tau
        p.append(beam((math.cos(a) * 0.4, 0.45, math.sin(a) * 0.4), (math.cos(a) * 0.55, 0.0, math.sin(a) * 0.55), 0.04, 6, "#2a2a2e", material=IRON))
    for k in range(8):  # brick ring
        a = k / 8 * math.tau
        p.append(box(0.32, 0.16, 0.2, (math.cos(a) * 0.62, 0.08, math.sin(a) * 0.62), (0, -math.degrees(a), 0), ["#9a5a3a", "#8a4a2e", "#a8664a"][k % 3], material=ST))
    for k in range(4):
        a = k / 4 * math.tau + 0.4
        p.append(beam((math.cos(a) * 0.45, 0.06, math.sin(a) * 0.45), (-math.cos(a) * 0.2, 0.14, -math.sin(a) * 0.2), 0.06, 6, "#5a3420", material=W_))
    for k in range(5):
        a = k / 5 * math.tau
        p.append(cyl(0.11, 0.0, 0.3 + (k % 2) * 0.12, 6, (math.cos(a) * 0.18, 0.08, math.sin(a) * 0.18), color=["#ff8a2a", "#ffc24a"][k % 2], material=GLOW))
    p.append(cyl(0.012, 0.012, 0.7, 5, (0.3, 0.95, 0.1), (0, 0, 30), "#8a5a30", material=W_))
    return save("cauldron", p)

def chests():
    for opened in (False, True):
        reset(); W_ = mat("wood", 0.9); GOLD = mat("gold", 0.42, 0.3)
        p = [box(0.9, 0.5, 0.6, (0, 0.25, 0), color="#7a4a24", material=W_, bevel=0.03)]
        for x in (-0.32, 0.32): p.append(box(0.08, 0.52, 0.62, (x, 0.26, 0), color="#c99b3a", material=GOLD))
        lid = []
        lid.append(loft([(-0.0, 0, 0, 0.3, 0.001)], 2, "x", None, W_) if False else None)
        lid_parts = [cyl(0.3, 0.3, 0.9, 12, (-0.45, 0.0, 0.0), color="#6b3e1e", axis="x", material=W_)]
        for x in (-0.32, 0.32): lid_parts.append(cyl(0.31, 0.31, 0.08, 12, (x - 0.04, 0.0, 0.0), color="#c99b3a", axis="x", material=GOLD))
        lid_ob = join(lid_parts, "lid")
        # keep only the top half of the lid cylinder: squash it into a half-dome shape
        for v in lid_ob.data.vertices:
            if v.co.z < 0: v.co.z = 0
        if opened:
            lid_ob.matrix_world = Matrix.Translation(G(0, 0.5, -0.3)) @ Matrix.Rotation(math.radians(-110), 4, "X") @ Matrix.Translation(G(0, 0, 0.3))
        else:
            lid_ob.matrix_world = Matrix.Translation(G(0, 0.5, 0))
        p.append(lid_ob)
        p.append(box(0.14, 0.18, 0.05, (0, 0.42, 0.31), color="#e2b04a", material=GOLD))
        if opened:
            for k in range(30):
                a = k * 2.4; r = 0.04 + (k % 7) * 0.035
                p.append(ball(0.045, (math.cos(a) * r * 1.6, 0.48 + max(0, 0.16 - r * 0.5), math.sin(a) * r), color="#f1c84b", sub=1, material=GOLD))
            p.append(ball(0.06, (0.15, 0.56, 0.05), color="#d23b5a", sub=1)); p.append(ball(0.05, (-0.2, 0.55, -0.05), color="#3b8fe0", sub=1))
        save("chest-open" if opened else "chest", p)

def bottle():
    reset(); GL = mat("glass", 0.15, 0.1); W_ = mat("wood", 0.9)
    p = [loft([(0.0, 0, 0, 0.09, 0.09), (0.02, 0, 0, 0.12, 0.12), (0.26, 0, 0, 0.12, 0.12), (0.34, 0, 0, 0.06, 0.06), (0.46, 0, 0, 0.04, 0.04)], 12, "bottle", "#5fae9a", GL),
         cyl(0.042, 0.04, 0.06, 8, (0, 0.45, 0), color="#a77a4c", material=W_),
         cyl(0.035, 0.035, 0.2, 8, (0, 0.06, 0), color="#efe2c0"),
         box(0.01, 0.12, 0.02, (0.04, 0.1, 0.03), color="#a33a2a")]
    ob = join(p, "bottle")
    ob.rotation_euler = (math.radians(75), 0, math.radians(20)); bpy.ops.object.transform_apply(rotation=True)
    export(OUT + "bottle.glb", [ob]); print("bottle")

def fishing_spot():
    reset(); W_ = mat("wood", 0.9); M = mat("vc", 0.88)
    p = [cyl(0.22, 0.18, 0.32, 12, (0, 0, 0), color="#7a5233", material=W_), cyl(0.2, 0.2, 0.02, 12, (0, 0.28, 0), color="#2d5a7a")]
    for k in range(3): p.append(ball(0.07, (-0.06 + k * 0.06, 0.32, 0.03 * k), (1.8, 0.6, 0.7), ["#8aa6b8", "#c0854a", "#b8c4cc"][k], sub=1))
    p.append(box(0.08, 1.1, 0.08, (0.6, 0.55, 0), color="#6b4428", material=W_))
    p.append(box(0.7, 0.42, 0.06, (0.6, 1.0, 0.05), (0, 0, -4), "#8a5a30", material=W_))
    p.append(uvball(0.12, 10, 6, (0.6, 1.0, 0.09), (1.3, 0.6, 0.3), "#3b8fb0"))
    p.append(beam((-0.45, 0.05, 0.15), (-0.2, 1.6, -0.6), 0.02, 5, "#8a5a30", material=W_))
    save("fishing-spot", p)

def target():
    reset(); W_ = mat("wood", 0.9)
    p = [cyl(0.5, 0.5, 1.1, 12, (0, -0.4, 0), color="#8a5a30", material=W_)]
    for yy in (-0.2, 0.45): p.append(cyl(0.52, 0.52, 0.06, 12, (0, yy, 0), color="#3b3b40"))
    p.append(box(0.08, 1.4, 0.08, (0, 1.2, 0), color="#6b4428", material=W_))
    for k, c in enumerate(["#f2ecdc", "#c0392b", "#f2ecdc", "#c0392b"]):
        p.append(cyl(0.55 - k * 0.13, 0.55 - k * 0.13, 0.04, 16, (0, 1.6, 0.06 + k * 0.01), color=c, axis="z"))
    p.append(cyl(0.06, 0.06, 0.6, 6, (0.0, 0.5, 0), color="#6b4428"))
    save("target", p)

def jungle():
    # broad-leaf plant (monstera-like)
    reset(); L = mat("leaf", 0.8); L.use_backface_culling = False; M = mat("nat", 0.9)
    p = []
    rnd = random.Random(5)
    for f in range(7):
        ang = f / 7 * math.tau + rnd.random() * 0.4; ln = 1.0 + rnd.random() * 0.6; h = 0.6 + rnd.random() * 0.7
        dx, dz = math.cos(ang), math.sin(ang)
        tip = (dx * ln * 0.55, h, dz * ln * 0.55)
        p.append(beam((0, 0, 0), tip, 0.025, 5, "#4a7f30", material=M))
        vs, fs = [], []; px, pz = -dz, dx
        for i in range(7):
            t = i / 6; d = ln * 0.55 + ln * 0.75 * t; y = h + 0.25 * math.sin(t * 2.4) - 0.65 * t * t
            wd = 0.42 * math.sin(math.pi * min(1, t * 1.05 + 0.04)) * ln
            vs += [(dx * d + px * wd, y - 0.05, dz * d + pz * wd), (dx * d, y + 0.04, dz * d), (dx * d - px * wd, y - 0.05, dz * d - pz * wd)]
        for i in range(6): a = i * 3; fs += [[a, a + 3, a + 4, a + 1], [a + 1, a + 4, a + 5, a + 2]]
        p.append(poly(vs, fs, "leaf", ["#2f7f3a", "#3a9a42", "#2a6f34"][f % 3], 0.06, L))
    save("jungle-a", p)
    # banana plant
    reset(); L = mat("leaf", 0.8); L.use_backface_culling = False; M = mat("nat", 0.9)
    p = [cyl(0.16, 0.1, 2.2, 8, (0, 0, 0), color="#6f8f3a", material=M)]
    for f in range(6):
        ang = f / 6 * math.tau + 0.3; dx, dz = math.cos(ang), math.sin(ang); px, pz = -dz, dx
        vs, fs = [], []
        for i in range(8):
            t = i / 7; d = 0.1 + 1.9 * t; y = 2.2 + 0.6 * math.sin(t * 2.0) - 1.3 * t * t
            wd = 0.3 * math.sin(math.pi * min(1, t * 1.1 + 0.05))
            vs += [(dx * d + px * wd, y - 0.06, dz * d + pz * wd), (dx * d, y + 0.04, dz * d), (dx * d - px * wd, y - 0.06, dz * d - pz * wd)]
        for i in range(7): a = i * 3; fs += [[a, a + 3, a + 4, a + 1], [a + 1, a + 4, a + 5, a + 2]]
        p.append(poly(vs, fs, "leaf", ["#4c9e40", "#3f8f3a"][f % 2], 0.06, L))
    for k in range(5): p.append(uvball(0.06, 8, 5, (0.18 + (k % 2) * 0.05, 1.8 - k * 0.09, 0.05), (0.6, 1.8, 0.6), "#e9c43a", material=M, rot=(0, 0, -25)))
    save("jungle-b", p)
    # tall grass clump
    reset(); L = mat("leaf", 0.8); L.use_backface_culling = False
    p = []; rnd = random.Random(9)
    for k in range(18):
        a = rnd.random() * math.tau; r = rnd.random() * 0.35; h = 0.6 + rnd.random() * 0.6; lean = rnd.random() * 0.4
        x, z = math.cos(a) * r, math.sin(a) * r
        p.append(poly([(x - 0.05, 0, z), (x + 0.05, 0, z), (x + math.cos(a) * lean, h, z + math.sin(a) * lean)], [[0, 1, 2]], "blade", ["#5aa848", "#4c9e40", "#6fbf55"][k % 3], 0.06, L))
    save("grass-tall", p)

def cliff():
    reset(); ST = mat("rock", 0.95)
    p = []
    for k, (x, y, z, sx, sy, sz) in enumerate(((0, 2.5, 0, 6.5, 3.5, 3.0), (-4.5, 1.8, 0.6, 3.5, 2.6, 2.6), (4.8, 1.5, 0.4, 3.2, 2.2, 2.4), (0.5, 5.6, -0.8, 5.0, 2.2, 2.4), (-2.5, 7.0, -1.2, 3.0, 1.6, 2.0))):
        p.append(ball(1.0, (x, y, z), (sx, sy, sz), None, sub=2, noise=0.18, seed=k + 11, material=ST))
    ob = join(p, "cliff")
    def rc(c, n):
        band = int(c.y * 1.4) % 3
        if n.y > 0.75: return "#6f9a4a"
        return ["#8d8a84", "#7e7a73", "#9a958c"][band]
    paint(ob, rc, 0.07)
    export(OUT + "cliff.glb", [ob]); print("cliff", tris([ob]))

def cave():
    reset(); ST = mat("rock", 0.95); ST.use_backface_culling = False
    import bmesh as _bm
    bm = _bm.new(); _bm.ops.create_icosphere(bm, subdivisions=3, radius=6.5)
    rnd = random.Random(3)
    for v in bm.verts:
        v.co *= 1 + (rnd.random() - 0.5) * 0.16 + 0.08 * math.sin(v.co.x * 0.9) * math.cos(v.co.y * 0.7)
        v.co.z *= 0.62
    kill = [f for f in bm.faces if f.calc_center_median().z < 0.05 or (f.calc_center_median().y < -2.0 and abs(f.calc_center_median().x) < 1.9 and f.calc_center_median().z < 3.4)]
    _bm.ops.delete(bm, geom=kill, context="FACES")
    from lib import _obj_from_bm
    shell = _obj_from_bm(bm, "cave-shell", ST)
    mod = shell.modifiers.new("solid", "SOLIDIFY"); mod.thickness = 0.9; mod.offset = 0
    bpy.context.view_layer.objects.active = shell; bpy.ops.object.modifier_apply(modifier="solid")
    def rc(c, n):
        if n.y > 0.7 and c.y > 2: return "#6f9a4a"
        return ["#7e7a73", "#8d8a84", "#6f6b64"][int(c.y * 1.2) % 3]
    paint(shell, rc, 0.07)
    parts = [shell]
    # crystals glowing in the dark and some stalactites
    CR = mat("crystal", 0.3, emit="#5fe0ff")
    for k in range(9):
        a = rnd.random() * math.tau; r = 4.2 + rnd.random() * 0.9
        parts.append(cyl(0.18, 0.0, 0.6 + rnd.random() * 0.6, 5, (math.cos(a) * r, 0.0, math.sin(a) * r * 0.9), ((rnd.random() - 0.5) * 30, 0, (rnd.random() - 0.5) * 30), "#7fe8ff", material=CR))
    for k in range(10):
        a = rnd.random() * math.tau; r = rnd.random() * 3.5
        parts.append(cyl(0.22, 0.0, 0.7 + rnd.random() * 0.6, 6, (math.cos(a) * r, 3.9 - 0.2 * r, math.sin(a) * r), (180, 0, 0), "#7e7a73", material=ST))
    ob = join(parts, "cave")
    export(OUT + "cave.glb", [ob]); print("cave", tris([ob]))

if __name__ == "__main__":
    timber_house("house-a", 6.0, 4.6, 2, "#efe4cc", "#4a2e1a", "#a8452f", 1)
    timber_house("house-b", 5.0, 4.4, 1, "#e6d6b4", "#5a3920", "#3f6f8a", 2)
    timber_house("house-c", 5.4, 4.6, 2, "#f2e2c4", "#3d2615", "#6b5a3a", 5)
    timber_house("tavern", 8.0, 6.4, 2, "#f2e8d2", "#3d2615", "#8a3a2a", 3, walkin=True)
    well(); cauldron(); chests(); bottle(); fishing_spot(); target(); jungle(); cliff(); cave()
