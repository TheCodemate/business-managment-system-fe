import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  color: string;
  size?: number;
};

export const Loading = ({ color, size = 20, ...props }: Props) => {
  return (
    <CircularProgress
      data-testid="loading-icon"
      size={size}
      sx={{ color, aspectRatio: "1/1" }}
      {...props}
    />
  );
};
