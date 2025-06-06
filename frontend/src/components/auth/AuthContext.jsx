import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);


  useEffect(() => {
    const token = localStorage.getItem("access_token");
    console.log(axiosInstance);
    
    if (!token) {
      setUser(null);
      setIsAuthenticated(false);
      setIsAuthLoading(false);
      return;
    }
  
    axiosInstance.get("http://localhost:8000/users/me", { headers: { Authorization: `Bearer ${token}`, }, })
      .then((res) => { setUser(res.data); setIsAuthenticated(true); })
      .catch(() => { setUser(null); setIsAuthenticated(false); })
      .finally(() => setIsAuthLoading(false));
  }, []);

  const logout = async () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
    setUser(null);

    await axiosInstance
      .post("http://localhost:8000/auth/logout", { withCredentials: true })
      .then(() => {
        alert("Успешный выход из учетной записи");
      })
      .catch((error) => console.error("Error while logged out", error));
    delete axiosInstance.defaults.headers.common["Authorization"];
  };

  const setUser_ = (newData) => {
    setUser(newData);
  }

  const setFlag = (authState) => {
    setIsAuthenticated(authState);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, logout , setFlag, setUser_, isAuthLoading }}>
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => useContext(AuthContext);