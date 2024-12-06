import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const storedToken = JSON.parse(localStorage.getItem("token"));
    if (storedToken && Date.now() < storedToken.expireTokenTime) {
      return storedToken.token;
    }
    localStorage.removeItem("token");
    return null;
  });

  let isLoggedIn = !!token;

  const handleLogin = (token) => {
    setToken(token);
    const expireTokenTime = Date.now() + 5 * 60 * 1000;
    localStorage.setItem(
      "token",
      JSON.stringify({ token: token, expireTokenTime: expireTokenTime })
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const storedToken = JSON.parse(localStorage.getItem("token"));
      if (storedToken && Date.now() >= storedToken.expireTokenTime) {
        handleLogout();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
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
