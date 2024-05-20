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
          {removeFileHandler && (
            <div className="hover:cursor-pointer">
              <ClearIcon
                onClick={() => removeFile(file.fileId)}
                className="text-black-500 bg-white rounded-md"
              />
            </div>
          )}
        </div>
        <img className=" w-full h-full object-cover" src={file.fileUrl} />
      </div>

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
