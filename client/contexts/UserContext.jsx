import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [auth, setAuth] = useState({});
  return (
    <UserContext.Provider value={{ auth, setAuth }}>
      {children}
    </UserContext.Provider>
  );
}

export default function useAuth() {
  return useContext(UserContext);
}
