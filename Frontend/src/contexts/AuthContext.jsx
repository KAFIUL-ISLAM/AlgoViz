import { createContext, useState, useEffect, useContext } from "react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user from JWT on app start
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        setUser({ username: decoded.username, email: decoded.email });
      } catch (err) {
        console.error("Invalid token:", err);
        logout(); // optional: force logout if token is broken
      }
    }
  }, []);

  const login = (access, refresh) => {
    try {
      const decoded = jwt_decode(access);
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      setUser({ username: decoded.username, email: decoded.email });
    } catch (err) {
      console.error("Invalid token:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
