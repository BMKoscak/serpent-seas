/* Serpent Seas — explorable harbor and ship (first person).
   three.js + Kenney Pirate Kit, Mini Characters and Fantasy Town Kit (all CC0).
   Exposes window.World3D.mount(host, opts). */
import { mergeGeometries } from "./lib/BufferGeometryUtils.js";
import { THREE, loader, model, waveH, makeSky, makeOcean, SKY, makeRenderer, makeGovernor, lights, rng, soft, makeCloud, makeGull, makeSerpent, paintShip, webglOK } from "./sea3d.js?v=3";

const LINES = {"captain":{"greet1":["Ah, there ye are. The sea's been waitin', and so have I.","Á, tu si. Morje te čaka, pa jaz tudi."],"greet2":["Welcome aboard the Serpent, sailor. Mind the deck, she bites.","Dobrodošel na Kači, mornar. Pazi na palubo, grize."],"orders1":["Yer next lesson awaits. Take the wheel when ye're ready, and we'll set sail.","Naslednja lekcija te čaka. Primi krmilo, ko boš pripravljen, in odplujemo."],"sail1":["Raise the anchor! Hoist the sails! We sail for knowledge!","Dvignite sidro! Razpnite jadra! Plujemo po znanje!"],"arrive1":["Land ho. Go ashore, and come back smarter than ye left.","Kopno na vidiku. Pojdi na obalo in se vrni pametnejši, kot si odšel."],"tip1":["A wise captain names things clearly. Same goes for yer variables.","Moder kapitan stvari jasno poimenuje. Enako velja za tvoje spremenljivke."],"tip2":["When the storm hits, read the error. It tells ye exactly where the leak is.","Ko udari nevihta, preberi napako. Točno ti pove, kje pušča."],"tip3":["Small steps, sailor. Run yer code often, and ye'll never drift far off course.","Majhni koraki, mornar. Kodo poganjaj pogosto, pa ne boš nikoli zašel daleč s poti."],"proud1":["Ye've grown, sailor. I've seen captains with half yer grit.","Zrasel si, mornar. Videl sem kapitane s pol tvoje vztrajnosti."],"bye1":["Off with ye. And don't let that parrot near the biscuits.","Pojdi zdaj. In ne pusti tiste papige blizu prepečenca."]},"ada":{"greet1":["Quartermaster Ada. I keep the books, the cargo, and the crew in order. Mostly the crew.","Upraviteljica Ada. Skrbim za knjige, tovor in red med posadko. Predvsem med posadko."],"greet2":["Back again? Good. Something needs counting, and you look clever.","Spet tukaj? Dobro. Nekaj je treba prešteti, ti pa izgledaš pametno."],"tip1":["A list keeps things in order. A dictionary finds them by name. Choose wisely.","Seznam hrani stvari po vrsti. Slovar jih najde po imenu. Izbiraj pametno."],"tip2":["If you copy the same code three times, it wants to be a function. Listen to it.","Če isto kodo kopiraš trikrat, si želi postati funkcija. Prisluhni ji."],"tip3":["Loops are for chores. Let the computer repeat things. It never gets bored.","Zanke so za opravila. Naj računalnik ponavlja. Nikoli se ne dolgočasi."],"tip4":["Test with weird input. Empty lists, zero, negative numbers. Pirates love edge cases.","Preizkusi s čudnimi vhodi. Prazni seznami, nič, negativna števila. Pirati obožujejo robne primere."],"tip5":["Comments explain why, not what. The code already says what.","Komentarji pojasnijo zakaj, ne kaj. Koda že pove kaj."],"banter1":["The cook says his stew is object oriented. I've decided not to ask.","Kuhar pravi, da je njegova enolončnica objektno usmerjena. Odločila sem se, da ne bom spraševala."],"banter2":["Pip once tried to audit our cargo. He counted three crackers and declared us bankrupt.","Pip je enkrat poskušal pregledati tovor. Preštel je tri krekerje in razglasil stečaj."],"bye1":["Off you go. Keep your indentation tidy.","Pojdi zdaj. Pazi, da bo zamik urejen."]},"cook":{"greet1":["Arr, welcome to me galley! Mind the pot, it's older than the ship!","Arr, dobrodošel v moji kuhinji! Pazi na lonec, starejši je od ladje!"],"greet2":["Hungry, matey? I've got stew, more stew, and a mystery!","Si lačen, mornar? Imam enolončnico, še več enolončnice in skrivnost!"],"tip1":["A function's just a recipe, see? Write it once, cook it a thousand times!","Funkcija je samo recept, veš? Napišeš ga enkrat, skuhaš tisočkrat!"],"tip2":["Parameters are the ingredients. Return is what comes out the pot!","Parametri so sestavine. Return je to, kar pride iz lonca!"],"tip3":["Never mix salt and sugar, and never mix strings and numbers. Trust me.","Nikoli ne mešaj soli in sladkorja, in nikoli ne mešaj besedil in števil. Verjemi mi."],"tip4":["A while loop with no end is like me stew: it just keeps going.","Zanka while brez konca je kot moja enolončnica: kar traja in traja."],"banter1":["Today's special: fish! Yesterday's special: also fish. Tomorrow? Ye guessed it.","Današnja posebnost: riba! Včerajšnja posebnost: tudi riba. Jutri? Uganil si."],"banter2":["The parrot keeps stealin' me crackers. I've started hidin' 'em in a dictionary.","Papiga mi kar naprej krade krekerje. Začel sem jih skrivati v slovarju."],"banter3":["Don't tell the captain, but I once made soup out of a semicolon.","Ne povej kapitanu, ampak enkrat sem skuhal juho iz podpičja."],"bye1":["Off ye go! Come back when ye're hungry for more!","Pojdi zdaj! Vrni se, ko boš lačen še več!"]},"nell":{"greet1":["Hi! I'm Nell, the lookout! I can see everything from up there. Well, almost.","Živijo! Jaz sem Nell, opazovalka! Od zgoraj vidim vse. No, skoraj vse."],"greet2":["Ahoy! Did you see the new island? It's huge! Probably full of loops!","Ahoj! Si videl nov otok? Ogromen je! Verjetno poln zank!"],"tip1":["When I'm lost I print things out. Seeing what your variables hold is like a spyglass!","Ko se izgubim, si stvari izpišem. Videti, kaj hranijo spremenljivke, je kot daljnogled!"],"tip2":["Big problems look scary from far away. Up close, they're just lots of tiny problems!","Velike težave od daleč izgledajo strašno. Od blizu so samo veliko majhnih težav!"],"tip3":["Everyone gets errors. Even the captain! He just hides it better.","Vsi dobivamo napake. Tudi kapitan! Samo bolje jih skriva."],"tip4":["Try changing one thing at a time. Then you know exactly what fixed it!","Spreminjaj eno stvar naenkrat. Potem točno veš, kaj je popravilo napako!"],"banter1":["I saw a sea serpent once! Or a log. It was a very convincing log.","Enkrat sem videla morsko kačo! Ali pa hlod. Bil je zelo prepričljiv hlod."],"banter2":["Pip says he's the real lookout. He fell asleep in the crow's nest twice.","Pip pravi, da je on pravi opazovalec. Dvakrat je zaspal v košu na jamboru."],"banter3":["One day I'll write a program that spots treasure for me. You'll help, right?","Nekoč bom napisala program, ki bo zame iskal zaklade. Mi boš pomagal, kajne?"],"bye1":["Bye! Wave at me when you pass the mast!","Adijo! Pomahaj mi, ko greš mimo jambora!"]},"silas":{"greet1":["Ah, a customer. Old Silas has wares for every coder on the seven seas.","Á, kupec. Stari Silas ima blago za vsakega programerja na sedmih morjih."],"greet2":["Back for more treasures, are ye? I knew ye had taste.","Spet si prišel po zaklade, kaj? Vedel sem, da imaš okus."],"browse1":["Have a look. Themes for yer editor, hats for yer bird, sails for yer ship.","Kar poglej. Teme za urejevalnik, klobuki za ptiča, jadra za ladjo."],"buy1":["A fine choice! That'll look grand.","Odlična izbira! To bo izgledalo imenitno."],"buy2":["Pleasure doin' business. Spend it all, I always say.","Veselje je poslovati s tabo. Zapravi vse, vedno pravim."],"poor1":["Ach, ye're a few doubloons short. Finish a lesson or two and come back.","Oh, nekaj dublonov ti manjka. Končaj lekcijo ali dve in se vrni."],"poor2":["No coin, no treasure. Them's the rules of the sea.","Brez kovancev ni zakladov. Takšna so pravila morja."],"equip1":["Wear it proud, sailor.","Nosi ga ponosno, mornar."],"tip1":["Every lesson ye finish fills yer purse. Learnin' pays, in more ways than one.","Vsaka lekcija, ki jo končaš, napolni mošnjiček. Učenje se splača, na več načinov."],"bye1":["Fair winds, young one. Come back when yer purse is heavy.","Dober veter, mladič. Vrni se, ko bo mošnjiček težak."]}};

