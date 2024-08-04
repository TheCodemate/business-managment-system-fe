import * as FileUploadInputTestUtils from "./file_upload_input.test-utils";

describe("FileUploadInput", () => {
  it("renders file upload input", () => {
    FileUploadInputTestUtils.renderFileUploadInput();
    FileUploadInputTestUtils.expectFileUploadInputToBeInTheDocument();
  });
});
