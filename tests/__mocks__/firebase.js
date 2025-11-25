export const initializeApp = () => ({ app: true });

// AUTH
export const getAuth = () => ({ auth: true });

// FIRESTORE
export const getFirestore = () => ({ db: true });
export const collection = () => "collection";
export const addDoc = () => Promise.resolve({ id: "mocked-id" });
export const getDocs = () => Promise.resolve({ docs: [] });
export const query = () => "query";
export const where = () => "where";
export const orderBy = () => "orderBy";

// STORAGE
export const getStorage = () => ({ storage: true });
export const ref = () => "ref";
export const uploadBytes = () => Promise.resolve({ ref: "ref" });
export const getDownloadURL = () =>
  Promise.resolve("https://mocked-url.com/imagem.png");

export default {
  initializeApp,
  getAuth,

  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,

  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
};
