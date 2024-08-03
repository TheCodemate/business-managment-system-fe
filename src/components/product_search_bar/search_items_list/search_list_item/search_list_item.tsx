import { UploadedProductResponseType } from "@/types";

export const SearchListItem = ({
  item,
  acceptHandler,
}: {
  item: UploadedProductResponseType;
  acceptHandler: (e: MouseEvent) => void;
}) => {
  return (
    <li
      key={item.uploadedProductId}
      onClick={acceptHandler}
      className="px-4 py-2 text-primary self-start cursor-pointer hover:bg-details hover:text-alternate transition-all"
      value={item.uploadedProductId}
    >
      {item.producer} - {item.productCode} - {item.collectionName} -{" "}
      {item.productName} {item.color} {item.format ? `- ${item.format}` : null}
    </li>
  );
};
