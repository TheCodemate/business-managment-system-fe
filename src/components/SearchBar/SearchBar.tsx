import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useGetSearchedProducts } from "@/services/mutations";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, MouseEvent, useState } from "react";
import { Loading } from "../Loading/Loading";

type Props = {
  searchAcceptHandler: (product: any) => void;
};

export const SearchBar = ({ searchAcceptHandler }: Props) => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [isSearchResultOpen, setIsSearchResultOpen] = useState<boolean>(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
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
    setIsAccepted(false);
    setSearchPhrase(e.target.value);
    getSearchedProducts(e.target.value);
  };

  const selectProductHandler = (e: MouseEvent, product: any) => {
    if (!e.target) {
      return;
    }

    searchAcceptHandler(product);
    setIsAccepted(true);
    setIsSearchResultOpen(false);
    setSearchPhrase(e.target.innerHTML);
    // setSelectedProduct(product);
  };

  // const onSearchAccept = (cb: (product: any) => void) => {
  //   setSearchPhrase("");

  //   // return cb;
  // };

  return (
    <div className="max-w-[900px]">
      <div
        className={`relative  flex items-center min-w-[200px] w-max-[900px] border border-details bg-bgPrimary px-4 py-2 rounded-lg ${
          selectedProduct ? "bg-redPrimary" : "bg-blue"
        }`}
      >
        <SearchIcon />
        <input
          placeholder="Wyszukaj produkt..."
          className={`w-full h-full px-4 py-2 bg-bgPrimary`}
          onChange={onChangeHandler}
          value={searchPhrase}
        />
        {isAccepted ? (
          <AddCircleIcon
            className="cursor-pointer"
            onClick={() => searchAcceptHandler(selectedProduct)}
          />
        ) : null}
        {isSearchResultOpen ? (
          <div className="absolute top-[120%] left-0 flex items-center justify-center min-w-[200px] w-full bg-bgPrimary border border-details py-4 rounded-lg">
            {isPending ? (
              <Loading color="#141414" />
            ) : (
              <ul className="w-full space-y-2 hover:transition-all">
                {searchedProducts && searchedProducts.length > 0 ? (
                  searchedProducts.map(({ item }) => (
                    <li
                      key={item.uploadedProductId}
                      onClick={(e) => selectProductHandler(e, item)}
                      className="px-4 py-2 text-primary cursor-pointer hover:bg-details hover:text-alternate transition-all"
                      value={item.uploadedProductId}
                    >
                      {item.producer} - {item.productCode} -{" "}
                      {item.collectionName} - {item.productName} {item.color}{" "}
                      {item.format ? `- ${item.format}` : null}
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
    </div>
  );
};
