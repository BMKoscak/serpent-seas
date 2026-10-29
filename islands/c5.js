/* Island 5 — Rope-Knot Key: indexing, slicing, string methods, split/join, f-strings, looping over text */
(function () {
  const R = String.raw;
  (window.SS_ISLANDS = window.SS_ISLANDS || {}).c5 = {
    blurb: {
      en: "The knot-tyers of this key send messages as ropes of letters. Take text apart and put it back together: indexing, slicing, string methods, f-strings and a secret cipher.",
      sl: "Vezalci vozlov na tem otoku pošiljajo sporočila kot vrvi črk. Razstavi in sestavi besedilo: indeksi, rezine, metode nizov, f-nizi in skrivna šifra.",
    },
    log: {
      en: `**Indexing** starts at 0. Negative indexes count from the end.
:::
word = "PARROT"
word[0]      # 'P'
word[-1]     # 'T'
len(word)    # 6
:::
**Slicing** ~s[start:stop:step]~ stops **before** ~stop~.
:::
word[0:3]    # 'PAR'
word[3:]     # 'ROT'
word[::-1]   # 'TORRAP'  (reversed)
:::
**Methods** return a **new** string. Strings can't be changed in place.
:::
s.upper()  s.lower()  s.title()  s.strip()
s.replace("a", "o")   s.count("r")   s.find("x")   # -1 if missing
s.startswith("Ah")    s.isdigit()    s.isalpha()   s.isupper()
"a,b,c".split(",")    # ['a', 'b', 'c']
"-".join(["a", "b"])  # 'a-b'
:::
**f-strings** put values straight into text:
:::
f"{name} has {gold} coins"
f"{price:.2f}"     # 2 decimals
f"{n:>5}"          # right-align in 5 spaces
:::
**Looping** over text gives one character at a time: ~for ch in word:~`,
      sl: `**Indeksiranje** se začne pri 0. Negativni indeksi štejejo od konca.
:::
beseda = "PARROT"
beseda[0]    # 'P'
beseda[-1]   # 'T'
len(beseda)  # 6
:::
**Rezanje** ~s[začetek:konec:korak]~ se ustavi **pred** ~konec~.
:::
beseda[0:3]  # 'PAR'
beseda[3:]   # 'ROT'
beseda[::-1] # 'TORRAP'  (obrnjeno)
:::
**Metode** vrnejo **nov** niz. Niza ni mogoče spremeniti na mestu.
:::
s.upper()  s.lower()  s.title()  s.strip()
s.replace("a", "o")   s.count("r")   s.find("x")   # -1, če ga ni
s.startswith("Ah")    s.isdigit()    s.isalpha()   s.isupper()
"a,b,c".split(",")    # ['a', 'b', 'c']
"-".join(["a", "b"])  # 'a-b'
:::
**f-nizi** vrednosti vstavijo naravnost v besedilo:
:::
f"{ime} ima {zlato} kovancev"
f"{cena:.2f}"      # 2 decimalki
f"{n:>5}"          # desna poravnava v 5 mestih
:::
**Zanka** po besedilu da en znak naenkrat: ~for ch in beseda:~`,
    },
    lessons: [
      {
        id: "c5l1",
        title: { en: "Letter by Letter", sl: "Črko za črko" },
        steps: [
          {
            id: "s1", type: "story", speaker: "pip",
            text: {
              en: `Squawk! **Rope-Knot Key**. The islanders here tie messages into ropes, one knot per letter. To read a message you count along the rope.

Python strings work exactly like that rope. Each character has a position, and you can grab any of them, cut out pieces, or tie them back together in a new order.`,
              sl: `Skvak! **Otok vozlov**. Domačini tu sporočila vežejo v vrvi, en vozel za vsako črko. Da sporočilo prebereš, šteješ vzdolž vrvi.

Nizi v Pythonu delujejo prav kot ta vrv. Vsak znak ima svoje mesto in lahko zgrabiš katerega koli, izrežeš kose ali jih zvežeš nazaj v novem vrstnem redu.`,
            },
          },
          {
            id: "s2", type: "learn",
            text: {
              en: `Each character in a string has an **index**, starting at **0**:
:::
 P  A  R  R  O  T
 0  1  2  3  4  5
-6 -5 -4 -3 -2 -1
:::
- ~word[0]~ is the first character, ~word[-1]~ the last.
- ~len(word)~ is the number of characters.
- Asking for a position that doesn't exist raises ~IndexError~.

Strings are **immutable**: you can read a character, but ~word[0] = "B"~ is an error. To "change" a string, you build a new one.`,
              sl: `Vsak znak v nizu ima **indeks**, ki se začne pri **0**:
:::
 P  A  R  R  O  T
 0  1  2  3  4  5
-6 -5 -4 -3 -2 -1
:::
- ~word[0]~ je prvi znak, ~word[-1]~ zadnji.
- ~len(word)~ je število znakov.
- Zahteva po mestu, ki ne obstaja, sproži ~IndexError~.

Nizi so **nespremenljivi**: znak lahko prebereš, ~word[0] = "B"~ pa je napaka. Da niz "spremeniš", zgradiš novega.`,
            },
            example: `word = "PARROT"\nprint(word[0], word[1], word[-1])\nprint("Length:", len(word))\nprint("Middle letters:", word[2], word[3])\n`,
          },
          {
            id: "s3", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `word = "PARROT"\nprint(word[1], word[-2], len(word))\n`,
            options: ["A O 6", "P O 6", "A R 6", "A O 5"],
            answer: 0,
            explain: { en: "Index 1 is the second letter, A. Index -2 is second from the end, O. There are 6 letters.", sl: "Indeks 1 je druga črka, A. Indeks -2 je druga od konca, O. Črk je 6." },
          },
          {
            id: "s4", type: "code", kind: "task",
            text: {
              en: `Ask ~Name? ~ and print three lines about it. For ~Ben~:
:::
First letter: B
Last letter: n
Length: 3
:::`,
              sl: `Vprašaj ~Name? ~ in izpiši tri vrstice o imenu. Za ~Ben~:
:::
First letter: B
Last letter: n
Length: 3
:::`,
            },
            starter: ``,
            stdin: "Ben",
            tests: [
              { stdin: ["Ben"], check: R`assert "First letter: B" in clean and "Last letter: n" in clean and "Length: 3" in clean`, msg: { en: "For Ben: First letter: B, Last letter: n, Length: 3", sl: "Za Ben: First letter: B, Last letter: n, Length: 3" } },
              { stdin: ["Marlow"], check: R`assert "First letter: M" in clean and "Last letter: w" in clean and "Length: 6" in clean`, msg: { en: "For Marlow: First letter: M, Last letter: w, Length: 6", sl: "Za Marlow: First letter: M, Last letter: w, Length: 6" } },
            ],
            hints: [
              { en: "~name[0]~, ~name[-1]~ and ~len(name)~.", sl: "~name[0]~, ~name[-1]~ in ~len(name)~." },
              { en: "~print(\"First letter:\", name[0])~ and so on.", sl: "~print(\"First letter:\", name[0])~ in tako naprej." },
            ],
            solution: `name = input("Name? ")\nprint("First letter:", name[0])\nprint("Last letter:", name[-1])\nprint("Length:", len(name))\n`,
          },
          {
            id: "s5", type: "code", kind: "debug",
            text: { en: "The flag maker wants the last letter of ~skull~. Fix the ~IndexError~ so it prints ~l~.", sl: "Izdelovalec zastav želi zadnjo črko besede ~skull~. Popravi ~IndexError~, da izpiše ~l~." },
            starter: `flag = "skull"\nprint(flag[5])\n`,
            tests: [{ check: R`assert clean == ["l"]`, msg: { en: "It should print just l.", sl: "Izpisati mora samo l." } }],
            hints: [
              { en: "\"skull\" has 5 letters. If counting starts at 0, what's the index of the last one?", sl: "\"skull\" ima 5 črk. Če štetje začne pri 0, kateri indeks ima zadnja?" },
              { en: "Use ~flag[4]~, or even better ~flag[-1]~, which works for any length.", sl: "Uporabi ~flag[4]~ ali še bolje ~flag[-1]~, ki deluje pri kateri koli dolžini." },
            ],
            solution: `flag = "skull"\nprint(flag[-1])\n`,
            after: { en: "This is called an **off-by-one** error. The last index is always ~len - 1~.", sl: "Temu pravimo napaka **za ena**. Zadnji indeks je vedno ~len - 1~." },
          },
        ],
      },
      {
        id: "c5l2",
        title: { en: "Cutting the Rope", sl: "Rezanje vrvi" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `A **slice** cuts out a piece: ~s[start:stop]~. It includes ~start~ and stops **before** ~stop~, just like ~range~.

- Leave out ~start~ to begin at the start: ~s[:3]~
- Leave out ~stop~ to go to the end: ~s[3:]~
- Negative numbers count from the end: ~s[-3:]~ is the last three
- A third number is the step: ~s[::2]~ is every second character, ~s[::-1]~ is the whole string **backwards**

Slicing never raises ~IndexError~. It just gives you whatever exists.`,
              sl: `**Rezina** izreže kos: ~s[začetek:konec]~. Vključuje ~začetek~ in se ustavi **pred** ~konec~, tako kot ~range~.

- Izpusti ~začetek~ in začneš na začetku: ~s[:3]~
- Izpusti ~konec~ in greš do konca: ~s[3:]~
- Negativna števila štejejo od konca: ~s[-3:]~ so zadnji trije
- Tretje število je korak: ~s[::2]~ je vsak drugi znak, ~s[::-1]~ pa cel niz **nazaj**

Rezanje nikoli ne sproži ~IndexError~. Vrne pač, kar obstaja.`,
            },
            example: `s = "TREASURE"\nprint(s[0:5])\nprint(s[:5])\nprint(s[5:])\nprint(s[-3:])\nprint(s[::2])\nprint(s[::-1])\nprint(s[2:100])   # no error, just stops at the end\n`,
          },
          {
            id: "s2", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `s = "TREASURE"\nprint(s[0:5], s[5:], s[-3:])\n`,
            options: ["TREAS URE URE", "TREASU RE URE", "TREA SURE URE", "TREAS URE SURE"],
            answer: 0,
            explain: { en: "~[0:5]~ takes indexes 0 to 4 (TREAS). ~[5:]~ takes from 5 to the end (URE). ~[-3:]~ is the last three (URE).", sl: "~[0:5]~ vzame indekse od 0 do 4 (TREAS). ~[5:]~ vzame od 5 do konca (URE). ~[-3:]~ so zadnji trije (URE)." },
          },
          {
            id: "s3", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `print("ahoy"[::-1])\n`,
            options: ["ahoy", "yoha", "y", { en: "An error", sl: "Napaka" }],
            answer: 1,
            explain: { en: "A step of -1 walks through the string from the end to the start.", sl: "Korak -1 gre skozi niz od konca do začetka." },
          },
          {
            id: "s4", type: "code", kind: "task",
            text: {
              en: `The ship's log stores dates as ~"1715-06-24"~. Use slicing to put the parts into ~year~, ~month~ and ~day~, then print:
:::
Year: 1715
Month: 06
Day: 24
:::`,
              sl: `Ladijski dnevnik shranjuje datume kot ~"1715-06-24"~. Z rezanjem shrani dele v ~year~, ~month~ in ~day~, nato izpiši:
:::
Year: 1715
Month: 06
Day: 24
:::`,
            },
            starter: `date = "1715-06-24"\n`,
            tests: [
              { check: R`assert ns.get("year") == "1715" and ns.get("month") == "06" and ns.get("day") == "24"`, msg: { en: "year should be \"1715\", month \"06\" and day \"24\" (as text).", sl: "year naj bo \"1715\", month \"06\" in day \"24\" (kot besedilo)." } },
              { check: R`assert "date[" in code`, msg: { en: "Cut the pieces out of date with slices.", sl: "Kose izreži iz date z rezinami." } },
              { check: R`assert clean == ["Year: 1715", "Month: 06", "Day: 24"]`, msg: { en: "Print Year: 1715, Month: 06, Day: 24.", sl: "Izpiši Year: 1715, Month: 06, Day: 24." } },
            ],
            hints: [
              { en: "Count positions: the year is indexes 0 to 3, the month 5 and 6, the day 8 and 9.", sl: "Preštej mesta: leto so indeksi od 0 do 3, mesec 5 in 6, dan 8 in 9." },
              { en: "~date[0:4]~, ~date[5:7]~, ~date[8:]~", sl: "~date[0:4]~, ~date[5:7]~, ~date[8:]~" },
            ],
            solution: `date = "1715-06-24"\nyear = date[0:4]\nmonth = date[5:7]\nday = date[8:]\nprint("Year:", year)\nprint("Month:", month)\nprint("Day:", day)\n`,
          },
          {
            id: "s5", type: "code", kind: "task",
            text: {
              en: `A **palindrome** reads the same backwards, like ~racecar~. Ask ~Word? ~ and print ~Palindrome!~ or ~Not a palindrome~.`,
              sl: `**Palindrom** se bere enako nazaj, kot ~racecar~. Vprašaj ~Word? ~ in izpiši ~Palindrome!~ ali ~Not a palindrome~.`,
            },
            starter: ``,
            stdin: "racecar",
            tests: [
              { stdin: ["racecar"], check: R`assert "palindrome!" in norm(out) and "not" not in norm(out)`, msg: { en: "racecar is a palindrome.", sl: "racecar je palindrom." } },
              { stdin: ["level"], check: R`assert "palindrome!" in norm(out) and "not" not in norm(out)`, msg: { en: "level is a palindrome.", sl: "level je palindrom." } },
              { stdin: ["pirate"], check: R`assert "not a palindrome" in norm(out)`, msg: { en: "pirate is not a palindrome.", sl: "pirate ni palindrom." } },
            ],
            hints: [
              { en: "Compare the word with its reversed version.", sl: "Primerjaj besedo z njeno obrnjeno različico." },
              { en: "~if word == word[::-1]:~", sl: "~if word == word[::-1]:~" },
            ],
            solution: `word = input("Word? ")\nif word == word[::-1]:\n    print("Palindrome!")\nelse:\n    print("Not a palindrome")\n`,
          },
        ],
      },
      {
        id: "c5l3",
        title: { en: "String Tools", sl: "Orodja za nize" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `Strings come with built-in tools called **methods**. You call them with a dot: ~text.upper()~.
- ~upper()~ ~lower()~ ~title()~ change case
- ~strip()~ removes spaces from both ends
- ~replace(old, new)~ swaps pieces
- ~count(x)~ counts how often ~x~ appears, ~find(x)~ gives its index (or -1)
- ~startswith(x)~, ~endswith(x)~, ~isdigit()~, ~isalpha()~ answer True or False
- ~split(sep)~ cuts text into a **list** of pieces, ~sep.join(list)~ glues them back

Methods **return a new string**. The original stays the same, so store the result if you want to keep it.`,
              sl: `Nizi imajo vgrajena orodja, imenovana **metode**. Kličeš jih s piko: ~text.upper()~.
- ~upper()~ ~lower()~ ~title()~ spremenijo velikost črk
- ~strip()~ odstrani presledke na obeh koncih
- ~replace(staro, novo)~ zamenja dele
- ~count(x)~ prešteje, kolikokrat se ~x~ pojavi, ~find(x)~ vrne njegov indeks (ali -1)
- ~startswith(x)~, ~endswith(x)~, ~isdigit()~, ~isalpha()~ odgovorijo s True ali False
- ~split(ločilo)~ razreže besedilo v **seznam** kosov, ~ločilo.join(seznam)~ jih zlepi nazaj

Metode **vrnejo nov niz**. Izvirnik ostane enak, zato rezultat shrani, če ga želiš obdržati.`,
            },
            example: `shout = "  all hands on deck  "\nprint(shout.strip().upper())\nprint(shout.strip().title())\nprint("rum, rum, rum".replace("rum", "water"))\nprint("arrrr".count("r"))\nprint("treasure".find("s"))\nprint("1715".isdigit(), "abc".isdigit())\n\nparts = "rope,rum,maps".split(",")\nprint(parts)\nprint(" + ".join(parts))\n`,
          },
          {
            id: "s2", type: "predict",
            text: { en: "Methods can be chained. What prints?", sl: "Metode lahko verižiš. Kaj se izpiše?" },
            code: `s = "  Ahoy  "\nprint(s.strip().upper() + "!")\n`,
            options: ["  AHOY  !", "AHOY!", "Ahoy!", "  ahoy!"],
            answer: 1,
            explain: { en: "~strip()~ removes the spaces, then ~upper()~ runs on that result, then ~!~ is added.", sl: "~strip()~ odstrani presledke, nato ~upper()~ deluje na tem rezultatu, nato se doda ~!~." },
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `Sailors type commands any old way: ~" FIRE "~, ~"Fire"~, ~"fire"~. Ask ~Command? ~, clean it up, and if it means **fire** print ~BOOM!~, otherwise ~Unknown command~.`,
              sl: `Mornarji tipkajo ukaze kakor koli: ~" FIRE "~, ~"Fire"~, ~"fire"~. Vprašaj ~Command? ~, ga očisti in če pomeni **fire**, izpiši ~BOOM!~, sicer ~Unknown command~.`,
            },
            starter: ``,
            stdin: "  FIRE  ",
            tests: [
              { stdin: ["  FIRE  "], check: R`assert "boom!" in norm(out)`, msg: { en: "\"  FIRE  \" should print BOOM!", sl: "\"  FIRE  \" naj izpiše BOOM!" } },
              { stdin: ["Fire"], check: R`assert "boom!" in norm(out)`, msg: { en: "Fire should print BOOM!", sl: "Fire naj izpiše BOOM!" } },
              { stdin: ["sail"], check: R`assert "unknown command" in norm(out) and "boom" not in norm(out)`, msg: { en: "sail should print Unknown command.", sl: "sail naj izpiše Unknown command." } },
            ],
            hints: [
              { en: "Make every version look the same before comparing.", sl: "Pred primerjanjem naj bodo vse različice enake." },
              { en: "~command = input(\"Command? \").strip().lower()~", sl: "~command = input(\"Command? \").strip().lower()~" },
            ],
            solution: `command = input("Command? ").strip().lower()\nif command == "fire":\n    print("BOOM!")\nelse:\n    print("Unknown command")\n`,
          },
          {
            id: "s4", type: "code", kind: "task",
            text: {
              en: `Pirates love the letter R. Ask ~Sentence? ~ and print how many times **r** appears, counting capital R too. For ~Rum and pirates arrr~:
:::
The letter r appears 5 times
:::`,
              sl: `Pirati obožujejo črko R. Vprašaj ~Sentence? ~ in izpiši, kolikokrat se pojavi **r**, šteje tudi veliki R. Za ~Rum and pirates arrr~:
:::
The letter r appears 5 times
:::`,
            },
            starter: ``,
            stdin: "Rum and pirates arrr",
            tests: [
              { stdin: ["Rum and pirates arrr"], check: R`assert "the letter r appears 5 times" in norm(out)`, msg: { en: "Rum and pirates arrr has 5 r's (including the capital R).", sl: "Rum and pirates arrr ima 5 črk r (vključno z velikim R)." } },
              { stdin: ["RRR rrr"], check: R`assert "the letter r appears 6 times" in norm(out)`, msg: { en: "RRR rrr has 6 r's. Count capitals too.", sl: "RRR rrr ima 6 črk r. Štej tudi velike." } },
              { stdin: ["Yo ho"], check: R`assert "the letter r appears 0 times" in norm(out)`, msg: { en: "Yo ho has 0 r's.", sl: "Yo ho ima 0 črk r." } },
            ],
            hints: [
              { en: "Lowercase the whole sentence first, then count.", sl: "Najprej cel stavek spremeni v male črke, nato štej." },
              { en: "~sentence.lower().count(\"r\")~", sl: "~sentence.lower().count(\"r\")~" },
            ],
            solution: `sentence = input("Sentence? ")\nn = sentence.lower().count("r")\nprint("The letter r appears", n, "times")\n`,
          },
          {
            id: "s5", type: "code", kind: "debug",
            text: { en: "This should print ~Captain Marlow~ with capitals, but nothing changes. Fix it.", sl: "To naj izpiše ~Captain Marlow~ z velikimi začetnicami, a se nič ne spremeni. Popravi." },
            starter: `name = "captain marlow"\nname.title()\nprint(name)\n`,
            tests: [{ check: R`assert clean == ["Captain Marlow"]`, msg: { en: "It should print Captain Marlow", sl: "Izpisati mora Captain Marlow" } }],
            hints: [
              { en: "Methods return a new string. Where does that new string go on line 2?", sl: "Metode vrnejo nov niz. Kam gre ta nov niz v vrstici 2?" },
              { en: "Store it: ~name = name.title()~", sl: "Shrani ga: ~name = name.title()~" },
            ],
            solution: `name = "captain marlow"\nname = name.title()\nprint(name)\n`,
          },
        ],
      },
      {
        id: "c5l4",
        title: { en: "f-strings", sl: "f-nizi" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `Putting values into text with commas and ~+~ gets messy. **f-strings** are cleaner: put an ~f~ before the quote and write values inside ~{curly braces}~.
:::
f"{name} has {gold} coins"
:::
Anything inside the braces is real Python, so ~{gold * 2}~ works too.

You can also format numbers after a colon:
- ~{price:.2f}~ → always 2 decimals
- ~{n:>5}~ → right-aligned in 5 spaces (~<~ left, ~^~ centre)
- ~{big:,}~ → thousands separators`,
              sl: `Vstavljanje vrednosti v besedilo z vejicami in ~+~ postane neurejeno. **f-nizi** so preglednejši: pred narekovaj postavi ~f~ in vrednosti zapiši v ~{zavite oklepaje}~.
:::
f"{ime} ima {zlato} kovancev"
:::
Vse znotraj oklepajev je pravi Python, zato deluje tudi ~{zlato * 2}~.

Števila lahko tudi oblikuješ za dvopičjem:
- ~{cena:.2f}~ → vedno 2 decimalki
- ~{n:>5}~ → desno poravnano v 5 mestih (~<~ levo, ~^~ sredina)
- ~{veliko:,}~ → ločila tisočic`,
            },
            example: `name = "Pip"\ngold = 37\nprice = 4.5\nprint(f"{name} has {gold} coins.")\nprint(f"Doubled: {gold * 2}")\nprint(f"Price: {price:.2f} doubloons")\nprint(f"[{name:>6}]")\nprint(f"[{name:<6}]")\nprint(f"Treasury: {1250000:,}")\n`,
          },
          {
            id: "s2", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `gold = 3\nprint(f"{gold} coins, {gold * 2} after doubling")\n`,
            options: ["3 coins, 6 after doubling", "{gold} coins, {gold * 2} after doubling", "3 coins, 3 * 2 after doubling", "3 coins, 33 after doubling"],
            answer: 0,
            explain: { en: "Each ~{...}~ is evaluated as Python and its result is put into the text.", sl: "Vsak ~{...}~ se izračuna kot Python, rezultat pa se vstavi v besedilo." },
          },
          {
            id: "s3", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `print(f"{3.14159:.2f}")\n`,
            options: ["3.14159", "3.14", "3.1", "3"],
            answer: 1,
            explain: { en: "~.2f~ means \"a float with exactly 2 decimals\". It rounds, so 3.146 would show as 3.15.", sl: "~.2f~ pomeni \"float z natanko 2 decimalkama\". Zaokroži, zato bi se 3.146 pokazalo kot 3.15." },
          },
          {
            id: "s4", type: "code", kind: "task",
            text: {
              en: `Print a receipt line using **one f-string** and these variables:
:::
3 x rope = 13.50 doubloons
:::
The total must always show **2 decimals**.`,
              sl: `Izpiši vrstico računa z **enim f-nizom** in temi spremenljivkami:
:::
3 x rope = 13.50 doubloons
:::
Skupni znesek naj vedno kaže **2 decimalki**.`,
            },
            starter: `item = "rope"\nqty = 3\nprice = 4.5\n`,
            tests: [
              { check: R`assert clean == ["3 x rope = 13.50 doubloons"]`, msg: { en: "Expected exactly: 3 x rope = 13.50 doubloons", sl: "Pričakovano natanko: 3 x rope = 13.50 doubloons" } },
              { check: R`assert 'f"' in code or "f'" in code`, msg: { en: "Use an f-string.", sl: "Uporabi f-niz." } },
              { check: R`assert ":.2f}" in code`, msg: { en: "Format the total with :.2f so it always has 2 decimals.", sl: "Znesek oblikuj z :.2f, da ima vedno 2 decimalki." } },
            ],
            hints: [
              { en: "The total is ~qty * price~, and you can calculate it right inside the braces.", sl: "Znesek je ~qty * price~ in izračunaš ga lahko kar v oklepajih." },
              { en: "~print(f\"{qty} x {item} = {qty * price:.2f} doubloons\")~", sl: "~print(f\"{qty} x {item} = {qty * price:.2f} doubloons\")~" },
            ],
            solution: `item = "rope"\nqty = 3\nprice = 4.5\nprint(f"{qty} x {item} = {qty * price:.2f} doubloons")\n`,
          },
          {
            id: "s5", type: "code", kind: "task",
            text: {
              en: `Ask ~Name? ~ and ~Age? ~, then print with an f-string. For Ben, 20:
:::
Ahoy Ben! In 10 years you'll be 30.
:::`,
              sl: `Vprašaj ~Name? ~ in ~Age? ~, nato izpiši s f-nizom. Za Ben, 20:
:::
Ahoy Ben! In 10 years you'll be 30.
:::`,
            },
            starter: ``,
            stdin: "Ben\n20",
            tests: [
              { stdin: ["Ben", "20"], check: R`assert "ahoy ben! in 10 years you'll be 30." in norm(out)`, msg: { en: "For Ben, 20: Ahoy Ben! In 10 years you'll be 30.", sl: "Za Ben, 20: Ahoy Ben! In 10 years you'll be 30." } },
              { stdin: ["Anne", "41"], check: R`assert "ahoy anne! in 10 years you'll be 51." in norm(out)`, msg: { en: "For Anne, 41: Ahoy Anne! In 10 years you'll be 51.", sl: "Za Anne, 41: Ahoy Anne! In 10 years you'll be 51." } },
              { stdin: ["Ben", "20"], check: R`assert 'f"' in code or "f'" in code`, msg: { en: "Use an f-string.", sl: "Uporabi f-niz." } },
            ],
            hints: [
              { en: "Convert the age to int before adding 10.", sl: "Starost pred prištevanjem 10 pretvori v int." },
              { en: "The apostrophe in ~you'll~ is fine inside double quotes: ~f\"... you'll be {age + 10}.\"~", sl: "Opuščaj v ~you'll~ je v dvojnih narekovajih v redu: ~f\"... you'll be {age + 10}.\"~" },
            ],
            solution: `name = input("Name? ")\nage = int(input("Age? "))\nprint(f"Ahoy {name}! In 10 years you'll be {age + 10}.")\n`,
          },
        ],
      },
      {
        id: "c5l5",
        title: { en: "Secret Messages", sl: "Skrivna sporočila" },
        steps: [
          {
            id: "s1", type: "learn",
            text: {
              en: `A ~for~ loop over a string gives you **one character at a time**. Combine that with an accumulator string to build something new:
:::
result = ""
for ch in text:
    result += ch.upper()
:::
- ~ch in "aeiou"~ checks whether a character is a vowel.
- ~alphabet.find(ch)~ tells you a letter's position in your own alphabet string.`,
              sl: `Zanka ~for~ po nizu da **en znak naenkrat**. Združi jo z nizom-akumulatorjem in zgradiš nekaj novega:
:::
result = ""
for ch in text:
    result += ch.upper()
:::
- ~ch in "aeiou"~ preveri, ali je znak samoglasnik.
- ~alphabet.find(ch)~ pove položaj črke v tvojem nizu abecede.`,
            },
            example: `text = "ahoy matey"\nshouted = ""\nfor ch in text:\n    shouted += ch.upper() + " "\nprint(shouted)\n\nalphabet = "abcdefghijklmnopqrstuvwxyz"\nprint("m is letter number", alphabet.find("m") + 1)\n`,
          },
          {
            id: "s2", type: "code", kind: "task",
            text: {
              en: `Ask ~Sentence? ~ and count the vowels (a, e, i, o, u, upper or lower case). For ~Ahoy Matey~:
:::
Vowels: 4
:::`,
              sl: `Vprašaj ~Sentence? ~ in preštej samoglasnike (a, e, i, o, u, velike ali male). Za ~Ahoy Matey~:
:::
Vowels: 4
:::`,
            },
            starter: ``,
            stdin: "Ahoy Matey",
            tests: [
              { stdin: ["Ahoy Matey"], check: R`assert "vowels: 4" in norm(out)`, msg: { en: "Ahoy Matey has 4 vowels (A, o, a, e).", sl: "Ahoy Matey ima 4 samoglasnike (A, o, a, e)." } },
              { stdin: ["AEIOU aeiou xyz"], check: R`assert "vowels: 10" in norm(out)`, msg: { en: "AEIOU aeiou xyz has 10 vowels. Count capitals too.", sl: "AEIOU aeiou xyz ima 10 samoglasnikov. Štej tudi velike." } },
              { stdin: ["Rhythm"], check: R`assert "vowels: 0" in norm(out)`, msg: { en: "Rhythm has 0 vowels.", sl: "Rhythm ima 0 samoglasnikov." } },
            ],
            hints: [
              { en: "Loop over each character with a counter. Lowercase the character before checking.", sl: "Teci po vsakem znaku s števcem. Znak pred preverjanjem spremeni v malo črko." },
              { en: "~if ch.lower() in \"aeiou\": count += 1~", sl: "~if ch.lower() in \"aeiou\": count += 1~" },
            ],
            solution: `sentence = input("Sentence? ")\ncount = 0\nfor ch in sentence:\n    if ch.lower() in "aeiou":\n        count += 1\nprint("Vowels:", count)\n`,
          },
          {
            id: "s3", type: "code", kind: "task",
            text: {
              en: `Pirates in a hurry drop their vowels. Ask ~Text? ~ and print it with every vowel removed (everything else stays, spaces too). For ~Ahoy matey~:
:::
hy mty
:::`,
              sl: `Pirati v naglici izpuščajo samoglasnike. Vprašaj ~Text? ~ in ga izpiši brez samoglasnikov (vse ostalo ostane, tudi presledki). Za ~Ahoy matey~:
:::
hy mty
:::`,
            },
            starter: ``,
            stdin: "Ahoy matey",
            tests: [
              { stdin: ["Ahoy matey"], check: R`assert "hy mty" in lines`, msg: { en: "Ahoy matey should become hy mty", sl: "Ahoy matey naj postane hy mty" } },
              { stdin: ["Shiver me timbers!"], check: R`assert "Shvr m tmbrs!" in lines`, msg: { en: "Shiver me timbers! should become Shvr m tmbrs!", sl: "Shiver me timbers! naj postane Shvr m tmbrs!" } },
            ],
            hints: [
              { en: "Build a new string. Only add characters that are **not** vowels.", sl: "Zgradi nov niz. Dodajaj samo znake, ki **niso** samoglasniki." },
              { en: "~if ch.lower() not in \"aeiou\": result += ch~", sl: "~if ch.lower() not in \"aeiou\": result += ch~" },
            ],
            solution: `text = input("Text? ")\nresult = ""\nfor ch in text:\n    if ch.lower() not in "aeiou":\n        result += ch\nprint(result)\n`,
          },
          {
            id: "s4", type: "predict",
            text: { en: "What prints?", sl: "Kaj se izpiše?" },
            code: `result = ""\nfor ch in "abc":\n    result = ch + result\nprint(result)\n`,
            options: ["abc", "cba", "aabbcc", "c"],
            answer: 1,
            explain: { en: "Each new character is put in **front** of what's there: a, then ba, then cba. Another way to reverse a string.", sl: "Vsak nov znak gre **pred** obstoječe: a, nato ba, nato cba. Še en način, kako obrniti niz." },
          },
        ],
      },
      {
        id: "c5l6",
        title: { en: "Solo Voyage: The Captain's Cipher", sl: "Samostojna plovba: Kapitanova šifra" },
        solo: true,
        steps: [
          {
            id: "s1", type: "story", speaker: "captain",
            text: {
              en: `Spies everywhere on this key. From now on, my orders go out in code.

The oldest trick in the book: shift every letter along the alphabet. With a shift of 3, a becomes d, b becomes e, and z wraps around to c. Give me a program that does it, and one that undoes it with a negative shift.`,
              sl: `Na tem otoku so povsod vohuni. Od zdaj moji ukazi gredo ven šifrirani.

Najstarejši trik: vsako črko premakni po abecedi. S premikom 3 a postane d, b postane e, z pa se zavije nazaj na c. Daj mi program, ki to naredi, in ki z negativnim premikom to razveljavi.`,
            },
          },
          {
            id: "s2", type: "code", kind: "project",
            text: {
              en: `Build a **Caesar cipher**.

**Requirements**
- Ask ~Message? ~ and then ~Shift? ~ (a whole number, can be negative).
- Shift every **letter** by that many places, wrapping around: with shift 2, ~y~ → ~a~.
- Keep the case: capitals stay capitals.
- Anything that isn't a letter (spaces, punctuation, digits) stays exactly the same.
- Print the result on its own line. ~Attack at dawn~ with shift 3 gives:
:::
Dwwdfn dw gdzq
:::`,
              sl: `Zgradi **Cezarjevo šifro**.

**Zahteve**
- Vprašaj ~Message? ~ in nato ~Shift? ~ (celo število, lahko negativno).
- Vsako **črko** premakni za toliko mest, z zavijanjem: s premikom 2 ~y~ → ~a~.
- Ohrani velikost: velike črke ostanejo velike.
- Vse, kar ni črka (presledki, ločila, števke), ostane natanko enako.
- Rezultat izpiši v svoji vrstici. ~Attack at dawn~ s premikom 3 da:
:::
Dwwdfn dw gdzq
:::`,
            },
            starter: `alphabet = "abcdefghijklmnopqrstuvwxyz"\n`,
            stdin: "Attack at dawn\n3",
            tests: [
              { stdin: ["Attack at dawn", "3"], check: R`assert "Dwwdfn dw gdzq" in lines`, msg: { en: "Attack at dawn with shift 3 should give Dwwdfn dw gdzq", sl: "Attack at dawn s premikom 3 naj da Dwwdfn dw gdzq" } },
              { stdin: ["xyz", "2"], check: R`assert "zab" in lines`, msg: { en: "xyz with shift 2 should wrap around to zab", sl: "xyz s premikom 2 naj se zavije v zab" } },
              { stdin: ["Hello, World!", "-1"], check: R`assert "Gdkkn, Vnqkc!" in lines`, msg: { en: "Hello, World! with shift -1 should give Gdkkn, Vnqkc! (punctuation stays, capitals stay).", sl: "Hello, World! s premikom -1 naj da Gdkkn, Vnqkc! (ločila ostanejo, velike črke tudi)." } },
              { stdin: ["Pip 2026", "13"], check: R`assert "Cvc 2026" in lines`, msg: { en: "Pip 2026 with shift 13 should give Cvc 2026 (digits unchanged).", sl: "Pip 2026 s premikom 13 naj da Cvc 2026 (števke nespremenjene)." } },
            ],
            hints: [
              { en: "For each character: if it's a letter, find its position in ~alphabet~ (use the lowercase version), add the shift, and use ~% 26~ to wrap around.", sl: "Za vsak znak: če je črka, poišči njen položaj v ~alphabet~ (z malo različico), prištej premik in uporabi ~% 26~ za zavijanje." },
              { en: "~new = alphabet[(alphabet.find(ch.lower()) + shift) % 26]~. If ~ch.isupper()~, add ~new.upper()~ instead. If ~ch.isalpha()~ is False, add ~ch~ unchanged.", sl: "~new = alphabet[(alphabet.find(ch.lower()) + shift) % 26]~. Če ~ch.isupper()~, dodaj ~new.upper()~. Če je ~ch.isalpha()~ False, dodaj ~ch~ nespremenjen." },
            ],
            solution: `alphabet = "abcdefghijklmnopqrstuvwxyz"\nmessage = input("Message? ")\nshift = int(input("Shift? "))\n\nresult = ""\nfor ch in message:\n    if ch.isalpha():\n        new = alphabet[(alphabet.find(ch.lower()) + shift) % 26]\n        if ch.isupper():\n            new = new.upper()\n        result += new\n    else:\n        result += ch\nprint(result)\n`,
            after: {
              en: "~% 26~ did the wrapping for you, even with negative shifts. Modulo is the programmer's favourite way to make things go round in circles.",
              sl: "~% 26~ je poskrbel za zavijanje, tudi pri negativnih premikih. Modulo je programerjev najljubši način, da gre nekaj v krogu.",
            },
          },
        ],
      },
    ],
  };
})();
