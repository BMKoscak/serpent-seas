/* Island 10 — Tinkerer's Atoll: import, math/random, comprehensions, lambda & key, *args/**kwargs, zip */
(function () {
  const R = String.raw;
  (window.SS_ISLANDS = window.SS_ISLANDS || {}).c10 = {
    blurb: {
      en: "The tinkerers trade in clever tools. Borrow ready-made modules, write a whole loop in one line, sort by anything, and build functions that take any number of arguments.",
      sl: "Mojstri tu trgujejo s pametnimi orodji. Izposodi si gotove module, napiši celo zanko v eni vrstici, razvrščaj po čemerkoli in zgradi funkcije s poljubnim številom argumentov.",
    },
    log: {
      en: `**Modules**:
:::
import math
math.sqrt(16), math.pi, math.ceil(2.1), math.floor(2.9)
import random
random.randint(1, 6), random.choice(crew), random.shuffle(deck)
from math import sqrt
import random as rnd
:::
**Comprehensions** build a collection in one line:
:::
[n * 2 for n in nums]                 # list
[w for w in words if len(w) > 4]      # with a filter
{name: len(name) for name in crew}    # dict
{w[0] for w in words}                 # set
:::
**Functions are values**. ~key=~ tells sorting what to compare:
:::
sorted(words, key=len)
sorted(crew, key=lambda p: p[1], reverse=True)
max(crew, key=lambda p: p[1])
sorted(words, key=str.lower)
:::
~lambda x: x * 2~ is a tiny unnamed function.

**Flexible arguments**:
:::
def total(*nums):       # nums is a tuple of all positional args
def info(**kw):         # kw is a dict of keyword args
list(zip(names, ages))  # pairs items up
dict(zip(names, ages))
:::`,
      sl: `**Moduli**:
:::
import math
math.sqrt(16), math.pi, math.ceil(2.1), math.floor(2.9)
import random
random.randint(1, 6), random.choice(posadka), random.shuffle(karte)
from math import sqrt
import random as rnd
:::
**Izpeljani izrazi** zgradijo zbirko v eni vrstici:
:::
[n * 2 for n in stevila]              # seznam
[b for b in besede if len(b) > 4]     # s filtrom
{ime: len(ime) for ime in posadka}    # slovar
{b[0] for b in besede}                # množica
:::
**Funkcije so vrednosti**. ~key=~ pove razvrščanju, kaj primerjati:
:::
sorted(besede, key=len)
sorted(posadka, key=lambda p: p[1], reverse=True)
max(posadka, key=lambda p: p[1])
sorted(besede, key=str.lower)
:::
~lambda x: x * 2~ je drobna neimenovana funkcija.

**Prilagodljivi argumenti**:
:::
def vsota(*stevila):     # stevila je terka vseh pozicijskih argumentov
def info(**kw):          # kw je slovar imenovanih argumentov
list(zip(imena, starosti))  # združi v pare
dict(zip(imena, starosti))
:::`,
    },
    lessons: [
      {
        id: "c10l1",
        title: { en: "The Tinkerer's Toolbox", sl: "Mojstrova škatla z orodjem" },
        steps: [
          {
            id: "s1", type: "story", speaker: "pip",
            text: {
              en: `Squawk! **Tinkerer's Atoll**, where nobody builds anything from scratch if they can help it. Need a compass? There's a stall for that. Dice? Next stall.

Python comes with a huge **standard library**: modules full of ready-made functions. A real programmer's first question is often "has someone already written this?" Usually, yes.`,
              sl: `Skvak! **Atol mojstrov**, kjer nihče ne gradi ničesar iz nič, če se le da izogniti. Potrebuješ kompas? Za to je stojnica. Kocke? Naslednja stojnica.

Python ima ogromno **standardno knjižnico**: module, polne gotovih funkcij. Prvo vprašanje pravega programerja je pogosto "ali je to že kdo napisal?" Običajno ja.`,
            },
          },
          {
            id: "s2", type: "learn",
            text: {
              en: `~import~ loads a module. Then use its tools with a dot:
:::
import math
print(math.sqrt(16))
:::
Two modules you'll use constantly:
- ~math~: ~sqrt~, ~pi~, ~ceil~ (round up), ~floor~ (round down)
- ~random~: ~randint(a, b)~ (a whole number from a to b, **including** b), ~choice(list)~, ~shuffle(list)~, ~random()~

~from math import sqrt~ imports one name so you can write ~sqrt(16)~ directly. ~import random as rnd~ gives a module a shorter name.`,
              sl: `~import~ naloži modul. Nato njegova orodja uporabljaš s piko:
:::
import math
print(math.sqrt(16))
:::
Dva modula, ki ju boš nenehno uporabljal:
- ~math~: ~sqrt~, ~pi~, ~ceil~ (zaokroži navzgor), ~floor~ (navzdol)
- ~random~: ~randint(a, b)~ (celo število od a do b, **vključno** z b), ~choice(seznam)~, ~shuffle(seznam)~, ~random()~

~from math import sqrt~ uvozi eno ime, da lahko pišeš kar ~sqrt(16)~. ~import random as rnd~ modulu da krajše ime.`,
            },
            example: `import math\nimport random\n\nprint(math.sqrt(16), math.pi)\nprint(math.ceil(2.1), math.floor(2.9))\n\nprint("Dice:", random.randint(1, 6))\ncrew = ["Pip", "Anne", "Jack"]\nprint("Lookout:", random.choice(crew))\nrandom.shuffle(crew)\nprint("Shuffled:", crew)\n`,
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `Roll two dice with ~random.randint~ and print the result:
:::
You rolled 3 and 5 (total 8)
:::
Run it a few times: it should change.`,
              sl: `Z ~random.randint~ vrzi dve kocki in izpiši rezultat:
:::
You rolled 3 and 5 (total 8)
:::
Zaženi nekajkrat: rezultat se mora spreminjati.`,
            },
            starter: ``,
            tests: [
              { seed: 1, check: R`import re
m = re.search(r"You rolled (\d+) and (\d+) \(total (\d+)\)", out)
assert m and 1 <= int(m[1]) <= 6 and 1 <= int(m[2]) <= 6 and int(m[1]) + int(m[2]) == int(m[3])`, msg: { en: "Print You rolled A and B (total C) with two dice from 1 to 6 and their correct total.", sl: "Izpiši You rolled A and B (total C) z dvema kockama od 1 do 6 in pravilno vsoto." } },
              { seed: 99, check: R`import re
m = re.search(r"You rolled (\d+) and (\d+) \(total (\d+)\)", out)
assert m and int(m[1]) + int(m[2]) == int(m[3])`, msg: { en: "The total must match the two dice every time.", sl: "Vsota se mora vsakič ujemati s kockama." } },
              { check: R`assert "randint(1, 6)" in code.replace("randint(1,6)", "randint(1, 6)")`, msg: { en: "Use random.randint(1, 6) for each die.", sl: "Za vsako kocko uporabi random.randint(1, 6)." } },
            ],
            hints: [
              { en: "~import random~ at the top, then ~a = random.randint(1, 6)~ and the same for ~b~.", sl: "Na vrhu ~import random~, nato ~a = random.randint(1, 6)~ in enako za ~b~." },
              { en: "~print(f\"You rolled {a} and {b} (total {a + b})\")~", sl: "~print(f\"You rolled {a} and {b} (total {a + b})\")~" },
            ],
            solution: `import random\n\na = random.randint(1, 6)\nb = random.randint(1, 6)\nprint(f"You rolled {a} and {b} (total {a + b})")\n`,
          },
          {
            id: "s4", type: "code", kind: "task",
            text: {
              en: `Ask ~Radius? ~ (can have decimals) and print the area of a round porthole using ~math.pi~, with 2 decimals. For radius 2:
:::
Area: 12.57
:::`,
              sl: `Vprašaj ~Radius? ~ (lahko z decimalkami) in z ~math.pi~ izpiši ploščino okroglega okna, z 2 decimalkama. Za polmer 2:
:::
Area: 12.57
:::`,
            },
            starter: ``,
            stdin: "2",
            tests: [
              { stdin: ["2"], check: R`assert "area: 12.57" in norm(out)`, msg: { en: "Radius 2 gives Area: 12.57 (pi times radius squared).", sl: "Polmer 2 da Area: 12.57 (pi krat polmer na kvadrat)." } },
              { stdin: ["0.5"], check: R`assert "area: 0.79" in norm(out)`, msg: { en: "Radius 0.5 gives Area: 0.79", sl: "Polmer 0.5 da Area: 0.79" } },
              { stdin: ["2"], check: R`assert "math.pi" in code or "from math import" in code`, msg: { en: "Use math.pi instead of typing 3.14.", sl: "Uporabi math.pi namesto tipkanja 3.14." } },
            ],
            hints: [
              { en: "Area of a circle is pi × r². Use ~float(input(...))~.", sl: "Ploščina kroga je pi × r². Uporabi ~float(input(...))~." },
              { en: "~print(f\"Area: {math.pi * r ** 2:.2f}\")~", sl: "~print(f\"Area: {math.pi * r ** 2:.2f}\")~" },
            ],
            solution: `import math\n\nr = float(input("Radius? "))\nprint(f"Area: {math.pi * r ** 2:.2f}")\n`,
          },
          {
            id: "s5", type: "code", kind: "task",
            text: {
              en: `Fix last island's guessing game problem: the secret was always 42. Write ~pick_secret()~ that **returns** a random whole number from 1 to 100, inclusive.`,
              sl: `Popravi težavo ugibanke s prejšnjih otokov: skrivnost je bila vedno 42. Napiši ~pick_secret()~, ki **vrne** naključno celo število od 1 do 100, vključno.`,
            },
            starter: `import random\n\n`,
            tests: [
              { check: R`vals = [ns["pick_secret"]() for _ in range(3000)]
assert all(isinstance(v, int) and 1 <= v <= 100 for v in vals), "range"
assert len(set(vals)) > 80 and 1 in vals and 100 in vals, "spread"`, msg: { en: "pick_secret() should return random whole numbers covering 1 to 100, including both 1 and 100.", sl: "pick_secret() naj vrača naključna cela števila od 1 do 100, vključno z 1 in 100." } },
            ],
            hints: [
              { en: "~random.randint~ includes both ends.", sl: "~random.randint~ vključuje oba konca." },
              { en: "~return random.randint(1, 100)~", sl: "~return random.randint(1, 100)~" },
            ],
            solution: `import random\n\ndef pick_secret():\n    return random.randint(1, 100)\n`,
          },
        ],
      },
      {
        id: "c10l2",
        title: { en: "One-Line Loops", sl: "Zanke v eni vrstici" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `You've written this pattern many times:
:::
doubled = []
for n in nums:
    doubled.append(n * 2)
:::
A **list comprehension** does the same in one line:
:::
doubled = [n * 2 for n in nums]
:::
Read it as "n times 2, for each n in nums". Add a filter at the end:
:::
big = [n for n in nums if n > 10]
:::
Use comprehensions for simple transforms and filters. If it gets hard to read, a normal loop is better.`,
              sl: `Ta vzorec si napisal že velikokrat:
:::
doubled = []
for n in nums:
    doubled.append(n * 2)
:::
**Izpeljani seznam** (list comprehension) naredi isto v eni vrstici:
:::
doubled = [n * 2 for n in nums]
:::
Beri ga kot "n krat 2, za vsak n v nums". Na koncu dodaj filter:
:::
big = [n for n in nums if n > 10]
:::
Izpeljane izraze uporabljaj za preproste pretvorbe in filtre. Če postanejo težko berljivi, je navadna zanka boljša.`,
            },
            example: `nums = [3, 14, 7, 22, 9]\nprint([n * 2 for n in nums])\nprint([n for n in nums if n > 10])\nwords = ["rope", "Rum", "anchor"]\nprint([w.upper() for w in words])\nprint([len(w) for w in words])\nprint([i * i for i in range(1, 6)])\n`,
          },
          {
            id: "s2", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `print([n * n for n in range(5) if n % 2 == 0])\n`,
            options: ["[0, 1, 4, 9, 16]", "[0, 4, 16]", "[1, 9]", "[0, 2, 4]"],
            answer: 1,
            explain: { en: "~range(5)~ is 0 to 4; the filter keeps 0, 2 and 4; each is squared: 0, 4, 16.", sl: "~range(5)~ je 0 do 4; filter obdrži 0, 2 in 4; vsakega kvadriramo: 0, 4, 16." },
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `Using **list comprehensions** (one line each):
1. ~lengths~: the length of every word in ~words~
2. ~long_words~: the words longer than 4 letters, in UPPERCASE

Print both.`,
              sl: `Z **izpeljanimi seznami** (vsak v eni vrstici):
1. ~lengths~: dolžina vsake besede v ~words~
2. ~long_words~: besede, daljše od 4 črk, z VELIKIMI črkami

Izpiši oba.`,
            },
            starter: `words = ["rope", "cannon", "rum", "compass", "map", "anchor"]\n`,
            tests: [
              { check: R`assert ns.get("lengths") == [4, 6, 3, 7, 3, 6]`, msg: { en: "lengths should be [4, 6, 3, 7, 3, 6].", sl: "lengths naj bo [4, 6, 3, 7, 3, 6]." } },
              { check: R`assert ns.get("long_words") == ["CANNON", "COMPASS", "ANCHOR"]`, msg: { en: "long_words should be ['CANNON', 'COMPASS', 'ANCHOR'].", sl: "long_words naj bo ['CANNON', 'COMPASS', 'ANCHOR']." } },
              { check: R`import re
assert len(re.findall(r"\[[^\]\n]*\bfor\b[^\]\n]*\]", code)) >= 2 and ".append(" not in code`, msg: { en: "Build both lists with comprehensions, not loops with append.", sl: "Oba seznama zgradi z izpeljanimi izrazi, ne z zankami in append." } },
            ],
            hints: [
              { en: "~[len(w) for w in words]~", sl: "~[len(w) for w in words]~" },
              { en: "~[w.upper() for w in words if len(w) > 4]~", sl: "~[w.upper() for w in words if len(w) > 4]~" },
            ],
            solution: `words = ["rope", "cannon", "rum", "compass", "map", "anchor"]\nlengths = [len(w) for w in words]\nlong_words = [w.upper() for w in words if len(w) > 4]\nprint(lengths)\nprint(long_words)\n`,
          },
          {
            id: "s4", type: "code", kind: "task",
            text: {
              en: `Rewrite this loop as **one** comprehension that produces the same ~labels~ list, then print it.`,
              sl: `To zanko prepiši v **en** izpeljani izraz, ki ustvari enak seznam ~labels~, nato ga izpiši.`,
            },
            starter: `prices = [4.5, 12, 0.75]\nlabels = []\nfor p in prices:\n    labels.append(f"{p:.2f} doubloons")\nprint(labels)\n`,
            tests: [
              { check: R`assert ns.get("labels") == ["4.50 doubloons", "12.00 doubloons", "0.75 doubloons"]`, msg: { en: "labels should be ['4.50 doubloons', '12.00 doubloons', '0.75 doubloons'].", sl: "labels naj bo ['4.50 doubloons', '12.00 doubloons', '0.75 doubloons']." } },
              { check: R`assert ".append(" not in code`, msg: { en: "Replace the loop and append with a comprehension.", sl: "Zanko in append zamenjaj z izpeljanim izrazom." } },
            ],
            hints: [
              { en: "The thing being appended goes first, then ~for p in prices~.", sl: "Kar se dodaja, gre na začetek, nato ~for p in prices~." },
              { en: "~labels = [f\"{p:.2f} doubloons\" for p in prices]~", sl: "~labels = [f\"{p:.2f} doubloons\" for p in prices]~" },
            ],
            solution: `prices = [4.5, 12, 0.75]\nlabels = [f"{p:.2f} doubloons" for p in prices]\nprint(labels)\n`,
          },
          {
            id: "s5", type: "code", kind: "task",
            text: {
              en: `Comprehensions work for dictionaries and sets too:
- ~{k: v for ...}~ builds a dict
- ~{x for ...}~ builds a set

From ~crew~, build:
1. ~name_lengths~: a dict mapping each name to its length
2. ~initials~: a set of the first letters

Print ~name_lengths~ and ~sorted(initials)~.`,
              sl: `Izpeljani izrazi delujejo tudi za slovarje in množice:
- ~{k: v for ...}~ zgradi slovar
- ~{x for ...}~ zgradi množico

Iz ~crew~ zgradi:
1. ~name_lengths~: slovar, ki vsako ime poveže z njegovo dolžino
2. ~initials~: množico začetnih črk

Izpiši ~name_lengths~ in ~sorted(initials)~.`,
            },
            starter: `crew = ["Anne", "Pip", "Jack", "Ada", "Jo"]\n`,
            tests: [
              { check: R`assert ns.get("name_lengths") == {"Anne": 4, "Pip": 3, "Jack": 4, "Ada": 3, "Jo": 2}`, msg: { en: "name_lengths should be {'Anne': 4, 'Pip': 3, 'Jack': 4, 'Ada': 3, 'Jo': 2}.", sl: "name_lengths naj bo {'Anne': 4, 'Pip': 3, 'Jack': 4, 'Ada': 3, 'Jo': 2}." } },
              { check: R`assert ns.get("initials") == {"A", "P", "J"} and isinstance(ns.get("initials"), set)`, msg: { en: "initials should be the set {'A', 'P', 'J'}.", sl: "initials naj bo množica {'A', 'P', 'J'}." } },
              { check: R`assert "['A', 'J', 'P']" in out`, msg: { en: "Print sorted(initials).", sl: "Izpiši sorted(initials)." } },
            ],
            hints: [
              { en: "~{name: len(name) for name in crew}~", sl: "~{name: len(name) for name in crew}~" },
              { en: "~{name[0] for name in crew}~", sl: "~{name[0] for name in crew}~" },
            ],
            solution: `crew = ["Anne", "Pip", "Jack", "Ada", "Jo"]\nname_lengths = {name: len(name) for name in crew}\ninitials = {name[0] for name in crew}\nprint(name_lengths)\nprint(sorted(initials))\n`,
          },
        ],
      },
      {
        id: "c10l3",
        title: { en: "Sorting Smarter", sl: "Pametnejše razvrščanje" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `In Python, a function is a value like any other: you can store it in a variable or hand it to another function.

~sorted~, ~min~ and ~max~ take a ~key=~ function. They call it on each item and compare the **results** instead of the items:
:::
sorted(words, key=len)          # shortest first
:::
For one-off keys, write a **lambda**, a tiny function with no name:
:::
crew = [("Anne", 34), ("Jack", 22)]
sorted(crew, key=lambda p: p[1])     # by age
:::
~lambda p: p[1]~ means "given p, return p[1]".`,
              sl: `V Pythonu je funkcija vrednost kot vsaka druga: lahko jo shraniš v spremenljivko ali podaš drugi funkciji.

~sorted~, ~min~ in ~max~ sprejmejo funkcijo ~key=~. Pokličejo jo na vsakem elementu in primerjajo **rezultate** namesto elementov:
:::
sorted(words, key=len)          # najkrajše najprej
:::
Za enkratne ključe napiši **lambdo**, drobno funkcijo brez imena:
:::
crew = [("Anne", 34), ("Jack", 22)]
sorted(crew, key=lambda p: p[1])     # po starosti
:::
~lambda p: p[1]~ pomeni "za p vrni p[1]".`,
            },
            example: `words = ["anchor", "rum", "Compass", "map"]\nprint(sorted(words))\nprint(sorted(words, key=len))\nprint(sorted(words, key=str.lower))\n\ncrew = [("Anne", 34), ("Jack", 22), ("Pip", 40)]\nprint(sorted(crew, key=lambda p: p[1]))\nprint(max(crew, key=lambda p: p[1]))\nshout = lambda s: s.upper() + "!"\nprint(shout("ahoy"))\n`,
          },
          {
            id: "s2", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `print(sorted(["bb", "a", "ccc"], key=len, reverse=True))\n`,
            options: ["['a', 'bb', 'ccc']", "['ccc', 'bb', 'a']", "['bb', 'a', 'ccc']", "[3, 2, 1]"],
            answer: 1,
            explain: { en: "Sorted by length, longest first because of ~reverse=True~. The result still contains the words, not the lengths.", sl: "Razvrščeno po dolžini, najdaljše najprej zaradi ~reverse=True~. Rezultat še vedno vsebuje besede, ne dolžin." },
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `~crew~ is a list of ~(name, age)~ tuples.
1. ~by_age~: the crew sorted from youngest to oldest
2. ~oldest~: the **name** of the oldest sailor (use ~max~ with a key)

Print both.`,
              sl: `~crew~ je seznam terk ~(ime, starost)~.
1. ~by_age~: posadka, razvrščena od najmlajšega do najstarejšega
2. ~oldest~: **ime** najstarejšega mornarja (uporabi ~max~ s ključem)

Izpiši oba.`,
            },
            starter: `crew = [("Anne", 34), ("Jack", 22), ("Pip", 40), ("Mary", 29)]\n`,
            tests: [
              { check: R`assert ns.get("by_age") == [("Jack", 22), ("Mary", 29), ("Anne", 34), ("Pip", 40)]`, msg: { en: "by_age should go Jack, Mary, Anne, Pip.", sl: "by_age naj gre Jack, Mary, Anne, Pip." } },
              { check: R`assert ns.get("oldest") == "Pip"`, msg: { en: "oldest should be the name \"Pip\" (just the name, not the tuple).", sl: "oldest naj bo ime \"Pip\" (samo ime, ne terka)." } },
              { check: R`assert "lambda" in code and "max(" in code`, msg: { en: "Use a lambda key, and max for the oldest.", sl: "Uporabi ključ lambda in max za najstarejšega." } },
            ],
            hints: [
              { en: "~sorted(crew, key=lambda p: p[1])~", sl: "~sorted(crew, key=lambda p: p[1])~" },
              { en: "~max(crew, key=lambda p: p[1])~ gives the whole tuple; take ~[0]~ for the name.", sl: "~max(crew, key=lambda p: p[1])~ vrne celo terko; za ime vzemi ~[0]~." },
            ],
            solution: `crew = [("Anne", 34), ("Jack", 22), ("Pip", 40), ("Mary", 29)]\nby_age = sorted(crew, key=lambda p: p[1])\noldest = max(crew, key=lambda p: p[1])[0]\nprint(by_age)\nprint(oldest)\n`,
          },
          {
            id: "s4", type: "code", kind: "task",
            text: {
              en: `Sort the ship's index of ports **alphabetically, ignoring capitals**. Plain ~sorted~ puts all capital letters first. Store it in ~ports_sorted~ and print it.`,
              sl: `Razvrsti ladijski seznam pristanišč **po abecedi, ne glede na velike črke**. Navaden ~sorted~ postavi vse velike črke najprej. Shrani v ~ports_sorted~ in izpiši.`,
            },
            starter: `ports = ["tortuga", "Sirocco", "anchor point", "Bay of Bones", "skull rock"]\n`,
            tests: [
              { check: R`assert ns.get("ports_sorted") == ["anchor point", "Bay of Bones", "Sirocco", "skull rock", "tortuga"]`, msg: { en: "ports_sorted should be ['anchor point', 'Bay of Bones', 'Sirocco', 'skull rock', 'tortuga'], keeping the original spelling.", sl: "ports_sorted naj bo ['anchor point', 'Bay of Bones', 'Sirocco', 'skull rock', 'tortuga'], z izvirnim zapisom." } },
            ],
            hints: [
              { en: "Compare a lowercase version of each port, but keep the original strings in the result.", sl: "Primerjaj različico vsakega pristanišča z malimi črkami, v rezultatu pa obdrži izvirne nize." },
              { en: "~sorted(ports, key=str.lower)~", sl: "~sorted(ports, key=str.lower)~" },
            ],
            solution: `ports = ["tortuga", "Sirocco", "anchor point", "Bay of Bones", "skull rock"]\nports_sorted = sorted(ports, key=str.lower)\nprint(ports_sorted)\n`,
          },
        ],
      },
      {
        id: "c10l4",
        title: { en: "Flexible Functions", sl: "Prilagodljive funkcije" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `Some functions should accept **any number** of arguments, like ~print~ does.
- ~*args~ collects all extra positional arguments into a **tuple**
- ~**kwargs~ collects all extra keyword arguments into a **dict**

The names ~args~ and ~kwargs~ are just tradition; the stars do the work.

~zip(a, b)~ pairs items from two lists side by side: ~zip(names, ages)~ gives ~("Anne", 34)~, ~("Jack", 22)~... and ~dict(zip(a, b))~ turns them straight into a dictionary.`,
              sl: `Nekatere funkcije naj sprejmejo **poljubno število** argumentov, tako kot ~print~.
- ~*args~ zbere vse dodatne pozicijske argumente v **terko**
- ~**kwargs~ zbere vse dodatne imenovane argumente v **slovar**

Imeni ~args~ in ~kwargs~ sta le navada; delo opravijo zvezdice.

~zip(a, b)~ postavi elemente dveh seznamov drugega ob drugega: ~zip(names, ages)~ da ~("Anne", 34)~, ~("Jack", 22)~... ~dict(zip(a, b))~ pa jih takoj spremeni v slovar.`,
            },
            example: `def shout_all(*words):\n    print(words)\n    for w in words:\n        print(w.upper())\n\nshout_all("ahoy", "avast", "yo ho")\n\ndef describe_ship(name, **details):\n    print(name)\n    for key, value in details.items():\n        print(" ", key, "=", value)\n\ndescribe_ship("Serpent", guns=12, sails="green")\n\nnames = ["Anne", "Jack"]\nages = [34, 22]\nprint(list(zip(names, ages)))\nprint(dict(zip(names, ages)))\n`,
          },
          {
            id: "s2", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `def count(*args):\n    return len(args)\n\nprint(count(1, 2, 3), count())\n`,
            options: ["3 0", "1 0", "3 None", { en: "An error", sl: "Napaka" }],
            answer: 0,
            explain: { en: "~args~ is a tuple of everything passed in: ~(1, 2, 3)~ has 3 items, and an empty call gives an empty tuple.", sl: "~args~ je terka vsega, kar je bilo podano: ~(1, 2, 3)~ ima 3 elemente, prazen klic pa da prazno terko." },
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `Write ~average(*numbers)~ that returns the average of any amount of numbers, or ~0~ if there are none.
- ~average(2, 4, 9)~ → ~5.0~
- ~average()~ → ~0~`,
              sl: `Napiši ~average(*numbers)~, ki vrne povprečje poljubnega števila števil ali ~0~, če jih ni.
- ~average(2, 4, 9)~ → ~5.0~
- ~average()~ → ~0~`,
            },
            starter: ``,
            tests: [
              { check: R`f = ns["average"]
assert f(2, 4, 9) == 5 and f(10) == 10 and f() == 0 and f(1, 2) == 1.5`, msg: { en: "average(2, 4, 9) → 5.0, average(10) → 10.0, average(1, 2) → 1.5, average() → 0", sl: "average(2, 4, 9) → 5.0, average(10) → 10.0, average(1, 2) → 1.5, average() → 0" } },
              { check: R`assert "*numbers" in code`, msg: { en: "Use *numbers as the parameter.", sl: "Kot parameter uporabi *numbers." } },
            ],
            hints: [
              { en: "~numbers~ is a tuple, so ~sum~ and ~len~ work on it.", sl: "~numbers~ je terka, zato na njej delujeta ~sum~ in ~len~." },
              { en: "Check ~if not numbers: return 0~ first, to avoid dividing by zero.", sl: "Najprej preveri ~if not numbers: return 0~, da se izogneš deljenju z nič." },
            ],
            solution: `def average(*numbers):\n    if not numbers:\n        return 0\n    return sum(numbers) / len(numbers)\n`,
          },
          {
            id: "s4", type: "code", kind: "task",
            text: {
              en: `Two lists line up: ~names~ and ~bounties~. Use ~zip~ to build the dictionary ~wanted~ (name → bounty), then print each pirate as ~Anne: 500~, highest bounty first.`,
              sl: `Seznama se ujemata: ~names~ in ~bounties~. Z ~zip~ zgradi slovar ~wanted~ (ime → nagrada), nato izpiši vsakega pirata kot ~Anne: 500~, najvišja nagrada najprej.`,
            },
            starter: `names = ["Anne", "Jack", "Calico Jane", "Bo"]\nbounties = [500, 1200, 800, 50]\n`,
            tests: [
              { check: R`assert ns.get("wanted") == {"Anne": 500, "Jack": 1200, "Calico Jane": 800, "Bo": 50}`, msg: { en: "wanted should map each name to its bounty.", sl: "wanted naj vsako ime poveže z nagrado." } },
              { check: R`assert clean == ["Jack: 1200", "Calico Jane: 800", "Anne: 500", "Bo: 50"]`, msg: { en: "Print Jack: 1200, Calico Jane: 800, Anne: 500, Bo: 50 in that order.", sl: "Izpiši Jack: 1200, Calico Jane: 800, Anne: 500, Bo: 50 v tem vrstnem redu." } },
              { check: R`assert "zip(" in code`, msg: { en: "Use zip to combine the lists.", sl: "Za združitev seznamov uporabi zip." } },
            ],
            hints: [
              { en: "~wanted = dict(zip(names, bounties))~", sl: "~wanted = dict(zip(names, bounties))~" },
              { en: "Sort the names by their bounty: ~sorted(wanted, key=wanted.get, reverse=True)~", sl: "Imena razvrsti po nagradi: ~sorted(wanted, key=wanted.get, reverse=True)~" },
            ],
            solution: `names = ["Anne", "Jack", "Calico Jane", "Bo"]\nbounties = [500, 1200, 800, 50]\nwanted = dict(zip(names, bounties))\nfor name in sorted(wanted, key=wanted.get, reverse=True):\n    print(f"{name}: {wanted[name]}")\n`,
          },
        ],
      },
      {
        id: "c10l5",
        title: { en: "Solo Voyage: The Leaderboard", sl: "Samostojna plovba: Lestvica" },
        solo: true,
        steps: [
          {
            id: "s1", type: "story", speaker: "pip",
            text: {
              en: `Squawk! The atoll holds a cannon-shooting contest every full moon. Pirates shoot as many times as they like, and their scores add up.

The judges scribble scores on scraps of paper. They need a proper leaderboard, and they've heard you're the one to ask.`,
              sl: `Skvak! Atol ob vsaki polni luni priredi tekmovanje v streljanju s topom. Pirati streljajo, kolikorkrat želijo, točke pa se seštevajo.

Sodniki točke čečkajo na listke. Potrebujejo pravo lestvico in slišali so, da si ti pravi za to.`,
            },
          },
          {
            id: "s2", type: "code", kind: "project",
            text: {
              en: `Build the leaderboard.

**Input**: keep asking ~Score? ~. Each answer is a name and a number, like ~Anne 120~. Names can appear many times; add their scores up. ~done~ ends the input.

**Output**, for ~Anne 120~, ~Jack 90~, ~Anne 40~, ~Bo 150~, ~Jack 80~, ~Mary 10~:
:::
Players: 4
Highest single shot: Bo (150)
1. Jack - 170
2. Anne - 160
3. Bo - 150
:::
- Show only the **top 3** totals, highest first. On a tie, the name that comes first alphabetically wins.
- If there are fewer than 3 players, show as many as there are.
- Use at least one ~lambda~ key and one comprehension somewhere.`,
              sl: `Zgradi lestvico.

**Vnos**: sprašuj ~Score? ~. Vsak odgovor je ime in število, na primer ~Anne 120~. Imena se lahko ponovijo; njihove točke seštej. ~done~ konča vnos.

**Izpis** za ~Anne 120~, ~Jack 90~, ~Anne 40~, ~Bo 150~, ~Jack 80~, ~Mary 10~:
:::
Players: 4
Highest single shot: Bo (150)
1. Jack - 170
2. Anne - 160
3. Bo - 150
:::
- Prikaži samo **najboljše 3** vsote, najvišjo najprej. Pri izenačenju zmaga ime, ki je prej po abecedi.
- Če je igralcev manj kot 3, jih prikaži toliko, kolikor jih je.
- Nekje uporabi vsaj en ključ ~lambda~ in en izpeljani izraz.`,
            },
            starter: `# Solo voyage: the Leaderboard\n`,
            stdin: "Anne 120\nJack 90\nAnne 40\nBo 150\nJack 80\nMary 10\ndone",
            tests: [
              { stdin: ["Anne 120", "Jack 90", "Anne 40", "Bo 150", "Jack 80", "Mary 10", "done"], check: R`c = [l for l in clean if not l.startswith("Score?")]
assert c == ["Players: 4", "Highest single shot: Bo (150)", "1. Jack - 170", "2. Anne - 160", "3. Bo - 150"], c`, msg: { en: "For the example input the output should match exactly: Players: 4, Highest single shot: Bo (150), then the top 3.", sl: "Za primer vnosa se mora izpis natanko ujemati: Players: 4, Highest single shot: Bo (150), nato najboljši 3." } },
              { stdin: ["Zed 50", "Amy 50", "done"], check: R`c = [l for l in clean if not l.startswith("Score?")]
assert c == ["Players: 2", "Highest single shot: Zed (50)", "1. Amy - 50", "2. Zed - 50"] or c == ["Players: 2", "Highest single shot: Amy (50)", "1. Amy - 50", "2. Zed - 50"], c`, msg: { en: "With Zed 50 and Amy 50: a tie on 50, so Amy is ranked first alphabetically, and only 2 lines are shown.", sl: "Pri Zed 50 in Amy 50: izenačenje pri 50, zato je Amy po abecedi prva, prikazani pa sta le 2 vrstici." } },
              { stdin: ["Pip 5", "Pip 7", "Pip 3", "done"], check: R`c = [l for l in clean if not l.startswith("Score?")]
assert c == ["Players: 1", "Highest single shot: Pip (7)", "1. Pip - 15"], c`, msg: { en: "A single player Pip with 5, 7 and 3: Players: 1, Highest single shot: Pip (7), 1. Pip - 15", sl: "En igralec Pip s 5, 7 in 3: Players: 1, Highest single shot: Pip (7), 1. Pip - 15" } },
              { stdin: ["A 1", "done"], check: R`assert "lambda" in code and ("for" in code and ("[" in code or "{" in code))`, msg: { en: "Use at least one lambda key and one comprehension.", sl: "Uporabi vsaj en ključ lambda in en izpeljani izraz." } },
            ],
            hints: [
              { en: "Keep a dict of totals and track the best single shot as a (name, score) pair while reading input.", sl: "Med branjem vnosa hrani slovar vsot in spremljaj najboljši posamezni strel kot par (ime, točke)." },
              { en: "Sort ~totals.items()~ with ~key=lambda p: (-p[1], p[0])~: negative score puts the highest first, and the name breaks ties. Then slice ~[:3]~.", sl: "Razvrsti ~totals.items()~ s ~key=lambda p: (-p[1], p[0])~: negativne točke dajo najvišje najprej, ime pa odloči pri izenačenju. Nato rezina ~[:3]~." },
            ],
            solution: `totals = {}\nbest_name, best_shot = None, -1\nwhile True:\n    line = input("Score? ")\n    if line == "done":\n        break\n    name, score = line.split()\n    score = int(score)\n    totals[name] = totals.get(name, 0) + score\n    if score > best_shot:\n        best_name, best_shot = name, score\n\nranking = sorted(totals.items(), key=lambda p: (-p[1], p[0]))\nlines = [f"{i}. {name} - {total}" for i, (name, total) in enumerate(ranking[:3], start=1)]\n\nprint("Players:", len(totals))\nprint(f"Highest single shot: {best_name} ({best_shot})")\nfor line in lines:\n    print(line)\n`,
            after: {
              en: "Sorting by a tuple like ~(-score, name)~ is a classic trick: Python compares the first item, and only looks at the second when the first ones are equal.",
              sl: "Razvrščanje po terki, kot je ~(-točke, ime)~, je klasičen trik: Python primerja prvi element in pogleda drugega šele, ko sta prva enaka.",
            },
          },
        ],
      },
    ],
  };
})();
