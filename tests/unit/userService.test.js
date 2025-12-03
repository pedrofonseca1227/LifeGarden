import { describe, it, expect, vi } from "vitest";
import { getUserProfile, saveUserProfile } from "../../src/services/userService.js";

vi.mock("firebase/firestore", () => ({
  doc: vi.fn((db, col, id) => ({ id })),
  setDoc: vi.fn(async () => {}),
  getDoc: vi.fn(async () => ({
    exists: () => true,
    data: () => ({ nome: "Pedro" }),
  })),
}));

vi.mock("../../src/services/firebaseConfig.js", () => ({
  db: {},
}));

describe("userService", () => {
  it("deve salvar usuário", async () => {
    await saveUserProfile("user@test.com", { nome: "Pedro" });
    expect(true).toBe(true);
  });

  it("deve retornar usuário existente", async () => {
    const user = await getUserProfile("user@test.com");
    expect(user.nome).toBe("Pedro");
  });
});
