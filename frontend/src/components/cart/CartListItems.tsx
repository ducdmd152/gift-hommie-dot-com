import React from "react";
import CartListItem from "./CartListItem";
import { VStack } from "@chakra-ui/react";

const CartListItems = () => {
  return (
    <VStack width="100%">
      <CartListItem />
      <CartListItem />
      <CartListItem />
      <CartListItem />
    </VStack>
  );
};

export default CartListItems;
