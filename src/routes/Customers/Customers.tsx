import { useState } from "react";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { useCustomers } from "../../services/queries";

import { Button } from "../../components/Buttons/Button";
import { Modal } from "../../components/Modal/Modal";
import { CustomerDetails } from "./components/CustomerDetails/CustomerDetails";
import { AddCustomerForm } from "../../components/Forms/AddCustomerFrom";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/Table/Table";

import { CustomerType } from "../../types";
import { CustomerCard } from "../../components/CustomerCard/CustomerCard";

export const Customers = () => {
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [isCustomerDetailsOpen, setIsCustomerDetailsOpen] = useState(false);
  const [productDetails, setProductDetails] = useState<CustomerType>(
    {} as CustomerType
  );
  const { data: customers, isPending } = useCustomers();

  const openCustomerDetailsModal = (customer: CustomerType) => {
    setProductDetails({ ...customer });
    setIsCustomerDetailsOpen(true);
  };

  const closeCustomerDetailsModal = () => {
    setIsCustomerDetailsOpen(false);
  };

  const closeAddCustomerModal = () => {
    setIsAddCustomerOpen(true);
  };
  const openAddCustomerModal = () => {
    setIsAddCustomerOpen(true);
  };

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
          <Button
            onClick={openAddCustomerModal}
            content={"Dodaj klienta"}
            variant="default"
          />
        </div>
      </header>
      <main className="flex flex-col h-full w-full p-8 overflow-x-auto">
        <div className="flex flex-col w-full gap-2">
          <Table className="w-full border-separate border-spacing-x-0 border-spacing-y-4">
            <TableHeader className="thead-light text-left h-20 text-sm text-textPrimary font-light">
              <TableRow>
                <TableHead className="py-10 px-3 pb-6 min-w-min whitespace-nowrap">
                  Company name
                </TableHead>
                <TableHead className="py-10 px-3 pb-6 min-w-min whitespace-nowrap">
                  VAT No
                </TableHead>
                <TableHead className="py-10 px-3 pb-6 min-w-min whitespace-nowrap">
                  Contact details
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers ? (
                customers.map((customer) => (
                  <CustomerCard
                    customer={customer}
                    onClickHandler={openCustomerDetailsModal}
                  />
                ))
              ) : (
                <TableRow className="flex justify-center items-center ">
                  <p>No customers available</p>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </main>
      <Modal isOpen={isAddCustomerOpen} toggleModal={closeAddCustomerModal}>
        <AddCustomerForm onCloseHandler={closeAddCustomerModal} />
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
