import { getInitials } from "@/utils/getInitials";
import { RemoveUserButton } from "./remove_user_button";

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
  return (
    <button
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
      {removable && <RemoveUserButton requestId={requestId} userId={userId} />}

      {url
        ? url
        : getInitials(userFirstName, userLastName)
        ? getInitials(userFirstName, userLastName)
        : null}
    </button>
  );
};
