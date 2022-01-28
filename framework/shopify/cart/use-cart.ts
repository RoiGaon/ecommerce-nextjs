import useCart from "@common/cart/use-cart";

export default useCart;

export const handler = {
  fetcheOptions: {
    query: "",
  },
  fetcher() {
    return { data: "cart ready!!" };
  },
  useHook: ({ fetch }: any) => {
    const data = fetch();
    return {
      data,
    };
  },
};