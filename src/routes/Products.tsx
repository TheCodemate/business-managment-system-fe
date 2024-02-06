import GridViewIcon from "@mui/icons-material/GridView";
import { useProducts } from "../services/queries";

import { Button } from "../components/Buttons/Button";
import { Loading } from "../components/Loading/Loading";
import { ProductCard } from "../components/ProductCard/ProductCard";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
} from "../components/Table/Table";

export const Products = () => {
  const { data: products, isPending: isProductPending } = useProducts();

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex flex-col gap-5 justify-center p-12 bg-bgPrimary px-12 sm:flex-row sm:justify-between sm:gap-10">
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <GridViewIcon className="text-fontPrimary" />
            <h2 className="text-fontPrimary align-center  text-2xl text font-bold">
              Lista produktów w ofercie
            </h2>
          </div>
          <p className="text-fontPrimary max-w-[75%] text-sm">
            W tej sekcji znajdziesz wszystkie dostępne produkty. W tym miejscu
            mozesz dodać produkt do Twojej listy zamowien klikajac przyczycisk
            "Dodaj" lub dowiedzieć się więcej o produkcie klikając przycisk
            "Szczegóły". Pamiętaj, produkt mozesz rowniez zamówić po przejściu
            do karty "Szczegóły".
          </p>
        </div>
        <div className="flex items-center">
          <Button
            //this onClick must be replaced as soon as AddProduct form will be created
            onClick={() => console.log("clicked button")}
            content={"Dodaj nowy produkt"}
          />
        </div>
      </header>
      <main className="flex flex-col h-full w-full p-8 overflow-x-auto">
        <div className="flex flex-col w-full gap-2">
          {isProductPending ? (
            <Loading color="#141414" />
          ) : (
            <Table className="w-full border-separate border-spacing-x-0 border-spacing-y-4">
              <TableHeader>
                {/* <TableRow className="thead-light text-left h-20 text-sm text-textPrimary font-light"> */}
                <TableHead className="py-10 px-3 pb-6 min-w-min whitespace-nowrap">
                  Zdjęcie
                </TableHead>
                <TableHead className="py-10 px-3 pb-6 min-w-min whitespace-nowrap">
                  Produkt
                </TableHead>
                <TableHead className="py-10 px-3 pb-6 min-w-min whitespace-nowrap">
                  Kategorie
                </TableHead>
                <TableHead className="py-10 px-3 pb-6 min-w-min whitespace-nowrap">
                  Options
                </TableHead>
                <TableHead className="py-10 px-3 pb-6 min-w-min whitespace-nowrap">
                  Cena
                </TableHead>
                <TableHead className="py-10 px-3 pb-6 min-w-min whitespace-nowrap">
                  Ilość
                </TableHead>
                <TableHead className="py-10 px-3 pb-6 min-w-min whitespace-nowrap">
                  Kod produktu
                </TableHead>
                <TableHead className="py-10 px-3 pb-6 min-w-min whitespace-nowrap">
                  Akcje
                </TableHead>
                {/* </TableRow> */}
              </TableHeader>
              <TableBody>
                {products
                  ? products.map((product) => (
                      <ProductCard key={product.product_id} product={product} />
                    ))
                  : "Sorry products not available at the moment"}
              </TableBody>
            </Table>
          )}
        </div>
      </main>
    </div>
  );
};
