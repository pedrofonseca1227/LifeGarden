import { describe, it, expect } from "vitest";
import { calcularMediaAvaliacoes, gerarEstrelas } from "../../src/utils/ratingUtils.js";

describe("Sistema de Avaliação - Testes Unitários", () => {
  it("deve calcular a média corretamente", () => {
    const notas = [5, 4, 3];
    const media = calcularMediaAvaliacoes(notas);
    expect(media).toBe(4.0);
  });

  it("deve retornar 0 para array vazio", () => {
    const media = calcularMediaAvaliacoes([]);
    expect(media).toBe(0);
  });

  it("deve retornar 0 caso notas seja null", () => {
    const media = calcularMediaAvaliacoes(null);
    expect(media).toBe(0);
  });

  it("deve gerar estrelas corretamente", () => {
    const estrelas = gerarEstrelas(3);
    expect(estrelas).toBe("★★★☆☆");
  });

  it("não deve permitir nota maior que 5", () => {
    const estrelas = gerarEstrelas(10);
    expect(estrelas).toBe("★★★★★");
  });

  it("não deve permitir nota menor que 0", () => {
    const estrelas = gerarEstrelas(-5);
    expect(estrelas).toBe("☆☆☆☆☆");
  });
});
