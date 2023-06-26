import { Box, Card, HStack, List, Text, VStack } from "@chakra-ui/react";
import ApexCharts from "apexcharts";
import React from "react";
import { VictoryChart } from "Victory";
import ReactApexChart from "react-apexcharts";

const StatisticOrder = () => {
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
              100
            </Text>
          </Card>
        </VStack>
        <VStack>
          <Card width="100%" p="4">
            <Text fontSize="xl">Tổng đơn hàng trong tuần</Text>
            <Text fontSize="2xl" color="teal" fontStyle={"bold"}>
              100
            </Text>
          </Card>
        </VStack>
        <VStack>
          <Card width="100%" p="4">
            <Text fontSize="xl">Tổng đơn hàng trong ngày</Text>
            <Text fontSize="2xl" color="teal" fontStyle={"bold"}>
              100
            </Text>
          </Card>
        </VStack>
      </HStack>
      <Card mt="4" w="100%" background="blue.100">
        <Card p="4" m="4" border="2px lightgrays solid">
          <Text fontSize="xl">Đơn hàng hôm nay</Text>
          <List mt="2" spacing={2}>
            <HStack justifyContent={"space-between"} color="blue.600">
              <Text fontSize="lg">Tổng:</Text>
              <Text fontSize="lg">10 đơn hàng</Text>
            </HStack>
            <HStack justifyContent={"space-between"} color="green.500">
              <Text fontSize="lg">Thành công:</Text>
              <Text fontSize="lg">10 đơn hàng</Text>
            </HStack>

            <HStack justifyContent={"space-between"} color="#FF9800">
              <Text fontSize="lg">Đang xử lí:</Text>
              <Text fontSize="lg">10 đơn hàng</Text>
            </HStack>
            <HStack justifyContent={"space-between"} color="#fd5660">
              <Text fontSize="lg">Thất bại:</Text>
              <Text fontSize="lg">10 đơn hàng</Text>
            </HStack>
            <HStack justifyContent={"space-between"} color="#546E7A">
              <Text fontSize="lg">Khác:</Text>
              <Text fontSize="lg">10 đơn hàng</Text>
            </HStack>
          </List>
        </Card>
      </Card>
      <Card w="100%" mt="4" background="blue.100">
        <HStack w="100%" p="2" alignItems={"stretch"}>
          <VStack w="100%" flex="4" spacing="2">
            <Card w="100%" p="4" border="2px lightgrays solid">
              <Text fontSize="xl">Đơn hàng trong tuần</Text>
              <List mt="2" spacing={2}>
                <HStack justifyContent={"space-between"} color="blue.600">
                  <Text fontSize="lg">Tổng:</Text>
                  <Text fontSize="lg">10 đơn hàng</Text>
                </HStack>
                <HStack justifyContent={"space-between"} color="green.500">
                  <Text fontSize="lg">Thành công:</Text>
                  <Text fontSize="lg">10 đơn hàng</Text>
                </HStack>

                <HStack justifyContent={"space-between"} color="#FF9800">
                  <Text fontSize="lg">Đang xử lí:</Text>
                  <Text fontSize="lg">10 đơn hàng</Text>
                </HStack>
                <HStack justifyContent={"space-between"} color="#fd5660">
                  <Text fontSize="lg">Thất bại:</Text>
                  <Text fontSize="lg">10 đơn hàng</Text>
                </HStack>
                <HStack justifyContent={"space-between"} color="#546E7A">
                  <Text fontSize="lg">Khác:</Text>
                  <Text fontSize="lg">10 đơn hàng</Text>
                </HStack>
              </List>
            </Card>
            <Card w="100%" p="4" border="2px lightgrays solid">
              <Text fontSize="xl">Đơn hàng trong tháng</Text>
              <List mt="2" spacing={2}>
                <HStack justifyContent={"space-between"} color="blue.600">
                  <Text fontSize="lg">Tổng:</Text>
                  <Text fontSize="lg">10 đơn hàng</Text>
                </HStack>
                <HStack justifyContent={"space-between"} color="green.500">
                  <Text fontSize="lg">Thành công:</Text>
                  <Text fontSize="lg">10 đơn hàng</Text>
                </HStack>

                <HStack justifyContent={"space-between"} color="#FF9800">
                  <Text fontSize="lg">Đang xử lí:</Text>
                  <Text fontSize="lg">10 đơn hàng</Text>
                </HStack>
                <HStack justifyContent={"space-between"} color="#fd5660">
                  <Text fontSize="lg">Thất bại:</Text>
                  <Text fontSize="lg">10 đơn hàng</Text>
                </HStack>
                <HStack justifyContent={"space-between"} color="#546E7A">
                  <Text fontSize="lg">Khác:</Text>
                  <Text fontSize="lg">10 đơn hàng</Text>
                </HStack>
              </List>
            </Card>
          </VStack>

          <Card flex="5" p="8">
            <TasksChart />
          </Card>
        </HStack>
      </Card>
    </Box>
  );
};

export default StatisticOrder;

const TasksChart = ({}) => {
  const options = {
    chart: {
      height: 350,
      zoom: {
        enabled: true,
      },
    },
    colors: ["#2E93fA", "#5cb85c", "#fd5660", "#FF9800", "#546E7A", "#FF9800"],
  };

  const series = [
    {
      name: "Tổng",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
    {
      name: "Thành công",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "Thất bại",
      data: [41, 90, 28, 51, 42, 239, 112],
    },

    {
      name: "Đang xử lí",
      data: [41, 90, 28, 51, 42, 239, 112],
    },
    {
      name: "Khác",
      data: [41, 90, 28, 51, 42, 239, 112],
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
