import { Avatar, Badge, Card, HStack, Text } from "@chakra-ui/react";
import React from "react";
import utilService from "../../services/util-service";

const StatisticOverviewCustomer = () => {
  return (
    <Card width="100%" minWidth="400px" p="4">
      <Text fontSize="xl">Top khách hàng tiềm năng</Text>
      <Text fontSize="md" color="gray" fontStyle={"italic"}>
        (6 tháng gần nhất)
      </Text>
      <HStack w="100%" mt="4">
        <Card w="100%" p="2">
          <HStack justifyContent={"space-between"}>
            <HStack spacing="3" className="product-card">
              <Avatar
                // borderRadius={"8px"}
                boxSize="50px"
                objectFit="cover"
                src={utilService.getURLImageUploadPresent()}
              />
              <Text
                fontSize="md"
                fontWeight="bold"
                color="dark.200"
                letterSpacing="2px"
              >
                <Badge
                  fontSize="xs"
                  colorScheme="teal"
                  className="none-text-transform"
                >
                  {"@username"}
                </Badge>
                <br />
                {"Trần Cương Quyết"}
              </Text>
            </HStack>
            {/* <Text color="teal" fontSize="sm" fontWeight={"bold"}>
              10 đơn hàng thành công
            </Text> */}
          </HStack>
        </Card>
      </HStack>
    </Card>
  );
};

export default StatisticOverviewCustomer;
