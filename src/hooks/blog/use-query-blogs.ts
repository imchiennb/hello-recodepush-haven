import { QUERY_KEYS } from "@/constant/query-keys";
import { http } from "@/lib/http";
import { useQueryObserver } from "@/lib/use-query-observer";
import { RequestQueryParams } from "@/utils/request-query";
import { useQuery } from "@tanstack/react-query";

export const useQueryBlogs = (
  filter?: Parameters<
    typeof RequestQueryParams.pagination<{ language?: string }>
  >[0]
) => {
  const lng = useQueryObserver([QUERY_KEYS.LANGUAGE]) as string;
  const query = useQuery({
    queryKey: [QUERY_KEYS.BLOGS, lng],
    queryFn: () => {
      const query = RequestQueryParams.pagination(
        { ...filter, language: !filter?.language ? lng : undefined },
        ""
      );
      return http.get(`/blog/bulk?${query}`);
    },
  });
  return query;
};