/* ---------------- crew ---------------- */
const CREW = {
  captain: { model: "male-b", name: ["Captain Marlow", "Kapitan Marlow"], role: ["Captain · takes you sailing", "Kapitan · pelje te na plovbo"], hat: "tricorn",
    tips: ["tip1", "tip2", "tip3"], chat: ["proud1"] },
  ada: { model: "female-d", name: ["Quartermaster Ada", "Upraviteljica Ada"], role: ["Quartermaster · coding tips", "Upraviteljica · nasveti za kodo"], hat: "bandana", hatColor: "#2f4f7a",
    tips: ["tip1", "tip2", "tip3", "tip4", "tip5"], chat: ["banter1", "banter2"] },
  cook: { model: "male-a", name: ["Salty the Cook", "Kuhar Slanko"], role: ["Cook · recipes for code", "Kuhar · recepti za kodo"], hat: "toque",
    tips: ["tip1", "tip2", "tip3", "tip4"], chat: ["banter1", "banter2", "banter3"] },
  nell: { model: "female-b", name: ["Nell the Lookout", "Opazovalka Nell"], role: ["Lookout · sees everything", "Opazovalka · vidi vse"], hat: "bandana", hatColor: "#c0392b",
    tips: ["tip1", "tip2", "tip3", "tip4"], chat: ["banter1", "banter2", "banter3"] },
  silas: { model: "male-e", name: ["Old Silas", "Stari Silas"], role: ["Trader · spend your doubloons", "Trgovec · zapravi dublone"], hat: "tricorn", hatColor: "#5a3b22",
    tips: ["tip1"], chat: [] },
};
const UI = {
  talk: ["Talk", "Govori"], tips: ["Any tips?", "Kakšen nasvet?"], chat: ["What's new?", "Kaj je novega?"], bye: ["Bye", "Adijo"],
  sail: ["Set sail", "Odpluj"], shop: ["Browse wares", "Poglej blago"], notNow: ["Not now", "Ne zdaj"],
  where: ["Where to, sailor?", "Kam, mornar?"], next: ["Next lesson", "Naslednja lekcija"], sailing: ["Sailing to", "Plujemo proti"],
  skip: ["Skip", "Preskoči"], exit: ["Chart", "Zemljevid"], clickLook: ["Click to look around", "Klikni za razgledovanje"],
  help: ["WASD move · mouse look · Shift run · Space jump · E talk", "WASD hoja · miška gled · Shift tek · preslednica skok · E govori"],
  helpTouch: ["Left stick to walk · drag to look · tap Talk", "Leva palica za hojo · povleci za gled · tapni Govori"],
  jump: ["Jump", "Skok"], loading: ["Loading the harbor…", "Nalagam pristanišče…"], nothing: ["Nothing left to sail to. You finished the voyage!", "Ni več kam pluti. Plovbo si končal!"],
  landHo: ["Land ho!", "Kopno!"],
};
const tr = (k, lang) => UI[k][lang === "sl" ? 1 : 0];

/* ---------------- loading ---------------- */
const glbCache = new Map();
function glb(path) {
  if (!glbCache.has(path)) glbCache.set(path, loader.loadAsync(path));
  return glbCache.get(path);
}
async function townModel(name) { const g = await glb("models/town/" + name + ".glb.wasm"); return g.scene.clone(true); }
async function character(name) {
  // each crew member uses a different file, so the skinned meshes never need cloning
  const g = await glb("models/chars/character-" + name + ".glb.wasm");
  return { scene: g.scene, clips: g.animations };
}

/* ---------------- world layout (meters) ---------------- */
const SHIP_S = 2.6, SHIP_DRAFT = -2.4, CHAR_S = 2.9;
const SHIP_HOME = new THREE.Vector3(75, 0, 0), SHIP_YAW = Math.PI / 2;
const PIER = { x0: 27, x1: 84, z0: -12.2, z1: -6.7, y: 2.2 };
const PLAZA = new THREE.Vector2(19, -4);
const HILL = new THREE.Vector2(-13, 12);
const EYE = 1.62, RADIUS = 0.32, STEP = 1.0, WALK = 4.2, RUN = 7.5, GRAV = 24, JUMP = 7.2;

function islandR(a) { return 38 * (1 + 0.12 * Math.sin(3 * a + 1) + 0.07 * Math.sin(5 * a + 2)); }
const smooth = (e0, e1, x) => { const t = Math.min(Math.max((x - e0) / (e1 - e0), 0), 1); return t * t * (3 - 2 * t); };
function terrainH(x, z) {
  const r = Math.hypot(x, z), a = Math.atan2(z, x), t = r / islandR(a);
  let h = 1.8 + 0.35 * Math.sin(x * 0.21) * Math.sin(z * 0.17);
  const dh = Math.hypot(x - HILL.x, z - HILL.y); h += 6.5 * Math.pow(Math.max(0, 1 - dh / 17), 1.6);
  const dp = Math.hypot(x - PLAZA.x, z - PLAZA.y); h = h + (1.9 - h) * smooth(13, 7, dp); // flat market square
  return h + (-3.2 - h) * smooth(0.78, 1.14, t);
}

