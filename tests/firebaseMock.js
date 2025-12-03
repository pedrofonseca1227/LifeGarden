import { vi } from "vitest";

export function mockFirebase() {
  vi.mock("firebase/app", () => ({
    initializeApp: vi.fn(() => ({})),
  }));

  vi.mock("firebase/auth", () => ({
    getAuth: vi.fn(() => ({})),
    signInWithEmailAndPassword: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
  }));

  vi.mock("firebase/firestore", () => ({
    getFirestore: vi.fn(() => ({})),
    collection: vi.fn(() => ({})),
    addDoc: vi.fn(),
    getDocs: vi.fn(),
    getDoc: vi.fn(),
    updateDoc: vi.fn(),
    deleteDoc: vi.fn(),
    setDoc: vi.fn(),
    query: vi.fn(() => ({})),
    where: vi.fn(() => ({})),
    orderBy: vi.fn(() => ({})),
    doc: vi.fn(() => ({})),
  }));

  vi.mock("firebase/storage", () => ({
    getStorage: vi.fn(() => ({})),
    ref: vi.fn(() => ({})),
    uploadBytes: vi.fn(),
    getDownloadURL: vi.fn(),
  }));
}
