import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import { useSearch } from "./use_search";
import { UploadedProductResponseType } from "@/types";
import { SearchItemsList } from "./search_items_list/search_items_list";

type Props = {
  searchAcceptHandler: (product: UploadedProductResponseType) => void;
  autoFocus?: boolean;
};

export const ProductSearchBar = ({
  searchAcceptHandler,
  autoFocus = true,
}: Props) => {
  const {
    searchPhrase,
    isSearchResultOpen,
    isAccepted,
    selectProductHandler,
    onChangeHandler,
    isPending,
    searchedProducts,
    clearSearch,
  } = useSearch();

  const onClickHandler = (e: MouseEvent, item: UploadedProductResponseType) =>
    selectProductHandler(e, () => searchAcceptHandler(item));

  return (
    <div className="max-w-[900px] relative  flex items-center min-w-[200px] w-max-[900px] border border-details bg-bgPrimary rounded-lg">
      <SearchIcon
        sx={{ position: "absolute", left: 10, color: "rgb(182 182 182)" }}
        className="hover:cursor-default"
      />
      <input
        autoFocus={autoFocus}
        placeholder="Wyszukaj produkt..."
        className={`w-full h-full py-4 bg-bgPrimary px-10 rounded-lg`}
        onChange={onChangeHandler}
        value={searchPhrase}
      ></input>
      {isAccepted ? (
        <CancelIcon
          data-testid={"cancel-icon"}
          className="cursor-pointer"
          sx={{ position: "absolute", right: 10, color: "rgb(182 182 182)" }}
          onClick={() => clearSearch()}
        />
      ) : null}

      <SearchItemsList
        isOpen={isSearchResultOpen}
        isLoading={isPending}
        products={searchedProducts}
        acceptHandler={onClickHandler}
      />
    </div>
  );
};
