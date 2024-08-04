import * as FileUploadInputTestUtils from "./file_preview_thumbnail.test-utils";

describe("FilePreviewThumbnail", () => {
  it("renders itself", () => {
    FileUploadInputTestUtils.renderFilePreviewThumbnail();
  });

  it("shows zoom button when thumbnail is hovered", async () => {
    FileUploadInputTestUtils.renderFilePreviewThumbnail();
    await FileUploadInputTestUtils.hoverUploadedImage();
    FileUploadInputTestUtils.expectZoomButtonToBeInTheDocument();
  });
  it("shows remove button when thumbnail is hovered", async () => {
    FileUploadInputTestUtils.renderFilePreviewThumbnail();
    await FileUploadInputTestUtils.hoverUploadedImage();
    FileUploadInputTestUtils.expectRemoveButtonToBeInTheDocument();
  });

  it("renders modal when zoom button is clicked", async () => {
    FileUploadInputTestUtils.renderFilePreviewThumbnail();
    await FileUploadInputTestUtils.hoverUploadedImage();
    FileUploadInputTestUtils.expectZoomButtonToBeInTheDocument();
    await FileUploadInputTestUtils.clickZoomButton();
    FileUploadInputTestUtils.expectZoomModalToBeInTheDocument();
  });
  it("removes modal when zoom modal button is clicked", async () => {
    FileUploadInputTestUtils.renderFilePreviewThumbnail();
    await FileUploadInputTestUtils.hoverUploadedImage();
    FileUploadInputTestUtils.expectZoomButtonToBeInTheDocument();
    await FileUploadInputTestUtils.clickZoomButton();
    FileUploadInputTestUtils.expectZoomModalToBeInTheDocument();
    await FileUploadInputTestUtils.clickZoomModal();
    FileUploadInputTestUtils.expectZoomModalNotToBeInTheDocument();
  });
});
