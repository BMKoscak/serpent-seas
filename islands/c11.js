/* Island 11 — Blueprint Bay: classes, __init__, self, attributes, methods, objects together, __str__/__repr__, class attributes */
(function () {
  const R = String.raw;
  const SHIP = `class Ship:\n    def __init__(self, name, guns):\n        self.name = name\n        self.guns = guns\n`;
  (window.SS_ISLANDS = window.SS_ISLANDS || {}).c11 = {
    blurb: {
      en: "The shipwrights here draw one blueprint and build a hundred ships from it. Welcome to object-oriented programming: classes, objects, attributes and methods.",
      sl: "Ladjedelci tu narišejo en načrt in po njem zgradijo sto ladij. Dobrodošel v objektnem programiranju: razredi, objekti, atributi in metode.",
    },
    log: {
      en: `A **class** is a blueprint. An **object** (instance) is one thing built from it.
:::
class Ship:
    fleet_size = 0                  # class attribute: shared by all

    def __init__(self, name, guns): # runs when you create a Ship
        self.name = name            # instance attributes: one per object
        self.guns = guns
        self.gold = 0
        Ship.fleet_size += 1

    def plunder(self, amount):      # a method
        self.gold += amount

    def __str__(self):              # for print() and str()
        return f"{self.name} ({self.guns} guns)"

    def __repr__(self):             # for lists and debugging
        return f"Ship({self.name!r}, {self.guns})"

serpent = Ship("Serpent", 12)       # create an object
serpent.plunder(50)                 # call a method
print(serpent.gold, serpent)
:::
- ~self~ is the object the method is working on. Every method's first parameter is ~self~.
- Forgetting ~self.~ makes a local variable that disappears.
- Never use a mutable class attribute (like a list) for per-object data. Create it in ~__init__~.`,
      sl: `**Razred** je načrt. **Objekt** (instanca) je ena stvar, zgrajena po njem.
:::
class Ship:
    fleet_size = 0                  # atribut razreda: skupen vsem

    def __init__(self, name, guns): # izvede se ob ustvarjanju ladje
        self.name = name            # atributi instance: po eden na objekt
        self.guns = guns
        self.gold = 0
        Ship.fleet_size += 1

    def plunder(self, amount):      # metoda
        self.gold += amount

    def __str__(self):              # za print() in str()
        return f"{self.name} ({self.guns} guns)"

    def __repr__(self):             # za sezname in razhroščevanje
        return f"Ship({self.name!r}, {self.guns})"

serpent = Ship("Serpent", 12)       # ustvari objekt
serpent.plunder(50)                 # pokliči metodo
print(serpent.gold, serpent)
:::
- ~self~ je objekt, na katerem metoda dela. Prvi parameter vsake metode je ~self~.
- Če pozabiš ~self.~, ustvariš lokalno spremenljivko, ki izgine.
- Za podatke posameznega objekta nikoli ne uporabi spremenljivega atributa razreda (npr. seznama). Ustvari ga v ~__init__~.`,
    },
    lessons: [
      {
        id: "c11l1",
        title: { en: "Blueprints", sl: "Načrti" },
        steps: [
          {
            id: "s1", type: "story", speaker: "captain",
            text: {
              en: `**Blueprint Bay**. Smell that? Fresh-cut oak and tar. Every ship in these waters was born in these yards.

The master shipwright never draws the same ship twice. She draws **one blueprint** for a sloop: every sloop has a name, sails, guns, and can raise anchor. Then she builds as many as she likes, each with its own name and its own guns.

That's a **class** and its **objects**. Every tool you've learned so far has been leading here. This is how big programs are organised.`,
              sl: `**Zaliv načrtov**. Vohaš? Sveže tesan hrast in katran. Vsaka ladja v teh vodah se je rodila v teh ladjedelnicah.

Mojstrica ladjedelka nikoli ne nariše iste ladje dvakrat. Nariše **en načrt** za šalupo: vsaka šalupa ima ime, jadra, topove in zna dvigniti sidro. Nato jih zgradi, kolikor želi, vsako s svojim imenom in svojimi topovi.

To sta **razred** in njegovi **objekti**. Vsako orodje, ki si se ga naučil, je vodilo sem. Tako so organizirani veliki programi.`,
            },
          },
          {
            id: "s2", type: "learn",
            text: {
              en: `A **class** bundles data and the code that works on it:
:::
class Ship:
    def __init__(self, name, guns):
        self.name = name
        self.guns = guns
:::
- ~class Ship:~ starts the blueprint. Class names use ~CapitalWords~.
- ~__init__~ (two underscores each side) runs automatically every time you build a new Ship.
- ~self~ is the new object being built. ~self.name = name~ stores the value **on that object**. These are called **attributes**.

Build an object by calling the class like a function: ~serpent = Ship("Serpent", 12)~. Read its attributes with a dot: ~serpent.guns~.`,
              sl: `**Razred** združi podatke in kodo, ki z njimi dela:
:::
class Ship:
    def __init__(self, name, guns):
        self.name = name
        self.guns = guns
:::
- ~class Ship:~ začne načrt. Imena razredov pišemo kot ~VelikeBesede~.
- ~__init__~ (dva podčrtaja na vsaki strani) se izvede samodejno vsakič, ko zgradiš novo ladjo.
- ~self~ je nov objekt, ki se gradi. ~self.name = name~ shrani vrednost **na ta objekt**. Temu pravimo **atributi**.

Objekt zgradiš tako, da razred pokličeš kot funkcijo: ~serpent = Ship("Serpent", 12)~. Atribute bereš s piko: ~serpent.guns~.`,
            },
            example: `class Ship:\n    def __init__(self, name, guns):\n        self.name = name\n        self.guns = guns\n\nserpent = Ship("Serpent", 12)\nwolf = Ship("Sea Wolf", 30)\n\nprint(serpent.name, "has", serpent.guns, "guns")\nprint(wolf.name, "has", wolf.guns, "guns")\nwolf.guns += 2\nprint("After the refit:", wolf.guns)\nprint(type(serpent))\n`,
          },
          {
            id: "s3", type: "predict",
            text: { en: "Each object keeps its own attributes. What prints?", sl: "Vsak objekt ima svoje atribute. Kaj se izpiše?" },
            code: SHIP + `\na = Ship("A", 1)\nb = Ship("B", 2)\na.guns = 5\nprint(a.guns, b.guns)\n`,
            options: ["5 5", "5 2", "1 2", { en: "An error", sl: "Napaka" }],
            answer: 1,
            explain: { en: "~a~ and ~b~ are separate objects built from the same blueprint. Changing ~a.guns~ has nothing to do with ~b~.", sl: "~a~ in ~b~ sta ločena objekta, zgrajena po istem načrtu. Sprememba ~a.guns~ nima zveze z ~b~." },
          },
          {
            id: "s4", type: "code", kind: "task",
            text: {
              en: `Write a class ~Pirate~:
- ~__init__(self, name, ship)~ stores ~name~ and ~ship~ as attributes.
- Every new pirate also starts with an attribute ~gold~ set to ~0~ (not a parameter).

Create ~anne = Pirate("Anne", "Serpent")~ and print:
:::
Anne sails on the Serpent with 0 gold
:::`,
              sl: `Napiši razred ~Pirate~:
- ~__init__(self, name, ship)~ shrani ~name~ in ~ship~ kot atributa.
- Vsak nov pirat ima tudi atribut ~gold~, nastavljen na ~0~ (ni parameter).

Ustvari ~anne = Pirate("Anne", "Serpent")~ in izpiši:
:::
Anne sails on the Serpent with 0 gold
:::`,
            },
            starter: ``,
            tests: [
              { check: R`P = ns["Pirate"]
p = P("Jack", "Kraken")
assert p.name == "Jack" and p.ship == "Kraken" and p.gold == 0`, msg: { en: "Pirate(\"Jack\", \"Kraken\") should have name \"Jack\", ship \"Kraken\" and gold 0.", sl: "Pirate(\"Jack\", \"Kraken\") naj ima name \"Jack\", ship \"Kraken\" in gold 0." } },
              { check: R`assert isinstance(ns.get("anne"), ns["Pirate"]) and ns["anne"].name == "Anne"`, msg: { en: "Create anne = Pirate(\"Anne\", \"Serpent\").", sl: "Ustvari anne = Pirate(\"Anne\", \"Serpent\")." } },
              { check: R`assert "Anne sails on the Serpent with 0 gold" in clean`, msg: { en: "Print Anne sails on the Serpent with 0 gold, using anne's attributes.", sl: "Z atributi objekta anne izpiši Anne sails on the Serpent with 0 gold." } },
            ],
            hints: [
              { en: "Inside ~__init__~: three lines starting with ~self.~, and ~self.gold = 0~ is one of them.", sl: "V ~__init__~: tri vrstice, ki se začnejo s ~self.~, ena od njih je ~self.gold = 0~." },
              { en: "~print(f\"{anne.name} sails on the {anne.ship} with {anne.gold} gold\")~", sl: "~print(f\"{anne.name} sails on the {anne.ship} with {anne.gold} gold\")~" },
            ],
            solution: `class Pirate:\n    def __init__(self, name, ship):\n        self.name = name\n        self.ship = ship\n        self.gold = 0\n\nanne = Pirate("Anne", "Serpent")\nprint(f"{anne.name} sails on the {anne.ship} with {anne.gold} gold")\n`,
          },
          {
            id: "s5", type: "code", kind: "debug",
            text: { en: "Pip's class forgets his name. Fix it so it prints ~Pip~.", sl: "Pipov razred pozabi njegovo ime. Popravi, da izpiše ~Pip~." },
            starter: `class Parrot:\n    def __init__(self, name):\n        name = name\n\np = Parrot("Pip")\nprint(p.name)\n`,
            tests: [{ check: R`assert clean == ["Pip"] and ns["Parrot"]("Polly").name == "Polly"`, msg: { en: "It should print Pip, and Parrot(\"Polly\").name should be \"Polly\".", sl: "Izpisati mora Pip, Parrot(\"Polly\").name pa naj bo \"Polly\"." } }],
            hints: [
              { en: "~name = name~ just reassigns the local parameter. Where should the value be stored?", sl: "~name = name~ le ponovno priredi lokalni parameter. Kam naj se vrednost shrani?" },
              { en: "~self.name = name~", sl: "~self.name = name~" },
            ],
            solution: `class Parrot:\n    def __init__(self, name):\n        self.name = name\n\np = Parrot("Pip")\nprint(p.name)\n`,
          },
        ],
      },
      {
        id: "c11l2",
        title: { en: "Teaching Objects Tricks", sl: "Objekte naučimo trikov" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `A **method** is a function that lives inside a class. Its first parameter is always ~self~, so it can read and change that object's attributes:
:::
class Ship:
    def __init__(self, name):
        self.name = name
        self.gold = 0

    def plunder(self, amount):
        self.gold += amount
:::
Call it with a dot: ~serpent.plunder(50)~. Python fills in ~self~ for you, so you only pass ~amount~.

Methods can ~return~ values too, exactly like normal functions. This is the heart of OOP: the **data** and the **behaviour** live together.`,
              sl: `**Metoda** je funkcija, ki živi v razredu. Njen prvi parameter je vedno ~self~, zato lahko bere in spreminja atribute objekta:
:::
class Ship:
    def __init__(self, name):
        self.name = name
        self.gold = 0

    def plunder(self, amount):
        self.gold += amount
:::
Pokličeš jo s piko: ~serpent.plunder(50)~. Python ~self~ izpolni namesto tebe, zato podaš samo ~amount~.

Metode lahko tudi vračajo vrednosti, tako kot navadne funkcije. To je srce OOP: **podatki** in **vedenje** živijo skupaj.`,
            },
            example: `class Ship:\n    def __init__(self, name):\n        self.name = name\n        self.gold = 0\n\n    def plunder(self, amount):\n        self.gold += amount\n\n    def report(self):\n        return f"{self.name} has {self.gold} gold"\n\nserpent = Ship("Serpent")\nserpent.plunder(50)\nserpent.plunder(70)\nprint(serpent.report())\n`,
          },
          {
            id: "s2", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `class Counter:\n    def __init__(self):\n        self.count = 0\n\n    def add(self):\n        self.count += 1\n\nc = Counter()\nc.add()\nc.add()\nd = Counter()\nd.add()\nprint(c.count, d.count)\n`,
            options: ["3 3", "2 1", "1 1", "2 3"],
            answer: 1,
            explain: { en: "Each Counter keeps its own ~count~. ~c~ was added to twice, ~d~ once.", sl: "Vsak Counter ima svoj ~count~. ~c~ je bil povečan dvakrat, ~d~ enkrat." },
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `Write a class ~Ship~:
- ~__init__(self, name)~: stores ~name~ and starts ~gold~ at 0
- ~plunder(self, amount)~: adds ~amount~ to the gold
- ~spend(self, amount)~: if there's enough gold, subtract it and return ~True~; otherwise change nothing and return ~False~
- ~report(self)~: returns ~"Serpent has 120 gold"~ (with the real name and amount)`,
              sl: `Napiši razred ~Ship~:
- ~__init__(self, name)~: shrani ~name~ in nastavi ~gold~ na 0
- ~plunder(self, amount)~: zlatu prišteje ~amount~
- ~spend(self, amount)~: če je zlata dovolj, ga odšteje in vrne ~True~; sicer ne spremeni ničesar in vrne ~False~
- ~report(self)~: vrne ~"Serpent has 120 gold"~ (s pravim imenom in zneskom)`,
            },
            starter: ``,
            tests: [
              { check: R`s = ns["Ship"]("Serpent")
assert s.name == "Serpent" and s.gold == 0
s.plunder(100); s.plunder(20)
assert s.gold == 120 and s.report() == "Serpent has 120 gold"`, msg: { en: "After plunder(100) and plunder(20), gold should be 120 and report() should return \"Serpent has 120 gold\".", sl: "Po plunder(100) in plunder(20) naj bo zlata 120, report() pa naj vrne \"Serpent has 120 gold\"." } },
              { check: R`s = ns["Ship"]("Wolf")
s.plunder(50)
assert s.spend(30) is True and s.gold == 20
assert s.spend(25) is False and s.gold == 20
assert s.spend(20) is True and s.gold == 0`, msg: { en: "spend should return True and subtract when there's enough gold (including exactly enough), and return False without changing anything otherwise.", sl: "spend naj vrne True in odšteje, ko je zlata dovolj (tudi natanko dovolj), sicer naj vrne False in ničesar ne spremeni." } },
            ],
            hints: [
              { en: "Every method takes ~self~ first. Inside, use ~self.gold~.", sl: "Vsaka metoda najprej sprejme ~self~. Znotraj uporabi ~self.gold~." },
              { en: "In ~spend~: ~if amount <= self.gold:~ subtract and ~return True~; after that, ~return False~.", sl: "V ~spend~: ~if amount <= self.gold:~ odštej in ~return True~; za tem ~return False~." },
            ],
            solution: `class Ship:\n    def __init__(self, name):\n        self.name = name\n        self.gold = 0\n\n    def plunder(self, amount):\n        self.gold += amount\n\n    def spend(self, amount):\n        if amount <= self.gold:\n            self.gold -= amount\n            return True\n        return False\n\n    def report(self):\n        return f"{self.name} has {self.gold} gold"\n`,
          },
          {
            id: "s4", type: "code", kind: "task",
            text: {
              en: `Write a class ~Parrot~:
- ~__init__(self, name)~: stores the name and an empty list ~words~
- ~learn(self, word)~: adds the word, but only if the parrot doesn't know it yet
- ~speak(self)~: returns all known words joined with ~" ... "~, or ~"..."~ if it knows none`,
              sl: `Napiši razred ~Parrot~:
- ~__init__(self, name)~: shrani ime in prazen seznam ~words~
- ~learn(self, word)~: doda besedo, a samo, če je papiga še ne pozna
- ~speak(self)~: vrne vse znane besede, združene z ~" ... "~, ali ~"..."~, če ne pozna nobene`,
            },
            starter: ``,
            tests: [
              { check: R`p = ns["Parrot"]("Pip")
assert p.name == "Pip" and p.words == [] and p.speak() == "..."`, msg: { en: "A new parrot should have an empty words list and speak() should return \"...\".", sl: "Nova papiga naj ima prazen seznam words, speak() pa naj vrne \"...\"." } },
              { check: R`p = ns["Parrot"]("Pip")
p.learn("ahoy"); p.learn("rum"); p.learn("ahoy")
assert p.words == ["ahoy", "rum"] and p.speak() == "ahoy ... rum"`, msg: { en: "After learn(\"ahoy\"), learn(\"rum\"), learn(\"ahoy\"): words is ['ahoy', 'rum'] and speak() returns \"ahoy ... rum\".", sl: "Po learn(\"ahoy\"), learn(\"rum\"), learn(\"ahoy\"): words je ['ahoy', 'rum'], speak() pa vrne \"ahoy ... rum\"." } },
              { check: R`a = ns["Parrot"]("A"); b = ns["Parrot"]("B")
a.learn("hi")
assert b.words == []`, msg: { en: "Each parrot must have its own list: teaching one shouldn't teach the other.", sl: "Vsaka papiga mora imeti svoj seznam: učenje ene ne sme naučiti druge." } },
            ],
            hints: [
              { en: "~self.words = []~ in ~__init__~. In ~learn~, check ~if word not in self.words:~", sl: "~self.words = []~ v ~__init__~. V ~learn~ preveri ~if word not in self.words:~" },
              { en: "~speak~: ~if not self.words: return \"...\"~ then ~return \" ... \".join(self.words)~", sl: "~speak~: ~if not self.words: return \"...\"~ nato ~return \" ... \".join(self.words)~" },
            ],
            solution: `class Parrot:\n    def __init__(self, name):\n        self.name = name\n        self.words = []\n\n    def learn(self, word):\n        if word not in self.words:\n            self.words.append(word)\n\n    def speak(self):\n        if not self.words:\n            return "..."\n        return " ... ".join(self.words)\n`,
          },
        ],
      },
      {
        id: "c11l3",
        title: { en: "A Fleet of Objects", sl: "Flota objektov" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `Objects become powerful when there are lots of them and they **interact**.
- Keep objects in lists and loop over them, like any other value.
- A method can take **another object** as a parameter and change it: ~self.fire_at(enemy)~ can reduce ~enemy.hull~.

A **generator expression** like ~sum(s.guns for s in fleet)~ is a comprehension without brackets, handy inside ~sum~, ~max~ and friends.`,
              sl: `Objekti postanejo močni, ko jih je veliko in **sodelujejo**.
- Objekte hrani v seznamih in teci po njih, kot po vsaki drugi vrednosti.
- Metoda lahko kot parameter sprejme **drug objekt** in ga spremeni: ~self.fire_at(enemy)~ lahko zmanjša ~enemy.hull~.

**Generatorski izraz**, kot ~sum(s.guns for s in fleet)~, je izpeljani izraz brez oklepajev, priročen v ~sum~, ~max~ in podobnih.`,
            },
            example: `class Ship:\n    def __init__(self, name, guns):\n        self.name = name\n        self.guns = guns\n        self.hull = 100\n\n    def fire_at(self, other):\n        other.hull -= self.guns\n        print(f"{self.name} fires at {other.name}! {other.name} hull: {other.hull}")\n\nfleet = [Ship("Serpent", 12), Ship("Kraken", 20), Ship("Wolf", 8)]\nprint("Total guns:", sum(s.guns for s in fleet))\nfleet[1].fire_at(fleet[0])\nfleet[0].fire_at(fleet[1])\n`,
          },
          {
            id: "s2", type: "code", kind: "task",
            text: {
              en: `Write a class ~Ship~:
- ~__init__(self, name, guns, hull=100)~
- ~fire_at(self, other)~: lowers ~other.hull~ by ~self.guns * 2~, but never below 0
- ~is_sunk(self)~: returns True when the hull is 0`,
              sl: `Napiši razred ~Ship~:
- ~__init__(self, name, guns, hull=100)~
- ~fire_at(self, other)~: zmanjša ~other.hull~ za ~self.guns * 2~, a nikoli pod 0
- ~is_sunk(self)~: vrne True, ko je trup 0`,
            },
            starter: ``,
            tests: [
              { check: R`S = ns["Ship"]
a = S("A", 10); b = S("B", 3, hull=50)
assert a.hull == 100 and b.hull == 50`, msg: { en: "Ship(\"A\", 10) should start with hull 100, and Ship(\"B\", 3, hull=50) with hull 50.", sl: "Ship(\"A\", 10) naj začne s trupom 100, Ship(\"B\", 3, hull=50) pa s 50." } },
              { check: R`S = ns["Ship"]
a = S("A", 10); b = S("B", 3, hull=50)
a.fire_at(b)
assert b.hull == 30 and a.hull == 100
b.fire_at(a)
assert a.hull == 94`, msg: { en: "A ship with 10 guns firing at a hull of 50 leaves 30. The attacker's own hull doesn't change.", sl: "Ladja z 10 topovi, ki strelja na trup 50, pusti 30. Napadalčev trup se ne spremeni." } },
              { check: R`S = ns["Ship"]
a = S("A", 40); b = S("B", 1, hull=50)
assert b.is_sunk() is False
a.fire_at(b)
assert b.hull == 0 and b.is_sunk() is True`, msg: { en: "The hull can't go below 0, and is_sunk() returns True once it's 0.", sl: "Trup ne more pod 0, is_sunk() pa vrne True, ko je 0." } },
            ],
            hints: [
              { en: "In ~fire_at~, change the **other** ship: ~other.hull -= self.guns * 2~.", sl: "V ~fire_at~ spremeni **drugo** ladjo: ~other.hull -= self.guns * 2~." },
              { en: "Then clamp it: ~if other.hull < 0: other.hull = 0~ (or ~other.hull = max(0, other.hull)~).", sl: "Nato omeji: ~if other.hull < 0: other.hull = 0~ (ali ~other.hull = max(0, other.hull)~)." },
            ],
            solution: `class Ship:\n    def __init__(self, name, guns, hull=100):\n        self.name = name\n        self.guns = guns\n        self.hull = hull\n\n    def fire_at(self, other):\n        other.hull = max(0, other.hull - self.guns * 2)\n\n    def is_sunk(self):\n        return self.hull == 0\n`,
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `The ~fleet~ is a list of Ship objects. Print the strongest ship and the fleet's total guns:
:::
Strongest: Kraken (20 guns)
Total guns: 52
:::`,
              sl: `~fleet~ je seznam objektov Ship. Izpiši najmočnejšo ladjo in skupno število topov flote:
:::
Strongest: Kraken (20 guns)
Total guns: 52
:::`,
            },
            starter: SHIP + `\nfleet = [Ship("Serpent", 12), Ship("Kraken", 20), Ship("Wolf", 8), Ship("Gull", 12)]\n`,
            tests: [
              { check: R`assert clean == ["Strongest: Kraken (20 guns)", "Total guns: 52"]`, msg: { en: "Expected Strongest: Kraken (20 guns) and Total guns: 52", sl: "Pričakovano Strongest: Kraken (20 guns) in Total guns: 52" } },
              { check: R`assert "Kraken" not in code.split("fleet = ")[1].split("\n", 1)[1] and "52" not in code`, msg: { en: "Work it out from the fleet list instead of typing the answer.", sl: "Izračunaj iz seznama flote, ne tipkaj odgovora." } },
            ],
            hints: [
              { en: "~max(fleet, key=lambda s: s.guns)~ gives the strongest Ship object.", sl: "~max(fleet, key=lambda s: s.guns)~ vrne najmočnejši objekt Ship." },
              { en: "~sum(s.guns for s in fleet)~ for the total.", sl: "~sum(s.guns for s in fleet)~ za vsoto." },
            ],
            solution: SHIP + `\nfleet = [Ship("Serpent", 12), Ship("Kraken", 20), Ship("Wolf", 8), Ship("Gull", 12)]\nbest = max(fleet, key=lambda s: s.guns)\nprint(f"Strongest: {best.name} ({best.guns} guns)")\nprint("Total guns:", sum(s.guns for s in fleet))\n`,
          },
        ],
      },
      {
        id: "c11l4",
        title: { en: "Speaking Clearly", sl: "Jasen govor" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `Printing an object gives something ugly like ~<__main__.Ship object at 0x7f...>~. Two special methods fix that:
- ~__str__(self)~ returns the friendly text for ~print(obj)~ and ~str(obj)~
- ~__repr__(self)~ returns a precise, programmer-facing text. Python uses it in lists, in error messages and in the console.

A good ~__repr__~ looks like the code that would create the object: ~Ship('Serpent', 12)~. Inside an f-string, ~{self.name!r}~ adds the quotes for you.`,
              sl: `Izpis objekta da nekaj grdega, kot ~<__main__.Ship object at 0x7f...>~. To popravita dve posebni metodi:
- ~__str__(self)~ vrne prijazno besedilo za ~print(obj)~ in ~str(obj)~
- ~__repr__(self)~ vrne natančno besedilo za programerje. Python ga uporablja v seznamih, v sporočilih o napakah in v konzoli.

Dober ~__repr__~ je videti kot koda, ki bi objekt ustvarila: ~Ship('Serpent', 12)~. V f-nizu ~{self.name!r}~ doda narekovaje namesto tebe.`,
            },
            example: `class Ship:\n    def __init__(self, name, guns):\n        self.name = name\n        self.guns = guns\n\nprint(Ship("Plain", 1))\n\nclass NiceShip:\n    def __init__(self, name, guns):\n        self.name = name\n        self.guns = guns\n\n    def __str__(self):\n        return f"{self.name} ({self.guns} guns)"\n\n    def __repr__(self):\n        return f"NiceShip({self.name!r}, {self.guns})"\n\ns = NiceShip("Serpent", 12)\nprint(s)\nprint([s, NiceShip("Wolf", 8)])\n`,
          },
          {
            id: "s2", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `class Coin:\n    def __init__(self, value):\n        self.value = value\n\n    def __str__(self):\n        return f"{self.value} doubloons"\n\nprint(Coin(5))\n`,
            options: ["Coin(5)", "5 doubloons", "<Coin object>", "5"],
            answer: 1,
            explain: { en: "~print~ calls ~__str__~ behind the scenes and shows what it returns.", sl: "~print~ v ozadju pokliče ~__str__~ in pokaže, kar ta vrne." },
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `Write a class ~Crate~ with ~item~ and ~weight~:
- ~str(Crate("rope", 12))~ → ~Crate of rope (12 kg)~
- ~repr(Crate("rope", 12))~ → ~Crate('rope', 12)~

Then print a list of two crates, and print one crate on its own.`,
              sl: `Napiši razred ~Crate~ z ~item~ in ~weight~:
- ~str(Crate("rope", 12))~ → ~Crate of rope (12 kg)~
- ~repr(Crate("rope", 12))~ → ~Crate('rope', 12)~

Nato izpiši seznam dveh zabojev in en zaboj samostojno.`,
            },
            starter: ``,
            tests: [
              { check: R`C = ns["Crate"]
assert str(C("rope", 12)) == "Crate of rope (12 kg)" and str(C("rum", 40)) == "Crate of rum (40 kg)"`, msg: { en: "str(Crate(\"rope\", 12)) should be Crate of rope (12 kg).", sl: "str(Crate(\"rope\", 12)) naj bo Crate of rope (12 kg)." } },
              { check: R`C = ns["Crate"]
assert repr(C("rope", 12)) == "Crate('rope', 12)" and repr([C("a", 1)]) == "[Crate('a', 1)]"`, msg: { en: "repr(Crate(\"rope\", 12)) should be Crate('rope', 12), with quotes around the item.", sl: "repr(Crate(\"rope\", 12)) naj bo Crate('rope', 12), z narekovaji okoli predmeta." } },
              { check: R`import re
assert re.search(r"\[Crate\('\w+', \d+\), Crate\('\w+', \d+\)\]", out) and re.search(r"^Crate of \w+ \(\d+ kg\)$", out, re.M)`, msg: { en: "Print a list of two crates (shows the reprs) and one crate on its own (shows the str).", sl: "Izpiši seznam dveh zabojev (pokaže repr) in en zaboj samostojno (pokaže str)." } },
            ],
            hints: [
              { en: "Two methods, each returning an f-string. Use ~{self.item!r}~ in ~__repr__~ for the quotes.", sl: "Dve metodi, vsaka vrne f-niz. V ~__repr__~ za narekovaje uporabi ~{self.item!r}~." },
              { en: "~print([Crate(\"rope\", 12), Crate(\"rum\", 40)])~ and ~print(Crate(\"map\", 1))~", sl: "~print([Crate(\"rope\", 12), Crate(\"rum\", 40)])~ in ~print(Crate(\"map\", 1))~" },
            ],
            solution: `class Crate:\n    def __init__(self, item, weight):\n        self.item = item\n        self.weight = weight\n\n    def __str__(self):\n        return f"Crate of {self.item} ({self.weight} kg)"\n\n    def __repr__(self):\n        return f"Crate({self.item!r}, {self.weight})"\n\nprint([Crate("rope", 12), Crate("rum", 40)])\nprint(Crate("map", 1))\n`,
          },
        ],
      },
      {
        id: "c11l5",
        title: { en: "Shared by All", sl: "Skupno vsem" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `Attributes set on ~self~ belong to **one object**. Variables written directly in the class body are **class attributes**, shared by every object:
:::
class Ship:
    built = 0              # class attribute

    def __init__(self, name):
        self.name = name   # instance attribute
        Ship.built += 1
:::
Reading ~obj.attr~ looks on the object first, then on the class. **Assigning** ~obj.attr = ...~ always creates an attribute on that one object.

Danger: a class attribute holding a **list** or **dict** is shared by everyone. Appending to it from one object changes it for all of them. Create per-object lists in ~__init__~.`,
              sl: `Atributi, nastavljeni na ~self~, pripadajo **enemu objektu**. Spremenljivke, napisane neposredno v telesu razreda, so **atributi razreda**, skupni vsem objektom:
:::
class Ship:
    built = 0              # atribut razreda

    def __init__(self, name):
        self.name = name   # atribut instance
        Ship.built += 1
:::
Branje ~obj.attr~ najprej išče na objektu, nato na razredu. **Prirejanje** ~obj.attr = ...~ vedno ustvari atribut na tem enem objektu.

Nevarnost: atribut razreda, ki hrani **seznam** ali **slovar**, je skupen vsem. Dodajanje vanj iz enega objekta ga spremeni za vse. Sezname posameznih objektov ustvari v ~__init__~.`,
            },
            example: `class Ship:\n    built = 0\n    flag = "skull"\n\n    def __init__(self, name):\n        self.name = name\n        Ship.built += 1\n\na = Ship("Serpent")\nb = Ship("Wolf")\nprint("Ships built:", Ship.built)\nb.flag = "parrot"\nprint(a.flag, b.flag, Ship.flag)\n`,
          },
          {
            id: "s2", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `class Sailor:\n    rank = "deckhand"\n\na = Sailor()\nb = Sailor()\na.rank = "captain"\nprint(a.rank, b.rank, Sailor.rank)\n`,
            options: ["captain captain captain", "captain deckhand deckhand", "captain deckhand captain", "deckhand deckhand deckhand"],
            answer: 1,
            explain: { en: "~a.rank = \"captain\"~ creates an attribute on ~a~ only. ~b~ and the class still see the shared ~\"deckhand\"~.", sl: "~a.rank = \"captain\"~ ustvari atribut samo na ~a~. ~b~ in razred še vedno vidita skupni ~\"deckhand\"~." },
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `Write a class ~Ship~ that keeps count of every ship ever built in a class attribute ~count~, and gives each ship a ~number~ in the order it was built (1, 2, 3...).`,
              sl: `Napiši razred ~Ship~, ki v atributu razreda ~count~ šteje vse kdaj zgrajene ladje in vsaki ladji da številko ~number~ po vrstnem redu gradnje (1, 2, 3...).`,
            },
            starter: ``,
            tests: [
              { check: R`S = ns["Ship"]
start = S.count
a = S("A"); b = S("B"); c = S("C")
assert S.count == start + 3 and (a.number, b.number, c.number) == (start + 1, start + 2, start + 3)`, msg: { en: "Each new Ship should increase Ship.count by one and get the next number.", sl: "Vsaka nova ladja naj Ship.count poveča za ena in dobi naslednjo številko." } },
              { check: R`S = ns["Ship"]
a = S("Serpent")
assert a.name == "Serpent" and "count" not in vars(a)`, msg: { en: "count should live on the class (Ship.count), not on each ship, and name should be stored.", sl: "count naj živi na razredu (Ship.count), ne na vsaki ladji, name pa naj bo shranjen." } },
            ],
            hints: [
              { en: "~count = 0~ in the class body. In ~__init__~, increase ~Ship.count~ (not ~self.count~).", sl: "~count = 0~ v telesu razreda. V ~__init__~ povečaj ~Ship.count~ (ne ~self.count~)." },
              { en: "After increasing it, ~self.number = Ship.count~.", sl: "Po povečanju ~self.number = Ship.count~." },
            ],
            solution: `class Ship:\n    count = 0\n\n    def __init__(self, name):\n        self.name = name\n        Ship.count += 1\n        self.number = Ship.count\n`,
          },
          {
            id: "s4", type: "code", kind: "debug",
            text: {
              en: "Anne grabbed gold and Jack grabbed a map, but Anne's loot shows both. Fix the class so each pirate has their own loot. It should print ~['gold']~ then ~['map']~.",
              sl: "Anne je zgrabila zlato, Jack pa zemljevid, a Annin plen kaže oboje. Popravi razred, da ima vsak pirat svoj plen. Izpisati mora ~['gold']~ nato ~['map']~.",
            },
            starter: `class Pirate:\n    loot = []\n\n    def __init__(self, name):\n        self.name = name\n\n    def grab(self, item):\n        self.loot.append(item)\n\nanne = Pirate("Anne")\njack = Pirate("Jack")\nanne.grab("gold")\njack.grab("map")\nprint(anne.loot)\nprint(jack.loot)\n`,
            tests: [{ check: R`assert clean == ["['gold']", "['map']"]`, msg: { en: "It should print ['gold'] and then ['map'].", sl: "Izpisati mora ['gold'] in nato ['map']." } }],
            hints: [
              { en: "~loot = []~ in the class body is one list shared by every pirate.", sl: "~loot = []~ v telesu razreda je en seznam, skupen vsem piratom." },
              { en: "Remove it from the class body and add ~self.loot = []~ in ~__init__~.", sl: "Odstrani ga iz telesa razreda in v ~__init__~ dodaj ~self.loot = []~." },
            ],
            solution: `class Pirate:\n    def __init__(self, name):\n        self.name = name\n        self.loot = []\n\n    def grab(self, item):\n        self.loot.append(item)\n\nanne = Pirate("Anne")\njack = Pirate("Jack")\nanne.grab("gold")\njack.grab("map")\nprint(anne.loot)\nprint(jack.loot)\n`,
            after: { en: "This bug catches experienced programmers too. Now you'll spot it.", sl: "Ta hrošč ujame tudi izkušene programerje. Zdaj ga boš opazil." },
          },
        ],
      },
      {
        id: "c11l6",
        title: { en: "Solo Voyage: The Shipyard", sl: "Samostojna plovba: Ladjedelnica" },
        solo: true,
        steps: [
          {
            id: "s1", type: "story", speaker: "captain",
            text: {
              en: `The master shipwright has an order from the Admiralty: a cargo ship that keeps track of its own load and **refuses** to be overloaded.

She'll write the hull. You write the class that runs the hold. Other programmers will use your class without reading it, so it has to behave exactly as promised.`,
              sl: `Mojstrica ladjedelka je od admiralitete dobila naročilo: tovorno ladjo, ki sama spremlja svoj tovor in **zavrne** preobremenitev.

Ona bo naredila trup. Ti napiši razred, ki upravlja skladišče. Drugi programerji bodo tvoj razred uporabljali, ne da bi ga brali, zato se mora obnašati natanko, kot je obljubljeno.`,
            },
          },
          {
            id: "s2", type: "code", kind: "project",
            text: {
              en: `Write a class ~CargoShip~.

- ~CargoShip(name, capacity)~: a ship that can carry ~capacity~ kg. Its ~cargo~ is a dictionary of item → kg, starting empty.
- ~load(item, kg)~: adds ~kg~ of ~item~ (loading the same item again adds to it). If it would go over capacity, **raise** ~ValueError("Not enough space")~ and change nothing.
- ~unload(item)~: removes the item completely and **returns** its kg. If the item isn't on board, return ~0~.
- ~used()~ returns the total kg on board; ~free_space()~ returns how much is left.
- ~str(ship)~ → ~Serpent: 2 items, 40/100 kg~
- ~repr(ship)~ → ~CargoShip('Serpent', 100)~`,
              sl: `Napiši razred ~CargoShip~.

- ~CargoShip(name, capacity)~: ladja, ki nosi ~capacity~ kg. Njen ~cargo~ je slovar predmet → kg, na začetku prazen.
- ~load(item, kg)~: doda ~kg~ predmeta ~item~ (ponovno nalaganje istega predmeta se prišteje). Če bi to preseglo nosilnost, **sproži** ~ValueError("Not enough space")~ in ne spremeni ničesar.
- ~unload(item)~: predmet popolnoma odstrani in **vrne** njegove kg. Če predmeta ni na krovu, vrne ~0~.
- ~used()~ vrne skupne kg na krovu; ~free_space()~ vrne, koliko je ostalo.
- ~str(ship)~ → ~Serpent: 2 items, 40/100 kg~
- ~repr(ship)~ → ~CargoShip('Serpent', 100)~`,
            },
            starter: `# Solo voyage: the Shipyard\n`,
            tests: [
              { check: R`S = ns["CargoShip"]("Serpent", 100)
assert S.name == "Serpent" and S.capacity == 100 and S.cargo == {} and S.used() == 0 and S.free_space() == 100`, msg: { en: "A new CargoShip(\"Serpent\", 100) should have name, capacity, an empty cargo dict, used() 0 and free_space() 100.", sl: "Nova CargoShip(\"Serpent\", 100) naj ima name, capacity, prazen slovar cargo, used() 0 in free_space() 100." } },
              { check: R`S = ns["CargoShip"]("Serpent", 100)
S.load("rope", 12); S.load("rum", 28); S.load("rope", 3)
assert S.cargo == {"rope": 15, "rum": 28} and S.used() == 43 and S.free_space() == 57`, msg: { en: "Loading rope 12, rum 28, rope 3 should give cargo {'rope': 15, 'rum': 28}, used() 43, free_space() 57.", sl: "Nalaganje rope 12, rum 28, rope 3 naj da cargo {'rope': 15, 'rum': 28}, used() 43, free_space() 57." } },
              { check: R`S = ns["CargoShip"]("Serpent", 50)
S.load("rum", 40)
try:
    S.load("anchor", 11)
except ValueError as e:
    assert str(e) == "Not enough space"
else:
    raise AssertionError("no error")
assert S.cargo == {"rum": 40}
S.load("anchor", 10)
assert S.free_space() == 0`, msg: { en: "Overloading should raise ValueError(\"Not enough space\") and leave the cargo unchanged. Filling exactly to capacity is allowed.", sl: "Preobremenitev naj sproži ValueError(\"Not enough space\") in tovor pusti nespremenjen. Polnjenje natanko do nosilnosti je dovoljeno." } },
              { check: R`S = ns["CargoShip"]("Serpent", 100)
S.load("rum", 30)
assert S.unload("rum") == 30 and S.cargo == {} and S.unload("gold") == 0`, msg: { en: "unload(\"rum\") should return 30 and remove it; unloading something not on board returns 0.", sl: "unload(\"rum\") naj vrne 30 in ga odstrani; razkladanje nečesa, česar ni na krovu, vrne 0." } },
              { check: R`S = ns["CargoShip"]("Serpent", 100)
S.load("rope", 12); S.load("rum", 28)
assert str(S) == "Serpent: 2 items, 40/100 kg" and repr(S) == "CargoShip('Serpent', 100)"`, msg: { en: "str should be Serpent: 2 items, 40/100 kg and repr should be CargoShip('Serpent', 100).", sl: "str naj bo Serpent: 2 items, 40/100 kg, repr pa CargoShip('Serpent', 100)." } },
              { check: R`A = ns["CargoShip"]("A", 10); B = ns["CargoShip"]("B", 10)
A.load("x", 5)
assert B.cargo == {}`, msg: { en: "Each ship must have its own cargo dictionary.", sl: "Vsaka ladja mora imeti svoj slovar tovora." } },
            ],
            hints: [
              { en: "Write ~used()~ first (~sum(self.cargo.values())~); then ~free_space()~ and ~load~ can use it. In ~load~, check ~if kg > self.free_space():~ before changing anything.", sl: "Najprej napiši ~used()~ (~sum(self.cargo.values())~); nato ga lahko uporabita ~free_space()~ in ~load~. V ~load~ preveri ~if kg > self.free_space():~, preden kar koli spremeniš." },
              { en: "~unload~ can use ~self.cargo.pop(item, 0)~: it removes the key and returns its value, or 0 if it's missing.", sl: "~unload~ lahko uporabi ~self.cargo.pop(item, 0)~: odstrani ključ in vrne njegovo vrednost ali 0, če ga ni." },
            ],
            solution: `class CargoShip:\n    def __init__(self, name, capacity):\n        self.name = name\n        self.capacity = capacity\n        self.cargo = {}\n\n    def used(self):\n        return sum(self.cargo.values())\n\n    def free_space(self):\n        return self.capacity - self.used()\n\n    def load(self, item, kg):\n        if kg > self.free_space():\n            raise ValueError("Not enough space")\n        self.cargo[item] = self.cargo.get(item, 0) + kg\n\n    def unload(self, item):\n        return self.cargo.pop(item, 0)\n\n    def __str__(self):\n        return f"{self.name}: {len(self.cargo)} items, {self.used()}/{self.capacity} kg"\n\n    def __repr__(self):\n        return f"CargoShip({self.name!r}, {self.capacity})"\n\nship = CargoShip("Serpent", 100)\nship.load("rope", 12)\nship.load("rum", 28)\nprint(ship)\n`,
            after: {
              en: "Notice how ~load~ and ~free_space~ reuse ~used()~ instead of repeating the sum. Methods calling each other through ~self~ keeps a class small and correct.",
              sl: "Opazi, kako ~load~ in ~free_space~ ponovno uporabita ~used()~, namesto da bi ponavljala vsoto. Metode, ki se kličejo prek ~self~, ohranjajo razred majhen in pravilen.",
            },
          },
        ],
      },
    ],
  };
})();
