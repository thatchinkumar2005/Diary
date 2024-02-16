import { useEffect } from "react";
import useLogout from "./useLogout";
import useAuth from "../../contexts/UserContext";
import { Navigate } from "react-router-dom";

function Logout() {
  const { logout, isLoggingOut } = useLogout();
  const { setAuth } = useAuth();
  useEffect(() => {
    logout();
    setAuth("");
  }, [logout, setAuth]);

  if (isLoggingOut) return <h1>Logging Out</h1>;
  return <Navigate to="/diaries" />;
}

export default Logout;
