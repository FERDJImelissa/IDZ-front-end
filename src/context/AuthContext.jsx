import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('idz_user');
    return saved ? JSON.parse(saved) : { prenom: 'Citoyen', nom: 'DZ', type: 'citoyen' };
  });

  const login = (userData) => {
    const newUser = { ...user, ...userData };
    setUser(newUser);
    localStorage.setItem('idz_user', JSON.stringify(newUser));
  };

  const logout = () => {
    localStorage.removeItem('idz_user');
    setUser({ prenom: 'Citoyen', nom: 'DZ', type: 'citoyen' });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
