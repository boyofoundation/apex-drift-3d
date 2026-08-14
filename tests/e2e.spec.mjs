import { test, expect } from '@playwright/test';

test('menu and deterministic race fixtures are healthy', async ({ page }) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('/?e2e=1');
  await expect(page.getByTestId('app-title')).toHaveText('APEX DRIFT');
  await expect(page.getByTestId('car-option')).toHaveCount(4);
  await expect(page.getByTestId('track-option')).toHaveCount(3);
  await expect(page.getByTestId('webgl-fallback')).toBeHidden();
  await page.getByTestId('start-race').click();
  await expect(page.getByTestId('hud-lap')).toBeVisible();
  const fixture = await page.evaluate(() => {
    const api = window.__APEX_DRIFT_3D_E2E__;
    const hazard = api.enterHazardFixture({ trackId: 'dust-canyon' });
    const recovery = api.induceVehicleRecovery();
    const checkpoint = api.advanceCheckpointShortcut({ count: 12 });
    return { keys: Object.keys(api), hazard, recovery, checkpoint };
  });
  expect(fixture.keys).toEqual(expect.arrayContaining(['snapshot', 'placeVehicleAtFinishGate', 'advanceCheckpointShortcut', 'enterHazardFixture']));
  expect(fixture.hazard.surfaceEffect.type).toBe('sand');
  expect(fixture.recovery.transitionSource).toBe('production-vehicle-recovery');
  expect(fixture.checkpoint.checkpointsAdvanced).toBe(12);
  expect(errors).toEqual([]);
});
