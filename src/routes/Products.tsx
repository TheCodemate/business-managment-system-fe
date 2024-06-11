import { ChangeEvent, useEffect, useState } from "react";
import { useProducts, useUploadedProducts } from "../services/queries";
import * as XLSX from "xlsx";
import { useForm } from "react-hook-form";
import { useProductUpload } from "@/services/mutations";
import { UploadedProductRequestType } from "@/types";
// import { SearchBar } from "@/components/SearchBar/SearchBar";

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
      const newObject: UploadedProductRequestType = {
        producer: "",
        category: "",
        collectionName: "",
        productName: "",
        eanCode: "",
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
  return (
    <div className="flex flex-1 flex-col">
      <ExcelMapper />
    </div>
  );
};
