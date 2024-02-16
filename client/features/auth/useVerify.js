import { useQuery } from "@tanstack/react-query";
import verifyApi from "../../services/verifyApi";
import useAxios from "../../hooks/useAxios";

export default function useVerify(mailToken) {
  const axios = useAxios();
  const { data, isLoading } = useQuery({
    queryKey: ["verify", mailToken],
    queryFn: verifyApi(axios, mailToken),
  });
  return { data, isLoading };
}
