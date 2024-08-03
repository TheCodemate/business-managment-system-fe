import { useGetSearchedProducts } from "@/services/mutations";
import { ChangeEvent, useState } from "react";

export const useSearch = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [isSearchResultOpen, setIsSearchResultOpen] = useState<boolean>(false);
  const [isAccepted, setIsAccepted] = useState(false);

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

  const selectProductHandler = (e: MouseEvent, callback: () => void) => {
    if (!e.target) {
      return;
    }

    callback();
    setIsAccepted(true);
    setIsSearchResultOpen(false);
    setSearchPhrase(e.target.innerHTML);
  };

  const clearSearch = () => {
    setSearchPhrase("");
    getSearchedProducts("");
    setIsAccepted(false);
    setIsSearchResultOpen(false);
  };

  return {
    searchPhrase,
    isSearchResultOpen,
    isAccepted,
    selectProductHandler,
    onChangeHandler,
    isPending,
    searchedProducts,
    clearSearch,
  };
};
