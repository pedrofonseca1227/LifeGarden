import { test, expect } from "@playwright/test";

test("Login: entrar com usuário válido", async ({ page }) => {
  await page.goto("http://localhost:5173/login");
  await expect(page.getByRole("heading", { name: "Entrar" })).toBeVisible();
  await page.fill(".login-input.email", "playwright_teste@teste.com");
  await page.fill(".login-input.password", "Teste@123");
  await page.getByRole("button", { name: "Entrar" }).click();
  await expect(page.getByText("Filtre os produtos")).toBeVisible();
});
