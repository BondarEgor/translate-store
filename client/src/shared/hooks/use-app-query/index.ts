import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useEffect, useEffectEvent } from "react";
import { toast } from "sonner";

export const useAppQuery = <
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends readonly unknown[] = readonly unknown[],
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
) => {
  const { staleTime = Infinity, ...restOptions } = options;
  const query = useQuery({
    ...restOptions,
    staleTime,
  });

  const showErrorToast = (error: unknown) =>
    toast.error(error instanceof Error ? error.message : "Something went wrong");

  const handleOnError = useEffectEvent(showErrorToast);

  useEffect(() => {
    if (query.isError) {
      handleOnError(query.error);
    }
  }, [query.isError]);

  return query;
};
