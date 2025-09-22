import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  /** (localStorage.getItem("token"))
   * Can be used to see if user is already loged in
   * Ex: Netflix - if user is logged in already won't ask user to 
   * log in everytime unless localStorage (cookies) is cleared
   */

  const [location, setLocation] = useState("GATE");

  // TODO: signup ✔️
  const [name, setName] = useState("");

  async function signup(usersName) {
    try {
      const response = await fetch(`${API}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usersName,
        }),
      });
      const result = await response.json();

      if (result.success) {
        setToken(result.token);
        localStorage.setItem("token", result.token);
        /**
         * localStorage.setItem("token", token)
         * Can be used to set "token" in locaStorage to token
         * So when refresh token is still there and user will
         * not have to sign in again
         */

        setName(usersName);
        setLocation("TABLET");
      }
    } catch (error) {
      console.error("Signup failed: ", error);
    }
  }

  // TODO: authenticate ✔️
  const [authenticated, setAuthenticated] = useState(false);

  async function authenticateUser(token) {
    try {
      const response = await fetch(`${API}/authenticate`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const result = await response.json();
      console.log(result);
      
      if (result.success) {
        setAuthenticated(true);
        setLocation(null);
      }
    } catch (error) {
      console.error("Authentication failed: ", error);
    }
  }


  const value = { location, signup, token, authenticateUser, authenticated };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
