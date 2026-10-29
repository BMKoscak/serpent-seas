/* Island 12 — Bloodline Isle: inheritance, overriding, super(), polymorphism, isinstance, composition */
(function () {
  const R = String.raw;
  (window.SS_ISLANDS = window.SS_ISLANDS || {}).c12 = {
    blurb: {
      en: "Old pirate families pass their traits down the generations, each child adding a twist. Inheritance, overriding, super(), polymorphism, and when to choose composition instead.",
      sl: "Stare piratske družine prenašajo lastnosti iz roda v rod, vsak otrok pa doda svojo posebnost. Dedovanje, prekrivanje, super(), polimorfizem in kdaj raje izbrati kompozicijo.",
    },
    log: {
      en: `**Inheritance**: a child class gets everything from its parent and can add or change things.
:::
class Ship:
    def __init__(self, name, guns):
        self.name = name
        self.guns = guns
    def describe(self):
        return f"{self.name}: {self.guns} guns"

class Galleon(Ship):                      # Galleon IS A Ship
    def __init__(self, name, guns, cargo):
        super().__init__(name, guns)      # let the parent set up its part
        self.cargo = cargo
    def describe(self):                   # override
        return super().describe() + f", {self.cargo} tons"
:::
- **Polymorphism**: different classes with the same method name can be used the same way: ~for s in fleet: print(s.describe())~
- ~isinstance(obj, Ship)~ is True for Ships **and** their subclasses. ~type(obj) == Ship~ is not.
- **Composition**: if X *has* a Y (a ship has cannons), store a Y inside X instead of inheriting.`,
      sl: `**Dedovanje**: podrazred dobi vse od starša in lahko kaj doda ali spremeni.
:::
class Ship:
    def __init__(self, name, guns):
        self.name = name
        self.guns = guns
    def describe(self):
        return f"{self.name}: {self.guns} topov"

class Galleon(Ship):                      # Galleon JE Ship
    def __init__(self, name, guns, cargo):
        super().__init__(name, guns)      # starš nastavi svoj del
        self.cargo = cargo
    def describe(self):                   # prekrivanje
        return super().describe() + f", {self.cargo} ton"
:::
- **Polimorfizem**: različne razrede z istim imenom metode lahko uporabljaš enako: ~for s in fleet: print(s.describe())~
- ~isinstance(obj, Ship)~ je True za Ship **in** njegove podrazrede. ~type(obj) == Ship~ ni.
- **Kompozicija**: če X *ima* Y (ladja ima topove), shrani Y v X, namesto da bi dedoval.`,
    },
    lessons: [
      {
        id: "c12l1",
        title: { en: "Family Trees", sl: "Rodovniki" },
        steps: [
          {
            id: "s1", type: "story", speaker: "pip",
            text: {
              en: `Squawk! **Bloodline Isle**, where every pirate can recite their family tree back ten generations. Grandma's eye patch, grandpa's wooden leg, and so on.

Classes can have families too. A **galleon** is a ship: it has a name, guns and a hull like any ship. It just adds a huge cargo hold. Why rewrite everything a ship can do? A galleon can simply **inherit** it.`,
              sl: `Skvak! **Otok rodovnikov**, kjer zna vsak pirat našteti svoj rodovnik deset rodov nazaj. Babičin povoj čez oko, dedkova lesena noga in tako naprej.

Tudi razredi imajo lahko družine. **Galeja** je ladja: ima ime, topove in trup kot vsaka ladja. Doda le ogromno skladišče. Zakaj bi na novo pisal vse, kar zna ladja? Galeja lahko to preprosto **podeduje**.`,
            },
          },
          {
            id: "s2", type: "learn",
            text: {
              en: `Put the parent class in parentheses to **inherit** from it:
:::
class Ship:
    def __init__(self, name):
        self.name = name

    def sail(self):
        return f"{self.name} sets sail"

class Galleon(Ship):
    def load_cargo(self):
        return f"{self.name} loads cargo"
:::
A ~Galleon~ has **everything** a ~Ship~ has (~__init__~, ~sail~) plus its own ~load_cargo~. ~Ship~ is the **parent** (or base class), ~Galleon~ the **child** (or subclass).

Use inheritance when the child truly **is a** kind of the parent.`,
              sl: `Starševski razred zapiši v oklepaje, da od njega **dediš**:
:::
class Ship:
    def __init__(self, name):
        self.name = name

    def sail(self):
        return f"{self.name} izpluje"

class Galleon(Ship):
    def load_cargo(self):
        return f"{self.name} naklada tovor"
:::
~Galleon~ ima **vse**, kar ima ~Ship~ (~__init__~, ~sail~), in še svoj ~load_cargo~. ~Ship~ je **starš** (osnovni razred), ~Galleon~ pa **otrok** (podrazred).

Dedovanje uporabi, ko otrok zares **je** vrsta starša.`,
            },
            example: `class Ship:\n    def __init__(self, name):\n        self.name = name\n\n    def sail(self):\n        return f"{self.name} sets sail"\n\nclass Galleon(Ship):\n    def load_cargo(self):\n        return f"{self.name} loads cargo"\n\ng = Galleon("Golden Hind")\nprint(g.sail())        # inherited\nprint(g.load_cargo())  # its own\ns = Ship("Dinghy")\nprint(s.sail())\n# s.load_cargo()       # AttributeError: plain ships can't\n`,
          },
          {
            id: "s3", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `class A:\n    def hi(self):\n        return "A says hi"\n\nclass B(A):\n    pass\n\nprint(B().hi())\n`,
            options: ["A says hi", "B says hi", { en: "An error: B has no hi", sl: "Napaka: B nima hi" }, "None"],
            answer: 0,
            explain: { en: "~B~ doesn't define ~hi~, so Python looks in the parent ~A~ and finds it there.", sl: "~B~ ne definira ~hi~, zato Python pogleda v starša ~A~ in ga najde tam." },
          },
          {
            id: "s4", type: "code", kind: "task",
            text: {
              en: `The ~Animal~ class is written for you. Create ~Parrot~ that **inherits** from it and adds a method ~speak()~ returning ~"Pip says squawk!"~ (with the parrot's name).`,
              sl: `Razred ~Animal~ je že napisan. Ustvari ~Parrot~, ki od njega **deduje** in doda metodo ~speak()~, ki vrne ~"Pip says squawk!"~ (z imenom papige).`,
            },
            starter: `class Animal:\n    def __init__(self, name, legs):\n        self.name = name\n        self.legs = legs\n\n    def describe(self):\n        return f"{self.name} has {self.legs} legs"\n\n`,
            tests: [
              { check: R`P, A = ns["Parrot"], ns["Animal"]
assert issubclass(P, A) and P is not A`, msg: { en: "Parrot should inherit from Animal: class Parrot(Animal):", sl: "Parrot naj deduje od Animal: class Parrot(Animal):" } },
              { check: R`p = ns["Parrot"]("Pip", 2)
assert p.speak() == "Pip says squawk!" and p.describe() == "Pip has 2 legs"`, msg: { en: "Parrot(\"Pip\", 2).speak() should return \"Pip says squawk!\", and describe() should still work.", sl: "Parrot(\"Pip\", 2).speak() naj vrne \"Pip says squawk!\", describe() pa naj še vedno deluje." } },
              { check: R`assert "def __init__" not in code.split("class Parrot")[1]`, msg: { en: "Parrot doesn't need its own __init__: it inherits Animal's.", sl: "Parrot ne potrebuje svojega __init__: podeduje ga od Animal." } },
            ],
            hints: [
              { en: "~class Parrot(Animal):~ and one method inside.", sl: "~class Parrot(Animal):~ in ena metoda v njem." },
              { en: "~def speak(self): return f\"{self.name} says squawk!\"~", sl: "~def speak(self): return f\"{self.name} says squawk!\"~" },
            ],
            solution: `class Animal:\n    def __init__(self, name, legs):\n        self.name = name\n        self.legs = legs\n\n    def describe(self):\n        return f"{self.name} has {self.legs} legs"\n\nclass Parrot(Animal):\n    def speak(self):\n        return f"{self.name} says squawk!"\n`,
          },
        ],
      },
      {
        id: "c12l2",
        title: { en: "Doing It Differently", sl: "Po svoje" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `A child can **override** a parent's method by defining one with the same name. Python always uses the child's version first.

Often you don't want to replace the parent's work, just **add** to it. ~super()~ gives you the parent's version:
:::
class Galleon(Ship):
    def __init__(self, name, guns, cargo):
        super().__init__(name, guns)   # parent sets name and guns
        self.cargo = cargo             # then add our own

    def describe(self):
        return super().describe() + f", {self.cargo} tons"
:::
If a child defines ~__init__~ but forgets ~super().__init__(...)~, the parent's attributes never get set.`,
              sl: `Otrok lahko **prekrije** starševo metodo tako, da definira metodo z istim imenom. Python vedno najprej uporabi otrokovo različico.

Pogosto starševega dela ne želiš zamenjati, le **dodati** k njemu. ~super()~ ti da starševo različico:
:::
class Galleon(Ship):
    def __init__(self, name, guns, cargo):
        super().__init__(name, guns)   # starš nastavi name in guns
        self.cargo = cargo             # nato dodaj svoje

    def describe(self):
        return super().describe() + f", {self.cargo} ton"
:::
Če otrok definira ~__init__~, a pozabi ~super().__init__(...)~, se starševi atributi nikoli ne nastavijo.`,
            },
            example: `class Ship:\n    def __init__(self, name, guns):\n        self.name = name\n        self.guns = guns\n\n    def describe(self):\n        return f"{self.name}: {self.guns} guns"\n\n    def horn(self):\n        return "Toot"\n\nclass Galleon(Ship):\n    def __init__(self, name, guns, cargo):\n        super().__init__(name, guns)\n        self.cargo = cargo\n\n    def describe(self):\n        return super().describe() + f", {self.cargo} tons of cargo"\n\n    def horn(self):\n        return "BWAAAAAMP"\n\nfor s in [Ship("Sloop", 4), Galleon("Golden Hind", 40, 300)]:\n    print(s.describe(), "|", s.horn())\n`,
          },
          {
            id: "s2", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `class Ship:\n    def greet(self):\n        return "Ahoy"\n\nclass Pirate(Ship):\n    def greet(self):\n        return super().greet() + ", matey!"\n\nprint(Pirate().greet())\n`,
            options: ["Ahoy", ", matey!", "Ahoy, matey!", { en: "An error", sl: "Napaka" }],
            answer: 2,
            explain: { en: "The child's ~greet~ runs, calls the parent's ~greet~ through ~super()~, and adds to its result.", sl: "Izvede se otrokov ~greet~, ki prek ~super()~ pokliče starševega in doda k njegovemu rezultatu." },
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `~Ship~ is written for you. Write ~Galleon(Ship)~:
- ~__init__(self, name, guns, cargo)~ uses ~super().__init__~ for name and guns, then stores ~cargo~
- ~describe()~ overrides the parent's and returns ~"Golden Hind: 40 guns, 300 tons of cargo"~ by adding to ~super().describe()~`,
              sl: `~Ship~ je že napisan. Napiši ~Galleon(Ship)~:
- ~__init__(self, name, guns, cargo)~ za name in guns uporabi ~super().__init__~, nato shrani ~cargo~
- ~describe()~ prekrije starševega in vrne ~"Golden Hind: 40 guns, 300 tons of cargo"~ tako, da doda k ~super().describe()~`,
            },
            starter: `class Ship:\n    def __init__(self, name, guns):\n        self.name = name\n        self.guns = guns\n\n    def describe(self):\n        return f"{self.name}: {self.guns} guns"\n\n`,
            tests: [
              { check: R`g = ns["Galleon"]("Golden Hind", 40, 300)
assert isinstance(g, ns["Ship"]) and g.name == "Golden Hind" and g.guns == 40 and g.cargo == 300`, msg: { en: "Galleon(\"Golden Hind\", 40, 300) should be a Ship with name, guns and cargo set.", sl: "Galleon(\"Golden Hind\", 40, 300) naj bo Ship z nastavljenimi name, guns in cargo." } },
              { check: R`assert ns["Galleon"]("Golden Hind", 40, 300).describe() == "Golden Hind: 40 guns, 300 tons of cargo"`, msg: { en: "describe() should return Golden Hind: 40 guns, 300 tons of cargo", sl: "describe() naj vrne Golden Hind: 40 guns, 300 tons of cargo" } },
              { check: R`part = code.split("class Galleon")[1]
assert part.count("super()") >= 2 and "self.name = name" not in part`, msg: { en: "Use super() in both __init__ and describe instead of repeating the parent's code.", sl: "super() uporabi v __init__ in v describe, namesto da ponavljaš starševo kodo." } },
            ],
            hints: [
              { en: "~super().__init__(name, guns)~ as the first line of the child's ~__init__~.", sl: "~super().__init__(name, guns)~ kot prva vrstica otrokovega ~__init__~." },
              { en: "~return super().describe() + f\", {self.cargo} tons of cargo\"~", sl: "~return super().describe() + f\", {self.cargo} tons of cargo\"~" },
            ],
            solution: `class Ship:\n    def __init__(self, name, guns):\n        self.name = name\n        self.guns = guns\n\n    def describe(self):\n        return f"{self.name}: {self.guns} guns"\n\nclass Galleon(Ship):\n    def __init__(self, name, guns, cargo):\n        super().__init__(name, guns)\n        self.cargo = cargo\n\n    def describe(self):\n        return super().describe() + f", {self.cargo} tons of cargo"\n`,
          },
          {
            id: "s4", type: "code", kind: "debug",
            text: { en: "The captain object has no name. Fix ~Captain~ so the program prints ~Marlow commands the Serpent~.", sl: "Objekt kapitana nima imena. Popravi ~Captain~, da program izpiše ~Marlow commands the Serpent~." },
            starter: `class Sailor:\n    def __init__(self, name):\n        self.name = name\n\nclass Captain(Sailor):\n    def __init__(self, name, ship):\n        self.ship = ship\n\n    def order(self):\n        return f"{self.name} commands the {self.ship}"\n\nprint(Captain("Marlow", "Serpent").order())\n`,
            tests: [{ check: R`assert clean == ["Marlow commands the Serpent"]`, msg: { en: "It should print Marlow commands the Serpent", sl: "Izpisati mora Marlow commands the Serpent" } }],
            hints: [
              { en: "~Captain.__init__~ replaces ~Sailor.__init__~ completely, so ~self.name~ is never set.", sl: "~Captain.__init__~ popolnoma zamenja ~Sailor.__init__~, zato se ~self.name~ nikoli ne nastavi." },
              { en: "Add ~super().__init__(name)~ at the start of ~Captain.__init__~.", sl: "Na začetek ~Captain.__init__~ dodaj ~super().__init__(name)~." },
            ],
            solution: `class Sailor:\n    def __init__(self, name):\n        self.name = name\n\nclass Captain(Sailor):\n    def __init__(self, name, ship):\n        super().__init__(name)\n        self.ship = ship\n\n    def order(self):\n        return f"{self.name} commands the {self.ship}"\n\nprint(Captain("Marlow", "Serpent").order())\n`,
          },
        ],
      },
      {
        id: "c12l3",
        title: { en: "Many Shapes", sl: "Mnogo oblik" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `**Polymorphism** ("many shapes") means different classes can be used through the **same method name**. Code that calls ~weapon.damage()~ doesn't care whether it's a cannon or a sword; each one knows its own answer.
:::
for weapon in arsenal:
    total += weapon.damage()
:::
Python doesn't even need the classes to be related. If it has a ~damage()~ method, it works. This is called **duck typing**: if it walks like a duck and quacks like a duck, treat it as a duck.

Polymorphism is what lets you add a new kind of weapon later without changing the loop at all.`,
              sl: `**Polimorfizem** ("mnogo oblik") pomeni, da lahko različne razrede uporabljaš prek **istega imena metode**. Kodi, ki kliče ~weapon.damage()~, je vseeno, ali je to top ali meč; vsak pozna svoj odgovor.
:::
for weapon in arsenal:
    total += weapon.damage()
:::
Python niti ne potrebuje, da so razredi povezani. Če ima metodo ~damage()~, deluje. Temu pravimo **račje tipkanje**: če hodi kot raca in gaga kot raca, ravnaj z njim kot z raco.

Polimorfizem ti omogoči, da kasneje dodaš novo vrsto orožja, ne da bi sploh spremenil zanko.`,
            },
            example: `class Cannon:\n    def damage(self):\n        return 50\n    def noise(self):\n        return "BOOM"\n\nclass Sword:\n    def damage(self):\n        return 12\n    def noise(self):\n        return "shing"\n\nclass Parrot:\n    def damage(self):\n        return 1\n    def noise(self):\n        return "SQUAWK"\n\narsenal = [Cannon(), Sword(), Sword(), Parrot()]\nfor w in arsenal:\n    print(type(w).__name__, w.noise(), w.damage())\nprint("Total:", sum(w.damage() for w in arsenal))\n`,
          },
          {
            id: "s2", type: "code", kind: "task",
            text: {
              en: `Write three classes, each with a ~damage()~ method:
- ~Cannon(balls)~: ~damage()~ returns ~balls * 20~
- ~Musket()~: ~damage()~ returns ~15~
- ~Cutlass(sharp)~: ~damage()~ returns ~10~, or ~18~ if ~sharp~ is True

Then write a function ~total_damage(weapons)~ that returns the sum of ~damage()~ for every weapon in a list.`,
              sl: `Napiši tri razrede, vsakega z metodo ~damage()~:
- ~Cannon(balls)~: ~damage()~ vrne ~balls * 20~
- ~Musket()~: ~damage()~ vrne ~15~
- ~Cutlass(sharp)~: ~damage()~ vrne ~10~ ali ~18~, če je ~sharp~ True

Nato napiši funkcijo ~total_damage(weapons)~, ki vrne vsoto ~damage()~ vseh orožij v seznamu.`,
            },
            starter: ``,
            tests: [
              { check: R`assert ns["Cannon"](3).damage() == 60 and ns["Musket"]().damage() == 15 and ns["Cutlass"](True).damage() == 18 and ns["Cutlass"](False).damage() == 10`, msg: { en: "Cannon(3) → 60, Musket() → 15, Cutlass(True) → 18, Cutlass(False) → 10", sl: "Cannon(3) → 60, Musket() → 15, Cutlass(True) → 18, Cutlass(False) → 10" } },
              { check: R`f = ns["total_damage"]
assert f([ns["Cannon"](2), ns["Musket"](), ns["Cutlass"](True)]) == 73 and f([]) == 0`, msg: { en: "total_damage([Cannon(2), Musket(), Cutlass(True)]) should be 73, and an empty list gives 0.", sl: "total_damage([Cannon(2), Musket(), Cutlass(True)]) naj bo 73, prazen seznam pa da 0." } },
              { check: R`class Fake:
    def damage(self):
        return 1000
assert ns["total_damage"]([Fake(), ns["Musket"]()]) == 1015`, msg: { en: "total_damage should work with any object that has damage(), not just your three classes. Don't check types.", sl: "total_damage naj deluje s katerim koli objektom, ki ima damage(), ne le s tvojimi tremi razredi. Ne preverjaj tipov." } },
            ],
            hints: [
              { en: "Each class stores what it needs in ~__init__~ (~Musket~ doesn't need an ~__init__~ at all).", sl: "Vsak razred v ~__init__~ shrani, kar potrebuje (~Musket~ sploh ne potrebuje ~__init__~)." },
              { en: "~return sum(w.damage() for w in weapons)~", sl: "~return sum(w.damage() for w in weapons)~" },
            ],
            solution: `class Cannon:\n    def __init__(self, balls):\n        self.balls = balls\n\n    def damage(self):\n        return self.balls * 20\n\nclass Musket:\n    def damage(self):\n        return 15\n\nclass Cutlass:\n    def __init__(self, sharp):\n        self.sharp = sharp\n\n    def damage(self):\n        return 18 if self.sharp else 10\n\ndef total_damage(weapons):\n    return sum(w.damage() for w in weapons)\n`,
          },
          {
            id: "s3", type: "predict",
            text: { en: "Duck typing. What prints?", sl: "Račje tipkanje. Kaj se izpiše?" },
            code: `class Duck:\n    def speak(self):\n        return "Quack"\n\nclass Robot:\n    def speak(self):\n        return "Beep"\n\nfor thing in [Duck(), Robot(), Duck()]:\n    print(thing.speak(), end=" ")\n`,
            options: ["Quack Beep Quack ", "Quack Quack Quack ", { en: "An error: Robot isn't a Duck", sl: "Napaka: Robot ni Duck" }, "Beep Beep Beep "],
            answer: 0,
            explain: { en: "Python only checks that each object has a ~speak~ method when it's called. The classes don't need a common parent.", sl: "Python ob klicu preveri le, ali ima vsak objekt metodo ~speak~. Razredi ne potrebujejo skupnega starša." },
          },
        ],
      },
      {
        id: "c12l4",
        title: { en: "Is-a or Has-a?", sl: "Je ali ima?" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `~isinstance(obj, Class)~ asks "is this object a Class, or a child of it?" A Galleon **is** a Ship, so ~isinstance(galleon, Ship)~ is True. ~type(galleon) == Ship~ is False, because its exact type is Galleon. Prefer ~isinstance~.

Inheritance means **is-a**. When something **has** another thing instead, use **composition**: store the other object as an attribute.
- A galleon **is a** ship → inherit
- A ship **has** cannons → keep a list of Cannon objects inside the ship

A common beginner mistake is inheriting just to reuse some code. If "X is a Y" sounds wrong out loud, use composition.`,
              sl: `~isinstance(obj, Razred)~ vpraša "ali je ta objekt Razred ali njegov otrok?" Galeja **je** ladja, zato je ~isinstance(galleon, Ship)~ True. ~type(galleon) == Ship~ je False, ker je njen natančen tip Galleon. Raje uporabljaj ~isinstance~.

Dedovanje pomeni **je**. Ko nekaj drugo stvar **ima**, uporabi **kompozicijo**: drug objekt shrani kot atribut.
- Galeja **je** ladja → dedovanje
- Ladja **ima** topove → v ladji hrani seznam objektov Cannon

Pogosta začetniška napaka je dedovanje samo zato, da se ponovno uporabi koda. Če "X je Y" na glas zveni narobe, uporabi kompozicijo.`,
            },
            example: `class Ship:\n    pass\n\nclass Galleon(Ship):\n    pass\n\ng = Galleon()\nprint(isinstance(g, Galleon), isinstance(g, Ship), type(g) == Ship)\n\nclass Cannon:\n    def __init__(self, power):\n        self.power = power\n\nclass Warship:\n    def __init__(self, name):\n        self.name = name\n        self.cannons = []        # has-a: composition\n\n    def add(self, cannon):\n        self.cannons.append(cannon)\n\nw = Warship("Serpent")\nw.add(Cannon(30))\nw.add(Cannon(45))\nprint(w.name, "has", len(w.cannons), "cannons")\n`,
          },
          {
            id: "s2", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `class Ship:\n    pass\n\nclass Galleon(Ship):\n    pass\n\ng = Galleon()\nprint(isinstance(g, Ship), isinstance(g, Galleon), type(g) == Ship)\n`,
            options: ["True True True", "True True False", "False True False", "True False False"],
            answer: 1,
            explain: { en: "~isinstance~ follows the family tree, so a Galleon counts as a Ship. ~type()~ gives the exact class, which is Galleon.", sl: "~isinstance~ sledi rodovniku, zato galeja šteje kot ladja. ~type()~ vrne natančen razred, ki je Galleon." },
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `Use **composition**. Write:
- ~Cannon(power)~
- ~Warship(name)~ that starts with an empty list ~cannons~, has ~add_cannon(cannon)~, and ~firepower()~ returning the total power of its cannons

~Warship~ should **not** inherit from ~Cannon~ (a ship is not a cannon).`,
              sl: `Uporabi **kompozicijo**. Napiši:
- ~Cannon(power)~
- ~Warship(name)~, ki začne s praznim seznamom ~cannons~, ima ~add_cannon(cannon)~ in ~firepower()~, ki vrne skupno moč topov

~Warship~ naj **ne** deduje od ~Cannon~ (ladja ni top).`,
            },
            starter: ``,
            tests: [
              { check: R`W, C = ns["Warship"], ns["Cannon"]
w = W("Serpent")
assert w.name == "Serpent" and w.cannons == [] and w.firepower() == 0
w.add_cannon(C(30)); w.add_cannon(C(45))
assert len(w.cannons) == 2 and w.firepower() == 75`, msg: { en: "A new Warship has no cannons and firepower 0. After adding Cannon(30) and Cannon(45), firepower() is 75.", sl: "Nova Warship nima topov in ima firepower 0. Po dodajanju Cannon(30) in Cannon(45) je firepower() 75." } },
              { check: R`assert not issubclass(ns["Warship"], ns["Cannon"])`, msg: { en: "Warship shouldn't inherit from Cannon. It has cannons, it isn't one.", sl: "Warship naj ne deduje od Cannon. Topove ima, ni top." } },
              { check: R`a = ns["Warship"]("A"); b = ns["Warship"]("B")
a.add_cannon(ns["Cannon"](5))
assert b.cannons == []`, msg: { en: "Each warship needs its own cannons list.", sl: "Vsaka vojna ladja potrebuje svoj seznam topov." } },
            ],
            hints: [
              { en: "~self.cannons = []~ in ~Warship.__init__~, and ~add_cannon~ appends to it.", sl: "~self.cannons = []~ v ~Warship.__init__~, ~add_cannon~ pa vanj dodaja." },
              { en: "~return sum(c.power for c in self.cannons)~", sl: "~return sum(c.power for c in self.cannons)~" },
            ],
            solution: `class Cannon:\n    def __init__(self, power):\n        self.power = power\n\nclass Warship:\n    def __init__(self, name):\n        self.name = name\n        self.cannons = []\n\n    def add_cannon(self, cannon):\n        self.cannons.append(cannon)\n\n    def firepower(self):\n        return sum(c.power for c in self.cannons)\n`,
          },
        ],
      },
      {
        id: "c12l5",
        title: { en: "Solo Voyage: The Fleet Battle", sl: "Samostojna plovba: Pomorska bitka" },
        solo: true,
        steps: [
          {
            id: "s1", type: "story", speaker: "captain",
            text: {
              en: `Before we risk the Serpent, I want to know how a battle plays out. The Admiralty uses simulations. So will we.

Every ship fires and takes damage, but each type has a trick: sloops are nimble and dodge half of every hit; galleons are slow but their broadsides hit twice as hard. Build the simulator.`,
              sl: `Preden tvegamo Kačo, želim vedeti, kako poteka bitka. Admiraliteta uporablja simulacije. Mi tudi.

Vsaka ladja strelja in prejema škodo, a vsaka vrsta ima svoj trik: šalupe so okretne in se izognejo polovici vsakega zadetka; galeje so počasne, a njihove salve zadenejo dvakrat močneje. Zgradi simulator.`,
            },
          },
          {
            id: "s2", type: "code", kind: "project",
            text: {
              en: `**Classes**
- ~Ship(name, hull, guns)~
  - ~take_damage(amount)~ lowers ~hull~, never below 0
  - ~attack(target)~ calls ~target.take_damage(...)~ with ~self.guns~ damage, and **returns** the damage it sent
  - ~is_afloat()~ is True while hull > 0
  - ~str(ship)~ → ~Serpent (hull 80)~
- ~Sloop(Ship)~: overrides ~take_damage~ to take only **half** the amount, rounded down (~amount // 2~). Use ~super()~.
- ~Galleon(Ship)~: overrides ~attack~ to send **double** damage.

**Function** ~battle(a, b)~: ships take turns, ~a~ first. Each turn prints ~Serpent hits Kraken for 20~ (the damage that was sent). As soon as the target sinks, return the winner's **name**. If 100 turns pass with no winner, return ~None~.`,
              sl: `**Razredi**
- ~Ship(name, hull, guns)~
  - ~take_damage(amount)~ zmanjša ~hull~, nikoli pod 0
  - ~attack(target)~ pokliče ~target.take_damage(...)~ s ~self.guns~ škode in **vrne** poslano škodo
  - ~is_afloat()~ je True, dokler je hull > 0
  - ~str(ship)~ → ~Serpent (hull 80)~
- ~Sloop(Ship)~: prekrije ~take_damage~, da prejme le **polovico**, zaokroženo navzdol (~amount // 2~). Uporabi ~super()~.
- ~Galleon(Ship)~: prekrije ~attack~, da pošlje **dvojno** škodo.

**Funkcija** ~battle(a, b)~: ladji streljata izmenično, ~a~ prva. Vsaka poteza izpiše ~Serpent hits Kraken for 20~ (poslano škodo). Ko tarča potone, vrni **ime** zmagovalca. Če mine 100 potez brez zmagovalca, vrni ~None~.`,
            },
            starter: `# Solo voyage: the Fleet Battle\n`,
            tests: [
              { check: R`S = ns["Ship"]
s = S("Serpent", 100, 20)
s.take_damage(30)
assert s.hull == 70 and s.is_afloat() and str(s) == "Serpent (hull 70)"
s.take_damage(500)
assert s.hull == 0 and not s.is_afloat()`, msg: { en: "Ship basics: take_damage lowers hull (not below 0), is_afloat, and str like Serpent (hull 70).", sl: "Osnove Ship: take_damage zmanjša trup (ne pod 0), is_afloat in str kot Serpent (hull 70)." } },
              { check: R`S = ns["Ship"]
a = S("A", 100, 20); b = S("B", 100, 5)
assert a.attack(b) == 20 and b.hull == 80`, msg: { en: "attack should damage the target by self.guns and return that amount.", sl: "attack naj tarči povzroči self.guns škode in vrne ta znesek." } },
              { check: R`S, Sl, G = ns["Ship"], ns["Sloop"], ns["Galleon"]
assert issubclass(Sl, S) and issubclass(G, S)
sl = Sl("Gull", 50, 5); sl.take_damage(15)
assert sl.hull == 43
g = G("Hind", 200, 10); t = S("T", 100, 1)
assert g.attack(t) == 20 and t.hull == 80
assert "super()" in code`, msg: { en: "Sloop takes half damage rounded down (15 → 7), Galleon sends double (10 guns → 20). Both inherit from Ship and use super().", sl: "Sloop prejme pol škode, zaokroženo navzdol (15 → 7), Galleon pošlje dvojno (10 topov → 20). Oba dedujeta od Ship in uporabljata super()." } },
              { check: R`S = ns["Ship"]
a = S("Serpent", 50, 20); b = S("Kraken", 30, 25)
r, o = capture(ns["battle"], a, b)
lines = [l.strip() for l in o.splitlines() if l.strip()]
assert r == "Serpent" and lines == ["Serpent hits Kraken for 20", "Kraken hits Serpent for 25", "Serpent hits Kraken for 20"], lines`, msg: { en: "battle(Serpent 50/20, Kraken 30/25): Serpent hits for 20, Kraken hits for 25, Serpent hits for 20, Kraken sinks, return \"Serpent\".", sl: "battle(Serpent 50/20, Kraken 30/25): Serpent zadene za 20, Kraken za 25, Serpent za 20, Kraken potone, vrni \"Serpent\"." } },
              { check: R`a = ns["Galleon"]("Hind", 100, 10); b = ns["Sloop"]("Gull", 40, 40)
r, o = capture(ns["battle"], a, b)
lines = [l.strip() for l in o.splitlines() if l.strip()]
assert lines[0] == "Hind hits Gull for 20" and r == "Gull" and b.hull > 0`, msg: { en: "Galleon vs Sloop: the galleon sends 20 (the sloop only takes 10 of it). With these numbers the sloop wins.", sl: "Galeja proti šalupi: galeja pošlje 20 (šalupa prejme le 10). Pri teh številkah zmaga šalupa." } },
              { check: R`a = ns["Ship"]("A", 10, 0); b = ns["Ship"]("B", 10, 0)
r, o = capture(ns["battle"], a, b)
assert r is None`, msg: { en: "Two ships with 0 guns can never win: battle should give up after 100 turns and return None.", sl: "Ladji z 0 topovi ne moreta zmagati: battle naj po 100 potezah obupa in vrne None." } },
            ],
            hints: [
              { en: "Build and test the ~Ship~ class first. Then the subclasses are tiny: ~Sloop.take_damage~ is ~super().take_damage(amount // 2)~; ~Galleon.attack~ sends ~self.guns * 2~.", sl: "Najprej zgradi in preizkusi razred ~Ship~. Nato sta podrazreda drobna: ~Sloop.take_damage~ je ~super().take_damage(amount // 2)~; ~Galleon.attack~ pošlje ~self.guns * 2~." },
              { en: "In ~battle~, use ~attacker, defender = a, b~ and swap them each turn with ~attacker, defender = defender, attacker~. A ~for turn in range(100):~ loop gives you the limit.", sl: "V ~battle~ uporabi ~attacker, defender = a, b~ in ju vsako potezo zamenjaj z ~attacker, defender = defender, attacker~. Zanka ~for turn in range(100):~ ti da omejitev." },
            ],
            solution: `class Ship:\n    def __init__(self, name, hull, guns):\n        self.name = name\n        self.hull = hull\n        self.guns = guns\n\n    def take_damage(self, amount):\n        self.hull = max(0, self.hull - amount)\n\n    def attack(self, target):\n        damage = self.guns\n        target.take_damage(damage)\n        return damage\n\n    def is_afloat(self):\n        return self.hull > 0\n\n    def __str__(self):\n        return f"{self.name} (hull {self.hull})"\n\nclass Sloop(Ship):\n    def take_damage(self, amount):\n        super().take_damage(amount // 2)\n\nclass Galleon(Ship):\n    def attack(self, target):\n        damage = self.guns * 2\n        target.take_damage(damage)\n        return damage\n\ndef battle(a, b):\n    attacker, defender = a, b\n    for turn in range(100):\n        damage = attacker.attack(defender)\n        print(f"{attacker.name} hits {defender.name} for {damage}")\n        if not defender.is_afloat():\n            return attacker.name\n        attacker, defender = defender, attacker\n    return None\n\nprint("Winner:", battle(Ship("Serpent", 50, 20), Ship("Kraken", 30, 25)))\n`,
            after: {
              en: "~battle~ never checks what kind of ship it's dealing with. Each class handles its own behaviour. That's polymorphism doing real work.",
              sl: "~battle~ nikoli ne preverja, s kakšno ladjo ima opravka. Vsak razred poskrbi za svoje vedenje. To je polimorfizem pri resničnem delu.",
            },
          },
        ],
      },
    ],
  };
})();
