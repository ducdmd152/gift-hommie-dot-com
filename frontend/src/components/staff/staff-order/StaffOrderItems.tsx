import {
  VStack,
} from "@chakra-ui/react";
import React from "react";
import StaffOrderItem from "./StaffOrderItem";
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
