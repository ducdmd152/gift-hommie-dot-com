import { Card, VStack, Text } from "@chakra-ui/react";
import React from "react";

const StatisticOverviewOrder = () => {
  return (
    <VStack>
      <Card width="100%" minWidth="400px" p="4">
        <Text fontSize="xl">Số đơn hàng</Text>
        <Text fontSize="md" color="gray" fontStyle={"italic"}>
          (trong tháng)
        </Text>
        <Text fontSize="2xl" color="teal">
          100
        </Text>
      </Card>
    </VStack>
  );
};

export default StatisticOverviewOrder;
