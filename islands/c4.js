/* Island 4 — Whirlpool Reef: while, for, range, accumulators, break/continue, nested loops */
(function () {
  const R = String.raw;
  (window.SS_ISLANDS = window.SS_ISLANDS || {}).c4 = {
    blurb: {
      en: "The reef spins ships round and round. Use that power: loops let your code repeat work thousands of times without writing it twice.",
      sl: "Greben vrti ladje v krogu. Izkoristi to moč: zanke kodi omogočijo, da delo ponovi tisočkrat, ne da bi ga napisal dvakrat.",
    },
    log: {
      en: `**while** repeats as long as the condition is True. Something inside must change, or it never stops.
:::
n = 10
while n > 0:
    print(n)
    n -= 1
:::
**for** with **range** repeats a set number of times:
:::
for i in range(5):        # 0 1 2 3 4
for i in range(1, 6):     # 1 2 3 4 5
for i in range(0, 20, 5): # 0 5 10 15
:::
**Accumulator**: start before the loop, update inside.
:::
total = 0
for i in range(1, 101):
    total += i
:::
**break** leaves the loop now. **continue** skips to the next round.
:::
while True:
    answer = input("Order? ")
    if answer == "done":
        break
:::
**Nested loops**: the inner loop runs completely for every round of the outer one.
- ~print(x, end=" ")~ stays on the same line.`,
      sl: `**while** ponavlja, dokler je pogoj True. Nekaj v zanki se mora spreminjati, sicer se nikoli ne ustavi.
:::
n = 10
while n > 0:
    print(n)
    n -= 1
:::
**for** z **range** ponovi določeno število krat:
:::
for i in range(5):        # 0 1 2 3 4
for i in range(1, 6):     # 1 2 3 4 5
for i in range(0, 20, 5): # 0 5 10 15
:::
**Akumulator**: začni pred zanko, posodabljaj v njej.
:::
vsota = 0
for i in range(1, 101):
    vsota += i
:::
**break** zanko takoj zapusti. **continue** skoči na naslednji krog.
:::
while True:
    odgovor = input("Naročilo? ")
    if odgovor == "konec":
        break
:::
**Gnezdene zanke**: notranja zanka se v celoti izvede za vsak krog zunanje.
- ~print(x, end=" ")~ ostane v isti vrstici.`,
    },
    lessons: [
      {
        id: "c4l1",
        title: { en: "While the Storm Rages", sl: "Dokler divja nevihta" },
        steps: [
          {
            id: "s1", type: "story", speaker: "pip",
            text: {
              en: `Squawk! Round and round and round... This is **Whirlpool Reef**. Ships get caught in the current and go in circles for days.

Going in circles is usually bad. But for a programmer it's a superpower. Need to print a thousand lines, check every crate, or ask until the answer is right? You don't write it a thousand times. You write a **loop**.`,
              sl: `Skvak! V krogu in v krogu in v krogu... To je **Greben vrtincev**. Ladje ujame tok in dneve krožijo.

Kroženje je običajno slabo. Za programerja pa je supermoč. Moraš izpisati tisoč vrstic, preveriti vsak zaboj ali spraševati, dokler odgovor ni pravi? Ne pišeš tega tisočkrat. Napišeš **zanko**.`,
            },
          },
          {
            id: "s2", type: "learn",
            text: {
              en: `A ~while~ loop looks like an ~if~, but it **keeps repeating** its block as long as the condition stays True:
:::
while condition:
    do something
:::
Python checks the condition, runs the block, then goes back up and checks again.

Something inside must eventually make the condition False. If nothing changes, the loop runs forever. That's called an **infinite loop**, and the Interpreter stops it after 5 seconds.`,
              sl: `Zanka ~while~ je videti kot ~if~, a svoj blok **ponavlja**, dokler pogoj ostaja True:
:::
while pogoj:
    naredi nekaj
:::
Python preveri pogoj, izvede blok, se vrne gor in spet preveri.

Nekaj v zanki mora sčasoma narediti pogoj False. Če se nič ne spremeni, zanka teče v nedogled. Temu pravimo **neskončna zanka** in Tolmač jo ustavi po 5 sekundah.`,
            },
            example: `fuel = 5\nwhile fuel > 0:\n    print("Sailing... fuel left:", fuel)\n    fuel -= 1\nprint("Out of fuel. Drifting.")\n`,
          },
          {
            id: "s3", type: "predict",
            text: { en: "What's printed at the end?", sl: "Kaj se izpiše na koncu?" },
            code: `n = 1\nwhile n < 20:\n    n = n * 2\nprint(n)\n`,
            options: ["16", "20", "32", "64"],
            answer: 2,
            explain: { en: "n goes 1, 2, 4, 8, 16, 32. At 16 the condition is still True, so it doubles once more to 32. Then 32 < 20 is False and the loop ends.", sl: "n gre 1, 2, 4, 8, 16, 32. Pri 16 je pogoj še True, zato se še enkrat podvoji na 32. Nato je 32 < 20 False in zanka se konča." },
          },
          {
            id: "s4", type: "code", kind: "task",
            text: {
              en: `Count down for the cannon salute. Using a ~while~ loop, print the numbers **10 down to 1**, one per line, then ~Fire!~`,
              sl: `Odštevaj za topovski pozdrav. Z zanko ~while~ izpiši števila **od 10 do 1**, vsako v svoji vrstici, nato ~Fire!~`,
            },
            starter: `count = 10\n`,
            tests: [
              { check: R`assert clean == [str(i) for i in range(10, 0, -1)] + ["Fire!"]`, msg: { en: "Expected the lines 10, 9, 8 ... 1 and then Fire!", sl: "Pričakovane vrstice so 10, 9, 8 ... 1 in nato Fire!" } },
              { check: R`assert "while" in code`, msg: { en: "Use a while loop rather than ten prints.", sl: "Uporabi zanko while namesto desetih printov." } },
            ],
            hints: [
              { en: "Loop while ~count > 0~. Inside: print it, then make it smaller.", sl: "Ponavljaj, dokler velja ~count > 0~. Znotraj: izpiši in zmanjšaj." },
              { en: "~count -= 1~ inside the loop. ~Fire!~ goes after the loop, unindented.", sl: "~count -= 1~ znotraj zanke. ~Fire!~ gre za zanko, brez zamika." },
            ],
            solution: `count = 10\nwhile count > 0:\n    print(count)\n    count -= 1\nprint("Fire!")\n`,
          },
          {
            id: "s5", type: "code", kind: "debug",
            text: {
              en: "This game never ends. It should show 3, 2 and 1 lives left, then ~Game over~.",
              sl: "Ta igra se nikoli ne konča. Pokazati mora 3, 2 in 1 življenje, nato ~Game over~.",
            },
            starter: `lives = 3\nwhile lives > 0:\n    print("Lives left:", lives)\nprint("Game over")\n`,
            tests: [{ check: R`assert [norm(l) for l in clean] == ["lives left: 3", "lives left: 2", "lives left: 1", "game over"]`, msg: { en: "Expected Lives left: 3, Lives left: 2, Lives left: 1, then Game over.", sl: "Pričakovano: Lives left: 3, Lives left: 2, Lives left: 1, nato Game over." } }],
            hints: [
              { en: "What changes inside the loop? Nothing, so the condition is always True.", sl: "Kaj se v zanki spreminja? Nič, zato je pogoj vedno True." },
              { en: "Add ~lives -= 1~ inside the loop, after the print.", sl: "V zanko, za izpis, dodaj ~lives -= 1~." },
            ],
            solution: `lives = 3\nwhile lives > 0:\n    print("Lives left:", lives)\n    lives -= 1\nprint("Game over")\n`,
          },
        ],
      },
      {
        id: "c4l2",
        title: { en: "For and Range", sl: "For in range" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `When you know how many times to repeat, ~for~ is simpler than ~while~:
:::
for i in range(5):
    print(i)
:::
The variable ~i~ takes each value in turn. ~range~ has three forms:
- ~range(5)~ → 0, 1, 2, 3, 4 (starts at 0, **stops before** 5)
- ~range(1, 6)~ → 1, 2, 3, 4, 5
- ~range(0, 20, 5)~ → 0, 5, 10, 15 (the third number is the step)

A negative step counts down: ~range(10, 0, -1)~.`,
              sl: `Ko veš, kolikokrat ponoviti, je ~for~ preprostejši od ~while~:
:::
for i in range(5):
    print(i)
:::
Spremenljivka ~i~ zaporedoma prevzame vsako vrednost. ~range~ ima tri oblike:
- ~range(5)~ → 0, 1, 2, 3, 4 (začne pri 0, **ustavi se pred** 5)
- ~range(1, 6)~ → 1, 2, 3, 4, 5
- ~range(0, 20, 5)~ → 0, 5, 10, 15 (tretje število je korak)

Negativen korak šteje navzdol: ~range(10, 0, -1)~.`,
            },
            example: `for i in range(5):\n    print("Lap", i)\n\nfor day in range(1, 4):\n    print("Day", day, "at sea")\n\nfor n in range(10, 0, -3):\n    print(n)\n`,
          },
          {
            id: "s2", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `for i in range(2, 8, 2):\n    print(i)\n`,
            options: ["2\n4\n6\n8", "2\n4\n6", "2\n8", "0\n2\n4\n6"],
            answer: 1,
            explain: { en: "Start at 2, go up in steps of 2, and stop **before** 8. So 8 itself is never reached.", sl: "Začni pri 2, pojdi gor v korakih po 2 in se ustavi **pred** 8. Samega 8 nikoli ne dosežeš." },
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `The gunnery school needs the **7 times table**. Use a ~for~ loop to print:
:::
7 x 1 = 7
7 x 2 = 14
...
7 x 10 = 70
:::`,
              sl: `Topniška šola potrebuje **poštevanko s 7**. Z zanko ~for~ izpiši:
:::
7 x 1 = 7
7 x 2 = 14
...
7 x 10 = 70
:::`,
            },
            starter: ``,
            tests: [
              { check: R`assert [norm(l) for l in clean] == [f"7 x {i} = {7*i}" for i in range(1, 11)]`, msg: { en: "Expected ten lines from 7 x 1 = 7 to 7 x 10 = 70.", sl: "Pričakovanih je deset vrstic od 7 x 1 = 7 do 7 x 10 = 70." } },
              { check: R`assert "for" in code`, msg: { en: "Use a for loop.", sl: "Uporabi zanko for." } },
            ],
            hints: [
              { en: "Loop ~i~ over ~range(1, 11)~ so you get 1 to 10.", sl: "~i~ naj teče po ~range(1, 11)~, da dobiš 1 do 10." },
              { en: "~print(7, \"x\", i, \"=\", 7 * i)~", sl: "~print(7, \"x\", i, \"=\", 7 * i)~" },
            ],
            solution: `for i in range(1, 11):\n    print(7, "x", i, "=", 7 * i)\n`,
          },
          {
            id: "s4", type: "code", kind: "task",
            text: {
              en: `Lanterns hang on every **odd-numbered** post from 1 to 19. Print the post numbers, one per line: 1, 3, 5 ... 19. Use ~range~ with a step, not an ~if~.`,
              sl: `Svetilke visijo na vsakem **lihem** stebru od 1 do 19. Izpiši številke stebrov, vsako v svoji vrstici: 1, 3, 5 ... 19. Uporabi ~range~ s korakom, ne ~if~.`,
            },
            starter: ``,
            tests: [
              { check: R`assert clean == [str(i) for i in range(1, 20, 2)]`, msg: { en: "Expected 1, 3, 5 ... 19, one per line.", sl: "Pričakovano: 1, 3, 5 ... 19, vsako v svoji vrstici." } },
              { check: R`assert "range(" in code and "if" not in code`, msg: { en: "Use the step argument of range instead of an if.", sl: "Namesto if uporabi korak v range." } },
            ],
            hints: [
              { en: "Start at 1 and step by 2. Where should it stop so 19 is included?", sl: "Začni pri 1 in skači po 2. Kje se mora ustaviti, da bo 19 vključen?" },
              { en: "~range(1, 20, 2)~", sl: "~range(1, 20, 2)~" },
            ],
            solution: `for post in range(1, 20, 2):\n    print(post)\n`,
          },
          {
            id: "s5", type: "predict",
            text: { en: "Indentation decides what repeats. What prints?", sl: "Zamik določa, kaj se ponavlja. Kaj se izpiše?" },
            code: `for i in range(3):\n    print("Yo")\nprint("ho")\n`,
            options: ["Yo\nho\nYo\nho\nYo\nho", "Yo\nYo\nYo\nho", "Yo\nho", "Yo\nYo\nYo"],
            answer: 1,
            explain: { en: "Only the indented line is inside the loop, so it repeats 3 times. ~print(\"ho\")~ runs once, after the loop finishes.", sl: "V zanki je le zamaknjena vrstica, zato se ponovi trikrat. ~print(\"ho\")~ se izvede enkrat, ko se zanka konča." },
          },
        ],
      },
      {
        id: "c4l3",
        title: { en: "Counting the Haul", sl: "Štetje plena" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `A loop becomes really useful when it **collects** something as it goes. This is called an **accumulator**:
1. Create the variable **before** the loop, starting at 0.
2. Update it **inside** the loop.
3. Use it **after** the loop.

A **counter** works the same way, but adds 1 each time something matches.`,
              sl: `Zanka postane zares uporabna, ko med tekom nekaj **zbira**. Temu pravimo **akumulator**:
1. Spremenljivko ustvari **pred** zanko, z začetno vrednostjo 0.
2. Posodabljaj jo **znotraj** zanke.
3. Uporabi jo **po** zanki.

**Števec** deluje enako, le da prišteje 1 vsakič, ko se nekaj ujema.`,
            },
            example: `total = 0\nfor coins in range(1, 11):\n    total += coins\nprint("Sum of 1 to 10:", total)\n\neven_count = 0\nfor n in range(1, 21):\n    if n % 2 == 0:\n        even_count += 1\nprint("Even numbers up to 20:", even_count)\n`,
          },
          {
            id: "s2", type: "code", kind: "task",
            text: {
              en: `Legend says a young sailor once summed every number from 1 to 100 in seconds. Let the Interpreter do it. Store the result in ~total~ and print:
:::
Sum: 5050
:::`,
              sl: `Legenda pravi, da je mlad mornar nekoč v nekaj sekundah seštel vsa števila od 1 do 100. Naj to naredi Tolmač. Rezultat shrani v ~total~ in izpiši:
:::
Sum: 5050
:::`,
            },
            starter: `total = 0\n`,
            tests: [
              { check: R`assert ns.get("total") == 5050`, msg: { en: "total should be 5050.", sl: "total naj bo 5050." } },
              { check: R`assert "for" in code and "5050" not in code`, msg: { en: "Add the numbers with a for loop instead of typing the answer.", sl: "Števila seštej z zanko for, namesto da natipkaš odgovor." } },
              { check: R`assert "sum: 5050" in [norm(l) for l in lines]`, msg: { en: "Print Sum: 5050 once, after the loop.", sl: "Sum: 5050 izpiši enkrat, po zanki." } },
            ],
            hints: [
              { en: "~range(1, 101)~ gives 1 to 100. Add each one to ~total~.", sl: "~range(1, 101)~ da 1 do 100. Vsakega prištej k ~total~." },
              { en: "Put the print **after** the loop, not inside, or you'll get 100 lines.", sl: "Izpis postavi **za** zanko, ne vanjo, sicer dobiš 100 vrstic." },
            ],
            solution: `total = 0\nfor i in range(1, 101):\n    total += i\nprint("Sum:", total)\n`,
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `Ask ~How many chests? ~, then ask ~Coins in chest? ~ once for each chest. Print the total and the average (rounded to 2 decimals). For 3 chests with 10, 20 and 30:
:::
Total: 60
Average: 20.0
:::`,
              sl: `Vprašaj ~How many chests? ~, nato za vsako skrinjo enkrat vprašaj ~Coins in chest? ~. Izpiši skupno vsoto in povprečje (zaokroženo na 2 decimalki). Za 3 skrinje z 10, 20 in 30:
:::
Total: 60
Average: 20.0
:::`,
            },
            starter: ``,
            stdin: "3\n10\n20\n30",
            tests: [
              { stdin: ["3", "10", "20", "30"], check: R`assert "total: 60" in [norm(l) for l in clean] and "average: 20.0" in [norm(l) for l in clean]`, msg: { en: "For 10, 20 and 30: Total: 60 and Average: 20.0", sl: "Za 10, 20 in 30: Total: 60 in Average: 20.0" } },
              { stdin: ["2", "5", "6"], check: R`assert "total: 11" in [norm(l) for l in clean] and "average: 5.5" in [norm(l) for l in clean]`, msg: { en: "For 2 chests with 5 and 6: Total: 11 and Average: 5.5", sl: "Za 2 skrinji s 5 in 6: Total: 11 in Average: 5.5" } },
              { stdin: ["3", "1", "1", "2"], check: R`assert "average: 1.33" in [norm(l) for l in clean]`, msg: { en: "For 1, 1 and 2 the average should be 1.33. Round with round(..., 2).", sl: "Za 1, 1 in 2 naj bo povprečje 1.33. Zaokroži z round(..., 2)." } },
            ],
            hints: [
              { en: "Loop ~for i in range(chests):~ and ask inside the loop, adding each answer to a total.", sl: "Zanka ~for i in range(chests):~ in vprašanje znotraj nje, vsak odgovor prištej k vsoti." },
              { en: "After the loop: average is ~total / chests~, wrapped in ~round(..., 2)~.", sl: "Po zanki: povprečje je ~total / chests~, ovito v ~round(..., 2)~." },
            ],
            solution: `chests = int(input("How many chests? "))\ntotal = 0\nfor i in range(chests):\n    total += int(input("Coins in chest? "))\nprint("Total:", total)\nprint("Average:", round(total / chests, 2))\n`,
          },
          {
            id: "s4", type: "predict",
            text: { en: "A counter inside a loop. What prints?", sl: "Števec v zanki. Kaj se izpiše?" },
            code: `count = 0\nfor i in range(1, 11):\n    if i % 3 == 0:\n        count += 1\nprint(count)\n`,
            options: ["3", "10", "4", "1"],
            answer: 0,
            explain: { en: "From 1 to 10, the multiples of 3 are 3, 6 and 9. The counter goes up once for each.", sl: "Od 1 do 10 so večkratniki števila 3 le 3, 6 in 9. Števec se za vsakega poveča enkrat." },
          },
        ],
      },
      {
        id: "c4l4",
        title: { en: "Break and Continue", sl: "Break in continue" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `Two words give you more control inside a loop:
- ~break~ jumps **out** of the loop immediately.
- ~continue~ skips the rest of this round and goes to the **next** one.

A very common pattern is ~while True:~ with a ~break~ inside: "keep going until something tells you to stop". It's perfect for menus and asking questions until the user says they're done.`,
              sl: `Dve besedi ti dasta več nadzora v zanki:
- ~break~ takoj skoči **iz** zanke.
- ~continue~ preskoči preostanek tega kroga in gre na **naslednjega**.

Zelo pogost vzorec je ~while True:~ z ~break~ v notranjosti: "nadaljuj, dokler ti nekaj ne reče, naj nehaš". Popoln je za menije in spraševanje, dokler uporabnik ne konča.`,
            },
            example: `for n in range(1, 10):\n    if n == 3:\n        continue      # skip 3\n    if n == 7:\n        break         # stop completely\n    print(n)\n\nwhile True:\n    word = input("Say something (or 'quit'): ")\n    if word == "quit":\n        break\n    print("Pip repeats:", word)\n`,
            stdin: "ahoy\nyo ho\nquit",
          },
          {
            id: "s2", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `for i in range(10):\n    if i == 4:\n        break\n    print(i)\n`,
            options: ["0\n1\n2\n3", "0\n1\n2\n3\n4", "4", "0\n1\n2\n3\n5\n6\n7\n8\n9"],
            answer: 0,
            explain: { en: "When ~i~ reaches 4, ~break~ ends the loop before the print. So 4 and everything after it never print.", sl: "Ko ~i~ doseže 4, ~break~ konča zanko pred izpisom. Zato se 4 in vse za njim nikoli ne izpiše." },
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `The cook takes orders until someone says ~done~. Keep asking ~Order? ~, and when the answer is ~done~, stop and print how many real orders were taken:
:::
Orders taken: 2
:::
Use ~while True~ and ~break~.`,
              sl: `Kuhar sprejema naročila, dokler nekdo ne reče ~done~. Sprašuj ~Order? ~ in ko je odgovor ~done~, nehaj in izpiši, koliko pravih naročil je bilo sprejetih:
:::
Orders taken: 2
:::
Uporabi ~while True~ in ~break~.`,
            },
            starter: `orders = 0\n`,
            stdin: "fish stew\ngrog\ndone",
            tests: [
              { stdin: ["fish stew", "grog", "done"], check: R`assert "orders taken: 2" in [norm(l) for l in clean]`, msg: { en: "Two orders then done should print Orders taken: 2", sl: "Dve naročili in nato done naj izpiše Orders taken: 2" } },
              { stdin: ["done"], check: R`assert "orders taken: 0" in [norm(l) for l in clean]`, msg: { en: "Saying done straight away should give Orders taken: 0. Don't count the word done itself.", sl: "Takojšnji done naj da Orders taken: 0. Same besede done ne štej." } },
              { stdin: ["a", "b", "c", "d", "e", "done"], check: R`assert "orders taken: 5" in [norm(l) for l in clean]`, msg: { en: "Five orders should give Orders taken: 5.", sl: "Pet naročil naj da Orders taken: 5." } },
              { check: R`assert "while True" in code and "break" in code`, stdin: ["done"], msg: { en: "Use while True with a break.", sl: "Uporabi while True z break." } },
            ],
            hints: [
              { en: "Inside the loop: ask, then check for ~done~ **before** counting.", sl: "V zanki: vprašaj, nato preveri ~done~ **pred** štetjem." },
              { en: "~if order == \"done\": break~, then ~orders += 1~. Print after the loop.", sl: "~if order == \"done\": break~, nato ~orders += 1~. Izpiši po zanki." },
            ],
            solution: `orders = 0\nwhile True:\n    order = input("Order? ")\n    if order == "done":\n        break\n    orders += 1\nprint("Orders taken:", orders)\n`,
          },
          {
            id: "s4", type: "code", kind: "task",
            text: {
              en: `Sailors think 13 is unlucky. Print the cabin numbers from **1 to 15**, one per line, but **skip 13** using ~continue~.`,
              sl: `Mornarji mislijo, da je 13 nesrečna številka. Izpiši številke kabin **od 1 do 15**, vsako v svoji vrstici, a **preskoči 13** z ~continue~.`,
            },
            starter: ``,
            tests: [
              { check: R`assert clean == [str(i) for i in range(1, 16) if i != 13]`, msg: { en: "Expected 1 to 15 without 13.", sl: "Pričakovano: 1 do 15 brez 13." } },
              { check: R`assert "continue" in code`, msg: { en: "Use continue to skip 13.", sl: "Za preskok 13 uporabi continue." } },
            ],
            hints: [
              { en: "Loop over ~range(1, 16)~. Before printing, check for 13.", sl: "Teci po ~range(1, 16)~. Pred izpisom preveri 13." },
              { en: "~if cabin == 13: continue~ then ~print(cabin)~.", sl: "~if cabin == 13: continue~ nato ~print(cabin)~." },
            ],
            solution: `for cabin in range(1, 16):\n    if cabin == 13:\n        continue\n    print(cabin)\n`,
          },
        ],
      },
      {
        id: "c4l5",
        title: { en: "Loops Inside Loops", sl: "Zanke v zankah" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `A loop can live inside another loop. For **every** round of the outer loop, the inner loop runs **all** of its rounds. Think of a clock: the minute hand goes all the way round for every step of the hour hand.

Normally ~print~ ends with a new line. ~print(x, end=" ")~ ends with a space instead, so you can build a row bit by bit. An empty ~print()~ then finishes the row.

And remember ~"*" * 3~ is ~"***"~. Handy for drawing.`,
              sl: `Zanka lahko živi v drugi zanki. Za **vsak** krog zunanje zanke notranja izvede **vse** svoje kroge. Pomisli na uro: minutni kazalec naredi cel krog za vsak korak urnega.

~print~ se običajno konča z novo vrstico. ~print(x, end=" ")~ se konča s presledkom, zato lahko vrstico gradiš po delih. Prazen ~print()~ nato vrstico zaključi.

In ne pozabi: ~"*" * 3~ je ~"***"~. Priročno za risanje.`,
            },
            example: `for row in range(1, 4):\n    for col in range(1, 4):\n        print(row * col, end=" ")\n    print()   # end the row\n\nfor size in range(1, 5):\n    print("~" * size)\n`,
          },
          {
            id: "s2", type: "predict",
            text: { en: "How many lines does this print, and in what order?", sl: "Koliko vrstic se izpiše in v kakšnem vrstnem redu?" },
            code: `for a in range(2):\n    for b in range(3):\n        print(a, b)\n`,
            options: ["0 0\n1 1", "0 0\n0 1\n0 2\n1 0\n1 1\n1 2", "0 0\n1 0\n0 1\n1 1\n0 2\n1 2", "0 0\n0 1\n1 0\n1 1"],
            answer: 1,
            explain: { en: "For a = 0 the inner loop runs b = 0, 1, 2. Then for a = 1 it runs all three again. 2 × 3 = 6 lines.", sl: "Pri a = 0 notranja zanka teče b = 0, 1, 2. Nato pri a = 1 spet vse tri. 2 × 3 = 6 vrstic." },
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `Build a staircase of stars for the rigging diagram. Ask ~Height? ~ and print that many rows. For height 4:
:::
*
**
***
****
:::`,
              sl: `Zgradi stopnice iz zvezdic za načrt vrvja. Vprašaj ~Height? ~ in izpiši toliko vrstic. Za višino 4:
:::
*
**
***
****
:::`,
            },
            starter: ``,
            stdin: "4",
            tests: [
              { stdin: ["4"], check: R`assert [l for l in clean if set(l) == {"*"}] == ["*" * i for i in range(1, 5)]`, msg: { en: "Height 4 should give rows of 1, 2, 3 and 4 stars.", sl: "Višina 4 naj da vrstice z 1, 2, 3 in 4 zvezdicami." } },
              { stdin: ["6"], check: R`assert [l for l in clean if set(l) == {"*"}] == ["*" * i for i in range(1, 7)]`, msg: { en: "Height 6 should give 6 rows, from 1 star up to 6.", sl: "Višina 6 naj da 6 vrstic, od 1 do 6 zvezdic." } },
            ],
            hints: [
              { en: "Row number ~i~ has ~i~ stars. Which range gives 1 up to the height?", sl: "Vrstica ~i~ ima ~i~ zvezdic. Kateri range da 1 do višine?" },
              { en: "~for i in range(1, height + 1): print(\"*\" * i)~", sl: "~for i in range(1, height + 1): print(\"*\" * i)~" },
            ],
            solution: `height = int(input("Height? "))\nfor i in range(1, height + 1):\n    print("*" * i)\n`,
          },
          {
            id: "s4", type: "code", kind: "task",
            text: {
              en: `The navigator wants a multiplication grid from 1 to 4. Use **two nested loops** and ~end=" "~ to print:
:::
1 2 3 4
2 4 6 8
3 6 9 12
4 8 12 16
:::`,
              sl: `Krmar želi tabelo množenja od 1 do 4. Uporabi **dve gnezdeni zanki** in ~end=" "~ za izpis:
:::
1 2 3 4
2 4 6 8
3 6 9 12
4 8 12 16
:::`,
            },
            starter: ``,
            tests: [
              { check: R`assert [" ".join(l.split()) for l in clean] == [" ".join(str(r * c) for c in range(1, 5)) for r in range(1, 5)]`, msg: { en: "Expected four rows: 1 2 3 4 / 2 4 6 8 / 3 6 9 12 / 4 8 12 16", sl: "Pričakovane so štiri vrstice: 1 2 3 4 / 2 4 6 8 / 3 6 9 12 / 4 8 12 16" } },
              { check: R`assert code.count("for") >= 2`, msg: { en: "Use two nested for loops.", sl: "Uporabi dve gnezdeni zanki for." } },
            ],
            hints: [
              { en: "Outer loop for rows 1 to 4, inner loop for columns 1 to 4. Print ~row * col~ with ~end=\" \"~.", sl: "Zunanja zanka za vrstice 1 do 4, notranja za stolpce 1 do 4. Izpiši ~row * col~ z ~end=\" \"~." },
              { en: "After the inner loop finishes, call ~print()~ (inside the outer loop) to start a new row.", sl: "Ko se notranja zanka konča, pokliči ~print()~ (znotraj zunanje zanke), da začneš novo vrstico." },
            ],
            solution: `for row in range(1, 5):\n    for col in range(1, 5):\n        print(row * col, end=" ")\n    print()\n`,
          },
        ],
      },
      {
        id: "c4l6",
        title: { en: "Solo Voyage: The Guessing Game", sl: "Samostojna plovba: Ugibanka" },
        solo: true,
        steps: [
          {
            id: "s1", type: "story", speaker: "pip",
            text: {
              en: `Squawk! The crew is bored on the long crossing. Pip has an idea: a game!

The Interpreter thinks of a number, the crew guesses, and it tells them "too high" or "too low" until they find it. Seven guesses, or the treasure sinks to the bottom of the sea. You build it. I'll just watch. Squawk.`,
              sl: `Skvak! Posadka se na dolgi plovbi dolgočasi. Pip ima idejo: igro!

Tolmač si izmisli število, posadka ugiba, on pa pove "previsoko" ali "prenizko", dokler ga ne najdejo. Sedem poskusov, sicer zaklad potone na dno morja. Ti jo zgradiš. Jaz bom samo gledal. Skvak.`,
            },
          },
          {
            id: "s2", type: "code", kind: "project",
            text: {
              en: `Build the guessing game. The secret number is ~42~ (next island you'll learn to make it random).

**Requirements**
- Keep asking ~Guess: ~ (a whole number).
- Too small: print ~Too low!~. Too big: print ~Too high!~
- When it's right: print ~You found the treasure in 3 guesses!~ (with the real count) and stop.
- After **7 wrong guesses**, print ~Out of guesses! The number was 42~ and stop. Don't ask an eighth time.`,
              sl: `Zgradi ugibanko. Skrivno število je ~42~ (na naslednjem otoku se naučiš narediti naključno).

**Zahteve**
- Sprašuj ~Guess: ~ (celo število).
- Premajhno: izpiši ~Too low!~. Preveliko: izpiši ~Too high!~
- Ko je pravilno: izpiši ~You found the treasure in 3 guesses!~ (s pravim številom) in nehaj.
- Po **7 napačnih poskusih** izpiši ~Out of guesses! The number was 42~ in nehaj. Osmič ne sprašuj.`,
            },
            starter: `secret = 42\n`,
            stdin: "50\n25\n42",
            tests: [
              { stdin: ["50", "25", "42"], check: R`o = norm(out)
assert "too high!" in o and "too low!" in o and "you found the treasure in 3 guesses!" in o`, msg: { en: "Guesses 50, 25, 42 should give Too high!, Too low!, then You found the treasure in 3 guesses!", sl: "Poskusi 50, 25, 42 naj dajo Too high!, Too low!, nato You found the treasure in 3 guesses!" } },
              { stdin: ["42"], check: R`assert "you found the treasure in 1 guesses!" in norm(out) or "you found the treasure in 1 guess!" in norm(out)`, msg: { en: "Guessing 42 straight away should say it took 1 guess.", sl: "Takojšnji 42 naj pove, da je bil potreben 1 poskus." } },
              { stdin: ["1", "2", "3", "4", "5", "6", "7"], check: R`o = norm(out)
assert "out of guesses! the number was 42" in o and o.count("too low!") == 7`, msg: { en: "Seven wrong guesses should print Too low! seven times and then Out of guesses! The number was 42, without asking an eighth time.", sl: "Sedem napačnih poskusov naj sedemkrat izpiše Too low! in nato Out of guesses! The number was 42, brez osmega vprašanja." } },
              { stdin: ["10", "20", "30", "40", "41", "43", "42"], check: R`assert "you found the treasure in 7 guesses!" in norm(out) and "out of guesses" not in norm(out)`, msg: { en: "Getting it right on the 7th guess should still count as a win.", sl: "Pravilen odgovor v 7. poskusu mora še vedno šteti kot zmaga." } },
            ],
            hints: [
              { en: "Keep a ~guesses~ counter. A ~while~ loop that runs while ~guesses < 7~ handles the limit.", sl: "Vodi števec ~guesses~. Zanka ~while~, ki teče, dokler velja ~guesses < 7~, poskrbi za omejitev." },
              { en: "Inside: ask, add 1 to the counter, then ~if~/~elif~/~else~. On a correct guess, print the win and ~break~. After the loop you need to know if they won: a variable like ~won = False~ helps.", sl: "Znotraj: vprašaj, prištej 1 števcu, nato ~if~/~elif~/~else~. Pri pravem odgovoru izpiši zmago in ~break~. Po zanki moraš vedeti, ali so zmagali: pomaga spremenljivka, kot je ~won = False~." },
            ],
            solution: `secret = 42\nguesses = 0\nwon = False\n\nwhile guesses < 7:\n    guess = int(input("Guess: "))\n    guesses += 1\n    if guess < secret:\n        print("Too low!")\n    elif guess > secret:\n        print("Too high!")\n    else:\n        print("You found the treasure in", guesses, "guesses!")\n        won = True\n        break\n\nif not won:\n    print("Out of guesses! The number was", secret)\n`,
            after: {
              en: "You just wrote a real game loop: input, update state, check win or lose, repeat. Every video game runs on that idea.",
              sl: "Pravkar si napisal pravo igralno zanko: vnos, posodobi stanje, preveri zmago ali poraz, ponovi. Vsaka videoigra teče na tej ideji.",
            },
          },
        ],
      },
    ],
  };
})();
