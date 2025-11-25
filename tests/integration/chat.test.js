import { describe, it, expect, vi } from "vitest";

vi.mock("firebase/app", () => require("../__mocks__/firebase.js"));
vi.mock("firebase/auth", () => require("../__mocks__/firebase.js"));
vi.mock("firebase/firestore", () => require("../__mocks__/firebase.js"));
vi.mock("firebase/storage", () => require("../__mocks__/firebase.js"));

import { sendMessage } from "../../src/services/messageService.js";

describe("Chat - integração", () => {
  it("deve enviar mensagem sem erro", async () => {
    await expect(
      sendMessage("chat123", "eu@teste.com", "dest@teste.com", "Olá!")
    ).resolves.not.toThrow();
  });
});
