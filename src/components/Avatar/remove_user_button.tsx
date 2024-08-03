import { useUnassign } from "@/services/mutations";
import ClearIcon from "@mui/icons-material/Clear";

type RemoveUserButtonProps = {
  userId: string;
  requestId: string;
};

export const RemoveUserButton = ({
  userId,
  requestId,
}: RemoveUserButtonProps) => {
  const { mutate: unassignUser } = useUnassign();

  return (
    <button
      onClick={() =>
        unassignUser({
          userId: userId,
          requestId: requestId,
        })
      }
      className="absolute -top-[20%] -right-[15%] hidden group-hover:flex items-center justify-center w-4 h-4 rounded-full border-2 border-bgPrimary bg-slate-500 hover:bg-redPrimary cursor-pointer z-10"
    >
      <ClearIcon sx={{ width: "100%", height: "100%" }} />
    </button>
  );
};
