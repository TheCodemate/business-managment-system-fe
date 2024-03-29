import { Avatar } from "@/components/Avatar/Avatar";
import { Button } from "@/components/Buttons/Button";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { StatusIndicator } from "@/components/StatusIndicator/StatusIndicator";
import { Timer } from "@/components/Timer/Timer";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Modal } from "@/components/Modal/Modal";
import { useState } from "react";
import { AddRequestForm } from "@/components/AddRequestForm/AddRequestForm";

export const Requests = () => {
  const [isAddRequestFormOpen, setIsAddRequestFormOpen] = useState(false);

  const openModal = () => {
    console.log("clicked");
    setIsAddRequestFormOpen(true);
  };
  const closeModal = () => {
    console.log("clicked");
    setIsAddRequestFormOpen(false);
  };

  return (
    <div className="flex flex-col w-full">
      <PageHeader
        icon="addRequest"
        content="Tutaj znajduje się strefa pomocy. Składając zapytanie mozesz uzyskać potrzebne informacje dotyczące produktów."
        title="Panel zapytań"
        onClick={openModal}
        buttonContent="Nowe zapytanie"
      />

      <main className="flex flex-col justify-stretch w-full h-full">
        <Table className="w-[100%] p-10 border-separate border-spacing-y-3 overflow-hidden">
          <TableCaption>A list of your all requests.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Od</TableHead>
              <TableHead>Czas</TableHead>
              <TableHead>Priorytet</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="flex justify-center items-center">
                Przydzielone do
              </TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow className="bg-bgPrimary rounded-lg">
              <TableCell className="font-medium">8357398373</TableCell>
              <TableCell>
                <p className="font-bold">Jan Kowalski</p>
                <p className="">Sprzedaz detaliczna</p>
                <p className="">Kraków - Zakopiańska</p>
              </TableCell>
              <TableCell>
                <Timer />
              </TableCell>
              <TableCell>Wysoki</TableCell>
              <TableCell>
                <StatusIndicator status={"expired"} />
              </TableCell>
              <TableCell className="flex justify-center items-stretch">
                <Avatar firstName="Jan" lastName="Kowalski" />
              </TableCell>
              <TableCell>
                <Button content="Zobacz" variant="" />
              </TableCell>
            </TableRow>
            <TableRow className="bg-bgPrimary">
              <TableCell className="font-medium">8357398373</TableCell>
              <TableCell>
                <p className="font-bold">Jan Kowalski</p>
                <p className="">Sprzedaz detaliczna</p>
                <p className="">Kraków - Zakopiańska</p>
              </TableCell>
              <TableCell>
                <Timer />
              </TableCell>
              <TableCell>Wysoki</TableCell>
              <TableCell>
                <StatusIndicator />
              </TableCell>
              <TableCell className="flex justify-center items-center">
                <Avatar firstName="Jan" lastName="Kowalski" />
              </TableCell>
              <TableCell>Szczegóły</TableCell>
            </TableRow>
            <TableRow className="bg-bgPrimary ">
              <TableCell className="font-medium">8357398373</TableCell>
              <TableCell>
                <p className="font-bold">Jan Kowalski</p>
                <p className="">Sprzedaz detaliczna</p>
                <p className="">Kraków - Zakopiańska</p>
              </TableCell>
              <TableCell>
                <Timer />
              </TableCell>
              <TableCell>Wysoki</TableCell>
              <TableCell>
                <StatusIndicator />
              </TableCell>
              <TableCell className="flex justify-center items-center">
                <Avatar firstName="Jan" lastName="Kowalski" />
              </TableCell>
              <TableCell>Szczegóły</TableCell>
            </TableRow>
            <TableRow className="bg-bgPrimary">
              <TableCell className="font-medium">8357398373</TableCell>
              <TableCell>
                <p className="font-bold">Jan Kowalski</p>
                <p className="">Sprzedaz detaliczna</p>
                <p className="">Kraków - Zakopiańska</p>
              </TableCell>
              <TableCell>
                <Timer />
              </TableCell>
              <TableCell>Wysoki</TableCell>
              <TableCell>
                <StatusIndicator status="notAssigned" />
              </TableCell>
              <TableCell className="flex justify-center items-center">
                <Avatar firstName="Jan" lastName="Kowalski" />
              </TableCell>
              <TableCell>Szczegóły</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </main>
      <Modal isOpen={isAddRequestFormOpen} toggleModal={closeModal}>
        <AddRequestForm closeHandler={closeModal} />
      </Modal>
    </div>
  );
};
