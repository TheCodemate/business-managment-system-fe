import * as SearchRequestFormUtils from "./search_request_form.test-utils";

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe("SearchRequestForm", () => {
  it("renders all inputs", () => {
    SearchRequestFormUtils.renderSearchRequestForm();
    SearchRequestFormUtils.expectFormToBeInTheDocument();
    SearchRequestFormUtils.expectQuantityInputToBeInTheDocument();
    SearchRequestFormUtils.expectUnitSelectToBeInTheDocument();
    SearchRequestFormUtils.expectAdditionalInfoTextareaToBeInTheDocument();
    SearchRequestFormUtils.expectContactPersonToBeInTheDocument();
    SearchRequestFormUtils.expectContactEmailInputToBeInTheDocument();
    SearchRequestFormUtils.expectContactPhoneInputToBeInTheDocument();
    SearchRequestFormUtils.expectCancelButtonToBeInTheDocument();
    SearchRequestFormUtils.expectSendButtonToBeInTheDocument();
  });

  it("renders options list when unit button is clicked", async () => {
    SearchRequestFormUtils.renderSearchRequestForm();
    SearchRequestFormUtils.expectUnitSelectToBeInTheDocument();
    await SearchRequestFormUtils.clickSelectUnitButton();
    SearchRequestFormUtils.expectUnitOptionsListToBeRendered();
  });

  it("shows all options in the list", async () => {
    const selectOptions = ["m2", "szt", "komplet", "mb"];
    SearchRequestFormUtils.renderSearchRequestForm();
    SearchRequestFormUtils.expectUnitSelectToBeInTheDocument();
    await SearchRequestFormUtils.clickSelectUnitButton();
    SearchRequestFormUtils.expectAllOptionsToBeRendered(selectOptions);
  });

  it("displays selected value in UnitSelect input", async () => {
    SearchRequestFormUtils.renderSearchRequestForm();
    SearchRequestFormUtils.expectUnitSelectToBeInTheDocument();
    await SearchRequestFormUtils.clickSelectUnitButton();
    await SearchRequestFormUtils.clickSelectedOption();
    SearchRequestFormUtils.expectUnitSelectToDisplaySelectedUnit();
  });

  it.each([{ scenario: "product is missing" }])(
    "should display error if $scenario ",
    async () => {
      SearchRequestFormUtils.renderSearchRequestForm();
      await SearchRequestFormUtils.clickSubmitButton();
      SearchRequestFormUtils.expectProductSearchErrorToBeInTheDocument();
    }
  );
  it.each([
    { scenario: "missing quantity" },
    { scenario: "quantity is less than 0", quantity: "-10" },
    { scenario: "text is typed in", quantity: "test" },
    { scenario: "does not match the pattern", quantity: "90,900" },
  ])("should display error if $scenario", async ({ quantity }) => {
    SearchRequestFormUtils.renderSearchRequestForm();

    const input = SearchRequestFormUtils.getInputByPlaceholder(
      "np.: 1,44; 10; 12.8"
    );

    await SearchRequestFormUtils.typeInTheInput({
      element: input,
      value: quantity,
    });
    await SearchRequestFormUtils.clickSubmitButton();
    SearchRequestFormUtils.expectQuantityErrorToBeInTheDocument();
  });

  it.each([
    { scenario: "email is not provided" },
    { scenario: "incorrect email is provided", email: "exampleexample.pl" },
    {
      scenario: "email is too long",
      email:
        "piotrpiotrpiotrpiotrpiotrpiotrpiotrpiotrpiotrpiotrpiotrpiotrp@piotr.pl",
    },
  ])("should display error if $scenario", async ({ email }) => {
    SearchRequestFormUtils.renderSearchRequestForm();
    const input =
      SearchRequestFormUtils.getInputByPlaceholder("example@example.pl");

    await SearchRequestFormUtils.typeInTheInput({
      element: input,
      value: email,
    });
    await SearchRequestFormUtils.clickSubmitButton();
    SearchRequestFormUtils.expectContactPersonEmailErrorToBeInTheDocument();
  });
  it.each([
    { scenario: "phone is not provided" },
    { scenario: "incorrect phone number is provided", phone: "500" },
    {
      scenario: "phone number is too long",
      phone: "500500500500500",
    },
    {
      scenario: "phone number is not a valid number",
      phone: "test",
    },
  ])("should display error if $scenario", async ({ phone }) => {
    SearchRequestFormUtils.renderSearchRequestForm();
    const input = SearchRequestFormUtils.getContactPhoneInput();

    await SearchRequestFormUtils.typeInTheInput({
      element: input,
      value: phone,
    });
    await SearchRequestFormUtils.clickSubmitButton();
    SearchRequestFormUtils.expectContactPhoneErrorToBeInTheDocument();
  });

  it.only("displays confirmation modal when submit is clicked", async () => {
    SearchRequestFormUtils.renderSearchRequestForm();
    await SearchRequestFormUtils.fillSearchBarInputWithText();
    await SearchRequestFormUtils.clickSearchBarFirstListItem();
    await SearchRequestFormUtils.fillTheFormWithCorrectValues();
    await SearchRequestFormUtils.clickSubmitButton();
    SearchRequestFormUtils.expectDialogConfirmationButtonToBeInTheDocument();
  });
});
