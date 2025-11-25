import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../services/firebaseConfig';

import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  updateProfile 
} from 'firebase/auth';

import { saveUserProfile } from '../services/userService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Observa mudanças no usuário logado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // LOGIN NORMAL
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
    
  };

  // CADASTRO COM NOME
  const register = async (nome, email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    // Salva o nome no Firebase Auth
    await updateProfile(cred.user, { displayName: nome });

    // Salva no Firestore (opcional, mas muito recomendado)
    await saveUserProfile(email, {
      nome,
      telefone: "",
      cidade: "",
      estado: "",
      tipo: "produtor"
    });

    // Atualiza estado local
    setUser({
      ...cred.user,
      displayName: nome
    });

    return cred.user;
  };

  // LOGOUT
  const logout = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
