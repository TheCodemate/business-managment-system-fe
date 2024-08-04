import { UploadedFile } from "@/types";
import { FilePreviewThumbnail } from "../file_preview_thumbnail/file_preview_thumbnail";

type Props = {
  files: UploadedFile[];
  removeHandler: (fileId: string) => void;
};

export const UploadedFiles = ({ files, removeHandler }: Props) => {
  if (!files || files.length <= 0) return null;

  return (
    <ul className="flex gap-2 overflow-x-auto">
      {files.map((filePreview) => (
        <FilePreviewThumbnail
          key={filePreview.fileId}
          file={filePreview}
          removeFileHandler={() => removeHandler(filePreview.fileId)}
        />
      ))}
    </ul>
  );
};
