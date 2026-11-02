import sys, math, random
sys.path.insert(0, "/home/claude/work/blender")
from lib import *

OUT = "/home/claude/work/out/"

def palm(name, seed, height=4.3, bend=1.3, fronds=8):
    reset(); rnd = random.Random(seed)
    M = mat("nat", 0.9); L = mat("leaf", 0.85); L.use_backface_culling = False
    parts = []
    segs = 8
    pts = []
    for i in range(segs + 1):
        t = i / segs
        pts.append((bend * t ** 1.8, height * t, 0.25 * math.sin(t * 2.2) * (seed % 2 * 2 - 1)))
    for i in range(segs):
        a, b = pts[i], pts[i + 1]
        r0 = 0.24 - 0.11 * (i / segs); r1 = 0.24 - 0.11 * ((i + 1) / segs)
        parts.append(beam(a, b, r0 * 0.95, 7, "#8a6440" if i % 2 else "#7a5636", "seg", M))
        parts.append(cyl(r1 * 1.18, r1 * 1.05, 0.08, 7, b, color="#5f4329", material=M))
    top = pts[-1]
    # coconuts
    for k in range(4):
        a = k / 4 * math.tau + rnd.random()
        parts.append(ball(0.13, (top[0] + math.cos(a) * 0.16, top[1] - 0.15, top[2] + math.sin(a) * 0.16), color="#5a3c1e", sub=1, material=M))
    # fronds
    leaf_parts = []
    for f in range(fronds):
        ang = f / fronds * math.tau + rnd.random() * 0.4
        length = 2.1 + rnd.random() * 0.6
        lift = 0.5 + rnd.random() * 0.4
        n = 7; vs = []; fs = []
        dx, dz = math.cos(ang), math.sin(ang)
        px, pz = -dz, dx
        for i in range(n + 1):
            t = i / n
            d = length * t
            y = top[1] + lift * math.sin(t * math.pi * 0.75) - 1.4 * t * t
            w = 0.38 * math.sin(math.pi * min(1, t * 1.15 + 0.05)) + 0.02
            cx, cz = top[0] + dx * d, top[2] + dz * d
            vs += [(cx + px * w, y - 0.08 * w, cz + pz * w), (cx, y + 0.06, cz), (cx - px * w, y - 0.08 * w, cz - pz * w)]
        for i in range(n):
            a = i * 3
            fs += [[a, a + 3, a + 4, a + 1], [a + 1, a + 4, a + 5, a + 2]]
        g = ["#3f8f3a", "#4fa646", "#358033", "#5bb24d"][f % 4]
        leaf_parts.append(poly(vs, fs, "frond", lambda c, nn, g=g: g if nn.y > -0.2 else "#2f6f2c", 0.06, L))
    ob = join(parts + leaf_parts, name)
    export(OUT + name + ".glb", [ob])
    return ob

def rock(name, seed, size=(1.6, 1.0, 1.3), moss=True):
    reset(); M = mat("rock", 0.95)
    rnd = random.Random(seed)
    parts = [ball(0.9, (0, size[1] * 0.35, 0), size, None, sub=1, noise=0.28, seed=seed, material=M)]
    for k in range(rnd.randint(1, 3)):
        a = rnd.random() * math.tau; r = 0.4 + rnd.random() * 0.35
        parts.append(ball(r, (math.cos(a) * size[0] * 0.7, r * 0.4, math.sin(a) * size[2] * 0.7), (1, 0.8, 1), None, sub=1, noise=0.3, seed=seed + k + 1, material=M))
    ob = join(parts, name)
    base = ["#8d8a84", "#7e7a73", "#9a958c"][seed % 3]
    paint(ob, lambda c, n: ("#6f8f4a" if moss and n.y > 0.72 and c.y > 0.25 else base if n.y > -0.2 else "#6a665f"), 0.07)
    # sink a little so it never floats
    export(OUT + name + ".glb", [ob]); return ob

