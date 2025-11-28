import { describe, it, expect } from "vitest";

const produtosFake = [
  { nome: "Abobora Cabotian", preco: 120 },
  { nome: "Alface Premium", preco: 45 },
  { nome: "Tomate Cereja", preco: 12 },
];
describe("Filtros de busca", () => {
  it("deve filtrar por nome", () => {
    const busca = "Alface";
    const resultado = produtosFake.filter((p) =>
      p.nome.toLowerCase().includes(busca.toLowerCase())
    );
    expect(resultado.length).toBe(1);
    expect(resultado[0].nome).toBe("Alface Premium");
  });
  it("deve filtrar por preço mínimo", () => {
    const precoMin = 50;
    const resultado = produtosFake.filter((p) => p.preco >= precoMin);
    expect(resultado.length).toBe(1);
    expect(resultado[0].nome).toBe("Abobora Cabotian");
  });
});