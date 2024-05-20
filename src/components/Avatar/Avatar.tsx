import { useUnassign } from "@/services/mutations";
import { getInitials } from "@/utils/getInitials";
import ClearIcon from "@mui/icons-material/Clear";

const sizes = {
  xSmall: {
    width: "10px",
    height: "10px",
    textSize: "8px",
  },
  small: {
    width: "15px",
    height: "15px",
    textSize: "12px",
  },
  medium: {
    width: "30px",
    height: "30px",
    textSize: "16px",
  },
  large: {
    width: "40px",
    height: "40px",
    textSize: "24px",
  },
  xLarge: {
    width: "50px",
    height: "50px",
    textSize: "32px",
  },
};

type UnassignUserProps = {
  userId: string;
  requestId: string;
};

const UnassignUser = ({ userId, requestId }: UnassignUserProps) => {
  const { mutate: unassignUser } = useUnassign();

  return (
    <div
      onClick={() =>
        unassignUser({
          userId: userId,
          requestId: requestId,
        })
      }
      className="absolute -top-[20%] -right-[15%] hidden group-hover:flex items-center justify-center w-4 h-4 rounded-full border-2 border-bgPrimary bg-slate-500 hover:bg-redPrimary cursor-pointer z-10"
    >
      <ClearIcon sx={{ width: "100%", height: "100%" }} />
    </div>
  );
};

type AssigneeAvatarProps = {
  requestId: string;
  userFirstName: string;
  userLastName: string;
  userId: string;
  url?: string;
  size?: "xSmall" | "small" | "medium" | "large" | "xLarge";
  removable?: boolean;
};
export const AssigneeAvatar = ({
  requestId,
  userFirstName,
  userLastName,
  removable = true,
  size = "medium",
  userId,
  url,
}: AssigneeAvatarProps) => {
  console.log("AssigneeAvatar - assignedTo: ", assignedTo);
  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{
          width: sizes[size].width,
          height: sizes[size].height,
          fontSize: sizes[size].textSize,
        }}
        className="relative flex justify-center items-center rounded-[100%] w-14 h-14 p-4 bg-sky-300 font-semibold text-sky-50 border-2 border-sky-50 cursor-pointer text-2xl group -ml-[10px] first:ml-0"
      >
        {removable ? (
          <UnassignUser requestId={requestId} userId={userId} />
        ) : null}

        {url
          ? url
          : getInitials(userFirstName, userLastName)
          ? getInitials(userFirstName, userLastName)
          : null}
      </div>
    </>
  );
};
