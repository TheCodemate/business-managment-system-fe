import * as SearchListItemTestUtils from "./search_list_item.test-utils";

describe("SearchListItem", () => {
  it("renders itself", () => {
    SearchListItemTestUtils.renderSearchListItem();
    SearchListItemTestUtils.expectListItemToBeInTheDocument();
  });

  it("list item is clicked", async () => {
    const { acceptHandler } = SearchListItemTestUtils.renderSearchListItem();
    await SearchListItemTestUtils.clickListItem();
    expect(acceptHandler).toHaveBeenCalledOnce();
  });
});
