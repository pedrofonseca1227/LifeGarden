import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("firebase/app", () => ({
  initializeApp: vi.fn(() => ({})),
  getApps: () => [],
}));


vi.mock("firebase/firestore", () => {
  const docsMock = [
    {
      id: "m1",
      data: () => ({
        chatId: "produto123_email@test.com",
        texto: "Olá!",
        remetenteEmail: "email@test.com",
        destinatarioEmail: "produtor@test.com",
        createdAt: new Date(),
      }),
    },
  ];

  return {
    collection: vi.fn(() => "mensagens"),
    addDoc: vi.fn(async (ref, data) => ({ id: "msg1", ...data })),

    doc: vi.fn((db, col, id) => ({ id })),
    getDoc: vi.fn(async () => ({
      exists: () => true,
      data: () => ({
        produtorEmail: "produtor@test.com",
      }),
    })),

    where: vi.fn(),
    orderBy: vi.fn(),
    query: vi.fn(),
    
    getDocs: vi.fn(async () => ({
      docs: docsMock,
      forEach: (cb) => docsMock.forEach(cb),
    })),

    onSnapshot: vi.fn(),
  };
});


vi.mock("../../src/services/firebaseConfig.js", () => ({
  db: {}, 
}));

import {
  sendMessage,
  getUserChats,
  validarAcessoChat,
} from "../../src/services/messageService.js";



describe("messageService", () => {

  it("deve enviar mensagem", async () => {
    const resp = await sendMessage("chat123", "a@a.com", "b@b.com", "Olá");

    expect(resp).toBeUndefined();
  });

  it("deve permitir acesso ao chat", async () => {
    const acesso = await validarAcessoChat(
      "produto123_email@test.com",
      "email@test.com"
    );

    expect(acesso).toBe(true);
  });

  it("deve retornar conversas do usuário", async () => {
    const chats = await getUserChats("email@test.com");

    expect(chats.length).toBe(1);
    expect(chats[0].chatId).toBe("produto123_email@test.com");
  });

});
