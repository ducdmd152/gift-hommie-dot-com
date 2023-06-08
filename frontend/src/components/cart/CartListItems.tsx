import React, { useState } from "react";
import CartListItem from "./CartListItem";
import { VStack } from "@chakra-ui/react";
import useFetchCart, { CartQuery } from "../../hooks/useFetchCart";

const CartListItems = () => {
  const { carts, pageable } = useFetchCart({} as CartQuery);
  return (
    <VStack width="100%">
      {carts.map((cart) => {
        return <CartListItem key={cart.id} cart={cart} />;
      })}
    </VStack>
  );
};

export default CartListItems;
