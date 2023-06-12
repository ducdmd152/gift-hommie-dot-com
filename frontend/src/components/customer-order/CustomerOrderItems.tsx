import {
  Box,
  Card,
  HStack,
  VStack,
  Badge,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  List,
  ListItem,
  Button,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import CheckoutBillList, {
  CheckoutBillItem,
} from "../checkout/CheckoutBillList";
import { GLOBAL_CONTEXT } from "../../App";
import CartDTO from "../../type/CartDTO";
import CustomerOrderItem from "./CustomerOrderItem";
import useFetchCart, { CartQuery } from "../../hooks/useFetchCart";

const CustomerOrderItems = () => {
  //CODE FAKE DATA (TEMPORARY)
  const [cartQuery, setCartQuery] = useState({} as CartQuery);
  const { carts, pageable, setCarts } = useFetchCart(cartQuery);
  // GET DATA
  let items = carts;
  return (
    <VStack spacing={"4"} w="100%">
      {items.map((item) => {
        return <CustomerOrderItem item={item} />;
      })}
    </VStack>
  );
};

export default CustomerOrderItems;
