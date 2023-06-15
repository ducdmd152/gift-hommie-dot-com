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
import OrderDetailDTO from "../../type/OrderDetailDTO";
interface Props {
  orderDetails: OrderDetailDTO[];
}
const CustomerOrderItems = ({ orderDetails }: Props) => {
  // //CODE FAKE DATA (TEMPORARY)
  // const [cartQuery, setCartQuery] = useState({} as CartQuery);
  // const { carts, pageable, setCarts } = useFetchCart(cartQuery);
  // GET DATA
  let items = orderDetails;
  return (
    <VStack spacing={"4"} w="100%">
      {items.map((item) => {
        return <CustomerOrderItem key={item.id} item={item} />;
      })}
    </VStack>
  );
};

export default CustomerOrderItems;
