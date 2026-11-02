"""Low-poly modelling helpers for headless Blender (bpy).
Everything is written in GAME coordinates (x right, y up, z forward = glTF axes)
and converted to Blender's Z-up frame here, so the exported glTF matches three.js."""
import bpy, bmesh, math, random
from mathutils import Vector, Matrix, Euler

def G(x, y, z):
    """game (x, y up, z fwd) -> blender (x, -z, y)"""
    return Vector((x, -z, y))

def hexrgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))

_MATS = {}
def reset():
    _MATS.clear()
    bpy.ops.wm.read_factory_settings(use_empty=True)
    random.seed(7)

def mat(name="vc", rough=0.88, metal=0.0, emit=None):
    key = (name, rough, metal, emit)
    if key in _MATS and _MATS[key].name in bpy.data.materials:
        return _MATS[key]
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    bsdf = nt.nodes.get("Principled BSDF")
    ca = nt.nodes.new("ShaderNodeVertexColor"); ca.layer_name = "Col"
    nt.links.new(ca.outputs["Color"], bsdf.inputs["Base Color"])
    bsdf.inputs["Roughness"].default_value = rough
    bsdf.inputs["Metallic"].default_value = metal
    if emit:
        bsdf.inputs["Emission Color"].default_value = (*hexrgb(emit), 1)
        bsdf.inputs["Emission Strength"].default_value = 0.35
    _MATS[key] = m
    return m

def _obj_from_bm(bm, name, material=None):
    smooth = STYLE["smooth"]
    if smooth:
        lim = math.radians(STYLE["sharp"])
        for f in bm.faces: f.smooth = True
        for e in bm.edges:
            if not e.is_manifold or e.calc_face_angle(3.0) > lim: e.smooth = False
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me); bm.free()
    ob = bpy.data.objects.new(name, me)
    bpy.context.scene.collection.objects.link(ob)
    me.materials.append(material or mat())
    if not smooth:
        for p in me.polygons: p.use_smooth = False
    return ob

STYLE = {"smooth": True, "sharp": 38, "grad": 0.3, "vnoise": 0.06, "bevel": True}

def _vn(v):
    # cheap smooth-ish value noise from position, same for shared vertices
    x, y, z = v.x * 3.1, v.y * 3.7, v.z * 2.9
    return math.sin(x * 1.7 + y * 0.9) * math.sin(y * 1.3 - z * 1.1) * math.sin(z * 1.9 + x * 0.7)

def paint(ob, color, jitter=0.04, per_face=None, grad=None, vnoise=None):
    """Fill the 'Col' corner attribute, painterly: per-face colour (hex or callable(face_center, normal)),
    darkened toward the bottom of the part and varied with soft positional noise."""
    me = ob.data
    attr = me.color_attributes.get("Col") or me.color_attributes.new("Col", "BYTE_COLOR", "CORNER")
    mw = ob.matrix_world
    grad = STYLE["grad"] if grad is None else grad
    vnoise = STYLE["vnoise"] if vnoise is None else vnoise
    wv = [mw @ v.co for v in me.vertices]
    ys = [v.z for v in wv] or [0]
    y0, y1 = min(ys), max(ys); hy = max(1e-4, y1 - y0)
    for p in me.polygons:
        if callable(color):
            c = mw @ p.center; n = (mw.to_3x3() @ p.normal).normalized()
            col = color(Vector((c.x, c.z, -c.y)), Vector((n.x, n.z, -n.y)))
        else:
            col = color
        r, g, b = hexrgb(col)
        kf = 1 + (random.random() - 0.5) * 2 * jitter
        for li in p.loop_indices:
            vi = me.loops[li].vertex_index; w = wv[vi]
            t = (w.z - y0) / hy
            k = kf * (1 - grad * (1 - t) ** 1.6) * (1 + vnoise * _vn(w))
            attr.data[li].color_srgb = (min(1, r * k), min(1, g * k), min(1, b * k), 1)
    return ob

