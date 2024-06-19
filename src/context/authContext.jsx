// context/authContext.js
import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, verifyTokenRequest } from '../api/auth';
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debería estar dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);

  const authLogin = async (user) => {
    setLoading(true);
    try {
        const res = await loginRequest(user);
        setIsAuthenticated(true);
        setUser(res.data);
        Cookies.set('token', res.data.token);  
    } catch (error) {
        setErrors(error.response.data);
    } finally {
        setLoading(false);
    }
};
  const logout = () =>{
    Cookies.remove("token");
    setIsAuthenticated(false)
    setUser(null)
  }

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        setUser(null);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          setUser(null);
          return;
        }

        setUser(res.data);
        setIsAuthenticated(true);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ authLogin, user, isAuthenticated, errors, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
