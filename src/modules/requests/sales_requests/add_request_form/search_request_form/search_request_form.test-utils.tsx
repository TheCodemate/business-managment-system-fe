import { render, screen } from "@testing-library/react";
import { SearchRequestForm } from "./search_request_form";
import { QueryProvider } from "@/modules/global_provider/query_provider";
import { userEvent } from "@testing-library/user-event";

const user = userEvent.setup();

export const renderSearchRequestForm = () => {
  render(
    <QueryProvider>
      <SearchRequestForm closeFormHandler={vi.fn()} />
    </QueryProvider>
  );
};

export const expectUnitSelectToBeInTheDocument = () => {
  expect(getUnitSelect()).toBeInTheDocument();
};

export const clickSelectUnitButton = async () => {
  await user.click(getUnitSelect());
};

export const clickSelectedOption = async () => {
  await user.click(screen.getByRole("option", { name: "szt" }));
};

export const expectUnitSelectToDisplaySelectedUnit = () => {
  expect(getUnitSelect()).toHaveTextContent("szt");
};

const getForm = () => {
  return screen.getByRole("form");
};

const getSubmitButton = () => {
  return screen.getByRole("button", { name: /wyślij/i });
};
const getQuantityInput = () => {
  return screen.getByLabelText(/ilość/i);
};
const getUnitSelect = () => {
  return screen.getByRole("combobox");
};
const getAdditionalInfoTextarea = () => {
  return screen.getByLabelText(/dodatkowe informacje/i);
};
export const getContactPersonInput = () => {
  return screen.getByLabelText(/osoba kontaktowa/i);
};
export const getContactEmailInput = () => {
  return screen.getByLabelText(/email kontaktowy/i);
};
export const getContactPhoneInput = () => {
  return screen.getByLabelText(/telefon kontaktowy/i);
};
const getCancelButton = () => {
  return screen.getByRole("button", { name: /anuluj/i });
};
const getSendButton = () => {
  return screen.getByRole("button", { name: /wyślij/i });
};

export const expectFormToBeInTheDocument = async () => {
  expect(getForm()).toBeInTheDocument();
};

export const getOptionsList = () => {
  return screen.getAllByRole("option");
};

export const selectSztUnit = async () => {
  await user.selectOptions(
    screen.getByRole("combobox"),
    screen.getByRole("option", { name: "szt" })
  );
};

export const expectQuantityInputToBeInTheDocument = () => {
  expect(getQuantityInput()).toBeInTheDocument();
};

export const expectAdditionalInfoTextareaToBeInTheDocument = () => {
  expect(getAdditionalInfoTextarea()).toBeInTheDocument();
};
export const expectContactPersonToBeInTheDocument = () => {
  expect(getContactPersonInput()).toBeInTheDocument();
};
export const expectContactEmailInputToBeInTheDocument = () => {
  expect(getContactEmailInput()).toBeInTheDocument();
};
export const expectContactPhoneInputToBeInTheDocument = () => {
  expect(getContactPhoneInput()).toBeInTheDocument();
};
export const expectCancelButtonToBeInTheDocument = () => {
  expect(getCancelButton()).toBeInTheDocument();
};
export const expectSendButtonToBeInTheDocument = () => {
  expect(getSendButton()).toBeInTheDocument();
};

export const expectUnitOptionsListToBeRendered = () => {
  expect(getOptionsList().length).toBeGreaterThan(0);
};

export const expectAllOptionsToBeRendered = (options: string[]) => {
  options.forEach((option) => {
    expect(screen.getByRole("option", { name: option })).toBeInTheDocument();
  });
};

export const clickSubmitButton = async () => {
  await user.click(getSubmitButton());
};

export const expectErrorsToBeDisplayedIfInputDataNotProvided = () => {
  const productSearchError = screen.getByTestId("product-search-alert");
  const quantityError = screen.getByTestId("quantity-alert");
  const contactPersonEmailError = screen.getByTestId("contact-email-alert");
  const contactPhoneError = screen.getByTestId("contact-phone-alert");
  expect(productSearchError).toBeInTheDocument();
  expect(quantityError).toBeInTheDocument();
  expect(contactPersonEmailError).toBeInTheDocument();
  expect(contactPhoneError).toBeInTheDocument();
};
export const expectProductSearchErrorToBeInTheDocument = () => {
  const productSearchError = screen.getByTestId("product-search-alert");
  expect(productSearchError).toBeInTheDocument();
};
export const expectQuantityErrorToBeInTheDocument = () => {
  const quantityError = screen.getByTestId("quantity-alert");
  expect(quantityError).toBeInTheDocument();
};
export const expectContactPersonEmailErrorToBeInTheDocument = () => {
  const contactPersonEmailError = screen.getByTestId("contact-email-alert");
  expect(contactPersonEmailError).toBeInTheDocument();
};
export const expectContactPhoneErrorToBeInTheDocument = () => {
  const contactPersonPhoneError = screen.getByTestId("contact-phone-alert");
  expect(contactPersonPhoneError).toBeInTheDocument();
};

export const expectConfirmationModalToBeInTheDocument = () => {
  const confirmationModal = screen.getByTestId("modal");
  expect(confirmationModal).toBeInTheDocument();
};
export const expectDialogToBeInTheDocument = () => {
  const dialog = screen.getByTestId("dialog-container");
  expect(dialog).toBeInTheDocument();
};

export const getInputByPlaceholder = (placeholderText: string) => {
  return screen.getByPlaceholderText(placeholderText);
};

export const typeInTheInput = async ({
  element,
  value,
}: {
  element: HTMLElement;
  value?: string;
}) => {
  if (!value) return;
  await user.type(element, value);
};

export const fillTheFormWithCorrectValues = async () => {
  await typeInTheInput({
    element: getQuantityInput(),
    value: "200",
  });
  await clickSelectUnitButton();
  await clickSelectedOption();

  await typeInTheInput({
    element: getContactPhoneInput(),
    value: "500500500",
  });
  await typeInTheInput({
    element: getContactEmailInput(),
    value: "piotr@piotr.pl",
  });
};

export const getSearchBar = () => {
  return screen.getByPlaceholderText(/wyszukaj produkt/i);
};

export const fillSearchBarInputWithText = async () => {
  await user.type(getSearchBar(), "vint");
};

export const getSearchBarListItems = () => {
  return screen.getAllByRole("listitem");
};

export const clickSearchBarFirstListItem = async () => {
  await user.click(getSearchBarListItems()[0]);
};

export const getDialogConfirmationButton = () => {
  return screen.getByTestId("accept-button");
};

export const expectDialogConfirmationButtonToBeInTheDocument = () => {
  expect(getDialogConfirmationButton()).toBeInTheDocument();
};

export const test = async () => {
  await fillTheFormWithCorrectValues();
  await clickSubmitButton();

  expectConfirmationModalToBeInTheDocument();
  expectDialogToBeInTheDocument();
};