def bush(name, seed, n=5, scale=1.0, berries=None):
    reset(); M = mat("nat", 0.9); rnd = random.Random(seed)
    parts = []
    for k in range(n):
        a = k / n * math.tau + rnd.random(); r = (0.45 + rnd.random() * 0.25) * scale; d = 0.35 * scale if k else 0
        g = ["#3f8f3a", "#4c9e40", "#58a94a", "#357f34"][k % 4]
        parts.append(ball(r, (math.cos(a) * d, r * 0.85 + (0.15 * scale if k == 0 else 0), math.sin(a) * d), (1, 0.85, 1), g, sub=1, noise=0.15, seed=seed + k, material=M))
    if berries:
        for k in range(7):
            a = rnd.random() * math.tau; e = rnd.random() * 0.8
            parts.append(ball(0.06 * scale, (math.cos(a) * 0.55 * scale, (0.5 + e * 0.5) * scale, math.sin(a) * 0.55 * scale), color=berries, sub=0, material=M))
    ob = join(parts, name); export(OUT + name + ".glb", [ob]); return ob

def flowers(name, seed, colors=("#f2c84b", "#ef6b54", "#f4f1ea", "#b28be0")):
    reset(); M = mat("nat", 0.9); rnd = random.Random(seed); parts = []
    for k in range(9):
        a = rnd.random() * math.tau; d = rnd.random() * 0.45
        x, z = math.cos(a) * d, math.sin(a) * d; h = 0.25 + rnd.random() * 0.25
        parts.append(beam((x, 0, z), (x + 0.03, h, z), 0.015, 4, "#4f8f3a", material=M))
        parts.append(ball(0.07, (x + 0.03, h, z), (1, 0.6, 1), colors[k % len(colors)], sub=0, material=M))
        parts.append(ball(0.03, (x + 0.03, h + 0.035, z), color="#f2d34b", sub=0, material=M))
    for k in range(6):
        a = rnd.random() * math.tau; d = rnd.random() * 0.4
        parts.append(poly([(math.cos(a) * d - 0.05, 0, math.sin(a) * d), (math.cos(a) * d + 0.05, 0, math.sin(a) * d), (math.cos(a) * d + 0.02, 0.3, math.sin(a) * d + 0.05)], [[0, 1, 2]], "blade", "#5aa848", 0.05, M))
    ob = join(parts, name); export(OUT + name + ".glb", [ob]); return ob

def fern(name, seed):
    reset(); L = mat("leaf", 0.85); L.use_backface_culling = False; rnd = random.Random(seed); parts = []
    for f in range(7):
        ang = f / 7 * math.tau + rnd.random() * 0.3; ln = 0.8 + rnd.random() * 0.3
        dx, dz = math.cos(ang), math.sin(ang); px, pz = -dz, dx
        vs, fs = [], []
        for i in range(6):
            t = i / 5; d = ln * t; y = 0.55 * math.sin(t * 2.2) * (1 - t * 0.3)
            w = 0.16 * math.sin(math.pi * min(1, t + 0.08))
            vs += [(dx * d + px * w, y, dz * d + pz * w), (dx * d - px * w, y, dz * d - pz * w)]
        for i in range(5): a = i * 2; fs.append([a, a + 2, a + 3, a + 1])
        parts.append(poly(vs, fs, "fern", ["#3f8f3a", "#4c9e40", "#58a94a"][f % 3], 0.06, L))
    ob = join(parts, name); export(OUT + name + ".glb", [ob]); return ob

def driftwood(name):
    reset(); M = mat("nat", 0.95)
    parts = [beam((-0.9, 0.1, 0), (0.9, 0.15, 0.2), 0.12, 6, "#a58a6a", material=M), beam((0.3, 0.12, 0.1), (0.7, 0.35, 0.5), 0.05, 5, "#9a7f60", material=M)]
    ob = join(parts, name); export(OUT + name + ".glb", [ob]); return ob

if __name__ == "__main__":
    palm("palm-a", 1, 4.3, 1.3); palm("palm-b", 2, 4.6, 0.6, 9); palm("palm-c", 3, 3.6, 1.7, 7)
    rock("rock-a", 1, (1.6, 1.1, 1.3)); rock("rock-b", 2, (1.1, 1.5, 1.0)); rock("rock-c", 3, (2.2, 0.8, 1.6)); rock("rock-d", 4, (0.7, 0.5, 0.6), moss=False)
    bush("bush-a", 1); bush("bush-b", 2, 4, 0.8, "#d23b2b"); bush("bush-c", 3, 6, 1.2)
    flowers("flowers-a", 1); flowers("flowers-b", 2, ("#ef6b54", "#f6a1c0", "#f4f1ea"))
    fern("fern-a", 1); driftwood("driftwood")
