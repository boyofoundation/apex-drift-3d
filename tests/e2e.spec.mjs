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
    const lifecycle = {
      early: api.placeVehicleAtFinishGate({ mode: 'early' }),
      lapTwo: api.placeVehicleAtFinishGate({ mode: 'afterOrderedCheckpoints' }),
      lapThree: api.placeVehicleAtFinishGate({ mode: 'afterOrderedCheckpoints' }),
      finished: api.placeVehicleAtFinishGate({ mode: 'afterOrderedCheckpoints' }),
    };
    return { keys: Object.keys(api), hazard, recovery, checkpoint, lifecycle, snapshot: api.snapshot() };
  });
  expect(fixture.keys).toEqual(expect.arrayContaining(['snapshot', 'placeVehicleAtFinishGate', 'advanceCheckpointShortcut', 'enterHazardFixture']));
  expect(fixture.hazard.surfaceEffect.type).toBe('sand');
  expect(fixture.recovery.transitionSource).toBe('production-vehicle-recovery');
  expect(fixture.checkpoint.checkpointsAdvanced).toBe(12);
  expect(fixture.lifecycle.early.crossedFinish).toBe(false);
  expect(fixture.lifecycle.lapTwo.crossedFinish).toBe(false);
  expect(fixture.lifecycle.lapThree.crossedFinish).toBe(false);
  expect(fixture.lifecycle.finished.crossedFinish).toBe(true);
  expect(fixture.lifecycle.finished.after.raceState).toBe('FINISHED');
  expect(fixture.snapshot.aiTelemetryReport.ai.every(ai => ai.finishState === 'racing' || ai.finishState === 'finished')).toBe(true);
  await expect(page.locator('canvas')).toHaveCount(0);
  await page.keyboard.press('M');
  await expect(page.locator('canvas')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('M tears down the active renderer and a new start has one canvas', async ({ page }) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('/?e2e=1');
  await page.getByTestId('start-race').click();
  await expect(page.locator('canvas')).toHaveCount(1);
  await page.keyboard.press('M');
  await expect(page.locator('canvas')).toHaveCount(0);
  await page.getByTestId('start-race').click();
  await expect(page.locator('canvas')).toHaveCount(1);
  expect(errors).toEqual([]);
});

test('blocked Three.js import shows fallback without pageerror', async ({ page }) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.route('**/vendor/three.module.min.js', route => route.abort());
  await page.goto('/?e2e=1');
  await expect(page.getByTestId('webgl-fallback')).toBeVisible();
  expect(errors).toEqual([]);
});
