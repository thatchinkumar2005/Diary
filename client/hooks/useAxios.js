import { axios, axiosPrivate } from "../services/axios.js";
import useAuth from "../contexts/UserContext";
import { useEffect } from "react";
import useRefresh from "./useRefreshToken.js";

export default function useAxios() {
  return axios;
}

export function useAxiosPrivate() {
  const { auth } = useAuth();
  const refresh = useRefresh();

  useEffect(() => {
    const reqIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      async (err) => {
        return Promise.reject(err);
      }
    );

    //response Intercept
    const respIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (err) => {
        const prevReq = err.config;
        if (err?.response?.status == 403 || !prevReq?.sent) {
          prevReq.sent = true;
          const newAccessToken = await refresh();
          prevReq.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevReq);
        } else {
          return Promise.reject(err);
        }
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(respIntercept);
      axiosPrivate.interceptors.response.eject(reqIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
}
