import { Button } from "../../components/Buttons/Button";
import { Table } from "./components/Table/Table";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { Modal } from "../../components/Modal/Modal";
import { useState } from "react";
import { AddCustomerForm } from "../../components/Forms/AddCustomerFrom";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { axiosCustomer } from "../../api/axios";
import { CustomerType } from "../../types";
import { CustomerDetails } from "./components/CustomerDetails/CustomerDetails";
import { Backdrop } from "../../components/Backdrop/Backdrop";

const fetchCustomers = async () => {
  try {
    const data = await axiosCustomer.get("http://localhost:8081/api/customers");

    console.log("customers - data: ", data);

    return data.data as unknown as CustomerType[];
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error(
      "Could not fetch data. Unknown error occurred. Try again later."
    );
  }
};

export const Customers = () => {
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [isCustomerDetailsOpen, setIsCustomerDetailsOpen] = useState(false);
  const [productDetails, setProductDetails] = useState<CustomerType>(
    {} as CustomerType
  );
  const { data, isPending } = useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomers,
  });

  const openCustomerDetailsModal = (customer: CustomerType) => {
    setProductDetails({ ...customer });
    setIsCustomerDetailsOpen(true);
  };

  const closeCustomerDetailsModal = () => {
    setIsCustomerDetailsOpen(false);
  };
  const toggleCustomerDetailsHandler = (customer: CustomerType) => {
    setProductDetails({ ...customer });
  };
  const toggleModal = () => {
    setIsAddCustomerOpen((prevState) => !prevState);
  };

  console.log("data: ", data);
  console.log("data: ", data);
  console.log("data: ", data);

  if (isPending) return "Loading...";

  return (
    <div className="grow overflow-x-hidden">
      <header className="flex flex-col gap-5 justify-center h-[250px] bg-bgPrimary px-12 sm:flex-row sm:justify-between sm:gap-10">
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <PersonSearchIcon className="text-fontPrimary" />
            <h2 className="text-fontPrimary text-2xl text font-bold">
              Clients
            </h2>
          </div>
          <p className="text-fontPrimary text-sm">
            List of all the clients including project details. You can insert
            new client clicking add button
          </p>
        </div>
        <div className="flex items-center">
          <Button onClick={toggleModal} content={"Add customer"} />
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
                Company name
              </th>
              <th
                className="py-10 px-3 pb-6 min-w-min whitespace-nowrap"
                scope="col"
              >
                VAT No
              </th>
              <th
                className="py-10 px-3 pb-6 min-w-min whitespace-nowrap"
                scope="col"
              >
                Contact details
              </th>
              {/* <tr>{children}</tr> */}
            </thead>
            <tbody>
              {data?.map((customer) => {
                return (
                  <tr
                    key={customer.customerId}
                    className="w-full bg-bgPrimary rounded-lg px-8 py-4 cursor-pointer first:rounded-l-lg last:rounded-r-lg hover:scale-105 transition-all"
                    onClick={() => openCustomerDetailsModal(customer)}
                  >
                    <td className="p-4">{customer.companyName}</td>
                    <td className="p-4">{customer.vatNo}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="bg-primary rounded-full w-12 h-12 overflow-hidden">
                          {/* has to be replaced with avatarLink incoming from API */}
                          <img
                            width={"100%"}
                            height={"100%"}
                            src="https://avataaars.io/?avatarStyle=Transparent&topType=Eyepatch&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span>{`${customer.contactPerson.firstName} ${customer.contactPerson.lastName}`}</span>
                          <span>{customer.contactPerson.email}</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* <Table tableData={data}>
            <Table.Head>
              <Table.Header>ID</Table.Header>
              <Table.Header>Customer name</Table.Header>
              <Table.Header>Assigned assistant</Table.Header>
              <Table.Header>VAT No</Table.Header>
              <Table.Header>Phone</Table.Header>
              <Table.Header>Available actions</Table.Header>
            </Table.Head>
            <Table.Body>
              {(tableData) =>
                tableData.map((customer) => (
                  <Table.Row id={customer.id} customer={customer} />
                ))
              }
            </Table.Body>
          </Table> */}
        </div>
      </main>
      <Modal isOpen={isAddCustomerOpen} toggleModal={toggleModal}>
        <AddCustomerForm onCloseHandler={toggleModal} />
      </Modal>
      <Modal
        isOpen={isCustomerDetailsOpen}
        toggleModal={closeCustomerDetailsModal}
      >
        <CustomerDetails data={productDetails} />
      </Modal>
    </div>
  );
};
