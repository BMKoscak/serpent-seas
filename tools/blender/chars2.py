"""Sea-of-Thieves-style pirates: chunky boots, big hands, barrel chests, heavy brows, soft shapes.
Bones all point up so bone-local axes = game axes (X sideways, Y up, Z forward)."""
import sys, math, random
sys.path.insert(0, "/home/claude/work/blender")
from lib import *
import bpy, bmesh
from mathutils import Quaternion, Vector

def build(spec, out):
    reset()
    S = spec.get("scale", 1.0)
    skin, hair = spec["skin"], spec.get("hair", "#3a2414")
    M = mat("char", 0.82); M.use_backface_culling = False
    GOLD = mat("gold", 0.42, 0.3)
    groups = {}
    def add(bone, ob): groups.setdefault(bone, []).append(ob); return ob
    W = spec.get("width", 1.0); SH = spec.get("shoulders", 1.0); BEL = spec.get("belly", 0.0)
    LEG = spec.get("legs", 1.0); HS = spec.get("headsize", 1.0)
    hipY = 0.86 * LEG
    boots = spec.get("boots", "#2a1d14"); pants = spec["pants"]
    # ---------- legs and boots ----------
    for sx, bone in ((1, "leg_l"), (-1, "leg_r")):
        x = sx * 0.12 * W
        cuffY = 0.36 * LEG
        add(bone, loft([(0.0, x, 0.02, 0.1, 0.13), (0.07, x, 0.02, 0.105, 0.135), (0.11, x, 0.0, 0.09, 0.1), (cuffY - 0.06, x, 0.0, 0.085, 0.09),
                        (cuffY - 0.05, x, 0.0, 0.112, 0.115), (cuffY + 0.03, x, 0.0, 0.122, 0.122)], 12, "boot", boots, M, caps=(True, False)))
        add(bone, uvball(0.1, 10, 6, (x, 0.055, 0.12), (1.0, 0.62, 1.25), boots, material=M))
        add(bone, box(0.2, 0.03, 0.3, (x, 0.012, 0.06), color="#1a120c", material=M))
        if spec.get("shorts"):
            add(bone, loft([(cuffY + 0.02, x, 0, 0.07, 0.07), (0.55 * LEG, x, 0, 0.075, 0.075)], 10, "shin", skin, M))
            add(bone, loft([(0.55 * LEG, x, 0, 0.11, 0.11), (hipY, x * 0.85, 0, 0.13, 0.13)], 10, "shorts", pants, M))
        else:
            add(bone, loft([(cuffY - 0.02, x, 0, 0.09, 0.09), (0.56 * LEG, x, 0.01, 0.1, 0.1), (hipY - 0.02, x * 0.9, 0, 0.125, 0.13)], 10, "leg", pants, M, caps=(False, False)))
    # pelvis
    add("hips", loft([(hipY - 0.1, 0, 0, 0.19 * W, 0.13), (hipY + 0.05, 0, 0, 0.2 * W, 0.14)], 12, "pelvis", pants, M))
    # ---------- torso ----------
    shirt = spec["shirt"]
    tY = [hipY - 0.02, hipY + 0.14, hipY + 0.3, hipY + 0.44, hipY + 0.55, hipY + 0.6, hipY + 0.64]
    torso_rings = [(tY[0], 0, 0, 0.19 * W, 0.135),
                   (tY[1], 0, 0.04 * BEL, 0.2 * W + 0.07 * BEL, 0.15 + 0.13 * BEL),
                   (tY[2], 0, 0.03 * BEL, 0.22 * W + 0.05 * BEL, 0.155 + 0.1 * BEL),
                   (tY[3], 0, 0, 0.255 * W * SH, 0.155),
                   (tY[4], 0, -0.005, 0.27 * W * SH, 0.14),
                   (tY[5], 0, -0.01, 0.2 * W, 0.11),
                   (tY[6], 0, 0, 0.075, 0.07)]
    stripes = spec.get("stripes")
    def shirtcol(c, n):
        if stripes and int((c.y - tY[0]) / 0.065) % 2 == 1: return stripes
        return shirt
    add("torso", loft(torso_rings, 14, "torso", shirtcol, M))
    add("torso", loft([(tY[6] - 0.02, 0, 0, 0.075, 0.07), (tY[6] + 0.08, 0, 0.01, 0.07, 0.065)], 10, "neck", skin, M))
    topY = tY[4]
    def ring_at(y, grow=0.02):
        # interpolate torso ring radii at height y
        for i in range(len(torso_rings) - 1):
            a, b = torso_rings[i], torso_rings[i + 1]
            if a[0] <= y <= b[0]:
                t = (y - a[0]) / (b[0] - a[0])
                return (y, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t, a[3] + (b[3] - a[3]) * t + grow, a[4] + (b[4] - a[4]) * t + grow)
        r = torso_rings[0]; return (y, r[1], r[2], r[3] + grow, r[4] + grow)
    # waistcoat / vest
    if spec.get("vest"):
        add("torso", loft([ring_at(tY[0] + 0.02, 0.012), ring_at(tY[2], 0.012), ring_at(tY[4] - 0.02, 0.012)], 14, "vest", spec["vest"], M, arc=(28, 332)))
    # coat: body + open skirt
    coat = spec.get("coat")
    if coat:
        trim = spec.get("trim")
        L = spec.get("coatlen", 0.45)
        def coatcol(c, n, base=coat):
            return base
        add("torso", loft([ring_at(tY[0], 0.025), ring_at(tY[1], 0.025), ring_at(tY[2], 0.025), ring_at(tY[3], 0.025), ring_at(tY[4], 0.02), ring_at(tY[5] - 0.005, 0.015)], 14, "coat", coat, M, arc=(22, 338)))
        r0 = ring_at(tY[0], 0.03)
        add("torso", loft([(tY[0] + 0.02, r0[1], r0[2], r0[3], r0[4]), (tY[0] - L * 0.5, 0, -0.01, r0[3] + 0.05, r0[4] + 0.05), (tY[0] - L, 0, -0.03, r0[3] + 0.1, r0[4] + 0.1)], 14, "skirt", coat, M, arc=(32, 328)))
        if trim:
            # gold edging down both front edges and around the hem
            for sx in (1, -1):
                a = math.radians(24 if sx > 0 else 336)
                pts = [ring_at(y, 0.03) for y in (tY[4] - 0.02, tY[2], tY[0])]
                for (y, cx, cz, rx, rz), (y2, cx2, cz2, rx2, rz2) in zip(pts, pts[1:]):
                    add("torso", beam((cx + math.sin(a) * rx, y, cz + math.cos(a) * rz), (cx2 + math.sin(a) * rx2, y2, cz2 + math.cos(a) * rz2), 0.016, 5, trim, material=GOLD))
                a2 = math.radians(34 if sx > 0 else 326)
                add("torso", beam((math.sin(a2) * (r0[3]), tY[0], math.cos(a2) * r0[4]), (math.sin(a2) * (r0[3] + 0.1), tY[0] - L, -0.03 + math.cos(a2) * (r0[4] + 0.1)), 0.016, 5, trim, material=GOLD))
            for k in range(4):
                y = tY[3] - k * 0.1; rr = ring_at(y, 0.03)
                for sx in (1, -1):
                    a = math.radians(30 if sx > 0 else 330)
                    add("torso", ball(0.016, (rr[1] + math.sin(a) * rr[3], y, rr[2] + math.cos(a) * rr[4] + 0.005), color="#e2b04a", sub=1, material=GOLD))
        if spec.get("epaulettes"):
            for sx in (1, -1):
                ex = sx * (0.27 * W * SH - 0.02)
                add("torso", uvball(0.075, 10, 5, (ex, topY + 0.02, -0.005), (1.3, 0.45, 1.1), trim or "#d9a63e", material=GOLD))
                for k in range(7):
                    a = (k / 6 - 0.5) * 2.4
                    add("torso", cyl(0.008, 0.008, 0.07, 4, (ex + sx * math.cos(a) * 0.08 * 0 + math.sin(a) * 0.05, topY - 0.06, math.cos(a) * 0.06), color=trim or "#d9a63e", material=GOLD))
    if spec.get("apron"):
        ap = spec["apron"]; stains = spec.get("stains")
        rr1, rr2 = ring_at(tY[3], 0.03), ring_at(tY[0] - 0.02, 0.04)
        def apcol(c, n):
            if stains and (math.sin(c.x * 37 + c.y * 23) * math.sin(c.y * 29 - c.x * 11) > 0.55): return stains
            return ap
        add("torso", loft([(tY[3], rr1[1], rr1[2], rr1[3] * 0.95, rr1[4]), ring_at(tY[1], 0.035), (tY[0] - 0.02, rr2[1], rr2[2] + 0.02, rr2[3] + 0.02, rr2[4] + 0.03), (tY[0] - 0.42, 0, 0.06 + 0.04 * BEL, rr2[3] + 0.05, rr2[4] + 0.08)], 12, "apron", apcol, M, arc=(-60, 60), jitter=0.02))
    if spec.get("skirt"):
        r0 = ring_at(tY[0], 0.03)
        add("torso", loft([(tY[0] + 0.03, 0, 0, r0[3], r0[4]), (tY[0] - 0.35, 0, 0, r0[3] + 0.09, r0[4] + 0.08), (0.12, 0, 0, r0[3] + 0.18, r0[4] + 0.16)], 14, "dress", spec["skirt"], M, caps=(False, False)))
    if spec.get("sash"):
        add("torso", loft([ring_at(tY[0] + 0.06, 0.03), ring_at(tY[0] + 0.14, 0.035)], 14, "sash", spec["sash"], M, caps=(False, False)))
        add("torso", box(0.06, 0.2, 0.03, (-0.12 * W, tY[0] - 0.02, 0.16 + 0.1 * BEL), (0, 0, 10), spec["sash"], material=M))
    # belt with buckle
    belt = spec.get("belt", "#2a1d14")
    add("torso", loft([ring_at(tY[0] + 0.04, 0.035 if not coat else 0.045), ring_at(tY[0] + 0.1, 0.035 if not coat else 0.045)], 14, "belt", belt, M, caps=(False, False)))
    br = ring_at(tY[0] + 0.07, 0.05)
    add("torso", box(0.1, 0.08, 0.025, (0, tY[0] + 0.07, br[2] + br[4] + 0.002), color="#e2b04a", material=GOLD))
    if spec.get("baldric"):
        a, b = ring_at(tY[4] - 0.02, 0.045), ring_at(tY[0] + 0.07, 0.05)
        add("torso", beam((0.17 * W * SH, tY[4] - 0.02, a[4] + 0.0), (-0.15 * W, tY[0] + 0.08, b[4] + 0.0), 0.028, 6, spec["baldric"], material=M))
    if spec.get("scarf"):
        add("torso", loft([(tY[6] - 0.04, 0, 0, 0.11, 0.1), (tY[6] + 0.03, 0, 0, 0.095, 0.09)], 10, "scarf", spec["scarf"], M))
        add("torso", uvball(0.05, 8, 5, (0.04, tY[6] - 0.06, 0.1), (1, 0.7, 0.6), spec["scarf"], material=M))
        add("torso", cyl(0.035, 0.015, 0.14, 6, (0.05, tY[6] - 0.2, 0.11), (0, 0, 10), spec["scarf"], material=M))
    # ---------- arms ----------
    shY = tY[4] - 0.04
    shX = 0.27 * W * SH + 0.03
    sleeve = spec.get("sleeve", coat or shirt)
    for sx, bone in ((1, "arm_l"), (-1, "arm_r")):
        x = sx * shX
        add(bone, uvball(0.085, 10, 6, (x, shY, -0.005), (1, 1, 1), sleeve, material=M))
        rolled = spec.get("rolled")
        if rolled:
            add(bone, loft([(shY, x, 0, 0.08, 0.08), (shY - 0.24, x + sx * 0.01, 0.0, 0.07, 0.07), (shY - 0.27, x + sx * 0.01, 0, 0.085, 0.085), (shY - 0.31, x + sx * 0.01, 0, 0.08, 0.08)], 10, "sleeve", sleeve, M))
            add(bone, loft([(shY - 0.3, x + sx * 0.01, 0, 0.062, 0.062), (shY - 0.5, x + sx * 0.012, 0.01, 0.058, 0.058)], 10, "forearm", skin, M))
        else:
            add(bone, loft([(shY, x, 0, 0.08, 0.08), (shY - 0.26, x + sx * 0.01, 0, 0.072, 0.072), (shY - 0.46, x + sx * 0.012, 0.01, 0.066, 0.066)], 10, "sleeve", sleeve, M))
            cuff = spec.get("cuff", sleeve)
            add(bone, loft([(shY - 0.42, x + sx * 0.012, 0.01, 0.075, 0.075), (shY - 0.5, x + sx * 0.012, 0.01, 0.092, 0.092)], 10, "cuff", cuff, GOLD if spec.get("goldcuff") else M))
        hy = shY - 0.58
        add(bone, uvball(0.085, 10, 7, (x + sx * 0.012, hy, 0.015), (0.9, 1.15, 1.0), skin, material=M))
        add(bone, uvball(0.035, 8, 5, (x - sx * 0.05, hy + 0.03, 0.05), (1, 1.3, 1), skin, material=M))
    # held items (right hand = -x)
    hx, hy = -(shX + 0.012), shY - 0.6
    item = spec.get("item")
    if item == "book":
        add("arm_r", box(0.06, 0.26, 0.2, (hx, hy + 0.02, 0.08), color="#6b2e2a", material=M)); add("arm_r", box(0.064, 0.24, 0.18, (hx + 0.003, hy + 0.02, 0.08), color="#efe6cf", material=M))
    elif item == "ladle":
        add("arm_r", cyl(0.014, 0.014, 0.6, 6, (hx, hy - 0.42, 0.04), color="#a8a8b0", material=GOLD)); add("arm_r", uvball(0.07, 10, 5, (hx, hy - 0.44, 0.07), (1, 0.55, 1), "#a8a8b0", material=GOLD))
    elif item == "spyglass":
        add("arm_r", cyl(0.035, 0.028, 0.42, 10, (hx, hy - 0.05, 0.03), color="#c99b3a", material=GOLD)); add("arm_r", cyl(0.04, 0.04, 0.08, 10, (hx, hy + 0.08, 0.03), color="#5a3920", material=M))
    elif item == "cane":
        add("arm_r", cyl(0.02, 0.02, hy, 6, (hx, 0.0, 0.04), color="#5a3920", material=M)); add("arm_r", uvball(0.04, 8, 5, (hx, hy + 0.03, 0.04), color="#c99b3a", material=GOLD))
    elif item == "basket":
        add("arm_r", cyl(0.14, 0.11, 0.16, 10, (hx - 0.03, hy - 0.16, 0.06), color="#b5874e", material=M))
        for k, c in enumerate(["#d23b2b", "#e9b23a", "#6fae3a"]): add("arm_r", uvball(0.045, 8, 5, (hx - 0.06 + k * 0.04, hy + 0.02, 0.05 + (k % 2) * 0.03), color=c, material=M))
    elif item == "fish":
        add("arm_r", uvball(0.09, 10, 6, (hx, hy - 0.2, 0.05), (0.5, 1.8, 0.8), "#8aa6b8", material=M))
    # ---------- head ----------
    neckY = tY[6]
    hc = neckY + 0.18 * HS
    hr = 0.175 * HS
    add("head", uvball(hr, 14, 10, (0, hc, 0), (1.0, 1.06, 1.0), skin, material=M))
    fz = hr * 0.93
    # brow ridge, nose, cheeks, ears
    add("head", uvball(hr * 0.86, 12, 6, (0, hc + 0.05, fz * 0.6), (1.0, 0.28, 0.5), spec.get("browskin", skin), material=M))
    add("head", uvball(0.04 * spec.get("nose", 1.0), 10, 7, (0, hc - 0.02, fz + 0.02), (0.75, 1.0, 1.1), spec.get("nosecol", skin), material=M))
    for sx in (1, -1):
        add("head", uvball(0.04, 8, 6, (sx * hr * 0.98, hc - 0.005, -0.01), (0.55, 1, 0.8), skin, material=M))
        add("head", uvball(0.045, 8, 6, (sx * 0.085, hc - 0.045, fz * 0.75), (1, 0.75, 0.6), spec.get("cheek", skin), material=M))
        # eyes: small dark ovals under the brow with a catchlight
        if spec.get("patch") and sx < 0:
            add("head", uvball(0.04, 8, 6, (sx * 0.065, hc + 0.012, fz - 0.005), (1.1, 0.95, 0.4), "#141414", material=M))
            add("head", beam((sx * hr, hc + 0.07, -0.02), (-sx * 0.08, hc + 0.075, fz * 0.8), 0.007, 4, "#141414", material=M))
        else:
            add("head", uvball(0.03, 10, 6, (sx * 0.066, hc + 0.01, fz - 0.012), (1.0, 1.08, 0.5), "#f3eee2", material=M))
            add("head", uvball(0.017, 8, 6, (sx * 0.063, hc + 0.008, fz + 0.002), (1.0, 1.15, 0.45), spec.get("eyes", "#2b1d14"), material=M))
            add("head", uvball(0.0055, 6, 4, (sx * 0.058, hc + 0.016, fz + 0.01), color="#ffffff", material=M))
        add("head", box(0.075, 0.024, 0.03, (sx * 0.068, hc + 0.05, fz + 0.005), (0, 0, -12 * sx - spec.get("browtilt", 0) * sx), spec.get("brows", hair), material=M))
        if spec.get("glasses"):
            add("head", cyl(0.042, 0.042, 0.01, 12, (sx * 0.066, hc + 0.012, fz + 0.03), color="#d6a640", caps=False, axis="z", material=GOLD))
    if spec.get("glasses"):
        add("head", box(0.04, 0.01, 0.01, (0, hc + 0.02, fz + 0.035), color="#d6a640", material=GOLD))
    # jaw: mouth, chin, beard
    add("jaw", box(0.08, 0.022, 0.02, (0, hc - 0.085, fz - 0.025), color="#4a2018", material=M))
    add("jaw", uvball(0.09, 10, 6, (0, hc - 0.115, fz * 0.55), (1.15, 0.6, 0.85), skin, material=M))
    if spec.get("beard"):
        bc = spec["beard"]; bl = spec.get("beardlen", 0.1)
        add("jaw", uvball(0.13, 12, 8, (0, hc - 0.1 - bl * 0.3, fz * 0.38), (1.15, 0.7 + bl * 2.2, 0.85), bc, material=M))
        for sx in (1, -1): add("jaw", uvball(0.07, 8, 6, (sx * 0.1, hc - 0.05, fz * 0.3), (0.8, 1.3, 0.9), bc, material=M))
        if bl > 0.15:
            add("jaw", cyl(0.06, 0.01, bl, 8, (0, hc - 0.12 - bl * 1.1, fz * 0.5), color=bc, material=M))
    if spec.get("moustache"):
        for sx in (1, -1):
            add("head", uvball(0.045, 8, 5, (sx * 0.05, hc - 0.058, fz + 0.01), (1.5, 0.55, 0.7), spec["moustache"], material=M, rot=(0, 0, 15 * sx)))
            add("head", uvball(0.025, 8, 5, (sx * 0.105, hc - 0.045, fz - 0.01), (1.2, 0.8, 0.8), spec["moustache"], material=M))
    # hair
    hs = spec.get("hairstyle", "short")
    if hs in ("short", "long", "ponytail", "braids", "bun", "messy"):
        add("head", uvball(hr * 1.06, 14, 8, (0, hc + 0.03, -0.025), (1.0, 0.95, 1.0), hair, material=M))
        if hs == "messy":
            for k in range(7):
                a = k / 7 * math.tau
                add("head", uvball(0.05, 8, 5, (math.sin(a) * hr * 0.75, hc + hr * 0.8, math.cos(a) * hr * 0.7 - 0.02), (1, 0.7, 1), hair, material=M))
    if hs == "ponytail":
        add("head", cyl(0.055, 0.025, 0.32, 8, (0, hc - 0.26, -hr - 0.04), (14, 0, 0), hair, material=M))
    if hs == "braids":
        for sx in (1, -1):
            for k in range(4): add("head", uvball(0.035 - k * 0.004, 8, 5, (sx * 0.15, hc - 0.12 - k * 0.07, -0.03), color=hair, material=M))
    if hs == "bun":
        add("head", uvball(0.08, 10, 6, (0, hc + 0.1, -hr * 0.95), color=hair, material=M))
    if hs == "long":
        add("head", loft([(hc + 0.05, 0, -0.04, hr * 0.95, hr * 0.85), (hc - 0.12, 0, -0.07, hr * 0.92, hr * 0.7), (hc - 0.3, 0, -0.1, hr * 0.7, hr * 0.4)], 12, "hairback", hair, M, arc=(110, 250)))
    if hs == "bald":
        for sx in (1, -1): add("head", uvball(0.065, 8, 6, (sx * hr * 0.85, hc - 0.01, -0.06), (0.6, 1, 1.3), hair, material=M))
    # hats
    hat = spec.get("hat"); ht = hc + hr * 0.92
    if hat == "tricorn":
        hcol = spec.get("hatcolor", "#1d1a1d"); tcol = spec.get("trim", "#d9a63e")
        bm = bmesh.new(); N = 30; Rb = 0.33 * HS
        inner = [bm.verts.new(G(math.sin(i / N * math.tau) * hr * 0.92, ht - 0.03, math.cos(i / N * math.tau) * hr * 0.92)) for i in range(N)]
        outer = []
        for i in range(N):
            a = i / N * math.tau
            corner = (0.5 + 0.5 * math.cos(3 * a)) ** 3          # 1 at the three corners (front, back-left, back-right)
            up = 0.17 * (1 - corner) ** 0.7                        # brim turned up between the corners
            rad = Rb * (0.78 + 0.32 * corner)
            outer.append(bm.verts.new(G(math.sin(a) * rad, ht - 0.035 + up, math.cos(a) * rad)))
        for i in range(N):
            j = (i + 1) % N
            bm.faces.new([inner[i], inner[j], outer[j], outer[i]])
        from lib import _obj_from_bm
        brim = _obj_from_bm(bm, "brim", M)
        def brimcol(c, n):
            return tcol if math.hypot(c.x, c.z) > Rb * 0.78 else hcol
        paint(brim, brimcol, 0.03)
        # rotate so a point faces forward: the cos(3a) peaks sit at a=0 (front) — we want the corner forward
        add("head", brim)
        add("head", uvball(hr * 1.02, 14, 6, (0, ht - 0.04, 0), (1.0, 0.75, 1.0), hcol, material=M))
        add("head", uvball(0.04, 8, 6, (0, ht + 0.07, hr * 0.98), (1, 1, 0.5), "#f2ecdc", material=M))
        for r_ in (30, -30): add("head", box(0.1, 0.014, 0.012, (0, ht + 0.03, hr * 1.0), (0, 0, r_), "#f2ecdc", material=M))
        if spec.get("feather"):
            add("head", loft([(ht + 0.02, -0.12, -0.05, 0.03, 0.01), (ht + 0.22, -0.2, -0.16, 0.05, 0.012), (ht + 0.42, -0.24, -0.3, 0.005, 0.005)], 6, "feather", spec["feather"], M))
    elif hat == "toque":
        add("head", loft([(ht - 0.08, 0, 0, hr * 1.02, hr * 1.02), (ht + 0.04, 0, 0, hr * 1.05, hr * 1.05)], 14, "band", "#f7f5ef", M))
        add("head", ball(0.2 * HS, (0, ht + 0.17, 0), (1.05, 0.95, 1.05), "#f7f5ef", sub=2, noise=0.07, seed=3, material=M))
    elif hat == "bandana":
        hcol = spec.get("hatcolor", "#c0392b")
        def bcol(c, n): return "#f2ecdc" if (math.sin(c.x * 60) * math.sin(c.z * 60 + c.y * 40) > 0.85) else hcol
        add("head", uvball(hr * 1.08, 14, 8, (0, hc + 0.035, -0.015), (1.0, 0.9, 1.0), bcol, material=M))
        add("head", uvball(0.05, 8, 5, (0.03, hc - 0.01, -hr - 0.06), color=hcol, material=M))
        add("head", cyl(0.04, 0.012, 0.2, 6, (0.06, hc - 0.03, -hr - 0.07), (65, 20, 0), hcol, material=M))
        add("head", cyl(0.04, 0.012, 0.17, 6, (-0.02, hc - 0.04, -hr - 0.07), (75, -20, 0), hcol, material=M))
    elif hat == "beanie":
        hcol = spec.get("hatcolor", "#2f4f7a")
        add("head", uvball(hr * 1.1, 14, 8, (0, hc + 0.06, -0.015), (1, 0.9, 1), hcol, material=M))
        add("head", loft([(hc + 0.0, 0, -0.015, hr * 1.12, hr * 1.12), (hc + 0.07, 0, -0.015, hr * 1.13, hr * 1.13)], 14, "fold", hcol, M))
    if spec.get("earring"):
        add("head", cyl(0.025, 0.025, 0.01, 10, (hr * 1.02, hc - 0.06, 0), color="#e2b04a", caps=False, axis="x", material=GOLD))

    # ---------- skeleton & animations ----------
    bones = {"hips": (0, hipY, 0, None), "leg_l": (0.12 * W, hipY - 0.03, 0, "hips"), "leg_r": (-0.12 * W, hipY - 0.03, 0, "hips"),
             "torso": (0, hipY, 0, "hips"), "arm_l": (shX, shY, 0, "torso"), "arm_r": (-shX, shY, 0, "torso"),
             "head": (0, neckY + 0.02, 0, "torso"), "jaw": (0, hc - 0.04, 0.02, "head")}
    arm_data = bpy.data.armatures.new("rig"); arm = bpy.data.objects.new(spec["name"], arm_data)
    bpy.context.scene.collection.objects.link(arm)
    bpy.context.view_layer.objects.active = arm; arm.select_set(True)
    bpy.ops.object.mode_set(mode="EDIT")
    eb = {}
    for n, (x, y, z, par) in bones.items():
        b = arm_data.edit_bones.new(n); b.head = G(x, y, z); b.tail = G(x, y + 0.1, z); b.roll = 0; eb[n] = b
    for n, (x, y, z, par) in bones.items():
        if par: eb[n].parent = eb[par]; eb[n].use_connect = False
    bpy.ops.object.mode_set(mode="OBJECT")
    allp = []
    for bone, obs in groups.items():
        for ob in obs:
            vg = ob.vertex_groups.new(name=bone); vg.add(list(range(len(ob.data.vertices))), 1.0, "REPLACE"); allp.append(ob)
    body = join(allp, spec["name"] + "-mesh")
    for n in bones:
        if n not in body.vertex_groups: body.vertex_groups.new(name=n)
    body.parent = arm
    mod = body.modifiers.new("Armature", "ARMATURE"); mod.object = arm
    bpy.context.scene.render.fps = 30
    bpy.context.view_layer.objects.active = arm
    def q(ax, deg): return Quaternion({"x": (1, 0, 0), "y": (0, 1, 0), "z": (0, 0, 1)}[ax], math.radians(deg))
    def action(name, frames, keys):
        act = bpy.data.actions.new(name); act.use_fake_user = True
        arm.animation_data_create(); arm.animation_data.action = act
        for pb in arm.pose.bones: pb.rotation_mode = "QUATERNION"; pb.rotation_quaternion = (1, 0, 0, 0); pb.location = (0, 0, 0)
        for f in (0, frames):
            for pb in arm.pose.bones: pb.rotation_quaternion = (1, 0, 0, 0); pb.keyframe_insert("rotation_quaternion", frame=f)
            arm.pose.bones["hips"].location = (0, 0, 0); arm.pose.bones["hips"].keyframe_insert("location", frame=f)
        for bone, ks in keys.items():
            if bone == "hips_loc":
                for f, (x, y, z) in ks:
                    arm.pose.bones["hips"].location = (x, y, z); arm.pose.bones["hips"].keyframe_insert("location", frame=f)
                continue
            pb = arm.pose.bones[bone]
            for f, rots in ks:
                qq = Quaternion((1, 0, 0, 0))
                for ax, deg in rots: qq = qq @ q(ax, deg)
                pb.rotation_quaternion = qq; pb.keyframe_insert("rotation_quaternion", frame=f)
        act.frame_range = (0, frames)
    h = spec.get("hunch", 0); swag = spec.get("swagger", 0)
    T = lambda deg, y=0: [("x", deg + h), ("y", y)]
    action("idle", 72, {
        "torso": [(0, T(0)), (36, T(2.5, swag)), (72, T(0))],
        "head": [(0, [("y", 0)]), (24, [("y", 10), ("x", -3)]), (48, [("y", -8), ("x", 2)]), (72, [("y", 0)])],
        "arm_l": [(0, [("z", 6 + swag)]), (36, [("z", 9 + swag), ("x", -4)]), (72, [("z", 6 + swag)])],
        "arm_r": [(0, [("z", -6 - swag)]), (36, [("z", -9 - swag), ("x", 4)]), (72, [("z", -6 - swag)])],
        "hips_loc": [(0, (0, 0, 0)), (36, (0, -0.014, 0)), (72, (0, 0, 0))],
    })
    action("walk", 30, {
        "leg_l": [(0, [("x", -30)]), (15, [("x", 30)]), (30, [("x", -30)])],
        "leg_r": [(0, [("x", 30)]), (15, [("x", -30)]), (30, [("x", 30)])],
        "arm_l": [(0, [("x", 26), ("z", 7)]), (15, [("x", -26), ("z", 7)]), (30, [("x", 26), ("z", 7)])],
        "arm_r": [(0, [("x", -26), ("z", -7)]), (15, [("x", 26), ("z", -7)]), (30, [("x", -26), ("z", -7)])],
        "torso": [(0, [("x", 4 + h), ("y", 6)]), (15, [("x", 4 + h), ("y", -6)]), (30, [("x", 4 + h), ("y", 6)])],
        "head": [(0, [("y", -4)]), (15, [("y", 4)]), (30, [("y", -4)])],
        "hips_loc": [(0, (0, 0, 0)), (7, (0, 0.04, 0)), (15, (0, 0, 0)), (22, (0, 0.04, 0)), (30, (0, 0, 0))],
    })
    action("emote-yes", 36, {
        "head": [(0, [("x", 0)]), (6, [("x", 16)]), (12, [("x", -5)]), (18, [("x", 16)]), (24, [("x", -5)]), (36, [("x", 0)])],
        "arm_r": [(0, [("z", -6)]), (8, [("x", -75), ("z", -22)]), (28, [("x", -75), ("z", -22)]), (36, [("z", -6)])],
        "arm_l": [(0, [("z", 6)]), (10, [("z", 14), ("x", -10)]), (36, [("z", 6)])],
        "torso": [(0, T(0)), (18, T(-4)), (36, T(0))],
    })
    action("emote-no", 36, {
        "head": [(0, [("y", 0)]), (6, [("y", 24)]), (12, [("y", -24)]), (18, [("y", 24)]), (24, [("y", -24)]), (36, [("y", 0)])],
        "arm_l": [(0, [("z", 6)]), (10, [("z", 35), ("x", -35)]), (28, [("z", 35), ("x", -35)]), (36, [("z", 6)])],
        "arm_r": [(0, [("z", -6)]), (10, [("z", -35), ("x", -35)]), (28, [("z", -35), ("x", -35)]), (36, [("z", -6)])],
        "torso": [(0, T(0)), (36, T(0))],
    })
    action("interact-right", 40, {
        "arm_r": [(0, [("z", -6)]), (10, [("x", -88), ("z", -10)]), (16, [("x", -100), ("z", -28)]), (22, [("x", -88), ("z", -5)]), (30, [("x", -88), ("z", -16)]), (40, [("z", -6)])],
        "arm_l": [(0, [("z", 6)]), (12, [("x", -32), ("z", 14)]), (30, [("x", -32), ("z", 14)]), (40, [("z", 6)])],
        "head": [(0, [("x", 0)]), (12, [("x", -7), ("z", 7)]), (30, [("x", -7), ("z", -7)]), (40, [("x", 0)])],
        "torso": [(0, T(0)), (20, T(5)), (40, T(0))],
    })
    action("wave", 45, {
        "arm_r": [(0, [("z", -6)]), (8, [("z", -150)]), (15, [("z", -128)]), (22, [("z", -160)]), (29, [("z", -128)]), (36, [("z", -150)]), (45, [("z", -6)])],
        "head": [(0, [("z", 0)]), (20, [("z", -9)]), (45, [("z", 0)])],
        "torso": [(0, T(0)), (45, T(0))],
    })
    action("laugh", 40, {
        "torso": [(0, T(0)), (6, T(-10)), (12, T(-4)), (18, T(-10)), (24, T(-4)), (40, T(0))],
        "head": [(0, [("x", 0)]), (6, [("x", -18)]), (12, [("x", -8)]), (18, [("x", -18)]), (40, [("x", 0)])],
        "arm_l": [(0, [("z", 6)]), (8, [("x", -40), ("z", 25)]), (32, [("x", -40), ("z", 25)]), (40, [("z", 6)])],
        "arm_r": [(0, [("z", -6)]), (8, [("x", -40), ("z", -25)]), (32, [("x", -40), ("z", -25)]), (40, [("z", -6)])],
    })
    arm.animation_data.action = bpy.data.actions["idle"]
    arm.scale = (S, S, S)
    print(spec["name"], "tris", tris([body]))
    export(out, [arm, body], anim=True)

