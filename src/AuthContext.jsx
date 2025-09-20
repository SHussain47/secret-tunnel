import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

  // TODO: signup
  const [name, setName] = useState("");

  async function signup(usersName) {
    try {
      const response = await fetch(`${API}/signup`, {
        method: "POST",
        headers: { "Context-Type": "application/json" },
        body: JSON.stringify({ 
          username: usersName })
      });
      const result = await response.json();

      setToken(result.token);
      setName(usersName);
      setLocation("TABLET");
    } catch (error) {
      console.error("Signup failed: ", error);
    }
  }

  // TODO: authenticate

  const value = { location, signup };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
