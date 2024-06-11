type ProductInfoProps = {
  producer: string;
  productCode: string;
  collectionName: string;
  color: string;
  finish: string;
  format: string;
  quantity: string;
  unit: string;
};
export const ProductInfo = ({
  producer,
  productCode,
  collectionName,
  color,
  finish,
  format,
  quantity,
  unit,
}: ProductInfoProps) => {
  return (
    <span>
      <p className="">
        <span className="font-bold">Producent</span>
        {` ${producer}`}
      </p>
      <p>
        <span className="font-bold">Kod</span>
        {` ${productCode}`}
      </p>
      <p>
        <span className="font-bold">Produkt</span>{" "}
        {`${collectionName} ${color} ${finish}
          ${format}`}
      </p>
      <p>
        <span className="font-bold">Ilość</span> {`${quantity} ${unit}`}
      </p>
    </span>
  );
};
