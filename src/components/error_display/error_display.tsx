export const ErrorDisplay = ({ error }: { error: Error | null }) => {
  if (!error) {
    return null;
  }

  return (
    <div
      role="alert"
      className="w-full bg-redPrimary border-redSecondary text-redSecondary p-2 mb-4 border rounded-lg"
    >
      {error.message}
    </div>
  );
};
