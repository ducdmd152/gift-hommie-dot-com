import { Card, VStack, Text } from "@chakra-ui/react";
import React from "react";

const StatisticOverviewRevenue = () => {
  return (
    <VStack>
      <Card width="100%" minWidth="400px" p="4">
        <Text fontSize="xl">Tổng doanh thu</Text>
        <Text fontSize="md" color="gray" fontStyle={"italic"}>
          (trong tháng)
        </Text>
        <Text fontSize="2xl" color="teal" fontStyle={"bold"}>
          1.000.0000đ
        </Text>
      </Card>
    </VStack>
  );
};

export default StatisticOverviewRevenue;
