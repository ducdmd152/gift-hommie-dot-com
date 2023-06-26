import { Box, Card, HStack, List, Text, VStack } from "@chakra-ui/react";
import ApexCharts from "apexcharts";
import React, { useEffect, useState } from "react";
import { VictoryChart } from "Victory";
import ReactApexChart from "react-apexcharts";
import StatisticOrderDTO from "../../type/StatisticOrderDTO";
import statisticService from "../../services/statistic-service";

const StatisticOrder = ({ overview }: { overview?: boolean }) => {
  const [order, setOrder] = useState({} as StatisticOrderDTO);
  useEffect(() => {
    (async () => {
      setOrder(await statisticService.getOrder());
    })();
  }, []);

  return (
    <Box>
      <HStack
        justifyContent={"space-between"}
        w="100%"
        spacing="2"
        className="child-full-width"
      >
        <VStack>
          <Card width="100%" p="4">
            <Text fontSize="xl">Tổng đơn hàng trong tháng</Text>
            <Text fontSize="2xl" color="teal" fontStyle={"bold"}>
              {order.month?.total}
            </Text>
          </Card>
        </VStack>
        <VStack>
          <Card width="100%" p="4">
            <Text fontSize="xl">Tổng đơn hàng trong tuần</Text>
            <Text fontSize="2xl" color="teal" fontStyle={"bold"}>
              {order.week?.total}
            </Text>
          </Card>
        </VStack>
        <VStack>
          <Card width="100%" p="4">
            <Text fontSize="xl">Tổng đơn hàng trong ngày</Text>
            <Text fontSize="2xl" color="teal" fontStyle={"bold"}>
              {order.day?.total}
            </Text>
          </Card>
        </VStack>
      </HStack>
      {!overview && (
        <Card mt="4" w="100%" background="blue.100">
          <Card p="4" m="4" border="2px lightgrays solid">
            <Text fontSize="xl">Đơn hàng hôm nay</Text>
            <List mt="2" spacing={2}>
              <HStack justifyContent={"space-between"} color="blue.600">
                <Text fontSize="lg">Tổng:</Text>
                <Text fontSize="lg">{order.day?.total} đơn hàng</Text>
              </HStack>
              <HStack justifyContent={"space-between"} color="green.500">
                <Text fontSize="lg">Thành công:</Text>
                <Text fontSize="lg">{order.day?.successful} đơn hàng</Text>
              </HStack>

              <HStack justifyContent={"space-between"} color="#FF9800">
                <Text fontSize="lg">Đang xử lí:</Text>
                <Text fontSize="lg">
                  {order.day?.pending +
                    order.day?.confirmed +
                    order.day?.delivering}{" "}
                  đơn hàng
                </Text>
              </HStack>
              <HStack justifyContent={"space-between"} color="#fd5660">
                <Text fontSize="lg">Thất bại:</Text>
                <Text fontSize="lg">{order.day?.fail} đơn hàng</Text>
              </HStack>
              <HStack justifyContent={"space-between"} color="#546E7A">
                <Text fontSize="lg">Khác:</Text>
                <Text fontSize="lg">
                  {order.day?.cancelled + order.day?.refused} đơn hàng
                </Text>
              </HStack>
            </List>
          </Card>
        </Card>
      )}
      <Card w="100%" mt="4" background="blue.100">
        <HStack w="100%" p="2" alignItems={"stretch"}>
          <VStack w="100%" flex="4" spacing="2">
            <Card w="100%" p="4" border="2px lightgrays solid">
              <Text fontSize="xl">Đơn hàng trong tuần</Text>
              <List mt="2" spacing={2}>
                <HStack justifyContent={"space-between"} color="blue.600">
                  <Text fontSize="lg">Tổng:</Text>
                  <Text fontSize="lg">{order.week?.total} đơn hàng</Text>
                </HStack>
                <HStack justifyContent={"space-between"} color="green.500">
                  <Text fontSize="lg">Thành công:</Text>
                  <Text fontSize="lg">{order.week?.successful} đơn hàng</Text>
                </HStack>

                <HStack justifyContent={"space-between"} color="#FF9800">
                  <Text fontSize="lg">Đang xử lí:</Text>
                  <Text fontSize="lg">
                    {order.week?.pending +
                      order.week?.confirmed +
                      order.week?.delivering}{" "}
                    đơn hàng
                  </Text>
                </HStack>
                <HStack justifyContent={"space-between"} color="#fd5660">
                  <Text fontSize="lg">Thất bại:</Text>
                  <Text fontSize="lg">{order.week?.fail} đơn hàng</Text>
                </HStack>
                <HStack justifyContent={"space-between"} color="#546E7A">
                  <Text fontSize="lg">Khác:</Text>
                  <Text fontSize="lg">
                    {order.week?.cancelled + order.day?.refused} đơn hàng
                  </Text>
                </HStack>
              </List>
            </Card>
            <Card w="100%" p="4" border="2px lightgrays solid">
              <Text fontSize="xl">Đơn hàng trong tháng</Text>
              <List mt="2" spacing={2}>
                <HStack justifyContent={"space-between"} color="blue.600">
                  <Text fontSize="lg">Tổng:</Text>
                  <Text fontSize="lg">{order.month?.total} đơn hàng</Text>
                </HStack>
                <HStack justifyContent={"space-between"} color="green.500">
                  <Text fontSize="lg">Thành công:</Text>
                  <Text fontSize="lg">{order.month?.successful} đơn hàng</Text>
                </HStack>

                <HStack justifyContent={"space-between"} color="#FF9800">
                  <Text fontSize="lg">Đang xử lí:</Text>
                  <Text fontSize="lg">
                    {order.month?.pending +
                      order.month?.confirmed +
                      order.month?.delivering}{" "}
                    đơn hàng
                  </Text>
                </HStack>
                <HStack justifyContent={"space-between"} color="#fd5660">
                  <Text fontSize="lg">Thất bại:</Text>
                  <Text fontSize="lg">{order.month?.fail} đơn hàng</Text>
                </HStack>
                <HStack justifyContent={"space-between"} color="#546E7A">
                  <Text fontSize="lg">Khác:</Text>
                  <Text fontSize="lg">
                    {order.month?.cancelled + order.day?.refused} đơn hàng
                  </Text>
                </HStack>
              </List>
            </Card>
          </VStack>

          <Card flex="5" p="8">
            <TasksChart order={order} />
          </Card>
        </HStack>
      </Card>
    </Box>
  );
};

