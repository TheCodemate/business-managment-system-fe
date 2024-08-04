import * as UploadedFilesTestUtils from "./uploaded_files.test-utils";

const files = [
  {
    fileId: "b848541a4a18589c17f3297b2649674d",
    fileUrl:
      "https://storage.googleapis.com/download/storage/v1/b/bms-request_files_bucket/o/b848541a4a18589c17f3297b2649674d?generation=1722772472563165&alt=media",
  },
  {
    fileId: "9f9517b899f92e44db22de2ba2141f1f",
    fileUrl:
      "https://storage.googleapis.com/download/storage/v1/b/bms-request_files_bucket/o/9f9517b899f92e44db22de2ba2141f1f?generation=1722772478245246&alt=media",
  },
];

describe("UploadedFiles", () => {
  it("renders itself", () => {
    UploadedFilesTestUtils.renderUploadedFiles(files);
    UploadedFilesTestUtils.expectListToBeInTheDocument();
  });

  it("displays image list if props provided", () => {
    UploadedFilesTestUtils.renderUploadedFiles(files);
    UploadedFilesTestUtils.expectListItemsToBeInTheDocument();
  });

  it("does not display listitem if files not provied", () => {
    UploadedFilesTestUtils.renderUploadedFiles();
    UploadedFilesTestUtils.expectListItemsNotToBeInTheDocument();
  });
});
