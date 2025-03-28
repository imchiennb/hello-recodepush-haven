import { http } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { QUERY_KEYS } from "@/constant/query-keys";

type TDeleteBlogDTO = {
  id: string;
};

export const useMutationDeleteBlog = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (dto: TDeleteBlogDTO) =>
      http.delete(`/admin/manage-blog/${dto.id}`),
    onSuccess(data, variables, context) {
      toast.success(t("blogEditor.deleteBlogSuccess"));
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.BLOGS],
      });
    },
    onError(error, variables, context) {
      toast.error(t("blogEditor.deleteBlogError"));
    },
  });

  return mutation;
};
