import { render, screen } from "@testing-library/react";
import { FileThumbnail } from "./file_thumbnail";
import userEvent from "@testing-library/user-event";

export const user = userEvent.setup();

export const renderFileThumbnail = () => {
  render(<FileThumbnail fileUrl="https://google.pl" />);
};

export const getZoomButton = () => {
  return screen.getByRole("button");
};

export const getFileThumbnailModal = () => {
  return screen.queryByTestId("file-thumbnail-modal");
};

export const getRootElement = () => {
  const container = document.createElement("div");
  document.body.appendChild(container);
};

export const getImage = () => {
  return screen.getByRole("img");
};

export const expectZoomInButtonToBeInTheDocument = () => {
  expect(getZoomButton()).toBeInTheDocument();
};

export const expectImageToBeInTheDocument = () => {
  expect(getImage()).toBeInTheDocument();
};

export const clickZoomButton = async () => {
  await user.click(getZoomButton());
};

export const clickFileThumbnailModal = async () => {
  await user.click(getFileThumbnailModal());
};

export const expectModalToBeInTheDocument = () => {
  expect(getFileThumbnailModal()).toBeInTheDocument();
};
export const expectModalNotToBeInTheDocument = () => {
  expect(getFileThumbnailModal()).not.toBeInTheDocument();
};
