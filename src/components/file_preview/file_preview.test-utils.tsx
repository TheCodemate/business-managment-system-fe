import { render, screen } from "@testing-library/react";
import { FilePreview, Props } from "@/components/file_preview/file_preview.tsx";
import { expect } from "vitest";
import { userEvent } from "@testing-library/user-event";

const user = userEvent.setup();

export const renderFilePreview = (props: Props) => {
  return render(<FilePreview {...props} />);
};

const getFilePreviewContainer = () => {
  return screen.queryByTestId("file-preview-container");
};

const getModal = () => {
  return screen.getByTestId("file-thumbnail-modal");
};

export const getModalOpenButton = () => {
  return screen.getByTestId("zoom-out-map-modal-open-button");
};

export const clickModalOpenButton = async () => {
  await user.click(getModalOpenButton());
};

export const expectFilePreviewContainerToBeVisible = () => {
  expect(getFilePreviewContainer()).toBeVisible();
};

export const expectFilePreviewModalToBeVisible = () => {
  expect(getModal()).toBeVisible();
};

export const expectFilePreviewContainerNotToBeVisible = () => {
  expect(getFilePreviewContainer()).not.toBeInTheDocument();
};
