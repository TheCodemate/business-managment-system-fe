import * as ProductSearchBarTestUtils from "./product_search_bar.test-utils";

describe("ProductSearchBar", () => {
  it("renders search bar input ", () => {
    ProductSearchBarTestUtils.renderProductSearchBar();
    ProductSearchBarTestUtils.expectInputToBeInTheDocument();
  });

  it("shows cancel icon when product was selected", async () => {
    ProductSearchBarTestUtils.renderProductSearchBar();
    await ProductSearchBarTestUtils.fillSearchBarInputWithText();
    await ProductSearchBarTestUtils.clickSearchBarFirstListItem();
    ProductSearchBarTestUtils.expectCancelIconToBeInTheDocument();
  });
});
