import { Loading } from "@/components/loading/loading";
import { UploadedProductResponseType } from "@/types";
import { SearchListItem } from "./search_list_item/search_list_item";

type Props = {
  isOpen: boolean;
  isLoading: boolean;
  products?: UploadedProductResponseType[];
  acceptHandler: (e: MouseEvent, item: UploadedProductResponseType) => void;
};

export const SearchItemsList = ({
  isOpen,
  isLoading,
  products,
  acceptHandler,
}: Props) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ul className="absolute top-[120%] left-0 flex-col justify-start min-w-[200px] w-full bg-bgPrimary border border-details py-4 rounded-lg hover:transition-all">
      {isLoading ? (
        <Loading color="#141414" />
      ) : (
        <>
          {products && products.length > 0 ? (
            products.map(({ item }) => (
              <SearchListItem
                acceptHandler={(e: MouseEvent) => acceptHandler(e, item)}
                item={item}
              />
            ))
          ) : (
            <div className="flex items-center justify-center">
              <p>Brak wyników</p>
            </div>
          )}
        </>
      )}
    </ul>
  );
};
