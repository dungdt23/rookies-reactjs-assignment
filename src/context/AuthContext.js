import { createContext, useContext, useEffect, useState } from "react"
import { TOKEN } from "../utilities/constants";

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  user: {
    name: "",
    id: "",
  },
  setUser: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = (props) => {
  const token = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(!!(token === TOKEN));
  const [user, setUser] = useState({
    name: "",
    id: "",
  });

  useEffect(() => {});

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;