import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Loading } from "../Loading/Loading";
import { axiosShoppingCart } from "../../api/axios";
import { ShoppingCartItem } from "./components/ShoppingCartItem/ShoppingCartItem";

const getShoppingCartItemsHandler = async () => {
  const { data } = await axiosShoppingCart.get("/", {
    withCredentials: true,
  });
  return data;
};

export const ShoppingCart = () => {
  const { data, isPending } = useQuery({
    queryKey: ["shoppingCart"],
    queryFn: getShoppingCartItemsHandler,
  });
  const [isOpen, setIsOpen] = useState(true);

  const handleIsOpen = () => {
    setTimeout(() => setIsOpen((prev) => !prev), 5000);
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {isOpen ? (
        <aside className="z-50 absolute top-0 right-0 flex flex-col h-screen w-[400px] px-8 py-16 bg-bgPrimary drop-shadow-xl">
          <header>
            <h2 onClick={handleIsOpen} className="text-3xl font-bold">
              Moje <br /> zamówienie
            </h2>
          </header>

          <main className="flex-1 border-t border-details pt-8 overflow-hidden overflow-y-scroll">
            {isPending ? (
              <div className="flex justify-center items-center h-full">
                <Loading color={"#141414"} />
              </div>
            ) : data ? (
              <ul className="flex flex-col gap-2">
                {data.map(({ product, quantity }) => (
                  <ShoppingCartItem product={product} quantity={quantity} />
                ))}
              </ul>
            ) : (
              <div className="flex justify-center items-center h-full">
                <p className="font-bold text-details">Shopping cart is empty</p>
              </div>
            )}
          </main>
          <footer className="flex flex-col gap-4 justify-center pt-2">
            <div className="flex flex-col">
              <span className="font-extrabold uppercase text-xl">Suma</span>
              <span className="font-extrabold text-4xl">
                <span className="font-light">PLN</span>200
              </span>
            </div>
            <NavLink
              className="text-2xl text-white font-bold bg-primary text-textAlternate hover:cursor-pointer w-full px-6 py-3 rounded-lg text-center"
              to={"/products"}
            >
              Zamawiam
            </NavLink>
          </footer>
        </aside>
      ) : null}
    </>
  );
};
