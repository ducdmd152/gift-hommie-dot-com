import {
  Box,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";

const CustomerOrderTabs = () => {
  return (
    <Box mt="4" w="100%">
      <Tabs isFitted variant="enclosed">
        <TabList>
          <Tab
            className="customer-order-tab"
            _selected={{ color: "white", bg: "teal.600" }}
          >
            Tất cả
          </Tab>
          <Tab
            className="customer-order-tab"
            _selected={{ color: "white", bg: "yellow.400" }}
          >
            Chờ xác nhận
          </Tab>
          <Tab
            className="customer-order-tab"
            _selected={{ color: "white", bg: "teal.300" }}
          >
            Đã xác nhận
          </Tab>
          <Tab
            className="customer-order-tab"
            _selected={{ color: "white", bg: "green.300" }}
          >
            Đang giao
          </Tab>
          <Tab
            className="customer-order-tab"
            _selected={{ color: "white", bg: "green.400" }}
          >
            Đã hoàn thành
          </Tab>
          <Tab
            className="customer-order-tab"
            _selected={{ color: "white", bg: "gray.400" }}
          >
            Đã hủy
          </Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />
      </Tabs>
    </Box>
  );
};

export default CustomerOrderTabs;
