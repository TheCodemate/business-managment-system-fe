type CustomerFieldProps = {
  contactPerson?: string;
  contactPersonEmail?: string;
  contactPersonPhone?: string;
};

export const CustomerField = ({
  contactPerson,
  contactPersonEmail,
  contactPersonPhone,
}: CustomerFieldProps) => {
  if (!contactPerson && !contactPersonEmail && !contactPersonPhone) {
    return <p className="font-bold">Brak danych o kliencie</p>;
  }

  return (
    <>
      {contactPerson ? <p className="font-bold">{`${contactPerson}`}</p> : null}
      {contactPersonEmail ? (
        <p className="">{`Email: ${contactPersonEmail}`}</p>
      ) : null}
      {contactPersonPhone ? (
        <p className="">{`Phone: ${contactPersonPhone}`}</p>
      ) : null}
    </>
  );
};
