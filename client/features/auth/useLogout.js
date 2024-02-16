import { useMutation } from "@tanstack/react-query";
import { useAxiosPrivate } from "../../hooks/useAxios";
import Logout from "../../services/logoutApi";

export default function useLogout() {
  const axiosPrivate = useAxiosPrivate();
  const { mutate: logout, isLoading: isLoggingOut } = useMutation({
    mutationFn: Logout(axiosPrivate),
  });

  return { logout, isLoggingOut };
}
