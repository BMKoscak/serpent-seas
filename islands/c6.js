/* Island 6 — Cargo Cove: lists, list methods, looping, built-ins, slicing, nested lists, tuples */
(function () {
  const R = String.raw;
  (window.SS_ISLANDS = window.SS_ISLANDS || {}).c6 = {
    blurb: {
      en: "Every crate in the hold, every sailor on the roster. Lists keep many values in order; tuples lock them together. Load, unload, sort and search.",
      sl: "Vsak zaboj v skladišču, vsak mornar na seznamu posadke. Seznami hranijo več vrednosti po vrsti, terke pa jih zaklenejo skupaj. Nalagaj, razkladaj, razvrščaj in išči.",
    },
    log: {
      en: `**Lists** hold many values in order and can change.
:::
cargo = ["rope", "rum", "maps"]
cargo[0]          # 'rope'
cargo[-1]         # 'maps'
cargo[1] = "water"
len(cargo)        # 3
"rope" in cargo   # True
:::
**Changing a list** (these change it in place and return None):
:::
cargo.append("gold")      # add at the end
cargo.insert(0, "anchor") # add at a position
cargo.remove("rope")      # remove the first match
last = cargo.pop()        # remove and return the last item
cargo.sort()              # sort in place
:::
**Reading a list**: ~sum(x)~ ~min(x)~ ~max(x)~ ~sorted(x)~ (new sorted list), ~x[1:3]~ slices.
:::
for i, name in enumerate(crew, start=1):
    print(i, name)
:::
**Nested lists**: ~grid[row][col]~.

**Tuples** are fixed lists: ~point = (3, 4)~. Unpack them: ~x, y = point~. Swap: ~a, b = b, a~.`,
      sl: `**Seznami** hranijo več vrednosti po vrsti in se lahko spreminjajo.
:::
tovor = ["vrv", "rum", "zemljevidi"]
tovor[0]          # 'vrv'
tovor[-1]         # 'zemljevidi'
tovor[1] = "voda"
len(tovor)        # 3
"vrv" in tovor    # True
:::
**Spreminjanje seznama** (spremeni ga na mestu in vrne None):
:::
tovor.append("zlato")      # doda na konec
tovor.insert(0, "sidro")   # doda na mesto
tovor.remove("vrv")        # odstrani prvo ujemanje
zadnji = tovor.pop()       # odstrani in vrne zadnjega
tovor.sort()               # razvrsti na mestu
:::
**Branje seznama**: ~sum(x)~ ~min(x)~ ~max(x)~ ~sorted(x)~ (nov razvrščen seznam), ~x[1:3]~ rezine.
:::
for i, ime in enumerate(posadka, start=1):
    print(i, ime)
:::
**Gnezdeni seznami**: ~mreza[vrstica][stolpec]~.

**Terke** so nespremenljivi seznami: ~tocka = (3, 4)~. Razpakiraj jih: ~x, y = tocka~. Zamenjava: ~a, b = b, a~.`,
    },
    lessons: [
      {
        id: "c6l1",
        title: { en: "The Cargo List", sl: "Seznam tovora" },
        steps: [
          {
            id: "s1", type: "story", speaker: "captain",
            text: {
              en: `Welcome to **Cargo Cove**, the busiest harbour on the chart. Ships load and unload all day.

Until now, every variable held **one** value. But my hold has forty crates, and I'm not making forty variables. I need one name for the whole lot, in order, that I can add to and take from.

Python calls that a **list**.`,
              sl: `Dobrodošel v **Tovornem zalivu**, najbolj prometnem pristanišču na karti. Ladje ves dan nakladajo in razkladajo.

Do zdaj je vsaka spremenljivka hranila **eno** vrednost. A moje skladišče ima štirideset zabojev in ne bom delal štiridesetih spremenljivk. Potrebujem eno ime za vse, po vrsti, kamor lahko dodajam in jemljem.

Python temu pravi **seznam**.`,
            },
          },
          {
            id: "s2", type: "learn",
            text: {
              en: `A **list** is written with square brackets, items separated by commas:
:::
cargo = ["rope", "rum", "cannonballs", "maps"]
:::
Lists work a lot like strings:
- Index from 0: ~cargo[0]~, ~cargo[-1]~
- ~len(cargo)~ counts the items
- ~"rum" in cargo~ checks membership

The big difference: lists are **mutable**. You can replace an item: ~cargo[1] = "water"~. A list can hold any type, even a mix.`,
              sl: `**Seznam** se piše z oglatimi oklepaji, elementi so ločeni z vejicami:
:::
cargo = ["rope", "rum", "cannonballs", "maps"]
:::
Seznami delujejo podobno kot nizi:
- Indeksi od 0: ~cargo[0]~, ~cargo[-1]~
- ~len(cargo)~ prešteje elemente
- ~"rum" in cargo~ preveri prisotnost

Velika razlika: seznami so **spremenljivi**. Element lahko zamenjaš: ~cargo[1] = "water"~. Seznam lahko hrani kateri koli tip, tudi mešanico.`,
            },
            example: `cargo = ["rope", "rum", "cannonballs", "maps"]\nprint(cargo)\nprint(cargo[0], "and", cargo[-1])\nprint("Crates:", len(cargo))\nprint("Any rum?", "rum" in cargo)\ncargo[1] = "water"\nprint(cargo)\nmixed = ["Pip", 40, 1.5, True]\nprint(mixed)\n`,
          },
          {
            id: "s3", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `crew = ["Pip", "Anne", "Jack"]\ncrew[1] = "Mary"\nprint(crew)\n`,
            options: ["['Pip', 'Anne', 'Jack']", "['Pip', 'Mary', 'Jack']", "['Mary', 'Anne', 'Jack']", { en: "An error", sl: "Napaka" }],
            answer: 1,
            explain: { en: "Index 1 is the second item, Anne. Assigning to ~crew[1]~ replaces her with Mary. Lists can be changed; strings can't.", sl: "Indeks 1 je drugi element, Anne. Prirejanje ~crew[1]~ jo zamenja z Mary. Sezname lahko spreminjaš, nizov ne." },
          },
          {
            id: "s4", type: "code", kind: "task",
            text: {
              en: `Using the list ~cargo~:
1. Print ~First: rope~ and ~Last: maps~ using indexes.
2. Print ~Items: 4~ using ~len~.
3. The rum went bad. Replace ~"rum"~ with ~"water"~ by index, then print the list.`,
              sl: `S seznamom ~cargo~:
1. Z indeksi izpiši ~First: rope~ in ~Last: maps~.
2. Z ~len~ izpiši ~Items: 4~.
3. Rum se je pokvaril. ~"rum"~ zamenjaj z ~"water"~ prek indeksa, nato izpiši seznam.`,
            },
            starter: `cargo = ["rope", "rum", "cannonballs", "maps"]\n`,
            tests: [
              { check: R`assert "First: rope" in clean and "Last: maps" in clean`, msg: { en: "Print First: rope and Last: maps.", sl: "Izpiši First: rope in Last: maps." } },
              { check: R`assert "Items: 4" in clean`, msg: { en: "Print Items: 4.", sl: "Izpiši Items: 4." } },
              { check: R`assert ns.get("cargo") == ["rope", "water", "cannonballs", "maps"] and "['rope', 'water', 'cannonballs', 'maps']" in out`, msg: { en: "Replace rum with water (cargo[1] = ...) and print the list.", sl: "Zamenjaj rum z water (cargo[1] = ...) in izpiši seznam." } },
              { check: R`assert "cargo[0]" in code and "cargo[-1]" in code and "len(" in code`, msg: { en: "Use cargo[0], cargo[-1] and len(cargo) rather than typing the values.", sl: "Uporabi cargo[0], cargo[-1] in len(cargo) namesto tipkanja vrednosti." } },
            ],
            hints: [
              { en: "~print(\"First:\", cargo[0])~ and similar for the last.", sl: "~print(\"First:\", cargo[0])~ in podobno za zadnjega." },
              { en: "Rum is at index 1: ~cargo[1] = \"water\"~", sl: "Rum je na indeksu 1: ~cargo[1] = \"water\"~" },
            ],
            solution: `cargo = ["rope", "rum", "cannonballs", "maps"]\nprint("First:", cargo[0])\nprint("Last:", cargo[-1])\nprint("Items:", len(cargo))\ncargo[1] = "water"\nprint(cargo)\n`,
          },
        ],
      },
      {
        id: "c6l2",
        title: { en: "Loading and Unloading", sl: "Nakladanje in razkladanje" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `Lists have methods for adding and removing:
- ~append(x)~ adds to the **end**
- ~insert(i, x)~ adds at position ~i~
- ~remove(x)~ removes the first item equal to ~x~
- ~pop()~ removes the last item **and gives it back**; ~pop(i)~ does that at position ~i~
- ~index(x)~ finds where ~x~ is

Important: ~append~, ~insert~, ~remove~ and ~sort~ change the list **in place** and return ~None~. Don't write ~cargo = cargo.append(x)~.`,
              sl: `Seznami imajo metode za dodajanje in odstranjevanje:
- ~append(x)~ doda na **konec**
- ~insert(i, x)~ doda na mesto ~i~
- ~remove(x)~ odstrani prvi element, enak ~x~
- ~pop()~ odstrani zadnji element **in ga vrne**; ~pop(i)~ to naredi na mestu ~i~
- ~index(x)~ poišče, kje je ~x~

Pomembno: ~append~, ~insert~, ~remove~ in ~sort~ spremenijo seznam **na mestu** in vrnejo ~None~. Ne piši ~cargo = cargo.append(x)~.`,
            },
            example: `crew = ["Pip", "Marlow"]\ncrew.append("Anne")\nprint(crew)\ncrew.insert(0, "Jack")\nprint(crew)\ncrew.remove("Pip")\nprint(crew)\nleaving = crew.pop()\nprint(leaving, "left the ship. Crew:", crew)\nprint("Marlow is at index", crew.index("Marlow"))\n`,
          },
          {
            id: "s2", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `a = [1, 2, 3]\na.append(4)\na.pop(0)\nprint(a)\n`,
            options: ["[1, 2, 3, 4]", "[2, 3, 4]", "[1, 2, 3]", "[4, 1, 2, 3]"],
            answer: 1,
            explain: { en: "~append(4)~ makes [1, 2, 3, 4]. ~pop(0)~ removes the item at index 0, leaving [2, 3, 4].", sl: "~append(4)~ naredi [1, 2, 3, 4]. ~pop(0)~ odstrani element na indeksu 0, ostane [2, 3, 4]." },
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `Crew changes on the Serpent. Starting from ~crew = ["Pip", "Marlow"]~:
1. ~"Anne"~ joins at the end.
2. ~"Jack"~ joins at the **front**.
3. ~"Pip"~ leaves for a nap.

Print the final list: ~['Jack', 'Marlow', 'Anne']~`,
              sl: `Menjave posadke na Kači. Začni z ~crew = ["Pip", "Marlow"]~:
1. ~"Anne"~ se pridruži na koncu.
2. ~"Jack"~ se pridruži **spredaj**.
3. ~"Pip"~ odide spat.

Izpiši končni seznam: ~['Jack', 'Marlow', 'Anne']~`,
            },
            starter: `crew = ["Pip", "Marlow"]\n`,
            tests: [
              { check: R`assert ns.get("crew") == ["Jack", "Marlow", "Anne"]`, msg: { en: "crew should end as ['Jack', 'Marlow', 'Anne'].", sl: "crew naj na koncu bo ['Jack', 'Marlow', 'Anne']." } },
              { check: R`assert ".append(" in code and ".insert(" in code and ".remove(" in code`, msg: { en: "Use append, insert and remove.", sl: "Uporabi append, insert in remove." } },
              { check: R`assert "['Jack', 'Marlow', 'Anne']" in out`, msg: { en: "Print the final list.", sl: "Izpiši končni seznam." } },
            ],
            hints: [
              { en: "The front of a list is index 0.", sl: "Začetek seznama je indeks 0." },
              { en: "~crew.append(\"Anne\")~, ~crew.insert(0, \"Jack\")~, ~crew.remove(\"Pip\")~", sl: "~crew.append(\"Anne\")~, ~crew.insert(0, \"Jack\")~, ~crew.remove(\"Pip\")~" },
            ],
            solution: `crew = ["Pip", "Marlow"]\ncrew.append("Anne")\ncrew.insert(0, "Jack")\ncrew.remove("Pip")\nprint(crew)\n`,
          },
          {
            id: "s4", type: "code", kind: "task",
            text: {
              en: `Pack the sea chest. Start with an empty list ~[]~. Keep asking ~Item? ~ and add each answer, until the answer is ~done~. Then print the list and how many items. For rope, rum, done:
:::
Packed: ['rope', 'rum']
Count: 2
:::`,
              sl: `Spakiraj pomorsko skrinjo. Začni s praznim seznamom ~[]~. Sprašuj ~Item? ~ in dodaj vsak odgovor, dokler odgovor ni ~done~. Nato izpiši seznam in število predmetov. Za rope, rum, done:
:::
Packed: ['rope', 'rum']
Count: 2
:::`,
            },
            starter: `items = []\n`,
            stdin: "rope\nrum\ndone",
            tests: [
              { stdin: ["rope", "rum", "done"], check: R`assert "Packed: ['rope', 'rum']" in clean and "Count: 2" in clean`, msg: { en: "For rope, rum, done: Packed: ['rope', 'rum'] and Count: 2", sl: "Za rope, rum, done: Packed: ['rope', 'rum'] in Count: 2" } },
              { stdin: ["done"], check: R`assert "Packed: []" in clean and "Count: 0" in clean`, msg: { en: "Saying done right away should give Packed: [] and Count: 0", sl: "Takojšnji done naj da Packed: [] in Count: 0" } },
            ],
            hints: [
              { en: "Use the ~while True~ / ~break~ pattern from Whirlpool Reef, with ~items.append(item)~ inside.", sl: "Uporabi vzorec ~while True~ / ~break~ z Grebena vrtincev, z ~items.append(item)~ v notranjosti." },
              { en: "After the loop: ~print(\"Packed:\", items)~ and ~print(\"Count:\", len(items))~", sl: "Po zanki: ~print(\"Packed:\", items)~ in ~print(\"Count:\", len(items))~" },
            ],
            solution: `items = []\nwhile True:\n    item = input("Item? ")\n    if item == "done":\n        break\n    items.append(item)\nprint("Packed:", items)\nprint("Count:", len(items))\n`,
          },
          {
            id: "s5", type: "code", kind: "debug",
            text: {
              en: "The cook's shopping list ends up as ~None~. Fix it so it prints ~['bread', 'water', 'cheese']~",
              sl: "Kuharjev nakupovalni seznam se konča kot ~None~. Popravi, da izpiše ~['bread', 'water', 'cheese']~",
            },
            starter: `supplies = ["bread", "water"]\nsupplies = supplies.append("cheese")\nprint(supplies)\n`,
            tests: [{ check: R`assert clean == ["['bread', 'water', 'cheese']"]`, msg: { en: "It should print ['bread', 'water', 'cheese']", sl: "Izpisati mora ['bread', 'water', 'cheese']" } }],
            hints: [
              { en: "What does ~append~ return? Look at the output.", sl: "Kaj vrne ~append~? Poglej izpis." },
              { en: "~append~ changes the list itself. Just call ~supplies.append(\"cheese\")~ without assigning.", sl: "~append~ spremeni sam seznam. Samo pokliči ~supplies.append(\"cheese\")~ brez prirejanja." },
            ],
            solution: `supplies = ["bread", "water"]\nsupplies.append("cheese")\nprint(supplies)\n`,
          },
        ],
      },
      {
        id: "c6l3",
        title: { en: "Walking the Deck", sl: "Sprehod po palubi" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `A ~for~ loop walks through a list item by item: ~for crate in cargo:~

Python also has built-in helpers for lists of numbers: ~sum~, ~min~, ~max~, ~len~.

Need the position too? ~enumerate~ gives you pairs of (index, item):
:::
for i, name in enumerate(crew, start=1):
:::
Sorting comes in two flavours:
- ~sorted(x)~ returns a **new** sorted list and leaves ~x~ alone
- ~x.sort()~ sorts ~x~ itself
Add ~reverse=True~ to either for largest first.`,
              sl: `Zanka ~for~ gre skozi seznam element za elementom: ~for crate in cargo:~

Python ima tudi vgrajene pomočnike za sezname števil: ~sum~, ~min~, ~max~, ~len~.

Potrebuješ še položaj? ~enumerate~ ti da pare (indeks, element):
:::
for i, name in enumerate(crew, start=1):
:::
Razvrščanje ima dve obliki:
- ~sorted(x)~ vrne **nov** razvrščen seznam in ~x~ pusti pri miru
- ~x.sort()~ razvrsti sam ~x~
Obema dodaj ~reverse=True~ za največje najprej.`,
            },
            example: `crew = ["Anne", "Pip", "Jack"]\nfor sailor in crew:\n    print("Ahoy,", sailor)\n\nfor i, sailor in enumerate(crew, start=1):\n    print(f"{i}. {sailor}")\n\nweights = [12, 40, 7]\nprint(sum(weights), min(weights), max(weights))\nprint(sorted(weights), sorted(weights, reverse=True))\nprint(weights)   # unchanged\n`,
          },
          {
            id: "s2", type: "code", kind: "task",
            text: {
              en: `The crates weigh ~[12, 40, 7, 33, 18]~ kg. Use the built-in helpers to print:
:::
Total: 110
Heaviest: 40
Lightest: 7
Average: 22.0
:::`,
              sl: `Zaboji tehtajo ~[12, 40, 7, 33, 18]~ kg. Z vgrajenimi pomočniki izpiši:
:::
Total: 110
Heaviest: 40
Lightest: 7
Average: 22.0
:::`,
            },
            starter: `weights = [12, 40, 7, 33, 18]\n`,
            tests: [
              { check: R`assert clean == ["Total: 110", "Heaviest: 40", "Lightest: 7", "Average: 22.0"]`, msg: { en: "Expected Total: 110, Heaviest: 40, Lightest: 7, Average: 22.0", sl: "Pričakovano Total: 110, Heaviest: 40, Lightest: 7, Average: 22.0" } },
              { check: R`assert all(f in code for f in ("sum(", "max(", "min(", "len("))`, msg: { en: "Use sum, max, min and len.", sl: "Uporabi sum, max, min in len." } },
            ],
            hints: [
              { en: "Average is the total divided by how many there are.", sl: "Povprečje je vsota, deljena s številom elementov." },
              { en: "~sum(weights) / len(weights)~", sl: "~sum(weights) / len(weights)~" },
            ],
            solution: `weights = [12, 40, 7, 33, 18]\nprint("Total:", sum(weights))\nprint("Heaviest:", max(weights))\nprint("Lightest:", min(weights))\nprint("Average:", sum(weights) / len(weights))\n`,
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `Print the crew roster, numbered from 1, in **alphabetical order**:
:::
1. Anne
2. Jack
3. Mary
4. Pip
:::`,
              sl: `Izpiši seznam posadke, oštevilčen od 1, po **abecednem vrstnem redu**:
:::
1. Anne
2. Jack
3. Mary
4. Pip
:::`,
            },
            starter: `crew = ["Pip", "Anne", "Mary", "Jack"]\n`,
            tests: [
              { check: R`assert clean == ["1. Anne", "2. Jack", "3. Mary", "4. Pip"]`, msg: { en: "Expected 1. Anne, 2. Jack, 3. Mary, 4. Pip", sl: "Pričakovano 1. Anne, 2. Jack, 3. Mary, 4. Pip" } },
              { check: R`assert "for" in code and ("sorted(" in code or ".sort(" in code)`, msg: { en: "Sort the list in code and loop over it.", sl: "Seznam razvrsti v kodi in teci po njem." } },
            ],
            hints: [
              { en: "Loop over ~sorted(crew)~ with ~enumerate(..., start=1)~.", sl: "Teci po ~sorted(crew)~ z ~enumerate(..., start=1)~." },
              { en: "~print(f\"{i}. {name}\")~", sl: "~print(f\"{i}. {name}\")~" },
            ],
            solution: `crew = ["Pip", "Anne", "Mary", "Jack"]\nfor i, name in enumerate(sorted(crew), start=1):\n    print(f"{i}. {name}")\n`,
          },
          {
            id: "s4", type: "code", kind: "task",
            text: {
              en: `The gunnery test scores are in. Build a **new list** ~passed~ with only the scores of **50 or more**, keeping their order, and print it:
:::
[72, 50, 91, 66]
:::`,
              sl: `Rezultati topniškega preizkusa so tu. Zgradi **nov seznam** ~passed~ samo z rezultati **50 ali več**, v istem vrstnem redu, in ga izpiši:
:::
[72, 50, 91, 66]
:::`,
            },
            starter: `scores = [72, 45, 50, 12, 91, 66, 49]\npassed = []\n`,
            tests: [
              { check: R`assert ns.get("passed") == [72, 50, 91, 66]`, msg: { en: "passed should be [72, 50, 91, 66].", sl: "passed naj bo [72, 50, 91, 66]." } },
              { check: R`assert "[72, 50, 91, 66]" in out`, msg: { en: "Print the passed list.", sl: "Izpiši seznam passed." } },
            ],
            hints: [
              { en: "Loop over ~scores~ and ~append~ the ones that pass.", sl: "Teci po ~scores~ in z ~append~ dodaj tiste, ki so uspešni." },
              { en: "~if score >= 50: passed.append(score)~", sl: "~if score >= 50: passed.append(score)~" },
            ],
            solution: `scores = [72, 45, 50, 12, 91, 66, 49]\npassed = []\nfor score in scores:\n    if score >= 50:\n        passed.append(score)\nprint(passed)\n`,
          },
          {
            id: "s5", type: "predict",
            text: { en: "~sorted~ or ~sort~? What prints?", sl: "~sorted~ ali ~sort~? Kaj se izpiše?" },
            code: `nums = [3, 1, 2]\ns = sorted(nums)\nprint(nums, s)\n`,
            options: ["[1, 2, 3] [1, 2, 3]", "[3, 1, 2] [1, 2, 3]", "[3, 1, 2] None", "None [1, 2, 3]"],
            answer: 1,
            explain: { en: "~sorted~ makes a new list and leaves the original untouched. If you'd used ~nums.sort()~, ~nums~ would change and the call would return ~None~.", sl: "~sorted~ naredi nov seznam, izvirnik pa ostane nedotaknjen. Pri ~nums.sort()~ bi se ~nums~ spremenil, klic pa bi vrnil ~None~." },
          },
        ],
      },
      {
        id: "c6l4",
        title: { en: "Slices and Grids", sl: "Rezine in mreže" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `Lists slice exactly like strings: ~crew[1:3]~, ~crew[:2]~, ~crew[::-1]~.

A list can hold other lists. That's how you make a **grid**, like a treasure map:
:::
grid = [
    [".", ".", "."],
    [".", "X", "."],
]
:::
~grid[1]~ is the second row, and ~grid[1][1]~ is the cell in that row. Read it as ~grid[row][column]~.`,
              sl: `Seznami se režejo natanko kot nizi: ~crew[1:3]~, ~crew[:2]~, ~crew[::-1]~.

Seznam lahko vsebuje druge sezname. Tako narediš **mrežo**, na primer zemljevid zaklada:
:::
grid = [
    [".", ".", "."],
    [".", "X", "."],
]
:::
~grid[1]~ je druga vrstica, ~grid[1][1]~ pa celica v njej. Beri kot ~grid[vrstica][stolpec]~.`,
            },
            example: `crew = ["Anne", "Pip", "Jack", "Mary", "Bo"]\nprint(crew[1:3], crew[:2], crew[-2:])\n\ngrid = [\n    [".", ".", "~", "."],\n    [".", "X", "~", "."],\n    ["~", "~", "~", "."],\n]\nprint(grid[1][1])\nfor row in grid:\n    print(" ".join(row))\n`,
          },
          {
            id: "s2", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `grid = [[1, 2, 3], [4, 5, 6]]\nprint(grid[1][0], grid[0][-1])\n`,
            options: ["4 3", "2 6", "4 6", "1 3"],
            answer: 0,
            explain: { en: "~grid[1]~ is ~[4, 5, 6]~, and its index 0 is 4. ~grid[0]~ is ~[1, 2, 3]~, and its last item is 3.", sl: "~grid[1]~ je ~[4, 5, 6]~, njegov indeks 0 pa 4. ~grid[0]~ je ~[1, 2, 3]~, njegov zadnji element pa 3." },
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `Somewhere on this map is an ~X~. Use **nested loops** to search every cell and print where it is, counting rows and columns **from 1**:
:::
Treasure at row 2, column 4
:::
Don't count by eye: the map could change.`,
              sl: `Nekje na tem zemljevidu je ~X~. Z **gnezdenima zankama** preišči vsako celico in izpiši, kje je, pri čemer vrstice in stolpce šteješ **od 1**:
:::
Treasure at row 2, column 4
:::
Ne štej na oko: zemljevid se lahko spremeni.`,
            },
            starter: `grid = [\n    [".", ".", "~", ".", "."],\n    [".", "~", "~", "X", "."],\n    [".", ".", ".", ".", "~"],\n]\n`,
            tests: [
              { check: R`assert "treasure at row 2, column 4" in [norm(l) for l in clean]`, msg: { en: "It should print Treasure at row 2, column 4", sl: "Izpisati mora Treasure at row 2, column 4" } },
              { check: R`assert code.count("for") >= 2 and "row 2" not in code and "column 4" not in code`, msg: { en: "Find the X with two nested loops instead of typing the position.", sl: "X poišči z dvema gnezdenima zankama, ne tipkaj položaja." } },
            ],
            hints: [
              { en: "Use ~enumerate~ on both loops so you know the row and column numbers.", sl: "Pri obeh zankah uporabi ~enumerate~, da poznaš številki vrstice in stolpca." },
              { en: "~for r, row in enumerate(grid, start=1):~ then ~for c, cell in enumerate(row, start=1):~ and check ~if cell == \"X\":~", sl: "~for r, row in enumerate(grid, start=1):~ nato ~for c, cell in enumerate(row, start=1):~ in preveri ~if cell == \"X\":~" },
            ],
            solution: `grid = [\n    [".", ".", "~", ".", "."],\n    [".", "~", "~", "X", "."],\n    [".", ".", ".", ".", "~"],\n]\nfor r, row in enumerate(grid, start=1):\n    for c, cell in enumerate(row, start=1):\n        if cell == "X":\n            print(f"Treasure at row {r}, column {c}")\n`,
          },
        ],
      },
      {
        id: "c6l5",
        title: { en: "Tuples and Unpacking", sl: "Terke in razpakiranje" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `A **tuple** is like a list that can't change. Use round brackets: ~point = (3, 4)~. Use tuples for values that belong together, like coordinates or a name with an age.

**Unpacking** takes a tuple apart into variables in one go:
:::
x, y = point
:::
It works in loops too: ~for name, days in routes:~

And it gives Python the neatest swap in any language: ~a, b = b, a~`,
              sl: `**Terka** je kot seznam, ki se ne more spreminjati. Uporabi okrogle oklepaje: ~point = (3, 4)~. Terke uporabljaj za vrednosti, ki spadajo skupaj, kot koordinate ali ime s starostjo.

**Razpakiranje** razstavi terko v spremenljivke v enem koraku:
:::
x, y = point
:::
Deluje tudi v zankah: ~for name, days in routes:~

In Pythonu omogoči najlepšo zamenjavo v katerem koli jeziku: ~a, b = b, a~`,
            },
            example: `point = (3, 4)\nx, y = point\nprint("x =", x, "y =", y)\n\nroutes = [("Tortuga", 3), ("Sirocco", 8)]\nfor port, days in routes:\n    print(port, "is", days, "days away")\n\na, b = "left", "right"\na, b = b, a\nprint(a, b)\n`,
          },
          {
            id: "s2", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `a, b = 1, 2\na, b = b, a\nprint(a, b)\n`,
            options: ["1 2", "2 1", "2 2", { en: "An error", sl: "Napaka" }],
            answer: 1,
            explain: { en: "The right side ~b, a~ is worked out first as the tuple ~(2, 1)~, then unpacked into ~a~ and ~b~. No temporary variable needed.", sl: "Desna stran ~b, a~ se najprej izračuna kot terka ~(2, 1)~, nato se razpakira v ~a~ in ~b~. Začasna spremenljivka ni potrebna." },
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `Loop over ~routes~ with unpacking and print how far each port is, then the **nearest** port:
:::
Tortuga is 3 days away
Sirocco is 8 days away
Skull Rock is 5 days away
Nearest: Tortuga
:::`,
              sl: `Teci po ~routes~ z razpakiranjem in izpiši, kako daleč je vsako pristanišče, nato pa **najbližje**:
:::
Tortuga is 3 days away
Sirocco is 8 days away
Skull Rock is 5 days away
Nearest: Tortuga
:::`,
            },
            starter: `routes = [("Tortuga", 3), ("Sirocco", 8), ("Skull Rock", 5)]\n`,
            tests: [
              { check: R`assert clean[:3] == ["Tortuga is 3 days away", "Sirocco is 8 days away", "Skull Rock is 5 days away"]`, msg: { en: "First print each route as Port is N days away.", sl: "Najprej izpiši vsako pot kot Port is N days away." } },
              { check: R`assert clean[-1] == "Nearest: Tortuga"`, msg: { en: "Finish with Nearest: Tortuga.", sl: "Končaj z Nearest: Tortuga." } },
              { check: R`import re
assert re.search(r"for\s+\w+\s*,\s*\w+\s+in", code)`, msg: { en: "Unpack the tuples in the for loop: for port, days in routes:", sl: "Terke razpakiraj v zanki for: for port, days in routes:" } },
            ],
            hints: [
              { en: "Track the nearest as you loop: keep ~best_port~ and ~best_days~, update them when you find a smaller number of days.", sl: "Najbližjega spremljaj med zanko: hrani ~best_port~ in ~best_days~ in ju posodobi, ko najdeš manjše število dni." },
              { en: "Start ~best_days~ at something huge, like ~999~, so the first route always wins.", sl: "~best_days~ začni z nečim ogromnim, na primer ~999~, da prva pot vedno zmaga." },
            ],
            solution: `routes = [("Tortuga", 3), ("Sirocco", 8), ("Skull Rock", 5)]\nbest_port = None\nbest_days = 999\nfor port, days in routes:\n    print(port, "is", days, "days away")\n    if days < best_days:\n        best_port, best_days = port, days\nprint("Nearest:", best_port)\n`,
          },
          {
            id: "s4", type: "code", kind: "debug",
            text: {
              en: "The lookout wants to move the point's x to 5, but tuples can't be changed. Fix it by building a **new** tuple, so it prints ~(5, 4)~.",
              sl: "Stražar želi x točke premakniti na 5, a terk ni mogoče spreminjati. Popravi tako, da zgradiš **novo** terko, da izpiše ~(5, 4)~.",
            },
            starter: `point = (3, 4)\npoint[0] = 5\nprint(point)\n`,
            tests: [
              { check: R`assert clean == ["(5, 4)"] and isinstance(ns.get("point"), tuple)`, msg: { en: "point should be the tuple (5, 4).", sl: "point naj bo terka (5, 4)." } },
            ],
            hints: [
              { en: "You can't change a tuple, but you can make the variable point to a new one.", sl: "Terke ne moreš spremeniti, lahko pa spremenljivki daš novo." },
              { en: "~point = (5, point[1])~", sl: "~point = (5, point[1])~" },
            ],
            solution: `point = (3, 4)\npoint = (5, point[1])\nprint(point)\n`,
          },
        ],
      },
      {
        id: "c6l6",
        title: { en: "Solo Voyage: The Cargo Manifest", sl: "Samostojna plovba: Tovorni list" },
        solo: true,
        steps: [
          {
            id: "s1", type: "story", speaker: "captain",
            text: {
              en: `The harbour inspector wants a manifest before we sail: every crate, its weight and value, and proof we're not overloaded. The Serpent carries **100 kg** at most in the forward hold.

The quartermaster will read each crate out as ~name,weight,value~. Your program writes the report.`,
              sl: `Pristaniški inšpektor pred izplutjem želi tovorni list: vsak zaboj, njegovo težo in vrednost ter dokaz, da nismo preobremenjeni. Kača v sprednjem skladišču nosi največ **100 kg**.

Intendant bo vsak zaboj prebral kot ~ime,teža,vrednost~. Tvoj program napiše poročilo.`,
            },
          },
          {
            id: "s2", type: "code", kind: "project",
            text: {
              en: `Write the manifest program.

**Input**: keep asking ~Cargo? ~. Each answer looks like ~rope,12,30~ (name, weight in kg, value). The answer ~done~ ends the list.

**Report**, for ~rope,12,30~ ~cannon,60,45~ ~silk,8,90~ ~gold,5,200~:
:::
Items: 4
Total weight: 85 kg
Total value: 365 doubloons
Heaviest: cannon
Valuable: gold, silk
Load is safe
:::
- ~Valuable~ lists items worth **more than 50**, in alphabetical order, joined with ~", "~. If there are none, print ~Valuable: none~.
- If the total weight is over 100, print ~Overloaded by 12 kg!~ (with the real number) instead of ~Load is safe~.`,
              sl: `Napiši program za tovorni list.

**Vnos**: sprašuj ~Cargo? ~. Vsak odgovor je kot ~rope,12,30~ (ime, teža v kg, vrednost). Odgovor ~done~ konča seznam.

**Poročilo** za ~rope,12,30~ ~cannon,60,45~ ~silk,8,90~ ~gold,5,200~:
:::
Items: 4
Total weight: 85 kg
Total value: 365 doubloons
Heaviest: cannon
Valuable: gold, silk
Load is safe
:::
- ~Valuable~ navede predmete, vredne **več kot 50**, po abecedi, združene z ~", "~. Če jih ni, izpiši ~Valuable: none~.
- Če je skupna teža nad 100, namesto ~Load is safe~ izpiši ~Overloaded by 12 kg!~ (s pravim številom).`,
            },
            starter: `# Solo voyage: the Cargo Manifest\n`,
            stdin: "rope,12,30\ncannon,60,45\nsilk,8,90\ngold,5,200\ndone",
            tests: [
              { stdin: ["rope,12,30", "cannon,60,45", "silk,8,90", "gold,5,200", "done"], check: R`c = [norm(l) for l in clean]
for want in ["items: 4", "total weight: 85 kg", "total value: 365 doubloons", "heaviest: cannon", "valuable: gold, silk", "load is safe"]:
    assert want in c, want`, msg: { en: "For the example cargo the report should be exactly as shown: Items: 4, Total weight: 85 kg, Total value: 365 doubloons, Heaviest: cannon, Valuable: gold, silk, Load is safe.", sl: "Za primer tovora naj bo poročilo natanko kot prikazano: Items: 4, Total weight: 85 kg, Total value: 365 doubloons, Heaviest: cannon, Valuable: gold, silk, Load is safe." } },
              { stdin: ["anchor,70,20", "barrels,42,10", "done"], check: R`c = [norm(l) for l in clean]
assert "valuable: none" in c and "overloaded by 12 kg!" in c and "heaviest: anchor" in c and "load is safe" not in c`, msg: { en: "For anchor,70,20 and barrels,42,10: Valuable: none, Heaviest: anchor and Overloaded by 12 kg!", sl: "Za anchor,70,20 in barrels,42,10: Valuable: none, Heaviest: anchor in Overloaded by 12 kg!" } },
              { stdin: ["map,1,500", "done"], check: R`c = [norm(l) for l in clean]
assert "items: 1" in c and "valuable: map" in c and "total weight: 1 kg" in c`, msg: { en: "A single map,1,500 should give Items: 1, Total weight: 1 kg and Valuable: map.", sl: "Sam map,1,500 naj da Items: 1, Total weight: 1 kg in Valuable: map." } },
            ],
            hints: [
              { en: "Collect each crate as a tuple ~(name, weight, value)~ in a list. ~line.split(\",\")~ gives you the three parts as text, so convert the numbers.", sl: "Vsak zaboj zberi kot terko ~(ime, teža, vrednost)~ v seznamu. ~line.split(\",\")~ vrne tri dele kot besedilo, zato števila pretvori." },
              { en: "After the input loop, walk the list once to add up totals and track the heaviest. Build a list of valuable names, ~sorted~ it, and use ~\", \".join(...)~.", sl: "Po vnosni zanki enkrat prehodi seznam, seštej vsote in spremljaj najtežjega. Zgradi seznam dragocenih imen, ga razvrsti s ~sorted~ in uporabi ~\", \".join(...)~." },
            ],
            solution: `cargo = []\nwhile True:\n    line = input("Cargo? ")\n    if line == "done":\n        break\n    name, weight, value = line.split(",")\n    cargo.append((name, int(weight), int(value)))\n\ntotal_weight = 0\ntotal_value = 0\nheaviest = None\nheaviest_weight = -1\nvaluable = []\nfor name, weight, value in cargo:\n    total_weight += weight\n    total_value += value\n    if weight > heaviest_weight:\n        heaviest, heaviest_weight = name, weight\n    if value > 50:\n        valuable.append(name)\n\nprint("Items:", len(cargo))\nprint("Total weight:", total_weight, "kg")\nprint("Total value:", total_value, "doubloons")\nprint("Heaviest:", heaviest)\nif valuable:\n    print("Valuable:", ", ".join(sorted(valuable)))\nelse:\n    print("Valuable: none")\nif total_weight > 100:\n    print(f"Overloaded by {total_weight - 100} kg!")\nelse:\n    print("Load is safe")\n`,
            after: {
              en: "~if valuable:~ works because an empty list counts as False. That's called **truthiness**, and it makes checks like this short and readable.",
              sl: "~if valuable:~ deluje, ker prazen seznam šteje kot False. Temu pravimo **resničnost** (truthiness) in naredi take preverbe kratke in berljive.",
            },
          },
        ],
      },
    ],
  };
})();
