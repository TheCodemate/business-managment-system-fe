import * as ExpandArrowUtils from "./expand_arrow.test-utils";

describe("ExpandArrow", () => {
  it("should render itself", () => {
    ExpandArrowUtils.renderExpandArrow({
      left: false,
      onClick: ExpandArrowUtils.onClickMock,
    });
  });
  it("should render ChevronIconLeft if left prop is true", () => {
    ExpandArrowUtils.renderExpandArrow({
      left: true,
      onClick: ExpandArrowUtils.onClickMock,
    });
    ExpandArrowUtils.expectExpandArrowComponentToBeVisible();
    ExpandArrowUtils.expectChevronIconLeftToBeVisible();
    ExpandArrowUtils.expectChevronIconRightNotToBeVisible();
  });
  it("should render ChevronIconRight if left prop is false", () => {
    ExpandArrowUtils.renderExpandArrow({
      left: false,
      onClick: ExpandArrowUtils.onClickMock,
    });
    ExpandArrowUtils.expectExpandArrowComponentToBeVisible();
    ExpandArrowUtils.expectChevronIconRightToBeVisible();
    ExpandArrowUtils.expectChevronIconLeftNotToBeVisible();
  });
  it("should fire event when clicked", async () => {
    ExpandArrowUtils.renderExpandArrow({
      left: false,
      onClick: ExpandArrowUtils.onClickMock,
    });

    ExpandArrowUtils.user.click(ExpandArrowUtils.getExpandArrowButton());
  });
});
