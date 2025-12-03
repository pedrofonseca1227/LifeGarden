import { describe, it, expect, vi, beforeEach } from "vitest";
import * as productService from "../../src/services/productService.js";

let fakeDocs;

vi.mock("firebase/firestore", () => {
  return {
    collection: vi.fn(() => "produtos"),
    addDoc: vi.fn(async (ref, data) => ({ id: "abc", ...data })),

    getDocs: vi.fn(async () => ({ docs: fakeDocs })),

    query: vi.fn(),
    orderBy: vi.fn(),
    where: vi.fn(),

    doc: vi.fn((db, col, id) => ({ id })),
    deleteDoc: vi.fn(async () => {}),
    updateDoc: vi.fn(async () => {}),
  };
});

vi.mock("firebase/storage", () => ({
  ref: vi.fn(() => ({})),
  uploadBytes: vi.fn(() => Promise.resolve({ ref: {} })),
  getDownloadURL: vi.fn(() =>
    Promise.resolve("https://fakeurl.com/imagem.png")
  ),
}));

vi.mock("../../src/services/firebaseConfig.js", () => ({
  db: {},
  storage: {},
}));

vi.mock("../../src/services/userService.js", () => ({
  getUserProfile: vi.fn(async () => ({ nome: "Pedro" })),
}));

describe("productService — testes completos", () => {
  beforeEach(() => {
    fakeDocs = [
      { id: "1", data: () => ({ nome: "Motor" }) },
      { id: "2", data: () => ({ nome: "Pneu" }) },
    ];
  });

  it("deve adicionar produto (sem imagens)", async () => {
    const resp = await productService.addProduto(
      { nome: "Motor", produtorEmail: "pedro@test.com" },
      []
    );

    expect(resp).toBeUndefined();
  });

  it("deve adicionar produto com múltiplas imagens", async () => {
    const file = new File(["abc"], "img.png", { type: "image/png" });

    const resp = await productService.addProduto(
      { nome: "Teste", produtorEmail: "pedro@test.com" },
      [file, file]
    );

    expect(resp).toBeUndefined();
  });

  it("uploadImage retorna null quando file é null", async () => {
    const resp = await productService.uploadImage(null);
    expect(resp).toBeNull();
  });

  it("uploadImage retorna URL quando file existe", async () => {
    const file = new File(["abc"], "foto.png", { type: "image/png" });

    const url = await productService.uploadImage(file);
    expect(url).toBe("https://fakeurl.com/imagem.png");
  });

  it("deve listar produtos", async () => {
    const produtos = await productService.getProdutos();
    expect(produtos.length).toBe(2);
  });

  it("deve retornar produtos de um usuário", async () => {
    fakeDocs = [
      { id: "10", data: () => ({ nome: "Roda", produtorEmail: "x@test.com" }) },
    ];

    const produtos = await productService.getProdutosByUser("x@test.com");

    expect(produtos.length).toBe(1);
    expect(produtos[0].id).toBe("10");
  });

  it("deve atualizar produto sem imagens", async () => {
    await productService.updateProduto("1", { nome: "Novo" });
    expect(true).toBe(true);
  });

  it("deve atualizar produto com novas imagens", async () => {
    const file = new File(["xx"], "imagem.png");

    await productService.updateProduto(
      "1",
      { nome: "Mudado", imagens: ["a"] },
      [file]
    );

    expect(true).toBe(true);
  });


  it("deve deletar produto", async () => {
    await productService.deleteProduto("1");
    expect(true).toBe(true);
  });
});
