import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  sendMessage,
  validarAcessoChat,
  getUserChats,
  listenMessages,
} from "../../src/services/messageService.js";

let mockDocs = [
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

vi.mock("firebase/app", () => ({
  initializeApp: vi.fn(() => ({})),
  getApps: () => [],
}));

vi.mock("../../src/services/firebaseConfig.js", () => ({
  db: {},
}));

vi.mock("firebase/firestore", () => ({
  collection: vi.fn(() => "mensagens"),

  addDoc: vi.fn(async (ref, data) => ({
    id: "msg1",
    ...data,
  })),

  doc: vi.fn((db, col, id) => ({ id })),

  getDoc: vi.fn(async () => ({
    exists: () => true,
    data: () => ({ produtorEmail: "produtor@test.com" }),
  })),

  where: vi.fn(),
  orderBy: vi.fn(),
  query: vi.fn(),

  getDocs: vi.fn(async () => ({
    docs: mockDocs,
    forEach: (cb) => mockDocs.for(cb),
  })),

  onSnapshot: vi.fn(),
}));

import {
  collection,
} from "firebase/firestore";

describe("messageService — testes completos", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockDocs = [
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
  });

  it("deve validar acesso ao chat corretamente", async () => {
    const acesso = await validarAcessoChat(
      "produto123_email@test.com",
      "email@test.com"
    );

    expect(acesso).toBe(true);
  });

  it("deve bloquear acesso se chatId for inválido", async () => {
    const acesso = await validarAcessoChat("semformato", "email@test.com");
    expect(acesso).toBe(false);
  });

  it("deve enviar mensagem", async () => {
    const resp = await sendMessage("chat123", "a@a.com", "b@b.com", "Olá");

    expect(resp).toEqual(
      expect.objectContaining({
        id: "msg1",
        chatId: "chat123",
        remetenteEmail: "a@a.com",
        destinatarioEmail: "b@b.com",
        texto: "Olá",
      })
    );
  });

  it("deve retornar null quando snapshot falhar", () => {
    collection.mockImplementationOnce(() => {
      throw new Error("Falha");
    });

    const resp = listenMessages("chatX", vi.fn());

    expect(resp).toBeNull();
  });

  it("deve retornar conversas do usuário", async () => {
    const chats = await getUserChats("email@test.com");

    expect(chats.length).toBe(1);
    expect(chats[0].chatId).toBe("produto123_email@test.com");
  });
});
