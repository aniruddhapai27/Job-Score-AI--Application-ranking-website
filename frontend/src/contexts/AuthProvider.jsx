import { BACKEND_URL } from "../utils";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("jwt");
        console.log("Token:", token);
        if (token) {
          const response = await axios.get(`${BACKEND_URL}/api/user/getUser`, {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log("Response:", response);
          setUser(response.data.user);
          setIsAuthenticated(true);
        } else {
          console.log("No token found.");
        }
      } catch (error) {
        console.error("Fetch user failed:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
