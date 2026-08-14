# Apex Drift 3D

A static Three.js 0.165.0 first-person arcade racer. Choose one of four cars, then race three laps around Neon Harbor (wet), Dust Canyon (sand), or Frost Ridge (ice) against five seeded opponents.

## Controls
- **WASD / arrow keys**: accelerate, brake/reverse, steer
- **Space**: drift/handbrake input
- **R**: restart race · **M**: return to garage

## Local run

    npm ci
    python3 -m http.server 8080
    # open http://127.0.0.1:8080/
    npm run test:smoke
    npm run test:e2e

The game is static-hostable and uses the vendored `vendor/three.module.min.js`; provenance and checksum are recorded in `vendor/THREE-PROVENANCE.md`. Add `?e2e=1` to expose the read-only deterministic fixture API at `window.__APEX_DRIFT_3D_E2E__`.
