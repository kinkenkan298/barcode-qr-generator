import { axiosInstance } from "@/lib/axios";
import { QueryConfig } from "@/lib/query-client";
import { ApiResponse } from "@/types/api-response";
import { queryOptions, useQuery } from "@tanstack/react-query";

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
  const resp = await axiosInstance.get<GetTimeResponse>("/qr/");
  return resp.data;
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
