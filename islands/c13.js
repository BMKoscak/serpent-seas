/* Island 13 — Gilded Gears: dunder methods, properties, encapsulation, classmethod/staticmethod, custom exceptions */
(function () {
  const R = String.raw;
  (window.SS_ISLANDS = window.SS_ISLANDS || {}).c13 = {
    blurb: {
      en: "The clockwork guild makes machines that feel natural to use. Teach your objects to add, compare, measure and guard themselves: dunder methods, properties, class methods and custom exceptions.",
      sl: "Ceh urarjev izdeluje stroje, ki se uporabljajo naravno. Nauči objekte seštevati, primerjati, meriti in varovati sami sebe: dunder metode, lastnosti, razredne metode in lastne izjeme.",
    },
    log: {
      en: `**Dunder methods** make objects work with Python's operators and built-ins:
:::
__eq__(self, other)    # a == b
__lt__(self, other)    # a < b   (lets sorted() work)
__add__(self, other)   # a + b
__mul__(self, n)       # a * n
__len__(self)          # len(a)
__contains__(self, x)  # x in a
__abs__(self)          # abs(a)
:::
Return ~NotImplemented~ from ~__eq__~ / ~__add__~ when ~other~ isn't something you understand.

**Properties** look like attributes but run code:
:::
class Ship:
    def __init__(self, hull):
        self.hull = hull          # goes through the setter
    @property
    def hull(self):
        return self._hull
    @hull.setter
    def hull(self, value):
        self._hull = max(0, min(100, value))
:::
- ~_name~ means "internal, please don't touch". ~__name~ is mangled to ~_Class__name~.
- ~@classmethod~ gets ~cls~; great for alternative constructors like ~Ship.from_string("Serpent,12")~.
- ~@staticmethod~ is a plain function that lives in the class.

**Custom exceptions**: ~class NotEnoughGold(Exception): pass~, then ~raise NotEnoughGold("...")~.`,
      sl: `**Dunder metode** omogočijo, da objekti delujejo s Pythonovimi operatorji in vgrajenimi funkcijami:
:::
__eq__(self, other)    # a == b
__lt__(self, other)    # a < b   (omogoči sorted())
__add__(self, other)   # a + b
__mul__(self, n)       # a * n
__len__(self)          # len(a)
__contains__(self, x)  # x in a
__abs__(self)          # abs(a)
:::
Iz ~__eq__~ / ~__add__~ vrni ~NotImplemented~, ko ~other~ ni nekaj, kar razumeš.

**Lastnosti** (properties) so videti kot atributi, a izvajajo kodo:
:::
class Ship:
    def __init__(self, hull):
        self.hull = hull          # gre skozi setter
    @property
    def hull(self):
        return self._hull
    @hull.setter
    def hull(self, value):
        self._hull = max(0, min(100, value))
:::
- ~_ime~ pomeni "notranje, prosim ne dotikaj se". ~__ime~ se preimenuje v ~_Razred__ime~.
- ~@classmethod~ dobi ~cls~; odlično za nadomestne konstruktorje, kot ~Ship.from_string("Serpent,12")~.
- ~@staticmethod~ je navadna funkcija, ki živi v razredu.

**Lastne izjeme**: ~class NotEnoughGold(Exception): pass~, nato ~raise NotEnoughGold("...")~.`,
    },
    lessons: [
      {
        id: "c13l1",
        title: { en: "Dunder Methods", sl: "Dunder metode" },
        steps: [
          {
            id: "s1", type: "story", speaker: "captain",
            text: {
              en: `**Gilded Gears**. The clockwork guild builds compasses, chronometers and music boxes so well made that you never need a manual. You just use them.

Your classes should feel the same. Why write ~purse.add(other)~ when you could write ~purse + other~? Why ~crew.size()~ when Python already has ~len(crew)~?

Python lets you plug your objects into its own operators. The magic lives in methods with double underscores: **dunder** methods. You've already met two: ~__init__~ and ~__str__~.`,
              sl: `**Pozlačeni zobniki**. Ceh urarjev izdeluje kompase, kronometre in glasbene skrinjice tako dobro, da nikoli ne potrebuješ navodil. Preprosto jih uporabiš.

Tvoji razredi naj delujejo enako. Zakaj pisati ~purse.add(other)~, ko lahko napišeš ~purse + other~? Zakaj ~crew.size()~, ko ima Python že ~len(crew)~?

Python ti omogoča, da svoje objekte priklopiš na njegove operatorje. Čarovnija živi v metodah z dvojnimi podčrtaji: **dunder** metodah. Dve si že spoznal: ~__init__~ in ~__str__~.`,
            },
          },
          {
            id: "s2", type: "learn",
            text: {
              en: `When you write ~a + b~, Python actually calls ~a.__add__(b)~. Define that method, and ~+~ works on your objects. The same goes for:
- ~a == b~ → ~__eq__~, ~a < b~ → ~__lt__~ (and ~sorted~ uses ~<~)
- ~len(a)~ → ~__len__~, ~x in a~ → ~__contains__~
- ~a * n~ → ~__mul__~, ~abs(a)~ → ~__abs__~

Without ~__eq__~, two objects are only equal if they're the **very same object**, even if all their attributes match.

~__add__~ should return a **new** object rather than changing ~self~, just like ~3 + 4~ doesn't change the 3.`,
              sl: `Ko napišeš ~a + b~, Python v resnici pokliče ~a.__add__(b)~. Definiraj to metodo in ~+~ deluje na tvojih objektih. Enako velja za:
- ~a == b~ → ~__eq__~, ~a < b~ → ~__lt__~ (in ~sorted~ uporablja ~<~)
- ~len(a)~ → ~__len__~, ~x in a~ → ~__contains__~
- ~a * n~ → ~__mul__~, ~abs(a)~ → ~__abs__~

Brez ~__eq__~ sta dva objekta enaka le, če sta **povsem isti objekt**, četudi se vsi atributi ujemajo.

~__add__~ naj vrne **nov** objekt, namesto da spremeni ~self~, tako kot ~3 + 4~ ne spremeni števila 3.`,
            },
            example: `class Coins:\n    def __init__(self, value):\n        self.value = value\n\n    def __add__(self, other):\n        return Coins(self.value + other.value)\n\n    def __eq__(self, other):\n        return isinstance(other, Coins) and self.value == other.value\n\n    def __lt__(self, other):\n        return self.value < other.value\n\n    def __repr__(self):\n        return f"Coins({self.value})"\n\na, b = Coins(3), Coins(4)\nprint(a + b)\nprint(a == Coins(3), a < b)\nprint(sorted([Coins(9), Coins(1), Coins(5)]))\n`,
          },
          {
            id: "s3", type: "predict",
            text: { en: "No ~__eq__~ here. What prints?", sl: "Tu ni ~__eq__~. Kaj se izpiše?" },
            code: `class Coin:\n    def __init__(self, value):\n        self.value = value\n\na = Coin(5)\nb = Coin(5)\nprint(a == b, a == a)\n`,
            options: ["True True", "False True", "False False", { en: "An error", sl: "Napaka" }],
            answer: 1,
            explain: { en: "Without ~__eq__~, ~==~ only asks \"is this the same object?\". ~a~ and ~b~ are two different objects that happen to hold the same value.", sl: "Brez ~__eq__~ ~==~ vpraša le \"ali je to isti objekt?\". ~a~ in ~b~ sta dva različna objekta, ki slučajno hranita isto vrednost." },
          },
          {
            id: "s4", type: "code", kind: "task",
            text: {
              en: `Write a class ~Doubloons(amount)~ that behaves like money:
- ~Doubloons(3) + Doubloons(4)~ gives a new ~Doubloons(7)~
- ~Doubloons(5) == Doubloons(5)~ is True (and comparing with a non-Doubloons is False)
- ~Doubloons(2) < Doubloons(9)~ is True, so ~sorted~ works
- ~str(Doubloons(7))~ → ~7 doubloons~`,
              sl: `Napiši razred ~Doubloons(amount)~, ki se obnaša kot denar:
- ~Doubloons(3) + Doubloons(4)~ vrne nov ~Doubloons(7)~
- ~Doubloons(5) == Doubloons(5)~ je True (primerjava z nečim, kar ni Doubloons, pa False)
- ~Doubloons(2) < Doubloons(9)~ je True, zato ~sorted~ deluje
- ~str(Doubloons(7))~ → ~7 doubloons~`,
            },
            starter: ``,
            tests: [
              { check: R`D = ns["Doubloons"]
a, b = D(3), D(4)
c = a + b
assert isinstance(c, D) and c.amount == 7 and a.amount == 3 and b.amount == 4`, msg: { en: "Doubloons(3) + Doubloons(4) should return a new Doubloons with amount 7 and leave both originals unchanged.", sl: "Doubloons(3) + Doubloons(4) naj vrne nov Doubloons z amount 7 in pusti oba izvirnika nespremenjena." } },
              { check: R`D = ns["Doubloons"]
assert D(5) == D(5) and not (D(5) == D(6)) and not (D(5) == 5)`, msg: { en: "== should compare amounts, and comparing with a plain number should be False.", sl: "== naj primerja zneske, primerjava z navadnim številom pa naj bo False." } },
              { check: R`D = ns["Doubloons"]
assert D(2) < D(9) and not (D(9) < D(2))
assert [d.amount for d in sorted([D(9), D(1), D(5)])] == [1, 5, 9]`, msg: { en: "< should compare amounts so that sorted() puts the smallest first.", sl: "< naj primerja zneske, da sorted() postavi najmanjše najprej." } },
              { check: R`assert str(ns["Doubloons"](7)) == "7 doubloons"`, msg: { en: "str(Doubloons(7)) should be 7 doubloons", sl: "str(Doubloons(7)) naj bo 7 doubloons" } },
            ],
            hints: [
              { en: "~__add__~ returns ~Doubloons(self.amount + other.amount)~. ~__lt__~ returns ~self.amount < other.amount~.", sl: "~__add__~ vrne ~Doubloons(self.amount + other.amount)~. ~__lt__~ vrne ~self.amount < other.amount~." },
              { en: "~__eq__~: ~return isinstance(other, Doubloons) and self.amount == other.amount~", sl: "~__eq__~: ~return isinstance(other, Doubloons) and self.amount == other.amount~" },
            ],
            solution: `class Doubloons:\n    def __init__(self, amount):\n        self.amount = amount\n\n    def __add__(self, other):\n        return Doubloons(self.amount + other.amount)\n\n    def __eq__(self, other):\n        return isinstance(other, Doubloons) and self.amount == other.amount\n\n    def __lt__(self, other):\n        return self.amount < other.amount\n\n    def __str__(self):\n        return f"{self.amount} doubloons"\n`,
          },
          {
            id: "s5", type: "code", kind: "task",
            text: {
              en: `Write ~Crew(names)~ that stores a list of names and supports:
- ~len(crew)~ → number of sailors
- ~"Pip" in crew~ → True or False, **ignoring capitals** (~"pip" in crew~ is True too)`,
              sl: `Napiši ~Crew(names)~, ki hrani seznam imen in podpira:
- ~len(crew)~ → število mornarjev
- ~"Pip" in crew~ → True ali False, **ne glede na velike črke** (tudi ~"pip" in crew~ je True)`,
            },
            starter: ``,
            tests: [
              { check: R`c = ns["Crew"](["Anne", "Pip", "Jack"])
assert len(c) == 3 and len(ns["Crew"]([])) == 0`, msg: { en: "len(Crew([\"Anne\", \"Pip\", \"Jack\"])) should be 3.", sl: "len(Crew([\"Anne\", \"Pip\", \"Jack\"])) naj bo 3." } },
              { check: R`c = ns["Crew"](["Anne", "Pip", "Jack"])
assert "Pip" in c and "pip" in c and "JACK" in c and "Bo" not in c`, msg: { en: "\"Pip\" in crew and \"pip\" in crew should both be True; \"Bo\" in crew is False.", sl: "\"Pip\" in crew in \"pip\" in crew naj bosta True; \"Bo\" in crew je False." } },
            ],
            hints: [
              { en: "~__len__~ returns ~len(self.names)~.", sl: "~__len__~ vrne ~len(self.names)~." },
              { en: "~__contains__(self, name)~: compare ~name.lower()~ with each name lowercased: ~return name.lower() in [n.lower() for n in self.names]~", sl: "~__contains__(self, name)~: primerjaj ~name.lower()~ z vsakim imenom v malih črkah: ~return name.lower() in [n.lower() for n in self.names]~" },
            ],
            solution: `class Crew:\n    def __init__(self, names):\n        self.names = list(names)\n\n    def __len__(self):\n        return len(self.names)\n\n    def __contains__(self, name):\n        return name.lower() in [n.lower() for n in self.names]\n`,
          },
        ],
      },
      {
        id: "c13l2",
        title: { en: "Properties", sl: "Lastnosti" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `Sometimes an attribute needs rules: a hull can't go below 0 or above 100. A **property** looks like a normal attribute from outside, but runs your code when it's read or set:
:::
class Ship:
    def __init__(self, hull):
        self.hull = hull            # this uses the setter too

    @property
    def hull(self):                 # runs on ship.hull
        return self._hull

    @hull.setter
    def hull(self, value):          # runs on ship.hull = ...
        self._hull = max(0, min(100, value))
:::
The real value lives in ~self._hull~ (underscore = "internal").

A property with no setter is **read-only**, perfect for values calculated from other attributes.`,
              sl: `Včasih atribut potrebuje pravila: trup ne sme pod 0 ali nad 100. **Lastnost** (property) je od zunaj videti kot navaden atribut, a ob branju ali nastavljanju izvede tvojo kodo:
:::
class Ship:
    def __init__(self, hull):
        self.hull = hull            # tudi to uporabi setter

    @property
    def hull(self):                 # izvede se ob ship.hull
        return self._hull

    @hull.setter
    def hull(self, value):          # izvede se ob ship.hull = ...
        self._hull = max(0, min(100, value))
:::
Prava vrednost živi v ~self._hull~ (podčrtaj = "notranje").

Lastnost brez setterja je **samo za branje**, popolna za vrednosti, izračunane iz drugih atributov.`,
            },
            example: `class Ship:\n    def __init__(self, name, hull):\n        self.name = name\n        self.hull = hull\n\n    @property\n    def hull(self):\n        return self._hull\n\n    @hull.setter\n    def hull(self, value):\n        self._hull = max(0, min(100, value))\n\n    @property\n    def is_sunk(self):\n        return self.hull == 0\n\ns = Ship("Serpent", 150)\nprint(s.hull)          # clamped to 100\ns.hull -= 130\nprint(s.hull, s.is_sunk)\n`,
          },
          {
            id: "s2", type: "code", kind: "task",
            text: {
              en: `Write ~Ship(name, hull)~ where:
- ~hull~ is a property; setting it keeps the value between ~0~ and ~100~ (that includes in ~__init__~)
- ~status~ is a **read-only** property: ~"Sunk"~ at 0, ~"Damaged"~ below 50, otherwise ~"Seaworthy"~`,
              sl: `Napiši ~Ship(name, hull)~, kjer:
- je ~hull~ lastnost; nastavljanje ohranja vrednost med ~0~ in ~100~ (tudi v ~__init__~)
- je ~status~ lastnost **samo za branje**: ~"Sunk"~ pri 0, ~"Damaged"~ pod 50, sicer ~"Seaworthy"~`,
            },
            starter: ``,
            tests: [
              { check: R`S = ns["Ship"]
assert S("A", 150).hull == 100 and S("B", -5).hull == 0 and S("C", 70).hull == 70`, msg: { en: "Ship(\"A\", 150).hull should be 100 and Ship(\"B\", -5).hull should be 0: the clamp must also work in __init__.", sl: "Ship(\"A\", 150).hull naj bo 100, Ship(\"B\", -5).hull pa 0: omejitev mora delovati tudi v __init__." } },
              { check: R`s = ns["Ship"]("A", 80)
s.hull -= 200
assert s.hull == 0
s.hull = 55
assert s.hull == 55`, msg: { en: "Setting hull later should be clamped too (80 - 200 → 0).", sl: "Tudi kasnejše nastavljanje hull naj bo omejeno (80 - 200 → 0)." } },
              { check: R`S = ns["Ship"]
assert [S("x", h).status for h in (0, 1, 49, 50, 100)] == ["Sunk", "Damaged", "Damaged", "Seaworthy", "Seaworthy"]`, msg: { en: "status: 0 → Sunk, 1 to 49 → Damaged, 50 and up → Seaworthy.", sl: "status: 0 → Sunk, 1 do 49 → Damaged, 50 in več → Seaworthy." } },
              { check: R`s = ns["Ship"]("A", 80)
try:
    s.status = "Fine"
except AttributeError:
    pass
else:
    raise AssertionError("status should be read-only")`, msg: { en: "status should be read-only: don't give it a setter.", sl: "status naj bo samo za branje: ne daj mu setterja." } },
            ],
            hints: [
              { en: "In ~__init__~, write ~self.hull = hull~ (no underscore) so it goes through the setter. The setter stores into ~self._hull~.", sl: "V ~__init__~ napiši ~self.hull = hull~ (brez podčrtaja), da gre skozi setter. Setter shrani v ~self._hull~." },
              { en: "~status~ is just ~@property~ with an if/elif/else that returns a word.", sl: "~status~ je samo ~@property~ z if/elif/else, ki vrne besedo." },
            ],
            solution: `class Ship:\n    def __init__(self, name, hull):\n        self.name = name\n        self.hull = hull\n\n    @property\n    def hull(self):\n        return self._hull\n\n    @hull.setter\n    def hull(self, value):\n        self._hull = max(0, min(100, value))\n\n    @property\n    def status(self):\n        if self.hull == 0:\n            return "Sunk"\n        if self.hull < 50:\n            return "Damaged"\n        return "Seaworthy"\n`,
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `Write ~Temperature(celsius)~ with a **settable** property ~fahrenheit~:
- reading ~t.fahrenheit~ returns ~celsius * 9 / 5 + 32~
- setting ~t.fahrenheit = 212~ updates ~t.celsius~ to ~100~`,
              sl: `Napiši ~Temperature(celsius)~ z lastnostjo ~fahrenheit~, ki jo je mogoče **nastaviti**:
- branje ~t.fahrenheit~ vrne ~celsius * 9 / 5 + 32~
- nastavitev ~t.fahrenheit = 212~ posodobi ~t.celsius~ na ~100~`,
            },
            starter: ``,
            tests: [
              { check: R`t = ns["Temperature"](100)
assert t.celsius == 100 and t.fahrenheit == 212 and ns["Temperature"](0).fahrenheit == 32`, msg: { en: "Temperature(100).fahrenheit should be 212, Temperature(0).fahrenheit 32.", sl: "Temperature(100).fahrenheit naj bo 212, Temperature(0).fahrenheit pa 32." } },
              { check: R`t = ns["Temperature"](0)
t.fahrenheit = 212
assert abs(t.celsius - 100) < 1e-9
t.fahrenheit = 50
assert abs(t.celsius - 10) < 1e-9 and abs(t.fahrenheit - 50) < 1e-9`, msg: { en: "Setting fahrenheit should update celsius: 212 → 100, 50 → 10.", sl: "Nastavitev fahrenheit naj posodobi celsius: 212 → 100, 50 → 10." } },
            ],
            hints: [
              { en: "Store only ~self.celsius~. ~fahrenheit~ is calculated from it.", sl: "Shrani samo ~self.celsius~. ~fahrenheit~ se izračuna iz njega." },
              { en: "The setter: ~self.celsius = (value - 32) * 5 / 9~", sl: "Setter: ~self.celsius = (value - 32) * 5 / 9~" },
            ],
            solution: `class Temperature:\n    def __init__(self, celsius):\n        self.celsius = celsius\n\n    @property\n    def fahrenheit(self):\n        return self.celsius * 9 / 5 + 32\n\n    @fahrenheit.setter\n    def fahrenheit(self, value):\n        self.celsius = (value - 32) * 5 / 9\n`,
          },
        ],
      },
      {
        id: "c13l3",
        title: { en: "Keep Out!", sl: "Ne dotikaj se!" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `**Encapsulation** means an object protects its own data and offers methods for using it, so nobody can put it in a broken state.

Python trusts programmers, so privacy is by convention:
- ~_balance~ (one underscore): "internal, please don't touch from outside"
- ~__code~ (two underscores): Python **renames** it to ~_Vault__code~, so ~vault.__code~ from outside raises AttributeError. It's not real security, just a strong hint.

Good classes expose **behaviour** (~vault.open(code)~) rather than raw data (~vault.code~).`,
              sl: `**Enkapsulacija** pomeni, da objekt varuje svoje podatke in za njihovo uporabo ponuja metode, da ga nihče ne more spraviti v pokvarjeno stanje.

Python zaupa programerjem, zato je zasebnost dogovor:
- ~_balance~ (en podčrtaj): "notranje, prosim ne dotikaj se od zunaj"
- ~__code~ (dva podčrtaja): Python ga **preimenuje** v ~_Vault__code~, zato ~vault.__code~ od zunaj sproži AttributeError. To ni prava varnost, le močan namig.

Dobri razredi ponujajo **vedenje** (~vault.open(code)~), ne surovih podatkov (~vault.code~).`,
            },
            example: `class Vault:\n    def __init__(self, code):\n        self.__code = code\n        self._opened = 0\n\n    def open(self, code):\n        if code == self.__code:\n            self._opened += 1\n            return True\n        return False\n\nv = Vault(1234)\nprint(v.open(1111), v.open(1234))\ntry:\n    print(v.__code)\nexcept AttributeError as e:\n    print("AttributeError:", e)\nprint(v._Vault__code)   # it's still there, just renamed\n`,
          },
          {
            id: "s2", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `class Chest:\n    def __init__(self):\n        self.__gold = 100\n\n    def peek(self):\n        return self.__gold\n\nc = Chest()\nprint(c.peek(), hasattr(c, "__gold"))\n`,
            options: ["100 True", "100 False", { en: "An error", sl: "Napaka" }, "None False"],
            answer: 1,
            explain: { en: "Inside the class, ~self.__gold~ works normally. From outside, the name was mangled to ~_Chest__gold~, so ~__gold~ isn't found.", sl: "Znotraj razreda ~self.__gold~ deluje normalno. Od zunaj je bilo ime preimenovano v ~_Chest__gold~, zato ~__gold~ ni najden." },
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `Write a ~Vault(code)~ that guards its code:
- store the code in a private ~__code~ attribute
- ~open(code)~ returns True for the right code, False otherwise
- after **3 wrong attempts** the vault locks forever: ~open~ returns False even for the right code
- a read-only property ~attempts_left~ shows how many wrong tries remain (3, 2, 1, 0). A correct code doesn't use up an attempt.`,
              sl: `Napiši ~Vault(code)~, ki varuje svojo kodo:
- kodo shrani v zasebni atribut ~__code~
- ~open(code)~ vrne True za pravo kodo, sicer False
- po **3 napačnih poskusih** se trezor za vedno zaklene: ~open~ vrne False tudi za pravo kodo
- lastnost samo za branje ~attempts_left~ pokaže, koliko napačnih poskusov je ostalo (3, 2, 1, 0). Prava koda ne porabi poskusa.`,
            },
            starter: ``,
            tests: [
              { check: R`v = ns["Vault"](1234)
assert v.attempts_left == 3 and v.open(1234) is True and v.attempts_left == 3`, msg: { en: "A new vault has 3 attempts left; the right code opens it and doesn't use an attempt.", sl: "Nov trezor ima 3 poskuse; prava koda ga odpre in ne porabi poskusa." } },
              { check: R`v = ns["Vault"](1234)
assert v.open(1) is False and v.attempts_left == 2 and v.open(2) is False and v.open(1234) is True and v.attempts_left == 1`, msg: { en: "Wrong codes use up attempts (3 → 2 → 1), but the right code still works before the vault locks.", sl: "Napačne kode porabljajo poskuse (3 → 2 → 1), prava koda pa še deluje, preden se trezor zaklene." } },
              { check: R`v = ns["Vault"](1234)
for x in (1, 2, 3):
    v.open(x)
assert v.attempts_left == 0 and v.open(1234) is False and v.attempts_left == 0`, msg: { en: "After 3 wrong attempts the vault is locked: even 1234 returns False, and attempts_left stays 0.", sl: "Po 3 napačnih poskusih je trezor zaklenjen: tudi 1234 vrne False, attempts_left pa ostane 0." } },
              { check: R`v = ns["Vault"](1234)
assert not hasattr(v, "code") and not hasattr(v, "__code") and hasattr(v, "_Vault__code")`, msg: { en: "Store the code as self.__code so it's name-mangled.", sl: "Kodo shrani kot self.__code, da se ime preimenuje." } },
              { check: R`v = ns["Vault"](1)
try:
    v.attempts_left = 99
except AttributeError:
    pass
else:
    raise AssertionError("read-only")`, msg: { en: "attempts_left should be a read-only property.", sl: "attempts_left naj bo lastnost samo za branje." } },
            ],
            hints: [
              { en: "Keep a counter like ~self._wrong = 0~. ~attempts_left~ returns ~3 - self._wrong~ (never below 0).", sl: "Vodi števec, kot ~self._wrong = 0~. ~attempts_left~ vrne ~3 - self._wrong~ (nikoli pod 0)." },
              { en: "In ~open~: if ~self._wrong >= 3~, return False straight away. Then check the code; on a wrong one, increase the counter.", sl: "V ~open~: če ~self._wrong >= 3~, takoj vrni False. Nato preveri kodo; pri napačni povečaj števec." },
            ],
            solution: `class Vault:\n    def __init__(self, code):\n        self.__code = code\n        self._wrong = 0\n\n    @property\n    def attempts_left(self):\n        return max(0, 3 - self._wrong)\n\n    def open(self, code):\n        if self._wrong >= 3:\n            return False\n        if code == self.__code:\n            return True\n        self._wrong += 1\n        return False\n`,
          },
        ],
      },
      {
        id: "c13l4",
        title: { en: "Other Ways In", sl: "Drugi vhodi" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `Two more kinds of method:
- ~@classmethod~ receives the **class** (~cls~) instead of an object. Its classic use is an **alternative constructor**: another way to build an object, such as from a string.
- ~@staticmethod~ receives neither. It's an ordinary function that belongs with the class because it's related, like a validation helper.
:::
class Ship:
    def __init__(self, name, guns):
        self.name, self.guns = name, guns

    @classmethod
    def from_string(cls, text):
        name, guns = text.split(",")
        return cls(name, int(guns))

    @staticmethod
    def is_valid_name(name):
        return name.replace(" ", "").isalpha()
:::
Call both on the class: ~Ship.from_string("Serpent,12")~, ~Ship.is_valid_name("Sea Wolf")~.`,
              sl: `Še dve vrsti metod:
- ~@classmethod~ prejme **razred** (~cls~) namesto objekta. Klasična uporaba je **nadomestni konstruktor**: drug način gradnje objekta, na primer iz niza.
- ~@staticmethod~ ne prejme ničesar od tega. Je navadna funkcija, ki spada k razredu, ker je z njim povezana, na primer pomočnik za preverjanje.
:::
class Ship:
    def __init__(self, name, guns):
        self.name, self.guns = name, guns

    @classmethod
    def from_string(cls, text):
        name, guns = text.split(",")
        return cls(name, int(guns))

    @staticmethod
    def is_valid_name(name):
        return name.replace(" ", "").isalpha()
:::
Obe kličeš na razredu: ~Ship.from_string("Serpent,12")~, ~Ship.is_valid_name("Sea Wolf")~.`,
            },
            example: `class Ship:\n    def __init__(self, name, guns):\n        self.name, self.guns = name, guns\n\n    @classmethod\n    def from_string(cls, text):\n        name, guns = text.split(",")\n        return cls(name, int(guns))\n\n    @staticmethod\n    def is_valid_name(name):\n        return name.replace(" ", "").isalpha()\n\n    def __repr__(self):\n        return f"Ship({self.name!r}, {self.guns})"\n\nprint(Ship.from_string("Serpent,12"))\nprint(Ship.is_valid_name("Sea Wolf"), Ship.is_valid_name("R2D2"))\n`,
          },
          {
            id: "s2", type: "code", kind: "task",
            text: {
              en: `Write ~Sailor(name, age)~ with:
- ~@classmethod from_record(cls, text)~ that builds a sailor from ~"Anne;34"~ (name and age separated by a semicolon; age becomes an int; trim spaces)
- ~@staticmethod is_adult(age)~ returning True for 18 and over
- a normal method ~can_vote()~ that uses ~is_adult~ on the sailor's own age`,
              sl: `Napiši ~Sailor(name, age)~ z:
- ~@classmethod from_record(cls, text)~, ki zgradi mornarja iz ~"Anne;34"~ (ime in starost, ločena s podpičjem; starost postane int; odstrani presledke)
- ~@staticmethod is_adult(age)~, ki vrne True za 18 in več
- navadno metodo ~can_vote()~, ki uporabi ~is_adult~ na mornarjevi starosti`,
            },
            starter: ``,
            tests: [
              { check: R`S = ns["Sailor"]
s = S.from_record("Anne;34")
assert isinstance(s, S) and s.name == "Anne" and s.age == 34
t = S.from_record("  Jack ; 17 ")
assert t.name == "Jack" and t.age == 17`, msg: { en: "Sailor.from_record(\"Anne;34\") should build a Sailor named Anne aged 34 (an int). Spaces around the parts should be removed.", sl: "Sailor.from_record(\"Anne;34\") naj zgradi Sailor z imenom Anne, starim 34 (int). Presledke okoli delov odstrani." } },
              { check: R`S = ns["Sailor"]
assert S.is_adult(18) and not S.is_adult(17) and S("a", 40).can_vote() and not S("b", 12).can_vote()`, msg: { en: "is_adult(18) is True, is_adult(17) False; can_vote() uses the sailor's age.", sl: "is_adult(18) je True, is_adult(17) False; can_vote() uporabi mornarjevo starost." } },
              { check: R`assert "@classmethod" in code and "@staticmethod" in code and "cls(" in code`, msg: { en: "Use @classmethod (returning cls(...)) and @staticmethod.", sl: "Uporabi @classmethod (ki vrne cls(...)) in @staticmethod." } },
            ],
            hints: [
              { en: "In ~from_record~: ~name, age = text.split(\";\")~, then ~return cls(name.strip(), int(age))~.", sl: "V ~from_record~: ~name, age = text.split(\";\")~, nato ~return cls(name.strip(), int(age))~." },
              { en: "~can_vote~ can call ~self.is_adult(self.age)~ (static methods are reachable through ~self~ too).", sl: "~can_vote~ lahko pokliče ~self.is_adult(self.age)~ (statične metode so dosegljive tudi prek ~self~)." },
            ],
            solution: `class Sailor:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\n    @classmethod\n    def from_record(cls, text):\n        name, age = text.split(";")\n        return cls(name.strip(), int(age))\n\n    @staticmethod\n    def is_adult(age):\n        return age >= 18\n\n    def can_vote(self):\n        return self.is_adult(self.age)\n`,
          },
        ],
      },
      {
        id: "c13l5",
        title: { en: "Your Own Alarms", sl: "Tvoji alarmi" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `Errors are classes too. ~ValueError~ and ~KeyError~ inherit from ~Exception~. You can make your own the same way:
:::
class NotEnoughGold(Exception):
    pass

raise NotEnoughGold("Need 50 more doubloons")
:::
Custom exceptions make your code say exactly what went wrong, and callers can catch **your** problem without catching every other error by accident:
:::
try:
    purse.pay(200)
except NotEnoughGold as e:
    print("Can't pay:", e)
:::
Because they inherit, ~except Exception~ still catches them.`,
              sl: `Tudi napake so razredi. ~ValueError~ in ~KeyError~ dedujeta od ~Exception~. Na enak način lahko narediš svoje:
:::
class NotEnoughGold(Exception):
    pass

raise NotEnoughGold("Manjka še 50 dublonov")
:::
Lastne izjeme poskrbijo, da koda pove natanko, kaj je šlo narobe, klicatelji pa lahko ujamejo **tvojo** težavo, ne da bi pomotoma ujeli vse druge napake:
:::
try:
    purse.pay(200)
except NotEnoughGold as e:
    print("Ne morem plačati:", e)
:::
Ker dedujejo, jih ~except Exception~ še vedno ujame.`,
            },
            example: `class NotEnoughGold(Exception):\n    pass\n\nclass Purse:\n    def __init__(self, gold):\n        self.gold = gold\n\n    def pay(self, amount):\n        if amount > self.gold:\n            raise NotEnoughGold(f"Need {amount - self.gold} more doubloons")\n        self.gold -= amount\n\np = Purse(150)\nfor price in [100, 200]:\n    try:\n        p.pay(price)\n        print("Paid", price, "- left:", p.gold)\n    except NotEnoughGold as e:\n        print("Can't pay:", e)\n`,
          },
          {
            id: "s2", type: "code", kind: "task",
            text: {
              en: `1. Create an exception class ~InsufficientFunds~ that inherits from ~Exception~.
2. Write ~Purse(gold)~ with ~withdraw(amount)~: if there isn't enough gold, raise ~InsufficientFunds("Need 50 more doubloons")~ (with the real shortfall) and change nothing; otherwise subtract it and return the gold left.`,
              sl: `1. Ustvari razred izjeme ~InsufficientFunds~, ki deduje od ~Exception~.
2. Napiši ~Purse(gold)~ z ~withdraw(amount)~: če zlata ni dovolj, sproži ~InsufficientFunds("Need 50 more doubloons")~ (s pravim primanjkljajem) in ne spremeni ničesar; sicer ga odštej in vrni preostalo zlato.`,
            },
            starter: ``,
            tests: [
              { check: R`E = ns["InsufficientFunds"]
assert issubclass(E, Exception) and E is not Exception`, msg: { en: "InsufficientFunds should be a class that inherits from Exception.", sl: "InsufficientFunds naj bo razred, ki deduje od Exception." } },
              { check: R`p = ns["Purse"](100)
assert p.withdraw(30) == 70 and p.gold == 70 and p.withdraw(70) == 0`, msg: { en: "withdraw(30) from 100 should return 70; withdrawing exactly what's left is fine.", sl: "withdraw(30) od 100 naj vrne 70; dvig natanko preostanka je v redu." } },
              { check: R`p = ns["Purse"](100)
try:
    p.withdraw(150)
except ns["InsufficientFunds"] as e:
    assert str(e) == "Need 50 more doubloons", str(e)
else:
    raise AssertionError("no error")
assert p.gold == 100`, msg: { en: "withdraw(150) from 100 should raise InsufficientFunds(\"Need 50 more doubloons\") and leave the gold at 100.", sl: "withdraw(150) od 100 naj sproži InsufficientFunds(\"Need 50 more doubloons\") in pusti zlato na 100." } },
            ],
            hints: [
              { en: "~class InsufficientFunds(Exception): pass~ is a complete exception class.", sl: "~class InsufficientFunds(Exception): pass~ je popoln razred izjeme." },
              { en: "~raise InsufficientFunds(f\"Need {amount - self.gold} more doubloons\")~", sl: "~raise InsufficientFunds(f\"Need {amount - self.gold} more doubloons\")~" },
            ],
            solution: `class InsufficientFunds(Exception):\n    pass\n\nclass Purse:\n    def __init__(self, gold):\n        self.gold = gold\n\n    def withdraw(self, amount):\n        if amount > self.gold:\n            raise InsufficientFunds(f"Need {amount - self.gold} more doubloons")\n        self.gold -= amount\n        return self.gold\n`,
          },
        ],
      },
      {
        id: "c13l6",
        title: { en: "Solo Voyage: The Clockwork Compass", sl: "Samostojna plovba: Urni kompas" },
        solo: true,
        steps: [
          {
            id: "s1", type: "story", speaker: "pip",
            text: {
              en: `Squawk! The guild master has a commission for you. Navigators add and subtract headings all day: "two leagues north, three east, then back half the way". She wants a ~Vector~ that does it with plain maths symbols.

It must feel like it was always part of Python. If it needs a manual, she won't buy it.`,
              sl: `Skvak! Mojstrica ceha ima naročilo zate. Krmarji ves dan seštevajo in odštevajo smeri: "dve milji severno, tri vzhodno, nato pol poti nazaj". Želi ~Vector~, ki to naredi z navadnimi matematičnimi znaki.

Delovati mora, kot da je bil vedno del Pythona. Če potrebuje navodila, ga ne bo kupila.`,
            },
          },
          {
            id: "s2", type: "code", kind: "project",
            text: {
              en: `Write a class ~Vector(x, y)~.

- ~v + w~ and ~v - w~ return new Vectors
- ~v * 3~ returns a new Vector scaled by a number
- ~v == w~ when both x and y match (False for non-Vectors)
- ~abs(v)~ is its length, ~(x² + y²) ** 0.5~
- ~str(v)~ → ~(3, 4)~ and ~repr(v)~ → ~Vector(3, 4)~
- ~Vector.from_tuple((3, 4))~ builds one from a tuple (a classmethod)
- a read-only property ~is_zero~, True for ~Vector(0, 0)~

None of the operations should change the original vectors.`,
              sl: `Napiši razred ~Vector(x, y)~.

- ~v + w~ in ~v - w~ vrneta nova vektorja
- ~v * 3~ vrne nov vektor, pomnožen s številom
- ~v == w~, ko se ujemata x in y (False za ne-vektorje)
- ~abs(v)~ je njegova dolžina, ~(x² + y²) ** 0.5~
- ~str(v)~ → ~(3, 4)~ in ~repr(v)~ → ~Vector(3, 4)~
- ~Vector.from_tuple((3, 4))~ ga zgradi iz terke (classmethod)
- lastnost samo za branje ~is_zero~, True za ~Vector(0, 0)~

Nobena operacija ne sme spremeniti izvirnih vektorjev.`,
            },
            starter: `# Solo voyage: the Clockwork Compass\n`,
            tests: [
              { check: R`V = ns["Vector"]
a, b = V(1, 2), V(3, 4)
c = a + b; d = b - a
assert isinstance(c, V) and (c.x, c.y) == (4, 6) and (d.x, d.y) == (2, 2) and (a.x, a.y) == (1, 2)`, msg: { en: "Vector(1, 2) + Vector(3, 4) → Vector(4, 6), and Vector(3, 4) - Vector(1, 2) → Vector(2, 2), without changing the originals.", sl: "Vector(1, 2) + Vector(3, 4) → Vector(4, 6), Vector(3, 4) - Vector(1, 2) → Vector(2, 2), brez spreminjanja izvirnikov." } },
              { check: R`V = ns["Vector"]
m = V(1, -2) * 3
assert isinstance(m, V) and (m.x, m.y) == (3, -6)`, msg: { en: "Vector(1, -2) * 3 → Vector(3, -6)", sl: "Vector(1, -2) * 3 → Vector(3, -6)" } },
              { check: R`V = ns["Vector"]
assert V(1, 2) == V(1, 2) and not (V(1, 2) == V(2, 1)) and not (V(1, 2) == (1, 2))`, msg: { en: "== compares x and y; a Vector never equals a plain tuple.", sl: "== primerja x in y; vektor ni nikoli enak navadni terki." } },
              { check: R`V = ns["Vector"]
assert abs(V(3, 4)) == 5 and abs(V(0, 0)) == 0`, msg: { en: "abs(Vector(3, 4)) should be 5.", sl: "abs(Vector(3, 4)) naj bo 5." } },
              { check: R`V = ns["Vector"]
assert str(V(3, 4)) == "(3, 4)" and repr(V(3, 4)) == "Vector(3, 4)" and repr([V(1, 1)]) == "[Vector(1, 1)]"`, msg: { en: "str → (3, 4), repr → Vector(3, 4)", sl: "str → (3, 4), repr → Vector(3, 4)" } },
              { check: R`V = ns["Vector"]
v = V.from_tuple((5, -1))
assert isinstance(v, V) and (v.x, v.y) == (5, -1) and V(0, 0).is_zero and not V(0, 1).is_zero
try:
    V(1, 1).is_zero = True
except AttributeError:
    pass
else:
    raise AssertionError("read-only")`, msg: { en: "Vector.from_tuple((5, -1)) builds Vector(5, -1); is_zero is a read-only property.", sl: "Vector.from_tuple((5, -1)) zgradi Vector(5, -1); is_zero je lastnost samo za branje." } },
            ],
            hints: [
              { en: "One dunder per bullet: ~__add__~, ~__sub__~, ~__mul__~, ~__eq__~, ~__abs__~, ~__str__~, ~__repr__~. Each arithmetic one ends with ~return Vector(...)~.", sl: "Ena dunder metoda na alinejo: ~__add__~, ~__sub__~, ~__mul__~, ~__eq__~, ~__abs__~, ~__str__~, ~__repr__~. Vsaka računska se konča z ~return Vector(...)~." },
              { en: "~from_tuple~: ~@classmethod~, ~return cls(t[0], t[1])~ (or ~cls(*t)~). ~is_zero~: ~@property~ returning ~self.x == 0 and self.y == 0~.", sl: "~from_tuple~: ~@classmethod~, ~return cls(t[0], t[1])~ (ali ~cls(*t)~). ~is_zero~: ~@property~, ki vrne ~self.x == 0 and self.y == 0~." },
            ],
            solution: `class Vector:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    @classmethod\n    def from_tuple(cls, t):\n        return cls(*t)\n\n    def __add__(self, other):\n        return Vector(self.x + other.x, self.y + other.y)\n\n    def __sub__(self, other):\n        return Vector(self.x - other.x, self.y - other.y)\n\n    def __mul__(self, n):\n        return Vector(self.x * n, self.y * n)\n\n    def __eq__(self, other):\n        return isinstance(other, Vector) and self.x == other.x and self.y == other.y\n\n    def __abs__(self):\n        return (self.x ** 2 + self.y ** 2) ** 0.5\n\n    @property\n    def is_zero(self):\n        return self.x == 0 and self.y == 0\n\n    def __str__(self):\n        return f"({self.x}, {self.y})"\n\n    def __repr__(self):\n        return f"Vector({self.x}, {self.y})"\n\nheading = Vector(2, 0) + Vector(0, 3) - Vector(1, 1) * 0.5\nprint(heading, abs(heading))\n`,
            after: {
              en: "~cls(*t)~ uses the star to **unpack** a tuple into separate arguments: the mirror image of ~*args~.",
              sl: "~cls(*t)~ z zvezdico **razpakira** terko v ločene argumente: zrcalna slika ~*args~.",
            },
          },
        ],
      },
    ],
  };
})();
