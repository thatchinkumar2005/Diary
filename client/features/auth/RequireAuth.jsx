import useAuth from "../../contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth() {
  const { auth } = useAuth();
  return <>{!auth.accessToken ? <Navigate to="/auth/login" /> : <Outlet />}</>;
}

export default RequireAuth;