def wobble(ob, amp=0.06, freq=0.6, seed=0, lean=0.0):
    """make a part hand-made and crooked: smooth noise displacement plus an optional lean with height"""
    mw = ob.matrix_world; inv = mw.inverted()
    for v in ob.data.vertices:
        w = mw @ v.co
        dx = amp * math.sin(w.z * freq * 2.1 + seed) * math.cos(w.y * freq * 1.3 + seed * 0.7)
        dy = amp * math.sin(w.x * freq * 1.7 - seed) * math.cos(w.z * freq * 1.1 + seed * 1.3)
        dz = amp * 0.5 * math.sin(w.x * freq * 1.9 + w.y * freq + seed)
        w2 = Vector((w.x + dx + lean * max(0, w.z), w.y + dy, w.z + dz))
        v.co = inv @ w2
    return ob

def finish(ob, loc=(0, 0, 0), rot=(0, 0, 0), color=None, jitter=0.04, name=None):
    """rot is in game degrees around game x, y, z axes"""
    rx, ry, rz = [math.radians(a) for a in rot]
    # game rotation (Y-up, order Y then X then Z like three's default XYZ) -> blender
    m = Matrix.Rotation(ry, 4, "Z") @ Matrix.Rotation(rx, 4, "X") @ Matrix.Rotation(-rz, 4, "Y")
    ob.matrix_world = Matrix.Translation(G(*loc)) @ m
    if color is not None: paint(ob, color, jitter)
    if name: ob.name = name
    return ob

def box(sx, sy, sz, loc=(0, 0, 0), rot=(0, 0, 0), color="#888888", name="box", jitter=0.04, material=None, bevel=0):
    """sizes in game axes (x width, y height, z depth); loc is the box centre"""
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1)
    bmesh.ops.scale(bm, vec=Vector((sx, sz, sy)), verts=bm.verts)
    if not bevel and STYLE["bevel"]:
        bevel = min(0.045, min(sx, sy, sz) * 0.18)
    if bevel:
        bmesh.ops.bevel(bm, geom=list(bm.edges), offset=bevel, segments=1, affect="EDGES")
    ob = _obj_from_bm(bm, name, material)
    return finish(ob, loc, rot, color, jitter)

def cyl(r1, r2, h, segs=8, loc=(0, 0, 0), rot=(0, 0, 0), color="#888888", name="cyl", caps=True, jitter=0.04, material=None, axis="y"):
    """cylinder/cone along game y (or 'x'/'z'), base at loc"""
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=caps, cap_tris=False, segments=segs, radius1=r1, radius2=r2, depth=h)
    bmesh.ops.translate(bm, vec=Vector((0, 0, h / 2)), verts=bm.verts)
    if axis == "x": bmesh.ops.rotate(bm, verts=bm.verts, cent=(0, 0, 0), matrix=Matrix.Rotation(math.radians(90), 3, "Y"))
    if axis == "z": bmesh.ops.rotate(bm, verts=bm.verts, cent=(0, 0, 0), matrix=Matrix.Rotation(math.radians(90), 3, "X"))
    ob = _obj_from_bm(bm, name, material)
    return finish(ob, loc, rot, color, jitter)

def ball(r, loc=(0, 0, 0), scale=(1, 1, 1), color="#888888", name="ball", sub=1, jitter=0.04, material=None, rot=(0, 0, 0), noise=0.0, seed=0):
    bm = bmesh.new()
    bmesh.ops.create_icosphere(bm, subdivisions=sub, radius=r)
    if noise:
        rnd = random.Random(seed)
        for v in bm.verts: v.co *= 1 + (rnd.random() - 0.5) * 2 * noise
    bmesh.ops.scale(bm, vec=Vector((scale[0], scale[2], scale[1])), verts=bm.verts)
    ob = _obj_from_bm(bm, name, material)
    return finish(ob, loc, rot, color, jitter)

