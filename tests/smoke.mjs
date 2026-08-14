import assert from 'node:assert/strict';
import fs from 'node:fs';
const html=fs.readFileSync('index.html','utf8');
for (const s of ['data-testid="app-title"',"dataset.testid='car-option'","dataset.testid='track-option'",'data-testid="start-race"','data-testid="hud-lap"','data-testid="hud-position"','data-testid="hud-speed"','data-testid="hud-camera-mode"','data-testid="results-screen"','data-testid="webgl-fallback"','three.module.min.js','TOTAL_LAPS:3']) assert(html.includes(s),`missing ${s}`);
console.log('Apex Drift 3D static smoke: PASS');
