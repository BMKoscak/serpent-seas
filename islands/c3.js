/* Island 3 — Fork-Tongue Strait: booleans, comparisons, if / elif / else, and / or / not */
(function () {
  const R = String.raw;
  (window.SS_ISLANDS = window.SS_ISLANDS || {}).c3 = {
    blurb: {
      en: "Two channels split around the rocks. Pick wrong and the ship sinks. Teach your programs to make decisions with True, False, if, elif and else.",
      sl: "Dva kanala se razcepita okoli čeri. Izbereš narobe in ladja potone. Nauči programe odločanja s True, False, if, elif in else.",
    },
    log: {
      en: `**Booleans** are ~True~ or ~False~. Comparisons produce them:
:::
5 == 5      # True   (equal?  two = signs!)
5 != 3      # True   (not equal?)
3 < 5, 5 <= 5, 7 > 2, 7 >= 8
1 < x < 10  # chained: x between 1 and 10
"a" in "pirate"   # True
:::
~=~ **stores** a value. ~==~ **asks** if two values are equal.

**if / elif / else**: the first true branch runs, then Python skips the rest.
:::
if wind >= 30:
    print("Storm!")
elif wind >= 10:
    print("Good sailing")
else:
    print("Calm seas")
:::
- Every ~if~, ~elif~, ~else~ line ends with a **colon**.
- The block inside is **indented 4 spaces**.
- Put the strictest test first: an earlier match blocks the later ones.

**Combining**: ~and~ (both true), ~or~ (at least one), ~not~ (flips it).
:::
if age >= 16 and ticket == "yes":
    print("Welcome aboard!")
:::`,
      sl: `**Logične vrednosti** so ~True~ ali ~False~. Dobimo jih s primerjavami:
:::
5 == 5      # True   (enako?  dva znaka =!)
5 != 3      # True   (različno?)
3 < 5, 5 <= 5, 7 > 2, 7 >= 8
1 < x < 10  # veriženo: x med 1 in 10
"a" in "pirate"   # True
:::
~=~ vrednost **shrani**. ~==~ **vpraša**, ali sta vrednosti enaki.

**if / elif / else**: izvede se prva resnična veja, ostale Python preskoči.
:::
if veter >= 30:
    print("Nevihta!")
elif veter >= 10:
    print("Dobra plovba")
else:
    print("Mirno morje")
:::
- Vsaka vrstica z ~if~, ~elif~, ~else~ se konča z **dvopičjem**.
- Blok znotraj je **zamaknjen za 4 presledke**.
- Najstrožji pogoj daj prvi: prejšnje ujemanje blokira kasnejše.

**Kombiniranje**: ~and~ (oba resnična), ~or~ (vsaj eden), ~not~ (obrne).
:::
if starost >= 16 and karta == "da":
    print("Dobrodošel na krovu!")
:::`,
    },
    lessons: [
      {
        id: "c3l1",
        title: { en: "True or False", sl: "Res ali ne" },
        steps: [
          {
            id: "s1", type: "story", speaker: "pip",
            text: {
              en: `Squawk! Hold on to something. This is **Fork-Tongue Strait**. The channel splits in two around the rocks, and only one side is deep enough for the Serpent.

A good navigator looks at the water and **decides**. Your programs need to do the same: look at a value, decide, and act differently depending on the answer.

Every decision starts with a question that's either **True** or **False**.`,
              sl: `Skvak! Primi se nečesa. To je **Ožina razcepljenega jezika**. Kanal se okoli čeri razcepi na dva dela in samo ena stran je dovolj globoka za Kačo.

Dober krmar pogleda vodo in se **odloči**. Tvoji programi morajo storiti enako: pogledati vrednost, se odločiti in ravnati različno glede na odgovor.

Vsaka odločitev se začne z vprašanjem, ki je **True** (res) ali **False** (ni res).`,
            },
          },
          {
            id: "s2", type: "learn",
            text: {
              en: `~True~ and ~False~ are a new type called **bool** (boolean). Note the capital letters.

Comparisons ask a question and give back a bool:
- ~==~ equal, ~!=~ not equal
- ~<~ less than, ~>~ greater than
- ~<=~ less or equal, ~>=~ greater or equal

Careful: ~=~ **stores** a value, ~==~ **compares** two values. Mixing them up is one of the most common beginner bugs.`,
              sl: `~True~ in ~False~ sta nov tip, imenovan **bool** (logična vrednost). Pazi na veliki začetnici.

Primerjave postavijo vprašanje in vrnejo bool:
- ~==~ enako, ~!=~ različno
- ~<~ manjše, ~>~ večje
- ~<=~ manjše ali enako, ~>=~ večje ali enako

Pozor: ~=~ vrednost **shrani**, ~==~ dve vrednosti **primerja**. Zamenjava je ena najpogostejših začetniških napak.`,
            },
            example: `gold = 150\nprint(gold > 100)\nprint(gold == 150)\nprint(gold != 150)\nprint(gold <= 99)\nis_rich = gold > 100\nprint("Rich?", is_rich, type(is_rich))\n`,
          },
          {
            id: "s3", type: "predict",
            text: { en: "Numbers and text compare differently. What prints?", sl: "Števila in besedilo se primerjajo različno. Kaj se izpiše?" },
            code: `print(5 == 5.0, "5" == 5)\n`,
            options: ["True True", "True False", "False False", { en: "An error", sl: "Napaka" }],
            answer: 1,
            explain: {
              en: "~5~ and ~5.0~ are the same number, so they're equal. ~\"5\"~ is text, and text is never equal to a number. That's why you convert ~input()~ before comparing.",
              sl: "~5~ in ~5.0~ sta isto število, zato sta enaka. ~\"5\"~ je besedilo, ki ni nikoli enako številu. Zato ~input()~ pred primerjanjem pretvoriš.",
            },
          },
          {
            id: "s4", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `x = 7\nprint(x > 3, x <= 7, x != 7)\n`,
            options: ["True True False", "True False False", "True True True", "False True False"],
            answer: 0,
            explain: { en: "7 is bigger than 3 (True). 7 is less than or equal to 7 (True). 7 is not different from 7 (False).", sl: "7 je večje od 3 (True). 7 je manjše ali enako 7 (True). 7 ni različno od 7 (False)." },
          },
          {
            id: "s5", type: "code", kind: "task",
            text: {
              en: `The ship has ~gold = 150~. Create a variable ~is_rich~ that holds whether gold is **more than 100**. Use a comparison: don't type ~True~ yourself. Then print:
:::
Rich? True
:::`,
              sl: `Ladja ima ~gold = 150~. Ustvari spremenljivko ~is_rich~, ki hrani, ali je zlata **več kot 100**. Uporabi primerjavo: ~True~ ne tipkaj sam. Nato izpiši:
:::
Rich? True
:::`,
            },
            starter: `gold = 150\n`,
            tests: [
              { check: R`assert ns.get("is_rich") is True`, msg: { en: "is_rich should be True.", sl: "is_rich naj bo True." } },
              { check: R`assert ">" in code and "True" not in code`, msg: { en: "Calculate is_rich with a comparison like gold > 100, instead of typing True.", sl: "is_rich izračunaj s primerjavo, kot gold > 100, namesto da natipkaš True." } },
              { check: R`assert "rich? true" in [norm(l) for l in lines]`, msg: { en: "Print Rich? True", sl: "Izpiši Rich? True" } },
            ],
            hints: [
              { en: "A comparison is a value you can store: ~is_rich = gold > 100~", sl: "Primerjava je vrednost, ki jo lahko shraniš: ~is_rich = gold > 100~" },
              { en: "Then ~print(\"Rich?\", is_rich)~.", sl: "Nato ~print(\"Rich?\", is_rich)~." },
            ],
            solution: `gold = 150\nis_rich = gold > 100\nprint("Rich?", is_rich)\n`,
          },
        ],
      },
      {
        id: "c3l2",
        title: { en: "If the Wind Blows", sl: "Če zapiha veter" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `~if~ runs a block of code **only when** a condition is True:
:::
if wind > 5:
    print("Raise the sails!")
:::
Three things to get right:
- The line ends with a **colon** ~:~
- The lines inside are **indented** by 4 spaces. The editor does this for you after the colon.
- Indentation decides what's inside. A line back at the left edge runs no matter what.

Try changing ~wind~ to 2 and run it again.`,
              sl: `~if~ izvede blok kode **samo, kadar** je pogoj True:
:::
if veter > 5:
    print("Dvigni jadra!")
:::
Tri stvari moraš zadeti:
- Vrstica se konča z **dvopičjem** ~:~
- Vrstice znotraj so **zamaknjene** za 4 presledke. Urejevalnik to po dvopičju naredi sam.
- Zamik določa, kaj je znotraj. Vrstica nazaj ob levem robu se izvede vedno.

Spremeni ~wind~ na 2 in ga zaženi znova.`,
            },
            example: `wind = 8\n\nif wind > 5:\n    print("Raise the sails!")\n    print("Full speed ahead!")\n\nprint("Check the ropes.")  # always runs\n`,
          },
          {
            id: "s2", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `wind = 3\nif wind > 5:\n    print("Raise the sails")\nprint("Check the ropes")\n`,
            options: ["Raise the sails\nCheck the ropes", "Check the ropes", "Raise the sails", { en: "Nothing", sl: "Nič" }],
            answer: 1,
            explain: { en: "~3 > 5~ is False, so the indented line is skipped. The last line isn't indented, so it always runs.", sl: "~3 > 5~ je False, zato se zamaknjena vrstica preskoči. Zadnja vrstica ni zamaknjena, zato se izvede vedno." },
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `The weapons dealer only sells to crews with enough gold. Ask ~How much gold? ~ (a whole number).
- If it's **100 or more**, print ~You can buy a cannon!~
- Either way, finish by printing ~Goodbye~`,
              sl: `Trgovec z orožjem prodaja samo posadkam z dovolj zlata. Vprašaj ~How much gold? ~ (celo število).
- Če ga je **100 ali več**, izpiši ~You can buy a cannon!~
- V vsakem primeru na koncu izpiši ~Goodbye~`,
            },
            starter: ``,
            stdin: "150",
            tests: [
              { stdin: ["150"], check: R`assert "you can buy a cannon!" in norm(out) and clean[-1].lower() == "goodbye"`, msg: { en: "With 150 gold: print You can buy a cannon! and then Goodbye.", sl: "Pri 150 zlatnikih: izpiši You can buy a cannon! in nato Goodbye." } },
              { stdin: ["100"], check: R`assert "you can buy a cannon!" in norm(out)`, msg: { en: "With exactly 100 gold the cannon should still be offered. 100 or more includes 100.", sl: "Pri natanko 100 zlatnikih mora top še vedno biti na voljo. 100 ali več vključuje 100." } },
              { stdin: ["50"], check: R`assert "cannon" not in norm(out) and clean[-1].lower() == "goodbye"`, msg: { en: "With 50 gold, only Goodbye should be printed.", sl: "Pri 50 zlatnikih naj se izpiše samo Goodbye." } },
            ],
            hints: [
              { en: "Convert the answer with ~int()~, then compare it with ~>= 100~.", sl: "Odgovor pretvori z ~int()~, nato ga primerjaj z ~>= 100~." },
              { en: "The cannon print goes indented under the ~if~. The Goodbye print goes back at the left edge.", sl: "Izpis o topu gre zamaknjen pod ~if~. Goodbye gre nazaj na levi rob." },
            ],
            solution: `gold = int(input("How much gold? "))\nif gold >= 100:\n    print("You can buy a cannon!")\nprint("Goodbye")\n`,
          },
          {
            id: "s4", type: "code", kind: "debug",
            text: { en: "The anchor program has two mistakes. Fix it so it prints ~Drop anchor!~", sl: "Program za sidro ima dve napaki. Popravi ga, da izpiše ~Drop anchor!~" },
            starter: `depth = 12\nif depth < 20\nprint("Drop anchor!")\n`,
            tests: [
              { check: R`assert "drop anchor!" in [norm(l) for l in lines]`, msg: { en: "It should print Drop anchor!", sl: "Izpisati mora Drop anchor!" } },
              { check: R`import re
assert re.search(r"\n[ \t]+print", code)`, msg: { en: "The print should be indented inside the if.", sl: "Izpis mora biti zamaknjen znotraj if." } },
            ],
            hints: [
              { en: "Fix one error, run it, and read the next message. Python reports one problem at a time.", sl: "Popravi eno napako, zaženi in preberi naslednje sporočilo. Python sporoči eno težavo naenkrat." },
              { en: "The ~if~ line needs a colon at the end, and the ~print~ needs 4 spaces in front.", sl: "Vrstica z ~if~ potrebuje dvopičje na koncu, ~print~ pa 4 presledke spredaj." },
            ],
            solution: `depth = 12\nif depth < 20:\n    print("Drop anchor!")\n`,
          },
        ],
      },
      {
        id: "c3l3",
        title: { en: "Else and Elif", sl: "Else in elif" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `~else~ catches everything the ~if~ didn't:
:::
if gold >= 100:
    print("Buy the cannon")
else:
    print("Keep saving")
:::
For more than two choices, add ~elif~ ("else if"). Python checks them **top to bottom** and runs only the **first** branch that's True, then skips the rest.

That means order matters. Put the most specific test first.`,
              sl: `~else~ ujame vse, česar ~if~ ni:
:::
if zlato >= 100:
    print("Kupi top")
else:
    print("Varčuj naprej")
:::
Za več kot dve možnosti dodaj ~elif~ ("sicer če"). Python jih preverja **od zgoraj navzdol** in izvede samo **prvo** resnično vejo, ostale preskoči.

Zato je vrstni red pomemben. Najbolj specifičen pogoj daj prvi.`,
            },
            example: `coins = 40\n\nif coins > 100:\n    print("Rich")\nelif coins > 20:\n    print("Comfortable")\nelif coins > 10:\n    print("Getting by")\nelse:\n    print("Broke")\n`,
          },
          {
            id: "s2", type: "predict",
            text: { en: "Only one branch runs. Which one?", sl: "Izvede se samo ena veja. Katera?" },
            code: `coins = 40\nif coins > 100:\n    print("Rich")\nelif coins > 20:\n    print("Comfortable")\nelif coins > 10:\n    print("Getting by")\nelse:\n    print("Broke")\n`,
            options: ["Rich", "Comfortable", "Comfortable\nGetting by", "Broke"],
            answer: 1,
            explain: { en: "40 > 20 is the first True test, so \"Comfortable\" prints. 40 > 10 is also True, but Python never checks it: it already found its branch.", sl: "40 > 20 je prvi resnični pogoj, zato se izpiše \"Comfortable\". Tudi 40 > 10 je res, a ga Python sploh ne preveri: vejo je že našel." },
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `Write the weather report. Ask ~Wind speed? ~ (whole number) and print:
- below 10: ~Calm seas~
- 10 up to 29: ~Good sailing~
- 30 or more: ~Storm! Stay in port~`,
              sl: `Napiši vremensko poročilo. Vprašaj ~Wind speed? ~ (celo število) in izpiši:
- pod 10: ~Calm seas~
- od 10 do 29: ~Good sailing~
- 30 ali več: ~Storm! Stay in port~`,
            },
            starter: ``,
            stdin: "15",
            tests: [
              { stdin: ["5"], check: R`assert "calm seas" in norm(out) and "good" not in norm(out) and "storm" not in norm(out)`, msg: { en: "Wind 5 should print only Calm seas.", sl: "Veter 5 naj izpiše samo Calm seas." } },
              { stdin: ["10"], check: R`assert "good sailing" in norm(out) and "calm" not in norm(out)`, msg: { en: "Wind 10 should print Good sailing. Check the boundary: 10 is no longer calm.", sl: "Veter 10 naj izpiše Good sailing. Preveri mejo: 10 ni več mirno." } },
              { stdin: ["29"], check: R`assert "good sailing" in norm(out) and "storm" not in norm(out)`, msg: { en: "Wind 29 should print Good sailing.", sl: "Veter 29 naj izpiše Good sailing." } },
              { stdin: ["30"], check: R`assert "storm! stay in port" in norm(out) and "good" not in norm(out)`, msg: { en: "Wind 30 should print only Storm! Stay in port.", sl: "Veter 30 naj izpiše samo Storm! Stay in port." } },
            ],
            hints: [
              { en: "One ~if~, one ~elif~, one ~else~. Only one of them should print.", sl: "En ~if~, en ~elif~, en ~else~. Izpisati sme samo eden." },
              { en: "Start with ~if wind < 10:~, then ~elif wind < 30:~, then ~else:~.", sl: "Začni z ~if wind < 10:~, nato ~elif wind < 30:~, nato ~else:~." },
            ],
            solution: `wind = int(input("Wind speed? "))\nif wind < 10:\n    print("Calm seas")\nelif wind < 30:\n    print("Good sailing")\nelse:\n    print("Storm! Stay in port")\n`,
          },
          {
            id: "s4", type: "code", kind: "debug",
            text: {
              en: `The medal program gives everyone Bronze. A score of 95 should get Gold, 80 Silver, 60 Bronze, and under 50 no medal. Fix the logic.`,
              sl: `Program za medalje vsem podeli bron. Rezultat 95 naj dobi zlato (Gold), 80 srebro (Silver), 60 bron (Bronze), pod 50 pa nič (No medal). Popravi logiko.`,
            },
            starter: `score = int(input("Score? "))\nif score >= 50:\n    print("Bronze")\nelif score >= 75:\n    print("Silver")\nelif score >= 90:\n    print("Gold")\nelse:\n    print("No medal")\n`,
            stdin: "95",
            tests: [
              { stdin: ["95"], check: R`assert clean[-1].endswith("Gold")`, msg: { en: "95 should give Gold.", sl: "95 naj dobi Gold." } },
              { stdin: ["80"], check: R`assert clean[-1].endswith("Silver")`, msg: { en: "80 should give Silver.", sl: "80 naj dobi Silver." } },
              { stdin: ["60"], check: R`assert clean[-1].endswith("Bronze")`, msg: { en: "60 should give Bronze.", sl: "60 naj dobi Bronze." } },
              { stdin: ["10"], check: R`assert clean[-1].endswith("No medal")`, msg: { en: "10 should give No medal.", sl: "10 naj dobi No medal." } },
            ],
            hints: [
              { en: "Trace 95 by hand. Which test does it hit first?", sl: "Ročno sledi 95. Kateri pogoj zadene prvi?" },
              { en: "Reverse the order: check ~>= 90~ first, then ~>= 75~, then ~>= 50~.", sl: "Obrni vrstni red: najprej preveri ~>= 90~, nato ~>= 75~, nato ~>= 50~." },
            ],
            solution: `score = int(input("Score? "))\nif score >= 90:\n    print("Gold")\nelif score >= 75:\n    print("Silver")\nelif score >= 50:\n    print("Bronze")\nelse:\n    print("No medal")\n`,
          },
        ],
      },
      {
        id: "c3l4",
        title: { en: "And, Or, Not", sl: "And, or, not" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `Combine conditions with three words:
- ~and~: True only if **both** sides are True
- ~or~: True if **at least one** side is True
- ~not~: flips True to False and back

You can also chain comparisons the way you'd write them in maths: ~1 < x < 10~ means "x is between 1 and 10".`,
              sl: `Pogoje kombiniraš s tremi besedami:
- ~and~: True le, če sta **obe** strani True
- ~or~: True, če je **vsaj ena** stran True
- ~not~: obrne True v False in nazaj

Primerjave lahko tudi verižiš, kot bi jih napisal v matematiki: ~1 < x < 10~ pomeni "x je med 1 in 10".`,
            },
            example: `age = 20\nticket = "yes"\n\nprint(age >= 16 and ticket == "yes")\nprint(age < 16 or ticket == "yes")\nprint(not ticket == "yes")\nprint(1 < age < 30)\n`,
          },
          {
            id: "s2", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `print(True and False, True or False, not True)\n`,
            options: ["False True False", "True True False", "False False True", "False True True"],
            answer: 0,
            explain: { en: "~and~ needs both (False). ~or~ needs one (True). ~not True~ is False.", sl: "~and~ potrebuje oba (False). ~or~ potrebuje enega (True). ~not True~ je False." },
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `Write the gangplank check. Ask ~Age? ~ (whole number) and then ~Do you have a ticket? (yes/no) ~.

Passengers can board only if they're **16 or older** and answered **yes**:
- allowed: ~Welcome aboard!~
- otherwise: ~Sorry, you can't board.~`,
              sl: `Napiši preverjanje na mostičku. Vprašaj ~Age? ~ (celo število) in nato ~Do you have a ticket? (yes/no) ~.

Potniki se smejo vkrcati le, če so stari **16 let ali več** in so odgovorili **yes**:
- dovoljeno: ~Welcome aboard!~
- sicer: ~Sorry, you can't board.~`,
            },
            starter: ``,
            stdin: "20\nyes",
            tests: [
              { stdin: ["20", "yes"], check: R`assert "welcome aboard!" in norm(out) and "sorry" not in norm(out)`, msg: { en: "Age 20 with a ticket should be welcomed aboard.", sl: "Starost 20 s karto naj bo dobrodošla na krovu." } },
              { stdin: ["20", "no"], check: R`assert "sorry, you can't board." in norm(out) and "welcome" not in norm(out)`, msg: { en: "Age 20 without a ticket should get Sorry, you can't board.", sl: "Starost 20 brez karte naj dobi Sorry, you can't board." } },
              { stdin: ["12", "yes"], check: R`assert "sorry, you can't board." in norm(out) and "welcome" not in norm(out)`, msg: { en: "Age 12 should not board, even with a ticket.", sl: "Starost 12 se ne sme vkrcati, tudi s karto ne." } },
              { stdin: ["16", "yes"], check: R`assert "welcome aboard!" in norm(out)`, msg: { en: "Exactly 16 with a ticket should be allowed.", sl: "Natanko 16 s karto mora biti dovoljeno." } },
            ],
            hints: [
              { en: "Both conditions must hold, so join them with ~and~.", sl: "Oba pogoja morata veljati, zato ju združi z ~and~." },
              { en: "~if age >= 16 and ticket == \"yes\":~ then an ~else~.", sl: "~if age >= 16 and ticket == \"yes\":~ nato ~else~." },
            ],
            solution: `age = int(input("Age? "))\nticket = input("Do you have a ticket? (yes/no) ")\nif age >= 16 and ticket == "yes":\n    print("Welcome aboard!")\nelse:\n    print("Sorry, you can't board.")\n`,
          },
          {
            id: "s4", type: "code", kind: "task",
            text: {
              en: `The island market only opens at weekends. Ask ~What day is it? ~ and print ~Market is open~ for ~Saturday~ or ~Sunday~, otherwise ~Market is closed~.`,
              sl: `Tržnica na otoku je odprta samo ob koncih tedna. Vprašaj ~What day is it? ~ in za ~Saturday~ ali ~Sunday~ izpiši ~Market is open~, sicer ~Market is closed~.`,
            },
            starter: ``,
            stdin: "Saturday",
            tests: [
              { stdin: ["Saturday"], check: R`assert "market is open" in norm(out)`, msg: { en: "Saturday should be open.", sl: "Sobota naj bo odprta." } },
              { stdin: ["Sunday"], check: R`assert "market is open" in norm(out)`, msg: { en: "Sunday should be open.", sl: "Nedelja naj bo odprta." } },
              { stdin: ["Monday"], check: R`assert "market is closed" in norm(out) and "open" not in norm(out)`, msg: { en: "Monday should be closed.", sl: "Ponedeljek naj bo zaprt." } },
            ],
            hints: [
              { en: "Either day is fine, so use ~or~.", sl: "Ustreza katerikoli dan, zato uporabi ~or~." },
              { en: "Each side needs its own full comparison: ~day == \"Saturday\" or day == \"Sunday\"~. Writing ~day == \"Saturday\" or \"Sunday\"~ is a classic trap.", sl: "Vsaka stran potrebuje svojo celo primerjavo: ~day == \"Saturday\" or day == \"Sunday\"~. Zapis ~day == \"Saturday\" or \"Sunday\"~ je klasična past." },
            ],
            solution: `day = input("What day is it? ")\nif day == "Saturday" or day == "Sunday":\n    print("Market is open")\nelse:\n    print("Market is closed")\n`,
          },
          {
            id: "s5", type: "predict",
            text: { en: "A Python special. What prints?", sl: "Pythonova posebnost. Kaj se izpiše?" },
            code: `x = 5\nprint(1 < x < 10, 1 < x < 3)\n`,
            options: ["True False", "True True", { en: "An error", sl: "Napaka" }, "False False"],
            answer: 0,
            explain: { en: "Chained comparisons read like maths: ~1 < x < 10~ means ~1 < x and x < 10~. Many languages can't do this; Python can.", sl: "Verižene primerjave se berejo kot matematika: ~1 < x < 10~ pomeni ~1 < x and x < 10~. Veliko jezikov tega ne zna, Python zna." },
          },
        ],
      },
      {
        id: "c3l5",
        title: { en: "Locks Within Locks", sl: "Ključavnice v ključavnicah" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `You can put an ~if~ **inside** another ~if~. The inner one is only checked when the outer one was True. Each level indents 4 more spaces.

The ~in~ operator checks whether one piece of text appears inside another: ~"gold" in "golden key"~ is True.`,
              sl: `~if~ lahko postaviš **znotraj** drugega ~if~. Notranjega Python preveri le, če je bil zunanji True. Vsak nivo je zamaknjen za 4 presledke več.

Operator ~in~ preveri, ali se kos besedila pojavi v drugem: ~"gold" in "golden key"~ je True.`,
            },
            example: `key = "golden key"\ncode = 1234\n\nif "gold" in key:\n    print("The key fits the lock...")\n    if code == 1234:\n        print("Click! The chest opens.")\n    else:\n        print("Wrong code.")\nelse:\n    print("This key doesn't fit.")\n`,
          },
          {
            id: "s2", type: "predict",
            text: { en: "Trace it carefully. What prints?", sl: "Pozorno sledi. Kaj se izpiše?" },
            code: `rum = 2\ncrew = 10\nif rum > 0:\n    if crew > 20:\n        print("Not enough rum")\n    else:\n        print("Party!")\nelse:\n    print("No rum at all")\n`,
            options: ["Not enough rum", "Party!", "No rum at all", "Party!\nNo rum at all"],
            answer: 1,
            explain: { en: "~rum > 0~ is True, so we go inside. ~crew > 20~ is False, so the inner ~else~ runs. The outer ~else~ belongs to the outer ~if~ and is skipped.", sl: "~rum > 0~ je True, zato gremo noter. ~crew > 20~ je False, zato se izvede notranji ~else~. Zunanji ~else~ pripada zunanjemu ~if~ in se preskoči." },
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `Program the captain's chest. Ask ~Which key? ~
- If the answer is ~gold~, ask ~Code? ~ (whole number). If the code is ~1234~ print ~The chest opens!~, otherwise ~Wrong code~.
- For any other key print ~The key doesn't fit~ (and don't ask for a code).`,
              sl: `Sprogramiraj kapitanovo skrinjo. Vprašaj ~Which key? ~
- Če je odgovor ~gold~, vprašaj ~Code? ~ (celo število). Če je koda ~1234~, izpiši ~The chest opens!~, sicer ~Wrong code~.
- Za katerikoli drug ključ izpiši ~The key doesn't fit~ (in kode ne sprašuj).`,
            },
            starter: ``,
            stdin: "gold\n1234",
            tests: [
              { stdin: ["gold", "1234"], check: R`assert "the chest opens!" in norm(out)`, msg: { en: "gold and 1234 should open the chest.", sl: "gold in 1234 morata odpreti skrinjo." } },
              { stdin: ["gold", "1111"], check: R`assert "wrong code" in norm(out) and "opens" not in norm(out)`, msg: { en: "gold with code 1111 should print Wrong code.", sl: "gold s kodo 1111 naj izpiše Wrong code." } },
              { stdin: ["silver"], check: R`assert "the key doesn't fit" in norm(out)`, msg: { en: "A silver key should print The key doesn't fit, without asking for a code.", sl: "Srebrni ključ naj izpiše The key doesn't fit, ne da bi spraševal za kodo." } },
            ],
            hints: [
              { en: "The ~Code? ~ question goes **inside** the gold branch, so it's only asked for the gold key.", sl: "Vprašanje ~Code? ~ gre **znotraj** zlate veje, zato se postavi le pri zlatem ključu." },
              { en: "Outer: ~if key == \"gold\":~ ... ~else:~. Inside the first branch: ask, then another ~if~/~else~ for the code.", sl: "Zunaj: ~if key == \"gold\":~ ... ~else:~. V prvi veji: vprašaj, nato še en ~if~/~else~ za kodo." },
            ],
            solution: `key = input("Which key? ")\nif key == "gold":\n    code = int(input("Code? "))\n    if code == 1234:\n        print("The chest opens!")\n    else:\n        print("Wrong code")\nelse:\n    print("The key doesn't fit")\n`,
          },
          {
            id: "s4", type: "code", kind: "debug",
            text: {
              en: "The gunner's program won't even start. Fix it: answering ~yes~ prints ~BOOM!~, anything else prints ~Holding fire.~",
              sl: "Topničarjev program se sploh ne zažene. Popravi ga: odgovor ~yes~ izpiše ~BOOM!~, vse drugo pa ~Holding fire.~",
            },
            starter: `answer = input("Fire the cannons? ")\nif answer = "yes":\n    print("BOOM!")\nelse:\n    print("Holding fire.")\n`,
            stdin: "yes",
            tests: [
              { stdin: ["yes"], check: R`assert "boom!" in norm(out)`, msg: { en: "yes should print BOOM!", sl: "yes naj izpiše BOOM!" } },
              { stdin: ["no"], check: R`assert "holding fire." in norm(out) and "boom" not in norm(out)`, msg: { en: "no should print Holding fire.", sl: "no naj izpiše Holding fire." } },
            ],
            hints: [
              { en: "Is the ~if~ line storing something or comparing something?", sl: "Ali vrstica z ~if~ nekaj shranjuje ali primerja?" },
              { en: "Comparing needs two equals signs: ~==~", sl: "Primerjava potrebuje dva enačaja: ~==~" },
            ],
            solution: `answer = input("Fire the cannons? ")\nif answer == "yes":\n    print("BOOM!")\nelse:\n    print("Holding fire.")\n`,
          },
        ],
      },
      {
        id: "c3l6",
        title: { en: "Solo Voyage: The Harbour Gate", sl: "Samostojna plovba: Pristaniška vrata" },
        solo: true,
        steps: [
          {
            id: "s1", type: "story", speaker: "captain",
            text: {
              en: `Port Sirocco has a new gatekeeper, and he's useless. Lets in smugglers, charges the wrong fees, forgets the password.

The harbour master will pay us well for a program to replace him. It has to check the password and work out the docking fee from the ship's size and crew. Get it right, sailor.`,
              sl: `Pristanišče Sirocco ima novega vratarja, ki je za nič. Spušča tihotapce, zaračunava napačne pristojbine, pozablja geslo.

Pristaniški mojster nam bo dobro plačal za program, ki ga bo zamenjal. Preveriti mora geslo in izračunati pristojbino glede na velikost ladje in posadko. Naredi to prav, mornar.`,
            },
          },
          {
            id: "s2", type: "code", kind: "project",
            text: {
              en: `Write the harbour gate program.

**Requirements**
1. Ask ~Password? ~. If it's not ~kraken~, print ~Intruder! Sound the alarm!~ and ask nothing more.
2. If the password is right, ask ~Ship class? ~ and then ~Crew size? ~ (whole number).
3. The base fee depends on the class: ~sloop~ 10, ~frigate~ 25, ~galleon~ 50.
4. Crews **bigger than 100** pay an extra 20.
5. Print ~Fee: 70 doubloons~ (with the right number).
6. For any other class, print ~Unknown ship class~ instead of a fee.`,
              sl: `Napiši program za pristaniška vrata.

**Zahteve**
1. Vprašaj ~Password? ~. Če ni ~kraken~, izpiši ~Intruder! Sound the alarm!~ in ne sprašuj ničesar več.
2. Če je geslo pravo, vprašaj ~Ship class? ~ in nato ~Crew size? ~ (celo število).
3. Osnovna pristojbina je odvisna od razreda: ~sloop~ 10, ~frigate~ 25, ~galleon~ 50.
4. Posadke, **večje od 100**, plačajo dodatnih 20.
5. Izpiši ~Fee: 70 doubloons~ (s pravim številom).
6. Za vsak drug razred namesto pristojbine izpiši ~Unknown ship class~.`,
            },
            starter: `# Solo voyage: the Harbour Gate\n`,
            stdin: "kraken\ngalleon\n150",
            tests: [
              { stdin: ["parrot"], check: R`assert "intruder! sound the alarm!" in norm(out) and "fee" not in norm(out)`, msg: { en: "A wrong password should print Intruder! Sound the alarm! and stop asking.", sl: "Napačno geslo naj izpiše Intruder! Sound the alarm! in neha spraševati." } },
              { stdin: ["kraken", "sloop", "12"], check: R`assert "fee: 10 doubloons" in norm(out)`, msg: { en: "A sloop with 12 crew should pay Fee: 10 doubloons.", sl: "Šalupa z 12 člani posadke naj plača Fee: 10 doubloons." } },
              { stdin: ["kraken", "galleon", "150"], check: R`assert "fee: 70 doubloons" in norm(out)`, msg: { en: "A galleon with 150 crew should pay 50 + 20 = Fee: 70 doubloons.", sl: "Galeja s 150 člani naj plača 50 + 20 = Fee: 70 doubloons." } },
              { stdin: ["kraken", "frigate", "100"], check: R`assert "fee: 25 doubloons" in norm(out)`, msg: { en: "A frigate with exactly 100 crew pays no extra: Fee: 25 doubloons. The extra is only for more than 100.", sl: "Fregata z natanko 100 člani ne plača dodatka: Fee: 25 doubloons. Dodatek velja le za več kot 100." } },
              { stdin: ["kraken", "canoe", "3"], check: R`assert "unknown ship class" in norm(out) and "fee" not in norm(out)`, msg: { en: "An unknown class like canoe should print Unknown ship class and no fee.", sl: "Neznan razred, kot je canoe, naj izpiše Unknown ship class in brez pristojbine." } },
            ],
            hints: [
              { en: "Structure: an outer ~if~/~else~ for the password. Everything else lives inside the correct-password branch.", sl: "Zgradba: zunanji ~if~/~else~ za geslo. Vse ostalo živi znotraj veje s pravim geslom." },
              { en: "Inside, use ~if~/~elif~/~elif~/~else~ on the class to set a variable ~fee~. Then, only for known classes, add 20 when ~crew > 100~ and print. A variable like ~known = True~ can help.", sl: "Znotraj z ~if~/~elif~/~elif~/~else~ na razredu nastavi spremenljivko ~fee~. Nato, samo za znane razrede, prištej 20, ko je ~crew > 100~, in izpiši. Pomaga lahko spremenljivka, kot je ~known = True~." },
            ],
            solution: `password = input("Password? ")\nif password != "kraken":\n    print("Intruder! Sound the alarm!")\nelse:\n    ship = input("Ship class? ")\n    crew = int(input("Crew size? "))\n    if ship == "sloop":\n        fee = 10\n    elif ship == "frigate":\n        fee = 25\n    elif ship == "galleon":\n        fee = 50\n    else:\n        fee = None\n\n    if fee is None:\n        print("Unknown ship class")\n    else:\n        if crew > 100:\n            fee += 20\n        print("Fee:", fee, "doubloons")\n`,
            after: {
              en: "The trick of setting ~fee = None~ for \"no answer yet\" is a pattern you'll use a lot. ~None~ is Python's way of saying \"nothing here\".",
              sl: "Trik z ~fee = None~ za \"še ni odgovora\" je vzorec, ki ga boš pogosto uporabljal. ~None~ je Pythonov način, da pove \"tu ni ničesar\".",
            },
          },
        ],
      },
    ],
  };
})();
