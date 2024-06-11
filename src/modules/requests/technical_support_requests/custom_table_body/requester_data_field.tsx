type Props = {
  firstName: string;
  lastName: string;
  userId?: string;
};

export const RequesterDataField = ({ firstName, lastName, userId }: Props) => {
  return (
    <>
      {firstName && lastName ? (
        <p className="font-bold">{`${firstName} ${lastName}`}</p>
      ) : (
        <p>Data not provided</p>
      )}
    </>
  );
};
