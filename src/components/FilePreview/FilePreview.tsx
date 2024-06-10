import { FileThumbnail } from "./FileThumbnail/FileThumbnail";

type Props = {
  files: { fileUrl: string }[];
};

export const FilePreview = ({ files }: Props) => {
  if (!files || files.length <= 0) {
    return null;
  }

  return (
    <div className="flex gap-2 overflow-x-auto py-4">
      {files.map((file) => (
        <FileThumbnail key={file.fileUrl} fileUrl={file.fileUrl} />
      ))}
    </div>
  );
};
