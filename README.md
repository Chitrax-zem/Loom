# ✦ LOOM ✦
### Hand-Controlled Particle Sorcery — AR + Default Mode

<div align="center">

![Arcane Forge Banner](https://img.shields.io/badge/✦%20ARCANE%20FORGE-Hand%20Sorcery-blueviolet?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyTDkgOUgyTDcgMTRMNSAyMUwxMiAxN0wxOSAyMUwxNyAxNEwyMiA5SDE1TDEyIDJaIi8+PC9zdmc+)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react)
![MediaPipe](https://img.shields.io/badge/MediaPipe-Hands-00C853?style=for-the-badge)
![WebXR](https://img.shields.io/badge/WebXR-AR%20Mode-FF6D00?style=for-the-badge)
![Web Audio](https://img.shields.io/badge/Web%20Audio-API-9C27B0?style=for-the-badge)
![Canvas 2D](https://img.shields.io/badge/Canvas-2D%20Physics-E91E63?style=for-the-badge)

**A production-grade, real-time hand-tracking particle sorcery web app with AR mode, 7 arcane abilities, spatial audio, and custom physics — all running at 60 FPS in the browser.**

[🚀 Live Demo](#) · [📖 Documentation](#table-of-contents) · [🐛 Report Bug](#) · [✨ Request Feature](#)

</div>

---

## 📸 Preview

```
┌─────────────────────────────────────────────────────────────────┐
│  ✦ ARCANE FORGE ✦                              🌐  📷  🔊  💥  ❓│
│                                                                  │
│  ⚗️ SORCERER                        [ DEFAULT ] [ AR ]           │
│  Right: 🖐 ATTRACT                                               │
│  FPS 60 · 342 PARTICLES · DEFAULT MODE                          │
│                                                                  │
│            🌌 Particles floating in dark starfield 🌌            │
│                                                                  │
│                        ✦ ✦ ✦ ✦ ✦                                │
│                     ✦           ✦                                │
│                  ✦    (hand orb)  ✦                              │
│                     ✦           ✦                                │
│                        ✦ ✦ ✦ ✦ ✦                                │
│                                                                  │
│  [ 🔮 ] [ 💚 ] [ 🌈 ] [ ⚡ ] [ 🌋 ] [ 🌊 ] [ 🌌 ]               │
│                                              ┌────────────────┐  │
│                                              │  📷 Hand Cam   │  │
│                                              │ ┌─────────────┐│  │
│                                              │ │  hand skel  ││  │
│                                              │ └─────────────┘│  │
│                                              └────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🎮 Modes](#-modes)
- [🔮 Abilities](#-abilities)
- [🖐 Gestures](#-gestures)
- [🛠 Tech Stack](#-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [📁 Project Structure](#-project-structure)
- [⚙️ Configuration](#️-configuration)
- [📱 Mobile Support](#-mobile-support)
- [🎵 Audio Engine](#-audio-engine)
- [🌐 AR Mode](#-ar-mode)
- [📷 Hand Tracking](#-hand-tracking)
- [🧪 Physics Engine](#-physics-engine)
- [🎨 Particle System](#-particle-system)
- [🔧 Performance](#-performance)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🖐 **Hand Tracking** | Real-time 2-hand tracking via MediaPipe with gesture detection |
| 🌐 **AR Mode** | Rear camera as background — particles float in your real world |
| 🔮 **7 Abilities** | Sorcerer, Time Stone, Rainbow, Cyberpunk, Lava, Ocean, Galaxy |
| 🎵 **Spatial Audio** | Per-ability reactive sounds via Web Audio API with reverb |
| ⚛️ **Custom Physics** | Bouncing, force fields, attract/repel with hand-based physics |
| 💫 **Particle Trails** | Ability-specific trail rendering per particle |
| 🎯 **Gesture Control** | Open hand, fist, pinch, and point — each triggers a different effect |
| 📱 **Mobile-First** | Adaptive rendering, touch controls, reduced particles on mobile |
| 🎞️ **60 FPS** | Optimized render loop with FPS counter and adaptive quality |
| 🌑 **Default Mode** | Rich dark starfield with nebula gradients and ambient FX |

---

## 🎮 Modes

### 🌑 Default Mode
The default experience renders particles against a **rich dark starfield** with ability-specific ambient effects:

- **Cyberpunk** → glitch grid lines overlay
- **Galaxy** → spiral nebula center glow
- **Ocean** → animated sine wave layers
- **Lava** → molten ground glow at bottom edge

All particles have glow shadows, trails, and physics interaction against the dark background.

### 🌐 AR Mode
AR Mode activates the **rear/environment-facing camera** as a live background. The particle canvas becomes **fully transparent**, making particles appear to float in your real environment.

**AR visual additions:**
- `◉ AR MODE` watermark with ability color
- Sweeping scanline across the frame
- Corner bracket HUD decoration
- Ability-tinted rim vignette around edges
- Boosted particle glow for real-world contrast

> **Switch between modes** using the DEFAULT/AR pill toggle or the 🌐 globe button in the top-right controls.

---

## 🔮 Abilities

Each ability has a unique **color palette, particle shape, physics behavior, sound, trail style, and ambient effect**.

| Emoji | Name | Shape | Behavior | Special FX |
|---|---|---|---|---|
| 🔮 | **Sorcerer** | Circle | Floating upward, color-cycles over time | Hue-shifting emissive, spin trail |
| 💚 | **Time Stone** | Circle | **Freezes all physics** — particles spiral slowly | Time-freeze aura, green glow |
| 🌈 | **Rainbow** | Circle | Floats gently, full HSL color cycle per frame | Per-particle hue animation |
| ⚡ | **Cyberpunk** | Square | Sharp gravity drop, high repel force | Glitch flicker, neon grid overlay |
| 🌋 | **Lava** | Blob | Heavy gravity, pulsing organic blob shape | Lava-floor ground glow, ember flicker |
| 🌊 | **Ocean** | Circle | Sine-wave drift, fluid undulation | Wave layer FX, buoyant float |
| 🌌 | **Galaxy** | Star | Spiral gravity toward center | Octahedral stars, color-cycling |

### Ability Details

<details>
<summary>🔮 Sorcerer</summary>

- **Colors:** Purple/violet HSL cycling
- **Physics:** Anti-gravity float with slight upward drift
- **Trail:** Long glowing trail
- **Sound:** Sawtooth synth sweep
- **Force:** 1.2× multiplier (high attractiveness)
- **Glow:** `#cc66ff`

</details>

<details>
<summary>💚 Time Stone</summary>

- **Colors:** Green oscillating HSL
- **Physics:** `forceScale: 0` — all hand forces are frozen, gravity = 0
- **Special:** Particles spiral in slow orbital motion during freeze
- **Sound:** Sine wave tone (meditative)
- **Glow:** `#00ff88`
- **Unique:** Only ability that fully pauses particle physics

</details>

<details>
<summary>🌈 Rainbow</summary>

- **Colors:** Full HSL spectrum cycling per frame per particle
- **Physics:** Gentle upward float, moderate hand response
- **Trail:** Rainbow-colored trail line
- **Sound:** High-pitched sine sweep
- **Glow:** `#ff88ff`
- **Emit Rate:** Highest of all abilities (6/tick)

</details>

<details>
<summary>⚡ Cyberpunk</summary>

- **Colors:** Cyan, magenta, yellow, green — random per particle
- **Physics:** Falls with gravity, high repel force (1.6×)
- **Shape:** Square/cube geometry
- **Sound:** Square wave glitch pulse
- **Ambient FX:** Flashing neon grid lines over the canvas
- **Glow:** `#00ffff`

</details>

<details>
<summary>🌋 Lava</summary>

- **Colors:** Deep orange/red HSL, flickering luminosity
- **Physics:** Strong gravity (0.08), heavy blobs
- **Shape:** Organic blob — animated 8-point radial shape
- **Sound:** Deep bass sawtooth rumble
- **Ambient FX:** Molten ground glow at bottom of screen
- **Glow:** `#ff4400`

</details>

<details>
<summary>🌊 Ocean</summary>

- **Colors:** Blue/teal spectrum
- **Physics:** Anti-gravity float + sine wave lateral drift
- **Trail:** Translucent water trail
- **Sound:** Sustained sine wave (wave-like)
- **Ambient FX:** 4-layer animated sine wave lines across canvas
- **Glow:** `#4488ff`

</details>

<details>
<summary>🌌 Galaxy</summary>

- **Colors:** Full spectrum, varying saturation
- **Physics:** Weak spiral gravity pulling toward screen center
- **Shape:** 5-pointed star
- **Trail:** Star dust trail
- **Sound:** Triangle wave cosmic tone
- **Ambient FX:** Radial nebula glow at center
- **Glow:** `#aa44ff`

</details>

---

## 🖐 Gestures

Hand tracking recognizes **4 gestures** per hand (both hands tracked simultaneously):

| Gesture | Detection | Effect |
|---|---|---|
| 🖐 **Open Hand** | 3+ fingers extended | **Attract** — pulls nearby particles toward palm |
| ✊ **Fist** | 0 fingers extended | **Repel** — pushes particles outward from fist |
| 🤏 **Pinch** | Thumb tip near index tip (< 7% frame width) | **Burst** — spawns 10-particle ring explosion |
| 👆 **Point** | 1–2 fingers extended | **Force field** — directional attract |

### Gesture Color Coding (in hand preview)
- 🖐 Open → `#00ffff` (cyan)
- ✊ Fist → `#ff4444` (red)
- 🤏 Pinch → `#ffff00` (yellow)
- 👆 Point → `#ff8800` (orange)

---

## 🛠 Tech Stack

```
┌─────────────────────────────────────────────────────┐
│                   ARCANE FORGE                      │
├──────────────────┬──────────────────────────────────┤
│  UI Framework    │  React 18 + Hooks                │
│  Rendering       │  HTML5 Canvas 2D API             │
│  Hand Tracking   │  MediaPipe Hands v0.4            │
│  Physics         │  Custom JS physics engine        │
│  Audio           │  Web Audio API (OscillatorNode)  │
│  AR Mode         │  getUserMedia (environment cam)  │
│  Styling         │  Inline CSS + CSS-in-JS          │
│  Build           │  Vite / CRA compatible           │
│  Language        │  JavaScript (ES2022+)            │
└──────────────────┴──────────────────────────────────┘
```

### External CDN Dependencies (MediaPipe only)

```
https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915/hands.js
https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.3.1640029074/camera_utils.js
https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils@0.3.1620248257/drawing_utils.js
```

> MediaPipe is loaded **lazily on demand** when the user clicks the camera button — the app runs fully without it using mouse/touch fallback.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- A modern browser (Chrome 90+, Firefox 88+, Safari 15+)
- Camera access for hand tracking (optional)
- HTTPS or localhost for camera APIs

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourname/arcane-forge.git
cd arcane-forge

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

### Quick Start (Single File)

If using the standalone `.jsx` file in a React project:

```bash
# Create a new React app
npx create-react-app arcane-forge
cd arcane-forge

# Replace src/App.js content with ArcaneForge.jsx
cp ArcaneForge.jsx src/App.js

# Start
npm start
```

### Using with Vite (Recommended)

```bash
npm create vite@latest arcane-forge -- --template react
cd arcane-forge
npm install
# Replace src/App.jsx with ArcaneForge.jsx content
npm run dev
```

---

## 📁 Project Structure

```
arcane-forge/
├── src/
│   ├── App.jsx                  # Main ArcaneForge component
│   ├── index.jsx                # React entry point
│   └── index.css                # Base reset styles
├── public/
│   └── index.html               # HTML shell
├── package.json
├── vite.config.js
└── README.md
```

### Component Architecture

```
ArcaneForge (root)
│
├── Refs (no re-render on change)
│   ├── canvasRef          → particle canvas
│   ├── arVideoRef         → AR background video
│   ├── mpVideoRef         → MediaPipe processing video (hidden)
│   ├── previewRef         → small hand cam preview
│   ├── overlayRef         → hand skeleton overlay canvas
│   ├── particlesRef[]     → live particle array
│   ├── handsRef[]         → detected hand positions & gestures
│   └── mouseRef           → fallback mouse/touch position
│
├── State (triggers re-render)
│   ├── ability            → active ability key
│   ├── arMode             → AR mode on/off
│   ├── camStatus          → idle|requesting|loading|active|denied|error
│   ├── arStatus           → off|starting|active|error
│   ├── soundOn            → audio enabled
│   ├── fps / pCount       → performance display
│   └── gestLines[]        → gesture text display
│
├── Effects
│   ├── Resize + star seeding
│   ├── Mouse/touch event listeners
│   ├── Double-click burst handler
│   ├── Pinch burst interval
│   └── 🔁 Main render loop (requestAnimationFrame)
│
├── Callbacks
│   ├── startCamera()      → getUserMedia + MediaPipe init
│   ├── stopCamera()       → cleanup streams + MediaPipe
│   ├── startAR()          → rear camera getUserMedia
│   ├── stopAR()           → cleanup AR stream
│   └── selectAbility()    → switch ability + flash + sound
│
└── Classes (outside component, stable refs)
    ├── Particle            → position, velocity, draw, update
    └── AudioEngine         → Web Audio API wrapper
```

---

## ⚙️ Configuration

Key constants you can tune at the top of `ArcaneForge.jsx`:

```js
// Particle limits
const MAX_PARTICLES = 480;       // raise for more chaos, lower for performance

// Per-ability tuning (inside ABILITIES object)
{
  forceScale: 1.2,   // hand force multiplier (0 = no response, 2 = very strong)
  emitRate: 4,       // particles spawned per 10 ticks
  maxLife: 220,      // max particle lifetime in frames
  gravity: -0.02,    // negative = float up, positive = fall down
  trail: true,       // enable/disable trail rendering
}

// Physics
const PHYSICS_DAMPING  = 0.97;   // velocity decay per frame (lower = more drag)
const WALL_BOUNCE      = -0.6;   // velocity reflection on wall hit
const FORCE_FALLOFF    = 120;    // distance²-based force softening
```

### Adding a New Ability

```js
// In the ABILITIES object:
mythunder: {
  name: "⚡ THUNDER", emoji: "⚡", label: "Thunder",
  getColor: (t) => `hsl(${50 + Math.sin(t) * 20}, 100%, 70%)`,
  bgGradient: ["#0a0a00", "#1a1800"],
  glowColor: "#ffee00",
  particleSize: () => 2 + Math.random() * 4,
  shape: "star",                  // circle | square | star | blob
  trail: true,
  gravity: 0.03,
  forceScale: 1.8,
  emitRate: 5,
  maxLife: 150,
},

// Add to FC (flash colors):
const FC = { ..., mythunder: "#ffee00" };

// Add ability sound in AudioEngine.abilitySound():
mythunder: () => this.play(600 + Math.random() * 400, "square", 0.1, 0.04),
```

---

## 📱 Mobile Support

Arcane Forge is **mobile-first** with the following adaptations:

| Feature | Desktop | Mobile |
|---|---|---|
| Max particles | 480 | 300 (auto-detected) |
| Pixel ratio | Up to 2× | Up to 1.5× |
| Touch controls | Mouse fallback | Full touch support |
| Double-tap | Double-click | Double-tap burst |
| Camera | Front-facing | Front + Rear switching |
| AR Mode | Works | Best experience (point at room) |

Touch gestures:
- **Single touch + move** → attract particles
- **Touch + hold** → repel particles
- **Double-tap** → burst ring

---

## 🎵 Audio Engine

The `AudioEngine` class wraps the Web Audio API with:

```
OscillatorNode → GainNode (ADSR envelope) → MasterGain → AudioContext.destination
```

Each ability has a unique synth voice:

| Ability | Oscillator | Frequency | Character |
|---|---|---|---|
| Sorcerer | Sawtooth | 250–600 Hz | Arcane sweep |
| Time Stone | Sine | 180–260 Hz | Meditative drone |
| Rainbow | Sine | 350–850 Hz | Bright shimmer |
| Cyberpunk | Square | 900–1600 Hz | Glitch pulse |
| Lava | Sawtooth | 60–120 Hz | Deep rumble |
| Ocean | Sine | 220–400 Hz | Wave tone |
| Galaxy | Triangle | 120–520 Hz | Cosmic drift |

Additional sounds:
- **Ability select** → Triangle wave at 330 Hz
- **Burst spawn** → Triangle wave at 440 Hz (A4)
- **Clear all** → Sawtooth drop at 80 Hz
- **AR on** → Ascending sine chord (528 Hz → 660 Hz)
- **AR off** → Triangle descend at 200 Hz

> Audio is initialized on first user interaction to comply with browser autoplay policies.

---

## 🌐 AR Mode

AR Mode uses the **`getUserMedia` API** with `facingMode: "environment"` (rear camera) as a live video background:

```
Rear Camera Stream
      │
      ▼
<video> element (fixed, fullscreen, z-index: 0)
      │
      ▼
<canvas> (transparent, z-index: 1) ← particles drawn here
      │
      ▼
UI Controls (z-index: 150+)
```

### AR Visual Stack
1. **Live video** (rear camera, full screen)
2. **Dark vignette** (subtle edge darkening)
3. **Ability rim glow** (tinted edge gradient)
4. **Particles** (boosted glow for real-world contrast)
5. **Scanline** (sweeping horizontal AR indicator)
6. **Corner brackets** (HUD decoration)
7. **`◉ AR MODE`** watermark
8. **UI controls** (top layer)

### AR + Hand Tracking Combined

You can run **both simultaneously**:
- **Rear camera** → AR background via `arVideoRef`
- **Front camera** → MediaPipe hand tracking via `mpVideoRef` (hidden)

This creates a true mixed-reality experience where your hands control particles floating in your real environment.

---

## 📷 Hand Tracking

MediaPipe Hands tracks **21 landmarks** per hand:

```
Landmark indices:
  0  = Wrist
  1-4  = Thumb (MCP → TIP)
  5-8  = Index finger
  9-12 = Middle finger
  13-16 = Ring finger
  17-20 = Pinky

Particle source: landmark[9] (palm base) — more stable than wrist
Screen mapping: sx = (1 - lm[9].x) * W  ← mirrored X
                sy = lm[9].y * H
```

### Gesture Algorithm

```js
function detectGesture(landmarks) {
  const tips = [8, 12, 16, 20];   // finger tip indices
  const pips = [6, 10, 14, 18];   // PIP joint indices

  // Count extended fingers: tip.y < pip.y means extended
  let extended = tips.filter((t, i) => landmarks[t].y < landmarks[pips[i]].y).length;

  // Pinch: Euclidean distance between thumb tip and index tip
  const pinchDist = dist(landmarks[4], landmarks[8]);

  if (pinchDist < 0.07) return 'pinch';   // 7% of frame width
  if (extended === 0)   return 'fist';
  if (extended >= 3)    return 'open';
  return 'point';
}
```

---

## 🧪 Physics Engine

Custom JavaScript physics — no external library needed:

```js
// Force field calculation (per hand, per particle)
const dx = hand.x - particle.x;
const dy = hand.y - particle.y;
const dist = Math.sqrt(dx² + dy²) + 1;

// Inverse-square force with soft falloff
const forceMag = (ability.forceScale × 1000) / (dist² + 120);

// Direction: +1 = attract, -1 = repel
const direction = gesture === 'fist' ? -1 : +1;

// Apply to velocity
particle.vx += (dx / dist) × forceMag × direction × 0.25;
particle.vy += (dy / dist) × forceMag × direction × 0.25;

// Damping
particle.vx *= 0.97;
particle.vy *= 0.97;

// Boundary bounce
if (particle.x < 0) { particle.x = 0; particle.vx *= -0.6; }
```

Additional per-ability physics:
- **Ocean:** Sine wave lateral drift
- **Galaxy:** Weak spiral gravity toward canvas center
- **Lava:** Heavy constant gravity
- **Time Stone:** All force calculations bypassed (freeze)

---

## 🎨 Particle System

Each `Particle` instance contains:

| Property | Type | Description |
|---|---|---|
| `x, y` | float | World position |
| `vx, vy` | float | Velocity |
| `size, baseSize` | float | Current and original size |
| `color` | string | CSS color string |
| `life` | 0→1 | Normalized lifetime |
| `age, maxLife` | int | Frame counter |
| `rotation, rotSpeed` | float | Rotation for non-circle shapes |
| `trail[]` | array | Last N positions for trail line |
| `waveOffset` | float | Per-particle phase for wave FX |

Shapes and their Canvas 2D draw methods:

| Shape | Abilities | Canvas Method |
|---|---|---|
| `circle` | Sorcerer, Time Stone, Rainbow, Ocean | `arc()` |
| `square` | Cyberpunk | `fillRect()` |
| `star` | Galaxy | Custom 5-point star via `lineTo()` |
| `blob` | Lava | Animated 8-point radial via `lineTo()` |

---

## 🔧 Performance

The app maintains 60 FPS through:

| Optimization | Implementation |
|---|---|
| **Particle cap** | Hard limit of 480 particles |
| **Lazy MediaPipe** | Scripts loaded only on camera button click |
| **Ref-based state** | Ability, AR mode stored in refs — no re-render on change |
| **Trail culling** | Trail max length = 10 points |
| **Adaptive mobile** | Reduced particles + pixel ratio on mobile UA |
| **Single canvas** | All rendering on one Canvas 2D context |
| **rAF loop** | Uses native `requestAnimationFrame`, not `setInterval` |
| **Physics simplicity** | Custom JS physics, no Cannon.js overhead in browser |
| **Audio throttle** | Sound fires every 9th emit tick, not every frame |

### Performance Targets

| Device | FPS | Particles |
|---|---|---|
| Desktop (M1/M2) | 60 | 480 |
| Desktop (mid-range) | 55–60 | 480 |
| iPhone 14+ | 60 | 300 |
| Android mid-range | 45–60 | 300 |

---

## 🤝 Contributing

Contributions are welcome! Here's how:

```bash
# Fork the repo, then:
git clone https://github.com/yourname/arcane-forge.git
git checkout -b feature/new-ability
# Make changes
git commit -m "feat: add Thunder Storm ability"
git push origin feature/new-ability
# Open a Pull Request
```

### Ideas for contributions
- 🌪️ **Storm** ability — swirling tornado physics
- 🌸 **Cherry Blossom** — petal-shaped particles drifting down
- 🔥 **Fire** — upward particle stream with orange flicker
- ❄️ **Ice** — crystalline hexagon particles with freeze physics
- 🌿 **Nature** — leaf-shaped organic drift
- 💎 **Crystal** — diamond geometry with refraction color FX
- 🎆 **Fireworks** — burst-only mode triggered by gestures
- 🕳️ **Black Hole** — strong inward gravity vortex

---

## 🔑 Browser Support

| Browser | Version | Hand Tracking | AR Mode |
|---|---|---|---|
| Chrome | 90+ | ✅ | ✅ |
| Edge | 90+ | ✅ | ✅ |
| Firefox | 88+ | ✅ | ✅ |
| Safari | 15.4+ | ✅ | ✅ (iOS 15.4+) |
| Samsung Internet | 14+ | ✅ | ✅ |

> Hand tracking and AR require **HTTPS** (or `localhost`) for `getUserMedia` access.

---

## 📄 License

```
MIT License

Copyright (c) 2026 Arcane Forge

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 🙏 Acknowledgments

- [MediaPipe](https://mediapipe.dev/) — Real-time hand landmark detection
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) — Synthesizer engine
- [React](https://react.dev/) — UI framework
- [Canvas 2D API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) — Rendering engine
- Inspired by: Dr. Strange, Marvel, and the infinite possibilities of browser APIs

---

<div align="center">

**✦ Made with arcane energy and browser APIs ✦**

*"With great render loops comes great responsibility."*

[![Star this repo](https://img.shields.io/github/stars/yourname/arcane-forge?style=social)](https://github.com/yourname/arcane-forge)

</div>
