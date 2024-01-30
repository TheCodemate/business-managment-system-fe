import GridViewIcon from "@mui/icons-material/GridView";
import { Button } from "../components/Buttons/Button";
import { useNavigate } from "react-router-dom";

export const Products = () => {
  const navigate = useNavigate();
  const products = [
    {
      productId: "asdfa-asfawe45434fe-asfas-45vratve",
      productName: "Cosmopolitan CP03 Arabescato Oro",
      productDescription:
        "A collection in which each slab offers all the thrill of a work of art. Seeking out the finest marbles and faithfully reproducing them in porcelain stoneware to mimic the depth and the wealth of detail and the random veining patterns",
      productCode: "AGQ1",
      categories: ["Slabs", "Marbles"],
      price: 569,
      stockAmount: 500,
      productProducer: "Mirage",
      brandName: "Mirage",
      color: "White",
      packing: {
        package: 3.36,
        pallete: 67.2,
      },
      dimensions: {
        metric: {
          distanceUnit: "cm",
          height: 278,
          width: 120,
          thickness: 0.6,
          weight: 10,
          weightUnit: "kg",
        },
      },
      material: "Porcelain",
      finish: "Mate",
      slipResistance: {
        DIN51097: [],
        DIN51130: "R9",
      },
      createdDate: "2024-02-01T10:00:00Z",
      updatedDate: "2024-02-01T14:30:00Z",
      isActive: true,
      images: [
        "https://mirage-cdn.thron.com/delivery/public/image/mirage/04927ef7-f95d-4686-bc6d-58b0367346f7/9pkhty/std/2560x0/04927ef7-f95d-4686-bc6d-58b0367346f7?scalemode=centered&format=auto&quality=auto-medium",
      ],
    },
    {
      productId: "asdfa-asfawe45434fe-asfas-44vratve",
      productName: "Cosmopolitan CP01 Statuario Extra",
      productDescription:
        "A collection in which each slab offers all the thrill of a work of art. Seeking out the finest marbles and faithfully reproducing them in porcelain stoneware to mimic the depth and the wealth of detail and the random veining patterns",
      productCode: "AGQ1",
      categories: ["Slabs", "Marbles"],
      price: 569,
      stockAmount: 500,
      productProducer: "Mirage",
      brandName: "Mirage",
      color: "White",
      packing: {
        package: 3.36,
        pallete: 67.2,
      },
      dimensions: {
        metric: {
          distanceUnit: "cm",
          height: 278,
          width: 120,
          thickness: 0.6,
          weight: 10,
          weightUnit: "kg",
        },
      },
      material: "Porcelain",
      finish: "Mate",
      slipResistance: {
        DIN51097: [],
        DIN51130: "R9",
      },
      createdDate: "2024-02-01T10:00:00Z",
      updatedDate: "2024-02-01T14:30:00Z",
      isActive: true,
      images: [
        "https://mirage-cdn.thron.com/delivery/public/image/mirage/501ed3aa-97a6-4b93-ae0e-0dec223e3f82/9pkhty/std/1020x0/501ed3aa-97a6-4b93-ae0e-0dec223e3f82?scalemode=centered&format=auto&quality=auto-medium",
      ],
    },
    {
      productId: "asdfa-asfawe45434fe-asfas-43vratve",
      productName: "Cosmopolitan CP06 Mystic Grey",
      productDescription:
        "A collection in which each slab offers all the thrill of a work of art. Seeking out the finest marbles and faithfully reproducing them in porcelain stoneware to mimic the depth and the wealth of detail and the random veining patterns",
      productCode: "AGQ1",
      categories: ["Slabs", "Marbles"],
      price: 569,
      stockAmount: 500,
      productProducer: "Mirage",
      brandName: "Mirage",
      color: "White",
      packing: {
        package: 3.36,
        pallete: 67.2,
      },
      dimensions: {
        metric: {
          distanceUnit: "cm",
          height: 278,
          width: 120,
          thickness: 0.6,
          weight: 10,
          weightUnit: "kg",
        },
      },
      material: "Porcelain",
      finish: "Mate",
      slipResistance: {
        DIN51097: [],
        DIN51130: "R9",
      },
      createdDate: "2024-02-01T10:00:00Z",
      updatedDate: "2024-02-01T14:30:00Z",
      isActive: true,
      images: [
        "https://mirage-cdn.thron.com/delivery/public/image/mirage/c807c0b5-e7b1-47c7-94eb-094f21dd03d1/9pkhty/std/1020x0/c807c0b5-e7b1-47c7-94eb-094f21dd03d1?scalemode=centered&format=auto&quality=auto-medium",
      ],
    },
    {
      productId: "asdfa-asfawe45434fe-asfas-42vratve",
      productName: "Jewels JW11 Black Gold",
      productDescription:
        "A collection in which each slab offers all the thrill of a work of art. Seeking out the finest marbles and faithfully reproducing them in porcelain stoneware to mimic the depth and the wealth of detail and the random veining patterns",
      productCode: "AGQ1",
      categories: ["Slabs", "Marbles"],
      price: 569,
      stockAmount: 500,
      productProducer: "Mirage",
      brandName: "Mirage",
      color: "White",
      packing: {
        package: 3.36,
        pallete: 67.2,
      },
      dimensions: {
        metric: {
          distanceUnit: "cm",
          height: 278,
          width: 120,
          thickness: 0.6,
          weight: 10,
          weightUnit: "kg",
        },
      },
      material: "Porcelain",
      finish: "Mate",
      slipResistance: {
        DIN51097: [],
        DIN51130: "R9",
      },
      createdDate: "2024-02-01T10:00:00Z",
      updatedDate: "2024-02-01T14:30:00Z",
      isActive: true,
      images: [
        "https://mirage-cdn.thron.com/delivery/public/image/mirage/9f0e33f2-7f48-445b-8359-9328d3ce515a/9pkhty/std/1020x0/9f0e33f2-7f48-445b-8359-9328d3ce515a?scalemode=centered&format=auto&quality=auto-medium",
      ],
    },
    {
      productId: "asdfa-asfawe45434fe-asfas-41vratve",
      productName: "Wanderlust WA05 Labradorite",
      productDescription:
        "A collection in which each slab offers all the thrill of a work of art. Seeking out the finest marbles and faithfully reproducing them in porcelain stoneware to mimic the depth and the wealth of detail and the random veining patterns",
      productCode: "AGQ1",
      categories: ["Slabs", "Marbles"],
      price: 569,
      stockAmount: 500,
      productProducer: "Mirage",
      brandName: "Mirage",
      color: "White",
      packing: {
        package: 3.36,
        pallete: 67.2,
      },
      dimensions: {
        metric: {
          distanceUnit: "cm",
          height: 278,
          width: 120,
          thickness: 0.6,
          weight: 10,
          weightUnit: "kg",
        },
      },
      material: "Porcelain",
      finish: "Mate",
      slipResistance: {
        DIN51097: [],
        DIN51130: "R9",
      },
      downloads: {},
      createdDate: "2024-02-01T10:00:00Z",
      updatedDate: "2024-02-01T14:30:00Z",
      isActive: true,
      images: [
        "https://mirage-cdn.thron.com/delivery/public/image/mirage/5033161a-07ba-4b77-91b4-7a90ec1cc303/9pkhty/std/1020x0/5033161a-07ba-4b77-91b4-7a90ec1cc303?scalemode=centered&format=auto&quality=auto-medium",
      ],
    },
  ];
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex flex-col gap-5 justify-center h-[250px] bg-bgPrimary px-12 sm:flex-row sm:justify-between sm:gap-10">
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <GridViewIcon className="text-fontPrimary" />
            <h2 className="text-fontPrimary text-2xl text font-bold">
              Products list
            </h2>
          </div>
          <p className="text-fontPrimary text-sm">
            Find your product and check all the details: availability, params,
            pictures, description and many more.
          </p>
        </div>
        <div className="flex items-center">
          <Button
            //this onClick must be replaced as soon as AddProduct form will be created
            onClick={() => console.log("clicked button")}
            content={"Add product"}
          />
        </div>
      </header>
      <main className="flex flex-col h-full w-full p-8 overflow-x-auto">
        <div className="flex flex-col w-full gap-2">
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
              {products.map((product) => (
                <tr
                  key={product.productCode}
                  className="w-full bg-bgPrimary rounded-lg px-8 py-4 cursor-pointer first:rounded-l-lg last:rounded-r-lg hover:scale-101 transition-all"
                >
                  <td className="flex-col p-4">
                    <div className="w-20 h-20">
                      <img src={product.images[0]} alt="" />
                    </div>
                  </td>
                  <td className="flex-1 flex flex-col p-4 h-full">
                    <span className="font-bold">{product.productName}</span>
                    <span className="text-xs text-ellipsis overflow-hidden max-w-[300px] text-nowrap">
                      {product.productDescription}
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
                  <td className="p-4">{product.price}</td>
                  <td className="p-4">{product.stockAmount}</td>
                  <td className="p-4">{product.productCode}</td>
                  <td className="p-4">
                    <div className="flex gap-2 font-bold text-xs">
                      <button className="px-4 py-2 bg-bgSecondary rounded-md hover:bg-details transition-all">
                        Edit
                      </button>
                      <button className="px-4 py-2 bg-bgSecondary rounded-md hover:bg-details transition-all">
                        Remove
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/products/${product.productId}`, {
                            state: product,
                          })
                        }
                        className="px-4 py-2 bg-bgSecondary rounded-md hover:bg-details transition-all"
                      >
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};
