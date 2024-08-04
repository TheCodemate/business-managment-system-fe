// import * as FilePreviewUtils from "./file_preview.test-utils.tsx";
import * as FilePreviewUtils from "./file_preview.test-utils";

describe("FilePreview", () => {
  it("should render itself if there are files", () => {
    FilePreviewUtils.renderFilePreview({
      files: [{ fileUrl: "https://example.com" }],
    });
    FilePreviewUtils.expectFilePreviewContainerToBeVisible();
  });
  it("should not render itself if there are no files", () => {
    FilePreviewUtils.renderFilePreview({ files: [] });
    FilePreviewUtils.expectFilePreviewContainerNotToBeVisible();
  });
  it("opens a modal after clicking on the zoom in map button", async () => {
    FilePreviewUtils.renderFilePreview({
      files: [{ fileUrl: "https://example.com" }],
    });
    await FilePreviewUtils.clickModalOpenButton();
    FilePreviewUtils.expectFilePreviewModalToBeVisible();
  });
});
