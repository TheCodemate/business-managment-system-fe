import * as FileThumbnail from "./file_thumbnail.test-utils";

describe("FileThumbnail", () => {
  it("renders itself when fileUrl prop provided", () => {
    FileThumbnail.renderFileThumbnail();
  });

  it("image is in the document", () => {
    FileThumbnail.renderFileThumbnail();
    FileThumbnail.expectImageToBeInTheDocument();
  });

  it("modal is opened when user clicked button", async () => {
    FileThumbnail.renderFileThumbnail();
    await FileThumbnail.clickZoomButton();
    FileThumbnail.expectModalToBeInTheDocument();
  });

  it("modal is closed when clicked", async () => {
    FileThumbnail.renderFileThumbnail();
    await FileThumbnail.clickZoomButton();
    FileThumbnail.expectModalToBeInTheDocument();
    await FileThumbnail.clickFileThumbnailModal();
    FileThumbnail.expectModalNotToBeInTheDocument();
  });
});
