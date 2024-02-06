import { useNavigate } from "react-router-dom";
import { useCartItems } from "../services/queries";
import { Loading } from "../components/Loading/Loading";
import { OrderItemCard } from "../components/OrderItemCard/OrderItemCard";
import { PageHeader } from "../components/PageHeader/PageHeader";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/Table/Table";

export const Order = () => {
  const navigate = useNavigate();
  const { data: cartItems, isPending } = useCartItems();

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loading color="#141414" />
      </div>
    );
  }
  return (
    <div className="flex flex-1 flex-col gap-4">
      <PageHeader
        title="Twoje zamówienia"
        buttonContent="Idź do sklepu"
        content="W tej sekcji wyświetlane są wszystkie produkty, które dodałeś do zamówienia. Mozesz usuwac oraz modyfkikować wybrane ilości, a tak ze uzyskac informacje o jego szczegółach "
        onClick={() => navigate("/products")}
      />

      <main className="flex flex-col justify-stretch h-full w-full p-8 overflow-x-auto">
        <div className="flex flex-col w-full h-full gap-2">
          {isPending ? (
            <Loading color="#141414" />
          ) : cartItems && cartItems?.length > 0 ? (
            <Table className="flex-col w-full border-separate border-spacing-x-0 border-spacing-y-4">
              <TableHeader>
                <TableRow className="thead-light text-left h-20 text-sm text-textPrimary font-light">
                  <TableHead className="py-10 px-3 pb-6 min-w-min whitespace-nowrap">
                    Zdjęcie
                  </TableHead>
                  <TableHead className="py-10 px-3 pb-6 min-w-min whitespace-nowrap">
                    Produkt
                  </TableHead>
                  <TableHead className="py-10 px-3 pb-6 min-w-min whitespace-nowrap">
                    Cena jed.
                  </TableHead>
                  <TableHead className="py-10 px-3 pb-6 min-w-min whitespace-nowrap">
                    Razem
                  </TableHead>
                  <TableHead className="py-10 px-3 pb-6 min-w-min whitespace-nowrap">
                    Waga
                  </TableHead>
                  <TableHead className="py-10 px-3 pb-6 min-w-min whitespace-nowrap">
                    Palety
                  </TableHead>
                  <TableHead className="py-10 px-3 pb-6 min-w-min whitespace-nowrap">
                    Akcje
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {cartItems.map((cartItem) => (
                  <OrderItemCard
                    key={cartItem.cart_item_id}
                    cartItem={cartItem}
                  />
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex h-full justify-center items-center mx-auto">
              <p className="font-bold text-textDetail">
                Jeszcze nic nie zamówiłeś. Przejdź do listy i dodaj wybrane
                produkty do zamówienia
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
