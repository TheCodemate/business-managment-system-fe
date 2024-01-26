import { NavLink } from "react-router-dom";
import { ShoppingCartItem } from "./components/ShoppingCartItem/ShoppingCartItem";

export const ShoppingCart = () => {
  return (
    <aside className="z-50 absolute top-0 right-0 flex flex-col h-screen w-[400px] px-8 py-16 bg-bgPrimary drop-shadow-xl">
      <header>
        <h2 className="text-3xl font-bold">
          Moje <br /> zamówienie
        </h2>
      </header>
      <main className="flex-1 border-t border-details pt-8 overflow-hidden overflow-y-scroll">
        <ul className="flex flex-col gap-2"></ul>
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
  );
};
