"""Rigged low-poly pirates. Every bone points straight up, so bone-local axes equal game axes:
X = sideways (pitch), Y = up (yaw), Z = forward (roll). Pivot = bone head."""
import sys, math, random
sys.path.insert(0, "/home/claude/work/blender")
from lib import *
import bpy
from mathutils import Quaternion

def build(spec, out):
    reset()
    S = spec.get("scale", 1.0)
    skin, hair = spec["skin"], spec.get("hair", "#3a2414")
    M = mat("char", 0.85); M.use_backface_culling = True
    GOLD = mat("gold", 0.4, 0.7)
    groups = {}   # bone -> [objects]
    def add(bone, ob):
        groups.setdefault(bone, []).append(ob); return ob
    def B(*a, **k): k.setdefault("material", M); return box(*a, **k)
    def C(*a, **k): k.setdefault("material", M); return cyl(*a, **k)
    def O(*a, **k): k.setdefault("material", M); return ball(*a, **k)

    hipY = 0.92 * spec.get("legs", 1.0)
    top = hipY + 0.55 * spec.get("torso", 1.0)
    hunch = spec.get("hunch", 0)
    # ---- legs ----
    for sx, bone in ((1, "leg_l"), (-1, "leg_r")):
        x = sx * 0.11
        add(bone, C(0.085, 0.07, hipY - 0.1, 7, (x, 0.1, 0), color=spec["pants"]))
        if spec.get("shorts"):
            add(bone, C(0.06, 0.055, 0.25, 7, (x, 0.1, 0), color=skin))
        add(bone, B(0.15, 0.13, 0.27, (x, 0.065, 0.045), color=spec.get("boots", "#2a1d14"), bevel=0.02))
        add(bone, B(0.16, 0.05, 0.12, (x, 0.13, 0.0), color=spec.get("boots", "#2a1d14")))
    # ---- torso ----
    tw, td = 0.44 * spec.get("width", 1.0), 0.26 * spec.get("width", 1.0)
    add("torso", poly(
        [(-tw / 2 * 0.86, hipY - 0.04, -td / 2), (tw / 2 * 0.86, hipY - 0.04, -td / 2), (tw / 2 * 0.86, hipY - 0.04, td / 2), (-tw / 2 * 0.86, hipY - 0.04, td / 2),
         (-tw / 2, top, -td / 2), (tw / 2, top, -td / 2), (tw / 2, top, td / 2), (-tw / 2, top, td / 2)],
        [[0, 3, 2, 1], [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]], "torso", spec["shirt"], 0.03, M))
    if spec.get("belly"):
        add("torso", O(0.25, (0, hipY + 0.17, 0.07), (1.0, 0.95, 0.9), spec["shirt"], sub=1))
    if spec.get("vest"):
        v = spec["vest"]
        for sx in (1, -1):
            add("torso", B(tw * 0.34, top - hipY - 0.02, 0.03, (sx * tw * 0.3, (top + hipY) / 2, td / 2 + 0.012), color=v))
        add("torso", B(tw + 0.02, top - hipY - 0.02, 0.03, (0, (top + hipY) / 2, -td / 2 - 0.012), color=v))
    if spec.get("stripes"):
        for i in range(4):
            add("torso", B(tw + 0.012, 0.035, td + 0.012, (0, hipY + 0.08 + i * 0.12, 0), color=spec["stripes"]))
    if spec.get("apron"):
        add("torso", B(tw * 0.8, 0.62, 0.02, (0, hipY + 0.05, td / 2 + (0.2 if spec.get("belly") else 0.02)), color=spec["apron"]))
    if spec.get("coat"):
        c = spec["coat"]; L = spec.get("coatlen", 0.45)
        # back and two front flaps flaring out down to the knees
        add("torso", poly([(-tw / 2 - 0.02, top - 0.02, -td / 2 - 0.02), (tw / 2 + 0.02, top - 0.02, -td / 2 - 0.02), (tw / 2 + 0.07, hipY - L, -td / 2 - 0.06), (-tw / 2 - 0.07, hipY - L, -td / 2 - 0.06)], [[0, 1, 2, 3]], "coatb", c, 0.03, M))
        for sx in (1, -1):
            x0, x1 = sx * 0.06, sx * (tw / 2 + 0.02)
            add("torso", poly([(x0, top - 0.02, td / 2 + 0.02), (x1, top - 0.02, td / 2 + 0.02), (sx * (tw / 2 + 0.08), hipY - L, td / 2 + 0.05), (sx * 0.1, hipY - L, td / 2 + 0.08)],
                              [[0, 1, 2, 3] if sx < 0 else [3, 2, 1, 0]], "coatf", c, 0.03, M))
            add("torso", poly([(x1, top - 0.02, td / 2 + 0.02), (x1, top - 0.02, -td / 2 - 0.02), (sx * (tw / 2 + 0.07), hipY - L, -td / 2 - 0.06), (sx * (tw / 2 + 0.08), hipY - L, td / 2 + 0.05)],
                              [[0, 1, 2, 3] if sx > 0 else [3, 2, 1, 0]], "coats", c, 0.03, M))
            if spec.get("trim"):
                add("torso", B(0.025, top - hipY + L - 0.05, 0.02, (sx * 0.07, (top + hipY - L) / 2, td / 2 + 0.05), (-8 * sx * 0, 0, 0), spec["trim"], material=GOLD))
        if spec.get("epaulettes"):
            for sx in (1, -1):
                add("torso", B(0.13, 0.04, 0.16, (sx * (tw / 2 - 0.02), top + 0.01, 0), color=spec["trim"], material=GOLD))
    belt = spec.get("belt", "#2a1d14")
    add("torso", B(tw + 0.03, 0.06, td + (0.18 if spec.get("belly") else 0.03), (0, hipY + 0.05, 0.0 if not spec.get("belly") else 0.07), color=belt))
    add("torso", B(0.08, 0.07, 0.02, (0, hipY + 0.05, td / 2 + (0.17 if spec.get("belly") else 0.03)), color="#e2b04a", material=GOLD))
    if spec.get("scarf"):
        add("torso", C(0.11, 0.1, 0.07, 8, (0, top - 0.02, 0.0), color=spec["scarf"]))
        add("torso", B(0.08, 0.14, 0.03, (0.05, top - 0.09, td / 2 + 0.02), (0, 0, 15), spec["scarf"]))
    # ---- arms ----
    shY = top - 0.06
    for sx, bone in ((1, "arm_l"), (-1, "arm_r")):
        x = sx * (tw / 2 + 0.095)
        sleeve = spec.get("sleeve", spec.get("coat", spec["shirt"]))
        add(bone, C(0.07, 0.06, 0.52, 7, (x, shY - 0.52, 0), color=sleeve))
        if spec.get("cuff"): add(bone, C(0.072, 0.072, 0.06, 7, (x, shY - 0.52, 0), color=spec["cuff"]))
        add(bone, O(0.068, (x, shY - 0.58, 0.01), (1, 1.1, 1), skin, sub=1))
    # held items in the right hand
    hx, hy = -(tw / 2 + 0.095), shY - 0.6
    item = spec.get("item")
    if item == "book":
        add("arm_r", B(0.05, 0.24, 0.18, (hx, hy, 0.07), color="#6b2e2a")); add("arm_r", B(0.055, 0.22, 0.16, (hx + 0.003, hy, 0.07), color="#efe6cf"))
    elif item == "ladle":
        add("arm_r", C(0.012, 0.012, 0.5, 5, (hx, hy - 0.05, 0.03), color="#9a9aa2", material=GOLD)); add("arm_r", O(0.05, (hx, hy - 0.08, 0.05), (1, 0.6, 1), "#9a9aa2", material=GOLD, sub=1))
    elif item == "spyglass":
        add("arm_r", C(0.03, 0.025, 0.36, 7, (hx, hy, 0.02), (0, 0, 0), "#c99b3a", material=GOLD)); add("arm_r", C(0.034, 0.034, 0.06, 7, (hx, hy + 0.04, 0.02), color="#5a3920"))
    elif item == "cane":
        add("arm_r", C(0.018, 0.018, hy - 0.0, 5, (hx, 0.0, 0.03), color="#5a3920")); add("arm_r", O(0.035, (hx, hy + 0.02, 0.03), color="#c99b3a", material=GOLD, sub=0))
    elif item == "basket":
        add("arm_r", C(0.12, 0.1, 0.14, 8, (hx - 0.03, hy - 0.12, 0.05), color="#b5874e")); add("arm_r", O(0.04, (hx - 0.05, hy + 0.03, 0.06), color="#d23b2b", sub=1)); add("arm_r", O(0.04, (hx, hy + 0.03, 0.02), color="#e9b23a", sub=1))
    elif item == "pipe":
        pass
    # ---- head ----
    neckY = top
    hy0 = top + 0.06 + 0.2
    hr = 0.2 * spec.get("headsize", 1.0)
    add("torso", C(0.07, 0.07, 0.1, 7, (0, neckY - 0.02, 0), color=skin))
    add("head", O(hr, (0, hy0, 0), (1.0, 1.08, 0.98), skin, sub=2, jitter=0.02))
    fz = hr * 0.95
    # eyes, brows, nose, ears
    for sx in (1, -1):
        if spec.get("patch") and sx < 0:
            add("head", B(0.09, 0.07, 0.03, (sx * 0.075, hy0 + 0.03, fz), color="#151515"))
            add("head", beam((sx * 0.2, hy0 + 0.11, 0.0), (sx * -0.12, hy0 + 0.12, fz * 0.75), 0.008, 4, "#151515"))
        else:
            add("head", B(0.07, 0.07, 0.03, (sx * 0.075, hy0 + 0.03, fz - 0.01), color="#f6f3ea", material=M))
            add("head", B(0.035, 0.045, 0.02, (sx * 0.072, hy0 + 0.025, fz + 0.012), color="#1c1714", material=M))
        add("head", B(0.09, 0.025, 0.03, (sx * 0.08, hy0 + 0.095, fz - 0.02), (0, 0, -8 * sx), spec.get("brows", hair)))
        add("head", O(0.045, (sx * hr * 1.0, hy0, 0), (0.5, 1, 0.8), skin, sub=1))
        if spec.get("glasses"):
            add("head", C(0.05, 0.05, 0.012, 10, (sx * 0.075, hy0 + 0.03, fz + 0.02), color="#d6a640", caps=False, axis="z", material=GOLD))
    if spec.get("glasses"):
        add("head", B(0.05, 0.01, 0.01, (0, hy0 + 0.035, fz + 0.025), color="#d6a640", material=GOLD))
    add("head", B(0.06, 0.08, 0.07, (0, hy0 - 0.02, fz + 0.02), (-10, 0, 0), spec.get("nose", skin)))
    # mouth and chin on the jaw
    add("jaw", B(0.1, 0.03, 0.02, (0, hy0 - 0.09, fz - 0.02), color="#5a2a22"))
    add("jaw", B(0.16, 0.06, 0.1, (0, hy0 - 0.13, fz - 0.06), color=skin))
    if spec.get("beard"):
        bc = spec["beard"]; bl = spec.get("beardlen", 0.12)
        add("jaw", poly([(-0.16, hy0 - 0.05, fz - 0.12), (0.16, hy0 - 0.05, fz - 0.12), (0.12, hy0 - 0.12 - bl, fz - 0.02), (-0.12, hy0 - 0.12 - bl, fz - 0.02), (0, hy0 - 0.14 - bl * 1.4, fz + 0.01)],
                        [[3, 2, 1, 0], [3, 4, 2]], "beard", bc, 0.05, M))
        add("jaw", B(0.3, 0.12, 0.14, (0, hy0 - 0.1, fz - 0.1), color=bc))
    if spec.get("moustache"):
        for sx in (1, -1):
            add("head", B(0.11, 0.035, 0.04, (sx * 0.055, hy0 - 0.065, fz + 0.01), (0, 0, 14 * sx), spec["moustache"]))
    # hair
    hs = spec.get("hairstyle", "short")
    if hs in ("short", "long", "ponytail", "braids", "bun"):
        add("head", O(hr * 1.07, (0, hy0 + 0.035, -0.03), (1.0, 0.92, 1.0), hair, sub=2, jitter=0.03))
    if hs == "ponytail":
        add("head", C(0.06, 0.03, 0.3, 6, (0, hy0 - 0.2, -hr - 0.03), (12, 0, 0), hair))
    if hs == "braids":
        for sx in (1, -1): add("head", C(0.04, 0.025, 0.28, 6, (sx * 0.17, hy0 - 0.27, -0.02), color=hair))
    if hs == "bun":
        add("head", O(0.09, (0, hy0 + 0.12, -hr), color=hair, sub=1))
    if hs == "long":
        add("head", B(hr * 1.6, 0.26, 0.09, (0, hy0 - 0.12, -hr * 0.82), color=hair))
    if hs == "bald":
        for sx in (1, -1): add("head", O(0.07, (sx * hr * 0.9, hy0 - 0.0, -0.05), (0.6, 1, 1.2), hair, sub=1))
    # hats
    hat = spec.get("hat")
    ht = hy0 + hr * 0.95
    if hat == "tricorn":
        hc = spec.get("hatcolor", "#1d1a1d")
        add("head", C(0.36, 0.36, 0.05, 3, (0, ht - 0.03, 0), (0, 180, 0), hc))
        add("head", C(0.38, 0.38, 0.03, 3, (0, ht - 0.045, 0), (0, 180, 0), spec.get("trim", "#d9a63e"), material=GOLD))
        add("head", C(0.17, 0.2, 0.16, 8, (0, ht - 0.03, 0), color=hc))
        add("head", O(0.04, (0, ht + 0.05, 0.2), (1, 1, 0.5), "#f2ecdc", sub=1))
        add("head", B(0.11, 0.015, 0.012, (0, ht + 0.0, 0.205), (0, 0, 30), "#f2ecdc")); add("head", B(0.11, 0.015, 0.012, (0, ht + 0.0, 0.205), (0, 0, -30), "#f2ecdc"))
        if spec.get("feather"): add("head", poly([(0.1, ht + 0.1, -0.05), (0.32, ht + 0.4, -0.2), (0.16, ht + 0.12, -0.12)], [[0, 1, 2]], "feather", spec["feather"], 0.03, M))
    elif hat == "toque":
        add("head", C(0.2, 0.21, 0.12, 9, (0, ht - 0.09, 0), color="#f7f5ef"))
        add("head", O(0.25, (0, ht + 0.12, 0), (1, 0.75, 1), "#f7f5ef", sub=1))
    elif hat == "bandana":
        hc = spec.get("hatcolor", "#c0392b")
        add("head", uvball(hr * 1.07, 10, 6, (0, hy0 + 0.03, -0.01), (1, 0.85, 1.0), hc, material=M))
        add("head", C(0.04, 0.02, 0.18, 5, (0.05, hy0 - 0.02, -hr - 0.06), (60, 20, 0), hc))
        add("head", C(0.04, 0.02, 0.15, 5, (-0.05, hy0 - 0.03, -hr - 0.06), (70, -20, 0), hc))
        for k in range(5):
            a = k / 5 * math.tau
            add("head", O(0.02, (math.cos(a) * hr * 0.75, hy0 + 0.13 + 0.03 * math.sin(a * 2), math.sin(a) * hr * 0.75), color="#f2ecdc", sub=0))
    elif hat == "beanie":
        hc = spec.get("hatcolor", "#2f4f7a")
        add("head", uvball(hr * 1.08, 10, 6, (0, hy0 + 0.06, -0.01), (1, 0.85, 1), hc, material=M))
        add("head", C(hr * 1.1, hr * 1.1, 0.07, 10, (0, hy0 + 0.02, -0.01), color=hc))
        add("head", O(0.05, (0, hy0 + 0.24, -0.02), color=hc, sub=1))
    if spec.get("earring"):
        add("head", C(0.025, 0.025, 0.01, 8, (hr * 1.02, hy0 - 0.06, 0), color="#e2b04a", caps=False, axis="x", material=GOLD))

    # ---- skeleton ----
    bones = {"hips": (0, hipY, 0, None), "leg_l": (0.11, hipY - 0.04, 0, "hips"), "leg_r": (-0.11, hipY - 0.04, 0, "hips"),
             "torso": (0, hipY, 0, "hips"), "arm_l": (tw / 2 + 0.095, shY, 0, "torso"), "arm_r": (-(tw / 2 + 0.095), shY, 0, "torso"),
             "head": (0, neckY + 0.02, 0, "torso"), "jaw": (0, hy0 - 0.03, 0.02, "head")}
    arm_data = bpy.data.armatures.new("rig"); arm = bpy.data.objects.new(spec["name"], arm_data)
    bpy.context.scene.collection.objects.link(arm)
    bpy.context.view_layer.objects.active = arm; arm.select_set(True)
    bpy.ops.object.mode_set(mode="EDIT")
    eb = {}
    for n, (x, y, z, par) in bones.items():
        b = arm_data.edit_bones.new(n); b.head = G(x, y, z); b.tail = G(x, y + 0.1, z); b.roll = 0
        eb[n] = b
    for n, (x, y, z, par) in bones.items():
        if par: eb[n].parent = eb[par]; eb[n].use_connect = False
    bpy.ops.object.mode_set(mode="OBJECT")
    # mesh: tag each part with its bone, join, skin
    allp = []
    for bone, obs in groups.items():
        for ob in obs:
            vg = ob.vertex_groups.new(name=bone); vg.add(list(range(len(ob.data.vertices))), 1.0, "REPLACE"); allp.append(ob)
    body = join(allp, spec["name"] + "-mesh")
    for n in bones:
        if n not in body.vertex_groups: body.vertex_groups.new(name=n)
    body.parent = arm
    mod = body.modifiers.new("Armature", "ARMATURE"); mod.object = arm
    # hunched posture baked into the rest of the torso bone is done via animation offset instead
    # ---- animations ----
    scn = bpy.context.scene; scn.render.fps = 30
    bpy.context.view_layer.objects.active = arm
    def q(ax, deg):
        r = math.radians(deg)
        return Quaternion({"x": (1, 0, 0), "y": (0, 1, 0), "z": (0, 0, 1)}[ax], r)
    def action(name, frames, keys):
        """keys: {bone: [(frame, quat or (ax,deg) list)]}, loc for hips: {'hips_loc': [(f, (x,y,z))]}"""
        act = bpy.data.actions.new(name); act.use_fake_user = True
        arm.animation_data_create(); arm.animation_data.action = act
        for pb in arm.pose.bones: pb.rotation_mode = "QUATERNION"; pb.rotation_quaternion = (1, 0, 0, 0); pb.location = (0, 0, 0)
        # always key every bone at the first/last frame so clips fully define the pose
        for f in (0, frames):
            for pb in arm.pose.bones:
                pb.rotation_quaternion = (1, 0, 0, 0); pb.keyframe_insert("rotation_quaternion", frame=f)
            arm.pose.bones["hips"].location = (0, 0, 0); arm.pose.bones["hips"].keyframe_insert("location", frame=f)
        for bone, ks in keys.items():
            if bone == "hips_loc":
                for f, (x, y, z) in ks:
                    arm.pose.bones["hips"].location = (x, y, z)  # bone local: x=game x, y=game up, z=game fwd
                    arm.pose.bones["hips"].keyframe_insert("location", frame=f)
                continue
            pb = arm.pose.bones[bone]
            for f, rots in ks:
                qq = Quaternion((1, 0, 0, 0))
                for ax, deg in rots: qq = qq @ q(ax, deg)
                pb.rotation_quaternion = qq; pb.keyframe_insert("rotation_quaternion", frame=f)
        act.frame_range = (0, frames)
        return act
    h = hunch
    T = lambda deg: [("x", deg + h)]
    action("idle", 60, {
        "torso": [(0, T(0)), (30, T(2)), (60, T(0))],
        "head": [(0, [("y", 0)]), (20, [("y", 8), ("x", -2)]), (40, [("y", -6)]), (60, [("y", 0)])],
        "arm_l": [(0, [("z", 4)]), (30, [("z", 7), ("x", -3)]), (60, [("z", 4)])],
        "arm_r": [(0, [("z", -4)]), (30, [("z", -7), ("x", 3)]), (60, [("z", -4)])],
        "hips_loc": [(0, (0, 0, 0)), (30, (0, -0.012, 0)), (60, (0, 0, 0))],
    })
    action("walk", 30, {
        "leg_l": [(0, [("x", -28)]), (15, [("x", 28)]), (30, [("x", -28)])],
        "leg_r": [(0, [("x", 28)]), (15, [("x", -28)]), (30, [("x", 28)])],
        "arm_l": [(0, [("x", 24), ("z", 5)]), (15, [("x", -24), ("z", 5)]), (30, [("x", 24), ("z", 5)])],
        "arm_r": [(0, [("x", -24), ("z", -5)]), (15, [("x", 24), ("z", -5)]), (30, [("x", -24), ("z", -5)])],
        "torso": [(0, [("x", 3 + h), ("y", 4)]), (15, [("x", 3 + h), ("y", -4)]), (30, [("x", 3 + h), ("y", 4)])],
        "hips_loc": [(0, (0, 0, 0)), (7, (0, 0.035, 0)), (15, (0, 0, 0)), (22, (0, 0.035, 0)), (30, (0, 0, 0))],
    })
    action("emote-yes", 36, {
        "head": [(0, [("x", 0)]), (6, [("x", 14)]), (12, [("x", -4)]), (18, [("x", 14)]), (24, [("x", -4)]), (36, [("x", 0)])],
        "arm_r": [(0, [("z", -4)]), (8, [("x", -70), ("z", -20)]), (28, [("x", -70), ("z", -20)]), (36, [("z", -4)])],
        "torso": [(0, T(0)), (18, T(-3)), (36, T(0))],
    })
    action("emote-no", 36, {
        "head": [(0, [("y", 0)]), (6, [("y", 22)]), (12, [("y", -22)]), (18, [("y", 22)]), (24, [("y", -22)]), (36, [("y", 0)])],
        "arm_l": [(0, [("z", 4)]), (10, [("z", 30), ("x", -30)]), (28, [("z", 30), ("x", -30)]), (36, [("z", 4)])],
        "arm_r": [(0, [("z", -4)]), (10, [("z", -30), ("x", -30)]), (28, [("z", -30), ("x", -30)]), (36, [("z", -4)])],
        "torso": [(0, T(0)), (36, T(0))],
    })
    action("interact-right", 40, {
        "arm_r": [(0, [("z", -4)]), (10, [("x", -85), ("z", -10)]), (16, [("x", -95), ("z", -25)]), (22, [("x", -85), ("z", -5)]), (30, [("x", -85), ("z", -15)]), (40, [("z", -4)])],
        "arm_l": [(0, [("z", 4)]), (12, [("x", -30), ("z", 12)]), (30, [("x", -30), ("z", 12)]), (40, [("z", 4)])],
        "head": [(0, [("x", 0)]), (12, [("x", -6), ("z", 6)]), (30, [("x", -6), ("z", -6)]), (40, [("x", 0)])],
        "torso": [(0, T(0)), (20, T(4)), (40, T(0))],
    })
    action("wave", 45, {
        "arm_r": [(0, [("z", -4)]), (8, [("z", -150)]), (15, [("z", -130)]), (22, [("z", -160)]), (29, [("z", -130)]), (36, [("z", -150)]), (45, [("z", -4)])],
        "head": [(0, [("z", 0)]), (20, [("z", -8)]), (45, [("z", 0)])],
        "torso": [(0, T(0)), (45, T(0))],
    })
    arm.animation_data.action = bpy.data.actions["idle"]
    arm.scale = (S, S, S)
    print(spec["name"], "tris", tris([body]))
    export(out, [arm, body], anim=True)

