type Props = {
  data?: {
    message: string;
  };
};

export const SuccessDisplay = ({ data }: Props) => {
  if (!data) {
    return null;
  }

  return (
    <div
      role="alert"
      className="w-full bg-confirmBasic border-confirmBasic text-confirmAlternate p-2 mb-4 border rounded-lg"
    >
      {data.message}
    </div>
  );
};
