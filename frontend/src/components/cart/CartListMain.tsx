import React from "react";
import CartListItems from "./CartListItems";
import { Box } from "@chakra-ui/react";

const CartListMain = () => {
  return (
    <Box p="4">
      <CartListItems />
    </Box>
  );
};

export default CartListMain;