/* ---------------- procedural bits ---------------- */
function makeTerrain() {
  const g = new THREE.PlaneGeometry(132, 132, 96, 96); g.rotateX(-Math.PI / 2);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) p.setY(i, terrainH(p.getX(i), p.getZ(i)));
  const ng = g.toNonIndexed(); ng.computeVertexNormals();
  const pp = ng.attributes.position, col = new Float32Array(pp.count * 3), c = new THREE.Color();
  const wet = new THREE.Color("#b38f58"), sand = new THREE.Color("#ead29a"), grass = new THREE.Color("#5ea85a"), grass2 = new THREE.Color("#7dbb5f"), path = new THREE.Color("#c9ad78");
  for (let v = 0; v < pp.count; v += 3) {
    const x = (pp.getX(v) + pp.getX(v + 1) + pp.getX(v + 2)) / 3, z = (pp.getZ(v) + pp.getZ(v + 1) + pp.getZ(v + 2)) / 3, y = (pp.getY(v) + pp.getY(v + 1) + pp.getY(v + 2)) / 3;
    if (y < 0.7) c.copy(wet).lerp(sand, Math.max(0, y + 0.8) / 1.5);
    else if (y < 1.55) c.copy(sand);
    else c.copy(grass).lerp(grass2, (Math.sin(x * 0.7) * Math.sin(z * 0.9) + 1) / 2);
    const dp = Math.hypot(x - PLAZA.x, z - PLAZA.y), onPath = Math.abs(z - PLAZA.y + (x - PLAZA.x) * 0.25) < 2.2 && x > PLAZA.x && x < 32;
    if (y > 1.55 && (dp < 8.5 || onPath)) c.copy(path);
    for (let k = 0; k < 3; k++) col.set([c.r, c.g, c.b], (v + k) * 3);
  }
  ng.setAttribute("color", new THREE.BufferAttribute(col, 3));
  return new THREE.Mesh(ng, new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 0.95 }));
}
const WOOD = new THREE.MeshStandardMaterial({ color: "#9a6a3c", roughness: 0.9, flatShading: true });
const WOOD_D = new THREE.MeshStandardMaterial({ color: "#6e4524", roughness: 0.9, flatShading: true });
function makePier() {
  const grp = new THREE.Group(), w = PIER.z1 - PIER.z0, len = PIER.x1 - PIER.x0;
  const deck = new THREE.Mesh(new THREE.BoxGeometry(len, 0.35, w), WOOD); deck.position.set((PIER.x0 + PIER.x1) / 2, PIER.y - 0.175, (PIER.z0 + PIER.z1) / 2); grp.add(deck);
  // plank seams
  for (let x = PIER.x0 + 1.1; x < PIER.x1; x += 1.1) { const s = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.02, w), WOOD_D); s.position.set(x, PIER.y + 0.005, deck.position.z); grp.add(s); }
  const pile = new THREE.CylinderGeometry(0.28, 0.32, 6, 7);
  for (let x = PIER.x0 + 2; x <= PIER.x1; x += 5) for (const z of [PIER.z0 + 0.3, PIER.z1 - 0.3]) { const m = new THREE.Mesh(pile, WOOD_D); m.position.set(x, PIER.y - 3, z); grp.add(m); }
  // bollards on the ship side
  const boll = new THREE.CylinderGeometry(0.22, 0.28, 0.7, 8);
  for (const x of [62, 80]) { const m = new THREE.Mesh(boll, WOOD_D); m.position.set(x, PIER.y + 0.35, PIER.z1 - 0.5); grp.add(m); }
  return { grp, deck };
}
function makeGangplank() {
  const a = new THREE.Vector3(SHIP_HOME.x - 1.8 * SHIP_S, PIER.y, PIER.z1 - 1.1), b = new THREE.Vector3(SHIP_HOME.x - 1.8 * SHIP_S, SHIP_DRAFT + 2.1 * SHIP_S + 0.02, -2.0 * SHIP_S);
  const len = a.distanceTo(b);
  const m = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.18, len), WOOD);
  m.position.copy(a).lerp(b, 0.5); m.lookAt(b); return m;
}
function makeHat(kind, color) {
  const g = new THREE.Group(), mat = (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.8, flatShading: true });
  if (kind === "tricorn") {
    const m = mat(color || "#1d1d24"), gold = mat("#d9a63e");
    const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.27, 0.035, 3), m); brim.rotation.y = Math.PI; g.add(brim);
    const trim = new THREE.Mesh(new THREE.CylinderGeometry(0.275, 0.275, 0.02, 3), gold); trim.position.y = -0.01; trim.rotation.y = Math.PI; g.add(trim);
    const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 0.14, 8), m); crown.position.y = 0.08; g.add(crown);
    const skull = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 5), mat("#f2efe4")); skull.position.set(0, 0.085, 0.15); g.add(skull);
  } else if (kind === "toque") {
    const w = mat("#f7f5ef");
    const band = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.08, 10), w); g.add(band);
    const puff = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 8), w); puff.scale.set(1, 0.75, 1); puff.position.y = 0.16; g.add(puff);
  } else {
    const b = mat(color || "#c0392b");
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.19, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), b); cap.scale.set(1.02, 0.55, 1.05); g.add(cap);
    const knot = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.14, 5), b); knot.position.set(0, 0.0, -0.2); knot.rotation.x = -2.2; g.add(knot);
  }
  return g;
}
function makePot() {
  const g = new THREE.Group();
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.45, 0.6, 10, 1, true), new THREE.MeshStandardMaterial({ color: "#3a3a40", metalness: 0.4, roughness: 0.5, side: THREE.DoubleSide }));
  pot.position.y = 0.75; g.add(pot);
  const stew = new THREE.Mesh(new THREE.CircleGeometry(0.5, 10), new THREE.MeshStandardMaterial({ color: "#a2552b", roughness: 0.7 })); stew.rotation.x = -Math.PI / 2; stew.position.y = 0.95; g.add(stew);
  const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.6, 0.45, 8), WOOD_D); stand.position.y = 0.22; g.add(stand);
  return g;
}
function makeSteam() {
  const m = new THREE.SpriteMaterial({ map: soft(), color: "#ffffff", transparent: true, opacity: 0.4, depthWrite: false });
  const g = new THREE.Group(); for (let i = 0; i < 5; i++) { const s = new THREE.Sprite(m); s.userData.o = i / 5; g.add(s); } return g;
}

