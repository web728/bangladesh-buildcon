import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route(/\.(?:png|jpe?g|webp|gif|svg|woff2?)(?:\?.*)?$/i, (route) => route.abort());
  await page.addInitScript(() => sessionStorage.setItem("bangladesh_buildcon_intro_shown", "true"));
});

test("book a stand form exposes its required controls and CAPTCHA gate", async ({ page }) => {
  await page.goto("/book-a-stand");
  await expect(page.getByLabel("Company Name")).toBeVisible();
  await expect(page.getByLabel("Product Category / Sector")).toBeVisible();
  await expect(page.getByRole("button", { name: "Shell Scheme" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Submit Exhibitor Application" })).toBeDisabled();
});

test("visitor registration form exposes its required controls and CAPTCHA gate", async ({ page }) => {
  await page.goto("/register-to-visit");
  await expect(page.getByLabel("First Name")).toBeVisible();
  await expect(page.getByLabel("Business Email")).toBeVisible();
  await expect(page.getByRole("button", { name: "Complete Visitor Registration" })).toBeDisabled();
});

test("contact form exposes its required controls and CAPTCHA gate", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByLabel("Full Name")).toBeVisible();
  await expect(page.getByLabel("Business Email")).toBeVisible();
  await expect(page.getByRole("button", { name: "Send Message" })).toBeDisabled();
});

test("exhibitor directory search filters results", async ({ page }) => {
  await page.goto("/exhibitors");
  const emptyState = page.getByText("Exhibitor Allocations Underway");
  if (await emptyState.isVisible().catch(() => false)) {
    test.skip(true, "No exhibitors published in this environment");
  }
  await page.getByLabel(/Search exhibitors/i).fill("zzz-no-match-zzz");
  await expect(page.getByText("0 exhibitors")).toBeVisible();
});