export default StatisticOrder;

const TasksChart = ({ order }: { order: StatisticOrderDTO }) => {
  const getDays = () => {
    const data = [
      "Chủ nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
    ] as string[];
    let today = new Date().getDay();
    const res = ["0", "1", "2", "3", "4", "5", "6", "7"] as string[];
    for (let i = 0; i < 7; i++) {
      res[7 - 1 - i] = data[(today - i + 7) % 7];
    }
    return res;
  };
  const options = {
    chart: {
      height: 350,
      zoom: {
        enabled: true,
      },
    },
    colors: ["#2E93fA", "#5cb85c", "#fd5660", "#FF9800", "#546E7A", "#FF9800"],
    labels: getDays(),
  };

  const series = [
    {
      name: "Tổng",
      data: order?.week?.day?.map((value) => value.total),
    },
    {
      name: "Thành công",
      data: order?.week?.day?.map((value) => value.successful),
    },
    {
      name: "Thất bại",
      data: order?.week?.day?.map((value) => value.fail),
    },

    {
      name: "Đang xử lí",
      data: order?.week?.day?.map(
        (value) => value.pending + value.confirmed + value.delivering
      ),
    },
    {
      name: "Khác",
      data: order?.week?.day?.map((value) => value.cancelled + value.refused),
    },
  ];

  return (
    <ReactApexChart
      type="line"
      options={options}
      series={series}
      height={"100%"}
    />
  );
};
