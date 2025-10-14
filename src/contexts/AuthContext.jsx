import React, { createContext, useState, useEffect } from 'react';

// Cria o contexto
export const AuthContext = createContext();

// Provider do contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // No futuro, aqui vamos verificar o usuário logado no Firebase
  useEffect(() => {
    // Exemplo: buscar usuário salvo no localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (email) => {
    const userData = { email };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
