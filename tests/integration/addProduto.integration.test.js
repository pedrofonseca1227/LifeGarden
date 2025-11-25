import { describe, it, expect, vi } from "vitest";
import { addProduto } from "../../src/services/productService.js";
import { db } from "../../src/services/firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";

vi.mock("firebase/firestore", () => ({
  getFirestore: vi.fn(() => ({})),
  collection: vi.fn(),
  addDoc: vi.fn(),
}));

describe("Teste de Integração - Cadastro de Produto", () => {
  it("deve enviar os dados corretos para o Firebase", async () => {

    const produto = {
      nome: "Teste Produto",
      preco: 100,
      descricao: "Produto de integração",
      produtorEmail: "teste@teste.com",
      imagens: []
    };

    await addProduto(produto, []);

    expect(collection).toHaveBeenCalledWith(db, "produtos");
    expect(addDoc).toHaveBeenCalled();
  });
});
