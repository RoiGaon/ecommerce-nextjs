import React from "react";
import useCart from "@common/cart/use-cart";
import { checkoutCreate, getCheckoutQuery } from "@framework/utils";

export default useCart;

export const handler = {
  fetchOptions: {
    query: getCheckoutQuery,
  },
  async fetcher({ fetch, options, input: { checkoutId } }: any) {
    let checkout;

    if (checkoutId) {
      const { data } = await fetch({ ...options, variables: { checkoutId } });
      checkout = data.node;
    } else {
      checkout = await checkoutCreate(fetch);
    }
    return checkout;
  },
  useHook: ({ useData }: any) => {
    const data = useData({
      swrOptions: {
        revalidateOnFocus: false,
      },
    });

    return React.useMemo(() => {
      return data;
    }, [data]);
  },
};
