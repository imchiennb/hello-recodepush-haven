import { LOCAL_STORAGE_KEYS } from "@/constant/query-keys";
import { http } from "@/lib/http";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

type TCreateBlogDTO = {
  title: string;
  summary: string;
  thumbnail: string;
  content: string;
  language: string;
  category: string;
  publish: boolean;
  author: string;
};

export const useMutationCreateBlog = () => {
  const { t } = useTranslation();
  const mutation = useMutation({
    mutationFn: (dto: TCreateBlogDTO) =>
      http.post("/admin/manage-blog", {
        ...dto,
      }),
    onSuccess(data, variables, context) {
      toast.success(t("blogEditor.createBlogSuccess"));
    },
    onError(error, variables, context) {
      toast.error(t("blogEditor.createBlogError"));
    },
  });

  return mutation;
};
