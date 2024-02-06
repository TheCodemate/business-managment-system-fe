import { useCartItems } from "../../services/queries";

type DetailProps = {
  title: string;
  content: string | number;
  unit?: "m2" | "kg" | "szt" | "" | "pln";
};

export const Detail = ({ title, content, unit = "" }: DetailProps) => {
  return (
    <div className="flex flex-col items-stretch bg-bgPrimary shadow-md rounded-lg p-4 min-w-[200px] min-h-[30px]">
      <h3 className="text-xs font-bold">{title}:</h3>
      <span className=" flex-1 text-nowrap text-lg font-light">
        {content}
        {" " + unit}
      </span>
    </div>
  );
};

export const OrderDetails = () => {
  const { data: cartItems } = useCartItems();

  const getTotalWeight = cartItems
    ? cartItems
        .reduce((acc, item) => {
          return acc + Number(item.quantity) * item.product.weight;
        }, 0)
        .toFixed(2)
    : 0;

  const getTotalPallets = cartItems
    ? cartItems
        .reduce((acc, item) => {
          return (
            acc +
            (Number(item.quantity) / item.product.pallete > 1
              ? Number(item.quantity) / item.product.pallete
              : 1)
          );
        }, 0)
        .toFixed(2)
    : 0;

  const getTotalPrice = cartItems
    ? cartItems
        .reduce((acc, item) => {
          return acc + Number(item.quantity) * item.product.price;
        }, 0)
        .toFixed(2)
    : 0;
  return (
    <div className="flex flex-col gap-6 bg-details p-6 px-12">
      <h2 className="text-xl font-bold">Podsumowanie zamówienia: </h2>
      <div className="flex gap-4">
        <Detail content={getTotalPallets} title="Palety" unit="szt" />
        <Detail content={getTotalWeight} title="Waga" unit="kg" />
        <Detail content={getTotalPrice} title="Kwota" unit="pln" />
      </div>
    </div>
  );
};
