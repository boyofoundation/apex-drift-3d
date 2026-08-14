# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e.spec.mjs >> menu exposes Apex Drift 3D contract
- Location: tests/e2e.spec.mjs:2:1

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('car-option')
Expected: 4
Received: 0
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for getByTestId('car-option')
    14 × locator resolved to 0 elements
       - unexpected value "0"

```

# Page snapshot

```yaml
- main [ref=e2]:
  - generic [ref=e4]:
    - text: STATIC WEBGL RACER · THREE.JS 0.165.0
    - heading "APEX DRIFT" [level=1] [ref=e5]
    - paragraph [ref=e6]: Find the line. Hold the apex. Own the weather.
    - heading "Choose car" [level=3] [ref=e7]
    - heading "Choose environment" [level=3] [ref=e8]
    - button "START RACE" [ref=e9] [cursor=pointer]
    - paragraph [ref=e10]: WASD / arrows drive · Space drift · R restart · M menu
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | test('menu exposes Apex Drift 3D contract', async ({ page }) => {
  3  |   await page.goto('/?e2e=1');
  4  |   await expect(page.getByTestId('app-title')).toHaveText('APEX DRIFT');
> 5  |   await expect(page.getByTestId('car-option')).toHaveCount(4);
     |                                                ^ Error: expect(locator).toHaveCount(expected) failed
  6  |   await expect(page.getByTestId('track-option')).toHaveCount(3);
  7  |   await expect(page.getByTestId('webgl-fallback')).toBeHidden();
  8  |   const api = await page.evaluate(() => Object.keys(window.__APEX_DRIFT_3D_E2E__));
  9  |   expect(api).toEqual(expect.arrayContaining(['snapshot','placeVehicleAtFinishGate','advanceCheckpointShortcut','enterHazardFixture']));
  10 | });
  11 | 
```