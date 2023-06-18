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
import StaffOrderItem from "./StaffOrderItem";
import useFetchCart, { CartQuery } from "../../../hooks/useFetchCart";
import OrderDTO from "../../../type/OrderDTO";

const StaffOrderItems = ({ order }: { order: OrderDTO }) => {
  let items = order.orderDetails;
  return (
    <VStack spacing={"4"} w="100%">
      {items.map((item) => {
        return <StaffOrderItem item={item} />;
      })}
    </VStack>
  );
};

export default StaffOrderItems;
