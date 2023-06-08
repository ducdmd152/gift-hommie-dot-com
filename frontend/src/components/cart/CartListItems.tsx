import React, { useState } from "react";
import CartListItem from "./CartListItem";
import { VStack } from "@chakra-ui/react";
import useFetchCart, { CartQuery } from "../../hooks/useFetchCart";
import cartActionSerivce from "../../services/cart-action-service";

const CartListItems = () => {
  const { carts, pageable, setCarts } = useFetchCart({} as CartQuery);
  const onDelete = async (productId: number) => {
    const originalCarts = carts;
    setCarts(carts.filter((c) => c.productId !== productId));
    if ((await cartActionSerivce.removeOutCart(productId)) == false) {
      setCarts(originalCarts);
    }
  };

  return (
    <VStack width="100%">
      {carts.map((cart) => {
        return <CartListItem key={cart.id} cart={cart} onDelete={onDelete} />;
      })}
    </VStack>
  );
};

export default CartListItems;
