import { describe, it, expect, vi } from "vitest";

// Mock do firebaseConfig (não usa Firebase real)
vi.mock("../src/services/firebaseConfig.js", () => ({
  auth: {},
  db: {},
  storage: {}
}));

// Mock das funções do Firebase Auth
vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(() => ({})),
  signInWithEmailAndPassword: vi.fn(() =>
    Promise.resolve({
      user: { email: "teste@teste.com" }
    })
  )
}));

// Importa o serviço real (já mockado)
import { loginUser } from "../../src/services/authService";

describe("Login - integração", () => {
  it("deve logar o usuário com e-mail e senha corretos", async () => {
    const user = await loginUser("teste@teste.com", "123456");

    expect(user.email).toBe("teste@teste.com");
  });
});
