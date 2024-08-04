import { AxiosError } from "axios";

export const throwError = ({
  error,
  message,
}: {
  error: unknown;
  message: string;
}): never => {
  if (error instanceof AxiosError) {
    throw new Error(error.response?.data.message);
  }
  if (error instanceof Error) {
    throw new Error(error.message);
  }

  throw new Error(message);
};
