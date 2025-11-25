import { test, expect } from "@playwright/test";

test("Fluxo completo: acessar home, buscar produto, filtrar e abrir detalhes", async ({ page }) => {
  // 1) Acessa o site local (alterar se estiver em outra porta)
  await page.goto("http://localhost:5173/");

  // A Home deve ter o título
  await expect(page.locator("text=Produtos disponíveis")).toBeVisible();

  // 2) Buscar por um produto
  await page.fill("input[placeholder='Buscar por nome ou descrição...']", "tomate");

  // Aguarda resultados filtrados
  const produtos = page.locator("h3");
  await expect(produtos).toContainText(["Tomate"]);

  // 3) Aplicar categoria
  await page.selectOption("select", "Alimentos");

  // Verifica se o item está filtrado corretamente
  await expect(produtos).toContainText(["Tomate"]);

  // 4) Abrir card do produto
  const card = page.locator("a", { hasText: "Conversar com o produtor" }).first();
  await card.click();

  // 5) Verifica se entrou na página correta
  await expect(page.locator("text=Conversando com")).toBeVisible();
});
