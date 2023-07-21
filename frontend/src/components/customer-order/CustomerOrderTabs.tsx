import { Box, Tab, TabIndicator, TabList, Tabs } from "@chakra-ui/react";
import React from "react";

interface Props {
  onStatus: (status: string) => void;
}
const CustomerOrderTabs = ({ onStatus }: Props) => {
  return (
    <Box mt="4" w="100%">
      <Tabs isFitted variant="enclosed">
        <TabList>
          <Tab
            className="customer-order-tab"
            _selected={{ color: "white", bg: "teal.600" }}
            onClick={() => onStatus("")}
          >
            Tất cả
          </Tab>
          {/* <Tab
            className="customer-order-tab"
            _selected={{ color: "white", bg: "yellow.400" }}
            onClick={() => onStatus("PENDING")}
          >
            Chờ xác nhận
          </Tab>
          <Tab
            className="customer-order-tab"
            _selected={{ color: "white", bg: "teal.300" }}
            onClick={() => onStatus("CONFIRMED")}
          >
            Đã xác nhận
          </Tab> */}
          <Tab
            className="customer-order-tab"
            _selected={{ color: "white", bg: "teal.300" }}
            onClick={() => onStatus("ORDERED")}
          >
            Đặt hàng thành công
          </Tab>
          <Tab
            className="customer-order-tab"
            _selected={{ color: "white", bg: "green.300" }}
            onClick={() => onStatus("DELIVERYING")}
          >
            Đang giao
          </Tab>
          <Tab
            className="customer-order-tab"
            _selected={{ color: "white", bg: "green.400" }}
            onClick={() => onStatus("SUCCESSFUL")}
          >
            Đã hoàn thành
          </Tab>
          <Tab
            className="customer-order-tab"
            _selected={{ color: "white", bg: "gray.400" }}
            onClick={() => onStatus("OTHERS")}
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
