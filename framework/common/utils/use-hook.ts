import { ApiHooks } from "@common/types/hooks";
import { useApiProvider } from "@common";
import { MutationHook } from "@common/types/hooks";

export const useHook = (fn: (hooks: ApiHooks) => MutationHook) => {
  const { hooks } = useApiProvider();

  return fn(hooks);
};

export const useMutationHook = (hook: MutationHook) => {
  const { fetcher } = useApiProvider();

  return hook.useHook({
    fetch: (input: any) => {
      return hook.fetcher({
        input,
        fetch: fetcher,
        options: hook.fetcherOptions,
      });
    },
  });
};
