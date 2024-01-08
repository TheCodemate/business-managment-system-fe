import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  color: string;
};

export const Loading = ({ color }: Props) => {
  return <CircularProgress sx={{ color }} />;
};