CHARS = {
    # captain: broad, red coat with gold trim, baldric, epaulettes, big black beard, feathered tricorn (reference sheet)
    "captain": dict(name="captain", skin="#d99a72", hair="#2a1a10", shirt="#e9dfc8", pants="#2a2a32", boots="#1e1612", coat="#9a2a22", trim="#d9a63e", cuff="#d9a63e", goldcuff=True,
                    epaulettes=True, coatlen=0.48, beard="#21150e", beardlen=0.12, hat="tricorn", feather="#ece4d2", hairstyle="long", belt="#2a1a10", baldric="#4a2e1a",
                    width=1.18, shoulders=1.12, earring=True, brows="#1a110a", browtilt=8, nose=1.15, cheek="#d48a68", swagger=4),
    # quartermaster Ada: waistcoat, glasses, ledger
    "ada": dict(name="ada", skin="#c48660", hair="#6b2a1c", shirt="#efe8da", vest="#2f4f7a", pants="#5a3d28", boots="#2a1d14", sleeve="#efe8da", cuff="#2f4f7a",
                hairstyle="ponytail", glasses=True, item="book", width=0.9, shoulders=0.95, nose=0.85),
    # the chef: rotund, stained apron, rolled sleeves, toque, ladle (reference sheet)
    "cook": dict(name="cook", skin="#eab08c", hair="#9a4522", shirt="#d9cdb4", pants="#45403a", boots="#2a1d14", apron="#ece6d6", stains="#b49b78", belly=1.0, width=1.2,
                 moustache="#9a4522", hat="toque", hairstyle="short", item="ladle", nose=1.3, nosecol="#e09a7c", cheek="#e8987a", rolled=True, legs=0.92, scarf="#a5442e"),
    # Nell: slim, bandana, striped shirt, sash, spyglass (reference sheet)
    "nell": dict(name="nell", skin="#d9a27e", hair="#6b3a1e", shirt="#f1ece0", stripes="#2c4f80", pants="#6b5a3a", boots="#3a2a1d", sleeve="#f1ece0",
                 hat="bandana", hatcolor="#8a5a2e", hairstyle="braids", item="spyglass", scale=0.95, legs=1.04, width=0.84, shoulders=0.92, sash="#a5442e", rolled=True, nose=0.8),
    "silas": dict(name="silas", skin="#d0a07a", hair="#d8d4cc", shirt="#d9cdb0", pants="#4a3a2a", coat="#4f5a34", coatlen=0.62, cuff="#3a4224", beard="#ecebe6", beardlen=0.28,
                  hairstyle="bald", glasses=True, item="cane", hunch=12, brows="#e2ded6", nose=1.35, nosecol="#c8876a", hat="tricorn", hatcolor="#5a3b22", trim="#a37b3c", width=0.95),
    "fisher": dict(name="fisher", skin="#d09a74", hair="#5a3a22", shirt="#2f5d7a", pants="#3a3a42", boots="#3d2b1c", beard="#5a3a22", beardlen=0.08, hat="beanie", hatcolor="#9e2b25",
                   hairstyle="short", width=1.08, item="fish", nose=1.2),
    "villager": dict(name="villager", skin="#e9b896", hair="#4a2a18", shirt="#efe4d0", pants="#5a3d28", boots="#3d2b1c", vest="#7a3e6a", skirt="#7a3e6a", apron="#e8dcc0",
                     hairstyle="bun", item="basket", width=0.88, sleeve="#efe4d0", rolled=True),
    "barkeep": dict(name="barkeep", skin="#c98b62", hair="#2a1a10", shirt="#e9dfc8", vest="#5a2a1e", pants="#3a3a42", boots="#2a1d14", moustache="#2a1a10", hairstyle="messy",
                    apron="#d9cdb4", width=1.1, belly=0.5, rolled=True, nose=1.2, earring=True),
}
if __name__ == "__main__":
    which = sys.argv[1:] or list(CHARS)
    for n in which:
        build(CHARS[n], f"/home/claude/work/out/char-{n}.glb")
