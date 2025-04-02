import { LOCAL_STORAGE_KEYS } from "@/constant/query-keys";
import { http } from "@/lib/http";
import { useMutation } from "@tanstack/react-query";
import { AxiosProgressEvent } from "axios";

type TUploadFileDTO = {
  file: File;
};

export const useMutationUploadFile = (options?: {
  onUploadProgress?: (progressEvent?: AxiosProgressEvent) => void;
}) => {
  const mutation = useMutation({
    mutationFn: (dto: TUploadFileDTO) => {
      const formData = new FormData();
      formData.append("file", dto.file);
      return http.post("/upload/file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  });
  return mutation;
};
