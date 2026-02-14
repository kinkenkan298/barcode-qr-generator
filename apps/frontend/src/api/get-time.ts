import { ApiError, axiosInstance } from "@/lib/axios";
import { QueryConfig } from "@/lib/query-client";
import { ApiResponse } from "@/types/api-response";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type payload = {
  type: string;
  datetime: string;
  iso: string;
};

export type GetTimeResponse = ApiResponse<{
  payload: payload;
  payloadString: string;
  expiresInSeconds: number;
}>;

const getTime = async () => {
  try {
    const resp = await axiosInstance.get<GetTimeResponse>("/qr/");
    return resp.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error?.response?.status as number | undefined;
      const retryAfter = error.response?.headers["retry-after"];
      const retryAfterSeconds = retryAfter ? Number(retryAfter) : undefined;
      const msg =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch QR";

      throw new ApiError(msg, status, retryAfterSeconds);
    }
    throw error;
  }
};

export const getTimeQueryKey = () => ["getTime"];

const getTimeQueryOptions = () => {
  return queryOptions({
    queryKey: getTimeQueryKey(),
    queryFn: getTime,
  });
};

type GetTimeParams = {
  queryConfig?: QueryConfig<typeof getTimeQueryOptions>;
};

export const useGetTime = (params: GetTimeParams = {}) => {
  return useQuery({
    ...getTimeQueryOptions(),
    ...params.queryConfig,
  });
};
