import { createPortal } from "react-dom";

import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import { useDisclosure } from "@/modules/hooks/useDisclosure";

export const FileThumbnail = ({ fileUrl }: { fileUrl: string }) => {
  const { isOpen, closeHandler, openHandler } = useDisclosure();

  return (
    <>
      <div
        key={fileUrl}
        className="group relative flex items-center h-40 w-24 overflow-hidden rounded-lg transition-all shadow-sm"
      >
        <div className="absolute flex justify-center items-center gap-2 h-full w-full bg-opacity-40 invisible group-hover:visible transition-all">
          <div className="hover:cursor-pointer">
            <ZoomOutMapIcon
              onClick={openHandler}
              className="text-black-500 bg-white rounded-md"
            />
          </div>
        </div>
        <img className=" w-full h-full object-cover" src={fileUrl} />
      </div>

      {isOpen &&
        createPortal(
          <div
            className="fixed top-0 left-0 flex items-center justify-center bg-opacity-90 bg-textPrimary w-screen h-screen overflow-y-auto"
            onClick={closeHandler}
          >
            <img className="max-w-[70%] max-h-[70%]" src={fileUrl} />
          </div>,
          document.body
        )}
    </>
  );
};
