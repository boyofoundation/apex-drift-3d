import { defineConfig, devices } from '@playwright/test';
const port=process.env.PLAYWRIGHT_PORT||'8080';
export default defineConfig({testDir:'./tests',timeout:15000,fullyParallel:false,use:{baseURL:`http://127.0.0.1:${port}`,trace:'retain-on-failure'},webServer:{command:`python3 -m http.server ${port}`,url:`http://127.0.0.1:${port}`,reuseExistingServer:true},projects:[{name:'chromium',use:{...devices['Desktop Chrome']}}]});
