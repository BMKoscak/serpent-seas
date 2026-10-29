/* Island 9 — Stormwall Rock: try/except/else/finally, raise, reading and writing files */
(function () {
  const R = String.raw;
  const LOG = R`with open("logbook.txt", "w") as f:
    f.write("Day 1: Left Tortuga, fair wind\nDay 2: Storm from the east\nDay 3: Spotted Skull Rock\n")`;
  (window.SS_ISLANDS = window.SS_ISLANDS || {}).c9 = {
    blurb: {
      en: "Storms batter this rock day and night. Make programs that survive bad input and missing files, raise their own alarms, and keep a logbook on disk.",
      sl: "Nevihte to skalo tolčejo noč in dan. Napiši programe, ki preživijo slab vnos in manjkajoče datoteke, sprožijo lastne alarme in vodijo dnevnik na disku.",
    },
    log: {
      en: `**Catching errors** keeps a program alive:
:::
try:
    n = int(input("Number? "))
except ValueError:
    print("That's not a number!")
else:
    print("Got", n)        # only if no error
finally:
    print("Always runs")
:::
- Catch **specific** errors: ~ValueError~, ~ZeroDivisionError~, ~KeyError~, ~FileNotFoundError~...
- ~except ValueError as e:~ gives you the message in ~e~.

**Raising** your own:
:::
if speed < 0:
    raise ValueError("Speed can't be negative")
:::
**Files** (always use ~with~, it closes the file for you):
:::
with open("log.txt") as f:          # read
    for line in f:
        print(line.strip())
with open("log.txt", "w") as f:     # write (replaces the file)
    f.write("Day 1\\n")
with open("log.txt", "a") as f:     # append to the end
    f.write("Day 2\\n")
:::
- ~f.read()~ gives the whole file as one string; ~f.readlines()~ gives a list of lines.
- ~write~ doesn't add newlines. Add ~"\\n"~ yourself.`,
      sl: `**Lovljenje napak** ohrani program pri življenju:
:::
try:
    n = int(input("Število? "))
except ValueError:
    print("To ni število!")
else:
    print("Dobil sem", n)  # samo, če ni napake
finally:
    print("Vedno se izvede")
:::
- Lovi **specifične** napake: ~ValueError~, ~ZeroDivisionError~, ~KeyError~, ~FileNotFoundError~...
- ~except ValueError as e:~ ti da sporočilo v ~e~.

**Sprožanje** lastnih napak:
:::
if hitrost < 0:
    raise ValueError("Hitrost ne more biti negativna")
:::
**Datoteke** (vedno uporabi ~with~, ki datoteko zapre namesto tebe):
:::
with open("log.txt") as f:          # branje
    for vrstica in f:
        print(vrstica.strip())
with open("log.txt", "w") as f:     # pisanje (zamenja datoteko)
    f.write("Dan 1\\n")
with open("log.txt", "a") as f:     # dodajanje na konec
    f.write("Dan 2\\n")
:::
- ~f.read()~ vrne celo datoteko kot en niz; ~f.readlines()~ vrne seznam vrstic.
- ~write~ ne doda novih vrstic. ~"\\n"~ dodaj sam.`,
    },
    lessons: [
      {
        id: "c9l1",
        title: { en: "Weathering Errors", sl: "Kljubovanje napakam" },
        steps: [
          {
            id: "s1", type: "story", speaker: "captain",
            text: {
              en: `**Stormwall Rock**. Nothing grows here but barnacles and stubbornness.

Out at sea, things go wrong. A sail tears, a rope snaps. A good crew doesn't panic and abandon ship. They catch the problem and carry on.

Your programs crash the moment someone types "ten" instead of 10. Today you teach them to catch the problem and carry on.`,
              sl: `**Viharna skala**. Tu ne raste nič razen školjk in trme.

Na morju gredo stvari narobe. Jadro se raztrga, vrv poči. Dobra posadka ne paničari in ne zapusti ladje. Težavo ujame in nadaljuje.

Tvoji programi se sesujejo v trenutku, ko nekdo natipka "deset" namesto 10. Danes jih naučiš, da težavo ujamejo in nadaljujejo.`,
            },
          },
          {
            id: "s2", type: "learn",
            text: {
              en: `When an error happens inside a ~try~ block, Python jumps to the matching ~except~ block instead of crashing:
:::
try:
    cannons = int(input("Cannons? "))
    print("Loading", cannons)
except ValueError:
    print("That's not a number!")
:::
Everything after the error inside ~try~ is skipped. Afterwards the program continues normally.

Always name the error type you expect. A bare ~except:~ catches **everything**, including your own typos, and hides bugs.`,
              sl: `Ko se v bloku ~try~ zgodi napaka, Python namesto sesutja skoči v ustrezni blok ~except~:
:::
try:
    cannons = int(input("Topovi? "))
    print("Polnim", cannons)
except ValueError:
    print("To ni število!")
:::
Vse za napako v ~try~ se preskoči. Nato program normalno nadaljuje.

Vedno navedi vrsto napake, ki jo pričakuješ. Goli ~except:~ ujame **vse**, tudi tvoje tipkarske napake, in skrije hrošče.`,
            },
            example: `for answer in ["12", "twelve", "7"]:\n    try:\n        n = int(answer)\n        print("Loading", n, "cannons")\n    except ValueError:\n        print(f"'{answer}' is not a number!")\nprint("The ship sails on.")\n`,
          },
          {
            id: "s3", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `try:\n    n = int("ten")\n    print("A")\nexcept ValueError:\n    print("B")\nprint("C")\n`,
            options: ["A\nC", "B\nC", "A\nB\nC", "B"],
            answer: 1,
            explain: { en: "~int(\"ten\")~ fails, so ~print(\"A\")~ is skipped and the ~except~ prints B. Then the program carries on to C.", sl: "~int(\"ten\")~ ne uspe, zato se ~print(\"A\")~ preskoči in ~except~ izpiše B. Nato program nadaljuje do C." },
          },
          {
            id: "s4", type: "code", kind: "task",
            text: {
              en: `Ask ~Number of cannons? ~.
- If it's a whole number, print ~Loading 5 cannons~
- If it isn't, print ~That's not a number!~ instead of crashing.`,
              sl: `Vprašaj ~Number of cannons? ~.
- Če je celo število, izpiši ~Loading 5 cannons~
- Če ni, namesto sesutja izpiši ~That's not a number!~`,
            },
            starter: ``,
            stdin: "five",
            tests: [
              { stdin: ["5"], check: R`assert "loading 5 cannons" in norm(out)`, msg: { en: "5 should print Loading 5 cannons", sl: "5 naj izpiše Loading 5 cannons" } },
              { stdin: ["five"], check: R`assert "that's not a number!" in norm(out)`, msg: { en: "five should print That's not a number!", sl: "five naj izpiše That's not a number!" } },
              { stdin: ["2.5"], check: R`assert "that's not a number!" in norm(out)`, msg: { en: "2.5 isn't a whole number either: That's not a number!", sl: "Tudi 2.5 ni celo število: That's not a number!" } },
            ],
            hints: [
              { en: "Put the ~int(input(...))~ and the success print inside ~try~.", sl: "~int(input(...))~ in izpis ob uspehu daj v ~try~." },
              { en: "~except ValueError:~ then the complaint.", sl: "~except ValueError:~ nato pritožba." },
            ],
            solution: `try:\n    cannons = int(input("Number of cannons? "))\n    print("Loading", cannons, "cannons")\nexcept ValueError:\n    print("That's not a number!")\n`,
          },
          {
            id: "s5", type: "code", kind: "task",
            text: {
              en: `Don't give up after one bad answer. Keep asking ~Depth in fathoms? ~ until you get a whole number. Each time it isn't, print ~Try again~. When it works, print ~Got it: 7~ and stop.`,
              sl: `Ne obupaj po enem slabem odgovoru. Sprašuj ~Depth in fathoms? ~, dokler ne dobiš celega števila. Vsakič, ko ni, izpiši ~Try again~. Ko uspe, izpiši ~Got it: 7~ in nehaj.`,
            },
            starter: ``,
            stdin: "deep\n\n7",
            tests: [
              { stdin: ["deep", "", "7"], check: R`o = norm(out)
assert o.count("try again") == 2 and "got it: 7" in o`, msg: { en: "For deep, (empty), 7: Try again twice, then Got it: 7", sl: "Za deep, (prazno), 7: dvakrat Try again, nato Got it: 7" } },
              { stdin: ["12"], check: R`o = norm(out)
assert "try again" not in o and "got it: 12" in o`, msg: { en: "A good first answer should go straight to Got it: 12", sl: "Dober prvi odgovor naj gre naravnost na Got it: 12" } },
            ],
            hints: [
              { en: "Wrap a ~try~/~except~ inside a ~while True:~ loop.", sl: "~try~/~except~ ovij v zanko ~while True:~." },
              { en: "Inside ~try~: convert, then ~break~. Inside ~except~: print Try again. Print Got it after the loop.", sl: "V ~try~: pretvori, nato ~break~. V ~except~: izpiši Try again. Got it izpiši po zanki." },
            ],
            solution: `while True:\n    try:\n        depth = int(input("Depth in fathoms? "))\n        break\n    except ValueError:\n        print("Try again")\nprint("Got it:", depth)\n`,
          },
        ],
      },
      {
        id: "c9l2",
        title: { en: "Many Kinds of Storm", sl: "Različne nevihte" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `A ~try~ can have several ~except~ blocks, one per kind of error. Two more optional parts:
- ~else:~ runs only if **no** error happened
- ~finally:~ runs **no matter what**, error or not. Good for cleanup.

~except ValueError as e:~ stores the error in ~e~, so you can show its message with ~print(e)~.`,
              sl: `~try~ ima lahko več blokov ~except~, enega za vsako vrsto napake. Še dva neobvezna dela:
- ~else:~ se izvede samo, če se **ni** zgodila napaka
- ~finally:~ se izvede **v vsakem primeru**, z napako ali brez. Dobro za pospravljanje.

~except ValueError as e:~ shrani napako v ~e~, zato lahko njeno sporočilo pokažeš s ~print(e)~.`,
            },
            example: `def share(loot, crew):\n    try:\n        each = loot // crew\n    except ZeroDivisionError:\n        print("No crew to share with!")\n    except TypeError as e:\n        print("Bad numbers:", e)\n    else:\n        print("Each gets", each)\n    finally:\n        print("-- counting done --")\n\nshare(100, 4)\nshare(100, 0)\nshare("100", 4)\n`,
          },
          {
            id: "s2", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `try:\n    x = 10 / 2\nexcept ZeroDivisionError:\n    print("A")\nelse:\n    print("B")\nfinally:\n    print("C")\n`,
            options: ["A\nC", "B\nC", "B", "A\nB\nC"],
            answer: 1,
            explain: { en: "No error, so the ~except~ is skipped, ~else~ prints B, and ~finally~ always prints C.", sl: "Napake ni, zato se ~except~ preskoči, ~else~ izpiše B, ~finally~ pa vedno izpiše C." },
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `Write ~safe_divide(a, b)~ that returns ~a / b~, or ~None~ if ~b~ is zero. Use ~try~/~except ZeroDivisionError~ rather than an ~if~.`,
              sl: `Napiši ~safe_divide(a, b)~, ki vrne ~a / b~ ali ~None~, če je ~b~ nič. Uporabi ~try~/~except ZeroDivisionError~ namesto ~if~.`,
            },
            starter: ``,
            tests: [
              { check: R`f = ns["safe_divide"]
assert f(10, 2) == 5 and f(1, 0) is None and f(0, 5) == 0`, msg: { en: "safe_divide(10, 2) → 5.0, safe_divide(1, 0) → None, safe_divide(0, 5) → 0.0", sl: "safe_divide(10, 2) → 5.0, safe_divide(1, 0) → None, safe_divide(0, 5) → 0.0" } },
              { check: R`assert "ZeroDivisionError" in code and "try" in code`, msg: { en: "Use try with except ZeroDivisionError.", sl: "Uporabi try z except ZeroDivisionError." } },
            ],
            hints: [
              { en: "~return a / b~ inside ~try~.", sl: "~return a / b~ znotraj ~try~." },
              { en: "~except ZeroDivisionError: return None~", sl: "~except ZeroDivisionError: return None~" },
            ],
            solution: `def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return None\n`,
          },
          {
            id: "s4", type: "code", kind: "task",
            text: {
              en: `Write ~get_price(prices, item)~ that returns the price of ~item~ from the dictionary, or the text ~"Not for sale"~ if it isn't there. Use ~try~/~except KeyError~.`,
              sl: `Napiši ~get_price(prices, item)~, ki iz slovarja vrne ceno predmeta ~item~ ali besedilo ~"Not for sale"~, če ga ni. Uporabi ~try~/~except KeyError~.`,
            },
            starter: ``,
            tests: [
              { check: R`f = ns["get_price"]
p = {"rum": 5, "rope": 2}
assert f(p, "rum") == 5 and f(p, "rope") == 2 and f(p, "parrot") == "Not for sale"`, msg: { en: "get_price({\"rum\": 5}, \"rum\") → 5, and a missing item → \"Not for sale\"", sl: "get_price({\"rum\": 5}, \"rum\") → 5, manjkajoč predmet → \"Not for sale\"" } },
              { check: R`assert "KeyError" in code`, msg: { en: "Use except KeyError.", sl: "Uporabi except KeyError." } },
            ],
            hints: [
              { en: "Inside ~try~, look it up with square brackets so a missing key raises KeyError.", sl: "V ~try~ poišči z oglatimi oklepaji, da manjkajoč ključ sproži KeyError." },
              { en: "~return prices[item]~ / ~except KeyError: return \"Not for sale\"~", sl: "~return prices[item]~ / ~except KeyError: return \"Not for sale\"~" },
            ],
            solution: `def get_price(prices, item):\n    try:\n        return prices[item]\n    except KeyError:\n        return "Not for sale"\n`,
          },
        ],
      },
      {
        id: "c9l3",
        title: { en: "Raising the Alarm", sl: "Sprožanje alarma" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `Your own functions can **raise** errors when they're given something that makes no sense:
:::
def set_speed(knots):
    if knots < 0:
        raise ValueError("Speed can't be negative")
    return knots
:::
~raise~ stops the function immediately, just like a built-in error. Whoever called it can catch it with ~try~/~except~.

This is better than returning a strange value like ~-1~: an error can't be silently ignored.`,
              sl: `Tvoje funkcije lahko **sprožijo** napake, ko dobijo nekaj nesmiselnega:
:::
def set_speed(knots):
    if knots < 0:
        raise ValueError("Hitrost ne more biti negativna")
    return knots
:::
~raise~ funkcijo takoj ustavi, tako kot vgrajena napaka. Kdor jo je poklical, jo lahko ujame s ~try~/~except~.

To je bolje kot vračanje čudne vrednosti, kot je ~-1~: napake ni mogoče tiho prezreti.`,
            },
            example: `def set_speed(knots):\n    if knots < 0 or knots > 40:\n        raise ValueError("Speed must be between 0 and 40")\n    return knots\n\nfor s in [12, 55]:\n    try:\n        print("Speed set to", set_speed(s))\n    except ValueError as e:\n        print("Error:", e)\n`,
          },
          {
            id: "s2", type: "code", kind: "task",
            text: {
              en: `Write ~set_crew(n)~ for a ship that holds up to 120 sailors.
- If ~n~ is less than 1 or more than 120, **raise** ~ValueError("Crew must be between 1 and 120")~.
- Otherwise return ~n~.`,
              sl: `Napiši ~set_crew(n)~ za ladjo, ki sprejme do 120 mornarjev.
- Če je ~n~ manj kot 1 ali več kot 120, **sproži** ~ValueError("Crew must be between 1 and 120")~.
- Sicer vrni ~n~.`,
            },
            starter: ``,
            tests: [
              { check: R`f = ns["set_crew"]
assert f(1) == 1 and f(60) == 60 and f(120) == 120`, msg: { en: "set_crew(1), set_crew(60) and set_crew(120) are valid and should return the number.", sl: "set_crew(1), set_crew(60) in set_crew(120) so veljavni in naj vrnejo število." } },
              { check: R`f = ns["set_crew"]
for bad in (0, -5, 121, 500):
    try:
        f(bad)
    except ValueError as e:
        assert str(e) == "Crew must be between 1 and 120", str(e)
    else:
        raise AssertionError(bad)`, msg: { en: "set_crew(0), set_crew(121) and other bad values should raise ValueError(\"Crew must be between 1 and 120\").", sl: "set_crew(0), set_crew(121) in druge slabe vrednosti naj sprožijo ValueError(\"Crew must be between 1 and 120\")." } },
            ],
            hints: [
              { en: "Check the bad case first with ~if n < 1 or n > 120:~", sl: "Najprej preveri slab primer z ~if n < 1 or n > 120:~" },
              { en: "~raise ValueError(\"Crew must be between 1 and 120\")~, then ~return n~ after the if.", sl: "~raise ValueError(\"Crew must be between 1 and 120\")~, nato ~return n~ za if." },
            ],
            solution: `def set_crew(n):\n    if n < 1 or n > 120:\n        raise ValueError("Crew must be between 1 and 120")\n    return n\n`,
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `Now use it. Ask ~Crew size? ~ and call ~set_crew~. Handle **both** problems:
- not a number at all: print ~Error: please type a number~
- a number out of range: print ~Error: Crew must be between 1 and 120~ (the message from the exception)
- fine: print ~Crew set to 40~`,
              sl: `Zdaj jo uporabi. Vprašaj ~Crew size? ~ in pokliči ~set_crew~. Obravnavaj **obe** težavi:
- sploh ni število: izpiši ~Error: please type a number~
- število izven obsega: izpiši ~Error: Crew must be between 1 and 120~ (sporočilo iz izjeme)
- v redu: izpiši ~Crew set to 40~`,
            },
            starter: `def set_crew(n):\n    if n < 1 or n > 120:\n        raise ValueError("Crew must be between 1 and 120")\n    return n\n\n`,
            stdin: "40",
            tests: [
              { stdin: ["40"], check: R`assert "crew set to 40" in norm(out)`, msg: { en: "40 should print Crew set to 40", sl: "40 naj izpiše Crew set to 40" } },
              { stdin: ["500"], check: R`assert "error: crew must be between 1 and 120" in norm(out)`, msg: { en: "500 should print Error: Crew must be between 1 and 120", sl: "500 naj izpiše Error: Crew must be between 1 and 120" } },
              { stdin: ["lots"], check: R`assert "error: please type a number" in norm(out)`, msg: { en: "lots should print Error: please type a number", sl: "lots naj izpiše Error: please type a number" } },
            ],
            hints: [
              { en: "Both ~int(\"lots\")~ and ~set_crew(500)~ raise ValueError, but with different messages. How can you tell them apart? Try converting first in its own ~try~.", sl: "Tako ~int(\"lots\")~ kot ~set_crew(500)~ sprožita ValueError, a z različnim sporočilom. Kako ju ločiš? Poskusi pretvorbo najprej v svojem ~try~." },
              { en: "First ~try~: ~n = int(...)~, ~except ValueError~: please type a number. In the ~else~: a second ~try~ around ~set_crew(n)~ with ~except ValueError as e: print(\"Error:\", e)~.", sl: "Prvi ~try~: ~n = int(...)~, ~except ValueError~: please type a number. V ~else~: drugi ~try~ okoli ~set_crew(n)~ z ~except ValueError as e: print(\"Error:\", e)~." },
            ],
            solution: `def set_crew(n):\n    if n < 1 or n > 120:\n        raise ValueError("Crew must be between 1 and 120")\n    return n\n\ntry:\n    n = int(input("Crew size? "))\nexcept ValueError:\n    print("Error: please type a number")\nelse:\n    try:\n        crew = set_crew(n)\n        print("Crew set to", crew)\n    except ValueError as e:\n        print("Error:", e)\n`,
          },
        ],
      },
      {
        id: "c9l4",
        title: { en: "Reading the Logbook", sl: "Branje dnevnika" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `Programs forget everything when they stop. **Files** remember. This lesson's ship already has a file called ~logbook.txt~.
:::
with open("logbook.txt") as f:
    for line in f:
        print(line.strip())
:::
- ~open(name)~ opens a file for reading.
- ~with~ makes sure it's closed again afterwards, even if there's an error.
- Looping gives you one line at a time. Each line ends with an invisible ~"\\n"~, so ~strip()~ it.
- ~f.read()~ gives the whole file as one string; ~f.readlines()~ gives a list.

Opening a file that doesn't exist raises ~FileNotFoundError~.`,
              sl: `Programi vse pozabijo, ko se ustavijo. **Datoteke** si zapomnijo. Ladja v tej lekciji že ima datoteko ~logbook.txt~.
:::
with open("logbook.txt") as f:
    for line in f:
        print(line.strip())
:::
- ~open(ime)~ odpre datoteko za branje.
- ~with~ poskrbi, da se nato spet zapre, tudi ob napaki.
- Zanka da eno vrstico naenkrat. Vsaka se konča z nevidnim ~"\\n"~, zato jo ~strip()~.
- ~f.read()~ vrne celo datoteko kot en niz; ~f.readlines()~ vrne seznam.

Odpiranje neobstoječe datoteke sproži ~FileNotFoundError~.`,
            },
            setup: LOG,
            example: `with open("logbook.txt") as f:\n    for line in f:\n        print(line.strip())\n\nwith open("logbook.txt") as f:\n    text = f.read()\nprint("The logbook has", len(text), "characters")\n`,
          },
          {
            id: "s2", type: "code", kind: "task",
            text: {
              en: `Read ~logbook.txt~ and print every line with a line number, then the total:
:::
1: Day 1: Left Tortuga, fair wind
2: Day 2: Storm from the east
3: Day 3: Spotted Skull Rock
Entries: 3
:::
The checker will also give you a different logbook, so read the file.`,
              sl: `Preberi ~logbook.txt~ in izpiši vsako vrstico s številko, nato skupno število:
:::
1: Day 1: Left Tortuga, fair wind
2: Day 2: Storm from the east
3: Day 3: Spotted Skull Rock
Entries: 3
:::
Preverjevalnik ti bo dal tudi drugačen dnevnik, zato beri datoteko.`,
            },
            setup: LOG,
            starter: ``,
            tests: [
              { check: R`assert clean == ["1: Day 1: Left Tortuga, fair wind", "2: Day 2: Storm from the east", "3: Day 3: Spotted Skull Rock", "Entries: 3"]`, msg: { en: "Each line numbered from 1, then Entries: 3.", sl: "Vsaka vrstica oštevilčena od 1, nato Entries: 3." } },
              { setup: R`with open("logbook.txt", "w") as f:
    f.write("Calm\nFog\n")`, check: R`assert clean == ["1: Calm", "2: Fog", "Entries: 2"]`, msg: { en: "With a two-line logbook (Calm, Fog) it should print 1: Calm, 2: Fog, Entries: 2.", sl: "Pri dnevniku z dvema vrsticama (Calm, Fog) naj izpiše 1: Calm, 2: Fog, Entries: 2." } },
            ],
            hints: [
              { en: "Loop over the file with ~enumerate(f, start=1)~ and ~strip()~ each line.", sl: "Teci po datoteki z ~enumerate(f, start=1)~ in vsako vrstico ~strip()~." },
              { en: "Keep a counter, or remember the last number from enumerate, for the Entries line.", sl: "Za vrstico Entries vodi števec ali si zapomni zadnjo številko iz enumerate." },
            ],
            solution: `count = 0\nwith open("logbook.txt") as f:\n    for i, line in enumerate(f, start=1):\n        print(f"{i}: {line.strip()}")\n        count = i\nprint("Entries:", count)\n`,
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `~gold.txt~ has one amount per line, but the scribe left some **blank lines**. Add up all the amounts and print:
:::
Total gold: 175
:::`,
              sl: `~gold.txt~ ima en znesek na vrstico, a pisar je pustil nekaj **praznih vrstic**. Seštej vse zneske in izpiši:
:::
Total gold: 175
:::`,
            },
            setup: R`with open("gold.txt", "w") as f:
    f.write("50\n25\n\n100\n\n")`,
            starter: ``,
            tests: [
              { check: R`assert "total gold: 175" in [norm(l) for l in clean]`, msg: { en: "The amounts 50, 25 and 100 add up to Total gold: 175. Skip blank lines.", sl: "Zneski 50, 25 in 100 se seštejejo v Total gold: 175. Prazne vrstice preskoči." } },
              { setup: R`with open("gold.txt", "w") as f:
    f.write("\n7\n\n\n3\n")`, check: R`assert "total gold: 10" in [norm(l) for l in clean]`, msg: { en: "A file with 7 and 3 (plus blank lines) should give Total gold: 10.", sl: "Datoteka s 7 in 3 (in praznimi vrsticami) naj da Total gold: 10." } },
            ],
            hints: [
              { en: "~strip()~ each line. If it's empty, ~continue~.", sl: "Vsako vrstico ~strip()~. Če je prazna, ~continue~." },
              { en: "~if not line: continue~ then ~total += int(line)~", sl: "~if not line: continue~ nato ~total += int(line)~" },
            ],
            solution: `total = 0\nwith open("gold.txt") as f:\n    for line in f:\n        line = line.strip()\n        if not line:\n            continue\n        total += int(line)\nprint("Total gold:", total)\n`,
          },
          {
            id: "s4", type: "code", kind: "debug",
            text: {
              en: `The bosun's program crashes with ~FileNotFoundError~. Make it **safe**: if the file is missing, print ~No orders today~ instead. (In this lesson, there really are no orders.)`,
              sl: `Program vodje palube se sesuje s ~FileNotFoundError~. Naredi ga **varnega**: če datoteke ni, namesto tega izpiši ~No orders today~. (V tej lekciji ukazov res ni.)`,
            },
            starter: `with open("orders.txt") as f:\n    for line in f:\n        print("Order:", line.strip())\n`,
            tests: [
              { check: R`assert clean == ["No orders today"]`, msg: { en: "Without an orders.txt it should print No orders today.", sl: "Brez orders.txt naj izpiše No orders today." } },
              { setup: R`with open("orders.txt", "w") as f:
    f.write("Swab the deck\n")`, check: R`assert clean == ["Order: Swab the deck"]`, msg: { en: "When orders.txt exists, it should still print its orders.", sl: "Ko orders.txt obstaja, naj še vedno izpiše ukaze." } },
            ],
            hints: [
              { en: "Wrap the whole ~with~ block in a ~try~.", sl: "Cel blok ~with~ ovij v ~try~." },
              { en: "~except FileNotFoundError: print(\"No orders today\")~", sl: "~except FileNotFoundError: print(\"No orders today\")~" },
            ],
            solution: `try:\n    with open("orders.txt") as f:\n        for line in f:\n            print("Order:", line.strip())\nexcept FileNotFoundError:\n    print("No orders today")\n`,
          },
        ],
      },
      {
        id: "c9l5",
        title: { en: "Writing the Logbook", sl: "Pisanje dnevnika" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `Open a file with a **mode** to write to it:
- ~"w"~ **write**: creates the file, or wipes it if it exists
- ~"a"~ **append**: adds to the end, keeping what's there

~f.write(text)~ writes exactly what you give it. It does **not** add a new line, so end each line with ~"\\n"~.`,
              sl: `Za pisanje datoteko odpri z **načinom**:
- ~"w"~ **pisanje**: ustvari datoteko ali jo izprazni, če obstaja
- ~"a"~ **dodajanje**: doda na konec in ohrani obstoječe

~f.write(besedilo)~ zapiše natanko to, kar mu daš. Nove vrstice **ne** doda, zato vsako vrstico končaj z ~"\\n"~.`,
            },
            example: `with open("orders.txt", "w") as f:\n    f.write("Swab the deck\\n")\n    f.write("Feed the parrot\\n")\n\nwith open("orders.txt", "a") as f:\n    f.write("Polish the cannons\\n")\n\nwith open("orders.txt") as f:\n    print(f.read())\n`,
          },
          {
            id: "s2", type: "code", kind: "task",
            text: {
              en: `Write the names in ~crew~ to ~roster.txt~, **one per line**. Then open it again, read it, and print its contents.`,
              sl: `Imena iz ~crew~ zapiši v ~roster.txt~, **eno na vrstico**. Nato ga spet odpri, preberi in izpiši vsebino.`,
            },
            starter: `crew = ["Anne", "Pip", "Jack"]\n`,
            tests: [
              { check: R`assert open("roster.txt").read() == "Anne\nPip\nJack\n"`, msg: { en: "roster.txt should contain Anne, Pip and Jack, each on its own line (ending with a newline).", sl: "roster.txt naj vsebuje Anne, Pip in Jack, vsako v svoji vrstici (s koncem vrstice)." } },
              { check: R`assert clean == ["Anne", "Pip", "Jack"]`, msg: { en: "After writing, read the file back and print it.", sl: "Po pisanju datoteko preberi in izpiši." } },
            ],
            hints: [
              { en: "~with open(\"roster.txt\", \"w\") as f:~ and a loop that writes ~name + \"\\n\"~.", sl: "~with open(\"roster.txt\", \"w\") as f:~ in zanka, ki piše ~name + \"\\n\"~." },
              { en: "Then a second ~with open(\"roster.txt\") as f:~ and ~print(f.read())~.", sl: "Nato drugi ~with open(\"roster.txt\") as f:~ in ~print(f.read())~." },
            ],
            solution: `crew = ["Anne", "Pip", "Jack"]\nwith open("roster.txt", "w") as f:\n    for name in crew:\n        f.write(name + "\\n")\n\nwith open("roster.txt") as f:\n    print(f.read())\n`,
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `~log.txt~ already has entries. Ask ~Log entry? ~ and **append** it as a new line starting with ~"- "~. Then print the whole log. Don't erase the old entries!`,
              sl: `~log.txt~ že ima zapise. Vprašaj ~Log entry? ~ in ga **dodaj** kot novo vrstico, ki se začne z ~"- "~. Nato izpiši cel dnevnik. Starih zapisov ne izbriši!`,
            },
            setup: R`with open("log.txt", "w") as f:
    f.write("- Left port\n- Saw a whale\n")`,
            starter: ``,
            stdin: "Found an island",
            tests: [
              { stdin: ["Found an island"], check: R`assert open("log.txt").read() == "- Left port\n- Saw a whale\n- Found an island\n"`, msg: { en: "log.txt should keep its two entries and gain - Found an island at the end.", sl: "log.txt naj obdrži oba zapisa in na koncu dobi - Found an island." } },
              { stdin: ["Rum ran out"], check: R`assert clean[-3:] == ["- Left port", "- Saw a whale", "- Rum ran out"]`, msg: { en: "Print the whole log after appending.", sl: "Po dodajanju izpiši cel dnevnik." } },
            ],
            hints: [
              { en: "Open with mode ~\"a\"~, not ~\"w\"~.", sl: "Odpri z načinom ~\"a\"~, ne ~\"w\"~." },
              { en: "~f.write(\"- \" + entry + \"\\n\")~, then read and print the file.", sl: "~f.write(\"- \" + entry + \"\\n\")~, nato datoteko preberi in izpiši." },
            ],
            solution: `entry = input("Log entry? ")\nwith open("log.txt", "a") as f:\n    f.write("- " + entry + "\\n")\n\nwith open("log.txt") as f:\n    print(f.read())\n`,
          },
        ],
      },
      {
        id: "c9l6",
        title: { en: "Solo Voyage: The Storm Report", sl: "Samostojna plovba: Poročilo o nevihtah" },
        solo: true,
        steps: [
          {
            id: "s1", type: "story", speaker: "captain",
            text: {
              en: `The lighthouse keeper on Stormwall Rock has recorded every storm for years in ~storms.txt~. But his handwriting is terrible and some lines are complete nonsense.

The Admiralty wants a clean report written to ~report.txt~. Skip the garbage, count it, and summarise the rest.`,
              sl: `Svetilničar na Viharni skali že leta beleži vsako nevihto v ~storms.txt~. A njegova pisava je grozna in nekatere vrstice so popoln nesmisel.

Admiraliteta želi čisto poročilo, zapisano v ~report.txt~. Preskoči smeti, jih preštej in povzemi ostalo.`,
            },
          },
          {
            id: "s2", type: "code", kind: "project",
            text: {
              en: `Read ~storms.txt~ and write ~report.txt~.

**Input**: the first line is a header, ~date,location,wind~. Every other line should be like ~2026-03-01,Skull Rock,95~. A line is **bad** if it doesn't have exactly 3 parts or the wind isn't a whole number. Skip blank lines without counting them.

**report.txt** must contain exactly these lines:
:::
Storms: 4
Skipped lines: 2
Strongest: 2026-03-01 at Skull Rock (95 knots)
Average wind: 61.8 knots
Sirocco: 1
Skull Rock: 1
Tortuga: 2
:::
- Average rounded to 1 decimal. Locations in alphabetical order with their storm count.
- When you're done, print ~Report written~.`,
              sl: `Preberi ~storms.txt~ in zapiši ~report.txt~.

**Vnos**: prva vrstica je glava, ~date,location,wind~. Vsaka druga vrstica naj bo kot ~2026-03-01,Skull Rock,95~. Vrstica je **slaba**, če nima natanko 3 delov ali veter ni celo število. Prazne vrstice preskoči, ne da bi jih štel.

**report.txt** mora vsebovati natanko te vrstice:
:::
Storms: 4
Skipped lines: 2
Strongest: 2026-03-01 at Skull Rock (95 knots)
Average wind: 61.8 knots
Sirocco: 1
Skull Rock: 1
Tortuga: 2
:::
- Povprečje zaokroženo na 1 decimalko. Lokacije po abecedi s številom neviht.
- Ko končaš, izpiši ~Report written~.`,
            },
            setup: R`with open("storms.txt", "w") as f:
    f.write("date,location,wind\n2026-01-12,Tortuga,40\n2026-02-03,Sirocco,62\ncoffee stain\n2026-03-01,Skull Rock,95\n\n2026-04-19,Tortuga,fifty\n2026-05-02,Tortuga,50\n")`,
            starter: `# Solo voyage: the Storm Report\n`,
            tests: [
              { check: R`got = open("report.txt").read().strip().splitlines()
assert got == ["Storms: 4", "Skipped lines: 2", "Strongest: 2026-03-01 at Skull Rock (95 knots)", "Average wind: 61.8 knots", "Sirocco: 1", "Skull Rock: 1", "Tortuga: 2"], got`, msg: { en: "report.txt doesn't match the example. Check each line: storm count, skipped lines, strongest, average (1 decimal), then locations alphabetically.", sl: "report.txt se ne ujema s primerom. Preveri vsako vrstico: število neviht, preskočene vrstice, najmočnejšo, povprečje (1 decimalka), nato lokacije po abecedi." } },
              { check: R`assert "report written" in norm(out)`, msg: { en: "Print Report written at the end.", sl: "Na koncu izpiši Report written." } },
              { setup: R`with open("storms.txt", "w") as f:
    f.write("date,location,wind\n2025-10-10,Frostbite Bay,33\n2025-11-11,Frostbite Bay,34,extra\n2025-12-24,Anchor Point,80\n")`, check: R`got = open("report.txt").read().strip().splitlines()
assert got == ["Storms: 2", "Skipped lines: 1", "Strongest: 2025-12-24 at Anchor Point (80 knots)", "Average wind: 56.5 knots", "Anchor Point: 1", "Frostbite Bay: 1"], got`, msg: { en: "With a different storms.txt the report is wrong. Are you reading the file rather than hard-coding? A line with 4 parts is bad too.", sl: "Pri drugačnem storms.txt je poročilo napačno. Ali bereš datoteko namesto vnaprej vpisanih vrednosti? Tudi vrstica s 4 deli je slaba." } },
            ],
            hints: [
              { en: "Skip the header with ~next(f)~ or by checking the line number. For each other line: strip, skip if empty, ~split(\",\")~, and use ~try~/~except ValueError~ around ~int(wind)~. Count bad lines.", sl: "Glavo preskoči z ~next(f)~ ali s preverjanjem številke vrstice. Za vsako drugo vrstico: strip, preskoči, če je prazna, ~split(\",\")~ in okoli ~int(wind)~ uporabi ~try~/~except ValueError~. Štej slabe vrstice." },
              { en: "Collect good storms as tuples in a list. Then: ~max(storms, key=lambda s: s[2])~ finds the strongest (or track it in the loop), a dict counts locations, and you write lines with ~f.write(... + \"\\n\")~.", sl: "Dobre nevihte zberi kot terke v seznamu. Nato: ~max(storms, key=lambda s: s[2])~ najde najmočnejšo (ali jo spremljaj v zanki), slovar šteje lokacije, vrstice pa pišeš z ~f.write(... + \"\\n\")~." },
            ],
            solution: `storms = []\nskipped = 0\nwith open("storms.txt") as f:\n    next(f)  # header\n    for line in f:\n        line = line.strip()\n        if not line:\n            continue\n        parts = line.split(",")\n        if len(parts) != 3:\n            skipped += 1\n            continue\n        date, place, wind = parts\n        try:\n            wind = int(wind)\n        except ValueError:\n            skipped += 1\n            continue\n        storms.append((date, place, wind))\n\nstrongest = storms[0]\ncounts = {}\ntotal = 0\nfor storm in storms:\n    if storm[2] > strongest[2]:\n        strongest = storm\n    counts[storm[1]] = counts.get(storm[1], 0) + 1\n    total += storm[2]\n\nwith open("report.txt", "w") as f:\n    f.write(f"Storms: {len(storms)}\\n")\n    f.write(f"Skipped lines: {skipped}\\n")\n    f.write(f"Strongest: {strongest[0]} at {strongest[1]} ({strongest[2]} knots)\\n")\n    f.write(f"Average wind: {round(total / len(storms), 1)} knots\\n")\n    for place in sorted(counts):\n        f.write(f"{place}: {counts[place]}\\n")\nprint("Report written")\n`,
            after: {
              en: "Reading messy data, skipping what's broken and writing a clean summary is a huge part of real programming work. You just did a data pipeline.",
              sl: "Branje neurejenih podatkov, preskakovanje pokvarjenega in pisanje čistega povzetka je velik del resničnega programerskega dela. Pravkar si naredil podatkovni cevovod.",
            },
          },
        ],
      },
    ],
  };
})();
