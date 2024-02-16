import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../../hooks/useAxios";
import {
  createJournal,
  deleteJournal,
  getAllJournals,
  getJournal,
  updateJournal,
} from "../../services/diariesApi";

export default function useGetAllJournals() {
  const axiosPrivate = useAxiosPrivate();
  const { data: journals, isLoading } = useQuery({
    queryKey: ["journals"],
    queryFn: getAllJournals(axiosPrivate),
  });

  return { journals, isLoading };
}

export function useGetJournal(id) {
  const axiosPrivate = useAxiosPrivate();
  const { data: journal, isLoading: isFetchingSingleJournal } = useQuery({
    queryKey: ["journal", id],
    queryFn: getJournal(axiosPrivate),
    gcTime: 0,
  });

  return { journal, isFetchingSingleJournal };
}

export function useCreateJournal() {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const { mutate: create, isPending: isCreating } = useMutation({
    mutationFn: createJournal(axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries(["journals"]);
    },
  });

  return { create, isCreating };
}

export function useDeleteJournal() {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const { mutate: Delete, isPending: isDeleting } = useMutation({
    mutationFn: deleteJournal(axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journals"] });
    },
  });

  return { Delete, isDeleting };
}

export function useEditJournal() {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const { mutate: edit, isPending: isEditing } = useMutation({
    mutationFn: updateJournal(axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries(["journals"]);
    },
  });

  return { edit, isEditing };
}
