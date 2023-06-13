import {
  Badge,
  Box,
  HStack,
  Heading,
  Tab,
  TabList,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import StaffOrderList from "../../components/staff/staff-order/StaffOrderList";
import StaffOrderTabs from "../../components/staff/staff-order/StaffOrderTabs";
import Pagination from "../../components/Pagination";
import PageableDTO from "../../type/PageableDTO";

const StaffOrderPage = () => {
  return (
    <VStack
      className="child-full-width"
      paddingX="8"
      marginBottom="6"
      spacing="8"
    >
      <Heading textAlign="center" fontSize="xl">
        Quản lí đơn hàng
      </Heading>

      <StaffOrderTabs />
      <StaffOrderList />
      <HStack w="unset">
        <Pagination
          onSelectPageIndex={(id: number) => {}}
          pageable={{} as PageableDTO}
        />
      </HStack>
    </VStack>
  );
};

export default StaffOrderPage;
