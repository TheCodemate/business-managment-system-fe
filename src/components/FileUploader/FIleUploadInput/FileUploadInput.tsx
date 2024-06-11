import { useUploadFile } from "@/services/mutations";
import { ChangeEvent, useRef } from "react";
import { FileInputProps } from "../types";

export const FileUploadInput = ({
  insertFile,
  onSuccessHandler,
}: FileInputProps) => {
  const addFileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadFile } = useUploadFile({
    onSuccess: onSuccessHandler,
    insertFile,
  });

  const onFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("uploadedFile", file);
      uploadFile(formData);
    }
  };
  return (
    <div
      onClick={() => {
        if (!addFileInputRef.current) return;
        addFileInputRef.current.click();
      }}
      className="border-2 border-gray-300 border-dashed w-24 h-40 rounded-lg hover:cursor-pointer"
    >
      <div className="h-full flex items-center justify-center font-bold text-gray-300 text-sm">
        Dodaj plik
      </div>
      <input
        ref={addFileInputRef}
        className="hidden"
        type="file"
        multiple
        onChange={onFileUpload}
      />
    </div>
  );
};
