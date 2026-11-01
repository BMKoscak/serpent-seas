/* Serpent Seas — 3D sea chart and celebration scenes.
   three.js + Kenney Pirate Kit (CC0). Exposes window.Sea3D. */
import * as THREE from "three";
import { GLTFLoader } from "./lib/GLTFLoader.js";
import { OrbitControls } from "./lib/OrbitControls.js";

const MODEL_DIR = "models/";
const loader = new GLTFLoader();
const cache = new Map();
function model(name) {
  if (!cache.has(name)) {
    cache.set(name, new Promise((res, rej) => loader.load(MODEL_DIR + name + ".glb.wasm", (g) => {
      g.scene.traverse((o) => { if (o.isMesh) { o.castShadow = false; o.receiveShadow = false; } });
      res(g.scene);
    }, undefined, rej)));
  }
  return cache.get(name).then((s) => s.clone(true));
}

/* ---------------- waves (shared by JS and GLSL) ---------------- */
// dir.x, dir.y, wavelength, amplitude
const WAVES = [[0.8, 0.6, 22, 0.42], [-0.45, 0.9, 13, 0.26], [0.95, -0.3, 7.5, 0.13], [-0.7, -0.7, 4.6, 0.07]];
const WAVE_K = WAVES.map(([dx, dz, L, A]) => { const n = Math.hypot(dx, dz), k = (2 * Math.PI) / L; return { dx: dx / n, dz: dz / n, k, A, w: Math.sqrt(9.8 * k) * 0.55 }; });
function waveH(x, z, t) {
  let h = 0;
  for (const w of WAVE_K) h += w.A * Math.sin((w.dx * x + w.dz * z) * w.k + t * w.w);
  return h;
}
function waveGrad(x, z, t) { // dh/dx, dh/dz
  let gx = 0, gz = 0;
  for (const w of WAVE_K) { const c = w.A * w.k * Math.cos((w.dx * x + w.dz * z) * w.k + t * w.w); gx += c * w.dx; gz += c * w.dz; }
  return [gx, gz];
}
const GLSL_WAVES = `
const int NW = ${WAVE_K.length};
uniform vec4 uW[NW]; // dx, dz, k, A
uniform float uWs[NW]; // omega
float waveH(vec2 p, float t){ float h=0.; for(int i=0;i<NW;i++){ h+=uW[i].w*sin(dot(uW[i].xy,p)*uW[i].z+t*uWs[i]); } return h; }
vec2 waveG(vec2 p, float t){ vec2 g=vec2(0.); for(int i=0;i<NW;i++){ float c=uW[i].w*uW[i].z*cos(dot(uW[i].xy,p)*uW[i].z+t*uWs[i]); g+=c*uW[i].xy; } return g; }
`;

const SKY = { zenith: new THREE.Color("#2f6f9f"), horizon: new THREE.Color("#f3d9a8"), sun: new THREE.Vector3(-0.55, 0.42, -0.72).normalize(), sunColor: new THREE.Color("#ffe2a8") };
const DUSK = { zenith: new THREE.Color("#1b2547"), horizon: new THREE.Color("#ff9a6a"), sun: new THREE.Vector3(0.2, 0.08, -1).normalize(), sunColor: new THREE.Color("#ffb37a") };

