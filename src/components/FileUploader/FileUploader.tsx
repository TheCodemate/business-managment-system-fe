import { useState } from "react";

import { UploadedFile } from "@/types";
import { FileUploadInput } from "./FIleUploadInput/FileUploadInput";
import { UploadedFiles } from "./UploadedFiles/UploadedFiles";

type Props = {
  onUploadHandler: (file: UploadedFile) => void;
};

export const FileUploader = ({ onUploadHandler }: Props) => {
  const [files, setFilePreviews] = useState<UploadedFile[]>([]);

  const insertFile = (newFile: UploadedFile) => {
    setFilePreviews((prev) => [...prev, newFile]);
  };

  const removeFile = (fileId: string) => {
    setFilePreviews((prev) => prev.filter((file) => file.fileId !== fileId));
  };

  return (
    <div className="flex gap-2 overflow-x-auto border rounded-lg border-gray-300 p-2">
      <FileUploadInput
        insertFile={insertFile}
        onSuccessHandler={onUploadHandler}
      />
      <UploadedFiles files={files} removeHandler={removeFile} />
    </div>
  );
};
