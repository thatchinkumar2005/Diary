import { useMutation } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios.js";
import loginApi from "../../services/loginApi.js";

export function useLogin() {
  const axios = useAxios();
  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: loginApi(axios),
  });

  return { login, isLoggingIn };
}
