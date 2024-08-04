import { QueryProvider } from "@/modules/global_provider/query_provider";
import { UploadedFiles } from "./uploaded_files";
import { render, screen } from "@testing-library/react";

export const renderUploadedFiles = (
  files: { fileId: string; fileUrl: string }[] = []
) => {
  const removeHandler = vi.fn();
  render(
    <QueryProvider>
      <UploadedFiles files={files} removeHandler={removeHandler} />
    </QueryProvider>
  );
};

export const getFilesList = () => {
  return screen.getByRole("list");
};

export const expectListToBeInTheDocument = () => {
  expect(getFilesList()).toBeInTheDocument();
};

export const getAllListItems = () => {
  return screen.getAllByRole("listitem");
};

export const queryAllListItems = () => {
  return screen.queryAllByRole("listitem");
};

export const expectListItemsToBeInTheDocument = () => {
  const listItems = getAllListItems();

  listItems.forEach((item) => {
    expect(item).toBeInTheDocument();
  });
};
export const expectListItemsNotToBeInTheDocument = () => {
  const listItems = queryAllListItems();

  listItems.forEach((item) => {
    expect(item).not.toBeInTheDocument();
  });
};
