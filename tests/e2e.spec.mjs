import { test, expect } from '@playwright/test';

async function start(page) {
  await page.goto('/?e2e=1');
  await expect(page.getByTestId('start-race')).toBeVisible();
  await page.getByTestId('start-race').click();
  await expect(page.getByTestId('hud-lap')).toBeVisible();
}

test('ordered production checkpoints reject early crossing and finish exactly three laps', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await start(page);
  const report = await page.evaluate(() => {
    const api = window.__APEX_DRIFT_3D_E2E__;
    const early = api.placeVehicleAtFinishGate({ mode: 'early' });
    const laps = [api.placeVehicleAtFinishGate({ mode: 'afterOrderedCheckpoints' }), api.placeVehicleAtFinishGate({ mode: 'afterOrderedCheckpoints' }), api.placeVehicleAtFinishGate({ mode: 'afterOrderedCheckpoints' })];
    return { early, laps, final: api.snapshot() };
  });
  expect(report.early.crossedFinish).toBe(false);
  expect(report.laps.map(lap => lap.crossedFinish)).toEqual([true, true, true]);
  expect(report.final.raceState).toBe('FINISHED');
  expect(report.final.lap).toBe(3);
  expect(report.final.aiTelemetryReport.ai).toHaveLength(5);
  expect(errors).toEqual([]);
});

test('fixtures use production surface, recovery, telemetry, and deterministic AI transitions', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await start(page);
  const report = await page.evaluate(() => {
    const api = window.__APEX_DRIFT_3D_E2E__;
    return {
      keys: Object.keys(api),
      hazard: api.enterHazardFixture({ trackId: 'dust-canyon' }),
      recovery: api.induceVehicleRecovery(),
      telemetry: api.runCarTelemetryFixture({ selectedCarId: 'pulse-rally', baselineCarId: 'vector-gt' }),
      ai: api.induceAiRecovery({ aiId: 'ai-01' }),
      snapshot: api.snapshot(),
    };
  });
  expect(report.keys).toEqual(expect.arrayContaining(['snapshot', 'placeVehicleAtFinishGate', 'advanceCheckpointShortcut', 'induceAiRecovery', 'enterHazardFixture', 'runCarTelemetryFixture']));
  expect(report.hazard.s).toBeCloseTo(.3);
  expect(report.hazard.surfaceEffect.type).toBe('sand');
  expect(report.hazard.after.surfaceEffect.type).toBe('sand');
  expect(report.recovery.selected.recoveryDurationMs).toBeGreaterThan(0);
  expect(report.telemetry.samples).toHaveLength(50);
  expect(report.telemetry.terminalSpeed).toBe(report.telemetry.samples.at(-1).speed);
  expect(report.ai.recoveryInput).toBe('off-route');
  expect(report.ai.recovered).toBe(true);
  expect(report.snapshot.aiTelemetryReport.ai).toHaveLength(5);
  expect(new Set(report.snapshot.aiTelemetryReport.ai.map(ai => ai.aiId))).toEqual(new Set(['ai-01', 'ai-02', 'ai-03', 'ai-04', 'ai-05']));
  expect(errors).toEqual([]);
});

test('M, restart, and repeated starts leave at most one canvas without errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await start(page);
  await expect(page.locator('canvas')).toHaveCount(1);
  await page.keyboard.press('M');
  await expect(page.locator('canvas')).toHaveCount(0);
  await page.getByTestId('start-race').click();
  await expect(page.locator('canvas')).toHaveCount(1);
  await page.keyboard.press('r');
  await expect(page.locator('canvas')).toHaveCount(1);
  await page.keyboard.press('M');
  await expect(page.locator('canvas')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('WebGL import failure and renderer construction failure show fallback without pageerror', async ({ page }) => {
  const importErrors = [];
  page.on('pageerror', error => importErrors.push(error.message));
  await page.route('**/vendor/three.module.min.js', route => route.abort());
  await page.goto('/?e2e=1');
  await expect(page.getByTestId('webgl-fallback')).toBeVisible();
  expect(importErrors).toEqual([]);

  const rendererPage = await page.context().newPage();
  const rendererErrors = [];
  rendererPage.on('pageerror', error => rendererErrors.push(error.message));
  await rendererPage.addInitScript(() => {
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (kind, ...args) {
      if (kind === 'webgl' || kind === 'webgl2' || kind === 'experimental-webgl') return null;
      return originalGetContext.call(this, kind, ...args);
    };
  });
  await rendererPage.goto('/?e2e=1');
  await expect(rendererPage.getByTestId('webgl-fallback')).toBeVisible();
  if (await rendererPage.getByTestId('start-race').isVisible()) await rendererPage.getByTestId('start-race').click({ force: true });
  await expect(rendererPage.getByTestId('webgl-fallback')).toBeVisible();
  expect(await rendererPage.locator('canvas').count()).toBe(0);
  expect(rendererErrors).toEqual([]);
  await rendererPage.close();
});
