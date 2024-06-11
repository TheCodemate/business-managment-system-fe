import { UploadedFile } from "@/types";
import { FilePreviewThumbnail } from "../FilePreviewThumbnail/FilePreviewThumbnail";

type Props = {
  files: UploadedFile[];
  removeHandler: (fileId: string) => void;
};

export const UploadedFiles = ({ files, removeHandler }: Props) => {
  return (
    <>
      {files &&
        files.length > 0 &&
        files.map((filePreview) => (
          <FilePreviewThumbnail
            key={filePreview.fileId}
            file={filePreview}
            removeFileHandler={() => removeHandler(filePreview.fileId)}
          />
        ))}
    </>
  );
};
