import React from "react";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import s from "./CartItem.module.css";
import { Trash, Plus, Minus } from "@components/icons";
import { LineItem } from "@common/types/cart";
import { Swatch } from "@components/product";
import useRemoveItem from "@framework/cart/use-remove-item";
import useUpdateItem from "@framework/cart/use-update-item";

const CartItem = ({
  item,
  currencyCode,
}: {
  item: LineItem;
  currencyCode: string;
}) => {
  const removeItem = useRemoveItem();
  const updateItem = useUpdateItem();
  const [quantity, setQuantity] = React.useState(item.quantity);
  const price = item.variant.price! * item.quantity || 0;
  const { options } = item;

  const handleQuantity = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);

    if (Number.isInteger(val) && val >= 0) {
      setQuantity(val);
      await updateItem({
        id: item.id,
        variantId: item.variantId,
        quantity: val,
      });
    }
  };

  const incrementQuantity = async (n = 1) => {
    const val = Number(quantity) + n;
    if (Number.isInteger(val) && val >= 0) {
      setQuantity(val);
      await updateItem({
        id: item.id,
        variantId: item.variantId,
        quantity: val,
      });
    }
  };
  return (
    <li
      className={cn("flex flex-row space-x-8 py-8", {
        "opacity-75 pointer-events-none": false,
      })}
    >
      <div className="w-16 h-16 bg-violet relative overflow-hidden cursor-pointer">
        <Link href={`/product/${item.path}`}>
          <a>
            <Image
              onClick={() => {}}
              className={s.productImage}
              alt={item.name}
              width={150}
              height={150}
              src={item.variant.image!.url}
              unoptimized
            />
          </a>
        </Link>
      </div>
      <div className="flex-1 flex flex-col text-base">
        <Link href={`/`}>
          <a>
            <span
              className="font-bold text-lg cursor-pointer leading-6"
              onClick={() => {}}
            >
              {item.name}
            </span>
          </a>
        </Link>
        <div className="flex p-1">
          {options &&
            options.length > 0 &&
            options.map((option) => {
              const value = option.values[0];
              return (
                <Swatch
                  key={`${item.id}-${option.displayName}`}
                  size="sm"
                  label={value.label}
                  color={value.hexColor}
                  variant={option.displayName}
                  onClick={() => {}}
                />
              );
            })}
        </div>
        <div className="flex items-center mt-3">
          <button type="button">
            <Minus onClick={() => incrementQuantity(-1)} />
          </button>
          <label>
            <input
              type="number"
              max={99}
              min={0}
              className={s.quantity}
              value={quantity}
              onChange={handleQuantity}
            />
          </label>
          <button type="button">
            <Plus onClick={() => incrementQuantity(+1)} />
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-between space-y-2 text-base">
        <span>
          {price} {currencyCode}
        </span>
        <button
          onClick={async () => removeItem({ id: item.id })}
          className="flex justify-end outline-none"
        >
          <Trash />
        </button>
      </div>
    </li>
  );
};

export default CartItem;
