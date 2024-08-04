import { useState } from "react";
import { createPortal } from "react-dom";

import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import ClearIcon from "@mui/icons-material/Clear";
import { useRemoveFile } from "@/services/mutations";

export const FilePreviewThumbnail = ({
  file,
  removeFileHandler,
}: {
  file: { fileId: string; fileUrl: string };
  removeFileHandler?: () => void;
}) => {
  const { mutate: removeFile } = useRemoveFile({
    onSuccess: removeFileHandler,
  });
  const [showModal, setShowModal] = useState(false);

  const openPreviewHand = () => {
    setShowModal(true);
  };
  const closePreviewHandler = () => {
    setShowModal(false);
  };

  return (
    <>
      <li
        key={file.fileId}
        className="group relative flex items-center h-40 w-24 overflow-hidden rounded-lg transition-all shadow-sm"
      >
        <div
          data-testid="uploaded-file-container"
          className="absolute flex justify-center items-center gap-2 h-full w-full bg-opacity-40 invisible group-hover:visible transition-all"
        >
          <button
            aria-label="zoom-button"
            className="hover:cursor-pointer "
            onClick={() => openPreviewHand()}
          >
            <ZoomOutMapIcon className="text-black-500 bg-white rounded-md" />
          </button>
          {removeFileHandler && (
            <button
              aria-label="remove-uploaded-file-button"
              className="hover:cursor-pointer"
              onClick={() => removeFile(file.fileId)}
            >
              <ClearIcon className="text-black-500 bg-white rounded-md" />
            </button>
          )}
        </div>
        <img className=" w-full h-full object-cover" src={file.fileUrl} />
      </li>

      {showModal &&
        createPortal(
          <button
            aria-label="zoom-modal"
            className="fixed top-0 left-0 flex items-center justify-center bg-opacity-90 bg-textPrimary w-screen h-screen overflow-y-auto"
            onClick={() => closePreviewHandler()}
          >
            <img className="max-w-[70%] max-h-[70%]" src={file.fileUrl} />
          </button>,
          document.body
        )}
    </>
  );
};
