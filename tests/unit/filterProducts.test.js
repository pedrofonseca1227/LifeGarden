import { describe, it, expect } from "vitest";
import { filterProducts } from "../../src/utils/filterProducts.js";

const produtosMock = [
  { nome: "Tomate", descricao: "Fresco", categoria: "Alimentos", preco: 10 },
  { nome: "Enxada", descricao: "Ferramenta agrícola", categoria: "Ferramentas", preco: 80 },
  { nome: "Sementes de milho", descricao: "Orgânico", categoria: "Mudas e Sementes", preco: 25 },
];

describe("Filtro de produtos", () => {
  it("deve filtrar pelo nome", () => {
    const result = filterProducts(produtosMock, "tom", "todos", "", "");
    expect(result.length).toBe(1);
    expect(result[0].nome).toBe("Tomate");
  });

  it("deve filtrar por categoria", () => {
    const result = filterProducts(produtosMock, "", "Ferramentas", "", "");
    expect(result.length).toBe(1);
    expect(result[0].nome).toBe("Enxada");
  });

  it("deve aplicar filtro de preço mínimo", () => {
    const result = filterProducts(produtosMock, "", "todos", 50, "");
    expect(result.length).toBe(1);
    expect(result[0].nome).toBe("Enxada");
  });

  it("deve aplicar filtro de preço máximo", () => {
    const result = filterProducts(produtosMock, "", "todos", "", 20);
    expect(result.length).toBe(1);
    expect(result[0].nome).toBe("Tomate");
  });

  it("deve filtrar por nome OU descrição", () => {
    const result = filterProducts(produtosMock, "ferramenta", "todos", "", "");
    expect(result.length).toBe(1);
    expect(result[0].nome).toBe("Enxada");
  });
});
