# 🏎️ Apex Drift 2D - Arcade Circuit Championship

An immersive, high-octane 2D top-down arcade racing game built entirely in vanilla JavaScript and HTML5 Canvas, featuring procedural audio via WebAudio API, dynamic slip-angle drift physics, sequential anti-cheat checkpoints, and persistent tire skid marks.

🎮 **Live Demo (GitHub Pages):** [https://boyofoundation.github.io/apex-drift-2d/](https://boyofoundation.github.io/apex-drift-2d/)

---

## 🕹️ Controls

| Action | Keyboard Primary | Keyboard Alternate | Mobile / Touch Screen |
| :--- | :--- | :--- | :--- |
| **Accelerate** | `W` | `Up Arrow (↑)` | `▲` Gas Button |
| **Brake / Reverse** | `S` | `Down Arrow (↓)` | `▼` Brake Button |
| **Steer Left** | `A` | `Left Arrow (←)` | `◀` Steer Left |
| **Steer Right** | `D` | `Right Arrow (→)` | `▶` Steer Right |
| **Handbrake / Drift** | `Shift` | `Spacebar` | `DRIFT` Button |
| **Change Paint Color** | `C` | — | — |
| **Quick Restart** | `R` | — | — |
| **Pause / Resume** | `ESC` | `P` | — |
| **Toggle Audio** | `M` | — | Sound Button (Top-Right) |

---

## ✨ Features

- **Realistic Arcade Drift Physics**: True 2D vector kinematics with slip-angle calculations, dynamic counter-steering authority, and grip transitions.
- **Drift Combo System**: Initiate slides around corners to multiply your drift score from `x1.0` up to `x4.0`.
- **Procedural WebAudio Synthesis**:
  - Multi-oscillator sports car engine with dynamic RPM scaling and low-pass throttle filtering.
  - Bandpass-filtered tire screeching on drifts and hard braking.
  - Impact boom and metallic crunch on barrier collisions.
  - Checkpoint chimes, 3-2-1 countdown beeps, and a triumphant 4-tone victory fanfare.
- **Track & Geometry System**:
  - Closed Catmull-Rom spline circuit with high-speed straights, hairpins, and technical chicanes.
  - Off-road grass slowdown penalty with dirt debris kick-up.
  - 16 sequential checkpoint gates ensuring authentic lap completion and anti-cut validation.
  - Real-time Wrong-Way directional warning (`⚠️ WRONG WAY!`).
- **Visual Polish & HUD**:
  - Persistent asphalt tire skid buffer that preserves rubber tracks across all 3 laps.
  - Dynamic headlights illuminating the tarmac ahead, and glowing brake lights.
  - Smoke, sparks, exhaust backfire, and celebratory victory confetti.
  - Analog & digital Tachometer / Speedometer gauge cluster, Best Lap tracker, and real-time Mini-map with car telemetry.
- **Driver Ranks**: Evaluates your performance from Rank C to the legendary Rank S.

---

## 🚀 Local Development / Offline Play

Zero dependencies, zero build steps, and no web server required. Simply open `index.html` in any modern web browser:

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

---

## 📄 License

MIT License. Open source and free to explore or adapt for educational game development.
