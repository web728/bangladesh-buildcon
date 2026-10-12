import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route(/\.(?:png|jpe?g|webp|gif|svg|woff2?)(?:\?.*)?$/i, (route) => route.abort());
  await page.addInitScript(() => sessionStorage.setItem("bangladesh_buildcon_intro_shown", "true"));
});

test("homepage remains within the viewport at target breakpoints", async ({ page }) => {
  test.setTimeout(180_000);
  const widths = [320, 375, 390, 414, 768, 1024, 1280, 1440, 1920];

  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: /Bangladesh Buildcon/i }).first()).toBeVisible();

  for (const width of widths) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    await page.waitForTimeout(100);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(1);
  }
});

test("all public routes return successful responses", async ({ request }) => {
  test.setTimeout(180_000);
  const routes = [
    "/",
    "/about",
    "/why-bangladesh",
    "/exhibit",
    "/book-a-stand",
    "/exhibition-profile",
    "/exhibitor-services",
    "/exhibitors",
    "/visit",
    "/who-should-visit",
    "/register-to-visit",
    "/plan-your-visit",
    "/venue",
    "/partners",
    "/organisers",
    "/gallery",
    "/downloads",
    "/news",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
    "/cookie-policy",
  ];

  const responses = await Promise.all(routes.map(async (route) => [route, await request.get(route)] as const));
  for (const [route, response] of responses) expect(response.status(), route).toBeLessThan(400);
});
