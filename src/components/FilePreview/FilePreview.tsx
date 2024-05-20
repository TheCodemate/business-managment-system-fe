import { FileThumbnail } from "./FileThumbnail/FileThumbnail";

type Props = {
  files: { fileUrl: string }[];
};

export const FilePreview = ({ files }: Props) => {
  return (
    <>
      {files ? (
        <div className="flex gap-2 overflow-x-auto py-4">
          {files &&
            files.length > 0 &&
            files.map((file) => (
              <FileThumbnail key={file.fileUrl} fileUrl={file.fileUrl} />
            ))}
        </div>
      ) : null}
    </>
  );
};
