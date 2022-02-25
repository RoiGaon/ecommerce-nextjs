import { ApiFetcher } from "@common/types/api";
import { ApiHooks } from "@common/types/hooks";
import { useApiProvider } from "@common";
import { MutationHook, Hook } from "@common/types/hooks";
import useSWR from "swr";

export const useHook = (fn: (hooks: ApiHooks) => Hook) => {
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

const useData = (hook: any, fetcher: ApiFetcher, ctx: any) => {
  const hookFetcher = async (query: string) => {
    try {
      return await hook.fetcher({
        fetch: fetcher,
        options: { query },
        input: {},
      });
    } catch (error) {
      throw error;
    }
  };

  const response = useSWR(
    hook.fetcherOptions.query,
    hookFetcher,
    ctx.swrOptions
  );

  return response;
};

export const useSWRHook = (hook: any) => {
  const { fetcher } = useApiProvider();

  return hook.useHook({
    useData(ctx: any) {
      const data = useData(hook, fetcher, ctx);
      return data;
    },
  });
};
