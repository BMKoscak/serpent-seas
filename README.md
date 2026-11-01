# 🦜 Serpent Seas

**Learn Python on the high seas.** A pirate adventure that takes you from your very first `print()` to object-oriented programming, with real Python running right in your browser.

▶ **Play:** https://thebenn.me/serpent-seas/

## What's aboard

- **14 islands, 81 lessons, 146 coding challenges:** printing and variables, conditions, loops, functions, lists, dictionaries, files, errors, modules, classes, inheritance, dataclasses and more. The voyage ends with you building your own text adventure engine.
- **Real Python** (CPython via Pyodide in a Web Worker): no install, and nothing is sent to a server.
- **Hidden tests and tiered hints:** you get a nudge, then a stronger nudge, and only then the solution.
- **Debugging challenges and mini-projects**, plus a free-play Workshop.
- **Placement test**, so experienced sailors can skip ahead.
- **English and Slovenian**, switchable at any time.
- **A living 3D sea chart**: sail your galleon between 14 islands on an animated ocean, with fog over uncharted waters, a ghost ship and a sea serpent guarding the last island.
- **Celebrations**: cannon salutes and fireworks when you finish lessons and conquer islands.
- **Pip the parrot**: a sarcastic, voiced companion with 84 lines per language. He jokes about your specific errors (IndentationError, NameError...), cheers your wins and begs for crackers. Plus an original soundtrack, sound effects and ocean ambience.
- Progress is saved in your browser and can be exported or imported as a save code.

## Running locally

Any static file server works (the Python runner uses a Web Worker, so `file://` won't do):

```
python -m http.server 8000
```

Then open http://localhost:8000.

## Project layout

| Path | What it is |
|---|---|
| `index.html` | the app (built from `src/index.src.html`) |
| `islands/`, `lessons.js` | curriculum content, both languages |
| `runner.js`, `harness.py` | Python worker and the test harness |
| `audio.js` | sound engine (recorded samples with a synthesized fallback) |
| `sea3d.js`, `lib/` | 3D sea chart and celebrations (three.js r170) |
| `models/` | Kenney Pirate Kit models (`.glb`, renamed `.glb.wasm` so every static host serves them) |
| `sfx/`, `music/`, `voice2/` | audio |
| `pyodide/` | self-hosted Pyodide 0.26.4 (the stdlib archive is renamed `.zip.wasm`) |

## Credits

- Python runtime: [Pyodide](https://pyodide.org) (MPL-2.0)
- Code editor: [CodeMirror 5](https://codemirror.net) (MIT)
- 3D: [three.js](https://threejs.org) (MIT) and the [Kenney Pirate Kit](https://kenney.nl/assets/pirate-kit) (CC0)
- Music, sound effects and Pip's voice were generated with [ElevenLabs](https://elevenlabs.io)
- Built by Ben Koščak ([@BMKoscak](https://github.com/BMKoscak)) with Claude