function makeSky(pal) {
  const g = new THREE.SphereGeometry(900, 32, 16);
  const m = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: { uZ: { value: pal.zenith }, uH: { value: pal.horizon }, uSun: { value: pal.sun }, uSunC: { value: pal.sunColor } },
    vertexShader: `varying vec3 vD; void main(){ vD=normalize(position); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
    fragmentShader: `varying vec3 vD; uniform vec3 uZ,uH,uSun,uSunC;
      void main(){ float y=max(vD.y,0.); vec3 c=mix(uH,uZ,pow(y,0.55));
        float s=max(dot(normalize(vD),uSun),0.); c+=uSunC*(pow(s,600.)*3.+pow(s,12.)*0.35);
        if(vD.y<0.) c=uH;
        gl_FragColor=vec4(c,1.); }`,
  });
  const mesh = new THREE.Mesh(g, m); mesh.frustumCulled = false; mesh.renderOrder = -10;
  return mesh;
}

function makeOcean(pal, size = 700, seg = 220, islands = []) {
  const g = new THREE.PlaneGeometry(size, size, seg, seg); g.rotateX(-Math.PI / 2);
  const isl = []; for (let i = 0; i < 16; i++) isl.push(new THREE.Vector4(1e5, 1e5, 0, 0));
  islands.forEach((p, i) => { if (i < 16) isl[i].set(p.x, p.z, p.r, 1); });
  const m = new THREE.ShaderMaterial({
    fog: true,
    uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, {
      uT: { value: 0 }, uHi: { value: 1 }, uSun: { value: pal.sun }, uSunC: { value: pal.sunColor }, uZ: { value: pal.zenith }, uH: { value: pal.horizon },
      uDeep: { value: new THREE.Color("#0b3f5c") }, uShallow: { value: new THREE.Color("#2bb7b0") }, uIsl: { value: isl },
      uW: { value: WAVE_K.map((w) => new THREE.Vector4(w.dx, w.dz, w.k, w.A)) }, uWs: { value: WAVE_K.map((w) => w.w) },
    }]),
    vertexShader: GLSL_WAVES + `
      uniform float uT; varying vec3 vW; varying float vH;
      #include <fog_pars_vertex>
      void main(){ vec4 w=modelMatrix*vec4(position,1.); float h=waveH(w.xz,uT); w.y+=h; vW=w.xyz; vH=h;
        vec4 mvPosition=viewMatrix*w; gl_Position=projectionMatrix*mvPosition;
        #include <fog_vertex>
      }`,
    fragmentShader: GLSL_WAVES + `
      uniform float uT, uHi; uniform vec3 uSun,uSunC,uZ,uH,uDeep,uShallow; uniform vec4 uIsl[16];
      varying vec3 vW; varying float vH;
      #include <fog_pars_fragment>
      float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
      float noise(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.-2.*f);
        return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y); }
      void main(){
        vec2 g=waveG(vW.xz,uT);
        // fine ripples
        if(uHi>0.5){ float r1=noise(vW.xz*0.9+vec2(uT*0.6,uT*0.3)), r2=noise(vW.xz*2.1-vec2(uT*0.4,uT*0.7)); g+=vec2(r1-0.5,r2-0.5)*0.09; }
        vec3 N=normalize(vec3(-g.x,1.,-g.y));
        vec3 V=normalize(cameraPosition-vW);
        float fr=0.02+0.98*pow(1.-max(dot(N,V),0.),5.);
        float dmin=1e4;
        for(int i=0;i<16;i++){ if(uIsl[i].w<.5) continue; dmin=min(dmin,length(vW.xz-uIsl[i].xy)-uIsl[i].z); }
        float sh=smoothstep(10.,0.,dmin), foam=0.;
        if(dmin<3.){ float n=noise(vW.xz*0.8+uT*0.3); foam=smoothstep(1.8,0.2,dmin+n*1.2)*(0.55+0.45*sin(uT*2.2-dmin*3.)); }
        vec3 base=mix(uDeep,uShallow,sh*0.85);
        base*=0.75+0.35*smoothstep(-0.4,0.6,vH);
        vec3 R=reflect(-V,N); vec3 sky=mix(uH,uZ,pow(max(R.y,0.),0.6));
        vec3 c=mix(base,sky,fr*0.85);
        float sp=pow(max(dot(R,uSun),0.),400.); c+=uSunC*sp*1.4;
        c+=uSunC*pow(max(dot(R,uSun),0.),18.)*0.08;
        float crest=smoothstep(0.62,0.95,vH+(uHi>0.5?noise(vW.xz*0.35)*0.18:0.));
        c=mix(c,vec3(0.93,0.96,0.95),clamp(foam*0.8+crest*0.18,0.,1.));
        gl_FragColor=vec4(c,1.);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        #include <fog_fragment>
      }`,
  });
  const mesh = new THREE.Mesh(g, m); mesh.frustumCulled = false;
  return mesh;
}

/* ---------------- small helpers ---------------- */
function rng(seed) { return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function softTexture(inner = "rgba(255,255,255,1)", outer = "rgba(255,255,255,0)") {
  const c = document.createElement("canvas"); c.width = c.height = 64;
  const x = c.getContext("2d"), gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, inner); gr.addColorStop(1, outer); x.fillStyle = gr; x.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
let SOFT = null; const soft = () => SOFT || (SOFT = softTexture());
function tint(obj, color, amount) {
  obj.traverse((o) => {
    if (!o.isMesh) return;
    o.material = o.material.clone();
    o.material.color = o.material.color.clone().lerp(new THREE.Color(color), amount);
    if (o.material.emissive) o.material.emissive = new THREE.Color(0);
  });
}
function makeCloud(R) {
  const g = new THREE.Group(), mat = new THREE.MeshLambertMaterial({ color: "#ffffff", emissive: "#5f6f80", flatShading: true });
  const n = 4 + Math.floor(R() * 4);
  for (let i = 0; i < n; i++) {
    const s = 2.5 + R() * 3.5, m = new THREE.Mesh(new THREE.IcosahedronGeometry(s, 1), mat);
    m.position.set((i - n / 2) * 3.2 + R() * 2, R() * 2, R() * 3); m.scale.y = 0.7; g.add(m);
  }
  return g;
}
function makeGull() {
  const g = new THREE.Group(), mat = new THREE.MeshBasicMaterial({ color: "#f4f1e8", side: THREE.DoubleSide });
  const wing = (s) => { const geo = new THREE.BufferGeometry(); geo.setAttribute("position", new THREE.Float32BufferAttribute([0, 0, -0.25, 0, 0, 0.25, 1.4 * s, 0.1, 0.05], 3)); return new THREE.Mesh(geo, mat); };
  const l = wing(-1), r = wing(1); g.add(l, r); g.userData = { wl: l, wr: r };
  const body = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.8, 5), mat); body.rotation.x = Math.PI / 2; g.add(body);
  return g;
}
function makeSerpent() {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: "#3f9b5c", roughness: 0.55, flatShading: true });
  const belly = new THREE.MeshStandardMaterial({ color: "#e2c26a", roughness: 0.6, flatShading: true });
  const humps = [];
  for (let i = 0; i < 4; i++) {
    const r = 1.6 - i * 0.22, m = new THREE.Mesh(new THREE.TorusGeometry(r, 0.55 - i * 0.07, 8, 14, Math.PI), mat);
    m.position.x = -i * 3.6; m.userData.base = -0.4; humps.push(m); g.add(m);
    for (let s = 0; s < 3; s++) { const spike = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.6, 4), belly); const a = 0.6 + s * 0.95; spike.position.set(Math.cos(a) * r, Math.sin(a) * r + 0.5, 0); spike.rotation.z = a - Math.PI / 2; m.add(spike); }
  }
  const head = new THREE.Group();
  const skull = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 8), mat); skull.scale.set(1.3, 0.9, 0.9); head.add(skull);
  const snout = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1.6, 8), mat); snout.rotation.z = -Math.PI / 2; snout.position.x = 1.5; snout.position.y = -0.15; head.add(snout);
  const eyeW = new THREE.MeshBasicMaterial({ color: "#fff6d6" }), eyeB = new THREE.MeshBasicMaterial({ color: "#111" });
  [-0.55, 0.55].forEach((z) => { const e = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 6), eyeW); e.position.set(0.55, 0.45, z); const p = new THREE.Mesh(new THREE.SphereGeometry(0.13, 6, 5), eyeB); p.position.set(0.2, 0.02, 0); e.add(p); head.add(e); });
  const fin = new THREE.Mesh(new THREE.ConeGeometry(0.35, 1.2, 4), belly); fin.position.set(-0.4, 1.0, 0); fin.rotation.z = 0.5; head.add(fin);
  head.position.set(3.3, 1.6, 0); g.add(head);
  g.userData = { humps, head };
  return g;
}

/* ---------------- renderer setup shared by both scenes ---------------- */
function makeRenderer(canvasHost) {
  const r = new THREE.WebGLRenderer({ antialias: (window.devicePixelRatio || 1) < 1.5, powerPreference: "high-performance" });
  r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 1.05;
  r.outputColorSpace = THREE.SRGBColorSpace;
  canvasHost.appendChild(r.domElement);
  r.domElement.style.display = "block"; r.domElement.style.width = "100%"; r.domElement.style.height = "100%";
  return r;
}
// Adaptive quality: watch frame times and lower the render resolution (then the water detail) on slow GPUs.
function makeGovernor(renderer, ocean) {
  const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
  const steps = [1, 0.8, 0.65, 0.5, 0.4];
  let level = 0, acc = 0, n = 0, settle = 0;
  try { const saved = +localStorage.getItem("ss-3d-level"); if (saved >= 0 && saved < steps.length) level = saved; } catch (e) {}
  const apply = () => { renderer.setPixelRatio(dpr * steps[level]); if (ocean) ocean.material.uniforms.uHi.value = level >= 2 ? 0 : 1; };
  apply();
  return {
    frame(dtReal) {
      if (settle > 0) { settle--; return false; }
      acc += dtReal; n++;
      if (n < 40) return false;
      const avg = acc / n; acc = 0; n = 0;
      let changed = false;
      if (avg > 1 / 40 && level < steps.length - 1) { level++; changed = true; }
      else if (avg < 1 / 58 && level > 0) { level--; changed = true; }
      if (changed) { apply(); settle = 30; try { localStorage.setItem("ss-3d-level", String(level)); } catch (e) {} }
      return changed;
    },
  };
}
function lights(scene, pal) {
  scene.add(new THREE.HemisphereLight("#cfe8ff", "#35574a", 1.25));
  const d = new THREE.DirectionalLight(pal.sunColor, 2.3); d.position.copy(pal.sun).multiplyScalar(100); scene.add(d);
  return d;
}

/* ---------------- islands ---------------- */
const DECOR = {
  palms: ["palm-bend", "palm-straight", "palm-detailed-bend", "palm-detailed-straight"],
  rocks: ["rocks-a", "rocks-b", "rocks-c", "rocks-sand-a", "rocks-sand-b", "rocks-sand-c"],
  props: ["barrel", "crate", "chest", "cannon", "bottle-large"],
};
// special set pieces per island index
const SPECIAL = { 0: ["structure-platform-dock", "tower-watch"], 3: ["ship-wreck"], 6: ["structure"], 9: ["tower-complete-small"], 11: ["castle-wall"], 13: ["tower-complete-large", "castle-gate"] };

const LAND_TOP = 1.15;
function makeLand(R, radius, seed) {
  // low-poly mound: wet sand below the waterline, dry sand on top, flat shaded like the Kenney kit
  const seg = 28, g = new THREE.CylinderGeometry(radius * 0.86, radius * 1.18, 3.2, seg, 3, false);
  g.translate(0, LAND_TOP - 1.6, 0);
  const p = g.attributes.position, wob = [];
  for (let k = 0; k < seg; k++) wob.push(0.82 + R() * 0.32);
  for (let v = 0; v < p.count; v++) {
    const x = p.getX(v), z = p.getZ(v), y = p.getY(v);
    const a = Math.atan2(z, x), k = ((Math.round((a / (Math.PI * 2)) * seg) % seg) + seg) % seg;
    const f = wob[k] * (1 + Math.sin(a * 3 + seed) * 0.08);
    p.setXYZ(v, x * f, y + (y > LAND_TOP - 0.01 ? (R() - 0.5) * 0.12 : 0), z * f * 0.86);
  }
  const ng = g.toNonIndexed(); ng.computeVertexNormals();
  const col = new Float32Array(ng.attributes.position.count * 3), pp = ng.attributes.position;
  const dry = new THREE.Color("#ecd39a"), wet = new THREE.Color("#b6955c"), c = new THREE.Color();
  for (let v = 0; v < pp.count; v++) { const y = pp.getY(v); c.copy(wet).lerp(dry, THREE.MathUtils.smoothstep(y, -0.2, LAND_TOP)); col.set([c.r, c.g, c.b], v * 3); }
  ng.setAttribute("color", new THREE.BufferAttribute(col, 3));
  const land = new THREE.Mesh(ng, new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 0.95 }));
  // grassy top
  const gg = new THREE.CylinderGeometry(radius * 0.55, radius * 0.6, 0.25, 14, 1); const gp = gg.attributes.position;
  for (let v = 0; v < gp.count; v++) { const a = Math.atan2(gp.getZ(v), gp.getX(v)); const f = 0.85 + Math.sin(a * 4 + seed * 2) * 0.12; gp.setXYZ(v, gp.getX(v) * f, gp.getY(v), gp.getZ(v) * f * 0.85); }
  gg.computeVertexNormals();
  const grass = new THREE.Mesh(gg, new THREE.MeshStandardMaterial({ color: "#5fae5f", flatShading: true, roughness: 0.9 }));
  grass.position.set((R() - 0.5) * radius * 0.3, LAND_TOP + 0.08, (R() - 0.5) * radius * 0.25);
  const grp = new THREE.Group(); grp.add(land, grass); return grp;
}
async function buildIsland(i, info) {
  const R = rng(i * 131 + 7), grp = new THREE.Group();
  const big = i === 13 ? 1.35 : 1, rad = (6 + R() * 1.4) * big;
  grp.add(makeLand(R, rad, i));
  const foliage = await model("patch-grass-foliage"); foliage.scale.setScalar(0.8 * big); foliage.position.set((R() - 0.5) * 2, LAND_TOP - 0.05, (R() - 0.5) * 2); foliage.rotation.y = R() * 6.28; grp.add(foliage);
  const top = LAND_TOP + 0.15;
  const place = async (name, rad, s = 1) => {
    const o = await model(name); const a = R() * Math.PI * 2, d = rad * (0.4 + R() * 0.6);
    o.position.set(Math.cos(a) * d, top - 0.15, Math.sin(a) * d); o.rotation.y = R() * 6.28; o.scale.setScalar(s); grp.add(o); return o;
  };
  const nPalm = 2 + Math.floor(R() * 3) + (i === 13 ? 2 : 0);
  for (let k = 0; k < nPalm; k++) await place(DECOR.palms[Math.floor(R() * 4)], rad * 0.55, 1.05 + R() * 0.45);
  for (let k = 0; k < 2; k++) { const r = await place(DECOR.rocks[Math.floor(R() * 6)], 1, 0.6 + R() * 0.5); const a = R() * 6.28; r.position.set(Math.cos(a) * rad * 1.02, -0.3, Math.sin(a) * rad * 0.9); }
  if (R() < 0.7) await place(DECOR.props[Math.floor(R() * DECOR.props.length)], 2.2, 0.8);
  for (const sp of SPECIAL[i] || []) {
    const o = await model(sp);
    if (sp === "ship-wreck") { o.position.set(rad + 3.5, -0.9, 2); o.rotation.set(0.15, 1.2, 0.3); o.scale.setScalar(0.5); }
    else if (sp.startsWith("structure-platform-dock")) { o.position.set(rad * 0.9, -0.2, 1.2); o.rotation.y = -Math.PI / 2; o.scale.set(1, 1.1, 1.6); }
    else if (sp === "castle-gate") { o.position.set(-2.5, top - 0.15, 3.0); o.rotation.y = 0.3; o.scale.setScalar(0.9); }
    else { o.position.set(-1.2 * big, top - 0.2, -1.2 * big); o.scale.setScalar(sp === "tower-complete-large" ? 1.1 : 0.9); }
    grp.add(o);
  }
  // flag for conquered / charted islands
  const flag = await model("flag-pirate"); flag.position.set(1.4, top, -0.6); flag.scale.setScalar(1.2); flag.visible = false; grp.add(flag);
  grp.userData = { flag, radius: rad, index: i };
  return grp;
}

/* ---------------- the chart ---------------- */
function layout(n) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const R = rng(i * 53 + 9);
    pts.push(new THREE.Vector3(Math.sin(i * 1.05) * 26 + (R() - 0.5) * 6, 0, -i * 30 + (R() - 0.5) * 4));
  }
  return pts;
}

function mountChart(host, opts) {
  const data = opts.islands;
  const wrap = document.createElement("div"); wrap.className = "sea3d"; host.appendChild(wrap);
  const labels = document.createElement("div"); labels.className = "sea3d-labels"; wrap.appendChild(labels);
  const renderer = makeRenderer(wrap);
  const scene = new THREE.Scene();
  const pal = SKY;
  scene.fog = new THREE.FogExp2(pal.horizon.clone(), 0.0075);
  scene.add(makeSky(pal));
  lights(scene, pal);
  const pos = layout(data.length);
  const ocean = makeOcean(pal, 600, 150, pos.map((p, i) => ({ x: p.x, z: p.z, r: (i === 13 ? 9 : 7) * 1.05 })));
  scene.add(ocean);

  const camera = new THREE.PerspectiveCamera(42, 1, 0.5, 2000);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.screenSpacePanning = false; controls.minDistance = 16; controls.maxDistance = 140;
  controls.minPolarAngle = 0.45; controls.maxPolarAngle = 1.22;
  controls.mouseButtons = { LEFT: THREE.MOUSE.PAN, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.ROTATE };
  controls.touches = { ONE: THREE.TOUCH.PAN, TWO: THREE.TOUCH.DOLLY_ROTATE };
  controls.zoomSpeed = 0.8;

  const islandGroups = [], parks = [];
  pos.forEach((p, i) => {
    const next = pos[i + 1] || pos[i].clone().add(new THREE.Vector3(0, 0, -20)), prev = pos[i - 1] || pos[i].clone().add(new THREE.Vector3(0, 0, 20));
    const dir = next.clone().sub(prev).setY(0).normalize(), side = new THREE.Vector3(-dir.z, 0, dir.x);
    if (side.x * p.x > 0) side.negate(); // park on the side facing the middle of the route
    parks.push(p.clone().addScaledVector(side, i === 13 ? 15 : 12.5));
  });
  const curve = new THREE.CatmullRomCurve3(parks, false, "centripetal", 0.5);

  // route dots
  const routeGeo = new THREE.BufferGeometry(), routeN = 420, rp = new Float32Array(routeN * 3), rc = new Float32Array(routeN * 3);
  for (let k = 0; k < routeN; k++) { const v = curve.getPoint(k / (routeN - 1)); rp.set([v.x, 0.55, v.z], k * 3); }
  routeGeo.setAttribute("position", new THREE.BufferAttribute(rp, 3)); routeGeo.setAttribute("color", new THREE.BufferAttribute(rc, 3));
  const route = new THREE.Points(routeGeo, new THREE.PointsMaterial({ size: 0.5, map: soft(), vertexColors: true, transparent: true, depthWrite: false }));
  scene.add(route);
  const paintRoute = () => {
    let doneUpTo = 0; data.forEach((d, i) => { if (d.passed) doneUpTo = i + 1; });
    for (let k = 0; k < routeN; k++) {
      const u = (k / (routeN - 1)) * (data.length - 1), done = u < doneUpTo;
      const c = done ? [1, 0.78, 0.35] : [0.75, 0.82, 0.85];
      rc.set(k % 3 === 0 || done ? c : [0, 0, 0], k * 3);
    }
    routeGeo.attributes.color.needsUpdate = true;
  };

  // beacon for the current island
  const beaconMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: { uT: { value: 0 } },
    vertexShader: `varying float vY; varying float vF; void main(){ vY=uv.y; vec4 w=modelMatrix*vec4(position,1.); vec3 n=normalize(mat3(modelMatrix)*normal); vF=abs(dot(n,normalize(cameraPosition-w.xyz))); gl_Position=projectionMatrix*viewMatrix*w; }`,
    fragmentShader: `varying float vY; varying float vF; uniform float uT; void main(){ float a=pow(1.-vY,1.6)*(0.7+0.3*sin(uT*2.5))*pow(vF,2.2); gl_FragColor=vec4(1.,0.82,0.45,a*0.85); }`,
  });
  const beacon = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 3.2, 34, 24, 1, true), beaconMat);
  beacon.geometry.translate(0, 17 + LAND_TOP, 0);
  // rebuild uv so x wraps around (keep default), fine
  scene.add(beacon);

  // fog puffs for locked islands
  const fogMat = new THREE.SpriteMaterial({ map: soft(), color: "#e8eef0", transparent: true, opacity: 0.8, depthWrite: false, fog: false });
  const fogs = [];

  // labels
  const labelEls = data.map((d, i) => {
    const b = document.createElement("button"); b.type = "button"; b.className = "s3l"; b.dataset.ch = d.id;
    labels.appendChild(b); b.addEventListener("click", (e) => { e.stopPropagation(); opts.onPick(d.id); });
    return b;
  });
  const paintLabels = () => labelEls.forEach((b, i) => {
    const d = data[i];
    b.className = "s3l" + (d.unlocked ? "" : " locked") + (d.selected ? " sel" : "") + (d.current ? " cur" : "") + (d.done ? " done" : "");
    b.innerHTML = `<span class="n">${i + 1}</span><span class="t"><b>${d.name}</b><small>${d.status}</small></span>`;
    b.setAttribute("aria-label", `${d.name}: ${d.title}. ${d.status}`);
  });

  // build everything async
  let ship = null, sails = [], flags = [], ready = false, disposed = false;
  const extras = { gulls: [], clouds: [], serpent: null, ghost: null, smallShip: null };
  (async () => {
    for (let i = 0; i < pos.length; i++) {
      const g = await buildIsland(i, data[i]); if (disposed) return;
      g.position.copy(pos[i]); islandGroups.push(g); scene.add(g);
    }
    ship = await model("ship-pirate-large"); if (disposed) return;
    ship.scale.setScalar(0.62);
    ship.traverse((o) => { if (/sail/.test(o.name)) sails.push(o); if (/flag/.test(o.name)) flags.push(o); });
    sails.forEach((s) => (s.userData.base = s.scale.clone()));
    scene.add(ship);
    // wake
    const wakeN = 60, wp = new Float32Array(wakeN * 3), wa = new Float32Array(wakeN);
    const wakeGeo = new THREE.BufferGeometry(); wakeGeo.setAttribute("position", new THREE.BufferAttribute(wp, 3));
    const wake = new THREE.Points(wakeGeo, new THREE.PointsMaterial({ size: 1.4, map: soft(), color: "#ffffff", transparent: true, opacity: 0.55, depthWrite: false }));
    wake.frustumCulled = false; scene.add(wake); extras.wake = { geo: wakeGeo, p: wp, i: 0, n: wakeN };
    // background traffic
    extras.smallShip = await model("ship-pirate-small"); extras.smallShip.scale.setScalar(0.5); scene.add(extras.smallShip);
    const R = rng(77);
    for (let k = 0; k < 9; k++) { const c = makeCloud(R); c.position.set((R() - 0.5) * 160, 34 + R() * 14, 20 - R() * 360); c.userData.v = 0.6 + R() * 0.8; scene.add(c); extras.clouds.push(c); }
    for (let k = 0; k < 7; k++) { const g = makeGull(); g.scale.setScalar(0.5); g.userData.c = pos[Math.floor(R() * pos.length)].clone(); g.userData.r = 7 + R() * 9; g.userData.ph = R() * 6.28; g.userData.h = 9 + R() * 6; g.userData.sp = 0.35 + R() * 0.3; scene.add(g); extras.gulls.push(g); }
    const last = pos[pos.length - 1];
    extras.serpent = makeSerpent(); extras.serpent.position.set(last.x - 16, 0, last.z - 12); extras.serpent.rotation.y = 0.6; scene.add(extras.serpent);
    extras.ghost = await model("ship-ghost"); extras.ghost.scale.setScalar(0.6); extras.ghost.position.set(last.x + 18, 0, last.z - 18); extras.ghost.rotation.y = -0.8;
    extras.ghost.traverse((o) => { if (o.isMesh) { o.material = o.material.clone(); o.material.transparent = true; o.material.opacity = 0.55; o.material.color = new THREE.Color("#b9f5e6"); o.material.emissive = new THREE.Color("#2e8f7a"); } });
    scene.add(extras.ghost);
    ready = true;
    applyState(true);
    if (opts.sailFrom != null && opts.sailTo > opts.sailFrom) setTimeout(() => sail(opts.sailFrom, opts.sailTo), 700);
    opts.onReady && opts.onReady();
  })().catch((e) => { console.warn("Sea3D build failed", e); opts.onFail && opts.onFail(e); });

  let shipU = (opts.sailFrom ?? opts.shipAt ?? 0) / Math.max(1, pos.length - 1);
  let sailing = null, focus = null;
  const camOffset = new THREE.Vector3(0, 40, 46);
  function frame(i, instant) {
    const p = pos[i]; const target = p.clone().add(new THREE.Vector3(0, 0, 0));
    if (instant) { controls.target.copy(target); camera.position.copy(target).add(camOffset); controls.update(); }
    else focus = { from: controls.target.clone(), to: target, camFrom: camera.position.clone(), t: 0 };
  }
  function applyState(first) {
    data.forEach((d, i) => {
      const g = islandGroups[i]; if (!g) return;
      if (!d.unlocked && !g.userData.tinted) { tint(g, "#24323a", 0.62); g.userData.tinted = true; }
      if (d.unlocked && g.userData.tinted) { /* rebuild materials would be heavy; re-tint toward normal */ g.traverse((o) => { if (o.isMesh) o.material.color.set("#ffffff"); }); g.userData.tinted = false; }
      g.userData.flag.visible = !!(d.done || d.placed);
      if (!d.unlocked && !g.userData.fog) {
        const f = new THREE.Group(); for (let k = 0; k < 7; k++) { const s = new THREE.Sprite(fogMat); s.scale.set(11 + k * 1.2, 6 + (k % 3), 1); s.position.set(Math.cos(k * 0.9) * 5, 2.5 + (k % 3) * 0.8, Math.sin(k * 0.9) * 4.5); s.renderOrder = 5; f.add(s); }
        g.add(f); g.userData.fog = f; fogs.push(f);
      } else if (d.unlocked && g.userData.fog) { g.remove(g.userData.fog); g.userData.fog = null; }
    });
    const cur = data.findIndex((d) => d.current);
    beacon.visible = cur >= 0; if (cur >= 0) beacon.position.copy(pos[cur]);
    paintRoute(); paintLabels();
    const sel = Math.max(0, data.findIndex((d) => d.selected));
    if (first) frame(opts.sailFrom != null && opts.sailTo > opts.sailFrom ? opts.sailFrom : sel, true);
  }
  function sail(from, to) {
    if (!ship) return;
    opts.onSailStart && opts.onSailStart();
    sailing = { u0: from / (pos.length - 1), u1: to / (pos.length - 1), t: 0, dur: 1.8 + (to - from) * 1.4 };
  }

  // picking
  const ray = new THREE.Raycaster(), mouse = new THREE.Vector2();
  let downAt = null;
  renderer.domElement.addEventListener("pointerdown", (e) => { downAt = [e.clientX, e.clientY]; });
  renderer.domElement.addEventListener("pointerup", (e) => {
    if (!downAt || Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]) > 6) return;
    const hit = pickAt(e); if (hit != null) opts.onPick(data[hit].id);
  });
  let hoverT = 0;
  renderer.domElement.addEventListener("pointermove", (e) => {
    const now = performance.now(); if (now - hoverT < 60) return; hoverT = now;
    const hit = pickAt(e); renderer.domElement.style.cursor = hit != null ? "pointer" : "grab";
    islandGroups.forEach((g, i) => (g.userData.hover = i === hit));
  });
  function pickAt(e) {
    const r = renderer.domElement.getBoundingClientRect();
    mouse.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(mouse, camera);
    const hits = ray.intersectObjects(islandGroups, true);
    for (const h of hits) { let o = h.object; while (o && o.userData.index == null) o = o.parent; if (o) return o.userData.index; }
    // fallback: nearest island to the sea hit point
    const pl = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), pt = new THREE.Vector3();
    if (ray.ray.intersectPlane(pl, pt)) { let best = -1, bd = 1e9; pos.forEach((p, i) => { const d = p.distanceTo(pt); if (d < bd) { bd = d; best = i; } }); if (bd < 8) return best; }
    return null;
  }

  // resize + visibility
  let w = 0, h = 0, visible = true;
  const resize = () => {
    const r = wrap.getBoundingClientRect(); if (!r.width || !r.height) return;
    if (r.width === w && r.height === h) return; w = r.width; h = r.height;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize); ro.observe(wrap);
  const io = new IntersectionObserver((en) => { visible = en[0].isIntersecting; }); io.observe(wrap);

  const clock = new THREE.Clock(); let t = 0, raf = 0;
  const gov = makeGovernor(renderer, ocean);
  const tmp = new THREE.Vector3(), proj = new THREE.Vector3();
  const motion = () => !document.documentElement.classList.contains("calm");
  function tick() {
    raf = requestAnimationFrame(tick);
    if (!visible || document.hidden) { clock.getDelta(); return; }
    resize();
    const raw = clock.getDelta();
    if (gov.frame(raw)) { w = 0; resize(); }
    const dt = Math.min(raw, 0.1); t += motion() ? dt : dt * 0.25;
    ocean.material.uniforms.uT.value = t; beaconMat.uniforms.uT.value = t;
    ocean.position.set(Math.round(controls.target.x / 4) * 4, 0, Math.round(controls.target.z / 4) * 4);
    // camera focus animation
    if (focus) {
      focus.t = Math.min(1, focus.t + dt / 1.1); const e = focus.t < 0.5 ? 4 * focus.t ** 3 : 1 - Math.pow(-2 * focus.t + 2, 3) / 2;
      const delta = focus.to.clone().sub(focus.from);
      controls.target.copy(focus.from).addScaledVector(delta, e);
      camera.position.copy(focus.camFrom).addScaledVector(delta, e);
      if (focus.t >= 1) focus = null;
    }
    // ship
    if (ship) {
      if (sailing) {
        sailing.t = Math.min(1, sailing.t + dt / sailing.dur);
        const q = sailing.t, e = q < 0.5 ? 2 * q * q : 1 - Math.pow(-2 * q + 2, 2) / 2;
        const prevU = shipU; shipU = sailing.u0 + (sailing.u1 - sailing.u0) * e;
        const p = curve.getPointAt(Math.min(0.9999, shipU));
        const d = p.clone().sub(controls.target); controls.target.add(d.multiplyScalar(0.08)); camera.position.add(d);
        if (sailing.t >= 1) { sailing = null; opts.onArrive && opts.onArrive(); }
        void prevU;
      }
      const p = curve.getPointAt(Math.min(0.9999, Math.max(0, shipU)));
      const tan = curve.getTangentAt(Math.min(0.9999, Math.max(0.0001, shipU)));
      const hgt = waveH(p.x, p.z, t), [gx, gz] = waveGrad(p.x, p.z, t);
      ship.position.set(p.x, hgt - 0.35, p.z);
      const yaw = Math.atan2(tan.x, tan.z);
      ship.rotation.set(0, 0, 0); ship.rotateY(yaw);
      // pitch / roll from the wave slope in the ship's frame
      const fx = Math.sin(yaw), fz = Math.cos(yaw);
      const slopeF = gx * fx + gz * fz, slopeS = gx * fz - gz * fx;
      ship.rotateX(-slopeF * 0.6); ship.rotateZ(slopeS * 0.6 + (sailing ? Math.sin(t * 1.3) * 0.03 : 0));
      sails.forEach((s, k) => { const b = s.userData.base; s.scale.set(b.x, b.y, b.z * (1 + Math.sin(t * 2.3 + k) * 0.06 + (sailing ? 0.12 : 0))); });
      flags.forEach((f, k) => { f.rotation.y = Math.sin(t * 5 + k) * 0.25; });
      if (extras.wake) {
        const W = extras.wake; const stern = ship.position.clone().add(new THREE.Vector3(-fx * 3.6, 0.2, -fz * 3.6));
        if (sailing || Math.random() < 0.15) { W.p.set([stern.x + (Math.random() - 0.5) * 0.8, waveH(stern.x, stern.z, t) + 0.15, stern.z + (Math.random() - 0.5) * 0.8], (W.i % W.n) * 3); W.i++; }
        W.geo.attributes.position.needsUpdate = true;
      }
    }
    // islands hover
    islandGroups.forEach((g) => { const s = g.userData.hover ? 1.04 : 1; g.scale.lerp(tmp.set(s, s, s), 0.2); });
    // extras
    if (extras.smallShip) {
      const a = t * 0.05, c = pos[4];
      const x = c.x + Math.cos(a) * 46, z = c.z - 20 + Math.sin(a) * 60;
      extras.smallShip.position.set(x, waveH(x, z, t) - 0.25, z); extras.smallShip.rotation.set(0, -a + Math.PI, Math.sin(t) * 0.04);
    }
    extras.clouds.forEach((c) => { c.position.x += c.userData.v * dt; if (c.position.x > 120) c.position.x = -120; });
    extras.gulls.forEach((g) => {
      const u = g.userData, a = u.ph + t * u.sp;
      g.position.set(u.c.x + Math.cos(a) * u.r, u.h + Math.sin(t * 0.7 + u.ph) * 0.8, u.c.z + Math.sin(a) * u.r);
      g.rotation.set(0, -a, 0.35); const f = Math.sin(t * 9 + u.ph) * 0.6; u.wl.rotation.z = -f; u.wr.rotation.z = f;
    });
    if (extras.serpent) {
      const s = extras.serpent.userData;
      s.humps.forEach((m, k) => { m.position.y = -0.55 + Math.sin(t * 1.6 - k * 0.9) * 0.45; });
      s.head.position.y = 1.4 + Math.sin(t * 1.6 + 0.9) * 0.4; s.head.rotation.z = Math.sin(t * 0.8) * 0.15;
      extras.serpent.position.x += Math.sin(t * 0.2) * 0.01;
    }
    if (extras.ghost) { const g = extras.ghost; g.position.y = waveH(g.position.x, g.position.z, t) - 0.2 + Math.sin(t) * 0.15; g.rotation.z = Math.sin(t * 0.7) * 0.05; }
    fogs.forEach((f, k) => { f.rotation.y += dt * 0.06; f.children.forEach((s, j) => { s.position.y = 2.5 + (j % 3) * 0.8 + Math.sin(t * 0.5 + j) * 0.3; }); });
    controls.update();
    // keep target inside the archipelago
    controls.target.x = THREE.MathUtils.clamp(controls.target.x, -60, 60);
    controls.target.z = THREE.MathUtils.clamp(controls.target.z, pos[pos.length - 1].z - 30, 30);
    renderer.render(scene, camera);
    // labels
    labelEls.forEach((b, i) => {
      proj.copy(pos[i]).setY(i === 13 ? 13 : 8).project(camera);
      const vis = proj.z < 1 && Math.abs(proj.x) < 1.1 && Math.abs(proj.y) < 1.1;
      if (!vis) { b.style.display = "none"; return; }
      b.style.display = ""; b.style.transform = `translate(-50%,-100%) translate(${((proj.x + 1) / 2) * w}px, ${((1 - proj.y) / 2) * h}px)`;
      const dist = camera.position.distanceTo(pos[i]); b.style.opacity = String(THREE.MathUtils.clamp(1.6 - dist / 110, 0.15, 1));
      b.style.zIndex = String(1000 - Math.round(dist));
    });
  }
  tick();

  function dispose() {
    disposed = true; cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); controls.dispose();
    scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) { (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose()); } });
    renderer.dispose(); renderer.forceContextLoss(); wrap.remove();
  }
  return {
    update(newData) { newData.forEach((d, i) => Object.assign(data[i], d)); if (ready) applyState(false); else paintLabels(); },
    focus(i) { frame(i, false); },
    sail, dispose, get ready() { return ready; },
  };
}

/* ---------------- celebration scene ---------------- */
function mountCelebration(host, opts = {}) {
  const kind = opts.kind || "lesson"; // lesson | island | finale
  const wrap = document.createElement("div"); wrap.className = "sea3d celebrate"; host.appendChild(wrap);
  const renderer = makeRenderer(wrap);
  const scene = new THREE.Scene();
  const pal = kind === "lesson" ? SKY : DUSK;
  scene.fog = new THREE.FogExp2(pal.horizon.clone(), 0.014);
  scene.add(makeSky(pal)); lights(scene, pal);
  const ocean = makeOcean(pal, 900, 200, [{ x: -14, z: -16, r: 7 }]); scene.add(ocean);
  const camera = new THREE.PerspectiveCamera(40, 1, 0.5, 2000);
  let ship = null, island = null, disposed = false, sails = [];
  const balls = [], puffs = [], sparks = [], flashes = [];
  const flashLight = new THREE.PointLight("#ffbb66", 0, 30); scene.add(flashLight);
  const smokeMat = new THREE.SpriteMaterial({ map: soft(), color: "#d8d2c8", transparent: true, depthWrite: false });
  const flashMat = new THREE.SpriteMaterial({ map: softTexture("rgba(255,240,180,1)", "rgba(255,140,40,0)"), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  const ballGeo = new THREE.SphereGeometry(0.22, 8, 6), ballMat = new THREE.MeshStandardMaterial({ color: "#222" });
  // firework particles
  const FW = 1600, fwPos = new Float32Array(FW * 3), fwCol = new Float32Array(FW * 3), fwVel = new Float32Array(FW * 3), fwLife = new Float32Array(FW);
  const fwGeo = new THREE.BufferGeometry(); fwGeo.setAttribute("position", new THREE.BufferAttribute(fwPos, 3)); fwGeo.setAttribute("color", new THREE.BufferAttribute(fwCol, 3));
  const fw = new THREE.Points(fwGeo, new THREE.PointsMaterial({ size: 1.7, map: soft(), vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false }));
  fw.frustumCulled = false; scene.add(fw);
  let fwI = 0;
  const COLORS = ["#ffd166", "#ef6b54", "#63c28f", "#7fb7d9", "#ffffff", "#c3b7ee", "#ff9ad5"].map((c) => new THREE.Color(c));
  function burst(x, y, z) {
    const col = COLORS[Math.floor(Math.random() * COLORS.length)], col2 = COLORS[Math.floor(Math.random() * COLORS.length)];
    for (let k = 0; k < 160; k++) {
      const i = fwI++ % FW; const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1), sp = 5 + Math.random() * 2.5;
      fwPos.set([x, y, z], i * 3); fwVel.set([Math.sin(ph) * Math.cos(th) * sp, Math.cos(ph) * sp, Math.sin(ph) * Math.sin(th) * sp], i * 3);
      const c = k % 3 ? col : col2; fwCol.set([c.r, c.g, c.b], i * 3); fwLife[i] = 1.6 + Math.random() * 0.6;
    }
    opts.onBoom && opts.onBoom();
  }
  (async () => {
    ship = await model(kind === "finale" ? "ship-pirate-large" : "ship-pirate-medium"); if (disposed) return;
    ship.scale.setScalar(0.75); ship.traverse((o) => { if (/sail/.test(o.name)) { sails.push(o); o.userData.base = o.scale.clone(); } });
    scene.add(ship);
    island = await buildIsland(kind === "finale" ? 13 : (opts.seed || 2), {}); if (disposed) return;
    island.position.set(-14, 0, -16); if (kind !== "lesson") island.userData.flag.visible = true; scene.add(island);
    const R = rng(5);
    for (let k = 0; k < 4; k++) { const c = makeCloud(R); c.position.set((R() - 0.5) * 120, 28 + R() * 10, -60 - R() * 60); scene.add(c); }
  })().catch((e) => console.warn("celebration failed", e));
  function fire() {
    if (!ship) return;
    const side = new THREE.Vector3(1, 0, 0).applyQuaternion(ship.quaternion); // starboard
    const fwd = new THREE.Vector3(0, 0, 1).applyQuaternion(ship.quaternion);
    for (let k = 0; k < 3; k++) {
      const at = ship.position.clone().addScaledVector(fwd, (k - 1) * 1.6).addScaledVector(side, 1.9).add(new THREE.Vector3(0, 1.2, 0));
      setTimeout(() => {
        if (disposed) return;
        const f = new THREE.Sprite(flashMat); f.position.copy(at); f.scale.setScalar(2.4); f.userData.life = 0.18; scene.add(f); flashes.push(f);
        flashLight.position.copy(at); flashLight.intensity = 60;
        for (let j = 0; j < 4; j++) { const s = new THREE.Sprite(smokeMat.clone()); s.position.copy(at).addScaledVector(side, 0.6 + j * 0.3); s.scale.setScalar(1.2); s.userData = { life: 1.8, v: side.clone().multiplyScalar(1.5 + Math.random()).add(new THREE.Vector3(0, 0.8, 0)) }; scene.add(s); puffs.push(s); }
        const b = new THREE.Mesh(ballGeo, ballMat); b.position.copy(at); b.userData.v = side.clone().multiplyScalar(17).add(new THREE.Vector3(0, 7, 0)); scene.add(b); balls.push(b);
        opts.onCannon && opts.onCannon(k);
      }, k * 260);
    }
  }
  let w = 0, h = 0;
  const resize = () => { const r = wrap.getBoundingClientRect(); if (!r.width || !r.height || (r.width === w && r.height === h)) return; w = r.width; h = r.height; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); };
  const clock = new THREE.Clock(); let t = 0, raf = 0, nextFire = 0.8, nextBurst = 1.4;
  const gov = makeGovernor(renderer, ocean);
  function tick() {
    raf = requestAnimationFrame(tick);
    if (document.hidden) { clock.getDelta(); return; }
    resize();
    const raw = clock.getDelta();
    if (gov.frame(raw)) { w = 0; resize(); }
    const dt = Math.min(raw, 0.1); t += dt;
    ocean.material.uniforms.uT.value = t;
    const ang = t * 0.12;
    camera.position.set(Math.sin(ang) * 26 + 6, 7 + Math.sin(t * 0.3), Math.cos(ang) * 26); camera.lookAt(-3, kind === "lesson" ? 3 : 6, -6);
    if (ship) {
      const x = Math.sin(t * 0.2) * 1.5, z = 0;
      const [gx, gz] = waveGrad(x, z, t); ship.position.set(x, waveH(x, z, t) - 0.3, z); ship.rotation.set(-gz * 0.6, 0.4, gx * 0.6);
      sails.forEach((s, k) => { const b = s.userData.base; s.scale.set(b.x, b.y, b.z * (1.05 + Math.sin(t * 2 + k) * 0.06)); });
    }
    if (t > nextFire) { fire(); nextFire = t + (kind === "lesson" ? 3.2 : 2.6); }
    if (kind !== "lesson" && t > nextBurst) { burst(-6 + (Math.random() - 0.5) * 26, 11 + Math.random() * 6, -14 + (Math.random() - 0.5) * 12); nextBurst = t + (kind === "finale" ? 0.45 : 0.8) + Math.random() * 0.5; }
    flashLight.intensity *= 0.82;
    for (let i = flashes.length - 1; i >= 0; i--) { const f = flashes[i]; f.userData.life -= dt; f.scale.multiplyScalar(1.08); if (f.userData.life <= 0) { scene.remove(f); flashes.splice(i, 1); } }
    for (let i = puffs.length - 1; i >= 0; i--) { const s = puffs[i]; s.userData.life -= dt; s.position.addScaledVector(s.userData.v, dt); s.userData.v.multiplyScalar(0.96); s.scale.multiplyScalar(1 + dt * 0.9); s.material.opacity = Math.max(0, s.userData.life / 1.8) * 0.8; if (s.userData.life <= 0) { scene.remove(s); s.material.dispose(); puffs.splice(i, 1); } }
    for (let i = balls.length - 1; i >= 0; i--) {
      const b = balls[i]; b.userData.v.y -= 9.8 * dt; b.position.addScaledVector(b.userData.v, dt);
      if (b.position.y < waveH(b.position.x, b.position.z, t)) {
        for (let j = 0; j < 6; j++) { const s = new THREE.Sprite(smokeMat.clone()); s.material.color.set("#ffffff"); s.position.copy(b.position); s.scale.setScalar(0.8); s.userData = { life: 1.0, v: new THREE.Vector3((Math.random() - 0.5) * 2, 3 + Math.random() * 3, (Math.random() - 0.5) * 2) }; scene.add(s); puffs.push(s); }
        scene.remove(b); balls.splice(i, 1); opts.onSplash && opts.onSplash();
      }
    }
    for (let i = 0; i < FW; i++) {
      if (fwLife[i] <= 0) continue;
      fwLife[i] -= dt; const j = i * 3;
      fwVel[j + 1] -= 4 * dt; fwVel[j] *= 0.985; fwVel[j + 1] *= 0.985; fwVel[j + 2] *= 0.985;
      fwPos[j] += fwVel[j] * dt; fwPos[j + 1] += fwVel[j + 1] * dt; fwPos[j + 2] += fwVel[j + 2] * dt;
      if (fwLife[i] <= 0) { fwPos[j + 1] = -999; }
      else if (fwLife[i] < 0.5) { fwCol[j] *= 0.93; fwCol[j + 1] *= 0.93; fwCol[j + 2] *= 0.93; }
    }
    fwGeo.attributes.position.needsUpdate = true; fwGeo.attributes.color.needsUpdate = true;
    renderer.render(scene, camera);
  }
  tick();
  return {
    dispose() {
      disposed = true; cancelAnimationFrame(raf);
      scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose()); });
      renderer.dispose(); renderer.forceContextLoss(); wrap.remove();
    },
  };
}

function webglOK() {
  try { const c = document.createElement("canvas"); return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl"))); } catch (e) { return false; }
}

window.Sea3D = { ok: webglOK(), mountChart, mountCelebration, preload: () => Promise.all(["ship-pirate-large", "patch-sand", "palm-bend"].map(model)) };
window.dispatchEvent(new Event("sea3d-ready"));
