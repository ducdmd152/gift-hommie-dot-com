import { Card } from "@chakra-ui/card";
import { Text, VStack, Box, HStack, List, ListItem } from "@chakra-ui/layout";
import React from "react";
import { VictoryPie } from "Victory";
const StatisticRevenue = () => {
  return (
    <VStack>
      <HStack w="100%">
        <Box flex="1">
          <Card w="100%" p="4">
            <Text fontSize="xl">Doanh thu tháng</Text>
            <Text fontSize="md" color="gray" fontStyle={"italic"}>
              {/* (trong tháng) */}
            </Text>
            <Text fontSize="2xl" color="teal" fontStyle={"bold"}>
              1.000.0000đ
            </Text>
          </Card>
        </Box>
        <Box flex="1">
          <Card w="100%" p="4">
            <Text fontSize="xl">Doanh thu tuần</Text>
            <Text fontSize="md" color="gray" fontStyle={"italic"}>
              {/* (trong tuần) */}
            </Text>
            <Text fontSize="2xl" color="teal" fontStyle={"bold"}>
              1.000.0000đ
            </Text>
          </Card>
        </Box>
        <Box flex="1">
          <Card w="100%" p="4">
            <Text fontSize="xl">Doanh thu ngày</Text>
            <Text fontSize="md" color="gray" fontStyle={"italic"}>
              {/* (trong ngày) */}
            </Text>
            <Text fontSize="2xl" color="teal" fontStyle={"bold"}>
              1.000.0000đ
            </Text>
          </Card>
        </Box>
      </HStack>

      <Card w="100%" p="4">
        <Text fontSize="2xl" color="teal" fontStyle={"bold"}>
          Doanh thu trong tuần
        </Text>
        <HStack w="100%" spacing="2" alignItems={"stretch"}>
          <Card flex="1" p="4" m="4" border="2px teal solid">
            <Text fontSize="xl" color="teal">
              Bảng doanh thu
            </Text>
            <List mt="2" spacing={2}>
              <Card p="2" backgroundColor="teal.100">
                <HStack justifyContent={"space-between"}>
                  <strong>Thứ 2:</strong>
                  <strong>100.000đ / 2 đơn</strong>
                </HStack>
              </Card>
              <Card p="2" backgroundColor="teal.100">
                <HStack justifyContent={"space-between"}>
                  <strong>Thứ 3:</strong>
                  <strong>100.000đ / 2 đơn</strong>
                </HStack>
              </Card>
              <Card p="2" backgroundColor="teal.100">
                <HStack justifyContent={"space-between"}>
                  <strong>Thứ 4:</strong>
                  <strong>100.000đ / 2 đơn</strong>
                </HStack>
              </Card>
              <Card p="2" backgroundColor="teal.100">
                <HStack justifyContent={"space-between"}>
                  <strong>Thứ 5:</strong>
                  <strong>100.000đ / 2 đơn</strong>
                </HStack>
              </Card>
              <Card p="2" backgroundColor="teal.100">
                <HStack justifyContent={"space-between"}>
                  <strong>Thứ 6:</strong>
                  <strong>100.000đ / 2 đơn</strong>
                </HStack>
              </Card>
              <Card p="2" backgroundColor="teal.100">
                <HStack justifyContent={"space-between"}>
                  <strong>Thứ 7:</strong>
                  <strong>100.000đ / 2 đơn</strong>
                </HStack>
              </Card>
              <Card p="2" backgroundColor="teal.100">
                <HStack justifyContent={"space-between"}>
                  <strong>Chủ nhật:</strong>
                  <strong>100.000đ / 2 đơn</strong>
                </HStack>
              </Card>
            </List>
          </Card>
          <Box paddingX="8" paddingY="2">
            <VictoryPie
              height={300}
              colorScale={[
                "rgb(26, 49, 119)",
                "rgb(18, 147, 154)",
                "rgb(121, 199, 227)",
                "rgb(239, 93, 40)",
                "rgb(255, 152, 51)",
                "cyan",
                "gold",
                "",
              ]}
              data={[
                { x: "Thứ 2", y: 15 },
                { x: "Thứ 3", y: 10 },
                { x: "Thứ 4", y: 25 },
                { x: "Thứ 5", y: 15 },
                { x: "Thứ 6", y: 20 },
                { x: "Thứ 7", y: 15 },
                { x: "Chủ nhật", y: 20 },
              ]}
              labels={({ datum }) => `${datum.x}`}
            />
          </Box>
        </HStack>
      </Card>

      <Card></Card>
    </VStack>
  );
};

export default StatisticRevenue;
