import { describe, it, expect, vi } from "vitest";
import { uploadImage } from "../../src/services/productService.js";

vi.mock("firebase/app", () => ({
  initializeApp: vi.fn(() => ({})),
}));
vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(() => ({})),
}));
vi.mock("firebase/firestore", () => ({
  getFirestore: vi.fn(() => ({})),
  collection: vi.fn(() => ({})),
  addDoc: vi.fn(),
  getDocs: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  orderBy: vi.fn(),
  doc: vi.fn(() => ({})),
  getDoc: vi.fn(),
  setDoc: vi.fn(),
  deleteDoc: vi.fn(),
  updateDoc: vi.fn(),
}));
vi.mock("firebase/storage", () => ({
  getStorage: vi.fn(() => ({})),
  ref: vi.fn(() => ({})),
  uploadBytes: vi.fn(() => Promise.resolve({ ref: {} })),
  getDownloadURL: vi.fn(() =>
    Promise.resolve("https://santasticos.com/imagem.png")
  ),
}));
describe("Upload de imagens", () => {
  it("deve retornar a URL simulada", async () => {
    const file = new File(["conteudo"], "imagem.png", { type: "image/png" });
    const url = await uploadImage(file);
    expect(url).toBe("https://santasticos.com/imagem.png");
  });
});
