import { test, expect } from "@playwright/test";

test("Cadastro: criar nova conta", async ({ page }) => {
  await page.goto("http://localhost:5173/cadastro");
  await expect(page.getByText("Criar Conta")).toBeVisible();

  const random = Math.floor(Math.random() * 999999);
  const email = `teste${random}@exemplo.com`;
  await page.fill("input[placeholder='Seu nome completo']", "Usuário Teste");
  await page.fill("input[placeholder='Seu e-mail']", email);
  await page.fill("input[placeholder='Senha']", "Senha123");
  await page.click("button.cadastro-button");
  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toContain("sucesso");
    await dialog.dismiss();
  });
});
