import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  let isLoggedIn = !!token;
  const handleLogin = (token) => {
    setToken(token);
  };
  const handleLogout = () => {
    setToken(null);
  };
  const contextValue = {
    token: token,
    isLoggedIn: isLoggedIn,
    login: handleLogin,
    logout: handleLogout,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
