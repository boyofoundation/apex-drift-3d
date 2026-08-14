import { defineConfig, devices } from '@playwright/test';
export default defineConfig({testDir:'./tests',timeout:15000,fullyParallel:false,use:{baseURL:'http://127.0.0.1:8081',trace:'retain-on-failure'},webServer:{command:'python3 -m http.server 8081',url:'http://127.0.0.1:8081',reuseExistingServer:true},projects:[{name:'chromium',use:{...devices['Desktop Chrome']}}]});