CHARS = {
    "captain": dict(name="captain", skin="#e1a97f", hair="#3b2416", shirt="#f0e8d8", pants="#2b2b33", boots="#1e1612", coat="#9e2b25", trim="#d9a63e", cuff="#d9a63e",
                    epaulettes=True, coatlen=0.5, beard="#3b2416", beardlen=0.14, hat="tricorn", feather="#e9e2d0", hairstyle="long", belt="#1e1612", width=1.06, earring=True, brows="#2a1a10"),
    "ada": dict(name="ada", skin="#c98b62", hair="#6b2a1c", shirt="#f2ece0", vest="#2f4f7a", pants="#5a3d28", boots="#2a1d14", sleeve="#f2ece0", cuff="#2f4f7a",
                hairstyle="ponytail", glasses=True, item="book", width=0.92, headsize=0.98),
    "cook": dict(name="cook", skin="#f0c09a", hair="#b5562a", shirt="#f4f1ea", pants="#4a4a52", boots="#2a1d14", apron="#fbfaf6", belly=True, width=1.15,
                 moustache="#b5562a", hat="toque", hairstyle="short", scarf="#c0392b", item="ladle", nose="#e8a98a", brows="#9a4522"),
    "nell": dict(name="nell", skin="#f2c8a6", hair="#d0682e", shirt="#f4f1ea", stripes="#2c5aa0", pants="#7a5233", shorts=False, boots="#3a2a1d", sleeve="#f4f1ea",
                 hat="bandana", hatcolor="#c0392b", hairstyle="braids", item="spyglass", scale=0.9, legs=0.86, torso=0.88, width=0.88, headsize=1.04),
    "silas": dict(name="silas", skin="#d9a77e", hair="#d8d4cc", shirt="#d9cdb0", pants="#4a3a2a", coat="#556036", coatlen=0.62, cuff="#3a4224", beard="#ecebe6", beardlen=0.26,
                  hairstyle="bald", glasses=True, item="cane", hunch=10, brows="#e2ded6", nose="#cf9068", hat="tricorn", hatcolor="#5a3b22", trim="#a37b3c"),
    "fisher": dict(name="fisher", skin="#d6a07a", hair="#5a3a22", shirt="#2f5d7a", pants="#3a3a42", boots="#3d2b1c", beard="#5a3a22", beardlen=0.08, hat="beanie", hatcolor="#9e2b25",
                   hairstyle="short", width=1.04),
    "villager": dict(name="villager", skin="#efc3a0", hair="#4a2a18", shirt="#7a3e6a", pants="#7a3e6a", boots="#3d2b1c", apron="#e8dcc0", coat="#7a3e6a", coatlen=0.75,
                     hairstyle="bun", item="basket", width=0.9, sleeve="#efe4d0"),
}
if __name__ == "__main__":
    which = sys.argv[1:] or list(CHARS)
    for n in which:
        build(CHARS[n], f"/home/claude/work/out/char-{n}.glb")
