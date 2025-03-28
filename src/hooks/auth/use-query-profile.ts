import { LOCAL_STORAGE_KEYS, QUERY_KEYS } from "@/constant/query-keys";
import { http } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";

export const useQueryProfile = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.PROFILE],
    queryFn: async () => {
      const response = await http.get("/user/me");
      const profile = {
        email: response.data.email,
        role: response.data.role,
      };
      localStorage.setItem(LOCAL_STORAGE_KEYS.PROFILE, JSON.stringify(profile));
      return response;
    },
    select: (data) => data.data,
    enabled(query) {
      const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
      return !!token;
    },
  });
  return query;
};
