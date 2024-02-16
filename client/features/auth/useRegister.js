import { useMutation } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import registerApi from "../../services/registerApi";

export default function useRegister() {
  const axios = useAxios();
  const { mutate: registerUser, isPending: isRegistering } = useMutation({
    mutationFn: registerApi(axios),
  });

  return { registerUser, isRegistering };
}
