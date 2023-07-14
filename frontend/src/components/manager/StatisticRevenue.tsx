import { Card } from "@chakra-ui/card";
import {
  Text,
  VStack,
  Box,
  HStack,
  List,
  Badge,
} from "@chakra-ui/layout";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/table";
import React, { useEffect, useState } from "react";
import { VictoryPie } from "Victory";
import ORDER_STATUS_MAP from "../../data/OrderStatusData";
import StatisticRevenueDTO from "../../type/StatisticRevenueDTO";
import statisticService from "../../services/statistic-service";
import moneyService from "../../services/money-service";
import OrderDTO from "../../type/OrderDTO";
const StatisticRevenue = ({ overview }: { overview?: boolean }) => {
  const [revenue, setRevenue] = useState({} as StatisticRevenueDTO);
  const [orders, setOrders] = useState<OrderDTO[] | null>(null);

  useEffect(() => {
    (async () => {
      setRevenue(await statisticService.getRevenue());
    })();
  }, []);
  useEffect(() => {
    (async () => {
      setOrders(await statisticService.getTodaySuccessfulOrders());
    })();
  }, []);

  return (
    <VStack>
      {
        <HStack w="100%">
          <Box flex="1">
            <Card w="100%" p="4">
              <Text fontSize="xl">Doanh thu tháng</Text>
              <Text fontSize="md" color="gray" fontStyle={"italic"}>
                {/* (trong tháng) */}
              </Text>
              <Text fontSize="2xl" color="teal" fontStyle={"bold"}>
                {moneyService.getVND(revenue.month?.revenue)}
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
                {moneyService.getVND(revenue.week?.revenue)}
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
                {moneyService.getVND(revenue.day?.revenue)}
              </Text>
            </Card>
          </Box>
        </HStack>
      }

      {!overview && (
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
                    <strong>
                      {moneyService.getVND(revenue.week?.days[0].revenue)}
                    </strong>
                  </HStack>
                </Card>
                <Card p="2" backgroundColor="teal.100">
                  <HStack justifyContent={"space-between"}>
                    <strong>Thứ 3:</strong>
                    <strong>
                      {moneyService.getVND(revenue.week?.days[1].revenue)}
                    </strong>
                  </HStack>
                </Card>
                <Card p="2" backgroundColor="teal.100">
                  <HStack justifyContent={"space-between"}>
                    <strong>Thứ 4:</strong>
                    <strong>
                      {moneyService.getVND(revenue.week?.days[2].revenue)}
                    </strong>
                  </HStack>
                </Card>
                <Card p="2" backgroundColor="teal.100">
                  <HStack justifyContent={"space-between"}>
                    <strong>Thứ 5:</strong>
                    <strong>
                      {moneyService.getVND(revenue.week?.days[3].revenue)}
                    </strong>
                  </HStack>
                </Card>
                <Card p="2" backgroundColor="teal.100">
                  <HStack justifyContent={"space-between"}>
                    <strong>Thứ 6:</strong>
                    <strong>
                      {moneyService.getVND(revenue.week?.days[4].revenue)}
                    </strong>
                  </HStack>
                </Card>
                <Card p="2" backgroundColor="teal.100">
                  <HStack justifyContent={"space-between"}>
                    <strong>Thứ 7:</strong>
                    <strong>
                      {moneyService.getVND(revenue.week?.days[5].revenue)}
                    </strong>
                  </HStack>
                </Card>
                <Card p="2" backgroundColor="teal.100">
                  <HStack justifyContent={"space-between"}>
                    <strong>Chủ nhật:</strong>
                    <strong>
                      {moneyService.getVND(revenue.week?.days[6].revenue)}
                    </strong>
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
                  {
                    x: revenue.week?.days[0].revenue ? "Thứ 2" : "",
                    y: revenue.week?.days[0].revenue,
                  },
                  {
                    x: revenue.week?.days[1].revenue ? "Thứ 3" : "",
                    y: revenue.week?.days[1].revenue,
                  },
                  {
                    x: revenue.week?.days[2].revenue ? "Thứ 4" : "",
                    y: revenue.week?.days[2].revenue,
                  },
                  {
                    x: revenue.week?.days[3].revenue ? "Thứ 5" : "",
                    y: revenue.week?.days[3].revenue,
                  },
                  {
                    x: revenue.week?.days[4].revenue ? "Thứ 6" : "",
                    y: revenue.week?.days[4].revenue,
                  },
                  {
                    x: revenue.week?.days[5].revenue ? "Thứ 7" : "",
                    y: revenue.week?.days[5].revenue,
                  },
                  {
                    x: revenue.week?.days[6].revenue ? "Chủ nhật" : "",
                    y: revenue.week?.days[6].revenue,
                  },
                ]}
                labels={({ datum }) => `${datum.x}`}
              />
            </Box>
          </HStack>
        </Card>
      )}

      {!overview && (
        <Card w="100%" p="4">
          <Text
            mb="2"
            textAlign={"center"}
            fontSize="xl"
            fontWeight="bold"
            color="teal"
          >
            Doanh thu hôm nay
          </Text>
          <TableContainer borderRadius="12" border="solid 1px gray">
            <Table variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th textAlign={"center"}>Cập nhật</Th>
                  <Th textAlign={"center"}>Mã đơn hàng</Th>
                  <Th textAlign={"center"}>Trạng thái</Th>
                  <Th textAlign={"center"}>Thu về</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders != null &&
                  orders.map((order) => (
                    <Tr key={order.id}>
                      <Td textAlign={"center"}>
                        <strong>
                          {new Date(order.updatedTime).toLocaleTimeString()}
                        </strong>
                      </Td>
                      <Td textAlign={"center"}>
                        <strong>{order.id}</strong>
                      </Td>
                      <Td textAlign={"center"}>
                        <Badge
                          colorScheme={
                            ORDER_STATUS_MAP["SUCCESSFUL"].colorScheme
                          }
                          border={
                            ORDER_STATUS_MAP["SUCCESSFUL"].colorScheme == "gray"
                              ? "1px solid gray"
                              : "none"
                          }
                          w="unset"
                        >
                          {ORDER_STATUS_MAP["SUCCESSFUL"].label}
                        </Badge>
                      </Td>
                      <Td
                        //   textAlign={"right"}
                        color={"green.500"}
                        textAlign={"center"}
                      >
                        <strong>
                          {"+ "}
                          {moneyService.getVND(
                            order.orderDetails.reduce(
                              (acc, item) => item.price * item.quantity + acc,
                              0
                            )
                          )}
                        </strong>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Card>
      )}
    </VStack>
  );
};

export default StatisticRevenue;
