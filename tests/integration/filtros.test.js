import { describe, it, expect } from "vitest";

const produtosFake = [
  { nome: "Enxada Profissional", preco: 120 },
  { nome: "Adubo Premium", preco: 45 },
  { nome: "Sementes de Tomate", preco: 12 },
];

describe("Filtros de busca", () => {
  it("deve filtrar por nome", () => {
    const busca = "adubo";

    const resultado = produtosFake.filter((p) =>
      p.nome.toLowerCase().includes(busca.toLowerCase())
    );

    expect(resultado.length).toBe(1);
    expect(resultado[0].nome).toBe("Adubo Premium");
  });

  it("deve filtrar por preço mínimo", () => {
    const precoMin = 50;

    const resultado = produtosFake.filter((p) => p.preco >= precoMin);

    expect(resultado.length).toBe(1);
    expect(resultado[0].nome).toBe("Enxada Profissional");
  });
});