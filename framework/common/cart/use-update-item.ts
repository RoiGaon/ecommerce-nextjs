import { MutationHook } from "@common/types/hooks";
import { useHook, useMutationHook } from "@common/utils/use-hook";

const useUpdateItem = () => {
  const hook = useHook((hooks) => hooks.cart.useUpdateItem);

  return useMutationHook({ ...hook })();
};

export default useUpdateItem;
