// global-setup.ts
import { chromium, expect, request } from "@playwright/test";

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const requestContext = await request.newContext();

  const googleResponse = await requestContext.post(
    "https://www.googleapis.com/oauth2/v4/token",
    {
      data: {
        grant_type: "refresh_token",
        client_id: process.env.VITE_CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        refresh_token: process.env.REFRESH_TOKEN,
      },
    }
  );

  expect(googleResponse.ok()).toBeTruthy;
  const data = await googleResponse.json();
  expect(data.id_token).toBeDefined();

  const appResponse = await page.request.post("http://localhost:3000/signin", {
    form: { credential: data.id_token },
  });

  expect(appResponse.ok()).toBeTruthy;

  // Save signed-in state to 'storageState.json'.
  await page.context().storageState({ path: "storageState.json" });
  await browser.close();
}

export default globalSetup;
