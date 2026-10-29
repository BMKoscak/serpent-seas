/* Serpent Seas — curriculum data.
   Markup in text fields: ~inline code~, **bold**, "- " bullets,
   ::: fenced code blocks :::, blank line = new paragraph. */
(function () {
  const R = String.raw;

  const chapters = [
    {
      id: "c1",
      island: { en: "Tortuga Harbor", sl: "Pristan Tortuga" },
      title: { en: "First Words", sl: "Prve besede" },
      blurb: {
        en: "Wake up on the docks, meet Pip, and make the ship's engine speak. Printing, text, comments, variables and reading error messages.",
        sl: "Zbudiš se na pomolu, spoznaš papigo Pipa in pripraviš ladijski stroj do govora. Izpis, besedilo, komentarji, spremenljivke in branje sporočil o napakah.",
      },
      topics: {
        en: ["print()", "strings", "comments", "variables", "reading errors"],
        sl: ["print()", "nizi", "komentarji", "spremenljivke", "branje napak"],
      },
      log: {
        en: `**Print** shows text on screen. Each ~print~ starts a new line.
:::
print("Ahoy!")
print("Gold:", 30)      # commas add a space between values
:::
**Strings** are text inside quotes: ~"double"~ or ~'single'~ both work. Without quotes, Python calculates: ~print(5 + 3)~ shows ~8~, ~print("5 + 3")~ shows ~5 + 3~.

**Comments** start with ~#~. Python ignores everything after it on that line.

**Variables** are labelled crates that hold a value.
:::
ship = "The Serpent"
crew = 12
crew = 13              # a crate can be refilled
print(ship, crew)
:::
- Names use letters, digits and ~_~, and cannot start with a digit.
- Names are case-sensitive: ~Ship~ and ~ship~ are different crates.
- Python reads top to bottom. Use a variable only after you create it.

**Errors** tell you the type, the line and what went wrong. Read them from the bottom line up. They are directions, not punishment.`,
        sl: `**Print** izpiše besedilo na zaslon. Vsak ~print~ začne novo vrstico.
:::
print("Ahoj!")
print("Zlato:", 30)    # vejice dodajo presledek med vrednostmi
:::
**Nizi** so besedilo v narekovajih: ~"dvojnih"~ ali ~'enojnih'~. Brez narekovajev Python računa: ~print(5 + 3)~ izpiše ~8~, ~print("5 + 3")~ pa ~5 + 3~.

**Komentarji** se začnejo z ~#~. Python prezre vse za tem znakom v isti vrstici.

**Spremenljivke** so označeni zaboji, ki hranijo vrednost.
:::
ladja = "Kača"
posadka = 12
posadka = 13           # zaboj lahko ponovno napolniš
print(ladja, posadka)
:::
- Imena vsebujejo črke, števke in ~_~ ter se ne smejo začeti s števko.
- Velike in male črke so pomembne: ~Ladja~ in ~ladja~ sta različna zaboja.
- Python bere od zgoraj navzdol. Spremenljivko uporabi šele, ko jo ustvariš.

**Napake** povedo vrsto, vrstico in kaj je šlo narobe. Beri jih od spodnje vrstice navzgor. So kažipot, ne kazen.`,
      },
      lessons: [
        {
          id: "c1l1",
          title: { en: "Talking to the Interpreter", sl: "Pogovor s Tolmačem" },
          steps: [
            {
              id: "s1", type: "story", speaker: "pip",
              text: {
                en: `Squawk! You're awake at last. You washed up on the docks of Tortuga last night, and I'm the one who found you. Name's **Pip**.

See that ship with the green sails? That's the **Serpent**, Captain Marlow's ship. Her engine is a brass contraption called **the Interpreter**. It does exactly what it's told, but only if you tell it in **Python**.

The captain needs a deckhand who can talk to it. I'll teach you. By the time we reach the last island, you'll be writing programs all on your own. Ready? Let's make the Interpreter say something.`,
                sl: `Skvak! Končno si buden. Sinoči te je naplavilo na pomol v Tortugi in jaz sem te našel. Ime mi je **Pip**.

Vidiš ladjo z zelenimi jadri? To je **Kača**, ladja kapitana Marlowa. Njen stroj je medeninasta naprava, ki ji pravijo **Tolmač**. Naredi natanko to, kar mu rečeš, a samo če mu rečeš v **Pythonu**.

Kapitan potrebuje mornarja, ki zna govoriti z njim. Jaz te bom naučil. Ko prispemo do zadnjega otoka, boš programe pisal čisto sam. Pripravljen? Naj Tolmač nekaj reče.`,
              },
            },
            {
              id: "s2", type: "learn",
              text: {
                en: `To make the Interpreter speak, use ~print()~. Whatever you put between the parentheses appears in the **output** below the editor.

Text must be wrapped in quotes. Python calls a piece of text a **string**.

- Python runs your lines from **top to bottom**, one at a time.
- Each ~print~ starts on a **new line**.

The example is already in the editor. Press **Run** (or Ctrl+Enter), then change the words and run it again. Nothing here can break the ship.`,
                sl: `Da Tolmač spregovori, uporabi ~print()~. Kar napišeš med oklepaja, se pojavi v **izpisu** pod urejevalnikom.

Besedilo mora biti v narekovajih. Python kos besedila imenuje **niz** (angl. string).

- Python izvaja vrstice **od zgoraj navzdol**, eno za drugo.
- Vsak ~print~ začne v **novi vrstici**.

Primer je že v urejevalniku. Pritisni **Zaženi** (ali Ctrl+Enter), nato spremeni besede in ga zaženi znova. Tu ne moreš ničesar pokvariti.`,
              },
              example: `print("Ahoy!")\nprint("I am a pirate now.")\n`,
            },
            {
              id: "s3", type: "predict",
              text: { en: "What will this program show?", sl: "Kaj bo izpisal ta program?" },
              code: `print("Fish")\nprint("and")\nprint("chips")\n`,
              options: [
                "Fish and chips",
                "Fish\nand\nchips",
                "chips\nand\nFish",
                { en: "Nothing, it needs one print", sl: "Nič, potreben je en sam print" },
              ],
              answer: 1,
              explain: {
                en: "Three ~print~ calls make three lines, in the order they are written. Python never reorders your lines.",
                sl: "Trije klici ~print~ dajo tri vrstice, v vrstnem redu, kot so zapisani. Python vrstic nikoli ne premeša.",
              },
            },
            {
              id: "s4", type: "code", kind: "task",
              text: {
                en: `Your first order. Make the Interpreter say exactly:
:::
Ahoy, Captain!
:::`,
                sl: `Tvoj prvi ukaz. Naj Tolmač izpiše natanko:
:::
Ahoy, Captain!
:::`,
              },
              starter: `# Write your code below this line\n`,
              tests: [
                {
                  check: R`assert "ahoy, captain!" in [norm(l) for l in lines]`,
                  msg: { en: "I don't see a line saying Ahoy, Captain! Check the comma and the exclamation mark.", sl: "Ne vidim vrstice Ahoy, Captain! Preveri vejico in klicaj." },
                },
              ],
              hints: [
                { en: "You need ~print()~, with your text inside it.", sl: "Potrebuješ ~print()~ z besedilom v njem." },
                { en: "Text needs quotes, and the quotes go inside the parentheses: ~print(\"...\")~", sl: "Besedilo potrebuje narekovaje, ti pa gredo znotraj oklepajev: ~print(\"...\")~" },
              ],
              solution: `print("Ahoy, Captain!")\n`,
              after: {
                en: "That is a complete Python program. Real programs are this, repeated and combined.",
                sl: "To je celoten program v Pythonu. Pravi programi so prav to, ponovljeno in sestavljeno.",
              },
            },
            {
              id: "s5", type: "learn",
              text: {
                en: `~print~ can show several things at once. Separate them with **commas**, and Python puts a space between them.

Numbers don't need quotes. ~30~ is a number, ~"30"~ is text that happens to look like one.`,
                sl: `~print~ lahko izpiše več stvari hkrati. Loči jih z **vejicami** in Python mednje postavi presledek.

Števila ne potrebujejo narekovajev. ~30~ je število, ~"30"~ pa besedilo, ki je samo videti kot število.`,
              },
              example: `print("Gold coins:", 30)\nprint("Crew", "of", "the", "Serpent")\nprint()\nprint("An empty print() makes a blank line above me.")\n`,
            },
            {
              id: "s6", type: "code", kind: "task",
              text: {
                en: `The tavern owner wants a new sign. Print these three lines, in this order:
:::
The Rusty Anchor
Grog - 2 coins
No parrots allowed
:::
Pip is offended by the last line, but the customer is always right.`,
                sl: `Lastnik krčme želi nov napis. Izpiši te tri vrstice v tem vrstnem redu:
:::
The Rusty Anchor
Grog - 2 coins
No parrots allowed
:::
Pipa zadnja vrstica užali, a stranka ima vedno prav.`,
              },
              starter: `# Paint the sign, one print per line\n`,
              tests: [
                {
                  check: R`assert [norm(l) for l in clean] == ["the rusty anchor", "grog - 2 coins", "no parrots allowed"]`,
                  msg: { en: "The sign should have exactly three lines: The Rusty Anchor / Grog - 2 coins / No parrots allowed.", sl: "Napis mora imeti natanko tri vrstice: The Rusty Anchor / Grog - 2 coins / No parrots allowed." },
                },
              ],
              hints: [
                { en: "One ~print~ per line of the sign.", sl: "En ~print~ za vsako vrstico napisa." },
                { en: "Three lines, three prints. Watch the spaces around the dash in ~Grog - 2 coins~.", sl: "Tri vrstice, trije printi. Pazi na presledke okoli pomišljaja v ~Grog - 2 coins~." },
              ],
              solution: `print("The Rusty Anchor")\nprint("Grog - 2 coins")\nprint("No parrots allowed")\n`,
            },
          ],
        },
        {
          id: "c1l2",
          title: { en: "When the Interpreter Squawks", sl: "Ko Tolmač zaškripa" },
          steps: [
            {
              id: "s1", type: "learn",
              text: {
                en: `Every programmer, the captain included, sees errors all day. An error is the Interpreter telling you **where** it got confused and **why**.

Run the example. It has a mistake on purpose. Look at three things in the message:

- **The type**, like ~SyntaxError~. Syntax means the grammar of the code.
- **The line number**, so you know where to look.
- **The description** of what went wrong.

Below the raw message, Pip explains it in plain words. Now fix the line so it runs.`,
                sl: `Vsak programer, tudi kapitan, ves dan vidi napake. Napaka je Tolmačev način, da ti pove, **kje** se je zmedel in **zakaj**.

Zaženi primer. Napaka je v njem namenoma. V sporočilu poglej tri stvari:

- **Vrsto**, na primer ~SyntaxError~. Sintaksa pomeni slovnico kode.
- **Številko vrstice**, da veš, kje iskati.
- **Opis**, kaj je šlo narobe.

Pod surovim sporočilom ti Pip razloži napako z navadnimi besedami. Nato popravi vrstico, da bo delovala.`,
              },
              example: `print("Land ho!)\n`, expectError: true,
            },
            {
              id: "s2", type: "code", kind: "debug",
              text: {
                en: "The lookout wrote this, and the Interpreter refuses to run it. Fix it so it prints ~Land ho!~",
                sl: "To je napisal stražar na jamboru, Tolmač pa noče teči. Popravi, da izpiše ~Land ho!~",
              },
              starter: `print("Land ho!)\n`,
              tests: [
                { check: R`assert "land ho!" in [norm(l) for l in lines]`, msg: { en: "It should print Land ho!", sl: "Izpisati mora Land ho!" } },
              ],
              hints: [
                { en: "Read the error: a string was started but never ended.", sl: "Preberi napako: niz se je začel, a se ni nikoli končal." },
                { en: "Every opening quote needs a closing quote before the ~)~.", sl: "Vsak začetni narekovaj potrebuje zaključnega pred ~)~." },
              ],
              solution: `print("Land ho!")\n`,
            },
            {
              id: "s3", type: "code", kind: "debug",
              text: {
                en: "The bosun shouts his orders. Python doesn't like it. Fix the code so it prints ~Raise the sails!~",
                sl: "Vodja palube kriči ukaze. Pythonu to ni všeč. Popravi kodo, da izpiše ~Raise the sails!~",
              },
              starter: `Print("Raise the sails!")\n`,
              tests: [
                { check: R`assert "raise the sails!" in [norm(l) for l in lines]`, msg: { en: "It should print Raise the sails!", sl: "Izpisati mora Raise the sails!" } },
              ],
              hints: [
                { en: "~NameError~ means Python doesn't know a name. Which name is it complaining about?", sl: "~NameError~ pomeni, da Python ne pozna nekega imena. Katero ime ga moti?" },
                { en: "Python is case-sensitive. ~Print~ and ~print~ are different words to it.", sl: "Python loči velike in male črke. ~Print~ in ~print~ sta zanj različni besedi." },
              ],
              solution: `print("Raise the sails!")\n`,
            },
            {
              id: "s4", type: "predict",
              text: { en: "Quotes change everything. What does this show?", sl: "Narekovaji spremenijo vse. Kaj se izpiše?" },
              code: `print(5 + 3)\nprint("5 + 3")\n`,
              options: ["8\n8", "5 + 3\n5 + 3", "8\n5 + 3", { en: "An error", sl: "Napaka" }],
              answer: 2,
              explain: {
                en: "Without quotes, Python **calculates** ~5 + 3~. With quotes it's just text, shown exactly as written.",
                sl: "Brez narekovajev Python ~5 + 3~ **izračuna**. Z narekovaji je to le besedilo, izpisano točno tako, kot je zapisano.",
              },
            },
            {
              id: "s5", type: "code", kind: "debug",
              text: {
                en: "One more for the bug hunter. This should greet new crew. Make it print ~Welcome aboard, sailor~",
                sl: "Še ena za lovca na hrošče. To naj pozdravi novo posadko. Naj izpiše ~Welcome aboard, sailor~",
              },
              starter: `print("Welcome aboard, sailor"\n`,
              tests: [
                { check: R`assert "welcome aboard, sailor" in [norm(l) for l in lines]`, msg: { en: "It should print Welcome aboard, sailor", sl: "Izpisati mora Welcome aboard, sailor" } },
              ],
              hints: [
                { en: "The error says something was \"never closed\". What opens, and must close?", sl: "Napaka pravi, da nekaj \"ni bilo nikoli zaprto\". Kaj se odpre in mora zapreti?" },
                { en: "Parentheses come in pairs. Count the ~(~ and the ~)~.", sl: "Oklepaji so v parih. Preštej ~(~ in ~)~." },
              ],
              solution: `print("Welcome aboard, sailor")\n`,
              after: {
                en: "Habit worth keeping: when you open a quote or bracket, close it right away, then type inside.",
                sl: "Navada, ki se splača: ko odpreš narekovaj ali oklepaj, ga takoj zapri, nato piši vmes.",
              },
            },
          ],
        },
        {
          id: "c1l3",
          title: { en: "Notes in the Margin", sl: "Zapiski na robu" },
          steps: [
            {
              id: "s1", type: "learn",
              text: {
                en: `A **comment** starts with ~#~. The Interpreter skips everything after the ~#~ on that line.

Comments are for humans: explain *why* something is there, or switch a line off without deleting it. Programmers call that **commenting out** a line.`,
                sl: `**Komentar** se začne z ~#~. Tolmač preskoči vse, kar je za ~#~ v tej vrstici.

Komentarji so za ljudi: z njimi razložiš, *zakaj* je nekaj tam, ali izklopiš vrstico, ne da bi jo izbrisal. Temu programerji pravijo **zakomentirati** vrstico.`,
              },
              example: `# Captain's orders for the morning\nprint("Swab the deck")\n# print("Feed the parrot")   <- switched off\nprint("Check the rigging")  # comments can sit at the end too\n`,
            },
            {
              id: "s2", type: "code", kind: "task",
              text: {
                en: `Spies are listening on the dock. The program reveals where the treasure is buried.

Turn the secret line into a comment so only the first and last lines are printed. **Don't delete it**: the captain will want it back later.`,
                sl: `Na pomolu prisluškujejo vohuni. Program izda, kje je zakopan zaklad.

Skrivno vrstico spremeni v komentar, da se izpišeta le prva in zadnja vrstica. **Ne briši je**: kapitan jo bo kasneje potreboval.`,
              },
              starter: `print("Supplies: rope, rum, biscuits")\nprint("The treasure is under the crooked palm tree")\nprint("Departure at dawn")\n`,
              tests: [
                {
                  check: R`assert [norm(l) for l in clean] == ["supplies: rope, rum, biscuits", "departure at dawn"]`,
                  msg: { en: "Only the supplies line and the departure line should be printed.", sl: "Izpisati se morata samo vrstica z zalogami in vrstica z odhodom." },
                },
                {
                  check: R`assert "crooked palm tree" in code and "#" in code`,
                  msg: { en: "The secret line is gone. Comment it out with # instead of deleting it.", sl: "Skrivne vrstice ni več. Zakomentiraj jo z # namesto brisanja." },
                },
              ],
              hints: [
                { en: "Put a ~#~ somewhere that makes Python ignore the middle line.", sl: "Postavi ~#~ tja, kjer bo Python prezrl srednjo vrstico." },
                { en: "Put ~#~ at the very start of the second line.", sl: "Postavi ~#~ čisto na začetek druge vrstice." },
              ],
              solution: `print("Supplies: rope, rum, biscuits")\n# print("The treasure is under the crooked palm tree")\nprint("Departure at dawn")\n`,
            },
            {
              id: "s3", type: "predict",
              text: { en: "What gets printed?", sl: "Kaj se izpiše?" },
              code: `# print("Yo ho")\nprint("Ho yo")  # print("Yo yo")\n`,
              options: ["Yo ho\nHo yo", "Ho yo", "Ho yo Yo yo", { en: "Nothing at all", sl: "Prav nič" }],
              answer: 1,
              explain: {
                en: "The first line is fully commented. On the second line, only the part after ~#~ is ignored, so ~print(\"Ho yo\")~ still runs.",
                sl: "Prva vrstica je v celoti komentar. V drugi se prezre le del za ~#~, zato se ~print(\"Ho yo\")~ še vedno izvede.",
              },
            },
          ],
        },
        {
          id: "c1l4",
          title: { en: "The Cargo Hold", sl: "Tovorni prostor" },
          steps: [
            {
              id: "s1", type: "story", speaker: "captain",
              text: {
                en: `So you're Pip's new student. I'm Captain Marlow.

Down in the hold we keep everything in crates, and every crate has a label burned into the lid. Need rope? You don't search the whole ship. You look for the crate marked ~rope~.

The Interpreter works the same way. Those labelled crates are called **variables**. Learn them well, sailor. Every program you'll ever write is full of them.`,
                sl: `Ti si torej Pipov novi učenec. Jaz sem kapitan Marlow.

Spodaj v tovornem prostoru vse hranimo v zabojih in vsak zaboj ima na pokrovu vžgano oznako. Potrebuješ vrv? Ne preiskuješ cele ladje. Poiščeš zaboj z oznako ~vrv~.

Tolmač dela enako. Tem označenim zabojem pravimo **spremenljivke**. Dobro se jih nauči, mornar. Vsak program, ki ga boš kdaj napisal, je poln njih.`,
              },
            },
            {
              id: "s2", type: "learn",
              text: {
                en: `Create a variable with a **name**, an **equals sign** and a **value**:
:::
cargo = "rum"
:::
Read ~=~ as "put into", not "equals". Put ~"rum"~ into the crate called ~cargo~.

To use it, write the name **without quotes**. You can refill a crate at any time, and the old value is thrown overboard.

Naming rules:
- Letters, digits and underscores only. No spaces.
- Can't start with a digit: ~mate2~ works, ~2mate~ doesn't.
- Case matters: ~Ship~ and ~ship~ are different crates.
- Pythonistas write multi-word names in ~snake_case~, like ~ship_name~.`,
                sl: `Spremenljivko ustvariš z **imenom**, **enačajem** in **vrednostjo**:
:::
tovor = "rum"
:::
~=~ beri kot "daj v", ne kot "je enako". Daj ~"rum"~ v zaboj z imenom ~tovor~.

Ko jo uporabiš, napiši ime **brez narekovajev**. Zaboj lahko kadarkoli ponovno napolniš, stara vrednost pa gre čez krov.

Pravila za imena:
- Samo črke, števke in podčrtaji. Brez presledkov.
- Ne smejo se začeti s števko: ~mornar2~ deluje, ~2mornar~ ne.
- Velikost črk šteje: ~Ladja~ in ~ladja~ sta različna zaboja.
- Imena iz več besed pišemo v slogu ~snake_case~, na primer ~ime_ladje~.`,
              },
              example: `ship = "The Serpent"\ncrew = 12\nprint(ship)\nprint("Crew:", crew)\n\ncrew = 13   # a new sailor joined\nprint("Crew:", crew)\n`,
            },
            {
              id: "s3", type: "predict",
              text: { en: "What does this print?", sl: "Kaj izpiše ta koda?" },
              code: `treasure = "gold"\ntreasure = "silver"\nprint(treasure)\n`,
              options: ["gold", "silver", "gold\nsilver", "treasure"],
              answer: 1,
              explain: {
                en: "A variable holds one value at a time. The second line replaced ~\"gold\"~ with ~\"silver\"~ before the print happened.",
                sl: "Spremenljivka hrani eno vrednost naenkrat. Druga vrstica je ~\"gold\"~ zamenjala s ~\"silver\"~, preden se je zgodil izpis.",
              },
            },
            {
              id: "s4", type: "predict",
              text: { en: "Careful now. What does this print?", sl: "Previdno. Kaj izpiše ta koda?" },
              code: `name = "Pip"\nprint("name")\n`,
              options: ["Pip", "name", "\"name\"", { en: "An error", sl: "Napaka" }],
              answer: 1,
              explain: {
                en: "The quotes make ~\"name\"~ plain text, so the crate is never opened. To show what's inside, write ~print(name)~ without quotes.",
                sl: "Zaradi narekovajev je ~\"name\"~ navadno besedilo, zato zaboja sploh ne odpremo. Za izpis vsebine napiši ~print(name)~ brez narekovajev.",
              },
            },
            {
              id: "s5", type: "code", kind: "task",
              text: {
                en: `Fill in the ship's papers.

1. Create a variable ~captain~ holding ~"Marlow"~.
2. Create a variable ~ship~ holding ~"The Serpent"~.
3. Using those variables (not typing the names again), print:
:::
Captain: Marlow
Ship: The Serpent
:::`,
                sl: `Izpolni ladijske listine.

1. Ustvari spremenljivko ~captain~ z vrednostjo ~"Marlow"~.
2. Ustvari spremenljivko ~ship~ z vrednostjo ~"The Serpent"~.
3. S pomočjo teh spremenljivk (imen ne tipkaj znova) izpiši:
:::
Captain: Marlow
Ship: The Serpent
:::`,
              },
              starter: `# 1. create the variables\n\n# 2. print using them\n`,
              tests: [
                { check: R`assert ns.get("captain") == "Marlow"`, msg: { en: "Create a variable named captain holding \"Marlow\".", sl: "Ustvari spremenljivko captain z vrednostjo \"Marlow\"." } },
                { check: R`assert ns.get("ship") == "The Serpent"`, msg: { en: "Create a variable named ship holding \"The Serpent\".", sl: "Ustvari spremenljivko ship z vrednostjo \"The Serpent\"." } },
                { check: R`assert [norm(l) for l in clean] == ["captain: marlow", "ship: the serpent"]`, msg: { en: "The output should be two lines: Captain: Marlow and Ship: The Serpent.", sl: "Izpis naj bosta dve vrstici: Captain: Marlow in Ship: The Serpent." } },
                {
                  check: R`import re
assert re.search(r"print\([^\n]*\bcaptain\b", code) and re.search(r"print\([^\n]*\bship\b", code)`,
                  msg: { en: "Right output, but print it using the variables, like print(\"Captain:\", captain).", sl: "Izpis je pravi, a uporabi spremenljivke, na primer print(\"Captain:\", captain)." },
                },
              ],
              hints: [
                { en: "Create each variable with ~name = value~, then print a label and the variable separated by a comma.", sl: "Vsako spremenljivko ustvari z ~ime = vrednost~, nato izpiši oznako in spremenljivko, ločeni z vejico." },
                { en: "The first print could be ~print(\"Captain:\", captain)~. The comma adds the space for you.", sl: "Prvi print je lahko ~print(\"Captain:\", captain)~. Vejica sama doda presledek." },
              ],
              solution: `captain = "Marlow"\nship = "The Serpent"\n\nprint("Captain:", captain)\nprint("Ship:", ship)\n`,
              after: {
                en: "Now if the captain changes, you edit one line and every print follows. That's why variables exist.",
                sl: "Če se kapitan zamenja, popraviš eno vrstico in vsi izpisi ji sledijo. Zato spremenljivke obstajajo.",
              },
            },
            {
              id: "s6", type: "code", kind: "debug",
              text: {
                en: "The navigator was in a hurry. Fix the program so it prints ~We sail on The Serpent~",
                sl: "Krmar se je mudil. Popravi program, da izpiše ~We sail on The Serpent~",
              },
              starter: `ship_name = "The Serpent"\nprint("We sail on", ship_nmae)\n`,
              tests: [
                { check: R`assert "we sail on the serpent" in [norm(l) for l in lines]`, msg: { en: "It should print We sail on The Serpent", sl: "Izpisati mora We sail on The Serpent" } },
              ],
              hints: [
                { en: "Python says it doesn't know a name. Compare that name with the one created on line 1.", sl: "Python pravi, da ne pozna imena. Primerjaj ga z imenom, ustvarjenim v 1. vrstici." },
                { en: "Two letters are swapped in ~ship_nmae~.", sl: "V ~ship_nmae~ sta zamenjani dve črki." },
              ],
              solution: `ship_name = "The Serpent"\nprint("We sail on", ship_name)\n`,
            },
            {
              id: "s7", type: "code", kind: "debug",
              text: {
                en: "This one breaks a naming rule. Rename the variable so the program prints ~Second mate: Anne~",
                sl: "Tu je kršeno pravilo poimenovanja. Preimenuj spremenljivko, da program izpiše ~Second mate: Anne~",
              },
              starter: `2nd_mate = "Anne"\nprint("Second mate:", 2nd_mate)\n`,
              tests: [
                { check: R`assert "second mate: anne" in [norm(l) for l in lines]`, msg: { en: "It should print Second mate: Anne", sl: "Izpisati mora Second mate: Anne" } },
              ],
              hints: [
                { en: "Which naming rule does ~2nd_mate~ break? Look at its first character.", sl: "Katero pravilo krši ~2nd_mate~? Poglej prvi znak." },
                { en: "Try ~second_mate~, and change it in **both** places.", sl: "Poskusi ~second_mate~ in ga spremeni na **obeh** mestih." },
              ],
              solution: `second_mate = "Anne"\nprint("Second mate:", second_mate)\n`,
            },
          ],
        },
        {
          id: "c1l5",
          title: { en: "Solo Voyage: Wanted Poster", sl: "Samostojna plovba: Tiralica" },
          solo: true,
          steps: [
            {
              id: "s1", type: "story", speaker: "pip",
              text: {
                en: `Squawk! A **Solo Voyage**. Every island ends with one.

No starter code and no step-by-step. Just an order, like a real programmer gets. The hints only point a direction. Use what you learned on this island, and if you forget something, open the **Captain's Log** from the top bar. Looking things up is what real programmers do all day.`,
                sl: `Skvak! **Samostojna plovba**. Vsak otok se konča z eno.

Brez začetne kode in brez navodil po korakih. Samo naročilo, kot ga dobi pravi programer. Namigi le pokažejo smer. Uporabi, kar si se naučil na tem otoku, in če kaj pozabiš, odpri **Kapitanov dnevnik** v zgornji vrstici. Iskanje po zapiskih je nekaj, kar programerji počnejo ves dan.`,
              },
            },
            {
              id: "s2", type: "code", kind: "project",
              text: {
                en: `The harbor master wants a wanted poster for a notorious pirate. Pick any pirate you like.

**Requirements**
- Three variables: ~name~, ~crime~ and ~reward~. All three hold text (strings).
- Print the poster using those variables, in this shape:
:::
==========
WANTED
Name: Calico Jane
Crime: Stealing the governor's cat
Reward: 500 doubloons
==========
:::
- The border lines are made of ~=~ signs (at least 5).
- Use your own pirate. The checker reads your variables.`,
                sl: `Pristaniški mojster želi tiralico za zloglasnega pirata. Izberi kateregakoli pirata.

**Zahteve**
- Tri spremenljivke: ~name~, ~crime~ in ~reward~. Vse tri hranijo besedilo (nize).
- Izpiši tiralico z uporabo teh spremenljivk, v tej obliki:
:::
==========
WANTED
Name: Calico Jane
Crime: Stealing the governor's cat
Reward: 500 doubloons
==========
:::
- Robni vrstici sta iz znakov ~=~ (vsaj 5).
- Uporabi svojega pirata. Preverjevalnik prebere tvoje spremenljivke.`,
              },
              starter: `# Solo voyage: no training wheels this time.\n`,
              tests: [
                {
                  check: R`assert all(isinstance(ns.get(v), str) and ns.get(v).strip() for v in ("name", "crime", "reward"))`,
                  msg: { en: "Create three variables called name, crime and reward, each holding some text in quotes.", sl: "Ustvari tri spremenljivke name, crime in reward, vsaka naj hrani besedilo v narekovajih." },
                },
                {
                  check: R`assert len(clean) == 6`,
                  msg: { en: "The poster should be exactly 6 lines: border, WANTED, Name, Crime, Reward, border.", sl: "Tiralica naj ima natanko 6 vrstic: rob, WANTED, Name, Crime, Reward, rob." },
                },
                {
                  check: R`assert all(len(b) >= 5 and set(b) == {"="} for b in (clean[0], clean[-1]))`,
                  msg: { en: "The first and last lines should be borders made only of = signs, at least 5 of them.", sl: "Prva in zadnja vrstica naj bosta robova samo iz znakov =, vsaj 5." },
                },
                {
                  check: R`assert clean[1] == "WANTED"`,
                  msg: { en: "The second line should say WANTED, in capitals.", sl: "Druga vrstica naj se glasi WANTED, z velikimi črkami." },
                },
                {
                  check: R`assert norm(clean[2]) == norm("Name: " + ns["name"]) and norm(clean[3]) == norm("Crime: " + ns["crime"]) and norm(clean[4]) == norm("Reward: " + ns["reward"])`,
                  msg: { en: "Lines 3 to 5 should be Name: ..., Crime: ... and Reward: ..., showing what's in your variables.", sl: "Vrstice od 3 do 5 naj bodo Name: ..., Crime: ... in Reward: ... z vsebino tvojih spremenljivk." },
                },
                {
                  check: R`import re
assert all(re.search(r"print\([^\n]*\b" + v + r"\b", code) for v in ("name", "crime", "reward"))`,
                  msg: { en: "The poster looks right, but print the variables instead of typing their values a second time.", sl: "Tiralica je videti prav, a izpiši spremenljivke, namesto da vrednosti tipkaš drugič." },
                },
              ],
              hints: [
                { en: "Split it in two: first create the three variables, then write the six prints, top to bottom.", sl: "Razdeli na dva dela: najprej ustvari tri spremenljivke, nato napiši šest printov od zgoraj navzdol." },
                { en: "Lines 3 to 5 each combine a label and a variable. You did exactly this with the ship's papers in The Cargo Hold.", sl: "Vrstice od 3 do 5 združijo oznako in spremenljivko. Točno to si naredil pri ladijskih listinah v Tovornem prostoru." },
              ],
              solution: `name = "Calico Jane"\ncrime = "Stealing the governor's cat"\nreward = "500 doubloons"\n\nprint("==========")\nprint("WANTED")\nprint("Name:", name)\nprint("Crime:", crime)\nprint("Reward:", reward)\nprint("==========")\n`,
              after: {
                en: "You built that from an empty editor. That's the skill this whole voyage is about.",
                sl: "To si zgradil iz praznega urejevalnika. Prav za to veščino gre na tej plovbi.",
              },
            },
          ],
        },
      ],
    },
  ];

  // Islands still being charted: shown on the map with their syllabus.
  const upcoming = [
    ["c2", "Doubloon Docks", "Pristan dublonov", "Numbers & Input", "Števila in vnos", ["int & float", "arithmetic", "// and %", "type conversion", "input()"], ["int in float", "računanje", "// in %", "pretvorba tipov", "input()"]],
    ["c3", "Fork-Tongue Strait", "Ožina razcepljenega jezika", "Decisions", "Odločitve", ["booleans", "comparisons", "if / elif / else", "and, or, not"], ["logične vrednosti", "primerjave", "if / elif / else", "and, or, not"]],
    ["c4", "Whirlpool Reef", "Greben vrtincev", "Loops", "Zanke", ["while", "for", "range()", "break & continue", "nested loops"], ["while", "for", "range()", "break in continue", "gnezdene zanke"]],
    ["c5", "Rope-Knot Key", "Otok vozlov", "Strings in Depth", "Nizi v globino", ["indexing", "slicing", "string methods", "f-strings"], ["indeksiranje", "rezanje", "metode nizov", "f-nizi"]],
    ["c6", "Cargo Cove", "Tovorni zaliv", "Lists & Tuples", "Seznami in terke", ["lists", "append & remove", "looping lists", "tuples", "unpacking"], ["seznami", "append in remove", "zanke po seznamih", "terke", "razpakiranje"]],
    ["c7", "Lockbox Lagoon", "Laguna skrinjic", "Dictionaries & Sets", "Slovarji in množice", ["dict", "keys & values", "looping dicts", "sets", "nested data"], ["slovarji", "ključi in vrednosti", "zanke po slovarjih", "množice", "gnezdeni podatki"]],
    ["c8", "Spellwright Shoals", "Plitvine urokov", "Functions", "Funkcije", ["def", "parameters", "return", "scope", "default arguments"], ["def", "parametri", "return", "doseg", "privzeti argumenti"]],
    ["c9", "Stormwall Rock", "Viharna skala", "Errors & Files", "Napake in datoteke", ["try / except", "raise", "reading files", "writing files"], ["try / except", "raise", "branje datotek", "pisanje datotek"]],
    ["c10", "Tinkerer's Atoll", "Atol mojstrov", "Modules & Tricks", "Moduli in triki", ["import", "random & math", "comprehensions", "lambda & sorted"], ["import", "random in math", "izpeljani seznami", "lambda in sorted"]],
    ["c11", "Blueprint Bay", "Zaliv načrtov", "Classes & Objects", "Razredi in objekti", ["class", "__init__", "self", "methods", "__str__"], ["class", "__init__", "self", "metode", "__str__"]],
    ["c12", "Bloodline Isle", "Otok rodovnikov", "Inheritance & Polymorphism", "Dedovanje in polimorfizem", ["inheritance", "super()", "overriding", "polymorphism", "composition"], ["dedovanje", "super()", "prekrivanje", "polimorfizem", "kompozicija"]],
    ["c13", "Gilded Gears", "Pozlačeni zobniki", "Pythonic Objects", "Pythonski objekti", ["dunder methods", "@property", "classmethod & staticmethod", "encapsulation"], ["dunder metode", "@property", "classmethod in staticmethod", "enkapsulacija"]],
    ["c14", "Crown of Objects", "Krona objektov", "Advanced OOP & Capstone", "Napredni OOP in zaključni projekt", ["dataclasses", "abstract classes", "iterators & generators", "decorators", "capstone project"], ["podatkovni razredi", "abstraktni razredi", "iteratorji in generatorji", "dekoratorji", "zaključni projekt"]],
  ];
  const ext = window.SS_ISLANDS || {};
  for (const u of upcoming) {
    const x = ext[u[0]];
    chapters.push({
      id: u[0], island: { en: u[1], sl: u[2] }, title: { en: u[3], sl: u[4] },
      topics: { en: u[5], sl: u[6] },
      blurb: x && x.blurb, log: x && x.log, lessons: x ? x.lessons : [], charting: !x,
    });
  }

  // Placement test: a few predict questions per island. Passing all of an
  // island's questions marks it as "charted" so the learner can skip ahead.
  const placement = [
    { ch: "c1", code: `x = "sea"\nprint("x", x)\n`, options: ["x sea", "sea sea", "x x", "xsea"], answer: 0 },
    { ch: "c1", code: `# print("A")\nprint("B")\n`, options: ["A\nB", "B", "A", { en: "An error", sl: "Napaka" }], answer: 1 },
    { ch: "c2", code: `print(7 // 2, 7 % 2)\n`, options: ["3.5 1", "3 1", "3 0.5", "4 1"], answer: 1 },
    { ch: "c2", code: `print("4" + "2")\n`, options: ["6", "42", "4 2", { en: "An error", sl: "Napaka" }], answer: 1 },
    { ch: "c3", code: `n = 15\nif n > 10 and n % 2 == 0:\n    print("A")\nelif n > 10:\n    print("B")\nelse:\n    print("C")\n`, options: ["A", "B", "C", "A\nB"], answer: 1 },
    { ch: "c3", code: `print(not (3 > 2 or 1 > 2))\n`, options: ["True", "False", "1", { en: "An error", sl: "Napaka" }], answer: 1 },
    { ch: "c4", code: `total = 0\nfor i in range(1, 4):\n    total += i\nprint(total)\n`, options: ["6", "10", "3", "4"], answer: 0 },
    { ch: "c4", code: `n = 0\nwhile n < 10:\n    n += 3\nprint(n)\n`, options: ["9", "10", "12", "3"], answer: 2 },
    { ch: "c5", code: `s = "PIRATE"\nprint(s[1:4], s[-1])\n`, options: ["IRA E", "PIR E", "IRAT E", "IRA T"], answer: 0 },
    { ch: "c5", code: `name = "anne"\nprint(f"{name.title()}:{len(name):>3}")\n`, options: ["Anne:  4", "anne:4", "Anne:4  ", "ANNE:  4"], answer: 0 },
    { ch: "c6", code: `a = [3, 1, 2]\nb = a\nb.append(0)\nprint(len(a), sorted(a)[0])\n`, options: ["3 1", "4 0", "4 3", "3 0"], answer: 1 },
    { ch: "c6", code: `x, y = (1, 2)\nprint([y, x] * 2)\n`, options: ["[2, 1, 2, 1]", "[4, 2]", "[1, 2, 1, 2]", "[2, 1]"], answer: 0 },
    { ch: "c7", code: `d = {"a": 1}\nd["b"] = d.get("a", 0) + 1\nprint(d)\n`, options: ["{'a': 1, 'b': 2}", "{'a': 1, 'b': 1}", "{'b': 2}", { en: "An error", sl: "Napaka" }], answer: 0 },
    { ch: "c7", code: `print(len({1, 2, 2, 3} | {3, 4}))\n`, options: ["6", "4", "5", "1"], answer: 1 },
    { ch: "c8", code: `def f(x, y=2):\n    return x * y\n\nprint(f(3), f(3, y=4))\n`, options: ["6 12", "5 7", "6 6", "32 34"], answer: 0 },
    { ch: "c8", code: `def g(n):\n    if n > 0:\n        return "pos"\n\nprint(g(-1))\n`, options: ["pos", "None", "neg", { en: "An error", sl: "Napaka" }], answer: 1 },
    { ch: "c9", code: `try:\n    print(int("x"))\nexcept ValueError:\n    print("bad")\nfinally:\n    print("end")\n`, options: ["bad\nend", "x\nend", "bad", "end"], answer: 0 },
    { ch: "c10", code: `print([n * 2 for n in range(4) if n != 2])\n`, options: ["[0, 2, 6]", "[0, 2, 4, 6]", "[2, 6]", "[0, 1, 3]"], answer: 0 },
    { ch: "c10", code: `print(sorted(["bb", "a", "ccc"], key=len, reverse=True)[0])\n`, options: ["a", "bb", "ccc", "3"], answer: 2 },
    { ch: "c11", code: `class A:\n    n = 0\n    def __init__(self):\n        A.n += 1\n\nA()\nA()\nprint(A.n)\n`, options: ["0", "1", "2", { en: "An error", sl: "Napaka" }], answer: 2 },
  ];

  const ranks = [
    [0, "Stowaway", "Slepi potnik"], [40, "Deckhand", "Mornar"], [120, "Swabbie", "Brisač palube"],
    [250, "Powder Monkey", "Smodničar"], [450, "Gunner", "Topničar"], [700, "Bosun", "Vodja palube"],
    [1000, "Navigator", "Krmar"], [1400, "Quartermaster", "Intendant"], [1900, "First Mate", "Prvi častnik"],
    [2500, "Captain", "Kapitan"], [3300, "Pirate Legend", "Piratska legenda"],
  ];

  window.CURRICULUM = { chapters, placement, ranks };
})();
