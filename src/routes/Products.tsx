import GridViewIcon from "@mui/icons-material/GridView";
import { Button } from "../components/Buttons/Button";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../services/queries";
import { Loading } from "../components/Loading/Loading";
import { useAddToCart } from "../services/mutations";

export const Products = () => {
  const navigate = useNavigate();
  const { data: products, isPending: isProductPending } = useProducts();
  const { isPending: isAddToCartPending, mutate: addToCart } = useAddToCart();

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
            <table className="w-full border-separate border-spacing-x-0 border-spacing-y-4">
              <thead className="thead-light text-left h-20 text-sm text-textPrimary font-light">
                <th
                  className="py-10 px-3 pb-6 min-w-min whitespace-nowrap"
                  scope="col"
                >
                  Image
                </th>
                <th
                  className="py-10 px-3 pb-6 min-w-min whitespace-nowrap"
                  scope="col"
                >
                  Product details
                </th>
                <th
                  className="py-10 px-3 pb-6 min-w-min whitespace-nowrap"
                  scope="col"
                >
                  Category
                </th>
                <th
                  className="py-10 px-3 pb-6 min-w-min whitespace-nowrap"
                  scope="col"
                >
                  Options
                </th>
                <th
                  className="py-10 px-3 pb-6 min-w-min whitespace-nowrap"
                  scope="col"
                >
                  Price
                </th>
                <th
                  className="py-10 px-3 pb-6 min-w-min whitespace-nowrap"
                  scope="col"
                >
                  Stock
                </th>
                <th
                  className="py-10 px-3 pb-6 min-w-min whitespace-nowrap"
                  scope="col"
                >
                  Product code
                </th>
                <th
                  className="py-10 px-3 pb-6 min-w-min whitespace-nowrap"
                  scope="col"
                >
                  Actions
                </th>
              </thead>
              <tbody>
                {products
                  ? products.map((product) => (
                      <tr
                        key={product.product_id}
                        className="w-full bg-bgPrimary rounded-lg px-8 py-4 cursor-pointer first:rounded-l-lg last:rounded-r-lg hover:scale-101 transition-all"
                      >
                        <td className="flex-col p-4">
                          <div className="w-20 h-20">
                            <img src={product.images[0]} alt="" />
                          </div>
                        </td>
                        <td className="flex-1 flex flex-col p-4 h-full">
                          <span className="font-bold">
                            {product.product_name}
                          </span>
                          <span className="text-xs text-ellipsis overflow-hidden max-w-[300px] text-nowrap">
                            {product.product_description}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-1">
                            {product.categories.map((category) => (
                              <div
                                key={category}
                                className="p-1 text-xs bg-bgSecondary  font-bold rounded-md"
                              >
                                {category}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="p-4">Options</td>
                        <td className="p-4">{product.price}PLN</td>
                        <td className="p-4">{product.stock_amount}m2</td>
                        <td className="p-4">{product.product_code}</td>
                        <td className="p-4">
                          <div className="flex gap-2 font-bold text-xs">
                            <button
                              onClick={() =>
                                navigate(`/products/${product.product_id}`, {
                                  state: product,
                                })
                              }
                              className="px-4 py-2 bg-bgSecondary rounded-md hover:bg-details transition-all"
                            >
                              Więcej
                            </button>
                            <button
                              onClick={() =>
                                addToCart({
                                  product_id: product.product_id,
                                  quantity: Number(product.package),
                                })
                              }
                              className="px-4 py-2 bg-primary text-textAlternate font-bold rounded-md hover:bg-details hover:scale-105 transition-all cursor-pointer "
                            >
                              {isAddToCartPending ? (
                                <Loading color={"#141414"} />
                              ) : (
                                "Dodaj"
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  : "Sorry products not available at the moment"}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};
