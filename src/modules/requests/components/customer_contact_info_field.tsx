const DATA_NOT_PROVIDED_INFO_TEXT = "Nie dodano";

type CustomerContactInfoFieldProps = {
  contactPerson: string;
  contactPersonPhone: string;
  contactPersonEmail?: string;
};
export const CustomerContactInfoField = ({
  contactPerson,
  contactPersonPhone,
  contactPersonEmail,
}: CustomerContactInfoFieldProps) => {
  return (
    <>
      <div className="flex flex-col">
        <span className="font-bold text-sm mb-1">Imię:</span>
        <span>
          {contactPerson ? contactPerson : DATA_NOT_PROVIDED_INFO_TEXT}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-sm mb-1">Telefon:</span>
        <span>
          {contactPersonPhone
            ? contactPersonPhone
            : DATA_NOT_PROVIDED_INFO_TEXT}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-sm mb-1">Email</span>
        <span>
          {contactPersonEmail
            ? contactPersonEmail
            : DATA_NOT_PROVIDED_INFO_TEXT}
        </span>
      </div>
    </>
  );
};
