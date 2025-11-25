import { describe, it, expect, vi } from "vitest";

vi.mock("firebase/app", () => require("../__mocks__/firebase.js"));
vi.mock("firebase/auth", () => require("../__mocks__/firebase.js"));
vi.mock("firebase/firestore", () => require("../__mocks__/firebase.js"));
vi.mock("firebase/storage", () => require("../__mocks__/firebase.js"));

import { uploadImage } from "../../src/services/productService.js";

describe("Upload de imagens", () => {
  it("deve retornar a URL simulada", async () => {
    const file = new File(["conteudo"], "imagem.png", { type: "image/png" });

    const url = await uploadImage(file);

    expect(url).toBe("https://mocked-url.com/imagem.png");
  });
});
