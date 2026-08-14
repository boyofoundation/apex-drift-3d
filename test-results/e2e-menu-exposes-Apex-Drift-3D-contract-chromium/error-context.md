# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e.spec.mjs >> menu exposes Apex Drift 3D contract
- Location: tests/e2e.spec.mjs:2:1

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('app-title')
Expected: "APEX DRIFT"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for getByTestId('app-title')

```

```yaml
- heading "Forbidden" [level=1]
- paragraph: You don't have permission to access this resource.
- separator
- text: Apache/2.4.65 (Debian) Server at 127.0.0.1 Port 8080
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | test('menu exposes Apex Drift 3D contract', async ({ page }) => {
  3  |   await page.goto('/?e2e=1');
> 4  |   await expect(page.getByTestId('app-title')).toHaveText('APEX DRIFT');
     |                                               ^ Error: expect(locator).toHaveText(expected) failed
  5  |   await expect(page.getByTestId('car-option')).toHaveCount(4);
  6  |   await expect(page.getByTestId('track-option')).toHaveCount(3);
  7  |   await expect(page.getByTestId('webgl-fallback')).toBeHidden();
  8  |   const api = await page.evaluate(() => Object.keys(window.__APEX_DRIFT_3D_E2E__));
  9  |   expect(api).toEqual(expect.arrayContaining(['snapshot','placeVehicleAtFinishGate','advanceCheckpointShortcut','enterHazardFixture']));
  10 | });
  11 | 
```