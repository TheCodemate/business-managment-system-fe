import { ChangeEvent, useEffect, useState } from "react";
import { useProducts, useUploadedProducts } from "../services/queries";
import * as XLSX from "xlsx";
import { useForm } from "react-hook-form";
import { useProductUpload } from "@/services/mutations";
import { UploadedProductRequestType } from "@/types";
// import { SearchBar } from "@/components/SearchBar/SearchBar";
import GridViewIcon from "@mui/icons-material/GridView";
import { Button } from "@/components/Buttons/Button";

type ConvertedProductType = {
  producer: string;
  category: string;
  collectionName: string;
  productName: string;
  eanCode: string;
  productCode: string;
  finish: string;
  format: string;
  weight: string;
  M2xPKG: string;
  PCxPKG: string;
  M2xPLT: string;
  PCxPLT: string;
  unit: string;
  color: string;
};

type RequiredColumnTypes =
  | "collectionName"
  | "productName"
  | "eanCode"
  | "productCode"
  | "finish"
  | "format"
  | "weight"
  | "M2xPKG"
  | "PCxPKG"
  | "M2xPLT"
  | "PCxPLT"
  | "unit"
  | "color"
  | "producer"
  | "category";

const labels = {
  producer: "Producent",
  category: "Kategoria",
  collectionName: "Nazwa kolekcji",
  productName: "Nazwa produktu",
  eanCode: "EAN",
  productCode: "Kod produktu",
  finish: "Wykończenie",
  format: "Format",
  weight: "Waga",
  M2xPKG: "Ilość w opakowaniu (m2)",
  PCxPKG: "Ilość w opakowaniu (szt)",
  M2xPLT: "Ilość na palecie (m2)",
  PCxPLT: "Ilość na palecie (szt)",
  unit: "Jednostka",
  color: "Kolor",
};

const productCategories = ["Płytki", "Wyposazenie", "Tapety", "Oświetlenie"];

const ExcelMapper = () => {
  const { mutate: uploadProducts, isPending } = useProductUpload();
  const { data: uploadedProducts, isPending: isUploadedProductsPending } =
    useUploadedProducts();
  const [uploadedData, setUploadedData] = useState<
    Record<string, string | number>[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const [uploadedColumns, setUploadedColumns] = useState<string[]>();
  const {
    register,
    formState: { defaultValues: requiredColumns },
    handleSubmit,
  } = useForm({
    defaultValues: {
      producer: "",
      category: "",
      collectionName: "",
      productName: "",
      eanCode: "",
      productCode: "",
      finish: "",
      format: "",
      weight: "",
      M2xPKG: "",
      PCxPKG: "",
      M2xPLT: "",
      PCxPLT: "",
      unit: "",
      color: "",
    },
  });

  const fileUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const worksheet = workbook.SheetNames[0];
      const sheet = workbook.Sheets[worksheet];
      const parsedData: Record<string, string | number>[] =
        XLSX.utils.sheet_to_json(sheet);
      setUploadedData(parsedData);
    };
  };

  const onSubmit = async (values: UploadedProductRequestType) => {
    const convertedData = convertDataToUploadProducts(uploadedData, values);
    uploadProducts(convertedData);
  };

  const formatTable = (data: Record<string, string | number>[] | undefined) => {
    setIsLoading(true);
    if (data && data?.length > 0) {
      const availableCols = Object.keys(data[0]);
      setUploadedColumns(availableCols);
    }
    setIsLoading(false);
  };

  const convertDataToUploadProducts = (
    data: Record<string, string | number>[],
    requiredColumns: UploadedProductRequestType
  ): UploadedProductRequestType[] => {
    const a = data.map((element) => {
      // const newObject: { [key: string]: string | number } = {};
      const newObject: UploadedProductRequestType = {
        producer: "",
        category: "",
        collectionName: "",
        productName: "",
        eanCode: 0,
        productCode: "",
        finish: "",
        format: "",
        weight: 0,
        M2xPKG: 0,
        PCxPKG: 0,
        M2xPLT: 0,
        PCxPLT: 0,
        unit: "",
        color: "",
      };
      Object.entries(requiredColumns).forEach((entry) => {
        const [key, value] = entry;
        if (Object.keys(element).includes(value)) {
          newObject[key] = element[value];
        }
      });

      newObject.producer = requiredColumns["producer"];
      newObject.category = requiredColumns["category"];

      return newObject;
    });

    return a;
  };

  useEffect(() => {
    formatTable(uploadedData);
  }, [uploadedData]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h2>Excel mapper</h2>
      <input type="file" accept=".xls, .xlsx" onChange={fileUploadHandler} />
      {!isLoading && uploadedData.length > 0 ? (
        <form id="columns" onSubmit={handleSubmit(onSubmit)}>
          {requiredColumns &&
            Object.keys(requiredColumns).map((requiredColumnKey) => {
              if (requiredColumnKey === "producer") {
                return (
                  <div key={requiredColumnKey} className="flex gap-4">
                    <div className="flex gap-5">
                      <label htmlFor={requiredColumnKey}>
                        {labels[requiredColumnKey as RequiredColumnTypes]}
                      </label>
                      <input
                        {...register(requiredColumnKey as RequiredColumnTypes)}
                        className="text-alternate"
                      />
                    </div>
                  </div>
                );
              }

              if (requiredColumnKey === "category") {
                return (
                  <div key={requiredColumnKey} className="flex gap-4">
                    <div className="flex gap-5">
                      <label htmlFor={requiredColumnKey}>
                        {labels[requiredColumnKey as RequiredColumnTypes]}
                      </label>
                      <select
                        className="text-alternate"
                        {...register(requiredColumnKey as RequiredColumnTypes)}
                      >
                        <option value={undefined}></option>
                        {productCategories &&
                          productCategories.map((categoryName) => (
                            <option
                              className="text-primary bg-bgPrimary"
                              key={categoryName}
                              value={categoryName}
                              selected={
                                categoryName ===
                                requiredColumns[requiredColumnKey]
                              }
                            >
                              {categoryName}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                );
              }
              return (
                <div key={requiredColumnKey} className="flex gap-4">
                  <div className="flex gap-5">
                    <label htmlFor={requiredColumnKey}>
                      {labels[requiredColumnKey as RequiredColumnTypes]}
                    </label>
                    <select
                      className="text-alternate"
                      {...register(requiredColumnKey as RequiredColumnTypes)}
                    >
                      <option value={undefined}></option>
                      {uploadedColumns &&
                        uploadedColumns.map((uploadedHeader) => (
                          <option
                            className="text-primary bg-bgPrimary"
                            key={uploadedHeader}
                            value={uploadedHeader}
                            selected={
                              requiredColumns[
                                requiredColumnKey as RequiredColumnTypes
                              ] === uploadedHeader
                            }
                          >
                            {uploadedHeader}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              );
            })}

          <button>Submit</button>
        </form>
      ) : null}
    </div>
  );
};

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
      {/* <main className="flex flex-col h-full w-full p-8 overflow-x-auto">
        <div className="flex flex-col w-full gap-2">
          {isProductPending ? (
            <Loading color="#141414" />
          ) : (
            <Table className="w-full border-separate border-spacing-x-0 border-spacing-y-4">
              <TableHeader>
                <TableRow className="thead-light text-left h-20 text-sm text-textPrimary font-light">
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
                </TableRow>
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
      </main> */}
    </div>
  );
};
