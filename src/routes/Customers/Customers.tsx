import { Button } from "../../components/Buttons/Button";
import { Table } from "./components/Table/Table";
import { Input } from "../../components/Input/Input";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { Modal } from "../../components/Modal/Modal";
import { useState } from "react";
import { AddCustomerForm } from "../../components/Forms/AddCustomerFrom";

export const Customers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const customers = [
    {
      id: 134523451,
      avatarUrl: "https://randomuser.me/api/",
      first_name: "Piotr",
      last_name: "Skrzynski",
      email: "piotr@piotr.pl",
      phone: "+48500000000",
      address: "Some randomly generated description...",
      vatNo: 600000000,
      assignedAssistant: "Marcin Dąbrowski",
      description: "Kraków",
      createdAt: "29-06-1990",
    },
    {
      id: 134523452,
      avatarUrl: "https://randomuser.me/api/",
      first_name: "Piotr",
      last_name: "Skrzynski",
      email: "piotr@piotr.pl",
      phone: "+48500000000",
      address: "Some randomly generated description...",
      vatNo: 600000000,
      assignedAssistant: "Marcin Dąbrowski",
      description: "Kraków",
      createdAt: "29-06-1990",
    },
    {
      id: 134523453,
      avatarUrl: "https://randomuser.me/api/",
      first_name: "Piotr",
      last_name: "Skrzynski",
      email: "piotr@piotr.pl",
      phone: "+48500000000",
      address: "Some randomly generated description...",
      vatNo: 600000000,
      assignedAssistant: "Marcin Dąbrowski",
      description: "Kraków",
      createdAt: "29-06-1990",
    },
    {
      id: 134523454,
      avatarUrl: "https://randomuser.me/api/",
      first_name: "Piotr",
      last_name: "Skrzynski",
      email: "piotr@piotr.pl",
      phone: "+48500000000",
      address: "Some randomly generated description...",
      vatNo: 600000000,
      assignedAssistant: "Marcin Dąbrowski",
      description: "Kraków",
      createdAt: "29-06-1990",
    },
  ];

  if (customers.length < 1) {
    return <p>There are no customers available at the moment</p>;
  }

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
            variant="basic"
            onClick={toggleModal}
            icon={"add"}
            content={"Add customer"}
          />
        </div>
      </header>
      <main className="flex flex-col h-full w-full p-8 overflow-x-auto">
        <div className="flex items-center gap-4 w-full">
          <Input name="search" placeholder="Search..." label={"Search"} />
          <Button
            variant="search"
            content={"Search"}
            onClick={() => console.log("search clicked")}
          />
        </div>
        <div className="w-full">
          <Table tableData={customers}>
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
          </Table>
        </div>
      </main>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} toggleModal={toggleModal}>
          <AddCustomerForm onCloseHandler={toggleModal} />
        </Modal>
      )}
    </div>
  );
};
