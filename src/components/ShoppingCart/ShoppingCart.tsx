import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loading } from "../Loading/Loading";
import { ShoppingCartItem } from "./components/ShoppingCartItem/ShoppingCartItem";
import { Header } from "./components/Header/Header";
import { useCartItems } from "../../services/querries";

export const ShoppingCart = () => {
  const { data, isPending } = useCartItems();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen((prev) => !prev);
    setTimeout(() => setIsOpen((prev) => !prev), 2000);
  }, [data]);

  return (
    <aside
      className={`z-50 absolute top-0 right-0 flex flex-col h-screen w-[400px] px-8 py-16 bg-bgPrimary drop-shadow-xl ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-all`}
    >
      <div className="flex flex-1 flex-col relative">
        <div className="absolute top-0 left-0 translate-x-1/2 bg-primary rounded-full z-40"></div>
        <Header>Moje zamówienie</Header>

        <main className="flex-1 border-t border-details pt-8 overflow-hidden overflow-y-scroll">
          {isPending ? (
            <div className="flex justify-center items-center h-full">
              <Loading color={"#141414"} />
            </div>
          ) : data ? (
            <ul className="flex flex-col gap-2">
              {data.map((cartItem) => (
                <ShoppingCartItem
                  key={cartItem.cart_item_id}
                  cartItem={cartItem}
                />
              ))}
            </ul>
          ) : (
            <div className="flex flex-1 justify-center items-center h-full">
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
      </div>
    </aside>
  );
};
