import { LOCAL_STORAGE_KEYS } from "@/constant/query-keys";
import { http } from "@/lib/http";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

type TUpdateBlogDTO = {
  id: string;
  title: string;
  summary: string;
  thumbnail: string;
  content: string;
  language: string;
  category: string;
  publish: boolean;
  author: string;
};

export const useMutationUpdateBlog = () => {
  const { t } = useTranslation();
  const mutation = useMutation({
    mutationFn: (dto: TUpdateBlogDTO) => {
      const id = dto.id;
      delete dto.id;
      return http.patch(`/admin/manage-blog/${id}`, {
        ...dto,
      });
    },
    onSuccess(data, variables, context) {
      toast.success(t("blogEditor.updateBlogSuccess"));
    },
    onError(error, variables, context) {
      toast.error(t("blogEditor.updateBlogError"));
    },
  });

  return mutation;
};
