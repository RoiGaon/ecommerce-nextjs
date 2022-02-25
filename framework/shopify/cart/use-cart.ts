import React from "react";
import useCart from "@common/cart/use-cart";
import {
  checkoutCreate,
  checkoutToCart,
  getCheckoutQuery,
} from "@framework/utils";
import { Cart } from "@common/types/cart";
import { SWRHook } from "@common/types/hooks";

export type UseCartHookDescriptor = {
  fetcherInput: {
    checkoutId: string;
  };
  fetcherOutput: any;
  data: Cart;
};

export default useCart;

export const handler: SWRHook<UseCartHookDescriptor> = {
  fetcherOptions: {
    query: getCheckoutQuery,
  },
  async fetcher({ fetch, options, input: { checkoutId } }) {
    let checkout;

    if (checkoutId) {
      const { data } = await fetch({ ...options, variables: { checkoutId } });
      checkout = data.node;
    } else {
      checkout = await checkoutCreate(fetch);
    }

    const cart = checkoutToCart(checkout);

    return cart;
  },
  useHook: ({ useData }) => {
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
