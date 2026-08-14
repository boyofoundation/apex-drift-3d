import { test, expect } from '@playwright/test';
test('menu exposes Apex Drift 3D contract', async ({ page }) => {
  page.on('pageerror', e => console.log('PAGEERROR', e.message)); await page.goto('/?e2e=1');
  await expect(page.getByTestId('app-title')).toHaveText('APEX DRIFT');
  await expect(page.getByTestId('car-option')).toHaveCount(4);
  await expect(page.getByTestId('track-option')).toHaveCount(3);
  await expect(page.getByTestId('webgl-fallback')).toBeHidden();
  const api = await page.evaluate(() => Object.keys(window.__APEX_DRIFT_3D_E2E__));
  expect(api).toEqual(expect.arrayContaining(['snapshot','placeVehicleAtFinishGate','advanceCheckpointShortcut','enterHazardFixture']));
});
