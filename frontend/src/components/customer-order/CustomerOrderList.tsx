import React from "react";
import CustomerOrderTabs from "./CustomerOrderTabs";
import CustomerOrderItems from "./CustomerOrderItems";
import { Box, HStack, VStack } from "@chakra-ui/react";
import CustomerOrderOrder from "./CustomerOrderOrder";
import useFetchCustomerOrder, {
  CustomerOrderQuery,
} from "../../hooks/useFetchCustomerOrder";

const CustomerOrderList = () => {
  const { orders, pageable, error } = useFetchCustomerOrder(
    {} as CustomerOrderQuery
  );
  return (
    <VStack w="100%" spacing="4" paddingX="4">
      <CustomerOrderTabs />
      <VStack w="100%" paddingX="8" spacing="4">
        {orders.map((order) => (
          <CustomerOrderOrder order={order} />
        ))}
      </VStack>
    </VStack>
  );
};

export default CustomerOrderList;
