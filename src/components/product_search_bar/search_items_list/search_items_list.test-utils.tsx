//to move to another files at the end

import { QueryProvider } from "@/modules/global_provider/query_provider";
import { SearchItemsList } from "./search_items_list";
import { render, screen } from "@testing-library/react";
import { UploadedProductResponseType } from "@/types";

type Props = {
  isLoading?: boolean;
  isOpen?: boolean;
  products?: UploadedProductResponseType[];
};

export const renderSearchItemsList = ({
  isLoading = false,
  isOpen = true,
  products,
}: Props = {}) => {
  const acceptHandler = () => vi.fn();

  render(
    <QueryProvider>
      <SearchItemsList
        acceptHandler={acceptHandler}
        isLoading={isLoading}
        isOpen={isOpen}
        products={products}
      />
    </QueryProvider>
  );
};

export const getLoadingIcon = () => {
  return screen.queryByTestId("loading-icon");
};

export const getSearchListItems = () => {
  return screen.getAllByRole("listitem");
};

export const expectLoadingIconToBeInTheDocument = () => {
  expect(getLoadingIcon()).toBeInTheDocument();
};

export const expectLoadingIconNotToBeInTheDocument = () => {
  expect(getLoadingIcon()).not.toBeInTheDocument();
};

export const expectNoResultsFoundInfoToBeInTheDocument = () => {
  expect(screen.getByText(/brak wyników/i)).toBeInTheDocument();
};

export const expectListItemsToBeInTheDocument = () => {
  const listItems = getSearchListItems();
  listItems.forEach((item) => {
    expect(item).toBeInTheDocument();
  });
};
