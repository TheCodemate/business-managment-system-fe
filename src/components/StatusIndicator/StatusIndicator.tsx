type StatusTypes = "inProgress" | "notAssigned" | "expired" | "resolved";

type Props = {
  status: StatusTypes;
};

const statusText = {
  inProgress: "In progress",
  notAssigned: "Not assigned",
  expired: "Expired",
  resolved: "Resolved",
};

export const StatusIndicator = ({ status = "inProgress" }: Props) => {
  const statusBgColor = {
    inProgress: {
      primary: "#E0E7FF",
      secondary: "#4F46E5",
    },
    notAssigned: {
      primary: "#FEF3C7",
      secondary: "#F59E0B",
    },
    expired: {
      primary: "#FFF1F2",
      secondary: "#FB7185",
    },
    resolved: {
      primary: "emerald-50",
      secondary: "emerald-800",
    },
  };

  return (
    <div
      className={
        "flex items-center gap-2 w-fit py-1 px-4 rounded-md text-neutral text-nowrap"
      }
      style={{ backgroundColor: `${statusBgColor[status].primary}` }}
    >
      <div
        style={{ backgroundColor: `${statusBgColor[status].secondary}` }}
        className="w-2 h-2 rounded-full"
      ></div>
      {statusText[status]}
    </div>
  );
};
