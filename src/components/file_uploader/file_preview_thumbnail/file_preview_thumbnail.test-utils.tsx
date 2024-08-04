import { render, screen } from "@testing-library/react";
import { FilePreviewThumbnail } from "./file_preview_thumbnail";
import userEvent from "@testing-library/user-event";
import { QueryProvider } from "@/modules/global_provider/query_provider";

const user = userEvent.setup();

const image = {
  fileId: "5cae68bfd2850cb33ba0f1fd6112957b",
  fileUrl:
    "https://storage.googleapis.com/download/storage/v1/b/bms-request_files_bucket/o/5cae68bfd2850cb33ba0f1fd6112957b?generation=1722694571777511&alt=media",
};

export const renderFilePreviewThumbnail = () => {
  render(
    <QueryProvider>
      <FilePreviewThumbnail file={image} removeFileHandler={vi.fn()} />
    </QueryProvider>
  );
};

export const getZoomButton = () => {
  return screen.getByRole("button", { name: /zoom-button/i });
};
export const getRemoveButton = () => {
  return screen.getByRole("button", { name: /remove-uploaded-file-button/i });
};

export const getZoomModal = () => {
  return screen.getByRole("button", { name: /zoom-modal/i });
};

export const queryZoomModal = () => {
  return screen.queryByRole("button", { name: /zoom-modal/i });
};

export const hoverUploadedImage = async () => {
  await user.hover(screen.getByTestId("uploaded-file-container"));
};

export const clickZoomButton = async () => {
  await user.click(getZoomButton());
};
export const clickZoomModal = async () => {
  screen.debug(undefined, 300000);
  await user.click(getZoomModal());
};

export const expectZoomButtonToBeInTheDocument = () => {
  expect(getZoomButton()).toBeInTheDocument();
};
export const expectRemoveButtonToBeInTheDocument = () => {
  expect(getRemoveButton()).toBeInTheDocument();
};

export const expectZoomModalToBeInTheDocument = () => {
  expect(getZoomModal()).toBeInTheDocument();
};
export const expectZoomModalNotToBeInTheDocument = () => {
  expect(queryZoomModal()).not.toBeInTheDocument();
};
