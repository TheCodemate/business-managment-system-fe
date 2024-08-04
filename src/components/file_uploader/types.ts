import { UploadedFile } from "@/types";

export type OnSuccessHandler = (file: UploadedFile) => void;

export type FileInputProps = {
  onSuccessHandler: OnSuccessHandler;
  insertFile: (newFile: UploadedFile) => void;
};
