/* Serpent Seas — sound engine.
   Recorded samples (sfx/, music/, voice/) are loaded after the first click and
   used when available; the synthesized versions below are the fallback. */
(function () {
  "use strict";
  const prefs = { music: true, sfx: true, ambience: true, voice: true, musicVol: 0.5, sfxVol: 0.7 };
  let ctx = null, master, sfxBus, musicBus, ambBus, voiceBus, duckBus, voiceAn, verbSend, noiseBuf, synthOcean;
  const buf = {};            // name -> AudioBuffer
  const loading = {};        // url -> Promise
  const SFX = ["squawk", "squawk2", "chatter", "whistle", "wings", "coin", "coins", "chest", "page", "click",
    "whoosh", "thud", "fail", "bell", "cannon", "anchor", "gulls", "splash", "sparkle", "victory"];
  let scene = "map", unlocked = false, timer = null;
  const tracks = {};

  /* ---------- setup ---------- */
  function init() {
    if (ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = 0.9;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14; comp.ratio.value = 4;
    master.connect(comp).connect(ctx.destination);
    sfxBus = ctx.createGain(); sfxBus.connect(master);
    duckBus = ctx.createGain(); duckBus.connect(master);
    musicBus = ctx.createGain(); musicBus.connect(duckBus);
    ambBus = ctx.createGain(); ambBus.connect(master);
    voiceBus = ctx.createGain(); voiceBus.gain.value = 1;
    voiceAn = ctx.createAnalyser(); voiceAn.fftSize = 512;
    voiceBus.connect(voiceAn); voiceBus.connect(master);
    // reverb from a generated impulse response
    const verb = ctx.createConvolver();
    const len = ctx.sampleRate * 2.4, ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2); }
    verb.buffer = ir;
    verbSend = ctx.createGain(); verbSend.gain.value = 0.32;
    verbSend.connect(verb).connect(master);
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const nd = noiseBuf.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    tracks.shanty = makeTrack(shantyStep, 0.2);
    tracks.calm = makeTrack(calmStep, 0.42);
    makeOcean();
    applyPrefs();
  }
  function unlock() {
    if (unlocked) return;
    init();
    if (!ctx) return;
    ctx.resume().then(() => { unlocked = true; startScheduler(); applyPrefs(); preload(); });
  }
  ["pointerdown", "keydown", "touchstart"].forEach((ev) => window.addEventListener(ev, unlock, { capture: true, passive: true }));
  document.addEventListener("visibilitychange", () => {
    if (!ctx) return;
    if (document.hidden) ctx.suspend(); else if (unlocked) ctx.resume();
  });

  const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
  function env(g, t, a, peak, d, end = 0.0001) {
    g.gain.cancelScheduledValues(t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(peak, 0.0002), t + a);
    g.gain.exponentialRampToValueAtTime(end, t + a + d);
  }
  function osc(type, freq, t, dur, vol, dest, opts = {}) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t);
    if (opts.slide) o.frequency.exponentialRampToValueAtTime(opts.slide, t + dur);
    if (opts.detune) o.detune.value = opts.detune;
    if (opts.vib) {
      const l = ctx.createOscillator(), lg = ctx.createGain();
      l.frequency.value = opts.vib; lg.gain.value = opts.vibDepth || 6;
      l.connect(lg).connect(o.detune); l.start(t); l.stop(t + dur + 0.1);
    }
    env(g, t, opts.attack || 0.005, vol, dur);
    let node = o.connect(g);
    if (opts.filter) { const f = ctx.createBiquadFilter(); f.type = opts.filterType || "lowpass"; f.frequency.value = opts.filter; f.Q.value = opts.q || 0.7; node = g.connect(f); }
    node.connect(dest);
    if (opts.verb) node.connect(verbSend);
    o.start(t); o.stop(t + (opts.attack || 0.005) + dur + 0.05);
    return o;
  }
  function noise(t, dur, vol, dest, opts = {}) {
    const s = ctx.createBufferSource(), g = ctx.createGain(), f = ctx.createBiquadFilter();
    s.buffer = noiseBuf; f.type = opts.type || "bandpass"; f.frequency.setValueAtTime(opts.from || 1200, t);
    if (opts.to) f.frequency.exponentialRampToValueAtTime(opts.to, t + dur);
    f.Q.value = opts.q || 1;
    env(g, t, opts.attack || 0.01, vol, dur);
    s.connect(f).connect(g).connect(dest);
    if (opts.verb) g.connect(verbSend);
    s.start(t); s.stop(t + dur + 0.1);
  }

  /* ---------- effects ---------- */
  const fx = {
    click(t) { osc("triangle", 1300, t, 0.035, 0.12, sfxBus, { slide: 700 }); },
    tick(t) { osc("sine", 880, t, 0.05, 0.1, sfxBus); noise(t, 0.03, 0.05, sfxBus, { from: 3000, q: 2 }); },
    whoosh(t) { noise(t, 0.32, 0.22, sfxBus, { from: 350, to: 2600, q: 0.9, attack: 0.06 }); },
    page(t) { noise(t, 0.2, 0.09, sfxBus, { from: 1800, to: 700, q: 0.6, attack: 0.03 }); },
    coin(t) {
      osc("triangle", 1975, t, 0.09, 0.16, sfxBus, { verb: true });
      osc("triangle", 2637, t + 0.07, 0.22, 0.14, sfxBus, { verb: true });
      osc("sine", 5274, t + 0.07, 0.12, 0.03, sfxBus);
    },
    success(t) {
      [74, 78, 81, 86].forEach((m, i) => {
        osc("sine", mtof(m), t + i * 0.085, 0.5, 0.16, sfxBus, { verb: true });
        osc("triangle", mtof(m + 12), t + i * 0.085, 0.25, 0.04, sfxBus);
      });
      fx.coin(t + 0.36);
    },
    fail(t) {
      osc("square", mtof(55), t, 0.22, 0.08, sfxBus, { filter: 900, slide: mtof(54), vib: 7, vibDepth: 18 });
      osc("square", mtof(50), t + 0.24, 0.42, 0.08, sfxBus, { filter: 700, slide: mtof(49), vib: 6, vibDepth: 25 });
    },
    error(t) {
      osc("sine", 120, t, 0.28, 0.35, sfxBus, { slide: 45 });
      noise(t, 0.16, 0.12, sfxBus, { from: 400, q: 0.8, type: "lowpass" });
    },
    squawk(t) {
      const o = ctx.createOscillator(), g = ctx.createGain(), f = ctx.createBiquadFilter();
      o.type = "sawtooth"; f.type = "bandpass"; f.frequency.value = 1800; f.Q.value = 3;
      o.frequency.setValueAtTime(900, t);
      o.frequency.linearRampToValueAtTime(1700, t + 0.05);
      o.frequency.linearRampToValueAtTime(1100, t + 0.11);
      o.frequency.linearRampToValueAtTime(1900, t + 0.16);
      o.frequency.linearRampToValueAtTime(800, t + 0.26);
      env(g, t, 0.01, 0.13, 0.27);
      o.connect(f).connect(g).connect(sfxBus); o.start(t); o.stop(t + 0.32);
    },
    rankup(t) {
      [[67, 0], [71, 0.12], [74, 0.24], [79, 0.36], [74, 0.54], [79, 0.66]].forEach(([m, d], i) => {
        const dur = i === 5 ? 0.9 : 0.16;
        osc("sawtooth", mtof(m), t + d, dur, 0.07, sfxBus, { filter: 2200, detune: -6, verb: true });
        osc("sawtooth", mtof(m), t + d, dur, 0.07, sfxBus, { filter: 2200, detune: 6 });
      });
      osc("sine", mtof(43), t + 0.66, 0.9, 0.2, sfxBus);
    },
    fanfare(t) {
      const phrase = [[69, 0, 0.18], [74, 0.2, 0.1], [74, 0.3, 0.18], [76, 0.5, 0.1], [77, 0.6, 0.3], [76, 0.9, 0.1], [74, 1.0, 0.7]];
      phrase.forEach(([m, d, l]) => {
        osc("sawtooth", mtof(m), t + d, l, 0.06, sfxBus, { filter: 2000, detune: -7, vib: 5.5, verb: true });
        osc("sawtooth", mtof(m), t + d, l, 0.06, sfxBus, { filter: 2000, detune: 7 });
      });
      [[50, 0], [53, 0.6], [50, 1.0]].forEach(([m, d]) => osc("triangle", mtof(m), t + d, 0.5, 0.18, sfxBus));
      fx.coin(t + 1.05); fx.coin(t + 1.2);
    },
    chest(t) {
      noise(t, 0.25, 0.1, sfxBus, { from: 500, to: 220, q: 4 }); // creak
      osc("sine", 160, t, 0.2, 0.18, sfxBus, { slide: 90 });
      [0.18, 0.26, 0.33, 0.41].forEach((d, i) => osc("triangle", mtof(86 + (i % 2) * 5), t + d, 0.18, 0.08, sfxBus, { verb: true }));
    },
  };
  /* ---------- samples ---------- */
  function load(name, url) {
    if (buf[name]) return Promise.resolve(buf[name]);
    if (loading[url]) return loading[url];
    loading[url] = fetch(url)
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.arrayBuffer(); })
      .then((ab) => new Promise((res, rej) => ctx.decodeAudioData(ab, res, rej)))
      .then((b) => (buf[name] = b))
      .catch(() => { delete loading[url]; return null; });
    return loading[url];
  }
  function preload() {
    // music for the current screen first, then effects, then ambience and the other track
    const first = scene === "lesson" ? "study" : "map";
    load("m_" + first, "music/" + first + ".mp3").then(() => fadeTracks());
    Promise.all(SFX.map((n) => load(n, (n === "victory" ? "music/" : "sfx/") + n + ".mp3"))).then(() => {
      Promise.all([load("ocean", "sfx/ocean.mp3"), load("creak", "sfx/creak.mp3")]).then(startAmbience);
      const other = first === "map" ? "study" : "map";
      load("m_" + other, "music/" + other + ".mp3").then(() => fadeTracks());
    });
  }
  // play a sample; returns true if it played
  function sample(name, t, o = {}) {
    const b = buf[name]; if (!b) return false;
    const s = ctx.createBufferSource(), g = ctx.createGain();
    s.buffer = b;
    s.playbackRate.value = o.rate || (o.vary ? 1 + (Math.random() * 2 - 1) * o.vary : 1);
    g.gain.value = o.vol == null ? 1 : o.vol;
    s.connect(g).connect(o.dest || sfxBus);
    if (o.verb) g.connect(verbSend);
    s.start(t + (o.delay || 0));
    return true;
  }
  const pickOne = (arr) => arr[Math.floor(Math.random() * arr.length)];
  // what each named sound plays when samples are available
  const SAMPLED = {
    click: (t) => sample("click", t, { vol: 0.55, vary: 0.08 }),
    tick: (t) => sample("click", t, { vol: 0.35, rate: 1.4 }),
    whoosh: (t) => sample("whoosh", t, { vol: 0.5, vary: 0.06 }),
    page: (t) => sample("page", t, { vol: 0.6, vary: 0.08 }),
    coin: (t) => sample("coin", t, { vol: 0.55, vary: 0.07 }),
    coins: (t) => sample("coins", t, { vol: 0.6 }),
    success: (t) => sample("sparkle", t, { vol: 0.55 }) && sample("coin", t, { vol: 0.45, delay: 0.22, vary: 0.05 }),
    fail: (t) => sample("thud", t, { vol: 0.55 }) && sample("fail", t, { vol: 0.25, delay: 0.08 }),
    error: (t) => sample("thud", t, { vol: 0.75, rate: 0.85 }),
    squawk: (t) => sample(pickOne(["squawk", "squawk2", "chatter"]), t, { vol: 0.5, vary: 0.06 }),
    chatter: (t) => sample("chatter", t, { vol: 0.5, vary: 0.05 }),
    whistle: (t) => sample("whistle", t, { vol: 0.4 }),
    wings: (t) => sample("wings", t, { vol: 0.5, vary: 0.08 }),
    rankup: (t) => sample("cannon", t, { vol: 0.6 }) && sample("bell", t, { vol: 0.5, delay: 0.5 }),
    fanfare: (t) => sample("victory", t, { vol: 0.8, dest: musicBus }) && duck(0.25, 7.5) && sample("cannon", t, { vol: 0.45, delay: 0.05 }),
    chest: (t) => sample("chest", t, { vol: 0.7 }) && sample("coins", t, { vol: 0.5, delay: 0.55 }),
    anchor: (t) => sample("anchor", t, { vol: 0.45 }),
    splash: (t) => sample("splash", t, { vol: 0.4, vary: 0.05 }),
    bell: (t) => sample("bell", t, { vol: 0.5 }),
    cannon: (t) => sample("cannon", t, { vol: 0.55 }),
    sparkle: (t) => sample("sparkle", t, { vol: 0.5 }),
    gulls: (t) => sample("gulls", t, { vol: 0.3, dest: ambBus }),
  };
  function play(name) {
    if (!ctx || !unlocked || !prefs.sfx) return;
    const t = ctx.currentTime + 0.01;
    if (SAMPLED[name] && SAMPLED[name](t)) return;
    if (fx[name]) fx[name](t);
  }
  // lower the music for a while (voice lines, stingers)
  function duck(level, secs) {
    const t = ctx.currentTime;
    duckBus.gain.cancelScheduledValues(t);
    duckBus.gain.setValueAtTime(duckBus.gain.value, t);
    duckBus.gain.linearRampToValueAtTime(level, t + 0.15);
    duckBus.gain.setValueAtTime(level, t + secs);
    duckBus.gain.linearRampToValueAtTime(1, t + secs + 0.6);
    return true;
  }

  /* ---------- Pip's voice ---------- */
  let voiceSrc = null;
  function say(key, lang) {
    if (!ctx || !unlocked || !prefs.voice) return Promise.resolve(0);
    const name = "v_" + lang + "_" + key;
    return load(name, "voice/" + lang + "_" + key + ".mp3").then((b) => {
      if (!b) return 0;
      if (voiceSrc) { try { voiceSrc.stop(); } catch (e) {} }
      const s = ctx.createBufferSource(); s.buffer = b; s.connect(voiceBus);
      s.start(); voiceSrc = s;
      s.onended = () => { if (voiceSrc === s) voiceSrc = null; };
      duck(0.35, b.duration);
      return b.duration;
    });
  }
  const lvl = new Uint8Array(256);
  function voiceLevel() {
    if (!voiceAn || !voiceSrc) return 0;
    voiceAn.getByteTimeDomainData(lvl);
    let sum = 0; for (let i = 0; i < lvl.length; i++) { const v = (lvl[i] - 128) / 128; sum += v * v; }
    return Math.min(1, Math.sqrt(sum / lvl.length) * 4);
  }

  /* ---------- music ---------- */
  function makeTrack(stepFn, stepDur) {
    const bus = ctx.createGain(); bus.gain.value = 0.0001; bus.connect(musicBus);
    return { bus, stepFn, stepDur, step: 0, next: 0 };
  }
  // Original shanty in D minor, 6/8. Each bar is six eighth-note slots: [midi, eighths]
  const A_MEL = [[69, 2], [74, 1], [74, 2], [76, 1], [77, 2], [76, 1], [74, 2], [72, 1], [69, 2], [67, 1], [65, 2], [67, 1], [69, 6],
    [69, 2], [74, 1], [74, 2], [76, 1], [77, 2], [79, 1], [81, 2], [77, 1], [79, 2], [76, 1], [72, 2], [76, 1], [74, 6]];
  const B_MEL = [[74, 2], [77, 1], [81, 2], [77, 1], [79, 2], [76, 1], [72, 2], [76, 1], [77, 2], [74, 1], [70, 2], [74, 1], [69, 6],
    [74, 2], [77, 1], [81, 2], [77, 1], [79, 2], [81, 1], [82, 2], [79, 1], [81, 2], [77, 1], [76, 2], [73, 1], [74, 6]];
  const CHORDS = { Dm: [50, 53, 57], F: [53, 57, 60], C: [48, 52, 55], Bb: [46, 50, 53], A: [45, 49, 52], Gm: [43, 46, 50] };
  const A_CH = ["Dm", "F", "F", "Dm", "Dm", "F", "C", "Dm"], B_CH = ["Dm", "C", "Bb", "A", "Dm", "Gm", "A", "Dm"];
  function flatten(mel) { const out = []; mel.forEach(([m, d]) => { out.push(m); for (let i = 1; i < d; i++) out.push(-1); }); return out; }
  const SONG = flatten(A_MEL).concat(flatten(B_MEL), flatten(A_MEL), flatten(B_MEL));
  const SONG_CH = A_CH.concat(B_CH, A_CH, B_CH);
  const durAt = (arr, i) => { let n = 1; while (arr[i + n] === -1) n++; return n; };

  function squeeze(m, t, dur, dest, vol) {
    osc("sawtooth", mtof(m), t, dur, vol, dest, { filter: 1700, detune: -8, vib: 5.2, vibDepth: 7, attack: 0.02 });
    osc("sawtooth", mtof(m), t, dur, vol, dest, { filter: 1700, detune: 8, attack: 0.02 });
  }
  function shantyStep(tr, i, t) {
    const sd = tr.stepDur, n = i % SONG.length, inBar = n % 6, bar = Math.floor(n / 6);
    const chord = CHORDS[SONG_CH[bar]];
    const m = SONG[n];
    if (m > 0) squeeze(m, t, durAt(SONG, n) * sd * 0.92, tr.bus, 0.05);
    if (inBar === 0) { // oom
      osc("triangle", mtof(chord[0] - 12), t, sd * 2.2, 0.22, tr.bus);
      osc("sine", 110, t, 0.16, 0.22, tr.bus, { slide: 48 });
    }
    if (inBar === 3) { // pah
      chord.forEach((c) => osc("triangle", mtof(c), t, sd * 1.2, 0.05, tr.bus, { filter: 2500 }));
      osc("sine", 140, t, 0.1, 0.12, tr.bus, { slide: 70 });
    }
    noise(t, 0.04, inBar % 3 === 0 ? 0.03 : 0.018, tr.bus, { from: 7000, q: 1.5, type: "highpass" });
  }
  // Calm focus music for lessons: slow plucked arpeggios with a soft pad.
  const CALM_CH = [[50, 57, 62, 65, 69], [46, 53, 58, 62, 65], [53, 60, 65, 69, 72], [48, 55, 60, 64, 67]];
  const ARP = [0, 2, 3, 4, 3, 2, 1, 2];
  function calmStep(tr, i, t) {
    const sd = tr.stepDur, bar = Math.floor(i / 8) % CALM_CH.length, ch = CALM_CH[bar], k = i % 8;
    osc("triangle", mtof(ch[ARP[k]] + 12), t, sd * 2.6, 0.045, tr.bus, { verb: true, attack: 0.008 });
    if (k === 0) {
      osc("sine", mtof(ch[0] - 12), t, sd * 7.5, 0.1, tr.bus, { attack: 0.4 });
      [ch[1], ch[3]].forEach((c) => osc("sine", mtof(c), t, sd * 7.5, 0.025, tr.bus, { attack: 1.2, verb: true }));
    }
    if (k === 6 && (i / 8) % 2 >= 1) osc("sine", mtof(ch[4] + 12), t, sd * 1.5, 0.025, tr.bus, { verb: true });
  }
  function startScheduler() {
    if (timer) return;
    const now = ctx.currentTime;
    Object.values(tracks).forEach((tr) => (tr.next = now + 0.1));
    timer = setInterval(() => {
      if (!ctx || ctx.state !== "running") return;
      const now = ctx.currentTime, ahead = now + 0.15;
      Object.entries(tracks).forEach(([name, tr]) => {
        // If the timer fell behind (busy page, throttled tab), skip ahead
        // instead of scheduling a burst of notes in the past.
        if (tr.next < now - 0.05) tr.next = now + 0.02;
        const active = prefs.music && name === activeTrack() && !buf[SAMPLE_OF[name]];
        while (tr.next < ahead) {
          if (active) tr.stepFn(tr, tr.step, tr.next);
          tr.step++; tr.next += tr.stepDur;
        }
      });
    }, 30);
  }
  const activeTrack = () => (scene === "lesson" ? "calm" : scene === "quiet" ? null : "shanty");
  const SAMPLE_OF = { shanty: "m_map", calm: "m_study" };
  const looped = {}; // sample name -> {src, gain}
  function fadeTracks() {
    if (!ctx) return;
    const t = ctx.currentTime, act = activeTrack();
    Object.entries(tracks).forEach(([name, tr]) => {
      const on = name === act && prefs.music;
      const sname = SAMPLE_OF[name], useSample = !!buf[sname];
      // synth track
      tr.bus.gain.cancelScheduledValues(t);
      tr.bus.gain.setValueAtTime(Math.max(tr.bus.gain.value, 0.0001), t);
      tr.bus.gain.linearRampToValueAtTime(on && !useSample ? 1 : 0.0001, t + 1.2);
      if (on && tr.bus.gain.value < 0.01) { tr.step = 0; }
      // recorded track
      if (useSample) {
        let L = looped[sname];
        if (on && !L) {
          const src = ctx.createBufferSource(), g = ctx.createGain();
          src.buffer = buf[sname]; src.loop = true;
          src.loopStart = 0.03; src.loopEnd = buf[sname].duration - 0.03; // skip mp3 padding at the seam
          g.gain.value = 0.0001; src.connect(g).connect(musicBus); src.start(t, 0.03);
          L = looped[sname] = { src, g };
        }
        if (L) {
          L.g.gain.cancelScheduledValues(t);
          L.g.gain.setValueAtTime(Math.max(L.g.gain.value, 0.0001), t);
          L.g.gain.linearRampToValueAtTime(on ? 1 : 0.0001, t + 1.8);
          if (!on) {
            const mine = L;
            clearTimeout(mine.stopT);
            mine.stopT = setTimeout(() => {
              if (looped[sname] === mine && mine.g.gain.value < 0.01) { try { mine.src.stop(); } catch (e) {} delete looped[sname]; }
            }, 2200);
          } else clearTimeout(L.stopT);
        }
      }
    });
  }

  /* ---------- ocean ---------- */
  let ambLoops = null, gullT = null;
  function startAmbience() {
    if (ambLoops || !buf.ocean) return;
    const t = ctx.currentTime;
    ambLoops = [["ocean", 0.55], ["creak", 0.22]].filter(([n]) => buf[n]).map(([n, v]) => {
      const s = ctx.createBufferSource(), g = ctx.createGain();
      s.buffer = buf[n]; s.loop = true; s.loopStart = 0.03; s.loopEnd = buf[n].duration - 0.03;
      g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + 3);
      s.connect(g).connect(ambBus); s.start(t, Math.random() * 5);
      return s;
    });
    // fade out the synthesized ocean
    if (synthOcean) { synthOcean.gain.setValueAtTime(synthOcean.gain.value, t); synthOcean.gain.linearRampToValueAtTime(0.0001, t + 3); }
    const gull = () => {
      gullT = setTimeout(() => { if (scene === "map" && prefs.ambience && !document.hidden) play("gulls"); gull(); }, 25000 + Math.random() * 35000);
    };
    gull();
  }
  function makeOcean() {
    synthOcean = ctx.createGain(); synthOcean.connect(ambBus);
    // two layers of filtered noise with slow, out-of-phase swells
    [[0.07, 420, 0], [0.051, 900, 2.3]].forEach(([rate, cut, phase], i) => {
      const s = ctx.createBufferSource(); s.buffer = noiseBuf; s.loop = true;
      const f = ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = cut;
      const g = ctx.createGain(); g.gain.value = i ? 0.018 : 0.05;
      const l = ctx.createOscillator(), lg = ctx.createGain();
      l.frequency.value = rate; lg.gain.value = i ? 0.016 : 0.045;
      l.connect(lg).connect(g.gain);
      s.connect(f).connect(g).connect(synthOcean);
      s.start(ctx.currentTime + phase * 0.01); l.start();
    });
  }

  function applyPrefs() {
    if (!ctx) return;
    const t = ctx.currentTime;
    musicBus.gain.setTargetAtTime(prefs.musicVol * 0.55, t, 0.1);
    sfxBus.gain.setTargetAtTime(prefs.sfx ? prefs.sfxVol : 0, t, 0.05);
    voiceBus.gain.setTargetAtTime(prefs.voice ? Math.max(0.5, prefs.sfxVol * 1.2) : 0, t, 0.05);
    ambBus.gain.setTargetAtTime(prefs.ambience ? 0.9 * Math.max(prefs.musicVol, 0.35) : 0, t, 0.4);
    fadeTracks();
  }

  window.Sound = {
    play,
    say,
    voiceLevel,
    setScene(s) { if (s === scene) return; scene = s; fadeTracks(); },
    setPrefs(p) { Object.assign(prefs, p); applyPrefs(); },
    prefs,
    get ready() { return unlocked; },
  };
})();
