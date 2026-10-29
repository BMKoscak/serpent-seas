/* Island 7 — Lockbox Lagoon: dictionaries, looping dicts, counting, nested data, sets */
(function () {
  const R = String.raw;
  (window.SS_ISLANDS = window.SS_ISLANDS || {}).c7 = {
    blurb: {
      en: "Every lockbox here has a label and something inside. Dictionaries pair keys with values; sets keep only what's unique. Build inventories, tallies and rosters.",
      sl: "Vsaka skrinjica tukaj ima oznako in nekaj v sebi. Slovarji povežejo ključe z vrednostmi, množice pa hranijo samo edinstveno. Zgradi inventarje, štetja in sezname.",
    },
    log: {
      en: `**Dictionaries** map **keys** to **values**:
:::
prices = {"rum": 5, "bread": 2}
prices["rum"]              # 5
prices["fish"] = 3         # add or update
del prices["bread"]        # remove
prices.get("cake", 0)      # 0 if the key is missing (no KeyError)
"rum" in prices            # checks keys
len(prices)
:::
**Looping**:
:::
for key in d:                  # keys
for value in d.values():
for key, value in d.items():
for key in sorted(d):          # keys in order
:::
**Counting** pattern:
:::
counts = {}
for word in words:
    counts[word] = counts.get(word, 0) + 1
best = max(counts, key=counts.get)
:::
**Nested data**: ~ship["crew"][0]~, lists of dicts, dicts of lists.

**Sets** keep unique items, no order: ~{"a", "b"}~, ~set(my_list)~, ~s.add(x)~.
- ~a | b~ union, ~a & b~ in both, ~a - b~ only in ~a~. Empty set: ~set()~ (~{}~ is an empty dict).`,
      sl: `**Slovarji** povežejo **ključe** z **vrednostmi**:
:::
cene = {"rum": 5, "kruh": 2}
cene["rum"]               # 5
cene["riba"] = 3          # dodaj ali posodobi
del cene["kruh"]          # odstrani
cene.get("torta", 0)      # 0, če ključa ni (brez KeyError)
"rum" in cene             # preverja ključe
len(cene)
:::
**Zanke**:
:::
for kljuc in d:                  # ključi
for vrednost in d.values():
for kljuc, vrednost in d.items():
for kljuc in sorted(d):          # ključi po vrsti
:::
Vzorec **štetja**:
:::
stevci = {}
for beseda in besede:
    stevci[beseda] = stevci.get(beseda, 0) + 1
najpogostejsa = max(stevci, key=stevci.get)
:::
**Gnezdeni podatki**: ~ladja["posadka"][0]~, seznami slovarjev, slovarji seznamov.

**Množice** hranijo edinstvene elemente, brez vrstnega reda: ~{"a", "b"}~, ~set(seznam)~, ~s.add(x)~.
- ~a | b~ unija, ~a & b~ v obeh, ~a - b~ samo v ~a~. Prazna množica: ~set()~ (~{}~ je prazen slovar).`,
    },
    lessons: [
      {
        id: "c7l1",
        title: { en: "The Lockbox", sl: "Skrinjica" },
        steps: [
          {
            id: "s1", type: "story", speaker: "pip",
            text: {
              en: `Squawk! **Lockbox Lagoon**, home of the Bank of the Brethren. Thousands of little lockboxes, each with a name burned into the lid.

You don't find a lockbox by counting along a shelf like a list. You walk up and ask for it **by name**: "Marlow's box, please." Python has exactly that: the **dictionary**.`,
              sl: `Skvak! **Laguna skrinjic**, dom Banke bratovščine. Na tisoče skrinjic, vsaka z imenom, vžganim v pokrov.

Skrinjice ne najdeš tako, da šteješ po polici kot pri seznamu. Stopiš do okenca in jo zahtevaš **po imenu**: "Marlowovo skrinjico, prosim." Python ima natanko to: **slovar**.`,
            },
          },
          {
            id: "s2", type: "learn",
            text: {
              en: `A **dictionary** (~dict~) stores pairs of **key: value** inside curly braces:
:::
prices = {"rum": 5, "bread": 2, "fish": 3}
:::
- Look up a value by its key: ~prices["rum"]~
- Add or update: ~prices["cheese"] = 4~
- Remove: ~del prices["fish"]~
- Asking for a missing key raises ~KeyError~. ~prices.get("cake", 0)~ returns 0 instead.
- ~"rum" in prices~ checks the **keys**.

Keys are usually strings or numbers, and each key appears only once.`,
              sl: `**Slovar** (~dict~) hrani pare **ključ: vrednost** v zavitih oklepajih:
:::
prices = {"rum": 5, "bread": 2, "fish": 3}
:::
- Vrednost poiščeš po ključu: ~prices["rum"]~
- Dodaš ali posodobiš: ~prices["cheese"] = 4~
- Odstraniš: ~del prices["fish"]~
- Zahteva po manjkajočem ključu sproži ~KeyError~. ~prices.get("cake", 0)~ pa vrne 0.
- ~"rum" in prices~ preveri **ključe**.

Ključi so običajno nizi ali števila, vsak ključ pa se pojavi samo enkrat.`,
            },
            example: `prices = {"rum": 5, "bread": 2, "fish": 3}\nprint(prices["rum"])\nprices["cheese"] = 4\nprices["rum"] = 6\ndel prices["fish"]\nprint(prices)\nprint("Cake:", prices.get("cake", "not sold here"))\nprint("rum" in prices, len(prices))\n`,
          },
          {
            id: "s3", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `prices = {"rum": 5, "bread": 2}\nprices["rum"] = 6\nprices["fish"] = 3\nprint(prices)\n`,
            options: ["{'rum': 5, 'bread': 2, 'fish': 3}", "{'rum': 6, 'bread': 2, 'fish': 3}", "{'rum': 5, 'rum': 6, 'bread': 2, 'fish': 3}", "{'rum': 6, 'bread': 2}"],
            answer: 1,
            explain: { en: "Assigning to an existing key replaces its value. Assigning to a new key adds a pair at the end. Keys are never duplicated.", sl: "Prirejanje obstoječemu ključu zamenja vrednost. Prirejanje novemu ključu doda par na konec. Ključi se nikoli ne podvojijo." },
          },
          {
            id: "s4", type: "code", kind: "task",
            text: {
              en: `Update the ship's inventory:
1. Add ~"maps"~ with a count of 2.
2. A barrel of rum arrived: increase ~"rum"~ by 5 (don't retype 15).
3. The ropes were used up: remove ~"rope"~.

Then print the dictionary: ~{'rum': 15, 'maps': 2}~`,
              sl: `Posodobi ladijski inventar:
1. Dodaj ~"maps"~ s številom 2.
2. Prispel je sod ruma: ~"rum"~ povečaj za 5 (ne tipkaj 15).
3. Vrvi so porabljene: odstrani ~"rope"~.

Nato izpiši slovar: ~{'rum': 15, 'maps': 2}~`,
            },
            starter: `inventory = {"rope": 3, "rum": 10}\n`,
            tests: [
              { check: R`assert ns.get("inventory") == {"rum": 15, "maps": 2}`, msg: { en: "inventory should end as {'rum': 15, 'maps': 2}.", sl: "inventory naj na koncu bo {'rum': 15, 'maps': 2}." } },
              { check: R`assert "15" not in code and ("+= 5" in code or "+ 5" in code) and "del " in code`, msg: { en: "Increase rum with += 5 and remove rope with del.", sl: "Rum povečaj z += 5, rope pa odstrani z del." } },
              { check: R`assert "{'rum': 15, 'maps': 2}" in out`, msg: { en: "Print the inventory at the end.", sl: "Na koncu izpiši inventar." } },
            ],
            hints: [
              { en: "~inventory[\"maps\"] = 2~ adds a new key.", sl: "~inventory[\"maps\"] = 2~ doda nov ključ." },
              { en: "~inventory[\"rum\"] += 5~ and ~del inventory[\"rope\"]~", sl: "~inventory[\"rum\"] += 5~ in ~del inventory[\"rope\"]~" },
            ],
            solution: `inventory = {"rope": 3, "rum": 10}\ninventory["maps"] = 2\ninventory["rum"] += 5\ndel inventory["rope"]\nprint(inventory)\n`,
          },
          {
            id: "s5", type: "code", kind: "debug",
            text: {
              en: "Anne isn't in the age records yet, and the program crashes. Without adding her, make it print:\n:::\nPip: 40\nAnne: Unknown\n:::",
              sl: "Anne še ni v evidenci starosti in program se sesuje. Ne da bi jo dodal, naj izpiše:\n:::\nPip: 40\nAnne: Unknown\n:::",
            },
            starter: `ages = {"Pip": 40}\nprint("Pip:", ages["Pip"])\nprint("Anne:", ages["Anne"])\n`,
            tests: [
              { check: R`assert clean == ["Pip: 40", "Anne: Unknown"]`, msg: { en: "It should print Pip: 40 and Anne: Unknown.", sl: "Izpisati mora Pip: 40 in Anne: Unknown." } },
              { check: R`assert ns.get("ages") == {"Pip": 40}`, msg: { en: "Don't add Anne to the dictionary.", sl: "Anne ne dodaj v slovar." } },
            ],
            hints: [
              { en: "There's a dictionary method that returns a default instead of crashing.", sl: "Obstaja metoda slovarja, ki namesto sesutja vrne privzeto vrednost." },
              { en: "~ages.get(\"Anne\", \"Unknown\")~", sl: "~ages.get(\"Anne\", \"Unknown\")~" },
            ],
            solution: `ages = {"Pip": 40}\nprint("Pip:", ages["Pip"])\nprint("Anne:", ages.get("Anne", "Unknown"))\n`,
          },
        ],
      },
      {
        id: "c7l2",
        title: { en: "Opening Every Box", sl: "Odpiranje vseh skrinjic" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `Looping over a dictionary gives you its **keys**. Two methods give you more:
- ~d.values()~ gives just the values
- ~d.items()~ gives (key, value) pairs, which you unpack right in the loop

Dictionaries remember the order you added things. For alphabetical order, loop over ~sorted(d)~.`,
              sl: `Zanka po slovarju ti da njegove **ključe**. Dve metodi dasta več:
- ~d.values()~ vrne samo vrednosti
- ~d.items()~ vrne pare (ključ, vrednost), ki jih razpakiraš kar v zanki

Slovarji si zapomnijo vrstni red dodajanja. Za abecedni vrstni red teci po ~sorted(d)~.`,
            },
            example: `roles = {"Pip": "tutor", "Anne": "navigator", "Jack": "gunner"}\nfor name in roles:\n    print(name)\nfor role in roles.values():\n    print(role)\nfor name, role in roles.items():\n    print(f"{name} is the {role}")\nfor name in sorted(roles):\n    print(name, "->", roles[name])\n`,
          },
          {
            id: "s2", type: "code", kind: "task",
            text: {
              en: `Print the market price list in **alphabetical order**, then the cost of buying one of everything:
:::
bread costs 2
cheese costs 4
fish costs 3
rum costs 5
One of each: 14
:::`,
              sl: `Izpiši cenik tržnice po **abecednem vrstnem redu**, nato ceno nakupa vsega po enega:
:::
bread costs 2
cheese costs 4
fish costs 3
rum costs 5
One of each: 14
:::`,
            },
            starter: `prices = {"rum": 5, "bread": 2, "fish": 3, "cheese": 4}\n`,
            tests: [
              { check: R`assert clean == ["bread costs 2", "cheese costs 4", "fish costs 3", "rum costs 5", "One of each: 14"]`, msg: { en: "Expected the four items alphabetically, then One of each: 14.", sl: "Pričakovani so štirje predmeti po abecedi, nato One of each: 14." } },
              { check: R`assert "14" not in code and "for" in code`, msg: { en: "Loop over the dictionary and add up the values instead of typing 14.", sl: "Teci po slovarju in seštej vrednosti, ne tipkaj 14." } },
            ],
            hints: [
              { en: "~for item in sorted(prices):~ and look up ~prices[item]~.", sl: "~for item in sorted(prices):~ in poišči ~prices[item]~." },
              { en: "The total is ~sum(prices.values())~.", sl: "Vsota je ~sum(prices.values())~." },
            ],
            solution: `prices = {"rum": 5, "bread": 2, "fish": 3, "cheese": 4}\nfor item in sorted(prices):\n    print(item, "costs", prices[item])\nprint("One of each:", sum(prices.values()))\n`,
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `Build the crew directory. Ask ~Who are you looking for? ~
- If the name is a key in ~roles~, print ~Anne is the navigator~
- Otherwise print ~No sailor called Bob~`,
              sl: `Zgradi imenik posadke. Vprašaj ~Who are you looking for? ~
- Če je ime ključ v ~roles~, izpiši ~Anne is the navigator~
- Sicer izpiši ~No sailor called Bob~`,
            },
            starter: `roles = {"Pip": "tutor", "Anne": "navigator", "Jack": "gunner", "Marlow": "captain"}\n`,
            stdin: "Anne",
            tests: [
              { stdin: ["Anne"], check: R`assert "anne is the navigator" in norm(out)`, msg: { en: "Anne should give Anne is the navigator", sl: "Anne naj da Anne is the navigator" } },
              { stdin: ["Marlow"], check: R`assert "marlow is the captain" in norm(out)`, msg: { en: "Marlow should give Marlow is the captain", sl: "Marlow naj da Marlow is the captain" } },
              { stdin: ["Bob"], check: R`assert "no sailor called bob" in norm(out)`, msg: { en: "Bob should give No sailor called Bob", sl: "Bob naj da No sailor called Bob" } },
            ],
            hints: [
              { en: "Check ~if name in roles:~ before looking it up.", sl: "Preden poiščeš, preveri ~if name in roles:~." },
              { en: "~print(f\"{name} is the {roles[name]}\")~", sl: "~print(f\"{name} is the {roles[name]}\")~" },
            ],
            solution: `roles = {"Pip": "tutor", "Anne": "navigator", "Jack": "gunner", "Marlow": "captain"}\nname = input("Who are you looking for? ")\nif name in roles:\n    print(f"{name} is the {roles[name]}")\nelse:\n    print(f"No sailor called {name}")\n`,
          },
        ],
      },
      {
        id: "c7l3",
        title: { en: "Tally Marks", sl: "Črtice za štetje" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `The most useful dictionary trick: **counting** things.
:::
counts = {}
for item in loot:
    counts[item] = counts.get(item, 0) + 1
:::
~counts.get(item, 0)~ gives the current count, or 0 the first time you see the item. Then you add 1.

To find the key with the biggest value: ~max(counts, key=counts.get)~. The ~key=~ part tells ~max~ what to compare by.`,
              sl: `Najuporabnejši trik s slovarji: **štetje**.
:::
counts = {}
for item in loot:
    counts[item] = counts.get(item, 0) + 1
:::
~counts.get(item, 0)~ vrne trenutno število ali 0, ko predmet vidiš prvič. Nato prišteješ 1.

Ključ z največjo vrednostjo najdeš z ~max(counts, key=counts.get)~. Del ~key=~ pove funkciji ~max~, po čem primerjati.`,
            },
            example: `loot = ["gold", "pearl", "gold", "map", "gold", "pearl"]\ncounts = {}\nfor item in loot:\n    counts[item] = counts.get(item, 0) + 1\nprint(counts)\nbest = max(counts, key=counts.get)\nprint("Most common:", best, counts[best])\n`,
          },
          {
            id: "s2", type: "code", kind: "task",
            text: {
              en: `Ask ~Sentence? ~ and count how many times each word appears (ignore capitals). Print each word with its count, in the order the words first appear. For ~Rum rum and more RUM~:
:::
rum: 3
and: 1
more: 1
:::`,
              sl: `Vprašaj ~Sentence? ~ in preštej, kolikokrat se pojavi vsaka beseda (prezri velike črke). Izpiši vsako besedo z njenim številom, v vrstnem redu, kot se besede prvič pojavijo. Za ~Rum rum and more RUM~:
:::
rum: 3
and: 1
more: 1
:::`,
            },
            starter: ``,
            stdin: "Rum rum and more RUM",
            tests: [
              { stdin: ["Rum rum and more RUM"], check: R`assert [l for l in clean if ":" in l and "?" not in l] == ["rum: 3", "and: 1", "more: 1"]`, msg: { en: "For Rum rum and more RUM: rum: 3, and: 1, more: 1", sl: "Za Rum rum and more RUM: rum: 3, and: 1, more: 1" } },
              { stdin: ["yo ho yo ho a pirate yo"], check: R`assert [l for l in clean if ":" in l and "?" not in l] == ["yo: 3", "ho: 2", "a: 1", "pirate: 1"]`, msg: { en: "For yo ho yo ho a pirate yo: yo: 3, ho: 2, a: 1, pirate: 1", sl: "Za yo ho yo ho a pirate yo: yo: 3, ho: 2, a: 1, pirate: 1" } },
            ],
            hints: [
              { en: "~sentence.lower().split()~ gives a list of words. Then use the counting pattern.", sl: "~sentence.lower().split()~ vrne seznam besed. Nato uporabi vzorec štetja." },
              { en: "Loop over ~counts.items()~ and ~print(f\"{word}: {n}\")~.", sl: "Teci po ~counts.items()~ in ~print(f\"{word}: {n}\")~." },
            ],
            solution: `sentence = input("Sentence? ")\ncounts = {}\nfor word in sentence.lower().split():\n    counts[word] = counts.get(word, 0) + 1\nfor word, n in counts.items():\n    print(f"{word}: {n}")\n`,
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `After a raid, the crew calls out each piece of loot. Keep asking ~Loot? ~ until ~done~, then print the most common one and how many:
:::
Most common: gold (3)
:::`,
              sl: `Po napadu posadka našteje vsak kos plena. Sprašuj ~Loot? ~ do ~done~, nato izpiši najpogostejšega in kolikokrat:
:::
Most common: gold (3)
:::`,
            },
            starter: ``,
            stdin: "gold\npearl\ngold\nmap\ngold\ndone",
            tests: [
              { stdin: ["gold", "pearl", "gold", "map", "gold", "done"], check: R`assert "most common: gold (3)" in norm(out)`, msg: { en: "Expected Most common: gold (3)", sl: "Pričakovano Most common: gold (3)" } },
              { stdin: ["map", "pearl", "pearl", "done"], check: R`assert "most common: pearl (2)" in norm(out)`, msg: { en: "For map, pearl, pearl: Most common: pearl (2)", sl: "Za map, pearl, pearl: Most common: pearl (2)" } },
            ],
            hints: [
              { en: "Combine the input loop from Cargo Cove with the counting pattern.", sl: "Združi vnosno zanko iz Tovornega zaliva z vzorcem štetja." },
              { en: "~best = max(counts, key=counts.get)~, then ~print(f\"Most common: {best} ({counts[best]})\")~", sl: "~best = max(counts, key=counts.get)~, nato ~print(f\"Most common: {best} ({counts[best]})\")~" },
            ],
            solution: `counts = {}\nwhile True:\n    item = input("Loot? ")\n    if item == "done":\n        break\n    counts[item] = counts.get(item, 0) + 1\nbest = max(counts, key=counts.get)\nprint(f"Most common: {best} ({counts[best]})")\n`,
          },
        ],
      },
      {
        id: "c7l4",
        title: { en: "Charts and Records", sl: "Karte in zapisi" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `Real data is usually **nested**: dictionaries inside lists, lists inside dictionaries.
:::
ship = {"name": "Serpent", "crew": ["Pip", "Anne"]}
ship["crew"][1]          # 'Anne'

crew = [
    {"name": "Anne", "age": 34},
    {"name": "Pip",  "age": 40},
]
crew[0]["name"]          # 'Anne'
:::
Read the brackets left to right, one step at a time. This shape is exactly what you get from web APIs and JSON files.`,
              sl: `Pravi podatki so običajno **gnezdeni**: slovarji v seznamih, seznami v slovarjih.
:::
ship = {"name": "Serpent", "crew": ["Pip", "Anne"]}
ship["crew"][1]          # 'Anne'

crew = [
    {"name": "Anne", "age": 34},
    {"name": "Pip",  "age": 40},
]
crew[0]["name"]          # 'Anne'
:::
Oklepaje beri od leve proti desni, korak za korakom. Natanko taka oblika pride iz spletnih API-jev in datotek JSON.`,
            },
            example: `ship = {"name": "Serpent", "guns": 12, "crew": ["Pip", "Anne", "Jack"]}\nprint(ship["name"], "has", len(ship["crew"]), "crew")\nprint("Second sailor:", ship["crew"][1])\nship["crew"].append("Mary")\nprint(ship)\n`,
          },
          {
            id: "s2", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `ship = {"name": "Serpent", "crew": ["Pip", "Anne"]}\nprint(ship["crew"][1])\n`,
            options: ["Pip", "Anne", "['Pip', 'Anne']", { en: "An error", sl: "Napaka" }],
            answer: 1,
            explain: { en: "~ship[\"crew\"]~ is the list ~['Pip', 'Anne']~, and ~[1]~ picks its second item.", sl: "~ship[\"crew\"]~ je seznam ~['Pip', 'Anne']~, ~[1]~ pa izbere njegov drugi element." },
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `Using the list of crew records:
1. Print the name of every sailor **older than 30**, one per line, in list order.
2. Then print the average age, rounded to 1 decimal: ~Average age: 33.6~`,
              sl: `S seznamom zapisov o posadki:
1. Izpiši ime vsakega mornarja, **starejšega od 30**, vsako v svoji vrstici, v vrstnem redu seznama.
2. Nato izpiši povprečno starost, zaokroženo na 1 decimalko: ~Average age: 33.6~`,
            },
            starter: `crew = [\n    {"name": "Anne", "role": "navigator", "age": 34},\n    {"name": "Pip", "role": "tutor", "age": 40},\n    {"name": "Jack", "role": "gunner", "age": 22},\n    {"name": "Mary", "role": "cook", "age": 29},\n    {"name": "Marlow", "role": "captain", "age": 43},\n]\n`,
            tests: [
              { check: R`assert clean[:3] == ["Anne", "Pip", "Marlow"]`, msg: { en: "First print Anne, Pip and Marlow (the ones older than 30).", sl: "Najprej izpiši Anne, Pip in Marlow (starejše od 30)." } },
              { check: R`assert clean[-1] == "Average age: 33.6"`, msg: { en: "Finish with Average age: 33.6", sl: "Končaj z Average age: 33.6" } },
              { check: R`assert "for" in code and "33.6" not in code`, msg: { en: "Calculate the average from the data.", sl: "Povprečje izračunaj iz podatkov." } },
            ],
            hints: [
              { en: "Each item in the loop is a dictionary: ~for sailor in crew:~ then ~sailor[\"age\"]~.", sl: "Vsak element v zanki je slovar: ~for sailor in crew:~ nato ~sailor[\"age\"]~." },
              { en: "Add up ages in the same loop. After it: ~round(total / len(crew), 1)~", sl: "Starosti seštevaj v isti zanki. Po njej: ~round(total / len(crew), 1)~" },
            ],
            solution: `crew = [\n    {"name": "Anne", "role": "navigator", "age": 34},\n    {"name": "Pip", "role": "tutor", "age": 40},\n    {"name": "Jack", "role": "gunner", "age": 22},\n    {"name": "Mary", "role": "cook", "age": 29},\n    {"name": "Marlow", "role": "captain", "age": 43},\n]\ntotal = 0\nfor sailor in crew:\n    total += sailor["age"]\n    if sailor["age"] > 30:\n        print(sailor["name"])\nprint("Average age:", round(total / len(crew), 1))\n`,
          },
          {
            id: "s4", type: "code", kind: "task",
            text: {
              en: `The finds are a list of ~(island, treasure)~ pairs. Group them into a dictionary ~by_island~ where each island maps to a **list** of its treasures, then print it:
:::
{'Tortuga': ['gold', 'map'], 'Sirocco': ['pearl'], 'Skull Rock': ['crown', 'ruby']}
:::`,
              sl: `Najdbe so seznam parov ~(otok, zaklad)~. Združi jih v slovar ~by_island~, kjer vsak otok kaže na **seznam** svojih zakladov, nato ga izpiši:
:::
{'Tortuga': ['gold', 'map'], 'Sirocco': ['pearl'], 'Skull Rock': ['crown', 'ruby']}
:::`,
            },
            starter: `finds = [("Tortuga", "gold"), ("Sirocco", "pearl"), ("Tortuga", "map"), ("Skull Rock", "crown"), ("Skull Rock", "ruby")]\nby_island = {}\n`,
            tests: [
              { check: R`assert ns.get("by_island") == {"Tortuga": ["gold", "map"], "Sirocco": ["pearl"], "Skull Rock": ["crown", "ruby"]}`, msg: { en: "by_island should map each island to the list of its treasures, in order.", sl: "by_island naj vsak otok poveže s seznamom njegovih zakladov, po vrsti." } },
              { check: R`assert "for" in code`, msg: { en: "Build it with a loop.", sl: "Zgradi ga z zanko." } },
            ],
            hints: [
              { en: "For each pair: if the island isn't a key yet, set it to an empty list first. Then append.", sl: "Za vsak par: če otok še ni ključ, mu najprej nastavi prazen seznam. Nato dodaj." },
              { en: "~if island not in by_island: by_island[island] = []~ then ~by_island[island].append(treasure)~", sl: "~if island not in by_island: by_island[island] = []~ nato ~by_island[island].append(treasure)~" },
            ],
            solution: `finds = [("Tortuga", "gold"), ("Sirocco", "pearl"), ("Tortuga", "map"), ("Skull Rock", "crown"), ("Skull Rock", "ruby")]\nby_island = {}\nfor island, treasure in finds:\n    if island not in by_island:\n        by_island[island] = []\n    by_island[island].append(treasure)\nprint(by_island)\n`,
          },
        ],
      },
      {
        id: "c7l5",
        title: { en: "Sets", sl: "Množice" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `A **set** is a collection with **no duplicates** and **no order**. Write it with curly braces but no colons: ~{"gold", "map"}~. An empty set is ~set()~, because ~{}~ is an empty dictionary.

- ~set(my_list)~ removes duplicates instantly
- ~s.add(x)~, ~s.remove(x)~, ~x in s~ (very fast)
- ~a | b~ everything in either, ~a & b~ only what's in both, ~a - b~ what's in ~a~ but not ~b~

Because sets have no order, wrap them in ~sorted()~ when you print them for people.`,
              sl: `**Množica** je zbirka **brez podvojitev** in **brez vrstnega reda**. Zapišeš jo z zavitimi oklepaji, a brez dvopičij: ~{"gold", "map"}~. Prazna množica je ~set()~, ker je ~{}~ prazen slovar.

- ~set(seznam)~ takoj odstrani podvojitve
- ~s.add(x)~, ~s.remove(x)~, ~x in s~ (zelo hitro)
- ~a | b~ vse v katerikoli, ~a & b~ samo, kar je v obeh, ~a - b~ kar je v ~a~, ne pa v ~b~

Ker množice nimajo vrstnega reda, jih za ljudi izpiši ovite v ~sorted()~.`,
            },
            example: `visitors = ["Pip", "Anne", "Pip", "Jack", "Anne", "Pip"]\nunique = set(visitors)\nprint(sorted(unique), len(unique))\n\nanne = {"sailing", "maps", "swords"}\njack = {"swords", "cannons", "sailing"}\nprint("Both:", sorted(anne & jack))\nprint("Either:", sorted(anne | jack))\nprint("Only Anne:", sorted(anne - jack))\n`,
          },
          {
            id: "s2", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `s = set([1, 2, 2, 3, 3, 3])\nprint(len(s))\n`,
            options: ["6", "3", "1", "4"],
            answer: 1,
            explain: { en: "A set keeps each value once, so only 1, 2 and 3 remain.", sl: "Množica vsako vrednost hrani le enkrat, zato ostanejo samo 1, 2 in 3." },
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `Two sailors list their skills. Print the skills they **both** have and the ones **only Anne** has, sorted:
:::
Both: ['sailing', 'swords']
Only Anne: ['knots', 'maps']
:::`,
              sl: `Dva mornarja naštejeta svoje veščine. Izpiši veščine, ki jih imata **oba**, in tiste, ki jih ima **samo Anne**, razvrščene:
:::
Both: ['sailing', 'swords']
Only Anne: ['knots', 'maps']
:::`,
            },
            starter: `anne = {"sailing", "maps", "swords", "knots"}\njack = {"swords", "cannons", "sailing"}\n`,
            tests: [
              { check: R`assert clean == ["Both: ['sailing', 'swords']", "Only Anne: ['knots', 'maps']"]`, msg: { en: "Expected Both: ['sailing', 'swords'] and Only Anne: ['knots', 'maps']", sl: "Pričakovano Both: ['sailing', 'swords'] in Only Anne: ['knots', 'maps']" } },
              { check: R`assert "&" in code and "-" in code`, msg: { en: "Use & and - on the sets.", sl: "Na množicah uporabi & in -." } },
            ],
            hints: [
              { en: "~anne & jack~ and ~anne - jack~.", sl: "~anne & jack~ in ~anne - jack~." },
              { en: "Wrap each in ~sorted()~ before printing.", sl: "Vsako pred izpisom ovij v ~sorted()~." },
            ],
            solution: `anne = {"sailing", "maps", "swords", "knots"}\njack = {"swords", "cannons", "sailing"}\nprint("Both:", sorted(anne & jack))\nprint("Only Anne:", sorted(anne - jack))\n`,
          },
          {
            id: "s4", type: "code", kind: "task",
            text: {
              en: `The tavern logs every visit. Keep asking ~Visitor? ~ until ~done~, then print how many **different** people came:
:::
Unique visitors: 3
:::`,
              sl: `Krčma beleži vsak obisk. Sprašuj ~Visitor? ~ do ~done~, nato izpiši, koliko **različnih** ljudi je prišlo:
:::
Unique visitors: 3
:::`,
            },
            starter: `seen = set()\n`,
            stdin: "Pip\nAnne\nPip\nJack\nAnne\ndone",
            tests: [
              { stdin: ["Pip", "Anne", "Pip", "Jack", "Anne", "done"], check: R`assert "unique visitors: 3" in norm(out)`, msg: { en: "Pip, Anne, Pip, Jack, Anne should give Unique visitors: 3", sl: "Pip, Anne, Pip, Jack, Anne naj da Unique visitors: 3" } },
              { stdin: ["done"], check: R`assert "unique visitors: 0" in norm(out)`, msg: { en: "Nobody visiting should give Unique visitors: 0", sl: "Če ni nihče prišel, naj da Unique visitors: 0" } },
            ],
            hints: [
              { en: "~seen.add(name)~ ignores names that are already there.", sl: "~seen.add(name)~ prezre imena, ki so že notri." },
              { en: "At the end, ~len(seen)~.", sl: "Na koncu ~len(seen)~." },
            ],
            solution: `seen = set()\nwhile True:\n    name = input("Visitor? ")\n    if name == "done":\n        break\n    seen.add(name)\nprint("Unique visitors:", len(seen))\n`,
          },
        ],
      },
      {
        id: "c7l6",
        title: { en: "Solo Voyage: The Quartermaster's Ledger", sl: "Samostojna plovba: Intendantova knjiga" },
        solo: true,
        steps: [
          {
            id: "s1", type: "story", speaker: "captain",
            text: {
              en: `The quartermaster quit. Too much shouting about rum. So now you're keeping the stores.

Make it a proper program: the crew types commands like ~add rum 5~ or ~remove rum 2~, and it keeps the books straight. No negative rum. Ever.`,
              sl: `Intendant je dal odpoved. Preveč kričanja zaradi ruma. Zdaj torej ti skrbiš za zaloge.

Naredi pravi program: posadka tipka ukaze, kot sta ~add rum 5~ ali ~remove rum 2~, on pa vodi knjige. Nikoli negativnega ruma. Nikoli.`,
            },
          },
          {
            id: "s2", type: "code", kind: "project",
            text: {
              en: `Build an inventory that reads commands until ~done~. Ask ~> ~ for each command.

**Commands**
- ~add ITEM N~: add N of an item.
- ~remove ITEM N~: take N away. If there aren't enough, print ~Not enough rum~ (with the item's name) and change nothing. If the count reaches 0, remove the item completely.
- ~show~: print every item as ~rum: 3~ in **alphabetical order**, or ~Empty~ if there's nothing.
- ~done~: print ~Goodbye~ and stop.
- Anything else: print ~Unknown command~.

Example: ~add rum 5~, ~add bread 2~, ~remove rum 2~, ~show~, ~done~ prints:
:::
bread: 2
rum: 3
Goodbye
:::`,
              sl: `Zgradi inventar, ki bere ukaze do ~done~. Za vsak ukaz vprašaj ~> ~.

**Ukazi**
- ~add PREDMET N~: dodaj N predmetov.
- ~remove PREDMET N~: odvzemi N. Če jih ni dovolj, izpiši ~Not enough rum~ (z imenom predmeta) in ne spremeni ničesar. Če število pade na 0, predmet popolnoma odstrani.
- ~show~: izpiši vsak predmet kot ~rum: 3~ po **abecedi** ali ~Empty~, če ni ničesar.
- ~done~: izpiši ~Goodbye~ in nehaj.
- Karkoli drugega: izpiši ~Unknown command~.

Primer: ~add rum 5~, ~add bread 2~, ~remove rum 2~, ~show~, ~done~ izpiše:
:::
bread: 2
rum: 3
Goodbye
:::`,
            },
            starter: `stores = {}\n`,
            stdin: "add rum 5\nadd bread 2\nremove rum 2\nshow\ndone",
            tests: [
              { stdin: ["add rum 5", "add bread 2", "remove rum 2", "show", "done"], check: R`c = [l for l in clean if not l.startswith(">")]
assert c[-3:] == ["bread: 2", "rum: 3", "Goodbye"]`, msg: { en: "The example should end with bread: 2, rum: 3, Goodbye.", sl: "Primer se mora končati z bread: 2, rum: 3, Goodbye." } },
              { stdin: ["add rum 2", "remove rum 5", "show", "done"], check: R`o = norm(out)
assert "not enough rum" in o and "rum: 2" in o`, msg: { en: "Removing 5 rum when there are only 2 should print Not enough rum and leave rum: 2.", sl: "Odvzem 5 ruma, ko sta le 2, naj izpiše Not enough rum in pusti rum: 2." } },
              { stdin: ["add map 1", "remove map 1", "show", "done"], check: R`o = norm(out)
assert "empty" in o and "map:" not in o`, msg: { en: "Removing the last map should delete it, so show prints Empty.", sl: "Odvzem zadnjega zemljevida naj ga izbriše, zato show izpiše Empty." } },
              { stdin: ["sing a song", "remove gold 1", "done"], check: R`o = norm(out)
assert "unknown command" in o and "not enough gold" in o and "goodbye" in o`, msg: { en: "An unknown command prints Unknown command, and removing something you don't have prints Not enough gold.", sl: "Neznan ukaz izpiše Unknown command, odvzem nečesa, česar nimaš, pa Not enough gold." } },
              { stdin: ["add rum 1", "add rum 1", "show", "done"], check: R`assert "rum: 2" in norm(out)`, msg: { en: "Adding rum twice should add up: rum: 2.", sl: "Dvakratno dodajanje ruma se mora sešteti: rum: 2." } },
            ],
            hints: [
              { en: "Split each command into words with ~.split()~. The first word tells you what to do. For add and remove, the second is the item and the third is the number.", sl: "Vsak ukaz razdeli na besede z ~.split()~. Prva beseda pove, kaj narediti. Pri add in remove je druga beseda predmet, tretja pa število." },
              { en: "Check ~len(parts) == 3~ before reading ~parts[2]~. For remove, compare against ~stores.get(item, 0)~, and ~del stores[item]~ when it hits 0.", sl: "Preden prebereš ~parts[2]~, preveri ~len(parts) == 3~. Pri remove primerjaj s ~stores.get(item, 0)~ in ~del stores[item]~, ko pade na 0." },
            ],
            solution: `stores = {}\nwhile True:\n    parts = input("> ").split()\n    if not parts:\n        print("Unknown command")\n        continue\n    command = parts[0]\n    if command == "done":\n        print("Goodbye")\n        break\n    elif command == "show":\n        if stores:\n            for item in sorted(stores):\n                print(f"{item}: {stores[item]}")\n        else:\n            print("Empty")\n    elif command in ("add", "remove") and len(parts) == 3:\n        item, n = parts[1], int(parts[2])\n        if command == "add":\n            stores[item] = stores.get(item, 0) + n\n        elif stores.get(item, 0) < n:\n            print(f"Not enough {item}")\n        else:\n            stores[item] -= n\n            if stores[item] == 0:\n                del stores[item]\n    else:\n        print("Unknown command")\n`,
            after: {
              en: "Command loops like this are how text adventures, shells and chat bots work. You've built the core of one.",
              sl: "Takšne ukazne zanke so osnova besedilnih pustolovščin, ukaznih lupin in klepetalnih robotov. Zgradil si jedro ene.",
            },
          },
        ],
      },
    ],
  };
})();
