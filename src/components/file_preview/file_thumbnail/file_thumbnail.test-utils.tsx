import { render, renderHook, screen } from "@testing-library/react";
import { FileThumbnail } from "./file_thumbnail";
import userEvent from "@testing-library/user-event";
import { useDisclosure } from "@/modules/hooks/useDisclosure";

export const user = userEvent.setup();

export const renderFileThumbnail = () => {
  render(<FileThumbnail fileUrl="https://google.pl" />);
};

export const getZoomButton = () => {
  return screen.getByRole("button");
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
