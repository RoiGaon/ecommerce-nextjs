import { useApiProvider } from "@common";
import { ApiHooks } from "@common/types/api";
import { MutationHook } from "@common/types/hooks";

export const useHook = (fn: (hooks: ApiHooks) => MutationHook) => {
  const { hooks } = useApiProvider();

  return fn(hooks);
};
