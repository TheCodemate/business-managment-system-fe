import { cleanup } from "@testing-library/react";
import * as SearchItemsListTestUtils from "./search_items_list.test-utils";

// ======================================================================================================
describe("SearchItemsList", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders search items list", () => {
    SearchItemsListTestUtils.renderSearchItemsList();
  });

  it("shows loading icon if is loading", () => {
    SearchItemsListTestUtils.renderSearchItemsList({ isLoading: true });
    SearchItemsListTestUtils.expectLoadingIconToBeInTheDocument();
  });

  it("does not show loading icon if is not loading", () => {
    SearchItemsListTestUtils.renderSearchItemsList({ isLoading: false });
    SearchItemsListTestUtils.expectLoadingIconNotToBeInTheDocument();
  });
  it("displays no result info if products not provided", () => {
    SearchItemsListTestUtils.renderSearchItemsList({ isLoading: false });
    SearchItemsListTestUtils.expectNoResultsFoundInfoToBeInTheDocument();
  });
  it("displays items if products provided", () => {
    SearchItemsListTestUtils.renderSearchItemsList({
      isLoading: false,
      products: [
        {
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
        },
        {
          item: {
            uploadedProductId: "d59c09e3-7145-44d4-9c28-2473414e79be",
            collectionName: "VINT",
            productName: "VINT GRIS NATURAL 100X300 ITOP 6mm R",
            eanCode: "8425549220856",
            productCode: "PT005668",
            finish: "NATURAL",
            format: "100X300",
            weight: "42.66",
            M2xPKG: "3",
            PCxPKG: "1",
            M2xPLT: "60",
            PCxPLT: null,
            unit: "Pz",
            color: "GRIS",
            producer: "Inalco",
            category: "Płytki",
            searchedPhrase:
              "Inalco VINT VINT GRIS NATURAL 100X300 ITOP 6mm R GRIS 100X300 PT005668",
          },
          refIndex: 102,
          matches: [
            {
              indices: [
                [7, 10],
                [12, 15],
              ],
              value:
                "Inalco VINT VINT GRIS NATURAL 100X300 ITOP 6mm R GRIS 100X300 PT005668",
              key: "searchedPhrase",
            },
          ],
          score: 8.958647536717133e-10,
        },
        {
          item: {
            uploadedProductId: "ae4c7187-1297-429e-8e19-b8a9e63fdf53",
            collectionName: "VINT",
            productName: "VINT GRIS NATURAL 160X160 ITOP 6mm R",
            eanCode: "8425549215845",
            productCode: "PT005499",
            finish: "NATURAL",
            format: "160X160",
            weight: "36.4",
            M2xPKG: "2.56",
            PCxPKG: "1",
            M2xPLT: "51.2",
            PCxPLT: null,
            unit: "Pz",
            color: "GRIS",
            producer: "Inalco",
            category: "Płytki",
            searchedPhrase:
              "Inalco VINT VINT GRIS NATURAL 160X160 ITOP 6mm R GRIS 160X160 PT005499",
          },
          refIndex: 103,
          matches: [
            {
              indices: [
                [7, 10],
                [12, 15],
              ],
              value:
                "Inalco VINT VINT GRIS NATURAL 160X160 ITOP 6mm R GRIS 160X160 PT005499",
              key: "searchedPhrase",
            },
          ],
          score: 8.958647536717133e-10,
        },
        {
          item: {
            uploadedProductId: "fc77f112-0a9e-4b00-b6a3-a8d58c4022d2",
            collectionName: "VINT",
            productName: "VINT GRIS NATURAL 160X320 ITOP 6mm R",
            eanCode: "8425549215098",
            productCode: "PT005481",
            finish: "NATURAL",
            format: "160X320",
            weight: "72.70999999999999",
            M2xPKG: "5.12",
            PCxPKG: "1",
            M2xPLT: "81.92",
            PCxPLT: null,
            unit: "Pz",
            color: "GRIS",
            producer: "Inalco",
            category: "Płytki",
            searchedPhrase:
              "Inalco VINT VINT GRIS NATURAL 160X320 ITOP 6mm R GRIS 160X320 PT005481",
          },
          refIndex: 104,
          matches: [
            {
              indices: [
                [7, 10],
                [12, 15],
              ],
              value:
                "Inalco VINT VINT GRIS NATURAL 160X320 ITOP 6mm R GRIS 160X320 PT005481",
              key: "searchedPhrase",
            },
          ],
          score: 8.958647536717133e-10,
        },
        {
          item: {
            uploadedProductId: "4ad8c86a-d820-4df3-a50c-1bf58988ba65",
            collectionName: "ARTIFACT OF CERIM",
            productName: "ARTIFACT OF CERIM VINT_TAUPE GRIP30X60 R",
            eanCode: "8032842212169",
            productCode: "760638",
            finish: "GRIP",
            format: "30x60",
            weight: "20.844",
            M2xPKG: "0",
            PCxPKG: "0",
            M2xPLT: "0",
            PCxPLT: null,
            unit: "M2",
            color: "",
            producer: "Florim",
            category: "Płytki",
            searchedPhrase:
              "Florim ARTIFACT OF CERIM ARTIFACT OF CERIM VINT_TAUPE GRIP30X60 R  30x60 760638",
          },
          refIndex: 3055,
          matches: [
            {
              indices: [[43, 46]],
              value:
                "Florim ARTIFACT OF CERIM ARTIFACT OF CERIM VINT_TAUPE GRIP30X60 R  30x60 760638",
              key: "searchedPhrase",
            },
          ],
          score: 8.958647536717133e-10,
        },
        {
          item: {
            uploadedProductId: "a885af00-7684-400e-b629-e57344305a3c",
            collectionName: "ARTIFACT OF CERIM",
            productName: "ARTIFACT OF CERIM VINT_TAUPE 60X120 RET",
            eanCode: "8032842212466",
            productCode: "760607",
            finish: "MATT - NATURALE",
            format: "60X120",
            weight: "28.08",
            M2xPKG: "0",
            PCxPKG: "0",
            M2xPLT: "0",
            PCxPLT: null,
            unit: "M2",
            color: "",
            producer: "Florim",
            category: "Płytki",
            searchedPhrase:
              "Florim ARTIFACT OF CERIM ARTIFACT OF CERIM VINT_TAUPE 60X120 RET  60X120 760607",
          },
          refIndex: 3065,
          matches: [
            {
              indices: [[43, 46]],
              value:
                "Florim ARTIFACT OF CERIM ARTIFACT OF CERIM VINT_TAUPE 60X120 RET  60X120 760607",
              key: "searchedPhrase",
            },
          ],
          score: 8.958647536717133e-10,
        },
        {
          item: {
            uploadedProductId: "93cc06eb-b654-480a-be00-552754a19640",
            collectionName: "ARTIFACT OF CERIM",
            productName: "ARTIFACT OF CERIM VINT_TAUPE 60X60 RET",
            eanCode: "8032842212282",
            productCode: "760625",
            finish: "MATT - NATURALE",
            format: "60X60",
            weight: "21.06",
            M2xPKG: "0",
            PCxPKG: "0",
            M2xPLT: "0",
            PCxPLT: null,
            unit: "M2",
            color: "",
            producer: "Florim",
            category: "Płytki",
            searchedPhrase:
              "Florim ARTIFACT OF CERIM ARTIFACT OF CERIM VINT_TAUPE 60X60 RET  60X60 760625",
          },
          refIndex: 3070,
          matches: [
            {
              indices: [[43, 46]],
              value:
                "Florim ARTIFACT OF CERIM ARTIFACT OF CERIM VINT_TAUPE 60X60 RET  60X60 760625",
              key: "searchedPhrase",
            },
          ],
          score: 8.958647536717133e-10,
        },
        {
          item: {
            uploadedProductId: "1abe04aa-71d3-463b-9b34-abdd4fe6b0ee",
            collectionName: "ARTIFACT OF CERIM",
            productName: "ARTIFACT OF CERIM VINT_TAUPE 80X80 RET",
            eanCode: "8032842212343",
            productCode: "760619",
            finish: "MATT - NATURALE",
            format: "80X80",
            weight: "24.96",
            M2xPKG: "0",
            PCxPKG: "0",
            M2xPLT: "0",
            PCxPLT: null,
            unit: "M2",
            color: "",
            producer: "Florim",
            category: "Płytki",
            searchedPhrase:
              "Florim ARTIFACT OF CERIM ARTIFACT OF CERIM VINT_TAUPE 80X80 RET  80X80 760619",
          },
          refIndex: 3076,
          matches: [
            {
              indices: [[43, 46]],
              value:
                "Florim ARTIFACT OF CERIM ARTIFACT OF CERIM VINT_TAUPE 80X80 RET  80X80 760619",
              key: "searchedPhrase",
            },
          ],
          score: 8.958647536717133e-10,
        },
        {
          item: {
            uploadedProductId: "0294e323-7d57-4c93-afbe-37bee678632e",
            collectionName: "ARTIFACT OF CERIM",
            productName: "ARTIFACT VINTAGE_TAUPE LIST SFAL 21X40",
            eanCode: "8032842211674",
            productCode: "760927",
            finish: "MATT - NATURALE",
            format: "21X40 MOD.LIST.",
            weight: "9.66",
            M2xPKG: "0",
            PCxPKG: "0",
            M2xPLT: "0",
            PCxPLT: null,
            unit: "M2",
            color: "",
            producer: "Florim",
            category: "Płytki",
            searchedPhrase:
              "Florim ARTIFACT OF CERIM ARTIFACT VINTAGE_TAUPE LIST SFAL 21X40  21X40 MOD.LIST. 760927",
          },
          refIndex: 3081,
          matches: [
            {
              indices: [[34, 37]],
              value:
                "Florim ARTIFACT OF CERIM ARTIFACT VINTAGE_TAUPE LIST SFAL 21X40  21X40 MOD.LIST. 760927",
              key: "searchedPhrase",
            },
          ],
          score: 8.958647536717133e-10,
        },
        {
          item: {
            uploadedProductId: "087d4591-ebc9-496e-b3ea-79c19fc6c99d",
            collectionName: "ARTIFACT OF CERIM",
            productName: "ARTIFACT VINTAGE_TAUPE 30x30 MOS 3X3",
            eanCode: "8032842211728",
            productCode: "760922",
            finish: "MATT - NATURALE",
            format: "3X3 MOS",
            weight: "19.8",
            M2xPKG: "0",
            PCxPKG: "0",
            M2xPLT: "0",
            PCxPLT: null,
            unit: "PZ",
            color: "",
            producer: "Florim",
            category: "Płytki",
            searchedPhrase:
              "Florim ARTIFACT OF CERIM ARTIFACT VINTAGE_TAUPE 30x30 MOS 3X3  3X3 MOS 760922",
          },
          refIndex: 3086,
          matches: [
            {
              indices: [[34, 37]],
              value:
                "Florim ARTIFACT OF CERIM ARTIFACT VINTAGE_TAUPE 30x30 MOS 3X3  3X3 MOS 760922",
              key: "searchedPhrase",
            },
          ],
          score: 8.958647536717133e-10,
        },
      ],
    });
    SearchItemsListTestUtils.expectListItemsToBeInTheDocument();
  });
});
