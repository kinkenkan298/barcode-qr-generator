// import { axiosInstance } from "@/lib/axios";
// import { QueryConfig } from "@/lib/query-client";
// import { queryOptions, useQuery } from "@tanstack/react-query";

// export const getTodos = async () => {
//   const resp = await axiosInstance.get('/todos')
//   return resp.data;
// };

// export const getTodosQueryKey = () => ["todos"];

// export const getTodosQueryOptions = () => {
//   return queryOptions({
//     queryKey: getTodosQueryKey(),
//     queryFn: getTodos,
//   });
// };

// type GetTodosQueryParams = {
//   queryConfig?: QueryConfig<typeof getTodosQueryOptions>;
// };

// export const useGetTodos = (params: GetTodosQueryParams = {}) => {
//   return useQuery({
//     ...getTodosQueryOptions(),
//     ...params.queryConfig,
//   });
// };
