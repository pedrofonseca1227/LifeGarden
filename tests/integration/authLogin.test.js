import { describe, it, expect, vi } from "vitest";
import { loginUser } from "../../src/services/authService";

vi.mock("../src/services/firebaseConfig.js", () => ({
  auth: {},
  db: {},
  storage: {}
}));
vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(() => ({})),
  signInWithEmailAndPassword: vi.fn(() =>
    Promise.resolve({
      user: { email: "teste@teste.com" }
    })
  )
}));
describe("Login", () => {
  it("deve logar o usuário com email e senha", async () => {
    const user = await loginUser("teste@teste.com", "123456");

    expect(user.email).toBe("teste@teste.com");
  });
});
