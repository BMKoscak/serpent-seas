/* Serpent Seas — explorable harbor and ship (first person).
   three.js + Kenney Pirate Kit, Mini Characters and Fantasy Town Kit (all CC0).
   Exposes window.World3D.mount(host, opts). */
import { mergeGeometries } from "./lib/BufferGeometryUtils.js";
import { THREE, loader, model, waveH, makeSky, makeOcean, SKY, makeRenderer, makeGovernor, lights, rng, soft, makeCloud, makeGull, makeSerpent, paintShip, webglOK } from "./sea3d.js?v=6";

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
  barkeep: { model: "barkeep", noVoice: true, name: ["Barnaby the Barkeep", "Krčmar Barnabi"], role: ["Tavern keeper · hears every rumour", "Krčmar · sliši vse govorice"],
    tips: ["tip1", "tip2", "tip3", "tip4", "tip5", "tip6", "tip7", "tip8"], chat: ["banter1", "banter2"] },
  silas: { model: "male-e", name: ["Old Silas", "Stari Silas"], role: ["Trader · spend your doubloons", "Trgovec · zapravi dublone"], hat: "tricorn", hatColor: "#5a3b22",
    tips: ["tip1"], chat: [] },
};
LINES.barkeep = {
  greet1: ["Welcome to the Rusty Anchor! Sit anywhere that isn't sticky.", "Dobrodošel v Zarjavelem sidru! Sedi kamorkoli, kjer ni lepljivo."],
  greet2: ["Back for more gossip? I've got plenty, and it's all mostly true.", "Spet po čenče? Imam jih na kupe, in večinoma so resnične."],
  tip1: ["Smugglers hid their loot in a cave on the south-west shore. The crystals in there glow, so you won't need a lantern.", "Tihotapci so skrili plen v jamo na jugozahodni obali. Kristali v njej svetijo, zato svetilke ne boš rabil."],
  tip2: ["Old Gus swears there's a chest behind the waterfall. Nobody's checked. Everyone's scared of getting wet.", "Stari Gus prisega, da je za slapom skrinja. Nihče ni preveril. Vsi se bojijo, da se zmočijo."],
  tip3: ["The lighthouse keeper left something up top. Climb up and enjoy the view while you're at it.", "Svetilničar je nekaj pustil na vrhu. Splezaj gor in uživaj v razgledu."],
  tip4: ["Bottles keep washing up on the beaches. Each one holds a Python riddle. Solve it and the sea pays you back.", "Na plaže naplavlja steklenice. V vsaki je uganka v Pythonu. Reši jo in morje ti povrne."],
  tip5: ["Captain Marlow keeps more than biscuits in the cargo hold. Take the hatch on the main deck down and look around.", "Kapitan Marlow v skladišču ne hrani samo prepečenca. Spusti se skozi loputo na glavni palubi in poglej naokrog."],
  tip6: ["Want easy doubloons? Fish off the end of the pier, or fire the ship's cannon at the floating barrels.", "Bi rad lahke dublone? Lovi ribe na koncu pomola ali streljaj s topom na plavajoče sode."],
  tip7: ["I hid my own savings somewhere in this tavern. No, I won't tell you where. Stop looking at the barrels.", "Svoje prihranke sem skril nekje v tej krčmi. Ne, ne povem kje. Nehaj gledati sode."],
  tip8: ["There's a chest in the jungle by the pool, tucked under the big leaves. Mind the frogs.", "V džungli ob tolmunu je skrinja, skrita pod velikimi listi. Pazi na žabe."],
  banter1: ["Salty tried to sell me his stew once. The pot ate the spoon.", "Salty mi je enkrat poskušal prodati enolončnico. Lonec je pojedel žlico."],
  banter2: ["That parrot of yours owes me three crackers and an apology.", "Tvoja papiga mi dolguje tri krekerje in opravičilo."],
  bye1: ["Fair winds! Come back thirsty.", "Dober veter! Vrni se žejen."],
};
const RIDDLES = [
  { code: 'print(3 * "ho")', opts: ["hohoho", "9", "ho3"], a: 0 },
  { code: 'loot = [1, 2, 3]\nprint(loot[-1])', opts: ["1", "3", "an error"], a: 1 },
  { code: 'print(len("treasure"))', opts: ["7", "9", "8"], a: 2 },
  { code: 'for i in range(3):\n    print(i, end="")', opts: ["012", "123", "0123"], a: 0 },
  { code: 'chest = {"gold": 5}\nprint(chest.get("silver", 0))', opts: ["None", "0", "KeyError"], a: 1 },
];
const UI = {
  talk: ["Talk", "Govori"], tips: ["Any tips?", "Kakšen nasvet?"], chat: ["What's new?", "Kaj je novega?"], bye: ["Bye", "Adijo"],
  sail: ["Set sail", "Odpluj"], shop: ["Browse wares", "Poglej blago"], notNow: ["Not now", "Ne zdaj"],
  where: ["Where to, sailor?", "Kam, mornar?"], next: ["Next lesson", "Naslednja lekcija"], sailing: ["Sailing to", "Plujemo proti"],
  skip: ["Skip", "Preskoči"], exit: ["Chart", "Zemljevid"], clickLook: ["Click to look around", "Klikni za razgledovanje"],
  help: ["WASD move · mouse look · Shift run · Space jump · E talk", "WASD hoja · miška gled · Shift tek · preslednica skok · E govori"],
  helpTouch: ["Left stick to walk · drag to look · tap Talk", "Leva palica za hojo · povleci za gled · tapni Govori"],
  jump: ["Jump", "Skok"], loading: ["Loading the harbor…", "Nalagam pristanišče…"], nothing: ["Nothing left to sail to. You finished the voyage!", "Ni več kam pluti. Plovbo si končal!"],
  landHo: ["Land ho!", "Kopno!"],
  openChest: ["Open the chest", "Odpri skrinjo"], readBottle: ["Read the message", "Preberi sporočilo"], climbUp: ["Climb the lighthouse", "Splezaj na svetilnik"],
  climbDown: ["Climb down", "Spleži dol"], fish: ["Go fishing", "Pojdi ribarit"], cannon: ["Man the cannon", "Primi top"],
  chests: ["Chests", "Skrinje"], bottles: ["Bottles", "Steklenice"], bottleH: ["Message in a bottle", "Sporočilo v steklenici"], bottleR: ["A riddle from the sea", "Uganka iz morja"],
  bottleQ: ["What does this print?", "Kaj to izpiše?"], right: ["Correct! The sea pays its debts.", "Pravilno! Morje vrača dolgove."], wrongA: ["Not quite. Read it again, slowly.", "Ne čisto. Preberi še enkrat, počasi."],
  found: ["Treasure!", "Zaklad!"], waitBite: ["Waiting for a bite…", "Čakam, da prime…"], bite: ["A bite! Reel in now!", "Prijelo je! Potegni zdaj!"],
  gotAway: ["It got away…", "Pobegnila je…"], caught: ["You caught", "Ujel si"], reel: ["Reel in", "Potegni"], stop: ["Stop", "Nehaj"],
  fire: ["Fire!", "Ogenj!"], leave: ["Leave", "Odidi"], hits: ["Hits today", "Zadetki danes"], noCoins: ["(no more doubloons today, just for fun)", "(danes ni več dublonov, samo za zabavo)"],
  fishNames: [["a sardine", "a mackerel", "a red snapper", "a GOLDEN FISH"], ["sardelo", "skušo", "rdečega hlastača", "ZLATO RIBO"]],
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
  // each character uses its own file, so the skinned meshes never need cloning
  const g = await glb("models/custom/char-" + name + ".glb.wasm");
  return { scene: g.scene, clips: g.animations };
}

