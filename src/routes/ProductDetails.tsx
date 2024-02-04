import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

import { useAddToCart } from "../services/mutations";

export const ProductDetails = () => {
  const { mutate: addToCart } = useAddToCart();
  const navigate = useNavigate();
  const { state: product } = useLocation();
  const [activeTabIndex, setActiveTabIndex] = useState(1);
  const [count, setCount] = useState<number>(0);

  const setActiveTabHandler = (index: number) => {
    setActiveTabIndex(index);
  };

  const addToShoppingCartHandler = (productId: string, quantity: number) => {
    addToCart({
      product_id: productId,
      quantity: quantity,
    });
  };

  const increase = (stockAmount: number, packing: number) => {
    if (stockAmount < count || stockAmount - count < packing) {
      setCount((prev) => prev + (stockAmount - count));
      return;
    }

    setCount((prev) => prev + packing);
  };
  const decrease = (packing: number) => {
    if (count <= packing) {
      setCount((prev) => prev - count);
      return;
    }
    setCount((prev) => prev - packing);
  };

  if (!product) {
    return (
      <div className="flex w-full">
        <p>Product not available at the moment</p>
      </div>
    );
  }

  return (
    <div className="flex w-full">
      <div className="flex-1">
        <img className="w-full h-full object-cover " src={product.images[0]} />
      </div>
      <div className="relative flex-1 flex p-12 flex-col h-full w-full cursor-pointer">
        <div>
          <div
            onClick={() => navigate(-1)}
            className="absolute t-12 l-12 flex justify-center items-center rounded-full w-12 h-12 border-2 border-primary"
          >
            <ArrowBackIosNewOutlinedIcon />
          </div>
        </div>
        <header className="mt-40">
          <span className="text-lg tracking-widest">{product.brand_name}</span>
          <h2 className="text-4xl font-bold">{product.product_name}</h2>
          <span className="text-xs">Product code: {product.product_code}</span>
          <p className="text-md font-light mt-8 mb-12">
            {product.product_description}
          </p>
        </header>
        <main className="flex-1">
          <div className="flex justify-between mb-8">
            <div className="flex flex-col">
              <span className="text-lg font-bold">Cena:</span>
              <span className="text-2xl font-bold">
                {product.price} <span className="font-light text-2xl">PLN</span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold">Dostępność</span>
              <span className="text-2xl font-bold">
                <span>{product.stock_amount} </span>
                <span className="font-light text-2xl">M2</span>
              </span>
            </div>
            <div className="flex justify-between items-center w-1/5 bg-bgPrimary rounded-full px-4 py-2 ">
              <button
                onClick={() => decrease(product.stock_amount)}
                className="font-bold active:text-details"
              >
                -
              </button>
              <span className="p-1 bg-bgPrimary">{count.toFixed(2)}</span>
              <button
                onClick={() =>
                  increase(product.stock_amount, product.packing.package)
                }
                className="font-bold active:text-details"
              >
                +
              </button>
            </div>
          </div>

          <section className="overflow-hidden border-t border-details pt-2">
            <div className="flex flex-col flex-1">
              <ul className="flex w-full bg-bgSecondary first:rounded-tl-lg last:rounded-tr-lg pt-2">
                <li
                  onClick={() => setActiveTabHandler(1)}
                  className={`flex flex-1 px-8 py-4 rounded-t-lg border-b-2 border-bgSecondary items-center justify-center cursor-pointer ${
                    activeTabIndex === 1
                      ? " border-b-2 border-primary"
                      : "border-0"
                  } hover:transition-all`}
                >
                  Characteristics
                </li>
                <li
                  onClick={() => setActiveTabHandler(2)}
                  className={`flex flex-1 px-8 py-4 rounded-t-lg border-b-2 border-bgSecondary items-center justify-center cursor-pointer ${
                    activeTabIndex === 2
                      ? "border-b-2 border-primary"
                      : "border-0"
                  } hover:transition-all`}
                >
                  Packing
                </li>
                <li
                  onClick={() => setActiveTabHandler(3)}
                  className={`flex flex-1 px-8 py-4 rounded-t-lg border-b-2 border-bgSecondary items-center justify-center cursor-pointer ${
                    activeTabIndex === 3
                      ? "border-b-2 border-primary"
                      : "border-0"
                  } hover:transition-all`}
                >
                  Technical Data
                </li>
              </ul>
              <div className="flex-1 flex flex-col p-12 justify-center items-center">
                <div className="flex-1 flex justify-center items-center w-full bg-bgSecondary rounded-lg p-12 font-bold text-details">
                  We're sorry, data is not available at the moment
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="flex justify-end border-t border-details pt-2">
          <div className="flex items-center gap-8">
            <ShoppingCartOutlinedIcon
              sx={{ color: "#141414", width: 36, height: 36 }}
            />
            <FavoriteBorderOutlinedIcon
              sx={{ color: "#141414", width: 36, height: 36 }}
            />
            <button
              onClick={() =>
                addToShoppingCartHandler(product.product_id, count)
              }
              className={`px-8 py-4 bg-primary border-primary text-alternate font-bold text-nowrap border rounded-3xl hover:bg-bgPrimary hover:border-primary hover:text-primary transition-all`}
            >
              Dodaj
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
