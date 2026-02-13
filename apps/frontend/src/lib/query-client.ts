import {
  MutationCache,
  QueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 menit
      gcTime: 10 * 60 * 1000, // 10 menit
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: (failureCount, error) => {
        if (
          error instanceof AxiosError &&
          error.status &&
          error.status >= 400 &&
          error.status < 500
        )
          return false;
        return failureCount < 3;
      },
    },
  },
  mutationCache: new MutationCache({
    onError: (error: unknown, _1, _2, mutation) => {
      if (mutation?.meta?.disableGlobalErrorHandling) return;
      if (typeof error === "string") {
        toast.error(error);
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error
      ) {
        toast.error((error as { message: string }).message);
      }
    },
  }),
});

export type ApiFnReturnType<FnType extends (...args: any) => Promise<any>> =
  Awaited<ReturnType<FnType>>;

export type QueryConfig<T extends (...args: any[]) => any> = Omit<
  ReturnType<T>,
  "queryKey" | "queryFn"
>;

export type MutationConfig<
  MutationFnType extends (...args: any) => Promise<any>,
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0]
>;
