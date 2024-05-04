import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useGetSearchedProducts } from "@/services/mutations";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, MouseEvent, useState } from "react";
import { Loading } from "../Loading/Loading";

type Props = {
  searchAcceptHandler: () => void;
};

export const SearchBar = ({ searchAcceptHandler }: Props) => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [isSearchResultOpen, setIsSearchResultOpen] = useState<boolean>();
  const [isAcceptButtonVisible, setIsAcceptButtonVisible] = useState(false);
  const {
    data: searchedProducts,
    isPending,
    mutate: getSearchedProducts,
  } = useGetSearchedProducts();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 1) {
      setIsSearchResultOpen(false);
    }
    if (e.target.value.length > 0) {
      setIsSearchResultOpen(true);
    }
    setIsAcceptButtonVisible(false);
    setSearchPhrase(e.target.value);
    getSearchedProducts(e.target.value);
  };

  const onClickHandler = (e: MouseEvent) => {
    if (!e.target) {
      return;
    }
    setIsAcceptButtonVisible(true);
    setIsSearchResultOpen(false);
    setSearchPhrase(e.target.innerHTML);
  };

  const onSearchAccept = (cb: () => void) => {
    cb();
    setSearchPhrase("");
  };

  return (
    <div className="max-w-[900px]">
      <div className="flex items-center min-w-[200px] bg-bgPrimary px-4 py-2 rounded-lg mb-2">
        <SearchIcon />
        <input
          placeholder="Wyszukaj produkt..."
          className="w-full h-full px-4 py-2 bg-bgPrimary"
          onChange={onChangeHandler}
          value={searchPhrase}
        />
        {isAcceptButtonVisible ? (
          <AddCircleIcon
            className="cursor-pointer"
            onClick={() => onSearchAccept(searchAcceptHandler)}
          />
        ) : null}
      </div>
      {isSearchResultOpen ? (
        <div className="flex items-center justify-center min-w-[200px] bg-bgPrimary py-4 rounded-lg">
          {isPending ? (
            <Loading color="#141414" />
          ) : (
            <ul className="w-full space-y-2 hover:transition-all">
              {searchedProducts && searchedProducts.length > 0 ? (
                searchedProducts.map(({ item }) => (
                  <li
                    key={item.uploadedProductId}
                    onClick={onClickHandler}
                    className="px-4 py-2 text-primary cursor-pointer hover:bg-details hover:text-alternate transition-all"
                  >
                    {item.productName} {item.format}
                  </li>
                ))
              ) : (
                <div className="flex items-center justify-center">
                  <p>Brak wyników</p>
                </div>
              )}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
};
