import { LOCAL_STORAGE_KEYS } from "@/constant/query-keys";
import { http } from "@/lib/http";
import { useMutation } from "@tanstack/react-query";

type TLoginDTO = {
  email: string;
  password: string;
};

export const useMutationLogin = () => {
  const mutation = useMutation({
    mutationFn: (dto: TLoginDTO) =>
      http.post("/admin/login", {
        ...dto,
        provider: "email",
      }),
    onSuccess: (data) => {
      localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, data.data.token)
    },
  });
  return mutation;
};
