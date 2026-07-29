import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useAppMutation = <
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>
) => {
  const { onError, ...mutationOptions } = options;

  return useMutation({
    ...mutationOptions,
    onError: (error, variables, onMutateResult, context) => {
      toast.error(
        error instanceof Error ? error.message : 'Something went wrong'
      );

      onError?.(error, variables, onMutateResult, context);
    },
  });
};