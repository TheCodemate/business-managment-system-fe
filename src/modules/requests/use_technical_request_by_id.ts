import { axiosRequests } from "@/api/axios";
import { TechnicalRequestResponseType } from "@/types";
import { throwError } from "@/utils/throwError";
import { useQuery } from "@tanstack/react-query";

export const getTechnicalRequestsById = async (requestId: string) => {
  try {
    const { data } = await axiosRequests.get<TechnicalRequestResponseType>(
      `/request-by-id`,
      {
        params: { requestId: requestId },
        withCredentials: true,
      }
    );

    return data;
  } catch (error) {
    throwError({
      error,
      message: "Could not fetch technical request. Please try again later",
    });
  }
};

export const useTechnicalRequestById = (requestId: string) => {
  return useQuery({
    queryKey: ["technicalRequest", requestId],
    queryFn: () => getTechnicalRequestsById(requestId),
  });
};
