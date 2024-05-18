import { ChangeEvent, useRef, useState } from "react";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import CloseIcon from "@mui/icons-material/Close";
import { useRemoveFile, useUploadFile } from "@/services/mutations";
import { createPortal } from "react-dom";
import { Loading } from "../Loading/Loading";
import { UploadedFile } from "@/types";

type Props = {
  onUploadHandler: (file: UploadedFile) => void;
};
export const FileUploader = ({ onUploadHandler }: Props) => {
  const [filePreviews, setFilePreviews] = useState<UploadedFile[]>([]);

  const insertFile = (newFile: UploadedFile) => {
    setFilePreviews((prev) => [...prev, newFile]);
  };

  const removeFile = (fileId: string) => {
    setFilePreviews((prev) => prev.filter((file) => file.fileId !== fileId));
  };

  return (
    <div className="flex gap-2 overflow-x-auto border rounded-lg border-gray-300 p-2">
      <FileInput insertFile={insertFile} onSuccessHandler={onUploadHandler} />
      {filePreviews &&
        filePreviews.length > 0 &&
        filePreviews.map((filePreview) => (
          <ImageThumbnail
            key={filePreview.fileId}
            file={filePreview}
            removeFileHandler={() => removeFile(filePreview.fileId)}
          />
        ))}
    </div>
  );
};

const ImageThumbnail = ({
  file,
  removeFileHandler,
}: {
  file: { fileId: string; fileUrl: string };
  removeFileHandler: () => void;
}) => {
  const [showModal, setShowModal] = useState(false);
  const { isPending, mutate: removeFile } = useRemoveFile({
    onSuccess: removeFileHandler,
  });

  const openPreviewHand = () => {
    setShowModal(true);
  };
  const closePreviewHandler = () => {
    setShowModal(false);
  };

  return (
    <>
      {isPending ? (
        <div
          key={file.fileId}
          className="group relative flex items-center h-40 w-24 overflow-hidden rounded-lg transition-all shadow-sm"
        >
          <Loading color="#141414" />
        </div>
      ) : (
        <div
          key={file.fileId}
          className="group relative flex items-center h-40 w-24 overflow-hidden rounded-lg transition-all shadow-sm"
        >
          <div className="absolute flex justify-center items-center gap-2 h-full w-full bg-opacity-40 invisible group-hover:visible transition-all">
            <div className="hover:cursor-pointer">
              <ZoomOutMapIcon
                onClick={() => openPreviewHand()}
                className="text-black-500 bg-white rounded-md"
              />
            </div>
            <div
              onClick={() => removeFile(file.fileId)}
              className="hover:cursor-pointer"
            >
              <CloseIcon className="text-black-500 bg-white rounded-md" />
            </div>
          </div>
          <img className=" w-full h-full object-cover" src={file.fileUrl} />
        </div>
      )}
      {showModal &&
        createPortal(
          <div
            className="fixed top-0 left-0 flex items-center justify-center bg-opacity-90 bg-textPrimary w-screen h-screen overflow-y-auto"
            onClick={() => closePreviewHandler()}
          >
            <img className="max-w-[70%] max-h-[70%]" src={file.fileUrl} />
          </div>,
          document.body
        )}
    </>
  );
};

export type OnSuccessHandler = (file: UploadedFile) => void;

type FileInputProps = {
  onSuccessHandler: OnSuccessHandler;
  insertFile: (newFile: UploadedFile) => void;
};

export const FileInput = ({ insertFile, onSuccessHandler }: FileInputProps) => {
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
