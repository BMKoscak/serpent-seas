/* Island 14 — Crown of Objects: dataclasses, abstract classes, iterators & generators, decorators, context managers, capstone */
(function () {
  const R = String.raw;
  const WORLD = R`Item, Room, Player, play = ns["Item"], ns["Room"], ns["Player"], ns["play"]
deck = Room("Deck", "Salt spray and creaking ropes.")
hold = Room("Hold", "Dark and full of barrels.")
vault = Room("Vault", "Gold glitters everywhere.")
deck.connect("down", hold); hold.connect("up", deck)
hold.connect("north", vault); vault.connect("south", hold)
vault.items.append(Item("crown", 500)); vault.items.append(Item("map", 50))
hold.items.append(Item("rum", 5))
p = Player("Ben", deck)
`;
  (window.SS_ISLANDS = window.SS_ISLANDS || {}).c14 = {
    blurb: {
      en: "The last island, and the Crown itself. Master the tools professional Python is built from: dataclasses, abstract classes, generators, decorators and context managers. Then build a game engine on your own.",
      sl: "Zadnji otok in sama Krona. Obvladaj orodja, iz katerih je zgrajen profesionalni Python: podatkovne razrede, abstraktne razrede, generatorje, dekoratorje in upravljalnike konteksta. Nato sam zgradi igralni pogon.",
    },
    log: {
      en: `**Dataclasses** write ~__init__~, ~__repr__~ and ~__eq__~ for you:
:::
from dataclasses import dataclass, field

@dataclass
class Crate:
    item: str
    weight: int = 0
    tags: list = field(default_factory=list)   # never  = []
:::
~@dataclass(order=True)~ adds ~<~; ~frozen=True~ makes it read-only.

**Abstract classes** define what subclasses must provide:
:::
from abc import ABC, abstractmethod
class CrewMember(ABC):
    @abstractmethod
    def duty(self): ...
:::
**Generators** produce values lazily with ~yield~:
:::
def countdown(n):
    while n > 0:
        yield n
        n -= 1
:::
Give a class ~__iter__~ (often a generator) and ~for x in obj~ works.

**Decorators** wrap a function in another:
:::
from functools import wraps
def shout(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs).upper()
    return wrapper
:::
**Context managers**: ~__enter__~ runs at the start of ~with~, ~__exit__~ at the end, even after an error.`,
      sl: `**Podatkovni razredi** namesto tebe napišejo ~__init__~, ~__repr__~ in ~__eq__~:
:::
from dataclasses import dataclass, field

@dataclass
class Crate:
    item: str
    weight: int = 0
    tags: list = field(default_factory=list)   # nikoli  = []
:::
~@dataclass(order=True)~ doda ~<~; ~frozen=True~ ga naredi samo za branje.

**Abstraktni razredi** določijo, kaj morajo podrazredi zagotoviti:
:::
from abc import ABC, abstractmethod
class CrewMember(ABC):
    @abstractmethod
    def duty(self): ...
:::
**Generatorji** z ~yield~ ustvarjajo vrednosti sproti:
:::
def countdown(n):
    while n > 0:
        yield n
        n -= 1
:::
Razredu daj ~__iter__~ (pogosto generator) in ~for x in obj~ deluje.

**Dekoratorji** ovijejo funkcijo v drugo:
:::
from functools import wraps
def shout(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs).upper()
    return wrapper
:::
**Upravljalniki konteksta**: ~__enter__~ se izvede na začetku ~with~, ~__exit__~ na koncu, tudi po napaki.`,
    },
    lessons: [
      {
        id: "c14l1",
        title: { en: "Dataclasses", sl: "Podatkovni razredi" },
        steps: [
          {
            id: "s1", type: "story", speaker: "pip",
            text: {
              en: `Squawk... quiet now. This is it. **The Crown of Objects**, the last island on the chart.

The Crown sits in a vault at the top of the cliffs, and the legend says only a true programmer can claim it. Not someone who follows instructions. Someone who can build things **alone**.

You've come a long way from ~print("Ahoy, Captain!")~. Five more tools, then the final test. Let's climb.`,
              sl: `Skvak... zdaj tiho. To je to. **Krona objektov**, zadnji otok na karti.

Krona leži v trezorju na vrhu pečin in legenda pravi, da jo lahko prevzame le pravi programer. Ne nekdo, ki sledi navodilom. Nekdo, ki zna graditi **sam**.

Prepotoval si dolgo pot od ~print("Ahoy, Captain!")~. Še pet orodij, nato zadnji preizkus. Plezajva.`,
            },
          },
          {
            id: "s2", type: "learn",
            text: {
              en: `Many classes are mostly **data**: a crate with an item and a weight. Writing ~__init__~, ~__repr__~ and ~__eq__~ by hand for each gets old. A **dataclass** writes them for you from type annotations:
:::
from dataclasses import dataclass

@dataclass
class Crate:
    item: str
    weight: int = 0
:::
Now ~Crate("rope", 12)~ works, prints as ~Crate(item='rope', weight=12)~, and two crates with the same values are equal. You can still add your own methods.

For a list or dict default, use ~field(default_factory=list)~. A plain ~= []~ would be shared between every object, so Python refuses it.`,
              sl: `Veliko razredov je večinoma **podatkov**: zaboj s predmetom in težo. Ročno pisanje ~__init__~, ~__repr__~ in ~__eq__~ za vsakega postane naporno. **Podatkovni razred** (dataclass) jih napiše namesto tebe iz oznak tipov:
:::
from dataclasses import dataclass

@dataclass
class Crate:
    item: str
    weight: int = 0
:::
Zdaj ~Crate("rope", 12)~ deluje, izpiše se kot ~Crate(item='rope', weight=12)~, dva zaboja z istimi vrednostmi pa sta enaka. Še vedno lahko dodaš svoje metode.

Za privzeti seznam ali slovar uporabi ~field(default_factory=list)~. Navaden ~= []~ bi bil skupen vsem objektom, zato ga Python zavrne.`,
            },
            example: `from dataclasses import dataclass, field\n\n@dataclass\nclass Crate:\n    item: str\n    weight: int = 0\n    tags: list = field(default_factory=list)\n\n    def is_heavy(self):\n        return self.weight > 50\n\na = Crate("rope", 12)\nb = Crate("cannon", 80, ["iron"])\nprint(a)\nprint(b, b.is_heavy())\nprint(a == Crate("rope", 12))\n\n@dataclass(order=True)\nclass Rank:\n    level: int\n    title: str\n\nprint(sorted([Rank(3, "Gunner"), Rank(1, "Deckhand")]))\n`,
          },
          {
            id: "s3", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: int\n    y: int = 0\n\nprint(Point(1))\n`,
            options: ["Point(1)", "Point(x=1, y=0)", "<Point object>", "(1, 0)"],
            answer: 1,
            explain: { en: "The dataclass wrote a ~__repr__~ that shows every field by name, including the default for ~y~.", sl: "Podatkovni razred je napisal ~__repr__~, ki pokaže vsako polje z imenom, tudi privzeto vrednost za ~y~." },
          },
          {
            id: "s4", type: "code", kind: "task",
            text: {
              en: `1. Write a dataclass ~Crate~ with fields ~item~ (str), ~weight~ (int) and ~fragile~ (bool, default False).
2. Write a function ~heaviest(crates)~ that returns the heaviest Crate in a list.`,
              sl: `1. Napiši podatkovni razred ~Crate~ s polji ~item~ (str), ~weight~ (int) in ~fragile~ (bool, privzeto False).
2. Napiši funkcijo ~heaviest(crates)~, ki vrne najtežji Crate v seznamu.`,
            },
            starter: `from dataclasses import dataclass\n\n`,
            tests: [
              { check: R`C = ns["Crate"]
import dataclasses
assert dataclasses.is_dataclass(C)
assert C("rope", 3) == C("rope", 3) and C("rope", 3) != C("rope", 4)
assert repr(C("rope", 3)) == "Crate(item='rope', weight=3, fragile=False)" and C("vase", 2, True).fragile is True`, msg: { en: "Crate should be a dataclass with item, weight and fragile=False; repr is Crate(item='rope', weight=3, fragile=False).", sl: "Crate naj bo podatkovni razred z item, weight in fragile=False; repr je Crate(item='rope', weight=3, fragile=False)." } },
              { check: R`C = ns["Crate"]
crates = [C("rope", 12), C("cannon", 80), C("rum", 40)]
assert ns["heaviest"](crates) is crates[1]`, msg: { en: "heaviest should return the Crate object with the biggest weight.", sl: "heaviest naj vrne objekt Crate z največjo težo." } },
            ],
            hints: [
              { en: "Fields are written as ~name: type~ lines under ~@dataclass~, with ~fragile: bool = False~ last.", sl: "Polja zapišeš kot vrstice ~ime: tip~ pod ~@dataclass~, z ~fragile: bool = False~ na koncu." },
              { en: "~return max(crates, key=lambda c: c.weight)~", sl: "~return max(crates, key=lambda c: c.weight)~" },
            ],
            solution: `from dataclasses import dataclass\n\n@dataclass\nclass Crate:\n    item: str\n    weight: int\n    fragile: bool = False\n\ndef heaviest(crates):\n    return max(crates, key=lambda c: c.weight)\n`,
          },
          {
            id: "s5", type: "code", kind: "debug",
            text: {
              en: "Python refuses this dataclass. Fix the default so each pirate gets their own list, and it prints ~Pirate(name='Anne', loot=['gold'])~.",
              sl: "Python zavrne ta podatkovni razred. Popravi privzeto vrednost, da vsak pirat dobi svoj seznam, in naj izpiše ~Pirate(name='Anne', loot=['gold'])~.",
            },
            starter: `from dataclasses import dataclass\n\n@dataclass\nclass Pirate:\n    name: str\n    loot: list = []\n\nanne = Pirate("Anne")\nanne.loot.append("gold")\nprint(anne)\n`,
            tests: [
              { check: R`assert clean == ["Pirate(name='Anne', loot=['gold'])"]`, msg: { en: "It should print Pirate(name='Anne', loot=['gold'])", sl: "Izpisati mora Pirate(name='Anne', loot=['gold'])" } },
              { check: R`P = ns["Pirate"]
a, b = P("a"), P("b")
a.loot.append(1)
assert b.loot == []`, msg: { en: "Each pirate must get a separate list.", sl: "Vsak pirat mora dobiti ločen seznam." } },
            ],
            hints: [
              { en: "Read the error: it tells you exactly which tool to use.", sl: "Preberi napako: pove ti natanko, katero orodje uporabiti." },
              { en: "~from dataclasses import dataclass, field~ and ~loot: list = field(default_factory=list)~", sl: "~from dataclasses import dataclass, field~ in ~loot: list = field(default_factory=list)~" },
            ],
            solution: `from dataclasses import dataclass, field\n\n@dataclass\nclass Pirate:\n    name: str\n    loot: list = field(default_factory=list)\n\nanne = Pirate("Anne")\nanne.loot.append("gold")\nprint(anne)\n`,
          },
        ],
      },
      {
        id: "c14l2",
        title: { en: "Abstract Blueprints", sl: "Abstraktni načrti" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `Sometimes a parent class is only an idea. "A crew member" doesn't do anything until you know if they're a cook or a gunner. But every crew member **must** have a duty.

An **abstract base class** writes that rule into code:
:::
from abc import ABC, abstractmethod

class CrewMember(ABC):
    @abstractmethod
    def duty(self):
        ...
:::
- You can't create a ~CrewMember~ directly: Python raises ~TypeError~.
- A subclass that forgets to define ~duty~ can't be created either.

It turns "please remember to write this method" into a guarantee.`,
              sl: `Včasih je starševski razred samo ideja. "Član posadke" ne naredi ničesar, dokler ne veš, ali je kuhar ali topničar. A vsak član posadke **mora** imeti dolžnost.

**Abstraktni osnovni razred** to pravilo zapiše v kodo:
:::
from abc import ABC, abstractmethod

class CrewMember(ABC):
    @abstractmethod
    def duty(self):
        ...
:::
- ~CrewMember~ ne moreš ustvariti neposredno: Python sproži ~TypeError~.
- Tudi podrazreda, ki pozabi definirati ~duty~, ni mogoče ustvariti.

"Prosim, ne pozabi napisati te metode" spremeni v jamstvo.`,
            },
            example: `from abc import ABC, abstractmethod\n\nclass CrewMember(ABC):\n    def __init__(self, name):\n        self.name = name\n\n    @abstractmethod\n    def duty(self):\n        ...\n\nclass Cook(CrewMember):\n    def duty(self):\n        return f"{self.name} cooks the stew"\n\nprint(Cook("Mary").duty())\n\nfor make in (lambda: CrewMember("x"), lambda: type("Lazy", (CrewMember,), {})("y")):\n    try:\n        make()\n    except TypeError as e:\n        print("TypeError:", e)\n`,
          },
          {
            id: "s2", type: "code", kind: "task",
            text: {
              en: `1. Write an abstract class ~CrewMember(ABC)~ with ~__init__(self, name)~ and an abstract method ~duty()~.
2. ~Cook~: ~duty()~ returns ~"Mary cooks the stew"~ (with the name).
3. ~Gunner~: ~duty()~ returns ~"Jack fires the cannons"~.
4. ~roll_call(crew)~ returns a list of every member's duty, in order.`,
              sl: `1. Napiši abstraktni razred ~CrewMember(ABC)~ z ~__init__(self, name)~ in abstraktno metodo ~duty()~.
2. ~Cook~: ~duty()~ vrne ~"Mary cooks the stew"~ (z imenom).
3. ~Gunner~: ~duty()~ vrne ~"Jack fires the cannons"~.
4. ~roll_call(crew)~ vrne seznam dolžnosti vseh članov, po vrsti.`,
            },
            starter: `from abc import ABC, abstractmethod\n\n`,
            tests: [
              { check: R`CM = ns["CrewMember"]
try:
    CM("x")
except TypeError:
    pass
else:
    raise AssertionError("abstract")
class Lazy(CM):
    pass
try:
    Lazy("y")
except TypeError:
    pass
else:
    raise AssertionError("lazy")`, msg: { en: "CrewMember(\"x\") should raise TypeError, and so should a subclass that doesn't define duty(). Use ABC and @abstractmethod.", sl: "CrewMember(\"x\") naj sproži TypeError, prav tako podrazred, ki ne definira duty(). Uporabi ABC in @abstractmethod." } },
              { check: R`assert ns["Cook"]("Mary").duty() == "Mary cooks the stew" and ns["Gunner"]("Jack").duty() == "Jack fires the cannons" and issubclass(ns["Cook"], ns["CrewMember"]) and issubclass(ns["Gunner"], ns["CrewMember"])`, msg: { en: "Cook(\"Mary\").duty() → \"Mary cooks the stew\", Gunner(\"Jack\").duty() → \"Jack fires the cannons\", both subclasses of CrewMember.", sl: "Cook(\"Mary\").duty() → \"Mary cooks the stew\", Gunner(\"Jack\").duty() → \"Jack fires the cannons\", oba podrazreda CrewMember." } },
              { check: R`crew = [ns["Gunner"]("Bo"), ns["Cook"]("Ada")]
assert ns["roll_call"](crew) == ["Bo fires the cannons", "Ada cooks the stew"] and ns["roll_call"]([]) == []`, msg: { en: "roll_call should return the list of duties in order.", sl: "roll_call naj vrne seznam dolžnosti po vrsti." } },
            ],
            hints: [
              { en: "The subclasses don't need their own ~__init__~; they inherit ~CrewMember~'s.", sl: "Podrazreda ne potrebujeta svojega ~__init__~; podedujeta ga od ~CrewMember~." },
              { en: "~roll_call~: ~return [m.duty() for m in crew]~", sl: "~roll_call~: ~return [m.duty() for m in crew]~" },
            ],
            solution: `from abc import ABC, abstractmethod\n\nclass CrewMember(ABC):\n    def __init__(self, name):\n        self.name = name\n\n    @abstractmethod\n    def duty(self):\n        ...\n\nclass Cook(CrewMember):\n    def duty(self):\n        return f"{self.name} cooks the stew"\n\nclass Gunner(CrewMember):\n    def duty(self):\n        return f"{self.name} fires the cannons"\n\ndef roll_call(crew):\n    return [m.duty() for m in crew]\n`,
          },
        ],
      },
      {
        id: "c14l3",
        title: { en: "Generators", sl: "Generatorji" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `A ~for~ loop works by asking an object for its **next** value, again and again, until it runs out. You can produce values that way yourself with a **generator**: a function that uses ~yield~ instead of ~return~.
:::
def countdown(n):
    while n > 0:
        yield n
        n -= 1
:::
Each ~yield~ hands out one value and **pauses** the function right there. The next request resumes it from the same spot.

Generators are **lazy**: they make values only when asked, so they can even go on forever without filling memory. ~list(gen)~ collects everything; ~next(gen)~ gets just one.

To make your own class work in a ~for~ loop, give it an ~__iter__~ method. Writing it as a generator is the easiest way.`,
              sl: `Zanka ~for~ deluje tako, da objekt vedno znova prosi za **naslednjo** vrednost, dokler jih ne zmanjka. Vrednosti lahko tako ustvarjaš sam z **generatorjem**: funkcijo, ki uporablja ~yield~ namesto ~return~.
:::
def countdown(n):
    while n > 0:
        yield n
        n -= 1
:::
Vsak ~yield~ izroči eno vrednost in funkcijo tam **zaustavi**. Naslednja zahteva jo nadaljuje z istega mesta.

Generatorji so **leni**: vrednosti ustvarijo šele, ko jih zahtevaš, zato lahko tečejo celo v nedogled, ne da bi napolnili pomnilnik. ~list(gen)~ zbere vse; ~next(gen)~ vzame le eno.

Da tvoj razred deluje v zanki ~for~, mu daj metodo ~__iter__~. Najlažje jo napišeš kot generator.`,
            },
            example: `def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n\nfor x in countdown(3):\n    print(x)\n\ngen = countdown(5)\nprint(next(gen), next(gen))\nprint(list(gen))\n\ndef forever_waves():\n    n = 1\n    while True:\n        yield "~" * n\n        n += 1\n\nwaves = forever_waves()\nfor _ in range(4):\n    print(next(waves))\n\nprint(sum(x * x for x in range(10)))\n`,
          },
          {
            id: "s2", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `def evens(limit):\n    for n in range(limit):\n        if n % 2 == 0:\n            yield n\n\ng = evens(7)\nprint(next(g), list(g))\n`,
            options: ["0 [0, 2, 4, 6]", "0 [2, 4, 6]", "[0, 2, 4, 6] []", "0 2"],
            answer: 1,
            explain: { en: "~next(g)~ takes the first value, 0. The generator remembers where it stopped, so ~list(g)~ collects only what's left.", sl: "~next(g)~ vzame prvo vrednost, 0. Generator si zapomni, kje se je ustavil, zato ~list(g)~ zbere le preostanek." },
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `Tides turn every 6 hours. Write a **generator** ~tide_times(start, count)~ that yields ~count~ hours, starting at ~start~ and adding 6 each time, wrapping round a 24-hour clock.

~list(tide_times(22, 3))~ → ~[22, 4, 10]~`,
              sl: `Plima se obrne vsakih 6 ur. Napiši **generator** ~tide_times(start, count)~, ki vrne ~count~ ur, začenši s ~start~ in vsakič prišteje 6, z zavijanjem po 24-urni uri.

~list(tide_times(22, 3))~ → ~[22, 4, 10]~`,
            },
            starter: ``,
            tests: [
              { check: R`import inspect
assert inspect.isgeneratorfunction(ns["tide_times"])`, msg: { en: "tide_times should be a generator function (use yield).", sl: "tide_times naj bo generatorska funkcija (uporabi yield)." } },
              { check: R`f = ns["tide_times"]
assert list(f(22, 3)) == [22, 4, 10] and list(f(0, 5)) == [0, 6, 12, 18, 0] and list(f(5, 0)) == []`, msg: { en: "tide_times(22, 3) → [22, 4, 10]; tide_times(0, 5) → [0, 6, 12, 18, 0]; count 0 gives nothing.", sl: "tide_times(22, 3) → [22, 4, 10]; tide_times(0, 5) → [0, 6, 12, 18, 0]; count 0 ne da ničesar." } },
            ],
            hints: [
              { en: "Loop ~count~ times; yield the current hour, then add 6.", sl: "Ponovi ~count~-krat; vrni trenutno uro, nato prištej 6." },
              { en: "~hour = (hour + 6) % 24~ keeps it on the clock.", sl: "~hour = (hour + 6) % 24~ jo ohrani na uri." },
            ],
            solution: `def tide_times(start, count):\n    hour = start\n    for _ in range(count):\n        yield hour\n        hour = (hour + 6) % 24\n`,
          },
          {
            id: "s4", type: "code", kind: "task",
            text: {
              en: `Write ~Fleet~ with ~add(name)~, and make it **iterable**: ~for name in fleet~ gives the ship names in **alphabetical order**. Write ~__iter__~ as a generator.`,
              sl: `Napiši ~Fleet~ z ~add(name)~ in ga naredi **iterabilnega**: ~for name in fleet~ da imena ladij po **abecedi**. ~__iter__~ napiši kot generator.`,
            },
            starter: ``,
            tests: [
              { check: R`f = ns["Fleet"]()
for n in ("Serpent", "Kraken", "Albatross"):
    f.add(n)
assert list(f) == ["Albatross", "Kraken", "Serpent"] and [x for x in f] == ["Albatross", "Kraken", "Serpent"]`, msg: { en: "After adding Serpent, Kraken, Albatross, looping should give Albatross, Kraken, Serpent (and work more than once).", sl: "Po dodajanju Serpent, Kraken, Albatross naj zanka da Albatross, Kraken, Serpent (in naj deluje večkrat)." } },
              { check: R`assert list(ns["Fleet"]()) == [] and "yield" in code`, msg: { en: "An empty fleet gives nothing; use yield in __iter__.", sl: "Prazna flota ne da ničesar; v __iter__ uporabi yield." } },
            ],
            hints: [
              { en: "Store names in a list created in ~__init__~.", sl: "Imena shrani v seznam, ustvarjen v ~__init__~." },
              { en: "~def __iter__(self): for name in sorted(self.names): yield name~", sl: "~def __iter__(self): for name in sorted(self.names): yield name~" },
            ],
            solution: `class Fleet:\n    def __init__(self):\n        self.names = []\n\n    def add(self, name):\n        self.names.append(name)\n\n    def __iter__(self):\n        for name in sorted(self.names):\n            yield name\n`,
          },
        ],
      },
      {
        id: "c14l4",
        title: { en: "Decorators", sl: "Dekoratorji" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `Functions are objects, so a function can **take** a function and **return** a new one that wraps it. That's a **decorator**:
:::
def shout(func):
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return result.upper()
    return wrapper
:::
- ~wrapper~ accepts any arguments (~*args, **kwargs~) and passes them straight to the original.
- It can do things before and after the original runs.

The ~@~ line is shorthand for ~greet = shout(greet)~:
:::
@shout
def greet(name):
    return f"ahoy {name}"
:::
Add ~@wraps(func)~ from ~functools~ on the wrapper so the decorated function keeps its name and docstring. You've already used decorators: ~@property~, ~@classmethod~, ~@dataclass~.`,
              sl: `Funkcije so objekti, zato lahko funkcija **sprejme** funkcijo in **vrne** novo, ki jo ovije. To je **dekorator**:
:::
def shout(func):
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return result.upper()
    return wrapper
:::
- ~wrapper~ sprejme poljubne argumente (~*args, **kwargs~) in jih poda naprej izvirniku.
- Lahko naredi kaj pred in po izvedbi izvirnika.

Vrstica z ~@~ je okrajšava za ~greet = shout(greet)~:
:::
@shout
def greet(name):
    return f"ahoj {name}"
:::
Na ovojnico dodaj ~@wraps(func)~ iz ~functools~, da dekorirana funkcija obdrži ime in docstring. Dekoratorje si že uporabljal: ~@property~, ~@classmethod~, ~@dataclass~.`,
            },
            example: `from functools import wraps\n\ndef announce(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        print(f"-> calling {func.__name__}{args}")\n        result = func(*args, **kwargs)\n        print(f"<- {func.__name__} returned {result!r}")\n        return result\n    return wrapper\n\n@announce\ndef share(loot, crew):\n    return loot // crew\n\nshare(100, 7)\nprint(share.__name__)\n`,
          },
          {
            id: "s2", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `def loud(f):\n    def wrapper():\n        return f().upper() + "!"\n    return wrapper\n\n@loud\ndef greet():\n    return "ahoy"\n\nprint(greet())\n`,
            options: ["ahoy", "AHOY", "AHOY!", "ahoy!"],
            answer: 2,
            explain: { en: "~@loud~ replaced ~greet~ with ~wrapper~. Calling it runs the original, then uppercases the result and adds \"!\".", sl: "~@loud~ je ~greet~ zamenjal z ~wrapper~. Klic izvede izvirnik, nato rezultat spremeni v velike črke in doda \"!\"." },
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `Write a decorator ~shout~ that makes any text-returning function return its result in UPPERCASE with ~"!"~ added. It must work with functions that take arguments, and keep the original name (use ~functools.wraps~).

~@shout~ on ~def order(what, who): return f"{what}, {who}"~ makes ~order("fire", "Jack")~ return ~"FIRE, JACK!"~`,
              sl: `Napiši dekorator ~shout~, zaradi katerega katera koli funkcija, ki vrača besedilo, vrne rezultat z VELIKIMI črkami in dodanim ~"!"~. Delovati mora s funkcijami, ki sprejemajo argumente, in ohraniti izvirno ime (uporabi ~functools.wraps~).

~@shout~ na ~def order(what, who): return f"{what}, {who}"~ naredi, da ~order("fire", "Jack")~ vrne ~"FIRE, JACK!"~`,
            },
            starter: `from functools import wraps\n\n`,
            tests: [
              { check: R`shout = ns["shout"]
@shout
def order(what, who):
    return f"{what}, {who}"
@shout
def hello():
    return "ahoy"
assert order("fire", "Jack") == "FIRE, JACK!" and order(who="Pip", what="sing") == "SING, PIP!" and hello() == "AHOY!"`, msg: { en: "Decorated functions should return UPPERCASE text plus \"!\", with positional and keyword arguments passed through.", sl: "Dekorirane funkcije naj vrnejo besedilo z VELIKIMI črkami in \"!\", pozicijski in imenovani argumenti pa naj se podajo naprej." } },
              { check: R`@ns["shout"]
def my_name():
    return "x"
assert my_name.__name__ == "my_name"`, msg: { en: "Use @wraps(func) so the decorated function keeps its name.", sl: "Uporabi @wraps(func), da dekorirana funkcija obdrži ime." } },
            ],
            hints: [
              { en: "Inside ~shout(func)~, define ~wrapper(*args, **kwargs)~ that calls ~func(*args, **kwargs)~.", sl: "V ~shout(func)~ definiraj ~wrapper(*args, **kwargs)~, ki pokliče ~func(*args, **kwargs)~." },
              { en: "~return func(*args, **kwargs).upper() + \"!\"~, put ~@wraps(func)~ above ~def wrapper~, and ~return wrapper~ at the end.", sl: "~return func(*args, **kwargs).upper() + \"!\"~, nad ~def wrapper~ postavi ~@wraps(func)~ in na koncu ~return wrapper~." },
            ],
            solution: `from functools import wraps\n\ndef shout(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs).upper() + "!"\n    return wrapper\n`,
          },
          {
            id: "s4", type: "code", kind: "task",
            text: {
              en: `Write a decorator ~count_calls~ that counts how many times a function has been called. The count lives in an attribute ~calls~ on the decorated function, starting at 0. The function must still return its normal result.`,
              sl: `Napiši dekorator ~count_calls~, ki šteje, kolikokrat je bila funkcija poklicana. Število živi v atributu ~calls~ dekorirane funkcije in se začne z 0. Funkcija mora še vedno vrniti svoj običajni rezultat.`,
            },
            starter: `from functools import wraps\n\n`,
            tests: [
              { check: R`cc = ns["count_calls"]
@cc
def add(a, b):
    return a + b
assert add.calls == 0
assert add(2, 3) == 5 and add(1, 1) == 2 and add.calls == 2 and add.__name__ == "add"`, msg: { en: "A decorated add should start with calls == 0, still return a + b, count each call, and keep its name.", sl: "Dekoriran add naj začne s calls == 0, še vedno vrne a + b, šteje vsak klic in obdrži ime." } },
              { check: R`cc = ns["count_calls"]
@cc
def a():
    return 1
@cc
def b():
    return 2
a(); a(); b()
assert a.calls == 2 and b.calls == 1`, msg: { en: "Each decorated function keeps its own count.", sl: "Vsaka dekorirana funkcija vodi svoje štetje." } },
            ],
            hints: [
              { en: "Functions are objects, so you can set an attribute on the wrapper: ~wrapper.calls = 0~ (after defining it, before returning it).", sl: "Funkcije so objekti, zato lahko ovojnici nastaviš atribut: ~wrapper.calls = 0~ (po definiciji, pred vrnitvijo)." },
              { en: "Inside the wrapper: ~wrapper.calls += 1~, then ~return func(*args, **kwargs)~.", sl: "V ovojnici: ~wrapper.calls += 1~, nato ~return func(*args, **kwargs)~." },
            ],
            solution: `from functools import wraps\n\ndef count_calls(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        wrapper.calls += 1\n        return func(*args, **kwargs)\n    wrapper.calls = 0\n    return wrapper\n`,
          },
        ],
      },
      {
        id: "c14l5",
        title: { en: "Context Managers", sl: "Upravljalniki konteksta" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `You've written ~with open(...) as f:~ many times. ~with~ guarantees cleanup: the file is closed even if an error happens inside.

Any class can work with ~with~ by defining two methods:
- ~__enter__(self)~ runs at the start. Whatever it returns goes into the ~as~ variable.
- ~__exit__(self, exc_type, exc, tb)~ runs at the end, **always**, even after an error. Return ~False~ (or nothing) to let the error carry on.

Use it for anything that must be undone: lighting and putting out a lantern, opening and closing a hatch, taking and returning a key.`,
              sl: `~with open(...) as f:~ si napisal že velikokrat. ~with~ zagotavlja pospravljanje: datoteka se zapre, tudi če se v notranjosti zgodi napaka.

Vsak razred lahko deluje z ~with~, če definira dve metodi:
- ~__enter__(self)~ se izvede na začetku. Kar vrne, gre v spremenljivko ~as~.
- ~__exit__(self, exc_type, exc, tb)~ se izvede na koncu, **vedno**, tudi po napaki. Vrni ~False~ (ali nič), da napaka nadaljuje.

Uporabi ga za vse, kar je treba razveljaviti: prižig in ugasnitev svetilke, odpiranje in zapiranje lopute, prevzem in vrnitev ključa.`,
            },
            example: `class Hatch:\n    def __init__(self, name):\n        self.name = name\n\n    def __enter__(self):\n        print(f"{self.name} hatch opened")\n        return self\n\n    def __exit__(self, exc_type, exc, tb):\n        print(f"{self.name} hatch closed")\n        return False\n\nwith Hatch("Cargo") as h:\n    print("Loading through the", h.name, "hatch")\n\ntry:\n    with Hatch("Powder"):\n        raise ValueError("spark!")\nexcept ValueError as e:\n    print("Error after closing:", e)\n`,
          },
          {
            id: "s2", type: "code", kind: "task",
            text: {
              en: `Write a context manager class ~Lantern(name)~:
- entering prints ~Lantern lit~ and returns the lantern itself
- leaving prints ~Lantern out~, **even if an error happened**, and doesn't hide the error

So ~with Lantern("Pip") as l: print(l.name)~ prints ~Lantern lit~, ~Pip~, ~Lantern out~.`,
              sl: `Napiši razred upravljalnika konteksta ~Lantern(name)~:
- vstop izpiše ~Lantern lit~ in vrne svetilko samo
- izstop izpiše ~Lantern out~, **tudi če se je zgodila napaka**, in napake ne skrije

Tako ~with Lantern("Pip") as l: print(l.name)~ izpiše ~Lantern lit~, ~Pip~, ~Lantern out~.`,
            },
            starter: ``,
            tests: [
              { check: R`L = ns["Lantern"]
def use():
    with L("Pip") as l:
        print(l.name)
r, o = capture(use)
assert [x.strip() for x in o.splitlines() if x.strip()] == ["Lantern lit", "Pip", "Lantern out"]`, msg: { en: "with Lantern(\"Pip\") as l: print(l.name) should print Lantern lit, Pip, Lantern out. __enter__ must return self.", sl: "with Lantern(\"Pip\") as l: print(l.name) naj izpiše Lantern lit, Pip, Lantern out. __enter__ mora vrniti self." } },
              { check: R`L = ns["Lantern"]
def boom():
    with L("x"):
        raise KeyError("wind")
try:
    r, o = capture(boom)
except KeyError:
    pass
else:
    raise AssertionError("error was swallowed")`, msg: { en: "If an error happens inside the with block, it should still reach the caller (__exit__ must not return True).", sl: "Če se v bloku with zgodi napaka, mora še vedno priti do klicatelja (__exit__ ne sme vrniti True)." } },
              { check: R`import io, sys
L = ns["Lantern"]
buf = io.StringIO(); old = sys.stdout; sys.stdout = buf
try:
    with L("x"):
        raise KeyError("wind")
except KeyError:
    pass
finally:
    sys.stdout = old
assert "Lantern out" in buf.getvalue()`, msg: { en: "Lantern out must be printed even when an error happens inside the with block.", sl: "Lantern out se mora izpisati, tudi ko se v bloku with zgodi napaka." } },
            ],
            hints: [
              { en: "~__enter__(self)~ prints and ~return self~.", sl: "~__enter__(self)~ izpiše in ~return self~." },
              { en: "~__exit__(self, exc_type, exc, tb)~ prints and ~return False~.", sl: "~__exit__(self, exc_type, exc, tb)~ izpiše in ~return False~." },
            ],
            solution: `class Lantern:\n    def __init__(self, name):\n        self.name = name\n\n    def __enter__(self):\n        print("Lantern lit")\n        return self\n\n    def __exit__(self, exc_type, exc, tb):\n        print("Lantern out")\n        return False\n`,
          },
        ],
      },
      {
        id: "c14l6",
        title: { en: "Final Voyage: The Crown of Objects", sl: "Zadnja plovba: Krona objektov" },
        solo: true,
        steps: [
          {
            id: "s1", type: "story", speaker: "captain",
            text: {
              en: `This is the vault, sailor. No more lessons beyond this door.

The Crown isn't a trophy you pick up. Legend says it's an **engine**: a little world of rooms, treasures and an explorer, all made of objects. Whoever builds it from nothing, with only the order in front of them, earns the Crown.

Pip and I will wait outside. You don't need us any more.`,
              sl: `To je trezor, mornar. Za temi vrati ni več lekcij.

Krona ni trofeja, ki jo pobereš. Legenda pravi, da je **pogon**: majhen svet sob, zakladov in raziskovalca, vse iz objektov. Kdor ga zgradi iz nič, s samim naročilom pred sabo, si prisluži Krono.

S Pipom bova počakala zunaj. Naju ne potrebuješ več.`,
            },
          },
          {
            id: "s2", type: "code", kind: "project",
            text: {
              en: `Build a tiny text-adventure engine. The tests build their own world from your classes, so names and messages must match exactly.

**~Item~** a dataclass with ~name: str~ and ~value: int~.

**~Room(name, description)~** with an ~items~ list and an ~exits~ dict (direction → Room), both starting empty.
- ~connect(direction, room)~ adds a one-way exit.

**~Player(name, location)~** where ~location~ is a Room. Starts with an empty ~inventory~ list.
- ~move(direction)~: if the exit exists, move there and return True; otherwise return False.
- ~take(item_name)~: if an item with that name is in the room, move it into the inventory and return True; otherwise False.
- ~score~: a read-only property, the total ~value~ of the inventory.

**~play(player, commands)~** runs a list of command strings, prints one response each, and returns the final score:
- ~look~ → ~Deck: Salt spray and creaking ropes.~ then, if the room has items, ~You see: crown, map~ (alphabetical)
- ~go north~ → ~You go north to Vault~ or ~You can't go that way~
- ~take crown~ → ~Taken: crown~ or ~There is no crown here~
- ~inventory~ → ~You carry: crown, rum~ (alphabetical) or ~You carry nothing~
- anything else → ~I don't understand~`,
              sl: `Zgradi majhen pogon za besedilno pustolovščino. Preizkusi iz tvojih razredov zgradijo svoj svet, zato se morajo imena in sporočila natanko ujemati.

**~Item~** podatkovni razred z ~name: str~ in ~value: int~.

**~Room(name, description)~** s seznamom ~items~ in slovarjem ~exits~ (smer → Room), oba na začetku prazna.
- ~connect(direction, room)~ doda enosmerni izhod.

**~Player(name, location)~**, kjer je ~location~ objekt Room. Začne s praznim seznamom ~inventory~.
- ~move(direction)~: če izhod obstaja, se premakni tja in vrni True; sicer vrni False.
- ~take(item_name)~: če je v sobi predmet s tem imenom, ga premakni v inventar in vrni True; sicer False.
- ~score~: lastnost samo za branje, skupna ~value~ inventarja.

**~play(player, commands)~** izvede seznam ukazov, za vsakega izpiše en odgovor in vrne končni rezultat:
- ~look~ → ~Deck: Salt spray and creaking ropes.~ nato, če so v sobi predmeti, ~You see: crown, map~ (po abecedi)
- ~go north~ → ~You go north to Vault~ ali ~You can't go that way~
- ~take crown~ → ~Taken: crown~ ali ~There is no crown here~
- ~inventory~ → ~You carry: crown, rum~ (po abecedi) ali ~You carry nothing~
- karkoli drugega → ~I don't understand~`,
            },
            starter: `# Final voyage: build the engine from nothing.\nfrom dataclasses import dataclass, field\n`,
            tests: [
              { check: R`import dataclasses
Item = ns["Item"]
assert dataclasses.is_dataclass(Item) and Item("crown", 500) == Item("crown", 500) and Item("map", 50).value == 50`, msg: { en: "Item should be a dataclass with name and value: Item(\"crown\", 500) == Item(\"crown\", 500).", sl: "Item naj bo podatkovni razred z name in value: Item(\"crown\", 500) == Item(\"crown\", 500)." } },
              { check: WORLD + R`assert deck.items == [] and deck.exits["down"] is hold and "north" not in deck.exits
assert Room("A", "b").exits == {} and Room("A", "b").items is not Room("C", "d").items`, msg: { en: "Room needs its own empty items list and exits dict; connect(direction, room) adds an exit.", sl: "Room potrebuje svoj prazen seznam items in slovar exits; connect(direction, room) doda izhod." } },
              { check: WORLD + R`assert p.location is deck and p.inventory == [] and p.score == 0
assert p.move("north") is False and p.location is deck
assert p.move("down") is True and p.location is hold
assert p.take("crown") is False and p.take("rum") is True and hold.items == [] and p.score == 5`, msg: { en: "Player: move returns True/False and changes location only when the exit exists; take moves an item from the room into the inventory; score adds up item values.", sl: "Player: move vrne True/False in spremeni lokacijo le, ko izhod obstaja; take premakne predmet iz sobe v inventar; score sešteje vrednosti predmetov." } },
              { check: WORLD + R`try:
    p.score = 999
except AttributeError:
    pass
else:
    raise AssertionError("score should be read-only")`, msg: { en: "score should be a read-only property.", sl: "score naj bo lastnost samo za branje." } },
              { check: WORLD + R`r, o = capture(play, p, ["look", "go down", "take rum", "go north", "look", "take crown", "take sword", "go west", "inventory", "dance"])
got = [l.strip() for l in o.splitlines() if l.strip()]
want = ["Deck: Salt spray and creaking ropes.", "You go down to Hold", "Taken: rum", "You go north to Vault", "Vault: Gold glitters everywhere.", "You see: crown, map", "Taken: crown", "There is no sword here", "You can't go that way", "You carry: crown, rum", "I don't understand"]
assert got == want, got
assert r == 505`, msg: { en: "play() output doesn't match. Expected, in order: Deck: Salt spray and creaking ropes. / You go down to Hold / Taken: rum / You go north to Vault / Vault: Gold glitters everywhere. / You see: crown, map / Taken: crown / There is no sword here / You can't go that way / You carry: crown, rum / I don't understand, and a returned score of 505.", sl: "Izpis play() se ne ujema. Pričakovano po vrsti: Deck: Salt spray and creaking ropes. / You go down to Hold / Taken: rum / You go north to Vault / Vault: Gold glitters everywhere. / You see: crown, map / Taken: crown / There is no sword here / You can't go that way / You carry: crown, rum / I don't understand, vrnjen rezultat pa 505." } },
              { check: WORLD + R`r, o = capture(play, p, ["inventory", "go", "take"])
got = [l.strip() for l in o.splitlines() if l.strip()]
assert got == ["You carry nothing", "I don't understand", "I don't understand"] and r == 0, got`, msg: { en: "An empty inventory prints You carry nothing, and \"go\" or \"take\" with nothing after them print I don't understand.", sl: "Prazen inventar izpiše You carry nothing, \"go\" ali \"take\" brez nadaljevanja pa I don't understand." } },
            ],
            hints: [
              { en: "Build in order and test each piece: Item, then Room, then Player, then play. Create a small world at the bottom of your file and try things as you go.", sl: "Gradi po vrsti in preizkusi vsak del: Item, nato Room, nato Player, nato play. Na dnu datoteke ustvari majhen svet in sproti preizkušaj." },
              { en: "In ~play~, split each command once: ~parts = command.split(maxsplit=1)~. Then check ~parts[0]~ and ~len(parts)~. Use ~player.move~ and ~player.take~ so the logic lives in one place.", sl: "V ~play~ vsak ukaz razdeli enkrat: ~parts = command.split(maxsplit=1)~. Nato preveri ~parts[0]~ in ~len(parts)~. Uporabi ~player.move~ in ~player.take~, da logika živi na enem mestu." },
            ],
            solution: `from dataclasses import dataclass, field\n\n@dataclass\nclass Item:\n    name: str\n    value: int\n\nclass Room:\n    def __init__(self, name, description):\n        self.name = name\n        self.description = description\n        self.items = []\n        self.exits = {}\n\n    def connect(self, direction, room):\n        self.exits[direction] = room\n\nclass Player:\n    def __init__(self, name, location):\n        self.name = name\n        self.location = location\n        self.inventory = []\n\n    def move(self, direction):\n        if direction in self.location.exits:\n            self.location = self.location.exits[direction]\n            return True\n        return False\n\n    def take(self, item_name):\n        for item in self.location.items:\n            if item.name == item_name:\n                self.location.items.remove(item)\n                self.inventory.append(item)\n                return True\n        return False\n\n    @property\n    def score(self):\n        return sum(item.value for item in self.inventory)\n\ndef names(items):\n    return ", ".join(sorted(i.name for i in items))\n\ndef play(player, commands):\n    for command in commands:\n        parts = command.split(maxsplit=1)\n        verb = parts[0] if parts else ""\n        if verb == "look" and len(parts) == 1:\n            room = player.location\n            print(f"{room.name}: {room.description}")\n            if room.items:\n                print("You see:", names(room.items))\n        elif verb == "go" and len(parts) == 2:\n            if player.move(parts[1]):\n                print(f"You go {parts[1]} to {player.location.name}")\n            else:\n                print("You can't go that way")\n        elif verb == "take" and len(parts) == 2:\n            if player.take(parts[1]):\n                print("Taken:", parts[1])\n            else:\n                print(f"There is no {parts[1]} here")\n        elif verb == "inventory" and len(parts) == 1:\n            if player.inventory:\n                print("You carry:", names(player.inventory))\n            else:\n                print("You carry nothing")\n        else:\n            print("I don't understand")\n    return player.score\n`,
            after: {
              en: "You built a game engine from an empty file: data classes, objects that hold other objects, properties, and a command loop tying it together. That's real software.",
              sl: "Iz prazne datoteke si zgradil igralni pogon: podatkovne razrede, objekte, ki vsebujejo druge objekte, lastnosti in ukazno zanko, ki vse poveže. To je prava programska oprema.",
            },
          },
          {
            id: "s3", type: "story", speaker: "pip",
            text: {
              en: `SQUAWK! The vault door swings open. And there it is: **the Crown of Objects**.

Remember the docks at Tortuga? You didn't know what a string was. Now you build classes, generators and decorators, and you just wrote an engine on your own, with nobody holding your hand.

You're not a deckhand any more. You're a **programmer**.

Some ideas for your next voyages, all buildable with what you know:
- Extend the adventure engine: locked doors, keys, saving the game to a file.
- A command-line budget tracker that reads and writes CSV files.
- A quiz game with questions loaded from a file and a high-score table.
- Recreate one of the solo voyages from memory, without peeking. Then make it better.

The **Workshop** is always open for experiments, and the **Captain's Log** keeps every cheat sheet. Fair winds, Captain.`,
              sl: `SKVAK! Vrata trezorja se odprejo. In tam je: **Krona objektov**.

Se spomniš pomola v Tortugi? Nisi vedel, kaj je niz. Zdaj gradiš razrede, generatorje in dekoratorje, pravkar pa si sam napisal pogon, ne da bi te kdo držal za roko.

Nisi več mornar. Si **programer**.

Nekaj idej za naslednje plovbe, vse izvedljive s tem, kar znaš:
- Razširi pustolovski pogon: zaklenjena vrata, ključi, shranjevanje igre v datoteko.
- Ukazni program za spremljanje proračuna, ki bere in piše datoteke CSV.
- Kviz z vprašanji iz datoteke in lestvico najboljših rezultatov.
- Iz spomina, brez kukanja, poustvari eno od samostojnih plovb. Nato jo izboljšaj.

**Delavnica** je vedno odprta za poskuse, **Kapitanov dnevnik** pa hrani vse plonk listke. Srečen veter, kapitan.`,
            },
          },
        ],
      },
    ],
  };
})();
