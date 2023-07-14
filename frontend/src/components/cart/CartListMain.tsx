import React, { useState } from "react";
import CartListItems from "./CartListItems";
import { Box, Card, HStack, Spinner, Text } from "@chakra-ui/react";
import Pagination from "../Pagination";
import useFetchCart, { CartQuery } from "../../hooks/useFetchCart";

const CartListMain = () => {
  const [cartQuery, setCartQuery] = useState({} as CartQuery);
  const { carts, pageable, setCarts, isLoading } = useFetchCart(cartQuery);
  return (
    <Box p="4">
      <CartListItems carts={carts} pageable={pageable} setCarts={setCarts} />
      {!isLoading && carts.length > 0 && (
        <HStack justifyContent={"center"} mt="5">
          <Pagination
            pageable={pageable}
            onSelectPageIndex={(index: number) => {
              setCartQuery({ ...cartQuery, page: index });
            }}
          />
        </HStack>
      )}
      {isLoading && (
        <HStack justifyContent={"center"} mt="5">
          <Spinner />
        </HStack>
      )}{" "}
      {!isLoading && carts.length == 0 && (
        <Card width={"100%"} p="4">
          <Text size="lg" textAlign="center">
            {"Chưa có sản phẩm nào trong giỏ hàng."}
          </Text>
        </Card>
      )}
    </Box>
  );
};

export default CartListMain;
