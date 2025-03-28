import { QUERY_KEYS } from "@/constant/query-keys";
import { http } from "@/lib/http";
import { RequestQueryParams } from "@/utils/request-query";
import { useQuery } from "@tanstack/react-query";

export const useQueryBlogs = (
  filter?: Parameters<typeof RequestQueryParams.pagination>[0]
) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.BLOGS],
    queryFn: () => {
      const query = RequestQueryParams.pagination(filter, "");
      return http.get(`/blog/bulk?${query}`);
    },
  });
  return query;
};
