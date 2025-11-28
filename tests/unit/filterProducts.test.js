import { describe, it, expect } from "vitest";
import { filterProducts } from "../../src/utils/filterProducts.js";

const produtosMock = [
  { nome: "Tomate", descricao: " Tomate Cereja", categoria: "Frutas", preco: 10 },
  { nome: "Alface", descricao: " Alface Americano", categoria: "Verduras", preco: 80 },
];
describe("Filtro de produtos", () => {
  it("deve filtrar pelo nome", () => {
    const result = filterProducts(produtosMock, "tom", "todos", "", "");
    expect(result.length).toBe(1);
    expect(result[0].nome).toBe("Tomate");
  });
  it("deve filtrar por categoria", () => {
    const result = filterProducts(produtosMock, "", "Verduras", "", "");
    expect(result.length).toBe(1);
    expect(result[0].nome).toBe("Alface");
  });
  it("deve aplicar filtro de preço mínimo", () => {
    const result = filterProducts(produtosMock, "", "todos", 50, "");
    expect(result.length).toBe(1);
    expect(result[0].nome).toBe("Alface");
  });
  it("deve aplicar filtro de preço máximo", () => {
    const result = filterProducts(produtosMock, "", "todos", "", 20);
    expect(result.length).toBe(1);
    expect(result[0].nome).toBe("Tomate");
  });
});