/* ---------------- world layout (meters) ---------------- */
const SHIP_S = 2.6, SHIP_DRAFT = -2.4, CHAR_S = 1.0;
const SHIP_HOME = new THREE.Vector3(75, 0, 0), SHIP_YAW = Math.PI / 2;
const PIER = { x0: 27, x1: 84, z0: -12.2, z1: -6.7, y: 2.2 };
const PLAZA = new THREE.Vector2(19, -4);
const HILL = new THREE.Vector2(-13, 12);
const POOL = new THREE.Vector2(-19.5, 4), POOL_Y = 1.15, CLIFF = new THREE.Vector2(-26.5, 4), CAVE = new THREE.Vector2(-21, -21);
const EYE = 1.62, RADIUS = 0.32, STEP = 1.0, WALK = 4.2, RUN = 7.5, GRAV = 24, JUMP = 7.2;

function islandR(a) { return 38 * (1 + 0.12 * Math.sin(3 * a + 1) + 0.07 * Math.sin(5 * a + 2)); }
const smooth = (e0, e1, x) => { const t = Math.min(Math.max((x - e0) / (e1 - e0), 0), 1); return t * t * (3 - 2 * t); };
function terrainH(x, z) {
  const r = Math.hypot(x, z), a = Math.atan2(z, x), t = r / islandR(a);
  let h = 1.8 + 0.35 * Math.sin(x * 0.21) * Math.sin(z * 0.17);
  const dh = Math.hypot(x - HILL.x, z - HILL.y); h += 6.5 * Math.pow(Math.max(0, 1 - dh / 17), 1.6);
  const dp = Math.hypot(x - PLAZA.x, z - PLAZA.y); h = h + (1.9 - h) * smooth(21, 14, dp); // flat market square and village
  const dpo = Math.hypot(x - POOL.x, z - POOL.y); h -= 1.5 * smooth(4.6, 1.0, dpo);
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
  { const fill = new THREE.DirectionalLight("#bcd6ff", 0.75); fill.position.set(60, 40, 70); scene.add(fill); }
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
        const sig = Object.keys(m.geometry.attributes).filter((k) => ["position", "normal", "uv", "color"].includes(k)).sort().join(",");
        const key = ((mat.map && mat.map.image && (mat.map.image.currentSrc || mat.map.image.src)) || (mat.name + "|" + mat.side + "|" + mat.emissive.getHexString() + "|" + mat.metalness.toFixed(2) + "|" + mat.roughness.toFixed(2) + "|" + mat.vertexColors)) + "|" + sig;
        let g = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone();
        for (const a of Object.keys(g.attributes)) if (!["position", "normal", "uv", "color"].includes(a)) g.deleteAttribute(a);
        if (!g.attributes.normal) return;
        if (g.attributes.color && g.attributes.color.itemSize === 4) { const c = g.attributes.color, a3 = new Float32Array(c.count * 3); for (let i = 0; i < c.count; i++) { a3[i * 3] = c.getX(i); a3[i * 3 + 1] = c.getY(i); a3[i * 3 + 2] = c.getZ(i); } g.setAttribute("color", new THREE.BufferAttribute(a3, 3)); }
        if (g.attributes.color && g.attributes.color.normalized) { const c = g.attributes.color, a3 = new Float32Array(c.count * 3); for (let i = 0; i < c.count; i++) { a3[i * 3] = c.getX(i); a3[i * 3 + 1] = c.getY(i); a3[i * 3 + 2] = c.getZ(i); } g.setAttribute("color", new THREE.BufferAttribute(a3, 3)); }
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
    stylize(o);
    if (!opts2.parent && !opts2.mesh && !opts2.keep) statics.push(o);
    if (opts2.r) circles.push(opts2.parent ? { obj: o, r: opts2.r } : { x, z, r: opts2.r });
    if (opts2.mesh) { o.traverse((c) => { if (c.isMesh) { c.material = c.material.clone(); c.material.side = THREE.DoubleSide; meshColliders.push(c); if (opts2.parent === shipRoot) c.userData.ship = true; } }); }
    return o;
  }

  async function addCrew(id, x, y, z, yaw, parent) {
    const def = CREW[id], ch = await character(id);
    if (disposed) return;
    const root = new THREE.Group(); root.position.set(x, y, z); root.rotation.y = yaw;
    const m = ch.scene; m.scale.setScalar(CHAR_S); root.add(m); stylize(m);
    let head = null, jaw = null; m.traverse((o) => { if (o.isBone && o.name === "head") head = o; if (o.isBone && o.name === "jaw") jaw = o; if (o.isMesh) o.frustumCulled = false; });
    // the jaw opens around the character's sideways axis, expressed in the jaw bone's own frame
    let jawAxis = null;
    if (jaw) { m.updateMatrixWorld(true); const qm = m.getWorldQuaternion(new THREE.Quaternion()), qj = jaw.getWorldQuaternion(new THREE.Quaternion()); jawAxis = new THREE.Vector3(1, 0, 0).applyQuaternion(qm.invert().multiply(qj).invert()).normalize(); }
    const mixer = new THREE.AnimationMixer(m); mixers.push(mixer);
    const act = (n) => { const c = THREE.AnimationClip.findByName(ch.clips, n); return c ? mixer.clipAction(c) : null; };
    const idle = act("idle"); idle && idle.play(); idle && (idle.time = Math.random() * 2);
    (parent || scene).add(root);
    circles.push(parent ? { obj: root, r: 0.55 } : { x, z, r: 0.55 });
    npcs.push({ id, def, root, head, jaw, jawAxis, jawAmt: 0, mixer, act, idle, baseYaw: yaw, tipI: 0, chatI: 0, met: false, talkT: 0 });
  }


  /* ================= adventure: interactables, treasure, mini-games ================= */
  const inter = [];   // { pos: () => Vector3, r, label: () => string, act: () => void, ok?: () => bool }
  let nearInter = null, mode = null;   // mode: { kind: "fish" | "cannon", ... }
  const WS = Object.assign({ found: [], bottles: [], fish: {}, hits: {} }, (opts.getState && opts.getState()) || {});
  const saveWS = () => { opts.saveState && opts.saveState(WS); hud(); };
  const today = () => new Date().toISOString().slice(0, 10);
  const award = (n, why) => { opts.award && opts.award(n, why); setPurse(); };
  const mini = document.createElement("div"); mini.className = "w3d-mini"; mini.hidden = true; wrap.appendChild(mini);
  const hudEl = document.createElement("span"); hudEl.className = "w3d-hunt"; $w(".w3d-top").insertBefore(hudEl, $w("[data-purse]"));
  function hud() { hudEl.textContent = `${tr("chests", lang)} ${WS.found.length}/${CHESTS.length} · ${tr("bottles", lang)} ${WS.bottles.length}/${RIDDLES.length}`; }
  const STYL = new WeakSet();
  function stylize(root) {
    root.traverse((o) => {
      if (!o.isMesh) return;
      for (const m of Array.isArray(o.material) ? o.material : [o.material]) {
        if (!m || STYL.has(m) || !m.isMeshStandardMaterial) continue;
        STYL.add(m);
        m.onBeforeCompile = (sh) => {
          sh.fragmentShader = sh.fragmentShader.replace("#include <opaque_fragment>", `{
            vec3 vd = normalize(vViewPosition);
            float rim = pow(1.0 - clamp(dot(normal, vd), 0.0, 1.0), 2.6);
            outgoingLight += vec3(1.0, 0.85, 0.6) * rim * 0.2;
            float lum = dot(outgoingLight, vec3(0.299, 0.587, 0.114));
            outgoingLight = mix(vec3(lum), outgoingLight, 1.14);
          }
          #include <opaque_fragment>`);
        };
        m.customProgramCacheKey = () => "ss-rim";
        m.needsUpdate = true;
      }
    });
    return root;
  }
  // ---- treasure chests ----
  const CHESTS = [];   // filled in build(): { id, x, y, z, rot, coins, obj, parent }
  async function addChest(id, x, y, z, rot, coins, parent) {
    const c = { id, x, y, z, rot, coins, parent, obj: null };
    CHESTS.push(c);
    const opened = WS.found.includes(id);
    c.obj = await place("custom/" + (opened ? "chest-open" : "chest"), x, z, 1.0, rot, { y, parent: parent || undefined, keep: true });
    if (c.obj) c.obj.userData.chest = c;
    if (!opened) inter.push({ pos: () => c.obj.getWorldPosition(new THREE.Vector3()), r: 2.4, label: () => tr("openChest", lang), ok: () => !WS.found.includes(id), act: () => openChest(c) });
  }
  async function openChest(c) {
    if (WS.found.includes(c.id)) return;
    WS.found.push(c.id); saveWS();
    window.Sound && Sound.play("chest");
    const par = c.obj.parent; par.remove(c.obj);
    c.obj = await place("custom/chest-open", c.x, c.z, 1.0, c.rot, { y: c.y, parent: c.parent || undefined, keep: true });
    sparkle(c.obj.getWorldPosition(new THREE.Vector3()).add(new THREE.Vector3(0, 0.7, 0)), "#ffd36b", 26);
    award(c.coins, tr("found", lang));
  }
  // ---- message bottles ----
  const bottles = [];
  async function addBottle(i, x, z) {
    if (WS.bottles.includes(i)) return;
    const y = Math.max(terrainH(x, z), -0.1) + 0.12;
    const o = await place("custom/bottle", x, z, 1.4, i * 1.3, { y, keep: true });
    if (!o) return;
    const b = { i, o, base: y }; bottles.push(b);
    inter.push({ pos: () => o.position, r: 2.2, label: () => tr("readBottle", lang), ok: () => !WS.bottles.includes(i), act: () => readBottle(b) });
  }
  function readBottle(b) {
    const r = RIDDLES[b.i];
    dialog = { npc: null }; wrap.classList.add("talking");
    if (document.pointerLockElement) document.exitPointerLock();
    lockEl.hidden = true; dlg.hidden = false;
    $w("[data-dname]").textContent = tr("bottleH", lang); $w("[data-drole]").textContent = tr("bottleR", lang);
    const esc2 = (t) => t.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
    $w("[data-dtext]").innerHTML = `${tr("bottleQ", lang)}<pre class="w3d-code">${esc2(r.code)}</pre>`;
    window.Sound && Sound.play("page");
    options(r.opts.map((o, k) => [o, () => {
      if (k === r.a) {
        WS.bottles.push(b.i); saveWS(); b.o.parent && b.o.parent.remove(b.o);
        $w("[data-dtext]").textContent = tr("right", lang); window.Sound && Sound.play("success");
        award(25, tr("bottleH", lang)); options([[tr("bye", lang), () => closeDialog()]]);
      } else { window.Sound && Sound.play("fail"); $w("[data-dtext]").innerHTML = `${tr("wrongA", lang)}<pre class="w3d-code">${esc2(r.code)}</pre>`; }
    }]).concat([[tr("notNow", lang), () => closeDialog()]]));
  }
  // ---- particles ----
  const sparks = [];
  const sparkMat = new THREE.SpriteMaterial({ map: soft(), color: "#ffffff", transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  function sparkle(at, color, n = 20, spread = 2.5, up = 3, life = 1.1, size = 0.25) {
    for (let i = 0; i < n; i++) {
      const s = new THREE.Sprite(sparkMat.clone()); s.material.color.set(color);
      s.position.copy(at); s.scale.setScalar(size);
      s.userData = { v: new THREE.Vector3((Math.random() - 0.5) * spread, Math.random() * up + 0.5, (Math.random() - 0.5) * spread), t: 0, life: life * (0.6 + Math.random() * 0.6) };
      scene.add(s); sparks.push(s);
    }
  }
  function splash(at, n = 26) { sparkle(at, "#d9f4ff", n, 3.2, 5.5, 0.9, 0.35); }
  // ---- waterfall and pool ----
  const fxMats = [];
  function makeWaterfall() {
    const poolY = terrainH(POOL.x, POOL.y) + 0.5;
    const pool = new THREE.Mesh(new THREE.CircleGeometry(4.4, 40), new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, uniforms: { uT: { value: 0 } },
      vertexShader: `varying vec2 vP; void main(){ vP = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `varying vec2 vP; uniform float uT;
        void main(){ float r = length(vP - vec2(-1.6, 0.0)); float ring = 0.5 + 0.5 * sin(r * 5.0 - uT * 3.0);
          vec3 c = mix(vec3(0.12, 0.5, 0.55), vec3(0.45, 0.85, 0.85), 0.3 + 0.25 * ring * smoothstep(4.0, 0.0, r));
          c = mix(c, vec3(0.95), smoothstep(1.6, 0.2, r) * (0.5 + 0.5 * sin(uT * 7.0 + r * 9.0)) * 0.7);
          gl_FragColor = vec4(c, 0.82); }`,
    }));
    pool.rotation.x = -Math.PI / 2; pool.position.set(POOL.x, poolY, POOL.y); scene.add(pool); fxMats.push(pool.material);
    const topY = terrainH(CLIFF.x, CLIFF.y) + 9.6, H = topY - poolY;
    const sheet = new THREE.Mesh(new THREE.PlaneGeometry(2.8, H, 1, 1), new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, side: THREE.DoubleSide, uniforms: { uT: { value: 0 } },
      vertexShader: `varying vec2 vU; void main(){ vU = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `varying vec2 vU; uniform float uT;
        float h(float x){ return fract(sin(x * 91.7) * 4375.5); }
        void main(){ float col = floor(vU.x * 18.0); float sp = 1.4 + h(col) * 1.2;
          float s = fract(vU.y * 5.0 + uT * sp + h(col + 3.0)); float streak = smoothstep(0.0, 0.25, s) * smoothstep(0.9, 0.5, s);
          vec3 c = mix(vec3(0.42, 0.78, 0.9), vec3(0.95, 0.98, 1.0), streak * 0.75 + smoothstep(0.12, 0.0, vU.y) * 0.8);
          float edge = smoothstep(0.0, 0.12, vU.x) * smoothstep(1.0, 0.88, vU.x);
          gl_FragColor = vec4(c, (0.55 + 0.35 * streak) * edge); }`,
    }));
    sheet.rotation.y = Math.PI / 2; sheet.position.set(CLIFF.x + 4.2, poolY + H / 2, CLIFF.y); scene.add(sheet); fxMats.push(sheet.material);
    const mist = new THREE.Group(); mist.position.set(CLIFF.x + 4.6, poolY + 0.2, CLIFF.y); scene.add(mist);
    const mm = new THREE.SpriteMaterial({ map: soft(), color: "#ffffff", transparent: true, opacity: 0.35, depthWrite: false });
    for (let i = 0; i < 10; i++) { const sp = new THREE.Sprite(mm.clone()); sp.userData.o = i / 10; mist.add(sp); }
    waterfallMist = mist;
  }
  let waterfallMist = null;
  // ---- lighthouse ----
  function lighthouseStuff(base) {
    const rot = 0.6, top = base + 12.27;
    const door = new THREE.Vector3(HILL.x + Math.sin(rot) * 2.2, base, HILL.y + Math.cos(rot) * 2.2);
    inter.push({ pos: () => door, r: 2.4, label: () => tr("climbUp", lang), act: () => { fade(() => { player.pos.set(HILL.x + Math.sin(rot) * 1.38, top + 0.05, HILL.y + Math.cos(rot) * 1.38); player.vy = 0; player.yaw = rot + Math.PI; player.onShip = false; }); } });
    const topP = new THREE.Vector3(HILL.x, top, HILL.y);
    inter.push({ pos: () => topP, r: 2.6, label: () => tr("climbDown", lang), act: () => { fade(() => { player.pos.copy(door).add(new THREE.Vector3(Math.sin(rot) * 1.2, 0.1, Math.cos(rot) * 1.2)); player.vy = 0; player.yaw = rot; }); } });
    // invisible guard rail around the gallery
    const rail = new THREE.Mesh(new THREE.CylinderGeometry(1.74, 1.74, 1.3, 20, 1, true), new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide }));
    rail.position.set(HILL.x, top + 0.65, HILL.y); scene.add(rail); meshColliders.push(rail);
  }
  const fadeEl = document.createElement("div"); fadeEl.className = "w3d-fade"; wrap.appendChild(fadeEl);
  function fade(fn) { fadeEl.classList.add("on"); setTimeout(() => { fn(); setTimeout(() => fadeEl.classList.remove("on"), 120); }, 260); }
  // ---- fishing ----
  let fishGear = null;
  function startFishing(spot) {
    if (mode) return;
    if (document.pointerLockElement) document.exitPointerLock();
    player.pos.set(spot.x, PIER.y, spot.z); player.yaw = 0; player.pitch = -0.3;
    const bob = new THREE.Group();
    const b1 = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), new THREE.MeshStandardMaterial({ color: "#d63a2a" }));
    const b2 = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: "#f4f1ea" }));
    bob.add(b1, b2); scene.add(bob);
    const lineG = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
    const line = new THREE.Line(lineG, new THREE.LineBasicMaterial({ color: "#f2ecdc" })); scene.add(line);
    fishGear = { bob, line };
    mode = { kind: "fish", phase: "wait", t: 0, biteAt: 2.5 + Math.random() * 4, bx: spot.x + (Math.random() - 0.5) * 3, bz: spot.z - 7 - Math.random() * 3 };
    window.Sound && Sound.play("whoosh"); setTimeout(() => window.Sound && Sound.play("splash"), 400);
    miniUI(tr("waitBite", lang), [[tr("reel", lang), reel], [tr("stop", lang), stopMode]]);
  }
  function reel() {
    if (!mode || mode.kind !== "fish") return;
    if (mode.phase === "bite") {
      const r = Math.random(), k = r < 0.05 ? 3 : r < 0.25 ? 2 : r < 0.6 ? 1 : 0, val = [2, 3, 5, 12][k];
      const day = today(); if (WS.fish.day !== day) WS.fish = { day, n: 0 };
      const paid = WS.fish.n < 12; if (paid) { WS.fish.n++; saveWS(); award(val, tr("caught", lang)); }
      splash(fishGear.bob.position.clone(), 18); window.Sound && Sound.play(k === 3 ? "chest" : "coin");
      miniUI(`${tr("caught", lang)} ${tr("fishNames", lang)[k]}!${paid ? ` +${val}` : " " + tr("noCoins", lang)}`, [[tr("reel", lang), reel], [tr("stop", lang), stopMode]]);
    } else if (mode.phase === "wait") {
      miniUI(tr("gotAway", lang), [[tr("reel", lang), reel], [tr("stop", lang), stopMode]]);
    }
    mode.phase = "wait"; mode.t = 0; mode.biteAt = 2.5 + Math.random() * 4.5;
  }
  // ---- cannon range ----
  const targets = [], balls = [];
  async function spawnTarget(tg) {
    const o = tg || await place("custom/target", 0, 0, 1.3, 0, { y: 0, keep: true });
    if (!o) return;
    o.position.set(48 + Math.random() * 55, 0, 24 + Math.random() * 40); o.rotation.y = Math.random() * 6;
    o.userData.sink = 0; o.visible = true;
    if (!tg) targets.push(o);
  }
  function startCannon(cn) {
    if (mode || sailing) return;
    mode = { kind: "cannon", cn, yaw: Math.PI, pitch: 0.12, cool: 0 };
    if (document.pointerLockElement) document.exitPointerLock();
    const day = today(); if (WS.hits.day !== day) WS.hits = { day, n: 0 };
    miniUI(`${tr("hits", lang)}: ${WS.hits.n}/10`, [[tr("fire", lang), fireCannon], [tr("leave", lang), stopMode]]);
    if (!touch) setTimeout(tryLock, 50);
  }
  function fireCannon() {
    if (!mode || mode.kind !== "cannon" || mode.cool > 0) return;
    mode.cool = 1.1;
    const dir = new THREE.Vector3(); camera.getWorldDirection(dir);
    const from = camera.position.clone().addScaledVector(dir, 1.6).add(new THREE.Vector3(0, -0.4, 0));
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), new THREE.MeshStandardMaterial({ color: "#222226", roughness: 0.4, metalness: 0.5 }));
    ball.position.copy(from); ball.userData.v = dir.multiplyScalar(42).add(new THREE.Vector3(0, 4, 0)); scene.add(ball); balls.push(ball);
    sparkle(from.clone(), "#ffb34a", 14, 2, 1.5, 0.35, 0.5); sparkle(from.clone(), "#cfc8b8", 10, 1.5, 1.2, 1.4, 0.9);
    window.Sound && Sound.cannonBoom ? Sound.cannonBoom() : window.Sound && Sound.play("cannon");
  }
  function stopMode() {
    if (!mode) return;
    if (mode.kind === "fish" && fishGear) { scene.remove(fishGear.bob); scene.remove(fishGear.line); fishGear = null; }
    if (mode.kind === "cannon") { player.pitch = 0; }
    mode = null; mini.hidden = true; wrap.classList.remove("in-mode");
    if (!touch) tryLock();
  }
  function miniUI(text, btns) {
    mini.hidden = false; wrap.classList.add("in-mode");
    mini.innerHTML = `<p></p><div class="w3d-opts"></div>`; mini.querySelector("p").textContent = text;
    const box = mini.querySelector(".w3d-opts");
    btns.forEach(([label, fn], i) => { const b = document.createElement("button"); b.type = "button"; b.className = "w3d-btn" + (i === 0 ? " primary" : ""); b.innerHTML = (touch ? "" : `<kbd>${i === 0 ? "E" : "Esc"}</kbd>`) + label; b.addEventListener("click", (e) => { e.stopPropagation(); fn(); }); box.appendChild(b); });
  }
  function updateModes(dt, t) {
    // particles
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i], u = s.userData; u.t += dt;
      if (u.t > u.life) { scene.remove(s); s.material.dispose(); sparks.splice(i, 1); continue; }
      u.v.y -= 6 * dt; s.position.addScaledVector(u.v, dt); s.material.opacity = 1 - u.t / u.life;
    }
    // bottles bob
    for (const b of bottles) if (b.o.parent) { b.o.position.y = b.base + Math.sin(t * 1.6 + b.i) * 0.06; b.o.rotation.y += dt * 0.3; }
    // cannon balls & targets
    for (const o of targets) {
      if (o.userData.sink > 0) { o.userData.sink += dt; o.position.y -= dt * 2.2; if (o.userData.sink > 2.4) spawnTarget(o); }
      else { o.position.y = waveH(o.position.x, o.position.z, t) - 0.15; o.rotation.z = Math.sin(t + o.position.x) * 0.06; }
    }
    for (let i = balls.length - 1; i >= 0; i--) {
      const b = balls[i]; b.userData.v.y -= 9.8 * dt; b.position.addScaledVector(b.userData.v, dt);
      let hit = null;
      for (const o of targets) if (o.userData.sink === 0 && o.position.distanceTo(b.position) < 2.3) hit = o;
      if (hit || b.position.y < waveH(b.position.x, b.position.z, t) - 0.2) {
        splash(b.position.clone().setY(0.3), hit ? 40 : 20);
        window.Sound && Sound.play("splash");
        if (hit) {
          hit.userData.sink = 0.001; sparkle(hit.position.clone().add(new THREE.Vector3(0, 1.4, 0)), "#ffb34a", 30, 4, 4, 0.8, 0.45);
          const day = today(); if (WS.hits.day !== day) WS.hits = { day, n: 0 };
          if (WS.hits.n < 10) { WS.hits.n++; saveWS(); award(4, "Cannon"); }
          if (mode && mode.kind === "cannon") mini.querySelector("p").textContent = `${tr("hits", lang)}: ${WS.hits.n}/10${WS.hits.n >= 10 ? " " + tr("noCoins", lang) : ""}`;
        }
        scene.remove(b); balls.splice(i, 1);
      }
    }
    if (!mode) return;
    if (mode.kind === "fish") {
      mode.t += dt;
      const g = fishGear; const y0 = waveH(mode.bx, mode.bz, t);
      let dip = 0;
      if (mode.phase === "wait" && mode.t > mode.biteAt) { mode.phase = "bite"; mode.t = 0; miniUI(tr("bite", lang), [[tr("reel", lang), reel], [tr("stop", lang), stopMode]]); window.Sound && Sound.play("splash"); }
      if (mode.phase === "bite") { dip = 0.25 + Math.sin(t * 30) * 0.08; if (mode.t > 1.0) { mode.phase = "wait"; mode.t = 0; mode.biteAt = 2 + Math.random() * 4; miniUI(tr("gotAway", lang), [[tr("reel", lang), reel], [tr("stop", lang), stopMode]]); } }
      g.bob.position.set(mode.bx, y0 - dip + 0.05, mode.bz);
      const tip = camera.position.clone().add(new THREE.Vector3(0.35, -0.25, -0.9).applyEuler(camera.rotation));
      const pts = g.line.geometry.attributes.position; pts.setXYZ(0, tip.x, tip.y, tip.z); pts.setXYZ(1, g.bob.position.x, g.bob.position.y + 0.1, g.bob.position.z); pts.needsUpdate = true;
      if (keys.KeyW || keys.KeyA || keys.KeyS || keys.KeyD || Math.hypot(moveTouch.x, moveTouch.y) > 0.5) stopMode();
    } else if (mode.kind === "cannon") {
      mode.cool = Math.max(0, mode.cool - dt);
      const p = mode.cn.getWorldPosition(new THREE.Vector3());
      mode.yaw = Math.max(Math.PI - 0.75, Math.min(Math.PI + 0.75, mode.yaw));
      mode.pitch = Math.max(-0.12, Math.min(0.45, mode.pitch));
      camera.position.set(p.x, p.y + 1.55, p.z - 0.9);
      camera.rotation.set(mode.pitch, mode.yaw, 0);
    }
  }

  async function build() {
    // ship (custom galleon, same deck layout as before)
    shipModel = paintShip(await model("custom/ship-galleon")); if (disposed) return;
    shipModel.scale.setScalar(SHIP_S); shipModel.position.y = SHIP_DRAFT; shipRoot.add(shipModel);
    shipModel.traverse((c) => { if (c.isMesh) { c.userData.ship = true; if (!/sail|flag|jolly|rig/.test(c.name)) { c.material = c.material.clone(); c.material.side = THREE.DoubleSide; meshColliders.push(c); } } });
    const S = SHIP_S, onDeck = { parent: shipRoot, y: deckY };
    const C = (n) => "custom/" + n;
    const jobs = [
      place(C("barrel"), -1.7 * S, -0.1 * S, 0.9, 0, { ...onDeck, r: 0.5 }),
      place(C("crate"), -1.15 * S, 0.75 * S, 1.0, 0.3, { ...onDeck, r: 0.7 }),
      place(C("chest"), -0.9 * S, -6.0 * S + 1.4, 1.0, Math.PI * 0.9, { parent: shipRoot, y: SHIP_DRAFT + 3.5 * S, r: 0.6 }),
      place(C("crate-stack"), 1.25 * S, 3.0 * S, 0.8, 0.5, { parent: shipRoot, y: SHIP_DRAFT + 2.8 * S, r: 1.0 }),
    ];
    const pot = new THREE.Group(); pot.position.set(-0.95 * S, deckY, -1.85 * S); shipRoot.add(pot); circles.push({ obj: pot, r: 0.75 }); pot.add(steam); steam.position.y = 1.15;
    jobs.push(place(C("cauldron"), 0, 0, 1.0, 0, { parent: pot, y: 0 }));
    // the port cannon you can fire (ship-local x = -1.95, z = -0.55 in model units)
    const cannonAt = new THREE.Object3D(); cannonAt.position.set(-1.95 * S + 0.6, deckY, -0.55 * S); shipRoot.add(cannonAt);
    inter.push({ pos: () => cannonAt.getWorldPosition(new THREE.Vector3()), r: 2.6, label: () => tr("cannon", lang), ok: () => !sailing, act: () => startCannon(cannonAt) });
    // island nature
    const R = rng(21), P = PLAZA;
    const free = (x, z, m = 0) => Math.hypot(x - P.x, z - P.y) > 19 + m && !(x > 22 && z < -1 && z > -17) && Math.hypot(x - HILL.x, z - HILL.y) > 5 + m;
    const ring = (n, t0, t1, fn) => { for (let i = 0; i < n; i++) { const a = R() * Math.PI * 2, rr = islandR(a) * (t0 + R() * (t1 - t0)), x = Math.cos(a) * rr, z = Math.sin(a) * rr; fn(x, z, i); } };
    ring(30, 0.45, 0.82, (x, z, i) => { if (free(x, z)) jobs.push(place(C(["palm-a", "palm-b", "palm-c"][i % 3]), x, z, 2.1 + R() * 0.7, R() * 6.28, { r: 0.6 })); });
    ring(14, 0.86, 0.98, (x, z, i) => { if (!(x > 22 && z < -1 && z > -17)) jobs.push(place(C(["rock-a", "rock-b", "rock-c", "rock-d"][i % 4]), x, z, 1.6 + R() * 1.2, R() * 6.28, { r: 1.7, y: terrainH(x, z) - 0.35 })); });
    ring(20, 0.3, 0.8, (x, z, i) => { if (free(x, z, -4)) jobs.push(place(C(["bush-a", "bush-b", "bush-c"][i % 3]), x, z, 1.2 + R() * 0.6, R() * 6.28, { r: 0.9 })); });
    ring(26, 0.2, 0.85, (x, z, i) => { if (free(x, z, -6)) jobs.push(place(C(["flowers-a", "flowers-b", "fern-a"][i % 3]), x, z, 1.4 + R() * 0.6, R() * 6.28, {})); });
    ring(5, 0.9, 0.97, (x, z) => jobs.push(place(C("driftwood"), x, z, 1.5, R() * 6.28, { y: terrainH(x, z) + 0.05 })));
    const lhBase = terrainH(HILL.x, HILL.y) - 0.4;
    jobs.push(place(C("lighthouse"), HILL.x, HILL.y, 1.0, 0.6, { y: lhBase, mesh: true }));
    lighthouseStuff(lhBase);
    // ---- jungle trail, waterfall cliff, pool and the smugglers' cave ----
    const trail = [[12, -1], [4, 1.5], [-4, 3.5], [-12, 4]];
    const nearTrail = (x, z) => trail.some(([tx, tz], i) => { if (i === 0) return false; const [ax, az] = trail[i - 1]; const vx = tx - ax, vz = tz - az, L2 = vx * vx + vz * vz; let u = ((x - ax) * vx + (z - az) * vz) / L2; u = Math.max(0, Math.min(1, u)); return Math.hypot(x - (ax + vx * u), z - (az + vz * u)) < 2.4; });
    for (let i = 0; i < 70; i++) {
      const k = Math.floor(R() * (trail.length - 1)), u = R(), [ax, az] = trail[k], [bx, bz] = trail[k + 1];
      const side = R() < 0.5 ? -1 : 1, off = 2.8 + R() * 6.5, len = Math.hypot(bx - ax, bz - az);
      const x = ax + (bx - ax) * u + (-(bz - az) / len) * off * side, z = az + (bz - az) * u + ((bx - ax) / len) * off * side;
      if (nearTrail(x, z) || Math.hypot(x - POOL.x, z - POOL.y) < 4.8 || Math.hypot(x - P.x, z - P.y) < 15) continue;
      const pick = R();
      jobs.push(place(C(pick < 0.38 ? "jungle-a" : pick < 0.6 ? "jungle-b" : pick < 0.82 ? "grass-tall" : "palm-b"), x, z, pick < 0.82 ? 1.3 + R() * 0.8 : 2.2, R() * 6.28, { r: pick < 0.6 && pick >= 0.38 ? 0.4 : 0 }));
    }
    jobs.push(place(C("cliff"), CLIFF.x, CLIFF.y, 1.35, Math.PI / 2, { y: terrainH(CLIFF.x, CLIFF.y) - 0.6, mesh: true }));
    makeWaterfall();
    jobs.push(place(C("cave"), CAVE.x, CAVE.y, 1.0, 1.0, { y: terrainH(CAVE.x, CAVE.y) - 0.3, mesh: true }));
    const caveIn = (lx, lz) => { const a = 1.0; return [CAVE.x + lx * Math.cos(a) + lz * Math.sin(a), CAVE.y - lx * Math.sin(a) + lz * Math.cos(a)]; };
    for (const [lx, lz, n, sc] of [[-2.2, -1.5, "barrel", 1], [-2.6, -0.6, "barrel", 1], [2.4, -1.2, "crate-stack", 0.8], [1.8, 1.5, "crate", 1]]) { const [x, z] = caveIn(lx, lz); jobs.push(place(C(n), x, z, sc, R() * 6, { r: 0.6 })); }
    // fishing spot at the end of the pier
    const fishSpot = { x: PIER.x1 - 2.5, z: PIER.z0 + 0.7 };
    jobs.push(place(C("fishing-spot"), fishSpot.x + 1.2, fishSpot.z + 0.6, 1.0, 0, { y: PIER.y, r: 0.4 }));
    inter.push({ pos: () => new THREE.Vector3(fishSpot.x, PIER.y, fishSpot.z), r: 2.4, label: () => tr("fish", lang), act: () => startFishing(fishSpot) });
    // market square and village
    jobs.push(place(C("well"), P.x, P.y, 1.0, 0.3, { r: 1.3 }));
    jobs.push(place(C("stall-silas"), P.x - 2, P.y - 7.6, 1.0, 0, { r: 2.2 }));
    jobs.push(place(C("stall-fish"), P.x + 5, P.y - 7.6, 1.0, 0, { r: 2.2 }));
    jobs.push(place(C("stall-fruit"), P.x - 9.5, P.y - 1.5, 1.0, Math.PI / 2, { r: 2.2 }));
    const building = (n, x, z, rot, w, d) => { jobs.push(place(C(n), x, z, 1.0, rot, { y: terrainH(x, z) - 0.1 })); rectCircles(x, z, w, d, rot); };
    jobs.push(place(C("tavern"), P.x + 6, P.y + 12.5, 1.0, Math.PI, { y: terrainH(P.x + 6, P.y + 12.5) - 0.1, mesh: true }));
    building("house-a", P.x - 5.5, P.y + 12.5, Math.PI + 0.08, 6.0, 4.6);
    building("house-b", P.x - 15.5, P.y + 3.5, Math.PI / 2, 5.0, 4.4);
    building("house-c", P.x + 15.5, P.y + 6.5, -Math.PI / 2 - 0.1, 5.4, 4.6);
    for (const [dx, dz] of [[-5, -3.5], [7.5, -2.5], [-6.5, 6.5], [9.5, 5.5]]) jobs.push(place(C("lamp-post"), P.x + dx, P.y + dz, 1.0, R() * 6, { r: 0.3 }));
    for (let x = PIER.x0 + 6; x < PIER.x1; x += 12) jobs.push(place(C("lamp-post"), x, PIER.z0 + 0.35, 1.0, Math.PI / 2, { y: PIER.y, r: 0.3 }));
    jobs.push(place(C("bench"), P.x + 1, P.y + 6, 1.0, Math.PI, { r: 0.9 }));
    jobs.push(place(C("bench"), P.x - 4, P.y + 5.5, 1.0, Math.PI + 0.3, { r: 0.9 }));
    jobs.push(place(C("cart"), P.x + 10.5, P.y + 0.5, 1.0, -1.2, { r: 1.5 }));
    jobs.push(place(C("crate-stack"), P.x + 10, P.y - 9.5, 1.0, 0.4, { r: 1.4 }));
    jobs.push(place(C("signpost"), P.x + 8.5, P.y - 4.2, 1.0, 0.2, { r: 0.3 }));
    jobs.push(place(C("net-rack"), 30, -17.5, 1.0, 0.25, { r: 0.4 }));
    jobs.push(place(C("anchor-deco"), 25, 1.5, 1.4, 0.6, { r: 0.8 }));
    jobs.push(place(C("rowboat"), 45, -16.5, 1.5, 0.3, { y: -0.2 }));
    jobs.push(place(C("rowboat"), 34, 8.5, 1.4, 2.4, { y: terrainH(34, 8.5) }));
    for (const [dx, dz, n] of [[1.8, -9.6, "barrel"], [-5.6, -9.2, "crate"], [-12, 2.5, "barrel"], [-12, -5.2, "crate"], [11.5, -6.5, "barrel"], [8.5, 9.5, "barrel"], [9.3, 9.0, "barrel"]]) jobs.push(place(C(n), P.x + dx, P.y + dz, 1.0, R() * 6, { r: 0.6 }));
    for (let x = PIER.x0 + 4; x < PIER.x1 - 6; x += 9) jobs.push(place(C(x % 2 ? "barrel" : "crate"), x, PIER.z0 + 1.1, 0.9, R() * 6, { y: PIER.y, r: 0.6 }));
    jobs.push(place("flag-pirate-high", HILL.x + 5, HILL.y - 3, 1.6, 0, { r: 0.4 }));
    await Promise.all(jobs); if (disposed) return;
    try { mergeStatics(); } catch (e) { console.warn("merge", e); }
    // treasure hunt
    const cv = caveIn(0.3, -2.9), wf = [CLIFF.x + 3.1, POOL.y + 0.9];
    const tav = (lx, lz) => [P.x + 6 - lx, P.y + 12.5 - lz];
    const [tvx, tvz] = tav(3.0, 2.3);
    await Promise.all([
      addChest("cave", cv[0], terrainH(cv[0], cv[1]) - 0.05, cv[1], 1.0 + Math.PI, 60),
      addChest("lighthouse", HILL.x - Math.sin(0.6) * 1.35, lhBase + 12.27, HILL.y - Math.cos(0.6) * 1.35, 0.6, 40),
      addChest("waterfall", wf[0], terrainH(wf[0], wf[1]) - 0.05, wf[1], -Math.PI / 2, 50),
      addChest("tavern", tvx, terrainH(P.x + 6, P.y + 12.5) - 0.1 + 0.54, tvz, Math.PI + 0.4, 40),
      addChest("hold", 0.9 * S, SHIP_DRAFT + 0.7 * S, 0.2 * S, -0.4, 40, shipRoot),
      addChest("jungle", POOL.x + 5.5, terrainH(POOL.x + 5.5, POOL.y - 4.5) - 0.05, POOL.y - 4.5, 0.7, 40),
    ]);
    jobs.length = 0;
    const bspots = [[-0.4, 0.94], [0.9, 0.93], [2.3, 0.93], [3.4, 0.94], [-2.2, 0.93]];
    await Promise.all(bspots.map(([a, t], i) => { const r = islandR(a) * t; return addBottle(i, Math.cos(a) * r, Math.sin(a) * r); }));
    for (let i = 0; i < 3; i++) await spawnTarget();
    hud();
    // crew
    await Promise.all([
      addCrew("captain", 0.9 * S, SHIP_DRAFT + 3.5 * S, -5.3 * S, -0.5, shipRoot),
      addCrew("ada", 1.35 * S, deckY, -0.55 * S, -1.2, shipRoot),
      addCrew("cook", -1.4 * S, deckY, -2.45 * S, 1.3, shipRoot),
      addCrew("nell", 0, SHIP_DRAFT + 2.8 * S, 3.4 * S, 0, shipRoot),
      addCrew("barkeep", P.x + 6 + 0.6, terrainH(P.x + 6, P.y + 12.5) - 0.1 + 0.54, P.y + 12.5 + 2.65, Math.PI, null),
      addCrew("silas", P.x - 2, terrainH(P.x - 2, P.y - 8.35), P.y - 8.35, 0, null),
      addWalker("villager", (t) => [P.x + Math.cos(t) * 5.4, P.y + Math.sin(t) * 5.4], 0.15),
      addWalker("fisher", (t) => [PIER.x0 + 14 + Math.sin(t) * 12, (PIER.z0 + PIER.z1) / 2 - 0.9], 0.12, PIER.y),
    ]);
    if (disposed) return;
    ready = true; $w("[data-load]").remove(); onLockChange();
    opts.onReady && opts.onReady();
  }
  function rectCircles(x, z, w, d, rot) {
    // approximate a rectangle footprint with a row of circles along its long side
    const long = Math.max(w, d), short = Math.min(w, d), r = short / 2 + 0.1;
    const alongX = (w >= d) !== (Math.abs(Math.sin(rot)) > 0.7);
    const n = Math.max(1, Math.ceil((long - short) / (r * 0.9)) + 1);
    for (let i = 0; i < n; i++) {
      const o = n === 1 ? 0 : -((long - short) / 2) + (long - short) * i / (n - 1);
      circles.push({ x: x + (alongX ? o : 0), z: z + (alongX ? 0 : o), r });
    }
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
  const V2q = new THREE.Quaternion();
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
    if (down && mode && (k === "KeyE" || k === "Space" || k === "Enter")) { e.preventDefault(); mode.kind === "fish" ? reel() : fireCannon(); return; }
    if (down && mode && k === "Escape") { stopMode(); return; }
    if (down && (k === "KeyE" || k === "KeyF" || k === "Enter") && !dialog && (nearNpc || nearInter)) { e.preventDefault(); nearNpc ? talk(nearNpc) : nearInter.act(); }
    else if (down && dialog && /^Digit[1-4]$/.test(k)) { const b = wrap.querySelectorAll("[data-dopts] button")[+k.slice(5) - 1]; b && b.click(); }
    else if (down && dialog && k === "Escape") closeDialog();
    if (["Space", "ArrowUp", "ArrowDown"].includes(k) && down) e.preventDefault();
  };
  const kd = (e) => onKey(e, true), ku = (e) => onKey(e, false);
  window.addEventListener("keydown", kd); window.addEventListener("keyup", ku);
  const canLock = !touch && "requestPointerLock" in renderer.domElement;
  const look = (dx, dy, s) => { if (mode && mode.kind === "cannon") { mode.yaw -= dx * s; mode.pitch -= dy * s; return; } player.yaw -= dx * s; player.pitch = Math.max(-1.35, Math.min(1.35, player.pitch - dy * s)); };
  const onDown = (e) => { if (mode && mode.kind === "cannon" && locked && e.button === 0) fireCannon(); };
  document.addEventListener("mousedown", onDown);
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
    $w("[data-ttalk]").addEventListener("click", (e) => { e.stopPropagation(); if (dialog || mode) return; if (nearNpc) talk(nearNpc); else if (nearInter) nearInter.act(); });
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
    if (npc.def.noVoice) npc.talkT = Math.min(5, 0.6 + line[L].length * 0.045);
    else window.Sound && Sound.crew && Sound.crew(npc.id, key, lang).then((d) => { npc.talkT = Math.max(npc.talkT, d || 2.2); });
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
    const fin = () => { if (!dialog) return; dialog = null; dlg.hidden = true; wrap.classList.remove("talking"); $w("[data-dtext]").textContent = ""; onLockChange(); if (!touch) tryLock(); };
    if (delay) { options([]); closeT = setTimeout(fin, delay); } else fin();
  }

  /* --- sailing --- */
  function startSail(dest) {
    stopMode();
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
    for (const m of fxMats) m.uniforms.uT.value = t;
    if (waterfallMist) waterfallMist.children.forEach((s, i) => { const k = (t * 0.5 + s.userData.o) % 1; s.position.set(Math.sin(i * 2.1) * 1.4 * k, k * 2.2, Math.cos(i * 1.3) * 1.6 * k); s.scale.setScalar(1 + k * 2.5); s.material.opacity = 0.4 * (1 - k); });

    // ship motion (carry the player along if standing aboard)
    shipRoot.updateMatrixWorld(); shipPrev.copy(shipRoot.matrixWorld);
    const prevYaw = shipRoot.rotation.y;
    if (sailing) updateSail(dt);
    const sp = shipRoot.position;
    sp.y = waveH(sp.x, sp.z, t) * 0.35;
    shipRoot.rotation.z = Math.sin(t * 0.7) * (sailing ? 0.025 : 0.008);
    shipRoot.rotation.x = Math.sin(t * 0.53 + 1) * (sailing ? 0.015 : 0.005);
    shipRoot.updateMatrixWorld(); shipNow.copy(shipRoot.matrixWorld);
    { const u = ocean.material.uniforms; u.uShipOn.value = 1; const yaw = shipRoot.rotation.y; u.uShip.value.set(shipRoot.position.x, shipRoot.position.z, Math.cos(yaw), Math.sin(yaw)); }
    if (player.onShip) { tmpM.copy(shipPrev).invert().premultiply(shipNow); player.pos.applyMatrix4(tmpM); player.yaw += shipRoot.rotation.y - prevYaw; }

    // follow objects
    ocean.position.set(Math.round(camera.position.x / 20) * 20, 0, Math.round(camera.position.z / 20) * 20);
    sky.position.copy(camera.position);

    // movement
    if (ready && !dialog && !player.fly && !mode) {
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
      const lv = n.talkT > 0 ? (window.Sound && Sound.voiceLevel ? Sound.voiceLevel() : 0.3) : 0;
      const want2 = n.talkT > 0 ? Math.min(0.42, lv * 1.6 + 0.05 + Math.abs(Math.sin(t * 11)) * 0.12 * (lv > 0.02 ? 1 : 0.4)) : 0;
      n.jawAmt += (want2 - n.jawAmt) * Math.min(1, dt * 18);
    }
    for (const w of walkers) {
      w.t += dt * w.speed; const [x, z] = w.path(w.t), [x2, z2] = w.path(w.t + 0.02);
      w.root.position.set(x, w.y != null ? w.y : terrainH(x, z), z); w.root.rotation.y = Math.atan2(x2 - x, z2 - z);
    }
    for (const m of mixers) m.update(dt);
    for (const n of npcs) if (n.jaw && n.jawAmt > 0.002) n.jaw.quaternion.multiply(V2q.setFromAxisAngle(n.jawAxis, n.jawAmt));
    nearInter = null;
    if (!nearNpc && !mode && ready) {
      let bd = 1e9;
      for (const it of inter) {
        if (it.ok && !it.ok()) continue;
        const p = it.pos(); const dx = p.x - player.pos.x, dz = p.z - player.pos.z, d = Math.hypot(dx, dz);
        if (d < it.r && Math.abs(p.y - player.pos.y) < 2.5 && d < bd && (d < 1.2 || (dx * V2.x + dz * V2.z) / d > 0.2)) { bd = d; nearInter = it; }
      }
    }
    updateModes(dt, t);
    if (!dialog && !sailing && ready && !mode) {
      const s = nearNpc ? `<kbd>${touch ? "▶" : "E"}</kbd> ${tr("talk", lang)} · <b>${nearNpc.def.name[L]}</b>` : nearInter ? `<kbd>${touch ? "▶" : "E"}</kbd> ${nearInter.label()}` : null;
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
      document.removeEventListener("mousemove", onMouse); document.removeEventListener("mousedown", onDown); document.removeEventListener("pointerlockchange", onLockChange);
      window.removeEventListener("pointermove", onDrag); window.removeEventListener("pointerup", endDrag); window.removeEventListener("pointercancel", endDrag);
      if (document.pointerLockElement) document.exitPointerLock();
      window.Sound && Sound.stopCrew && Sound.stopCrew();
      scene.traverse((o) => { if (o.geometry && !o.isSkinnedMesh) o.geometry.dispose(); });
      renderer.dispose(); renderer.forceContextLoss(); wrap.remove();
    },
    get debug() { return { inter, WS, CHESTS, get mode() { return mode; }, get nearInter() { return nearInter; }, reel, fireCannon, stopMode, stats, player, npcs, shipRoot, scene, camera, keys, get nearNpc() { return nearNpc; }, talk, startSail, get sailing() { return sailing; }, get ready() { return ready; } }; },
  };
  build().catch((e) => { console.warn(e); opts.onFail && opts.onFail(e); });
  frame();
  return api;
}

window.World3D = { ok: webglOK(), mount };
window.dispatchEvent(new Event("world3d-ready"));
