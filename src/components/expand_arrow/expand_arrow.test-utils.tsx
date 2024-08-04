import { render, screen } from "@testing-library/react";
import { ExpandArrow, Props } from "./expand_arrow";
import userEvent from "@testing-library/user-event";

export const onClickMock = vi.fn();
export const user = userEvent.setup();

export const getChevronIconLeft = () => {
  return screen.queryByTestId("chevron-left-icon");
};
export const getChevronIconRight = () => {
  return screen.queryByTestId("chevron-right-icon");
};

export const getExpandArrowButton = () => {
  return screen.getByRole("button");
};
export const clickExpandArrowButton = async () => {
  await user.click(getExpandArrowButton());
};

export const renderExpandArrow = (props: Props) => {
  render(<ExpandArrow onClick={onClickMock} {...props} />);
};

export const expectExpandArrowComponentToBeVisible = () => {
  expect(getExpandArrowButton()).toBeVisible();
};

export const expectChevronIconLeftToBeVisible = () => {
  expect(getChevronIconLeft()).toBeVisible();
};
export const expectChevronIconLeftNotToBeVisible = () => {
  expect(getChevronIconLeft()).not.toBeInTheDocument();
};
export const expectChevronIconRightToBeVisible = () => {
  expect(getChevronIconRight()).toBeVisible();
};
export const expectChevronIconRightNotToBeVisible = () => {
  expect(getChevronIconRight()).not.toBeInTheDocument();
};
