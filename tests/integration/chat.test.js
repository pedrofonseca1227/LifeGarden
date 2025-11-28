import { describe, it, expect, vi } from "vitest";
import { sendMessage } from "../../src/services/messageService.js";

vi.mock("firebase/app", () => ({
  initializeApp: vi.fn(() => ({})),
}));
vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(() => ({})),
}));
vi.mock("firebase/firestore", () => ({
  getFirestore: vi.fn(() => ({})),
  collection: vi.fn(() => ({})),
  addDoc: vi.fn(() => Promise.resolve({ id: "msg123" })),
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
    Promise.resolve("https://mocked-url.com/imagem.png")
  ),
}));
describe("Chat", () => {
  it("Deve enviar mensagem sem erro", async () => {
    await expect(
      sendMessage("chat123", "eu@teste.com", "eu2@teste.com", "Ola como vai")
    ).resolves.not.toThrow();
  });
});
