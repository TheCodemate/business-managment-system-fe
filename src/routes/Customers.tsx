import { Button } from "../components/Button/Button";

export const Customers = () => {
  return (
    <div className="grow">
      <header className="flex flex-col gap-5 justify-center h-[250px] bg-bgPrimary px-12 sm:flex-row sm:justify-between sm:gap-10">
        <div className="flex flex-col justify-center">
          <h2 className="text-fontPrimary text-2xl text font-bold"> Clients</h2>
          <p className="text-fontPrimary text-sm">
            List of all the clients including project details. You can insert
            new client clicking add button
          </p>
        </div>
        <div className="flex items-center">
          <Button
            onClick={() => console.log("onclick fired")}
            icon={"add"}
            content={"Add customer"}
          />
        </div>
      </header>
      <main></main>
    </div>
  );
};
