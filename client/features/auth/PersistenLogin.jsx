import { useEffect, useState } from "react";
import useAuth from "../../contexts/UserContext";
import useRefresh from "../../hooks/useRefreshToken";
import { Outlet } from "react-router-dom";

function PersistenLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();
  const refresh = useRefresh();

  useEffect(() => {
    async function verifyJwt() {
      setIsLoading(true);
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    !auth?.accessToken ? verifyJwt() : setIsLoading(false);
  }, []);

  if (isLoading) return <h1>Loading</h1>;

  return (
    <>
      <Outlet />
    </>
  );
}

export default PersistenLogin;
