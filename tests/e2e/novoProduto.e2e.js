import { test, expect } from "@playwright/test";

test("Adicionar produto: fluxo completo", async ({ page }) => {
  await page.goto("http://localhost:5173/login");
  await page.fill(".login-input.email", "playwright_teste@teste.com");
  await page.fill(".login-input.password", "Teste@123");
  await page.click(".login-button");
  await expect(page.getByText("Filtre os produtos")).toBeVisible();
  await page.goto("http://localhost:5173/novo-produto");
  await expect(page.getByText("Cadastrar Novo Produto")).toBeVisible();
  await page.fill("input[placeholder='Nome do produto']", "Produto Teste QA");
  await page.fill("input[placeholder='Preço (R$)']", "9.99");
  await page.fill("textarea[placeholder='Descrição']", "Produto criado pelo Playwright");
  await page.fill("input[placeholder='Ex: Legumes, frutas, hortaliças...']", "Testes");
  await page.click("button.novoproduto-button");
  page.once("dialog", dialog => {
    console.log("ALERTA:", dialog.message());
    dialog.accept();
  });
  await expect(page.locator("input[placeholder='Nome do produto']")).toHaveValue("");
});
