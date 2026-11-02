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
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me); bm.free()
    ob = bpy.data.objects.new(name, me)
    bpy.context.scene.collection.objects.link(ob)
    me.materials.append(material or mat())
    for p in me.polygons: p.use_smooth = False
    return ob

def paint(ob, color, jitter=0.04, per_face=None):
    """Fill the 'Col' corner attribute. color: hex or callable(face_center_game, normal_game)->hex"""
    me = ob.data
    attr = me.color_attributes.get("Col") or me.color_attributes.new("Col", "BYTE_COLOR", "CORNER")
    mw = ob.matrix_world
    for p in me.polygons:
        if callable(color):
            c = mw @ p.center; n = (mw.to_3x3() @ p.normal).normalized()
            col = color(Vector((c.x, c.z, -c.y)), Vector((n.x, n.z, -n.y)))
        else:
            col = color
        r, g, b = hexrgb(col)
        k = 1 + (random.random() - 0.5) * 2 * jitter
        rgb = (min(1, r * k), min(1, g * k), min(1, b * k), 1)
        for li in p.loop_indices:
            attr.data[li].color_srgb = rgb
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
