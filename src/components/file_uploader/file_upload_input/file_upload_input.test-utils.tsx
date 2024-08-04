import { QueryProvider } from "@/modules/global_provider/query_provider";
import { FileUploadInput } from "./file_upload_input";
import { render, screen } from "@testing-library/react";

export const renderFileUploadInput = () => {
  render(
    <QueryProvider>
      <FileUploadInput />
    </QueryProvider>
  );
};

const getFileUploadInput = () => {
  return screen.getByRole("input");
};

export const expectFileUploadInputToBeInTheDocument = () => {
  expect(getFileUploadInput()).toBeInTheDocument();
};
