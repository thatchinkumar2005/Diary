import useAuth from "../contexts/UserContext";
import useAxios from "./useAxios";

export default function useRefresh() {
  const { setAuth } = useAuth();
  const axios = useAxios();

  return async () => {
    try {
      const resp = await axios.get("/auth/refresh", {
        withCredentials: true,
      });

      const accessToken = resp.data.accessToken;

      setAuth({ accessToken });
      return accessToken;
    } catch (error) {
      throw new Error(error.response.status);
    }
  };
}
