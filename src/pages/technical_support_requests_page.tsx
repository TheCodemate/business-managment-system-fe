import { PageHeader } from "@/components/PageHeader/PageHeader";
import { TechnicalSupportRequests } from "@/modules/requests/technical_support_requests/technical_support_requests";

export const TechnicalSupportRequestsPage = () => {
  return (
    <div className="flex flex-col w-full">
      <PageHeader
        icon="addRequest"
        content="Lista wszystkich zapytań zgłoszonych przez zespół sprzedazowy."
        title="Lista oczekujących zapytań"
        buttonVisible={false}
      />
      <main className="flex flex-col justify-stretch w-full h-full">
        <TechnicalSupportRequests />
      </main>
    </div>
  );
};
