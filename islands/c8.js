/* Island 8 — Spellwright Shoals: def, parameters, return, defaults, keyword args, scope, composition */
(function () {
  const R = String.raw;
  (window.SS_ISLANDS = window.SS_ISLANDS || {}).c8 = {
    blurb: {
      en: "The sea witches here keep their spells in named scrolls and recite them whenever they like. Functions are your spells: write once, call forever.",
      sl: "Morske čarovnice tu hranijo uroke v poimenovanih zvitkih in jih recitirajo, kadar želijo. Funkcije so tvoji uroki: napišeš enkrat, kličeš za vedno.",
    },
    log: {
      en: `**Define** a function once, **call** it as often as you like:
:::
def greet(name, greeting="Ahoy"):
    """Return a greeting for name."""
    return f"{greeting}, {name}!"

greet("Pip")                    # 'Ahoy, Pip!'
greet("Anne", "Yo ho")          # positional
greet(greeting="Avast", name="Jack")   # keyword arguments
:::
- ~def~ only defines. Nothing runs until you call it.
- **Parameters** are the names in the ~def~; **arguments** are the values you pass in.
- ~return~ sends a value back and ends the function. No ~return~ means it returns ~None~.
- ~print~ shows something to a person; ~return~ hands a value to the rest of your program. Prefer ~return~.

**Scope**: variables created inside a function are **local**; they disappear when it ends. Pass values **in** as arguments and send results **out** with ~return~ instead of changing global variables.

Break big problems into small functions that call each other. Each one should do one job, and its name should say what that job is.`,
      sl: `Funkcijo enkrat **definiraš**, **kličeš** pa jo, kolikorkrat želiš:
:::
def pozdrav(ime, beseda="Ahoj"):
    """Vrni pozdrav za ime."""
    return f"{beseda}, {ime}!"

pozdrav("Pip")                    # 'Ahoj, Pip!'
pozdrav("Anne", "Jo ho")          # pozicijsko
pozdrav(beseda="Stoj", ime="Jack") # imenovani argumenti
:::
- ~def~ samo definira. Nič se ne izvede, dokler funkcije ne pokličeš.
- **Parametri** so imena v ~def~; **argumenti** so vrednosti, ki jih podaš.
- ~return~ vrne vrednost in konča funkcijo. Brez ~return~ funkcija vrne ~None~.
- ~print~ nekaj pokaže človeku; ~return~ preda vrednost preostanku programa. Raje uporabljaj ~return~.

**Doseg**: spremenljivke, ustvarjene v funkciji, so **lokalne** in izginejo, ko se konča. Vrednosti podajaj **noter** kot argumente in rezultate pošiljaj **ven** z ~return~, ne spreminjaj globalnih spremenljivk.

Velike probleme razbij na majhne funkcije, ki kličejo druga drugo. Vsaka naj opravlja eno nalogo, ime pa naj pove, katero.`,
    },
    lessons: [
      {
        id: "c8l1",
        title: { en: "Your First Spell", sl: "Tvoj prvi urok" },
        steps: [
          {
            id: "s1", type: "story", speaker: "pip",
            text: {
              en: `Squawk! **Spellwright Shoals**. Mind the sea witches. They're friendly, mostly.

A witch doesn't re-invent a spell every time. She writes it once on a scroll, gives it a name, and from then on she just says the name. "Fair Wind!" and the sails fill.

Python lets you do the same. A **function** is a named block of code you write once and run whenever you call its name. You've already used plenty: ~print~, ~len~, ~input~. Now you'll write your own.`,
              sl: `Skvak! **Plitvine urokov**. Pazi se morskih čarovnic. Večinoma so prijazne.

Čarovnica uroka ne izumlja vsakič znova. Enkrat ga zapiše na zvitek, mu da ime in od takrat samo izgovori ime. "Ugoden veter!" in jadra se napnejo.

Python ti omogoča enako. **Funkcija** je poimenovan blok kode, ki ga napišeš enkrat in izvedeš, kadarkoli pokličeš njeno ime. Mnoge si že uporabil: ~print~, ~len~, ~input~. Zdaj boš napisal svoje.`,
            },
          },
          {
            id: "s2", type: "learn",
            text: {
              en: `Define a function with ~def~, a name, parentheses and a colon. The body is indented:
:::
def sing_shanty():
    print("Yo ho, yo ho")
    print("A pirate's life for me")
:::
Defining it doesn't run anything. It just teaches Python the spell. To run it, **call** it by writing its name with parentheses: ~sing_shanty()~.

Why bother? You avoid repeating yourself, you give a chunk of code a clear name, and if you need to fix it, you fix it in one place.`,
              sl: `Funkcijo definiraš z ~def~, imenom, oklepaji in dvopičjem. Telo je zamaknjeno:
:::
def sing_shanty():
    print("Jo ho, jo ho")
    print("Piratsko življenje zame")
:::
Definicija ne izvede ničesar. Python se le nauči uroka. Da ga izvedeš, ga **pokličeš** tako, da napišeš ime z oklepaji: ~sing_shanty()~.

Zakaj? Izogneš se ponavljanju, kosu kode daš jasno ime in če ga moraš popraviti, ga popraviš na enem mestu.`,
            },
            example: `def sing_shanty():\n    print("Yo ho, yo ho")\n    print("A pirate's life for me")\n\nprint("Verse one:")\nsing_shanty()\nprint("Verse two:")\nsing_shanty()\n`,
          },
          {
            id: "s3", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `def greet():\n    print("Ahoy")\n\nprint("Start")\ngreet()\ngreet()\n`,
            options: ["Ahoy\nStart\nAhoy\nAhoy", "Start\nAhoy\nAhoy", "Start\nAhoy", "Ahoy\nAhoy\nStart"],
            answer: 1,
            explain: { en: "The ~def~ block doesn't print anything by itself. \"Start\" prints first, then each call prints \"Ahoy\".", sl: "Blok ~def~ sam ne izpiše ničesar. Najprej se izpiše \"Start\", nato vsak klic izpiše \"Ahoy\"." },
          },
          {
            id: "s4", type: "code", kind: "task",
            text: {
              en: `Define a function ~draw_flag()~ that prints this flag:
:::
+-----+
| X X |
+-----+
:::
Then **call it twice**, so the flag appears two times.`,
              sl: `Definiraj funkcijo ~draw_flag()~, ki izpiše to zastavo:
:::
+-----+
| X X |
+-----+
:::
Nato jo **pokliči dvakrat**, da se zastava pojavi dvakrat.`,
            },
            starter: ``,
            tests: [
              { check: R`assert callable(ns.get("draw_flag"))`, msg: { en: "Define a function called draw_flag.", sl: "Definiraj funkcijo z imenom draw_flag." } },
              { check: R`r, o = capture(ns["draw_flag"])
assert [l.strip() for l in o.splitlines() if l.strip()] == ["+-----+", "| X X |", "+-----+"]`, msg: { en: "Calling draw_flag() should print exactly the three lines of the flag.", sl: "Klic draw_flag() mora izpisati natanko tri vrstice zastave." } },
              { check: R`assert clean == ["+-----+", "| X X |", "+-----+"] * 2`, msg: { en: "Call it twice, so the flag appears two times.", sl: "Pokliči jo dvakrat, da se zastava pojavi dvakrat." } },
            ],
            hints: [
              { en: "Three ~print~ lines, indented under ~def draw_flag():~", sl: "Tri vrstice ~print~, zamaknjene pod ~def draw_flag():~" },
              { en: "After the definition, back at the left edge: ~draw_flag()~ twice.", sl: "Za definicijo, spet ob levem robu: dvakrat ~draw_flag()~." },
            ],
            solution: `def draw_flag():\n    print("+-----+")\n    print("| X X |")\n    print("+-----+")\n\ndraw_flag()\ndraw_flag()\n`,
          },
          {
            id: "s5", type: "code", kind: "debug",
            text: { en: "Python says it doesn't know ~raise_sails~, even though it's right there. Fix it so it prints ~Sails up!~", sl: "Python pravi, da ne pozna ~raise_sails~, čeprav je tik tam. Popravi, da izpiše ~Sails up!~" },
            starter: `raise_sails()\n\ndef raise_sails():\n    print("Sails up!")\n`,
            tests: [{ check: R`assert clean == ["Sails up!"]`, msg: { en: "It should print Sails up!", sl: "Izpisati mora Sails up!" } }],
            hints: [
              { en: "Python reads top to bottom. At line 1, has it seen the ~def~ yet?", sl: "Python bere od zgoraj navzdol. Ali je v 1. vrstici ~def~ že videl?" },
              { en: "Move the call below the definition.", sl: "Klic premakni pod definicijo." },
            ],
            solution: `def raise_sails():\n    print("Sails up!")\n\nraise_sails()\n`,
          },
        ],
      },
      {
        id: "c8l2",
        title: { en: "Ingredients", sl: "Sestavine" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `Functions get much more useful when you can hand them information. Put **parameter** names in the parentheses:
:::
def greet(name):
    print("Ahoy,", name)
:::
When you call ~greet("Anne")~, the **argument** ~"Anne"~ goes into the parameter ~name~ for that call.

Separate several parameters with commas. Arguments are matched **by position**: first to first, second to second.`,
              sl: `Funkcije postanejo veliko uporabnejše, ko jim lahko podaš podatke. Imena **parametrov** zapiši v oklepaje:
:::
def greet(name):
    print("Ahoj,", name)
:::
Ko pokličeš ~greet("Anne")~, gre **argument** ~"Anne"~ za ta klic v parameter ~name~.

Več parametrov loči z vejicami. Argumenti se ujemajo **po položaju**: prvi s prvim, drugi z drugim.`,
            },
            example: `def greet(name):\n    print("Ahoy,", name)\n\ngreet("Anne")\ngreet("Jack")\n\ndef describe(ship, guns):\n    print(ship, "carries", guns, "guns")\n\ndescribe("Serpent", 12)\ndescribe("Sea Wolf", 30)\n`,
          },
          {
            id: "s2", type: "predict",
            text: { en: "Order matters. What prints?", sl: "Vrstni red je pomemben. Kaj se izpiše?" },
            code: `def describe(ship, guns):\n    print(ship, "has", guns, "guns")\n\ndescribe(12, "Serpent")\n`,
            options: ["Serpent has 12 guns", "12 has Serpent guns", { en: "An error", sl: "Napaka" }, "ship has guns guns"],
            answer: 1,
            explain: { en: "The first argument goes to the first parameter, whatever it is. Python doesn't guess what you meant.", sl: "Prvi argument gre v prvi parameter, karkoli že je. Python ne ugiba, kaj si mislil." },
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `Write ~announce(name, rank)~ that prints a herald's announcement. ~announce("Anne", "Navigator")~ prints:
:::
All hail Anne, the Navigator!
:::
Call it once for ~"Marlow"~ and ~"Captain"~.`,
              sl: `Napiši ~announce(name, rank)~, ki izpiše glasnikovo oznanilo. ~announce("Anne", "Navigator")~ izpiše:
:::
All hail Anne, the Navigator!
:::
Pokliči jo enkrat za ~"Marlow"~ in ~"Captain"~.`,
            },
            starter: ``,
            tests: [
              { check: R`r, o = capture(ns["announce"], "Anne", "Navigator")
assert o.strip() == "All hail Anne, the Navigator!"`, msg: { en: "announce(\"Anne\", \"Navigator\") should print All hail Anne, the Navigator!", sl: "announce(\"Anne\", \"Navigator\") naj izpiše All hail Anne, the Navigator!" } },
              { check: R`r, o = capture(ns["announce"], "Pip", "Parrot")
assert o.strip() == "All hail Pip, the Parrot!"`, msg: { en: "announce(\"Pip\", \"Parrot\") should print All hail Pip, the Parrot!", sl: "announce(\"Pip\", \"Parrot\") naj izpiše All hail Pip, the Parrot!" } },
              { check: R`assert "All hail Marlow, the Captain!" in clean`, msg: { en: "Call announce for Marlow, the Captain.", sl: "Pokliči announce za Marlow, the Captain." } },
            ],
            hints: [
              { en: "An f-string makes the comma and spacing easy: ~f\"All hail {name}, the {rank}!\"~", sl: "S f-nizom sta vejica in razmik enostavna: ~f\"All hail {name}, the {rank}!\"~" },
              { en: "~def announce(name, rank):~ with that print inside, then ~announce(\"Marlow\", \"Captain\")~.", sl: "~def announce(name, rank):~ s tem izpisom v notranjosti, nato ~announce(\"Marlow\", \"Captain\")~." },
            ],
            solution: `def announce(name, rank):\n    print(f"All hail {name}, the {rank}!")\n\nannounce("Marlow", "Captain")\n`,
          },
          {
            id: "s4", type: "code", kind: "task",
            text: {
              en: `Write ~draw_line(length, char)~ that prints one line made of ~char~ repeated ~length~ times. ~draw_line(5, "=")~ prints:
:::
=====
:::`,
              sl: `Napiši ~draw_line(length, char)~, ki izpiše eno vrstico iz znaka ~char~, ponovljenega ~length~-krat. ~draw_line(5, "=")~ izpiše:
:::
=====
:::`,
            },
            starter: ``,
            tests: [
              { check: R`r, o = capture(ns["draw_line"], 5, "=")
assert o.strip() == "====="`, msg: { en: "draw_line(5, \"=\") should print =====", sl: "draw_line(5, \"=\") naj izpiše =====" } },
              { check: R`r, o = capture(ns["draw_line"], 3, "#")
assert o.strip() == "###"`, msg: { en: "draw_line(3, \"#\") should print ###", sl: "draw_line(3, \"#\") naj izpiše ###" } },
            ],
            hints: [
              { en: "Remember ~\"*\" * 3~ from Whirlpool Reef?", sl: "Se spomniš ~\"*\" * 3~ z Grebena vrtincev?" },
              { en: "~print(char * length)~", sl: "~print(char * length)~" },
            ],
            solution: `def draw_line(length, char):\n    print(char * length)\n\ndraw_line(5, "=")\n`,
          },
        ],
      },
      {
        id: "c8l3",
        title: { en: "Return to Sender", sl: "Vrni pošiljatelju" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `This is the most important idea on the island.

~print~ **shows** a value to a person. It's gone after that; your program can't use it.

~return~ **hands a value back** to whoever called the function. The call itself becomes that value, so you can store it, compare it or feed it into another function:
:::
def double(x):
    return x * 2

result = double(4) + 1   # 9
:::
~return~ also **ends** the function immediately. A function with no ~return~ gives back ~None~.

Rule of thumb: functions should usually **return**, and the main program decides what to print.`,
              sl: `To je najpomembnejša ideja na otoku.

~print~ vrednost **pokaže** človeku. Potem izgine; tvoj program je ne more uporabiti.

~return~ vrednost **vrne** tistemu, ki je funkcijo poklical. Klic sam postane ta vrednost, zato jo lahko shraniš, primerjaš ali podaš drugi funkciji:
:::
def double(x):
    return x * 2

result = double(4) + 1   # 9
:::
~return~ funkcijo tudi takoj **konča**. Funkcija brez ~return~ vrne ~None~.

Pravilo: funkcije naj običajno **vračajo**, glavni program pa odloči, kaj izpisati.`,
            },
            example: `def double(x):\n    return x * 2\n\nprint(double(4))\nbig = double(double(10))\nprint("Double double 10:", big)\nprint(double(3) > 5)\n\ndef just_prints(x):\n    print("I printed", x)\n\nresult = just_prints(7)\nprint("But I returned:", result)\n`,
          },
          {
            id: "s2", type: "predict",
            text: { en: "Spot the difference. What prints?", sl: "Najdi razliko. Kaj se izpiše?" },
            code: `def double(x):\n    print(x * 2)\n\nresult = double(4)\nprint(result)\n`,
            options: ["8\n8", "8\nNone", "None\n8", "8"],
            answer: 1,
            explain: { en: "The function prints 8, but it has no ~return~, so the call gives back ~None~. That's what ends up in ~result~.", sl: "Funkcija izpiše 8, a nima ~return~, zato klic vrne ~None~. To konča v ~result~." },
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `Write ~area(width, height)~ that **returns** the area of a sail. It shouldn't print anything. Then print ~Sail area: 12~ using ~area(3, 4)~.`,
              sl: `Napiši ~area(width, height)~, ki **vrne** ploščino jadra. Ničesar naj ne izpiše. Nato z ~area(3, 4)~ izpiši ~Sail area: 12~.`,
            },
            starter: ``,
            tests: [
              { check: R`r, o = capture(ns["area"], 3, 4)
assert r == 12 and o == ""`, msg: { en: "area(3, 4) should return 12 without printing anything.", sl: "area(3, 4) naj vrne 12, ne da bi kaj izpisal." } },
              { check: R`assert ns["area"](2.5, 2) == 5.0 and ns["area"](10, 0) == 0`, msg: { en: "area should work for any numbers, like area(2.5, 2) == 5.0.", sl: "area naj deluje za vsa števila, na primer area(2.5, 2) == 5.0." } },
              { check: R`assert "Sail area: 12" in clean`, msg: { en: "Print Sail area: 12 using the function.", sl: "S funkcijo izpiši Sail area: 12." } },
            ],
            hints: [
              { en: "Inside the function: ~return width * height~", sl: "V funkciji: ~return width * height~" },
              { en: "Outside: ~print(\"Sail area:\", area(3, 4))~", sl: "Zunaj: ~print(\"Sail area:\", area(3, 4))~" },
            ],
            solution: `def area(width, height):\n    return width * height\n\nprint("Sail area:", area(3, 4))\n`,
          },
          {
            id: "s4", type: "code", kind: "task",
            text: { en: `Write ~is_even(n)~ that returns ~True~ if ~n~ is even and ~False~ otherwise.`, sl: `Napiši ~is_even(n)~, ki vrne ~True~, če je ~n~ sod, sicer ~False~.` },
            starter: ``,
            tests: [
              { check: R`f = ns["is_even"]
assert f(4) is True and f(7) is False and f(0) is True and f(-3) is False`, msg: { en: "is_even(4) → True, is_even(7) → False, is_even(0) → True, is_even(-3) → False", sl: "is_even(4) → True, is_even(7) → False, is_even(0) → True, is_even(-3) → False" } },
            ],
            hints: [
              { en: "Even means the remainder after dividing by 2 is 0.", sl: "Sodo pomeni, da je ostanek pri deljenju z 2 enak 0." },
              { en: "A comparison is already True or False, so you can return it directly: ~return n % 2 == 0~", sl: "Primerjava je že True ali False, zato jo lahko vrneš neposredno: ~return n % 2 == 0~" },
            ],
            solution: `def is_even(n):\n    return n % 2 == 0\n`,
          },
          {
            id: "s5", type: "code", kind: "debug",
            text: {
              en: "The bill should be 3 crates at 4 coins plus a 5-coin delivery fee: ~Bill: 17~. Instead it crashes. Fix the function.",
              sl: "Račun naj bo 3 zaboji po 4 kovance plus 5 kovancev dostave: ~Bill: 17~. Namesto tega se sesuje. Popravi funkcijo.",
            },
            starter: `def total_price(qty, price):\n    print(qty * price)\n\nbill = total_price(3, 4) + 5\nprint("Bill:", bill)\n`,
            tests: [
              { check: R`assert ns.get("bill") == 17 and clean == ["Bill: 17"]`, msg: { en: "It should print only Bill: 17.", sl: "Izpisati mora samo Bill: 17." } },
            ],
            hints: [
              { en: "What does ~total_price(3, 4)~ give back? You can't add 5 to that.", sl: "Kaj vrne ~total_price(3, 4)~? Temu ne moreš prišteti 5." },
              { en: "Change the ~print~ inside the function to ~return~.", sl: "~print~ v funkciji zamenjaj z ~return~." },
            ],
            solution: `def total_price(qty, price):\n    return qty * price\n\nbill = total_price(3, 4) + 5\nprint("Bill:", bill)\n`,
            after: { en: "\"unsupported operand type(s) for +: 'NoneType'\" almost always means a function forgot to ~return~.", sl: "\"unsupported operand type(s) for +: 'NoneType'\" skoraj vedno pomeni, da je funkcija pozabila ~return~." },
          },
        ],
      },
      {
        id: "c8l4",
        title: { en: "Defaults and Names", sl: "Privzete vrednosti in imena" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `A parameter can have a **default value**, used when the caller leaves it out:
:::
def greet(name, greeting="Ahoy"):
    return f"{greeting}, {name}!"
:::
~greet("Pip")~ uses the default; ~greet("Pip", "Avast")~ overrides it. Parameters with defaults go **after** the ones without.

You can also pass arguments **by name**, in any order: ~greet(greeting="Yo", name="Pip")~. You've used this already: ~print(x, end=" ")~ and ~sorted(x, reverse=True)~ are keyword arguments.`,
              sl: `Parameter ima lahko **privzeto vrednost**, ki se uporabi, ko jo klicatelj izpusti:
:::
def greet(name, greeting="Ahoj"):
    return f"{greeting}, {name}!"
:::
~greet("Pip")~ uporabi privzeto; ~greet("Pip", "Stoj")~ jo povozi. Parametri s privzetimi vrednostmi gredo **za** tistimi brez.

Argumente lahko podaš tudi **po imenu**, v poljubnem vrstnem redu: ~greet(greeting="Jo", name="Pip")~. To si že uporabljal: ~print(x, end=" ")~ in ~sorted(x, reverse=True)~ sta imenovana argumenta.`,
            },
            example: `def greet(name, greeting="Ahoy"):\n    return f"{greeting}, {name}!"\n\nprint(greet("Pip"))\nprint(greet("Anne", "Yo ho"))\nprint(greet(greeting="Avast", name="Jack"))\n`,
          },
          {
            id: "s2", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `def make_grog(rum=1, water=2):\n    return f"{rum} rum, {water} water"\n\nprint(make_grog(water=5))\n`,
            options: ["5 rum, 2 water", "1 rum, 5 water", "1 rum, 2 water", { en: "An error", sl: "Napaka" }],
            answer: 1,
            explain: { en: "~water=5~ sets only ~water~ by name. ~rum~ keeps its default of 1.", sl: "~water=5~ po imenu nastavi samo ~water~. ~rum~ obdrži privzeto vrednost 1." },
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `Write ~fire(cannons=1)~ that **returns** a string with ~BOOM~ once per cannon, separated by spaces:
- ~fire()~ → ~"BOOM"~
- ~fire(3)~ → ~"BOOM BOOM BOOM"~`,
              sl: `Napiši ~fire(cannons=1)~, ki **vrne** niz z ~BOOM~ enkrat za vsak top, ločeno s presledki:
- ~fire()~ → ~"BOOM"~
- ~fire(3)~ → ~"BOOM BOOM BOOM"~`,
            },
            starter: ``,
            tests: [
              { check: R`f = ns["fire"]
assert f() == "BOOM" and f(3) == "BOOM BOOM BOOM" and f(cannons=2) == "BOOM BOOM"`, msg: { en: "fire() → \"BOOM\", fire(3) → \"BOOM BOOM BOOM\", fire(cannons=2) → \"BOOM BOOM\". No extra spaces at the ends.", sl: "fire() → \"BOOM\", fire(3) → \"BOOM BOOM BOOM\", fire(cannons=2) → \"BOOM BOOM\". Brez odvečnih presledkov na koncih." } },
            ],
            hints: [
              { en: "~\" \".join(...)~ puts spaces only **between** items.", sl: "~\" \".join(...)~ postavi presledke samo **med** elemente." },
              { en: "~return \" \".join([\"BOOM\"] * cannons)~", sl: "~return \" \".join([\"BOOM\"] * cannons)~" },
            ],
            solution: `def fire(cannons=1):\n    return " ".join(["BOOM"] * cannons)\n\nprint(fire())\nprint(fire(3))\n`,
          },
          {
            id: "s4", type: "code", kind: "task",
            text: {
              en: `Write ~price_with_tax(price, tax=0.2)~ that returns the price plus tax, rounded to 2 decimals:
- ~price_with_tax(10)~ → ~12.0~
- ~price_with_tax(10, tax=0.5)~ → ~15.0~`,
              sl: `Napiši ~price_with_tax(price, tax=0.2)~, ki vrne ceno z davkom, zaokroženo na 2 decimalki:
- ~price_with_tax(10)~ → ~12.0~
- ~price_with_tax(10, tax=0.5)~ → ~15.0~`,
            },
            starter: ``,
            tests: [
              { check: R`f = ns["price_with_tax"]
assert f(10) == 12.0 and f(10, tax=0.5) == 15.0 and f(3.33) == 4.0 and f(19.99, 0.1) == 21.99`, msg: { en: "Check: price_with_tax(10) == 12.0, price_with_tax(10, tax=0.5) == 15.0, price_with_tax(19.99, 0.1) == 21.99", sl: "Preveri: price_with_tax(10) == 12.0, price_with_tax(10, tax=0.5) == 15.0, price_with_tax(19.99, 0.1) == 21.99" } },
            ],
            hints: [
              { en: "Price plus tax is ~price * (1 + tax)~.", sl: "Cena z davkom je ~price * (1 + tax)~." },
              { en: "~return round(price * (1 + tax), 2)~", sl: "~return round(price * (1 + tax), 2)~" },
            ],
            solution: `def price_with_tax(price, tax=0.2):\n    return round(price * (1 + tax), 2)\n`,
          },
        ],
      },
      {
        id: "c8l5",
        title: { en: "Inside and Outside", sl: "Znotraj in zunaj" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `Variables created inside a function are **local**: they exist only while the function runs, and the outside world can't see them.

Assigning to a name inside a function always creates a **new local** variable, even if a variable with the same name exists outside. The outside one stays untouched.

The clean way to work: pass values **in** as arguments, send results **out** with ~return~. Python has a ~global~ keyword, but programs built on it get tangled fast. Avoid it.`,
              sl: `Spremenljivke, ustvarjene v funkciji, so **lokalne**: obstajajo le med izvajanjem funkcije in zunanji svet jih ne vidi.

Prirejanje imenu znotraj funkcije vedno ustvari **novo lokalno** spremenljivko, tudi če zunaj obstaja spremenljivka z istim imenom. Zunanja ostane nedotaknjena.

Čist način dela: vrednosti podaj **noter** kot argumente, rezultate pošlji **ven** z ~return~. Python ima ključno besedo ~global~, a programi, zgrajeni na njej, se hitro zapletejo. Izogibaj se ji.`,
            },
            example: `def brew():\n    secret = "extra rum"\n    return "grog with " + secret\n\nprint(brew())\n# print(secret)   # NameError: secret only lived inside brew()\n\ngold = 100\ndef spend():\n    gold = 50      # a new local variable\n    return gold\n\nprint(spend(), gold)\n`,
          },
          {
            id: "s2", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `gold = 100\n\ndef spend():\n    gold = 50\n    print("Inside:", gold)\n\nspend()\nprint("Outside:", gold)\n`,
            options: ["Inside: 50\nOutside: 50", "Inside: 50\nOutside: 100", "Inside: 100\nOutside: 100", { en: "An error", sl: "Napaka" }],
            answer: 1,
            explain: { en: "The ~gold = 50~ inside creates a separate local variable. The ~gold~ outside is never changed.", sl: "~gold = 50~ v funkciji ustvari ločeno lokalno spremenljivko. Zunanji ~gold~ se nikoli ne spremeni." },
          },
          {
            id: "s3", type: "code", kind: "debug",
            text: {
              en: `This crashes with ~UnboundLocalError~. Fix it **without** ~global~: make ~add_points(score, points)~ take the score in and return the new score. The program should print ~10~.`,
              sl: `To se sesuje z ~UnboundLocalError~. Popravi **brez** ~global~: naj ~add_points(score, points)~ sprejme rezultat in vrne novega. Program naj izpiše ~10~.`,
            },
            starter: `score = 0\n\ndef add_points(points):\n    score = score + points\n\nadd_points(10)\nprint(score)\n`,
            tests: [
              { check: R`assert clean == ["10"]`, msg: { en: "It should print 10.", sl: "Izpisati mora 10." } },
              { check: R`assert "global" not in code and ns["add_points"](5, 3) == 8`, msg: { en: "Don't use global. add_points(5, 3) should return 8.", sl: "Ne uporabi global. add_points(5, 3) naj vrne 8." } },
            ],
            hints: [
              { en: "Give the function a ~score~ parameter and ~return score + points~.", sl: "Funkciji dodaj parameter ~score~ in ~return score + points~." },
              { en: "Then catch the result outside: ~score = add_points(score, 10)~", sl: "Nato rezultat ujemi zunaj: ~score = add_points(score, 10)~" },
            ],
            solution: `score = 0\n\ndef add_points(score, points):\n    return score + points\n\nscore = add_points(score, 10)\nprint(score)\n`,
          },
        ],
      },
      {
        id: "c8l6",
        title: { en: "Spells That Cast Spells", sl: "Uroki, ki kličejo uroke" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `Big programs are built from small functions that call each other. Each one does **one job**, and its name says what that job is.

A string right under the ~def~ line is a **docstring**: a short description of what the function does. ~help(function)~ shows it.

When a problem feels too big, write the names of the small functions you'd need first, then fill them in one at a time. Programmers call this **decomposition**.`,
              sl: `Veliki programi so zgrajeni iz majhnih funkcij, ki kličejo druga drugo. Vsaka opravlja **eno nalogo**, ime pa pove, katero.

Niz tik pod vrstico ~def~ je **docstring**: kratek opis, kaj funkcija dela. ~help(funkcija)~ ga pokaže.

Ko se problem zdi prevelik, najprej napiši imena majhnih funkcij, ki bi jih potreboval, nato jih izpolni eno za drugo. Programerji temu pravijo **razgradnja**.`,
            },
            example: `def to_fahrenheit(c):\n    """Convert Celsius to Fahrenheit."""\n    return c * 9 / 5 + 32\n\ndef weather_report(place, c):\n    """Build a one-line report using to_fahrenheit."""\n    return f"{place}: {c}°C ({to_fahrenheit(c):.0f}°F)"\n\nprint(weather_report("Tortuga", 31))\nprint(weather_report("Frostbite Bay", -4))\nhelp(to_fahrenheit)\n`,
          },
          {
            id: "s2", type: "code", kind: "task",
            text: {
              en: `Write three functions:
1. ~to_fahrenheit(c)~ returns ~c * 9 / 5 + 32~
2. ~to_celsius(f)~ returns the reverse, rounded to 1 decimal
3. ~describe(c)~ returns ~"Freezing"~ below 0, ~"Cold"~ below 15, ~"Warm"~ below 25, otherwise ~"Hot"~`,
              sl: `Napiši tri funkcije:
1. ~to_fahrenheit(c)~ vrne ~c * 9 / 5 + 32~
2. ~to_celsius(f)~ vrne obratno, zaokroženo na 1 decimalko
3. ~describe(c)~ vrne ~"Freezing"~ pod 0, ~"Cold"~ pod 15, ~"Warm"~ pod 25, sicer ~"Hot"~`,
            },
            starter: ``,
            tests: [
              { check: R`assert ns["to_fahrenheit"](100) == 212 and ns["to_fahrenheit"](0) == 32`, msg: { en: "to_fahrenheit(100) should be 212 and to_fahrenheit(0) should be 32.", sl: "to_fahrenheit(100) naj bo 212, to_fahrenheit(0) pa 32." } },
              { check: R`assert ns["to_celsius"](212) == 100 and ns["to_celsius"](50) == 10 and ns["to_celsius"](0) == -17.8`, msg: { en: "to_celsius(212) → 100, to_celsius(50) → 10, to_celsius(0) → -17.8 (rounded to 1 decimal). The formula is (f - 32) * 5 / 9.", sl: "to_celsius(212) → 100, to_celsius(50) → 10, to_celsius(0) → -17.8 (zaokroženo na 1 decimalko). Formula je (f - 32) * 5 / 9." } },
              { check: R`d = ns["describe"]
assert [d(-5), d(0), d(14), d(15), d(24), d(25), d(40)] == ["Freezing", "Cold", "Cold", "Warm", "Warm", "Hot", "Hot"]`, msg: { en: "describe: -5 Freezing, 0 Cold, 14 Cold, 15 Warm, 24 Warm, 25 Hot. Check the boundaries.", sl: "describe: -5 Freezing, 0 Cold, 14 Cold, 15 Warm, 24 Warm, 25 Hot. Preveri meje." } },
            ],
            hints: [
              { en: "~to_celsius~ undoes ~to_fahrenheit~: subtract 32 first, then multiply by 5 and divide by 9.", sl: "~to_celsius~ razveljavi ~to_fahrenheit~: najprej odštej 32, nato pomnoži s 5 in deli z 9." },
              { en: "~describe~ is an ~if~/~elif~ chain that **returns** a word in each branch.", sl: "~describe~ je veriga ~if~/~elif~, ki v vsaki veji **vrne** besedo." },
            ],
            solution: `def to_fahrenheit(c):\n    return c * 9 / 5 + 32\n\ndef to_celsius(f):\n    return round((f - 32) * 5 / 9, 1)\n\ndef describe(c):\n    if c < 0:\n        return "Freezing"\n    elif c < 15:\n        return "Cold"\n    elif c < 25:\n        return "Warm"\n    return "Hot"\n`,
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `A **prime** number is greater than 1 and divisible only by 1 and itself.
1. Write ~is_prime(n)~ returning True or False.
2. Write ~primes_up_to(limit)~ that **uses** ~is_prime~ and returns a list of all primes from 2 up to and including ~limit~.

~primes_up_to(20)~ → ~[2, 3, 5, 7, 11, 13, 17, 19]~`,
              sl: `**Praštevilo** je večje od 1 in deljivo samo z 1 in samim sabo.
1. Napiši ~is_prime(n)~, ki vrne True ali False.
2. Napiši ~primes_up_to(limit)~, ki **uporabi** ~is_prime~ in vrne seznam vseh praštevil od 2 do vključno ~limit~.

~primes_up_to(20)~ → ~[2, 3, 5, 7, 11, 13, 17, 19]~`,
            },
            starter: ``,
            tests: [
              { check: R`p = ns["is_prime"]
assert [n for n in range(-3, 30) if p(n)] == [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]`, msg: { en: "is_prime is wrong for some numbers. 0, 1 and negatives are not prime; 2 is.", sl: "is_prime je napačen za nekatera števila. 0, 1 in negativna niso praštevila; 2 je." } },
              { check: R`assert ns["primes_up_to"](20) == [2, 3, 5, 7, 11, 13, 17, 19] and ns["primes_up_to"](2) == [2] and ns["primes_up_to"](1) == []`, msg: { en: "primes_up_to(20) → [2, 3, 5, 7, 11, 13, 17, 19], primes_up_to(2) → [2], primes_up_to(1) → []", sl: "primes_up_to(20) → [2, 3, 5, 7, 11, 13, 17, 19], primes_up_to(2) → [2], primes_up_to(1) → []" } },
              { check: R`import re
body = code.split("def primes_up_to")[1] if "def primes_up_to" in code else ""
assert "is_prime(" in body`, msg: { en: "primes_up_to should call is_prime.", sl: "primes_up_to naj kliče is_prime." } },
            ],
            hints: [
              { en: "In ~is_prime~: return False if ~n < 2~. Then try every divisor from 2 to n-1; if any divides evenly (~n % d == 0~), return False. If none do, return True after the loop.", sl: "V ~is_prime~: vrni False, če ~n < 2~. Nato poskusi vse delitelje od 2 do n-1; če kateri deli brez ostanka (~n % d == 0~), vrni False. Če noben, po zanki vrni True." },
              { en: "~primes_up_to~ builds a list: loop ~range(2, limit + 1)~ and append each number where ~is_prime(n)~ is True.", sl: "~primes_up_to~ gradi seznam: teci po ~range(2, limit + 1)~ in dodaj vsako število, kjer je ~is_prime(n)~ True." },
            ],
            solution: `def is_prime(n):\n    if n < 2:\n        return False\n    for d in range(2, n):\n        if n % d == 0:\n            return False\n    return True\n\ndef primes_up_to(limit):\n    result = []\n    for n in range(2, limit + 1):\n        if is_prime(n):\n            result.append(n)\n    return result\n\nprint(primes_up_to(20))\n`,
          },
        ],
      },
      {
        id: "c8l7",
        title: { en: "Solo Voyage: The Navigator's Toolkit", sl: "Samostojna plovba: Krmarjeva orodjarna" },
        solo: true,
        steps: [
          {
            id: "s1", type: "story", speaker: "captain",
            text: {
              en: `Anne, our navigator, plots every voyage by hand. Takes her all night.

Build her a toolkit: a set of small functions she can reuse on every voyage. The tests will call your functions directly, the way another programmer would use your code. Names and return values must be exactly right.`,
              sl: `Anne, naša krmarka, vsako plovbo nariše ročno. Traja ji vso noč.

Zgradi ji orodjarno: nabor majhnih funkcij, ki jih lahko uporabi na vsaki plovbi. Preizkusi bodo tvoje funkcije klicali neposredno, tako kot bi tvojo kodo uporabil drug programer. Imena in vrnjene vrednosti morajo biti natanko prave.`,
            },
          },
          {
            id: "s2", type: "code", kind: "project",
            text: {
              en: `Write these four functions. None of them should print, except the last.

1. ~distance(x1, y1, x2, y2)~ returns the straight-line distance between two points, rounded to 2 decimals. (Pythagoras: square root of dx² + dy², and ~x ** 0.5~ is a square root.)
2. ~travel_days(dist, speed=5)~ returns how many **whole days** a trip takes. A part day counts as a full day: 10 at speed 5 is 2 days, 11 is 3 days.
3. ~format_leg(name, days)~ returns ~"Tortuga: 3 days"~, but ~"Tortuga: 1 day"~ when it's exactly 1.
4. ~plan_voyage(stops)~ takes a list of ~(name, x, y)~ tuples. Start at (0, 0), sail to each stop in order, **print** each leg with ~format_leg~, then **return** the total days.

~plan_voyage([("Tortuga", 3, 4), ("Sirocco", 3, 14)])~ prints ~Tortuga: 1 day~ and ~Sirocco: 2 days~ and returns ~3~.`,
              sl: `Napiši te štiri funkcije. Nobena naj ne izpisuje, razen zadnje.

1. ~distance(x1, y1, x2, y2)~ vrne razdaljo med točkama po ravni črti, zaokroženo na 2 decimalki. (Pitagora: kvadratni koren iz dx² + dy², ~x ** 0.5~ pa je kvadratni koren.)
2. ~travel_days(dist, speed=5)~ vrne, koliko **celih dni** traja pot. Del dneva šteje kot cel dan: 10 pri hitrosti 5 sta 2 dneva, 11 so 3 dnevi.
3. ~format_leg(name, days)~ vrne ~"Tortuga: 3 days"~, a ~"Tortuga: 1 day"~, ko je natanko 1.
4. ~plan_voyage(stops)~ sprejme seznam terk ~(ime, x, y)~. Začni pri (0, 0), pluj do vsake postaje po vrsti, vsak del poti **izpiši** s ~format_leg~, nato **vrni** skupno število dni.

~plan_voyage([("Tortuga", 3, 4), ("Sirocco", 3, 14)])~ izpiše ~Tortuga: 1 day~ in ~Sirocco: 2 days~ ter vrne ~3~.`,
            },
            starter: `# Solo voyage: the Navigator's Toolkit\n`,
            tests: [
              { check: R`d = ns["distance"]
assert d(0, 0, 3, 4) == 5 and d(1, 1, 1, 1) == 0 and d(0, 0, 1, 1) == 1.41 and d(-2, 3, 4, -5) == 10`, msg: { en: "distance: (0,0)→(3,4) is 5, (0,0)→(1,1) is 1.41, (-2,3)→(4,-5) is 10.", sl: "distance: (0,0)→(3,4) je 5, (0,0)→(1,1) je 1.41, (-2,3)→(4,-5) je 10." } },
              { check: R`t = ns["travel_days"]
assert t(10) == 2 and t(11) == 3 and t(0) == 0 and t(5) == 1 and t(12, speed=4) == 3 and t(13, 4) == 4 and t(1.41) == 1`, msg: { en: "travel_days: 10 → 2, 11 → 3, 0 → 0, 5 → 1, (12, speed=4) → 3, 1.41 → 1. Part days round up.", sl: "travel_days: 10 → 2, 11 → 3, 0 → 0, 5 → 1, (12, speed=4) → 3, 1.41 → 1. Deli dneva se zaokrožijo navzgor." } },
              { check: R`f = ns["format_leg"]
assert f("Tortuga", 3) == "Tortuga: 3 days" and f("Sirocco", 1) == "Sirocco: 1 day" and f("Home", 0) == "Home: 0 days"`, msg: { en: "format_leg(\"Tortuga\", 3) → \"Tortuga: 3 days\", format_leg(\"Sirocco\", 1) → \"Sirocco: 1 day\".", sl: "format_leg(\"Tortuga\", 3) → \"Tortuga: 3 days\", format_leg(\"Sirocco\", 1) → \"Sirocco: 1 day\"." } },
              { check: R`r, o = capture(ns["plan_voyage"], [("Tortuga", 3, 4), ("Sirocco", 3, 14)])
assert r == 3 and [l.strip() for l in o.splitlines() if l.strip()] == ["Tortuga: 1 day", "Sirocco: 2 days"]`, msg: { en: "plan_voyage([(\"Tortuga\", 3, 4), (\"Sirocco\", 3, 14)]) should print Tortuga: 1 day and Sirocco: 2 days, and return 3. Each leg starts where the previous one ended.", sl: "plan_voyage([(\"Tortuga\", 3, 4), (\"Sirocco\", 3, 14)]) naj izpiše Tortuga: 1 day in Sirocco: 2 days ter vrne 3. Vsak del poti se začne, kjer se je prejšnji končal." } },
              { check: R`r, o = capture(ns["plan_voyage"], [])
assert r == 0 and o.strip() == ""`, msg: { en: "plan_voyage([]) should print nothing and return 0.", sl: "plan_voyage([]) naj ne izpiše ničesar in vrne 0." } },
              { check: R`for name in ("distance", "travel_days", "format_leg"):
    pass
r1, o1 = capture(ns["distance"], 0, 0, 3, 4)
r2, o2 = capture(ns["travel_days"], 10)
r3, o3 = capture(ns["format_leg"], "A", 2)
assert o1 == o2 == o3 == ""`, msg: { en: "distance, travel_days and format_leg should return values without printing.", sl: "distance, travel_days in format_leg naj vračajo vrednosti, ne da bi izpisovale." } },
            ],
            hints: [
              { en: "Write and test one function at a time. Call each with the examples and print the result while you work; you can remove those prints at the end.", sl: "Napiši in preizkusi eno funkcijo naenkrat. Med delom vsako pokliči s primeri in izpiši rezultat; te izpise na koncu lahko odstraniš." },
              { en: "Whole days rounding up: ~int(dist // speed)~ plus 1 if there's anything left over (~dist % speed > 0~). In ~plan_voyage~, keep ~x, y = 0, 0~ and update them to each stop after its leg.", sl: "Celi dnevi navzgor: ~int(dist // speed)~ plus 1, če kaj ostane (~dist % speed > 0~). V ~plan_voyage~ hrani ~x, y = 0, 0~ in ju po vsakem delu posodobi na postajo." },
            ],
            solution: `def distance(x1, y1, x2, y2):\n    return round(((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5, 2)\n\ndef travel_days(dist, speed=5):\n    days = int(dist // speed)\n    if dist % speed > 0:\n        days += 1\n    return days\n\ndef format_leg(name, days):\n    unit = "day" if days == 1 else "days"\n    return f"{name}: {days} {unit}"\n\ndef plan_voyage(stops):\n    x, y = 0, 0\n    total = 0\n    for name, sx, sy in stops:\n        days = travel_days(distance(x, y, sx, sy))\n        print(format_leg(name, days))\n        total += days\n        x, y = sx, sy\n    return total\n\nprint("Total:", plan_voyage([("Tortuga", 3, 4), ("Sirocco", 3, 14)]))\n`,
            after: {
              en: "~\"day\" if days == 1 else \"days\"~ is a **conditional expression**: a one-line if/else that produces a value. Handy for small choices like this.",
              sl: "~\"day\" if days == 1 else \"days\"~ je **pogojni izraz**: enovrstični if/else, ki vrne vrednost. Priročen za majhne izbire, kot je ta.",
            },
          },
        ],
      },
    ],
  };
})();
