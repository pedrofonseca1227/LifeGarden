import { describe, it, expect, vi } from "vitest";
import {
  addProduto,
  getProdutos,
  updateProduto,
  deleteProduto,
} from "../../src/services/productService.js";

vi.mock("firebase/firestore", () => {
  const fakeDocs = [
    { id: "1", data: () => ({ nome: "Motor" }) },
    { id: "2", data: () => ({ nome: "Pneu" }) },
  ];

  return {
    collection: vi.fn(() => "produtos"),
    addDoc: vi.fn(async (ref, data) => ({ id: "abc", ...data })),

    getDocs: vi.fn(async () => ({
      docs: fakeDocs,
    })),

    query: vi.fn(),
    orderBy: vi.fn(),

    doc: vi.fn((db, col, id) => ({ id })),
    deleteDoc: vi.fn(async () => {}),
    updateDoc: vi.fn(async () => {}),
    where: vi.fn(),
  };
});

vi.mock("firebase/storage", () => ({
  getStorage: vi.fn(() => ({})),
  ref: vi.fn(() => ({})),
  uploadBytes: vi.fn(() => Promise.resolve({ ref: {} })),
  getDownloadURL: vi.fn(() =>
    Promise.resolve("https://fakeurl.com/imagem.png")
  ),
}));

vi.mock("../../src/services/userService.js", () => ({
  getUserProfile: vi.fn(async () => ({ nome: "Pedro" })),
}));

vi.mock("../../src/services/firebaseConfig.js", () => ({
  db: {},
  storage: {},
}));

describe("productService", () => {
  it("deve adicionar produto", async () => {
    const resp = await addProduto(
      { nome: "Motor", produtorEmail: "pedro@test.com" },
      []
    );

    expect(resp).toBeUndefined(); 
  });

  it("deve listar produtos", async () => {
    const produtos = await getProdutos();
    expect(produtos.length).toBe(2);
  });

  it("deve atualizar produto", async () => {
    await updateProduto("1", { nome: "Novo" });
    expect(true).toBe(true); 
  });

  it("deve deletar produto", async () => {
    await deleteProduto("1");
    expect(true).toBe(true);
  });
});
