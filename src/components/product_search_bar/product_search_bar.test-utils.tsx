import { render, screen } from "@testing-library/react";
import { ProductSearchBar } from "./product_search_bar";
import { QueryProvider } from "@/modules/global_provider/query_provider";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

export const renderProductSearchBar = () => {
  const searchAcceptHandler = vi.fn();
  render(
    <QueryProvider>
      <ProductSearchBar searchAcceptHandler={searchAcceptHandler} />
    </QueryProvider>
  );

  return {
    searchAcceptHandler,
  };
};

export const getSearchBar = () => {
  return screen.getByPlaceholderText(/wyszukaj produkt/i);
};

export const getSearchBarListItems = () => {
  return screen.getAllByRole("listitem");
};

export const clickSearchBarFirstListItem = async () => {
  await user.click(getSearchBarListItems()[0]);
};
export const fillSearchBarInputWithText = async () => {
  await user.type(getSearchBar(), "vint");
};

const getSearchInput = () => {
  return screen.getByPlaceholderText(/wyszukaj produkt/i);
};

export const expectInputToBeInTheDocument = () => {
  expect(getSearchInput()).toBeInTheDocument();
};

export const getCancelIcon = () => {
  return screen.getByTestId("cancel-icon");
};

export const expectCancelIconToBeInTheDocument = () => {
  expect(getCancelIcon()).toBeInTheDocument();
};
