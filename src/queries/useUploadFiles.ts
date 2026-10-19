import { useMutation } from "@tanstack/react-query";
import { createFile } from "src/api/files";
import { mutationKeys } from "src/config/mutationKeys";
import { FilesRequest } from "src/types/files";

export const useUploadFiles = () => {
  const {
    mutate: uploadFile,
    data: filesData,
    isPending: loadingFile,
    isError: errorFile,
  } = useMutation({
    mutationKey: mutationKeys.files.create,
    mutationFn: (body: FilesRequest) => createFile(body),
  });

  return { uploadFile, loadingFile, filesData, errorFile };
};
