import React from "react";
import CustomerOrderTabs from "./CustomerOrderTabs";
import CustomerOrderItems from "./CustomerOrderItems";
import { Box, HStack, VStack } from "@chakra-ui/react";

const CustomerOrderList = () => {
  return (
    <VStack w="100%" paddingX="8" spacing="4">
      <CustomerOrderTabs />
      <CustomerOrderItems />
    </VStack>
  );
};

export default CustomerOrderList;
