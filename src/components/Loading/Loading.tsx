import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  color: string;
  size?: number;
};

export const Loading = ({ color, size = 20 }: Props) => {
  return <CircularProgress size={size} sx={{ color, aspectRatio: "1/1" }} />;
};
