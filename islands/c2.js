/* Island 2 — Doubloon Docks: numbers, operators, updating variables, types, input() */
(function () {
  const R = String.raw;
  (window.SS_ISLANDS = window.SS_ISLANDS || {}).c2 = {
    blurb: {
      en: "The quartermaster counts every coin. Learn to calculate, split loot fairly, convert between text and numbers, and ask the crew questions with input().",
      sl: "Intendant prešteje vsak kovanec. Nauči se računati, pošteno deliti plen, pretvarjati med besedilom in števili ter posadko spraševati z input().",
    },
    log: {
      en: `**Numbers**: ~int~ is a whole number (~7~), ~float~ has a decimal point (~7.5~).
:::
print(7 + 2, 7 - 2, 7 * 2)   # 9 5 14
print(7 / 2)                 # 3.5   (/ always gives a float)
print(7 // 2)                # 3     (floor division)
print(7 % 2)                 # 1     (remainder)
print(2 ** 10)               # 1024  (power)
print(round(3.14159, 2))     # 3.14
:::
- Order: ~**~, then ~* / // %~, then ~+ -~. Use parentheses when in doubt.
- ~n % 2 == 0~ means "n is even".

**Updating a variable**
:::
gold = 10
gold = gold + 5    # same as gold += 5
gold -= 3          # also *=  /=  //=
:::
**Types**: ~type(x)~ tells you what ~x~ is. Convert with ~int()~, ~float()~, ~str()~.
- ~"4" + "2"~ is ~"42"~ (text is joined), ~4 + 2~ is ~6~.
- ~"ho" * 3~ is ~"hohoho"~.

**input()** always gives back **text**. Convert it before doing maths:
:::
age = int(input("Age? "))
price = float(input("Price? "))
:::`,
      sl: `**Števila**: ~int~ je celo število (~7~), ~float~ ima decimalno piko (~7.5~).
:::
print(7 + 2, 7 - 2, 7 * 2)   # 9 5 14
print(7 / 2)                 # 3.5   (/ vedno vrne float)
print(7 // 2)                # 3     (celoštevilsko deljenje)
print(7 % 2)                 # 1     (ostanek)
print(2 ** 10)               # 1024  (potenca)
print(round(3.14159, 2))     # 3.14
:::
- Vrstni red: ~**~, nato ~* / // %~, nato ~+ -~. Če nisi prepričan, uporabi oklepaje.
- ~n % 2 == 0~ pomeni "n je sod".

**Posodabljanje spremenljivke**
:::
zlato = 10
zlato = zlato + 5   # enako kot zlato += 5
zlato -= 3          # tudi *=  /=  //=
:::
**Tipi**: ~type(x)~ pove, kaj je ~x~. Pretvarjaš z ~int()~, ~float()~, ~str()~.
- ~"4" + "2"~ je ~"42"~ (besedilo se zlepi), ~4 + 2~ je ~6~.
- ~"ho" * 3~ je ~"hohoho"~.

**input()** vedno vrne **besedilo**. Pred računanjem ga pretvori:
:::
starost = int(input("Starost? "))
cena = float(input("Cena? "))
:::`,
    },
    lessons: [
      {
        id: "c2l1",
        title: { en: "Counting Coins", sl: "Štetje kovancev" },
        steps: [
          {
            id: "s1", type: "story", speaker: "pip",
            text: {
              en: `Squawk! Welcome to **Doubloon Docks**, where every barrel, coin and biscuit gets counted.

The quartermaster used to count with his fingers. Then he ran out of fingers. Lucky for him, the Interpreter is the fastest counter on the seven seas.

Today you'll learn to make it do the maths for you.`,
              sl: `Skvak! Dobrodošel v **Pristanu dublonov**, kjer preštejejo vsak sod, kovanec in prepečenec.

Intendant je včasih štel na prste. Potem mu je prstov zmanjkalo. Na srečo je Tolmač najhitrejši računar na sedmih morjih.

Danes se boš naučil, kako naj računa namesto tebe.`,
            },
          },
          {
            id: "s2", type: "learn",
            text: {
              en: `Python has two kinds of numbers:
- **int**: whole numbers like ~7~ or ~-120~
- **float**: numbers with a decimal point like ~2.5~

The basic operators are ~+~ ~-~ ~*~ (times) and ~/~ (divide). Dividing with ~/~ **always** gives a float, even when it divides evenly.

Python follows the maths you learned at school: ~*~ and ~/~ happen before ~+~ and ~-~. Parentheses go first of all.

~round(x, 2)~ rounds a number to 2 decimal places.`,
              sl: `Python pozna dve vrsti števil:
- **int**: cela števila, kot ~7~ ali ~-120~
- **float**: števila z decimalno piko, kot ~2.5~

Osnovni operatorji so ~+~ ~-~ ~*~ (krat) in ~/~ (deljeno). Deljenje z ~/~ **vedno** vrne float, tudi ko se deli brez ostanka.

Python upošteva matematiko iz šole: ~*~ in ~/~ se izvedeta pred ~+~ in ~-~. Oklepaji so na vrsti prvi.

~round(x, 2)~ zaokroži število na 2 decimalki.`,
            },
            example: `print(3 + 4)\nprint(10 - 2.5)\nprint(6 * 7)\nprint(7 / 2)\nprint(2 + 3 * 4)\nprint((2 + 3) * 4)\nprint(round(22 / 7, 2))\n`,
          },
          {
            id: "s3", type: "predict",
            text: { en: "What does this print?", sl: "Kaj se izpiše?" },
            code: `print(10 / 2)\n`,
            options: ["5", "5.0", "5.00", { en: "An error", sl: "Napaka" }],
            answer: 1,
            explain: {
              en: "~/~ always produces a float, so even ~10 / 2~ gives ~5.0~. If you need a whole number, there's another operator coming in the next lesson.",
              sl: "~/~ vedno vrne float, zato tudi ~10 / 2~ da ~5.0~. Če potrebuješ celo število, obstaja drug operator, ki ga spoznaš v naslednji lekciji.",
            },
          },
          {
            id: "s4", type: "predict",
            text: { en: "Order of operations. What does this print?", sl: "Vrstni red operacij. Kaj se izpiše?" },
            code: `print(2 + 3 * 4)\n`,
            options: ["20", "14", "24", "9"],
            answer: 1,
            explain: {
              en: "Multiplication happens first: ~3 * 4~ is ~12~, then ~2 + 12~ is ~14~. Write ~(2 + 3) * 4~ if you want 20.",
              sl: "Najprej se izvede množenje: ~3 * 4~ je ~12~, nato ~2 + 12~ je ~14~. Za 20 napiši ~(2 + 3) * 4~.",
            },
          },
          {
            id: "s5", type: "code", kind: "task",
            text: {
              en: `The crew hauled up **3 chests** with **125 coins** each, plus **47 loose coins** from the sand.

Store the numbers in variables ~chests~, ~per_chest~ and ~loose~, calculate the total into a variable called ~total~, and print:
:::
Total: 422
:::
Let Python do the maths. Don't type 422 yourself.`,
              sl: `Posadka je dvignila **3 skrinje** s po **125 kovanci** in še **47 kovancev** iz peska.

Števila shrani v spremenljivke ~chests~, ~per_chest~ in ~loose~, skupno vsoto izračunaj v spremenljivko ~total~ in izpiši:
:::
Total: 422
:::
Naj računa Python. Števila 422 ne tipkaj sam.`,
            },
            starter: `chests = 3\nper_chest = 125\nloose = 47\n\n# calculate total below\n`,
            tests: [
              { check: R`assert ns.get("total") == 422`, msg: { en: "The variable total should hold 422. Multiply the chests by the coins in each, then add the loose coins.", sl: "Spremenljivka total naj hrani 422. Pomnoži skrinje s kovanci v vsaki, nato prištej proste kovance." } },
              { check: R`assert "total: 422" in [norm(l) for l in lines]`, msg: { en: "Print the result as Total: 422", sl: "Rezultat izpiši kot Total: 422" } },
              { check: R`assert "422" not in code`, msg: { en: "Calculate the total with the variables instead of typing 422.", sl: "Vsoto izračunaj s spremenljivkami, namesto da natipkaš 422." } },
            ],
            hints: [
              { en: "Coins in chests is ~chests * per_chest~. Then add ~loose~.", sl: "Kovanci v skrinjah so ~chests * per_chest~. Nato prištej ~loose~." },
              { en: "~total = chests * per_chest + loose~, then ~print(\"Total:\", total)~.", sl: "~total = chests * per_chest + loose~, nato ~print(\"Total:\", total)~." },
            ],
            solution: `chests = 3\nper_chest = 125\nloose = 47\n\ntotal = chests * per_chest + loose\nprint("Total:", total)\n`,
          },
          {
            id: "s6", type: "code", kind: "debug",
            text: {
              en: "Three raids brought in 120, 85 and 97 coins. The navigator wants the **average**, which should be about 100.67. His program says 210.33. Fix it.",
              sl: "Trije napadi so prinesli 120, 85 in 97 kovancev. Krmar želi **povprečje**, ki bi moralo biti približno 100.67. Njegov program pravi 210.33. Popravi ga.",
            },
            starter: `average = 120 + 85 + 97 / 3\nprint("Average:", round(average, 2))\n`,
            tests: [
              { check: R`assert abs(ns.get("average", 0) - 302/3) < 1e-9`, msg: { en: "average should be (120 + 85 + 97) / 3, about 100.67.", sl: "average naj bo (120 + 85 + 97) / 3, približno 100.67." } },
              { check: R`assert "average: 100.67" in [norm(l) for l in lines]`, msg: { en: "It should print Average: 100.67", sl: "Izpisati mora Average: 100.67" } },
            ],
            hints: [
              { en: "Which operation does Python do first here? Only 97 is being divided.", sl: "Katero operacijo Python tu izvede najprej? Deli se samo 97." },
              { en: "Wrap the sum in parentheses so it's added before dividing.", sl: "Vsoto daj v oklepaje, da se sešteje pred deljenjem." },
            ],
            solution: `average = (120 + 85 + 97) / 3\nprint("Average:", round(average, 2))\n`,
          },
        ],
      },
      {
        id: "c2l2",
        title: { en: "Splitting the Loot", sl: "Delitev plena" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `Three more operators, and pirates use them constantly:

- ~//~ **floor division**: divides and throws away the leftover part. ~17 // 5~ is ~3~.
- ~%~ **modulo**: gives only the leftover (the remainder). ~17 % 5~ is ~2~.
- ~**~ **power**: ~2 ** 10~ is 2 multiplied by itself 10 times.

A common trick: a number is **even** when ~n % 2~ is ~0~.`,
              sl: `Še trije operatorji, ki jih pirati nenehno uporabljajo:

- ~//~ **celoštevilsko deljenje**: deli in zavrže ostanek. ~17 // 5~ je ~3~.
- ~%~ **modulo**: vrne samo ostanek. ~17 % 5~ je ~2~.
- ~**~ **potenca**: ~2 ** 10~ je 2, desetkrat pomnožen sam s sabo.

Pogost trik: število je **sodo**, ko je ~n % 2~ enako ~0~.`,
            },
            example: `coins = 17\npirates = 5\nprint("Each gets:", coins // pirates)\nprint("Left over:", coins % pirates)\nprint("2 to the power 10:", 2 ** 10)\nprint("Is 42 even?", 42 % 2 == 0)\n`,
          },
          {
            id: "s2", type: "predict",
            text: { en: "What does this print?", sl: "Kaj se izpiše?" },
            code: `print(17 // 5, 17 % 5)\n`,
            options: ["3 2", "3.4 2", "3 0.4", "2 3"],
            answer: 0,
            explain: {
              en: "5 fits into 17 three whole times (~17 // 5 = 3~) and 2 is left over (~17 % 5 = 2~). Check: 3 × 5 + 2 = 17.",
              sl: "5 gre v 17 trikrat (~17 // 5 = 3~) in ostane 2 (~17 % 5 = 2~). Preverba: 3 × 5 + 2 = 17.",
            },
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `**100 coins** must be shared equally between **7 pirates**. Whatever can't be shared goes to the captain.

Using ~coins~ and ~pirates~, calculate ~each~ and ~left~, then print:
:::
Each pirate gets 14
Left for the captain: 2
:::`,
              sl: `**100 kovancev** je treba enakomerno razdeliti med **7 piratov**. Kar se ne da razdeliti, dobi kapitan.

Z uporabo ~coins~ in ~pirates~ izračunaj ~each~ in ~left~, nato izpiši:
:::
Each pirate gets 14
Left for the captain: 2
:::`,
            },
            starter: `coins = 100\npirates = 7\n\n`,
            tests: [
              { check: R`assert ns.get("each") == 14 and ns.get("left") == 2`, msg: { en: "each should be 14 and left should be 2. Use // and %.", sl: "each naj bo 14, left pa 2. Uporabi // in %." } },
              { check: R`assert [norm(l) for l in clean] == ["each pirate gets 14", "left for the captain: 2"]`, msg: { en: "Print the two lines exactly as shown.", sl: "Izpiši obe vrstici natanko, kot je prikazano." } },
              { check: R`assert "//" in code and "%" in code`, msg: { en: "Calculate with // and % rather than typing the numbers.", sl: "Računaj z // in %, ne tipkaj števil." } },
            ],
            hints: [
              { en: "~coins // pirates~ is how many each gets. ~coins % pirates~ is what's left.", sl: "~coins // pirates~ je, koliko dobi vsak. ~coins % pirates~ je ostanek." },
              { en: "~each = coins // pirates~ and ~left = coins % pirates~.", sl: "~each = coins // pirates~ in ~left = coins % pirates~." },
            ],
            solution: `coins = 100\npirates = 7\n\neach = coins // pirates\nleft = coins % pirates\nprint("Each pirate gets", each)\nprint("Left for the captain:", left)\n`,
          },
          {
            id: "s4", type: "code", kind: "task",
            text: {
              en: `The voyage to the next island takes **250 minutes**. The crew want it in hours and minutes.

Using the variable ~minutes~, print:
:::
250 minutes is 4 hours and 10 minutes
:::`,
              sl: `Plovba do naslednjega otoka traja **250 minut**. Posadka želi to v urah in minutah.

Z uporabo spremenljivke ~minutes~ izpiši:
:::
250 minutes is 4 hours and 10 minutes
:::`,
            },
            starter: `minutes = 250\n`,
            tests: [
              { check: R`assert "250 minutes is 4 hours and 10 minutes" in [norm(l) for l in lines]`, msg: { en: "It should print 250 minutes is 4 hours and 10 minutes", sl: "Izpisati mora 250 minutes is 4 hours and 10 minutes" } },
              { check: R`assert "// 60" in code.replace("//60", "// 60") and "% 60" in code.replace("%60", "% 60")`, msg: { en: "Work out the hours with // 60 and the minutes with % 60.", sl: "Ure izračunaj z // 60, minute pa s % 60." } },
            ],
            hints: [
              { en: "An hour is 60 minutes. How many whole hours fit into 250? What's left over?", sl: "Ura ima 60 minut. Koliko celih ur gre v 250? Kaj ostane?" },
              { en: "~hours = minutes // 60~, ~rest = minutes % 60~, then print them with commas between the words.", sl: "~hours = minutes // 60~, ~rest = minutes % 60~, nato jih izpiši z vejicami med besedami." },
            ],
            solution: `minutes = 250\nhours = minutes // 60\nrest = minutes % 60\nprint(minutes, "minutes is", hours, "hours and", rest, "minutes")\n`,
          },
        ],
      },
      {
        id: "c2l3",
        title: { en: "Keeping the Ledger", sl: "Vodenje knjige" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `Variables change as the story goes on. To add 5 to ~gold~, write:
:::
gold = gold + 5
:::
That's not a maths equation. Python works out the right side first (old gold plus 5), then puts the answer back into the crate.

This is so common that Python has shortcuts: ~+=~ ~-=~ ~*=~ ~/=~ ~//=~`,
              sl: `Spremenljivke se med zgodbo spreminjajo. Da ~zlatu~ prišteješ 5, napišeš:
:::
gold = gold + 5
:::
To ni matematična enačba. Python najprej izračuna desno stran (staro zlato plus 5), nato rezultat spet shrani v zaboj.

To je tako pogosto, da ima Python bližnjice: ~+=~ ~-=~ ~*=~ ~/=~ ~//=~`,
            },
            example: `gold = 10\nprint("Start:", gold)\ngold = gold + 5\nprint("After a find:", gold)\ngold += 20      # shortcut for gold = gold + 20\nprint("After a raid:", gold)\ngold -= 8\nprint("After paying the cook:", gold)\ngold *= 2\nprint("After a lucky bet:", gold)\n`,
          },
          {
            id: "s2", type: "predict",
            text: { en: "Follow the gold. What gets printed?", sl: "Sledi zlatu. Kaj se izpiše?" },
            code: `gold = 10\ngold = gold * 2\ngold += 5\nprint(gold)\n`,
            options: ["15", "25", "30", "10"],
            answer: 1,
            explain: { en: "10 doubled is 20, plus 5 is 25. Each line uses the value left behind by the line above.", sl: "10 podvojeno je 20, plus 5 je 25. Vsaka vrstica uporabi vrednost, ki jo je pustila vrstica nad njo." },
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `The Serpent's hull starts at **100**. It takes **three cannonball hits** of 15 damage each, then the carpenter repairs **20**.

Use ~-=~ for each hit (three lines) and ~+=~ for the repair, then print:
:::
Hull: 75
:::`,
              sl: `Trup Kače ima na začetku **100**. Zadenejo ga **tri topovske krogle** s po 15 škode, nato tesar popravi **20**.

Za vsak zadetek uporabi ~-=~ (tri vrstice), za popravilo ~+=~, nato izpiši:
:::
Hull: 75
:::`,
            },
            starter: `ship_health = 100\n\n`,
            tests: [
              { check: R`assert ns.get("ship_health") == 75`, msg: { en: "ship_health should end at 75.", sl: "ship_health mora na koncu biti 75." } },
              { check: R`assert code.count("-=") >= 3 and "+=" in code`, msg: { en: "Use -= once for each of the three hits, and += for the repair.", sl: "Uporabi -= enkrat za vsakega od treh zadetkov in += za popravilo." } },
              { check: R`assert "hull: 75" in [norm(l) for l in lines]`, msg: { en: "Print Hull: 75 at the end.", sl: "Na koncu izpiši Hull: 75." } },
            ],
            hints: [
              { en: "A hit looks like ~ship_health -= 15~.", sl: "Zadetek je videti tako: ~ship_health -= 15~." },
              { en: "Three of those lines, then ~ship_health += 20~, then print with a label.", sl: "Tri take vrstice, nato ~ship_health += 20~, nato izpis z oznako." },
            ],
            solution: `ship_health = 100\n\nship_health -= 15\nship_health -= 15\nship_health -= 15\nship_health += 20\nprint("Hull:", ship_health)\n`,
          },
          {
            id: "s4", type: "code", kind: "debug",
            text: {
              en: "The scorekeeper adds 10 points, but the score stays at 0. Fix it so it prints ~Score: 10~",
              sl: "Zapisnikar prišteje 10 točk, a rezultat ostane 0. Popravi, da izpiše ~Score: 10~",
            },
            starter: `score = 0\nscore + 10\nprint("Score:", score)\n`,
            tests: [{ check: R`assert "score: 10" in [norm(l) for l in lines]`, msg: { en: "It should print Score: 10", sl: "Izpisati mora Score: 10" } }],
            hints: [
              { en: "Line 2 calculates 0 + 10, but where does the answer go?", sl: "Vrstica 2 izračuna 0 + 10, a kam gre rezultat?" },
              { en: "The result must be stored back: ~score += 10~ or ~score = score + 10~.", sl: "Rezultat moraš shraniti nazaj: ~score += 10~ ali ~score = score + 10~." },
            ],
            solution: `score = 0\nscore += 10\nprint("Score:", score)\n`,
            after: {
              en: "Python doesn't complain about a calculation nobody stores. It just forgets it. That makes this one of the sneakiest bugs.",
              sl: "Python se ne pritoži nad izračunom, ki ga nihče ne shrani. Preprosto ga pozabi. Zato je to eden najbolj zahrbtnih hroščev.",
            },
          },
        ],
      },
      {
        id: "c2l4",
        title: { en: "Words or Numbers?", sl: "Besede ali števila?" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `Every value has a **type**. So far you've met three:
- ~int~ like ~42~
- ~float~ like ~4.2~
- ~str~ (string, text) like ~"42"~

~type(x)~ tells you which one you have. Types matter because ~+~ means different things: it **adds** numbers but **joins** strings.

You can convert between them:
- ~int("42")~ gives the number ~42~
- ~float("2.5")~ gives ~2.5~
- ~str(42)~ gives the text ~"42"~`,
              sl: `Vsaka vrednost ima **tip**. Do zdaj si spoznal tri:
- ~int~, na primer ~42~
- ~float~, na primer ~4.2~
- ~str~ (niz, besedilo), na primer ~"42"~

~type(x)~ pove, katerega imaš. Tipi so pomembni, ker ~+~ pomeni različne stvari: števila **sešteje**, nize pa **zlepi**.

Med njimi lahko pretvarjaš:
- ~int("42")~ vrne število ~42~
- ~float("2.5")~ vrne ~2.5~
- ~str(42)~ vrne besedilo ~"42"~`,
            },
            example: `print(type(42), type(4.2), type("42"))\nprint(4 + 2)\nprint("4" + "2")\nprint(int("4") + 2)\nprint("Yo" + "-" + "ho")\nprint("ho" * 3)\nprint("Coins: " + str(30))\n`,
          },
          {
            id: "s2", type: "predict",
            text: { en: "What does this print?", sl: "Kaj se izpiše?" },
            code: `print("4" + "2")\nprint(int("4") + 2)\n`,
            options: ["6\n6", "42\n6", "42\n42", { en: "An error", sl: "Napaka" }],
            answer: 1,
            explain: { en: "Two strings are glued together into ~\"42\"~. After ~int()~ turns ~\"4\"~ into a number, ~+~ adds normally.", sl: "Dva niza se zlepita v ~\"42\"~. Ko ~int()~ spremeni ~\"4\"~ v število, ~+~ normalno sešteva." },
          },
          {
            id: "s3", type: "predict",
            text: { en: "Strings can be multiplied too. What prints?", sl: "Tudi nize lahko množiš. Kaj se izpiše?" },
            code: `print("ho" * 3)\n`,
            options: ["ho3", "hohoho", "ho ho ho", { en: "An error", sl: "Napaka" }],
            answer: 1,
            explain: { en: "A string times a whole number repeats the string that many times, with nothing in between.", sl: "Niz, pomnožen s celim številom, se toliko krat ponovi, brez ničesar vmes." },
          },
          {
            id: "s4", type: "code", kind: "debug",
            text: {
              en: "This crashes with a ~TypeError~. Fix it so it prints ~You have 50 coins~",
              sl: "To se sesuje s ~TypeError~. Popravi, da izpiše ~You have 50 coins~",
            },
            starter: `coins = 50\nprint("You have " + coins + " coins")\n`,
            tests: [{ check: R`assert "you have 50 coins" in [norm(l) for l in lines]`, msg: { en: "It should print You have 50 coins", sl: "Izpisati mora You have 50 coins" } }],
            hints: [
              { en: "~+~ can't join text and a number. One of them has to change type.", sl: "~+~ ne zna zlepiti besedila in števila. Eden od njiju mora spremeniti tip." },
              { en: "Wrap the number in ~str()~, or separate the parts with commas instead of ~+~.", sl: "Število ovij v ~str()~ ali dele loči z vejicami namesto s ~+~." },
            ],
            solution: `coins = 50\nprint("You have " + str(coins) + " coins")\n`,
          },
          {
            id: "s5", type: "code", kind: "task",
            text: {
              en: `The price on the market sign was copied as **text**: ~price = "12"~. The cook wants **3** sacks of flour.

Calculate the total as a **number** into ~total~ and print:
:::
Total: 36
:::`,
              sl: `Cena z napisa na tržnici je bila prepisana kot **besedilo**: ~price = "12"~. Kuhar želi **3** vreče moke.

Skupno ceno izračunaj kot **število** v ~total~ in izpiši:
:::
Total: 36
:::`,
            },
            starter: `price = "12"\nsacks = 3\n\n`,
            tests: [
              { check: R`assert ns.get("total") == 36`, msg: { en: "total should be the number 36. Right now the price is text: convert it first.", sl: "total naj bo število 36. Trenutno je cena besedilo: najprej jo pretvori." } },
              { check: R`assert "total: 36" in [norm(l) for l in lines]`, msg: { en: "Print Total: 36", sl: "Izpiši Total: 36" } },
            ],
            hints: [
              { en: "What happens with ~\"12\" * 3~? Try it. Then convert first.", sl: "Kaj se zgodi z ~\"12\" * 3~? Poskusi. Nato najprej pretvori." },
              { en: "~total = int(price) * sacks~", sl: "~total = int(price) * sacks~" },
            ],
            solution: `price = "12"\nsacks = 3\n\ntotal = int(price) * sacks\nprint("Total:", total)\n`,
            after: { en: "Without ~int()~, ~\"12\" * 3~ gives ~\"121212\"~. A very expensive mistake.", sl: "Brez ~int()~ da ~\"12\" * 3~ rezultat ~\"121212\"~. Zelo draga napaka." },
          },
        ],
      },
      {
        id: "c2l5",
        title: { en: "Asking the Crew", sl: "Vprašaj posadko" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `So far your programs always do the same thing. ~input()~ lets them **ask a question** and wait for an answer.
:::
name = input("What's your name? ")
:::
The text in the parentheses is the question. Whatever the person types is stored in the variable.

In this app, answers come from the **Input** box under the editor: one line per answer. It's already filled in below. Change the name and run it again.`,
              sl: `Do zdaj so tvoji programi vedno delali isto. ~input()~ jim omogoči, da **postavijo vprašanje** in počakajo na odgovor.
:::
name = input("Kako ti je ime? ")
:::
Besedilo v oklepajih je vprašanje. Karkoli oseba natipka, se shrani v spremenljivko.

V tej aplikaciji odgovori pridejo iz polja **Vnos** pod urejevalnikom: ena vrstica za en odgovor. Spodaj je že izpolnjeno. Spremeni ime in program zaženi znova.`,
            },
            example: `name = input("What's your name, sailor? ")\nprint("Welcome aboard,", name)\n`,
            stdin: "Ben",
          },
          {
            id: "s2", type: "learn",
            text: {
              en: `The catch: ~input()~ **always** gives you **text**, even when someone types a number. Typing ~20~ gives you ~"20"~.

So before doing maths, convert it:
:::
age = int(input("How old are you? "))
:::
Python runs the inside first: ~input()~ asks, then ~int()~ converts the answer.`,
              sl: `Past: ~input()~ **vedno** vrne **besedilo**, tudi ko nekdo natipka število. Če vpišeš ~20~, dobiš ~"20"~.

Zato ga pred računanjem pretvori:
:::
age = int(input("Koliko si star? "))
:::
Python najprej izvede notranji del: ~input()~ vpraša, nato ~int()~ pretvori odgovor.`,
            },
            example: `age = int(input("How old are you? "))\nprint("Next year you'll be", age + 1)\n\nheight = float(input("Your height in metres? "))\nprint("In centimetres:", height * 100)\n`,
            stdin: "20\n1.82",
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `Ask the question ~What's your ship called? ~ and then announce the ship. If the answer is ~Sea Wolf~, the program prints:
:::
The Sea Wolf sets sail!
:::
Test it with different names in the Input box. The checker will try a few.`,
              sl: `Postavi vprašanje ~What's your ship called? ~ in nato oznani ladjo. Če je odgovor ~Sea Wolf~, program izpiše:
:::
The Sea Wolf sets sail!
:::
Preizkusi z različnimi imeni v polju Vnos. Preverjevalnik jih bo poskusil več.`,
            },
            starter: `# ask for the ship's name, then announce it\n`,
            stdin: "Sea Wolf",
            tests: [
              { stdin: ["Sea Wolf"], check: R`assert "the sea wolf sets sail!" in norm(out)`, msg: { en: "With the answer Sea Wolf, it should print The Sea Wolf sets sail!", sl: "Pri odgovoru Sea Wolf mora izpisati The Sea Wolf sets sail!" } },
              { stdin: ["Kraken"], check: R`assert "the kraken sets sail!" in norm(out)`, msg: { en: "With the answer Kraken, it should print The Kraken sets sail! Use the answer, not a fixed name.", sl: "Pri odgovoru Kraken mora izpisati The Kraken sets sail! Uporabi odgovor, ne fiksnega imena." } },
            ],
            hints: [
              { en: "Store the answer: ~ship = input(\"What's your ship called? \")~", sl: "Shrani odgovor: ~ship = input(\"What's your ship called? \")~" },
              { en: "Then join the pieces: ~print(\"The\", ship, \"sets sail!\")~", sl: "Nato sestavi dele: ~print(\"The\", ship, \"sets sail!\")~" },
            ],
            solution: `ship = input("What's your ship called? ")\nprint("The", ship, "sets sail!")\n`,
          },
          {
            id: "s4", type: "code", kind: "task",
            text: {
              en: `Each barrel of water weighs **45 kg**. Ask ~How many barrels? ~, then print the total weight. For 3 barrels:
:::
Total weight: 135 kg
:::`,
              sl: `Vsak sod vode tehta **45 kg**. Vprašaj ~How many barrels? ~ in izpiši skupno težo. Za 3 sode:
:::
Total weight: 135 kg
:::`,
            },
            starter: `# barrels weigh 45 kg each\n`,
            stdin: "3",
            tests: [
              { stdin: ["3"], check: R`assert "total weight: 135 kg" in norm(out)`, msg: { en: "For 3 barrels it should print Total weight: 135 kg", sl: "Za 3 sode mora izpisati Total weight: 135 kg" } },
              { stdin: ["10"], check: R`assert "total weight: 450 kg" in norm(out)`, msg: { en: "For 10 barrels it should print Total weight: 450 kg", sl: "Za 10 sodov mora izpisati Total weight: 450 kg" } },
            ],
            hints: [
              { en: "The answer comes back as text. Convert it with ~int()~ before multiplying.", sl: "Odgovor pride kot besedilo. Pred množenjem ga pretvori z ~int()~." },
              { en: "~barrels = int(input(\"How many barrels? \"))~, then print ~barrels * 45~ between the words.", sl: "~barrels = int(input(\"How many barrels? \"))~, nato izpiši ~barrels * 45~ med besedami." },
            ],
            solution: `barrels = int(input("How many barrels? "))\nprint("Total weight:", barrels * 45, "kg")\n`,
          },
          {
            id: "s5", type: "code", kind: "debug",
            text: {
              en: "The treasurer adds a 100-coin bonus to whatever gold is found. With ~50~ in the Input box it should print ~Treasury: 150~",
              sl: "Blagajnik vsakemu najdenemu zlatu prišteje 100 kovancev bonusa. Z ~50~ v polju Vnos naj izpiše ~Treasury: 150~",
            },
            starter: `gold = input("Gold found: ")\ntotal = gold + 100\nprint("Treasury:", total)\n`,
            stdin: "50",
            tests: [
              { stdin: ["50"], check: R`assert "treasury: 150" in norm(out)`, msg: { en: "With 50 it should print Treasury: 150", sl: "Pri 50 mora izpisati Treasury: 150" } },
              { stdin: ["7"], check: R`assert "treasury: 107" in norm(out)`, msg: { en: "With 7 it should print Treasury: 107", sl: "Pri 7 mora izpisati Treasury: 107" } },
            ],
            hints: [
              { en: "What type does ~input()~ give back? Can you add 100 to it?", sl: "Kakšen tip vrne ~input()~? Ali mu lahko prišteješ 100?" },
              { en: "Wrap the input in ~int()~ on the first line.", sl: "V prvi vrstici ovij input v ~int()~." },
            ],
            solution: `gold = int(input("Gold found: "))\ntotal = gold + 100\nprint("Treasury:", total)\n`,
          },
        ],
      },
      {
        id: "c2l6",
        title: { en: "Solo Voyage: The Grog Calculator", sl: "Samostojna plovba: Kalkulator groga" },
        solo: true,
        steps: [
          {
            id: "s1", type: "story", speaker: "captain",
            text: {
              en: `The tavern keeper at the Rusty Anchor can't add up a bill to save his life. Every night the crew argues about who owes what.

I promised him a program. You're going to write it. He wants to type how many mugs and the price, and the program does the rest, including the tip. No more arguments.`,
              sl: `Krčmar v Rjastem sidru ne zna sešteti računa, pa če bi mu šlo za življenje. Vsak večer se posadka prepira, kdo dolguje koliko.

Obljubil sem mu program. Napisal ga boš ti. Rad bi vpisal število vrčkov in ceno, program pa naj naredi ostalo, tudi napitnino. Konec prepirov.`,
            },
          },
          {
            id: "s2", type: "code", kind: "project",
            text: {
              en: `Write the tavern's bill calculator.

**Requirements**
- Ask ~How many mugs? ~ (a whole number).
- Ask ~Price per mug? ~ (can have decimals, like ~2.5~).
- Work out the total, a **10% tip**, and the grand total. Round money to 2 decimals with ~round()~.
- Print, for 4 mugs at 2.5:
:::
Mugs: 4
Total: 10.0
Tip (10%): 1.0
Grand total: 11.0
:::
The checker tries other orders too, like 3 mugs at 1.2.`,
              sl: `Napiši kalkulator računov za krčmo.

**Zahteve**
- Vprašaj ~How many mugs? ~ (celo število).
- Vprašaj ~Price per mug? ~ (lahko z decimalkami, na primer ~2.5~).
- Izračunaj skupni znesek, **10 % napitnine** in končni znesek. Denar zaokroži na 2 decimalki z ~round()~.
- Za 4 vrčke po 2.5 izpiši:
:::
Mugs: 4
Total: 10.0
Tip (10%): 1.0
Grand total: 11.0
:::
Preverjevalnik preizkusi tudi druga naročila, na primer 3 vrčke po 1.2.`,
            },
            starter: `# Solo voyage: the Grog Calculator\n`,
            stdin: "4\n2.5",
            tests: [
              {
                stdin: ["4", "2.5"],
                check: R`def val(label):
    for l in clean:
        if norm(l).startswith(norm(label)):
            return float(l.split(":")[-1].strip())
    raise AssertionError(label)
assert val("Mugs:") == 4 and abs(val("Total:") - 10.0) < 1e-9 and abs(val("Tip (10%):") - 1.0) < 1e-9 and abs(val("Grand total:") - 11.0) < 1e-9`,
                msg: { en: "For 4 mugs at 2.5 the bill should show Mugs: 4, Total: 10.0, Tip (10%): 1.0 and Grand total: 11.0, each on its own line.", sl: "Za 4 vrčke po 2.5 naj račun pokaže Mugs: 4, Total: 10.0, Tip (10%): 1.0 in Grand total: 11.0, vsako v svoji vrstici." },
              },
              {
                stdin: ["3", "1.2"],
                check: R`vals = {}
for l in clean:
    for lab in ("mugs:", "total:", "tip (10%):", "grand total:"):
        if norm(l).startswith(lab):
            vals[lab] = l.split(":")[-1].strip()
assert vals.get("total:") == "3.6" and vals.get("tip (10%):") == "0.36" and vals.get("grand total:") == "3.96"`,
                msg: { en: "For 3 mugs at 1.2 it should show Total: 3.6, Tip (10%): 0.36 and Grand total: 3.96. Are you rounding with round(..., 2)?", sl: "Za 3 vrčke po 1.2 naj pokaže Total: 3.6, Tip (10%): 0.36 in Grand total: 3.96. Ali zaokrožuješ z round(..., 2)?" },
              },
            ],
            hints: [
              { en: "Plan it in four parts: ask twice (convert each answer to the right type), calculate three numbers, print four lines.", sl: "Načrtuj v štirih delih: dvakrat vprašaj (vsak odgovor pretvori v pravi tip), izračunaj tri števila, izpiši štiri vrstice." },
              { en: "10% of a number is that number times ~0.1~. Wrap each money result in ~round(..., 2)~.", sl: "10 % števila je to število krat ~0.1~. Vsak denarni rezultat ovij v ~round(..., 2)~." },
            ],
            solution: `mugs = int(input("How many mugs? "))\nprice = float(input("Price per mug? "))\n\ntotal = round(mugs * price, 2)\ntip = round(total * 0.1, 2)\ngrand = round(total + tip, 2)\n\nprint("Mugs:", mugs)\nprint("Total:", total)\nprint("Tip (10%):", tip)\nprint("Grand total:", grand)\n`,
            after: {
              en: "That's a real, useful program: it takes input, calculates, and reports. Most software is that pattern at a bigger scale.",
              sl: "To je pravi, uporaben program: sprejme vnos, računa in poroča. Večina programov je ta vzorec v večjem merilu.",
            },
          },
        ],
      },
    ],
  };
})();