def uvball(r, segs=8, rings=6, loc=(0, 0, 0), scale=(1, 1, 1), color="#888888", name="uvball", jitter=0.04, material=None, rot=(0, 0, 0)):
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=segs, v_segments=rings, radius=r)
    bmesh.ops.scale(bm, vec=Vector((scale[0], scale[2], scale[1])), verts=bm.verts)
    ob = _obj_from_bm(bm, name, material)
    return finish(ob, loc, rot, color, jitter)

def poly(verts, faces, name="poly", color="#888888", jitter=0.04, material=None):
    """verts in game coords"""
    bm = bmesh.new()
    vs = [bm.verts.new(G(*v)) for v in verts]
    for f in faces:
        try: bm.faces.new([vs[i] for i in f])
        except ValueError: pass
    bm.normal_update()
    ob = _obj_from_bm(bm, name, material)
    if color is not None: paint(ob, color, jitter)
    return ob

def beam(a, b, r=0.03, segs=4, color="#6b4a22", name="beam", material=None):
    """thin cylinder from game point a to b"""
    a, b = Vector(a), Vector(b)
    d = b - a; L = d.length
    ob = cyl(r, r, L, segs, color=None, name=name, material=material)
    # build orientation in blender space: cylinder is along blender Z
    ga, gb = G(*a), G(*b)
    z = (gb - ga).normalized()
    q = Vector((0, 0, 1)).rotation_difference(z)
    ob.matrix_world = Matrix.Translation(ga) @ q.to_matrix().to_4x4()
    paint(ob, color, 0.03)
    return ob

def join(objs, name):
    objs = [o for o in objs if o is not None]
    bpy.ops.object.select_all(action="DESELECT")
    for o in objs: o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    if len(objs) > 1: bpy.ops.object.join()
    ob = bpy.context.view_layer.objects.active
    ob.name = name; ob.data.name = name
    # apply transforms so the mesh is in object space at origin
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    return ob

def export(path, objs=None, anim=False):
    bpy.ops.object.select_all(action="DESELECT")
    for o in (objs or bpy.context.scene.objects): o.select_set(True)
    bpy.ops.export_scene.gltf(filepath=path, export_format="GLB", use_selection=True, export_apply=True,
                              export_yup=True, export_animations=anim, export_animation_mode="ACTIONS",
                              export_vertex_color="MATERIAL", export_normals=True, export_texcoords=False,
                              export_materials="EXPORT", export_cameras=False, export_lights=False,
                              export_optimize_animation_size=False, export_anim_slide_to_zero=False,
                              export_force_sampling=True, export_frame_step=1)

def tris(objs):
    n = 0
    for o in objs:
        if o.type == "MESH":
            n += sum(len(p.vertices) - 2 for p in o.data.polygons)
    return n

def loft(rings, segs=12, name="loft", color="#888888", material=None, caps=(True, True), arc=None, jitter=0.03):
    """rings: [(y, cx, cz, rx, rz)] in game coords. arc=(a0, a1) degrees makes an open strip (e.g. coat skirt)."""
    bm = bmesh.new()
    rows = []
    for (y, cx, cz, rx, rz) in rings:
        row = []
        n = segs + (1 if arc else 0)
        for i in range(n):
            if arc: a = math.radians(arc[0] + (arc[1] - arc[0]) * i / segs)
            else: a = i / segs * math.tau
            # angle 0 = +z (front), going toward +x
            x = cx + math.sin(a) * rx; z = cz + math.cos(a) * rz
            row.append(bm.verts.new(G(x, y, z)))
        rows.append(row)
    n = len(rows[0])
    for r in range(len(rows) - 1):
        for i in range(n if not arc else n - 1):
            a, b = rows[r][i], rows[r][(i + 1) % n]
            c, d = rows[r + 1][(i + 1) % n], rows[r + 1][i]
            try: bm.faces.new([a, d, c, b])
            except ValueError: pass
    if not arc:
        if caps[0]:
            try: bm.faces.new(list(rows[0]))
            except ValueError: pass
        if caps[1]:
            try: bm.faces.new(list(reversed(rows[-1])))
            except ValueError: pass
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    ob = _obj_from_bm(bm, name, material)
    if color is not None: paint(ob, color, jitter)
    return ob

