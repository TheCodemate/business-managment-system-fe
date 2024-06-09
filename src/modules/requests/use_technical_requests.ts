import { axiosRequests } from "@/api/axios";
import { TechnicalRequestResponseType } from "@/types";
import { throwError } from "@/utils/throwError";
import { useQuery } from "@tanstack/react-query";

const getTechnicalRequests = async () => {
  try {
    const { data } = await axiosRequests.get<TechnicalRequestResponseType[]>(
      `/`,
      { withCredentials: true }
    );

    console.log('getTechnicalRequests" ', data);

    return data;
  } catch (error) {
    throwError({
      error,
      message: "Could not fetch requests. Please try again later",
    });
  }
};

export const useTechnicalRequests = () => {
  return useQuery({
    queryKey: ["technicalRequests"],
    queryFn: getTechnicalRequests,
  });
};
