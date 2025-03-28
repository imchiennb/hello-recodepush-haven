import { QUERY_KEYS } from "@/constant/query-keys";
import { http } from "@/lib/http";
import { RequestQueryParams } from "@/utils/request-query";
import { useQuery } from "@tanstack/react-query";

export const useQueryBlogDetail = (id: string) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.BLOGS, id],
    queryFn: () => {
      return http.get(`/blog/${id}`);
    },
    enabled: !!id,
  });
  return query;
};