/* ---------------- mount ---------------- */
function mount(host, opts = {}) {
  const lang = opts.lang === "sl" ? "sl" : "en", L = lang === "sl" ? 1 : 0;
  const touch = !!opts.touch;
  const wrap = document.createElement("div"); wrap.className = "w3d" + (touch ? " touch" : ""); host.appendChild(wrap);
  const view = document.createElement("div"); view.className = "w3d-view"; wrap.appendChild(view);
  wrap.insertAdjacentHTML("beforeend", `
    <div class="w3d-cross" aria-hidden="true"></div>
    <div class="w3d-top"><button type="button" class="w3d-btn" data-wexit>← ${tr("exit", lang)}</button><span class="w3d-purse" data-purse></span></div>
    <div class="w3d-help" data-help>${tr(touch ? "helpTouch" : "help", lang)}</div>
    <div class="w3d-prompt" data-prompt hidden></div>
    <div class="w3d-lock" data-lock hidden><button type="button" class="w3d-btn big">${tr("clickLook", lang)}</button></div>
    <div class="w3d-dlg" data-dlg hidden role="dialog" aria-live="polite"><div class="w3d-who"><b data-dname></b><span data-drole></span></div><p data-dtext></p><div class="w3d-opts" data-dopts></div></div>
    <div class="w3d-sail" data-sail hidden><div><span data-stitle></span><i><b data-sbar></b></i></div><button type="button" class="w3d-btn" data-sskip>${tr("skip", lang)} →</button></div>
    <div class="w3d-load" data-load>${tr("loading", lang)}</div>
    ${touch ? `<div class="w3d-stick" data-stick><i></i></div><div class="w3d-tbtns"><button type="button" class="w3d-btn round" data-tjump>${tr("jump", lang)}</button><button type="button" class="w3d-btn round talk" data-ttalk hidden>${tr("talk", lang)}</button></div>` : ""}`);
  const $w = (s) => wrap.querySelector(s);

  const renderer = makeRenderer(view);
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(SKY.horizon, 70, 430);
  const camera = new THREE.PerspectiveCamera(touch ? 70 : 72, 1, 0.08, 1200);
  camera.rotation.order = "YXZ";
  const sky = makeSky(SKY); scene.add(sky);
  const ocean = makeOcean(SKY, 640, 150, [{ x: 0, z: 0, r: 34 }]); scene.add(ocean);
  lights(scene, SKY);
  const gov = makeGovernor(renderer, ocean);

  /* --- state --- */
  const meshColliders = [];      // raycast targets (ship, pier, gangplank, props with real shapes)
  const circles = [];            // {x,z,r} or {obj,r}: cheap round obstacles
  const npcs = [];               // talkable characters
  const mixers = [];
  const clock = new THREE.Clock();
  let disposed = false, raf = 0, ready = false;
  const player = { pos: new THREE.Vector3(48, PIER.y, -9.6), vy: 0, ground: true, yaw: -Math.PI / 2 - 0.12, pitch: -0.04, onShip: false, bob: 0 };
  const keys = {};
  let dialog = null, sailing = null, nearNpc = null, locked = false, moveTouch = { x: 0, y: 0 }, helpTimer = 9;

  /* --- ship --- */
  const shipRoot = new THREE.Group(); shipRoot.position.copy(SHIP_HOME); shipRoot.rotation.y = SHIP_YAW; scene.add(shipRoot);
  const shipPrev = new THREE.Matrix4(), shipNow = new THREE.Matrix4(), tmpM = new THREE.Matrix4();
  const deckY = SHIP_DRAFT + 2.1 * SHIP_S;
  const markShip = (o) => { o.traverse((c) => { if (c.isMesh) c.userData.ship = true; }); return o; };
  let shipModel = null, gangplank = null, serpent = null;

  /* --- island --- */
  const terrain = makeTerrain(); scene.add(terrain);
  const pier = makePier(); scene.add(pier.grp); meshColliders.push(pier.deck);
  gangplank = makeGangplank(); scene.add(gangplank); meshColliders.push(gangplank);

  const clouds = []; { const R = rng(5); for (let i = 0; i < 9; i++) { const c = makeCloud(R); c.position.set((R() - 0.5) * 600, 70 + R() * 50, (R() - 0.5) * 600); c.scale.multiplyScalar(2.2); clouds.push(c); scene.add(c); } }
  const gulls = []; for (let i = 0; i < 4; i++) { const g = makeGull(); g.scale.multiplyScalar(1.4); g.userData.ph = i * 1.7; gulls.push(g); scene.add(g); }
  const steam = makeSteam();

  const statics = [];
  // Bake all static island props into one mesh per texture: far fewer draw calls on weak GPUs.
  function mergeStatics() {
    const groups = new Map();
    scene.updateMatrixWorld(true);
    for (const root of statics) {
      root.traverse((m) => {
        if (!m.isMesh || m.isSkinnedMesh) return;
        const mat = Array.isArray(m.material) ? null : m.material; if (!mat) return;
        const key = (mat.map && mat.map.image && (mat.map.image.currentSrc || mat.map.image.src)) || mat.uuid;
        let g = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone();
        for (const a of Object.keys(g.attributes)) if (!["position", "normal", "uv"].includes(a)) g.deleteAttribute(a);
        if (!g.attributes.normal || !g.attributes.uv) return;
        g.applyMatrix4(m.matrixWorld);
        if (!groups.has(key)) groups.set(key, { mat, geos: [] });
        groups.get(key).geos.push(g);
      });
    }
    for (const root of statics) scene.remove(root);
    for (const { mat, geos } of groups.values()) {
      const merged = mergeGeometries(geos, false); geos.forEach((g) => g.dispose());
      if (merged) scene.add(new THREE.Mesh(merged, mat));
    }
    statics.length = 0;
  }
  async function place(name, x, z, s = 1, rotY = 0, opts2 = {}) {
    const o = opts2.town ? await townModel(name) : await model(name);
    if (disposed) return null;
    o.scale.setScalar(s); o.rotation.y = rotY;
    const y = opts2.y != null ? opts2.y : terrainH(x, z) - 0.05;
    o.position.set(x, y, z);
    (opts2.parent || scene).add(o);
    if (!opts2.parent && !opts2.mesh) statics.push(o);
    if (opts2.r) circles.push(opts2.parent ? { obj: o, r: opts2.r } : { x, z, r: opts2.r });
    if (opts2.mesh) { o.traverse((c) => { if (c.isMesh) { c.material = c.material.clone(); c.material.side = THREE.DoubleSide; meshColliders.push(c); if (opts2.parent === shipRoot) c.userData.ship = true; } }); }
    return o;
  }

  async function addCrew(id, x, y, z, yaw, parent) {
    const def = CREW[id], ch = await character(def.model);
    if (disposed) return;
    const root = new THREE.Group(); root.position.set(x, y, z); root.rotation.y = yaw;
    const m = ch.scene; m.scale.setScalar(CHAR_S); root.add(m);
    let head = null; m.traverse((o) => { if (o.isBone && o.name === "head") head = o; if (o.isMesh) o.frustumCulled = false; });
    if (head && def.hat) { const h = makeHat(def.hat, def.hatColor); h.position.set(0, 0.315, -0.01); h.rotation.x = -0.05; head.add(h); }
    const mixer = new THREE.AnimationMixer(m); mixers.push(mixer);
    const act = (n) => { const c = THREE.AnimationClip.findByName(ch.clips, n); return c ? mixer.clipAction(c) : null; };
    const idle = act("idle"); idle && idle.play(); idle && (idle.time = Math.random() * 2);
    (parent || scene).add(root);
    circles.push(parent ? { obj: root, r: 0.55 } : { x, z, r: 0.55 });
    npcs.push({ id, def, root, head, mixer, act, idle, baseYaw: yaw, tipI: 0, chatI: 0, met: false, talkT: 0 });
  }

  async function build() {
    // ship + deck dressing
    shipModel = paintShip(await model("ship-pirate-large")); if (disposed) return;
    shipModel.scale.setScalar(SHIP_S); shipModel.position.y = SHIP_DRAFT; shipRoot.add(shipModel);
    shipModel.traverse((c) => { if (c.isMesh) { c.userData.ship = true; if (!/sail|flag/.test(c.name)) { c.material = c.material.clone(); c.material.side = THREE.DoubleSide; meshColliders.push(c); } } });
    const S = SHIP_S, onDeck = { parent: shipRoot, y: deckY };
    const jobs = [
      place("barrel", -1.7 * S, -0.3 * S, 0.9, 0, { ...onDeck, r: 0.65 }),
      place("barrel", -1.75 * S, 0.15 * S, 0.9, 1, { ...onDeck, r: 0.65 }),
      place("crate", -1.0 * S, -0.9 * S, 1.0, 0.3, { ...onDeck, r: 0.7 }),
      place("cannon", 1.75 * S, 0.6 * S, 1.1, -Math.PI / 2, { ...onDeck, r: 0.8 }),
      place("cannon", -1.75 * S, -1.6 * S, 1.1, Math.PI / 2, { ...onDeck, r: 0.8 }),
      place("chest", 0.9 * S, -6.0 * S + 1.6, 0.8, Math.PI, { parent: shipRoot, y: SHIP_DRAFT + 3.5 * S, r: 0.6 }),
      place("barrel", 1.6 * S, -2.6 * S, 0.8, 0.4, { ...onDeck, r: 0.6 }),
    ];
    // a grate over the cargo hatch so nobody falls in
    const grate = new THREE.Mesh(new THREE.BoxGeometry(1.15 * S, 0.12, 1.15 * S), WOOD_D); grate.position.set(0, deckY - 0.04, -2.0 * S); shipRoot.add(grate); grate.userData.ship = true; meshColliders.push(grate);
    for (let k = -2; k <= 2; k++) { const bar = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.05, 1.15 * S), WOOD); bar.position.set(k * 0.55, deckY + 0.03, -2.0 * S); shipRoot.add(bar); }
    const pot = makePot(); pot.position.set(-0.95 * S, deckY, -1.85 * S); shipRoot.add(pot); circles.push({ obj: pot, r: 0.7 }); pot.add(steam); steam.position.y = 1.1;
    // island dressing
    const R = rng(21);
    const palmOK = (x, z) => Math.hypot(x - PLAZA.x, z - PLAZA.y) > 12 && !(x > 24 && z < -3 && z > -15) && Math.hypot(x - HILL.x, z - HILL.y) > 5;
    for (let i = 0; i < 26; i++) {
      const a = R() * Math.PI * 2, t = 0.5 + R() * 0.3, rr = islandR(a) * t, x = Math.cos(a) * rr, z = Math.sin(a) * rr;
      if (!palmOK(x, z)) continue;
      jobs.push(place(["palm-bend", "palm-straight", "palm-detailed-bend", "palm-detailed-straight"][i % 4], x, z, 2.0 + R() * 0.7, R() * 6.28, { r: 0.7 }));
    }
    for (let i = 0; i < 12; i++) {
      const a = R() * Math.PI * 2, rr = islandR(a) * (0.86 + R() * 0.12), x = Math.cos(a) * rr, z = Math.sin(a) * rr;
      if (x > 24 && z < -3 && z > -15) continue;
      jobs.push(place(["rocks-a", "rocks-b", "rocks-c", "rocks-sand-a", "rocks-sand-b"][i % 5], x, z, 1.8 + R(), R() * 6.28, { r: 1.6 }));
    }
    jobs.push(place("tower-watch", HILL.x, HILL.y, 2.4, 0.4, { r: 3.4 }));
    jobs.push(place("flag-pirate-high", HILL.x + 5, HILL.y - 3, 1.6, 0, { r: 0.4 }));
    // market square
    const P = PLAZA;
    jobs.push(place("fountain-round", P.x, P.y, 2.6, 0, { town: true, r: 2.7 }));
    jobs.push(place("stall-red", P.x - 2, P.y - 7.5, 4.2, 0, { town: true, r: 2.4 }));
    jobs.push(place("stall-green", P.x - 10, P.y - 1.5, 4.0, Math.PI / 2, { town: true, r: 2.3 }));
    jobs.push(place("stall", P.x + 6, P.y - 7.5, 4.0, -0.3, { town: true, r: 2.3 }));
    jobs.push(place("cart", P.x + 7, P.y + 5, 2.6, 2.2, { town: true, r: 1.8 }));
    jobs.push(place("stall-bench", P.x - 5, P.y + 6, 2.6, 0.4, { town: true, r: 1.2 }));
    jobs.push(place("stall-bench", P.x + 1, P.y + 7.5, 2.6, -0.2, { town: true, r: 1.2 }));
    for (const [dx, dz] of [[-6, -6], [6, -3], [-7, 4], [8, 1], [3, -10.5]]) jobs.push(place("lantern", P.x + dx, P.y + dz, 2.2, 0, { town: true, r: 0.35 }));
    jobs.push(place("banner-red", P.x + 2.2, P.y - 8.5, 2.6, 0, { town: true }));
    jobs.push(place("banner-green", P.x - 6.2, P.y - 8.5, 2.6, 0, { town: true }));
    for (const [dx, dz, n] of [[1.5, -9, "barrel"], [-5.2, -9, "crate"], [-11, 1, "barrel"], [-11, -5, "crate"], [10, -6, "barrel"], [9, -8, "crate"]]) jobs.push(place(n, P.x + dx, P.y + dz, 1.0, R() * 6, { r: 0.75 }));
    jobs.push(place("tree-crooked", P.x - 13, P.y + 8, 2.8, 0.5, { town: true, r: 0.7 }));
    jobs.push(place("tree-crooked", P.x + 12, P.y + 9, 2.5, 2.1, { town: true, r: 0.7 }));
    for (let x = PIER.x0 + 4; x < PIER.x1 - 6; x += 9) jobs.push(place(x % 2 ? "barrel" : "crate", x, PIER.z0 + 0.9, 0.9, R() * 6, { y: PIER.y, r: 0.7 }));
    jobs.push(place("boat-row-small", 45, -16, 2.0, 0.3, { y: -0.25 }));
    await Promise.all(jobs); if (disposed) return;
    try { mergeStatics(); } catch (e) { console.warn("merge", e); }
    // crew
    await Promise.all([
      addCrew("captain", 0.9 * S, SHIP_DRAFT + 3.5 * S, -5.3 * S, -0.5, shipRoot),
      addCrew("ada", 1.35 * S, deckY, -0.55 * S, -1.2, shipRoot),
      addCrew("cook", -1.4 * S, deckY, -2.45 * S, 1.3, shipRoot),
      addCrew("nell", 0, SHIP_DRAFT + 2.8 * S, 3.6 * S, 0, shipRoot),
      addCrew("silas", P.x - 2, terrainH(P.x - 2, P.y - 8.3), P.y - 8.3, 0, null),
      addWalker("female-c", (t) => [P.x + Math.cos(t) * 5.2, P.y + Math.sin(t) * 5.2], 0.16),
      addWalker("male-f", (t) => [PIER.x0 + 14 + Math.sin(t) * 12, (PIER.z0 + PIER.z1) / 2 - 1.2], 0.12, PIER.y),
    ]);
    if (disposed) return;
    ready = true; $w("[data-load]").remove(); onLockChange();
    opts.onReady && opts.onReady();
  }

  const walkers = [];
  async function addWalker(name, path, speed, y) {
    const ch = await character(name); if (disposed) return;
    const root = new THREE.Group(), m = ch.scene; m.scale.setScalar(CHAR_S); root.add(m); scene.add(root);
    m.traverse((o) => { if (o.isMesh) o.frustumCulled = false; });
    const mixer = new THREE.AnimationMixer(m); mixers.push(mixer);
    const c = THREE.AnimationClip.findByName(ch.clips, "walk"); c && mixer.clipAction(c).play();
    const w = { root, path, speed, y, t: Math.random() * 6 }; walkers.push(w); circles.push({ obj: root, r: 0.5 });
  }

  /* --- helpers --- */
  const ray = new THREE.Raycaster(), V = new THREE.Vector3(), V2 = new THREE.Vector3(), N = new THREE.Vector3(), UP = new THREE.Vector3(0, 1, 0), DOWN = new THREE.Vector3(0, -1, 0);
  function groundAt(x, y, z) {
    // highest surface below (y + STEP); returns {h, ship}
    let h = -99, ship = false;
    ray.set(V.set(x, y + STEP, z), DOWN); ray.far = 40;
    const hit = ray.intersectObjects(meshColliders, false)[0];
    if (hit) { h = hit.point.y; ship = !!hit.object.userData.ship; }
    const r = Math.hypot(x, z);
    if (r < 64) { const th = terrainH(x, z); if (th > h && th <= y + STEP) { h = th; ship = false; } }
    return { h, ship };
  }
  function slide(move) {
    // push the horizontal move away from walls hit by short rays
    for (let it = 0; it < 2; it++) {
      const len = Math.hypot(move.x, move.z); if (len < 1e-5) return;
      const dir = V2.set(move.x / len, 0, move.z / len);
      let best = null;
      for (const h of player.ground ? [STEP + 0.08, 1.45] : [0.35, STEP + 0.08, 1.45]) {
        for (const ang of [0, 0.6, -0.6]) {
          const d = dir.clone().applyAxisAngle(UP, ang);
          ray.set(V.set(player.pos.x, player.pos.y + h, player.pos.z), d); ray.far = RADIUS + len + 0.05;
          const hit = ray.intersectObjects(meshColliders, false)[0];
          if (hit && (!best || hit.distance < best.distance)) best = hit;
        }
      }
      if (!best || !best.face) return;
      N.copy(best.face.normal).transformDirection(best.object.matrixWorld); N.y = 0;
      if (N.lengthSq() < 1e-4) return; N.normalize();
      if (N.dot(dir) > 0) N.negate();
      const into = move.x * N.x + move.z * N.z;
      if (into < 0) { move.x -= N.x * into; move.z -= N.z * into; }
      const pen = RADIUS - best.distance * Math.abs(dir.dot(N)); if (pen > 0) { move.x += N.x * pen; move.z += N.z * pen; }
    }
  }
  function pushCircles(p) {
    for (const c of circles) {
      let cx = c.x, cz = c.z;
      if (c.obj) { c.obj.getWorldPosition(V); cx = V.x; cz = V.z; if (Math.abs(V.y - p.y) > 2.5) continue; }
      const dx = p.x - cx, dz = p.z - cz, d = Math.hypot(dx, dz), m = c.r + RADIUS;
      if (d < m && d > 1e-4) { p.x = cx + (dx / d) * m; p.z = cz + (dz / d) * m; }
    }
  }

  /* --- input --- */
  const onKey = (e, down) => {
    if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) return;
    const k = e.code; keys[k] = down;
    if (down && (k === "KeyE" || k === "KeyF" || k === "Enter") && !dialog && nearNpc) { e.preventDefault(); talk(nearNpc); }
    else if (down && dialog && /^Digit[1-4]$/.test(k)) { const b = wrap.querySelectorAll("[data-dopts] button")[+k.slice(5) - 1]; b && b.click(); }
    else if (down && dialog && k === "Escape") closeDialog();
    if (["Space", "ArrowUp", "ArrowDown"].includes(k) && down) e.preventDefault();
  };
  const kd = (e) => onKey(e, true), ku = (e) => onKey(e, false);
  window.addEventListener("keydown", kd); window.addEventListener("keyup", ku);
  const canLock = !touch && "requestPointerLock" in renderer.domElement;
  const look = (dx, dy, s) => { player.yaw -= dx * s; player.pitch = Math.max(-1.35, Math.min(1.35, player.pitch - dy * s)); };
  const onMouse = (e) => { if (locked) look(e.movementX, e.movementY, 0.0022); };
  document.addEventListener("mousemove", onMouse);
  const lockEl = $w("[data-lock]");
  const tryLock = () => { if (!canLock || dialog || sailing && sailing.cut) return; try { const p = renderer.domElement.requestPointerLock(); p && p.catch && p.catch(() => {}); } catch (e) {} };
  const onLockChange = () => { locked = document.pointerLockElement === renderer.domElement; lockEl.hidden = locked || !canLock || !!dialog || !ready; };
  document.addEventListener("pointerlockchange", onLockChange);
  lockEl.addEventListener("click", tryLock); renderer.domElement.addEventListener("click", tryLock);
  // drag-to-look (touch, or mouse when pointer lock is unavailable)
  let dragId = null, dragX = 0, dragY = 0;
  view.addEventListener("pointerdown", (e) => { if (canLock && e.pointerType === "mouse") return; dragId = e.pointerId; dragX = e.clientX; dragY = e.clientY; });
  const onDrag = (e) => { if (e.pointerId !== dragId) return; look(e.clientX - dragX, e.clientY - dragY, touch ? 0.005 : 0.004); dragX = e.clientX; dragY = e.clientY; };
  window.addEventListener("pointermove", onDrag);
  const endDrag = (e) => { if (e.pointerId === dragId) dragId = null; };
  window.addEventListener("pointerup", endDrag); window.addEventListener("pointercancel", endDrag);
  if (touch) {
    const stick = $w("[data-stick]"), knob = stick.firstElementChild; let sid = null, sx = 0, sy = 0;
    stick.addEventListener("pointerdown", (e) => { e.stopPropagation(); sid = e.pointerId; const r = stick.getBoundingClientRect(); sx = r.left + r.width / 2; sy = r.top + r.height / 2; stick.setPointerCapture(sid); });
    stick.addEventListener("pointermove", (e) => { if (e.pointerId !== sid) return; let dx = e.clientX - sx, dy = e.clientY - sy; const d = Math.hypot(dx, dy), m = 46; if (d > m) { dx *= m / d; dy *= m / d; } knob.style.transform = `translate(${dx}px,${dy}px)`; moveTouch.x = dx / m; moveTouch.y = dy / m; });
    const sEnd = (e) => { if (e.pointerId !== sid) return; sid = null; knob.style.transform = ""; moveTouch.x = moveTouch.y = 0; };
    stick.addEventListener("pointerup", sEnd); stick.addEventListener("pointercancel", sEnd);
    $w("[data-tjump]").addEventListener("pointerdown", (e) => { e.stopPropagation(); keys.Space = true; setTimeout(() => (keys.Space = false), 120); });
    $w("[data-ttalk]").addEventListener("click", (e) => { e.stopPropagation(); if (nearNpc && !dialog) talk(nearNpc); });
  }
  $w("[data-wexit]").addEventListener("click", () => opts.onExit && opts.onExit());
  $w("[data-sskip]").addEventListener("click", () => sailing && (sailing.t = Math.max(sailing.t, sailing.dur - 3.2)));
  const purse = $w("[data-purse]");
  const setPurse = () => { purse.textContent = opts.wallet ? "◉ " + opts.wallet() : ""; };
  setPurse();

  /* --- dialogue --- */
  const dlg = $w("[data-dlg]");
  function speak(npc, key) {
    const line = LINES[npc.id][key]; if (!line) return;
    $w("[data-dtext]").textContent = line[L];
    npc.talkT = 0.4;
    const emote = npc.act(/poor|no/.test(key) ? "emote-no" : /buy|equip|greet|sail|arrive/.test(key) ? "emote-yes" : "interact-right");
    if (emote) { emote.reset(); emote.setLoop(THREE.LoopOnce, 1); emote.clampWhenFinished = false; emote.fadeIn(0.15).play(); setTimeout(() => emote.fadeOut(0.3), 1400); }
    window.Sound && Sound.crew && Sound.crew(npc.id, key, lang).then((d) => { npc.talkT = Math.max(npc.talkT, d || 2.2); });
  }
  function options(list) {
    const box = $w("[data-dopts]"); box.innerHTML = "";
    list.forEach(([label, fn, primary], i) => {
      const b = document.createElement("button"); b.type = "button"; b.className = "w3d-btn" + (primary ? " primary" : "");
      b.innerHTML = (touch ? "" : `<kbd>${i + 1}</kbd>`) + label.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
      b.addEventListener("click", (e) => { e.stopPropagation(); fn(); }); box.appendChild(b);
    });
  }
  function talk(npc) {
    if (!ready || sailing) return;
    dialog = { npc }; wrap.classList.add("talking");
    if (document.pointerLockElement) document.exitPointerLock();
    lockEl.hidden = true;
    dlg.hidden = false;
    $w("[data-dname]").textContent = npc.def.name[L]; $w("[data-drole]").textContent = npc.def.role[L];
    let greet = npc.met ? "greet2" : "greet1";
    if (npc.id === "captain" && npc.met && opts.voyageDone && opts.voyageDone() >= 3 && Math.random() < 0.4) greet = "proud1";
    npc.met = true;
    speak(npc, greet);
    mainOptions(npc);
  }
  function mainOptions(npc) {
    const o = [];
    if (npc.id === "captain") o.push([tr("sail", lang), () => sailMenu(npc), true]);
    if (npc.id === "silas") o.push([tr("shop", lang), () => { speak(npc, "browse1"); opts.onShop && opts.onShop(api); }, true]);
    o.push([tr("tips", lang), () => { const k = npc.def.tips[npc.tipI++ % npc.def.tips.length]; speak(npc, k); }]);
    if (npc.def.chat.length) o.push([tr("chat", lang), () => { const k = npc.def.chat[npc.chatI++ % npc.def.chat.length]; speak(npc, k); }]);
    o.push([tr("bye", lang), () => { speak(npc, "bye1"); closeDialog(1100); }]);
    options(o);
  }
  function sailMenu(npc) {
    const dests = (opts.destinations && opts.destinations()) || [];
    if (!dests.length) { $w("[data-dtext]").textContent = tr("nothing", lang); options([[tr("bye", lang), () => closeDialog()]]); return; }
    speak(npc, "orders1");
    $w("[data-dtext]").textContent = tr("where", lang);
    options(dests.slice(0, 4).map((d, i) => [(i === 0 ? "★ " : "") + d.title, () => startSail(d), i === 0]).concat([[tr("notNow", lang), () => mainOptions(npc)]]));
  }
  let closeT = 0;
  function closeDialog(delay) {
    clearTimeout(closeT);
    const fin = () => { if (!dialog) return; dialog = null; dlg.hidden = true; wrap.classList.remove("talking"); onLockChange(); if (!touch) tryLock(); };
    if (delay) { options([]); closeT = setTimeout(fin, delay); } else fin();
  }

  /* --- sailing --- */
  function startSail(dest) {
    const cap = npcs.find((n) => n.id === "captain");
    speak(cap, "sail1");
    closeDialog(900);
    window.Sound && Sound.play("anchor");
    sailing = { dest, t: 0, dur: 34, x: 0, z: 0, heading: 0, said: {} };
    gangplank.visible = false; meshColliders.splice(meshColliders.indexOf(gangplank), 1);
    $w("[data-sail]").hidden = false;
    $w("[data-stitle]").textContent = tr("sailing", lang) + ": " + dest.title;
    // make sure the player is aboard: if not, teleport onto the deck beside the captain
    if (!player.onShip) { const p = new THREE.Vector3(0, deckY + 0.05, -3.5 * SHIP_S).applyMatrix4(shipRoot.matrixWorld); player.pos.copy(p); player.yaw = SHIP_YAW; player.onShip = true; player.vy = 0; }
  }
  function updateSail(dt) {
    const s = sailing; s.t += dt;
    const speed = Math.min(s.t / 6, 1) * 11;
    s.heading = Math.min(s.t / 14, 1) * 0.55 * Math.sin(Math.min(s.t, 20) / 20 * Math.PI / 2);
    shipRoot.rotation.y = SHIP_YAW - s.heading;
    shipRoot.position.x += Math.cos(s.heading) * speed * dt;
    shipRoot.position.z += Math.sin(s.heading) * speed * dt;
    $w("[data-sbar]").style.width = Math.min(100, (s.t / s.dur) * 100) + "%";
    const nell = npcs.find((n) => n.id === "nell"), cap = npcs.find((n) => n.id === "captain");
    if (s.t > 12 && !s.said.serp) { s.said.serp = 1; speak(nell, "banter1"); spawnSerpent(); }
    if (s.t > s.dur - 4 && !s.said.land) { s.said.land = 1; speak(cap, "arrive1"); window.Sound && Sound.play("bell"); }
    if (s.t > s.dur && !s.said.go) { s.said.go = 1; opts.onSail && opts.onSail(s.dest.id); }
  }
  function spawnSerpent() {
    serpent = makeSerpent(); serpent.scale.setScalar(1.6); scene.add(serpent);
    const f = new THREE.Vector3(Math.cos(sailing.heading), 0, Math.sin(sailing.heading));
    const side = new THREE.Vector3(-f.z, 0, f.x);
    serpent.position.copy(shipRoot.position).addScaledVector(f, 40).addScaledVector(side, 26);
    serpent.rotation.y = -sailing.heading + Math.PI; serpent.userData.t0 = clock.elapsedTime;
  }

  /* --- frame --- */
  function resize() { const w = view.clientWidth || 1, h = view.clientHeight || 1; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }
  const ro = new ResizeObserver(resize); ro.observe(view); resize();
  const fwd = new THREE.Vector3(), right = new THREE.Vector3(), move = new THREE.Vector3();
  let promptShown = null;
  function frame() {
    if (disposed) return;
    raf = requestAnimationFrame(frame);
    const fT0 = performance.now();
    const dtReal = Math.min(clock.getDelta(), 0.1), dt = dtReal, t = clock.elapsedTime;
    if (gov.frame(dtReal)) resize();
    ocean.material.uniforms.uT.value = t;

    // ship motion (carry the player along if standing aboard)
    shipRoot.updateMatrixWorld(); shipPrev.copy(shipRoot.matrixWorld);
    const prevYaw = shipRoot.rotation.y;
    if (sailing) updateSail(dt);
    const sp = shipRoot.position;
    sp.y = waveH(sp.x, sp.z, t) * 0.35;
    shipRoot.rotation.z = Math.sin(t * 0.7) * (sailing ? 0.025 : 0.008);
    shipRoot.rotation.x = Math.sin(t * 0.53 + 1) * (sailing ? 0.015 : 0.005);
    shipRoot.updateMatrixWorld(); shipNow.copy(shipRoot.matrixWorld);
    if (player.onShip) { tmpM.copy(shipPrev).invert().premultiply(shipNow); player.pos.applyMatrix4(tmpM); player.yaw += shipRoot.rotation.y - prevYaw; }

    // follow objects
    ocean.position.set(Math.round(camera.position.x / 20) * 20, 0, Math.round(camera.position.z / 20) * 20);
    sky.position.copy(camera.position);

    // movement
    if (ready && !dialog && !player.fly) {
      let mx = (keys.KeyD || keys.ArrowRight ? 1 : 0) - (keys.KeyA || keys.ArrowLeft ? 1 : 0) + moveTouch.x;
      let mz = (keys.KeyW || keys.ArrowUp ? 1 : 0) - (keys.KeyS || keys.ArrowDown ? 1 : 0) - moveTouch.y;
      const ml = Math.hypot(mx, mz); if (ml > 1) { mx /= ml; mz /= ml; }
      const run = keys.ShiftLeft || keys.ShiftRight || Math.hypot(moveTouch.x, moveTouch.y) > 0.92;
      const spd = (run ? RUN : WALK) * dt;
      fwd.set(-Math.sin(player.yaw), 0, -Math.cos(player.yaw)); right.set(-fwd.z, 0, fwd.x);
      move.set(0, 0, 0).addScaledVector(fwd, mz * spd).addScaledVector(right, mx * spd);
      if (ml > 0.05) { helpTimer = Math.min(helpTimer, 4); player.bob += dt * (run ? 13 : 9); }
      slide(move);
      const nx = player.pos.x + move.x, nz = player.pos.z + move.z;
      const g = groundAt(nx, player.pos.y, nz);
      if (g.h < 0.15 && !g.ship) { /* the sea: stay where we are */ }
      else { player.pos.x = nx; player.pos.z = nz; }
      pushCircles(player.pos);
      const g2 = groundAt(player.pos.x, player.pos.y, player.pos.z);
      if (keys.Space && player.ground) { player.vy = JUMP; player.ground = false; }
      player.vy -= GRAV * dt; player.pos.y += player.vy * dt;
      if (player.pos.y <= g2.h) {
        const rise = g2.h - player.pos.y;
        player.pos.y = player.ground && rise > 0.06 ? player.pos.y + Math.min(rise, Math.max(dt * 10, rise * 0.45)) : g2.h;
        player.vy = 0; player.ground = true; player.onShip = g2.ship;
      } else if (player.pos.y - g2.h > 0.25) player.ground = false;
      if (player.pos.y < -6) { player.pos.set(58, PIER.y, -9.4); player.vy = 0; player.onShip = false; }
    }
    camera.position.set(player.pos.x, player.pos.y + EYE + (player.ground ? Math.sin(player.bob) * 0.035 : 0), player.pos.z);
    camera.rotation.set(player.pitch, player.yaw, (shipRoot.rotation.z * 0.6) * (player.onShip ? 1 : 0));

    // npcs
    nearNpc = null; let bestD = 4.0;
    camera.getWorldDirection(V2); V2.y = 0; V2.normalize();
    for (const n of npcs) {
      n.root.getWorldPosition(V);
      const dx = V.x - player.pos.x, dz = V.z - player.pos.z, d = Math.hypot(dx, dz);
      if (d < bestD && Math.abs(V.y - player.pos.y) < 2.2 && (dx * V2.x + dz * V2.z) / d > 0.55) { bestD = d; nearNpc = n; }
      // face the player when close or talking
      const face = (dialog && dialog.npc === n) || d < 4.5;
      const parentYaw = n.root.parent === shipRoot ? shipRoot.rotation.y : 0;
      const want = face ? Math.atan2(-dx, -dz) - parentYaw : n.baseYaw;
      let diff = ((want - n.root.rotation.y + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      n.root.rotation.y += diff * Math.min(1, dt * 5);
      n.talkT = Math.max(0, n.talkT - dt);
      if (n.head) { const lv = n.talkT > 0 ? (window.Sound && Sound.voiceLevel ? Sound.voiceLevel() : 0.3) : 0; n.head.rotation.x = -Math.abs(Math.sin(t * 13)) * 0.12 * Math.min(1, lv * 3 + (n.talkT > 0 ? 0.25 : 0)); }
    }
    for (const w of walkers) {
      w.t += dt * w.speed; const [x, z] = w.path(w.t), [x2, z2] = w.path(w.t + 0.02);
      w.root.position.set(x, w.y != null ? w.y : terrainH(x, z), z); w.root.rotation.y = Math.atan2(x2 - x, z2 - z);
    }
    for (const m of mixers) m.update(dt);
    if (!dialog && !sailing && ready) {
      const s = nearNpc ? `<kbd>${touch ? "▶" : "E"}</kbd> ${tr("talk", lang)} · <b>${nearNpc.def.name[L]}</b>` : null;
      if (s !== promptShown) { promptShown = s; const pe = $w("[data-prompt]"); pe.hidden = !s; if (s) pe.innerHTML = s; const tt = $w("[data-ttalk]"); if (tt) tt.hidden = !s; }
    } else if (promptShown) { promptShown = null; $w("[data-prompt]").hidden = true; const tt = $w("[data-ttalk]"); if (tt) tt.hidden = true; }
    if (helpTimer > 0) { helpTimer -= dt; if (helpTimer <= 0) $w("[data-help]").classList.add("gone"); }

    // ambience
    steam.children.forEach((s, i) => { const k = (t * 0.35 + s.userData.o) % 1; s.position.set(Math.sin(t + i) * 0.15, k * 1.6, Math.cos(t * 0.7 + i) * 0.15); s.scale.setScalar(0.4 + k * 0.9); s.material.opacity = 0.35 * (1 - k); });
    gulls.forEach((g, i) => { const a = t * 0.18 + g.userData.ph; g.position.set(30 + Math.cos(a) * (40 + i * 6), 26 + i * 3 + Math.sin(t + i), Math.sin(a) * (34 + i * 5)); g.rotation.y = -a; const fl = Math.sin(t * 6 + i) * 0.5; g.userData.wl && (g.userData.wl.rotation.z = fl); g.userData.wr && (g.userData.wr.rotation.z = -fl); });
    clouds.forEach((c) => { c.position.x += dt * 1.2; if (c.position.x > 320) c.position.x = -320; });
    if (serpent) {
      const st = t - serpent.userData.t0;
      serpent.userData.humps.forEach((h, i) => { h.position.y = -0.6 + Math.sin(st * 2.2 - i * 0.9) * 0.7 + Math.min(st, 2) * 0.5 - Math.max(0, st - 9) * 0.6; });
      serpent.userData.head.position.y = 1.6 + Math.sin(st * 2.2) * 0.4 + Math.min(st, 2) * 0.5 - Math.max(0, st - 9) * 0.6;
      serpent.translateX(-dt * 6);
      if (st > 13) { scene.remove(serpent); serpent = null; }
    }
    const fT1 = performance.now();
    renderer.render(scene, camera);
    stats.js = fT1 - fT0; stats.render = performance.now() - fT1; stats.frames++;
  }
  const stats = { js: 0, render: 0, frames: 0 };

  const api = {
    silas(key) { const n = npcs.find((x) => x.id === "silas"); n && speak(n, key); setPurse(); },
    refreshPurse: setPurse,
    shopClosed() { if (dialog && dialog.npc.id === "silas") mainOptions(dialog.npc); setPurse(); },
    repaint() { if (shipModel) paintShip(shipModel); },
    dispose() {
      disposed = true; cancelAnimationFrame(raf); ro.disconnect(); clearTimeout(closeT);
      window.removeEventListener("keydown", kd); window.removeEventListener("keyup", ku);
      document.removeEventListener("mousemove", onMouse); document.removeEventListener("pointerlockchange", onLockChange);
      window.removeEventListener("pointermove", onDrag); window.removeEventListener("pointerup", endDrag); window.removeEventListener("pointercancel", endDrag);
      if (document.pointerLockElement) document.exitPointerLock();
      window.Sound && Sound.stopCrew && Sound.stopCrew();
      scene.traverse((o) => { if (o.geometry && !o.isSkinnedMesh) o.geometry.dispose(); });
      renderer.dispose(); renderer.forceContextLoss(); wrap.remove();
    },
    get debug() { return { stats, player, npcs, shipRoot, scene, camera, keys, get nearNpc() { return nearNpc; }, talk, startSail, get sailing() { return sailing; }, get ready() { return ready; } }; },
  };
  build().catch((e) => { console.warn(e); opts.onFail && opts.onFail(e); });
  frame();
  return api;
}

window.World3D = { ok: webglOK(), mount };
window.dispatchEvent(new Event("world3d-ready"));
