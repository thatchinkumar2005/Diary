import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  changeEmail as changeEmailApi,
  changeName as changeNameApi,
  changePswd as changePswdApi,
  getUserInfo,
} from "../../services/usersApi";
import { useAxiosPrivate } from "../../hooks/useAxios";

export default function useGetUserInfo() {
  const axiosPrivate = useAxiosPrivate();
  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo(axiosPrivate),
  });
  return { userInfo, isLoading };
}

export function useChangeName() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { mutate: changeName, isPending: isChangingName } = useMutation({
    mutationFn: changeNameApi(axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { changeName, isChangingName };
}

export function useChangeEmail() {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const { mutate: changeEmail, isPending: isChangingEmail } = useMutation({
    mutationFn: changeEmailApi(axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
  return { changeEmail, isChangingEmail };
}

export function useChangePswd() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { mutate: changePswd, isPending: isChangingPswd } = useMutation({
    mutationFn: changePswdApi(axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
  return { changePswd, isChangingPswd };
}
