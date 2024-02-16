import { useEffect } from "react";
import useLogout from "./useLogout";
import useAuth from "../../contexts/UserContext";
import { Navigate } from "react-router-dom";
import { Spinner } from "../../ui/Spinner";

function Logout() {
  const { logout, isLoggingOut } = useLogout();
  const { setAuth } = useAuth();
  useEffect(() => {
    logout();
    setAuth("");
  }, [logout, setAuth]);

  if (isLoggingOut) return <Spinner />;
  return <Navigate to="/diaries" />;
}

export default Logout;
