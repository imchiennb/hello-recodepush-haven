import type { FileRouter } from "uploadthing/next";

import { createRouteHandler, createUploadthing } from "uploadthing/next";

const f = createUploadthing();

const ourFileRouter = {
  editorUploader: f(["image", "text", "blob", "pdf", "video", "audio"])
    .middleware(() => {
      return {};
    })
    .onUploadComplete(({ file }) => {
      return { file };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});

import * as React from "react";

import type {
  ClientUploadedFileData,
  UploadFilesOptions,
} from "uploadthing/types";

import { generateReactHelpers } from "@uploadthing/react";
import { toast } from "sonner";
import { z } from "zod";
import { useMutationUploadFile } from "@/hooks/upload/use-mutation-upload";

export interface UploadedFile<T = unknown> extends ClientUploadedFileData<T> {}

interface UseUploadFileProps
  extends Pick<
    UploadFilesOptions<OurFileRouter, keyof OurFileRouter>,
    "headers" | "onUploadBegin" | "onUploadProgress" | "skipPolling"
  > {
  onUploadComplete?: (file: UploadedFile) => void;
  onUploadError?: (error: unknown) => void;
}

export function useUploadFile({
  onUploadComplete,
  onUploadError,
  ...props
}: UseUploadFileProps = {}) {
  const [uploadedFile, setUploadedFile] = React.useState<UploadedFile>();
  const [uploadingFile, setUploadingFile] = React.useState<File>();
  const [progress, setProgress] = React.useState<number>(0);
  const [isUploading, setIsUploading] = React.useState(false);
  const mutationUploadFile = useMutationUploadFile();

  async function uploadThing(file: File) {
    setIsUploading(true);
    setUploadingFile(file);

    try {
      const data = await mutationUploadFile.mutateAsync({ file });
      // const fileUrl = data.data.url;
      const fileName = data.data.filename;
      const fileUrl = `${import.meta.env.VITE_STORAGE_URL}/images/${fileName}`;

      // const res = await uploadFiles("editorUploader", {
      //   ...props,
      //   files: [file],
      //   onUploadProgress: ({ progress }) => {
      //     setProgress(Math.min(progress, 100));
      //   },
      // });

      setUploadedFile(fileUrl as any);

      onUploadComplete?.(fileUrl as any);

      return uploadedFile;
    } catch (error) {
      const errorMessage = getErrorMessage(error);

      const message =
        errorMessage.length > 0
          ? errorMessage
          : "Something went wrong, please try again later.";

      toast.error(message);

      // onUploadError?.(error);

      // // Mock upload for unauthenticated users
      // // toast.info('User not logged in. Mocking upload process.');
      // const mockUploadedFile = {
      //   key: "mock-key-0",
      //   appUrl: `https://mock-app-url.com/${file.name}`,
      //   name: file.name,
      //   size: file.size,
      //   type: file.type,
      //   url: URL.createObjectURL(file),
      // } as UploadedFile;

      // // Simulate upload progress
      // let progress = 0;

      // const simulateProgress = async () => {
      //   while (progress < 100) {
      //     await new Promise((resolve) => setTimeout(resolve, 50));
      //     progress += 2;
      //     setProgress(Math.min(progress, 100));
      //   }
      // };

      // await simulateProgress();

      // setUploadedFile(mockUploadedFile);

      // return mockUploadedFile;
    } finally {
      setProgress(0);
      setIsUploading(false);
      setUploadingFile(undefined);
    }
  }

  return {
    isUploading,
    progress,
    uploadedFile,
    uploadFile: uploadThing,
    uploadingFile,
  };
}

export const { uploadFiles, useUploadThing } =
  generateReactHelpers<OurFileRouter>();

export function getErrorMessage(err: unknown) {
  const unknownError = "Something went wrong, please try again later.";

  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message;
    });

    return errors.join("\n");
  } else if (err instanceof Error) {
    return err.message;
  } else {
    return unknownError;
  }
}

export function showErrorToast(err: unknown) {
  const errorMessage = getErrorMessage(err);

  return toast.error(errorMessage);
}

