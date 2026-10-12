import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route(/\.(?:png|jpe?g|webp|gif|svg|woff2?)(?:\?.*)?$/i, (route) => route.abort());
  await page.addInitScript(() => sessionStorage.setItem("bangladesh_buildcon_intro_shown", "true"));
});

test("homepage loads with hero content and event facts", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Bangladesh Buildcon/i }).first()).toBeVisible();
  await expect(
    page.getByRole("region", { name: /Hero Banner/i }).getByText("17–19 September 2026"),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Book a Stand" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Register to Visit" }).first()).toBeVisible();
});

test("desktop nav dropdown reveals submenu items", async ({ page, isMobile }) => {
  // The primary nav is `hidden lg:block` — there is nothing to hover on
  // narrow/mobile viewports, where the hamburger menu takes over instead.
  test.skip(isMobile, "Desktop-only: primary nav is hidden below the lg breakpoint");
  await page.goto("/");
  const primaryNav = page.getByRole("navigation", { name: "Primary" });
  await primaryNav.getByRole("link", { name: "About", exact: true }).hover();
  await expect(primaryNav.getByRole("link", { name: "Why Bangladesh" })).toBeVisible();
});

test("footer shows event dates and organiser logos", async ({ page }) => {
  await page.goto("/");
  const heading = page.getByText("Jointly Organised By", { exact: true });
  await heading.scrollIntoViewIfNeeded();
  await expect(heading).toBeVisible();
});
