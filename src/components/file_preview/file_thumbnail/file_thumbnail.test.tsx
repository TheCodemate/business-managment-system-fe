import * as FileThumbnail from "./file_thumbnail.test-utils";

describe("FileThumbnail", () => {
  it("renders itself when fileUrl prop provided", () => {
    FileThumbnail.renderFileThumbnail();
  });

  it("zoom in button is in the document", async () => {
    FileThumbnail.renderFileThumbnail();
    FileThumbnail.expectZoomInButtonToBeInTheDocument();
  });

  it("image is in the document", () => {
    FileThumbnail.renderFileThumbnail();
    FileThumbnail.expectImageToBeInTheDocument();
  });
});
