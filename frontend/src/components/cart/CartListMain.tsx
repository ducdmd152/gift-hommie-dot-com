import React, { useState } from "react";
import CartListItems from "./CartListItems";
import { Box, HStack } from "@chakra-ui/react";
import Pagination from "../Pagination";
import useFetchCart, { CartQuery } from "../../hooks/useFetchCart";

const CartListMain = () => {
  const [cartQuery, setCartQuery] = useState({} as CartQuery);
  const { carts, pageable, setCarts } = useFetchCart(cartQuery);
  return (
    <Box p="4">
      <CartListItems carts={carts} pageable={pageable} setCarts={setCarts} />
      <HStack justifyContent={"center"} mt="5">
        <Pagination
          pageable={pageable}
          onSelectPageIndex={(index: number) => {
            setCartQuery({ ...cartQuery, page: index });
          }}
        />
      </HStack>
    </Box>
  );
};

export default CartListMain;
