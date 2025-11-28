import { test, expect } from "@playwright/test";

test("Fluxo completo REAL: carregar home, buscar produto, abrir detalhes", async ({ page }) => {

  await page.goto("http://localhost:5173/");
  await expect(page.getByText("Filtre os produtos")).toBeVisible();

  const produtos = page.locator(".produto-titulo");
  const primeiroProduto = produtos.first();
  const nomeProduto = (await primeiroProduto.textContent()).trim();
  console.log("🟦 Produto capturado:", nomeProduto);

  const termoBusca = nomeProduto.slice(0, 3); 
  await page.fill("input[placeholder='Buscar por nome ou descrição...']", termoBusca);
  await expect(page.locator(".produto-titulo")).toContainText(termoBusca);
  await page.locator(".produto-titulo").first().click();
  await expect(page.getByText(nomeProduto)).toBeVisible();
  await expect(
    page.getByText("Faça login para conversar")
  ).toBeVisible();
});
