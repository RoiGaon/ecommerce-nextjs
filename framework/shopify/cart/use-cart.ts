/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import useCart, { UseCart } from "@common/cart/use-cart";
import {
  checkoutCreate,
  checkoutToCart,
  getCheckoutQuery,
} from "@framework/utils";
import { Cart } from "@common/types/cart";
import { SWRHook } from "@common/types/hooks";
import { Checkout } from "@framework/schema";
import { useApiProvider } from "@common";
import Cookies from "js-cookie";

export type UseCartHookDescriptor = {
  fetcherInput: {
    checkoutId: string;
  };
  fetcherOutput: {
    node: Checkout;
  };
  data: Cart;
};

export default useCart as UseCart<typeof handler>;

export const handler: SWRHook<UseCartHookDescriptor> = {
  fetcherOptions: {
    query: getCheckoutQuery,
  },
  async fetcher({ fetch, options, input: { checkoutId } }) {
    let checkout: Checkout;

    if (checkoutId) {
      const { data } = await fetch({ ...options, variables: { checkoutId } });
      checkout = data.node;
    } else {
      checkout = await checkoutCreate(fetch as any);
    }

    const cart = checkoutToCart(checkout);

    return cart;
  },
  useHook:
    ({ useData }) =>
    () => {
      const { checkoutCookie } = useApiProvider();
      const result = useData({
        swrOptions: {
          revalidateOnFocus: false,
        },
      });

      if (result.data?.completedAt) {
        Cookies.remove(checkoutCookie);
      }

      return React.useMemo(() => {
        return {
          ...result,
          isEmpty: (result?.data?.lineItems.length ?? 0) <= 0,
        };
      }, [result]);
    },
};
