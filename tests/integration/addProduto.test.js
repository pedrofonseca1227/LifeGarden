import { describe, it, expect, vi } from "vitest";
import { addProduto } from "../../src/services/productService.js";
import { db } from "../../src/services/firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";

vi.mock("firebase/firestore", () => ({
  doc: vi.fn(() => ({})),  
  getDoc: vi.fn(() => Promise.resolve({exists: () => true, data: () => ({ nome: "Mock User", email: "mock@mock.com" })})),
  setDoc: vi.fn(() => Promise.resolve()),
  getFirestore: vi.fn(() => ({})),
  collection: vi.fn(() => ({})),
  addDoc: vi.fn(() => Promise.resolve({ id: "mocked-id" })),
  getDocs: vi.fn(() => Promise.resolve({ docs: [] })),
  query: vi.fn(),
  where: vi.fn(),
  orderBy: vi.fn(),
  deleteDoc: vi.fn(() => Promise.resolve()),
  updateDoc: vi.fn(() => Promise.resolve()),
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
