import { render, screen } from "@testing-library/react";
import { SearchListItem } from "./search_list_item";
import userEvent from "@testing-library/user-event";

const item = {
  item: {
    uploadedProductId: "f55e4d12-48a3-43c2-9d69-f37da46f2a5c",
    collectionName: "ARTIFACT OF CERIM",
    productName: "ARTIFACT VINTAGE_TAUPE 4,6X60 BS",
    eanCode: "8032842211773",
    productCode: "760917",
    finish: "MATT - NATURALE",
    format: "4,6X60 BS",
    weight: "8.4",
    M2xPKG: "0",
    PCxPKG: "0",
    M2xPLT: "0",
    PCxPLT: null,
    unit: "M",
    color: "",
    producer: "Florim",
    category: "Płytki",
    searchedPhrase:
      "Florim ARTIFACT OF CERIM ARTIFACT VINTAGE_TAUPE 4,6X60 BS  4,6X60 BS 760917",
  },
  refIndex: 3096,
  matches: [
    {
      indices: [[34, 37]],
      value:
        "Florim ARTIFACT OF CERIM ARTIFACT VINTAGE_TAUPE 4,6X60 BS  4,6X60 BS 760917",
      key: "searchedPhrase",
    },
  ],
  score: 3.5095375719442547e-10,
};

const user = userEvent.setup();

export const renderSearchListItem = () => {
  const acceptHandler = vi.fn();
  render(<SearchListItem acceptHandler={acceptHandler} item={item} />);

  return {
    acceptHandler,
  };
};

const getListItem = () => {
  return screen.getByRole("listitem");
};

export const expectListItemToBeInTheDocument = () => {
  expect(getListItem()).toBeInTheDocument();
};

export const clickListItem = async () => {
  await user.click(getListItem());
};
