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
import React, { useState } from "react";
import StaffOrderList from "../../components/staff/staff-order/StaffOrderList";
import StaffOrderTabs from "../../components/staff/staff-order/StaffOrderTabs";
import Pagination from "../../components/Pagination";
import PageableDTO from "../../type/PageableDTO";
import useFetchStaffOrder, {
  StaffOrderQuery,
} from "../../hooks/useFetchStaffOrder";

const StaffOrderPage = () => {
  const [staffOrderQuery, setStaffOrderQuery] = useState({} as StaffOrderQuery);
  const { orders, pageable, error } = useFetchStaffOrder(staffOrderQuery);
  console.log(orders);

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
      <StaffOrderList
        orders={orders}
        staffOrderQuery={staffOrderQuery}
        setStaffOrderQuery={setStaffOrderQuery}
      />
      <HStack w="unset">
        <Pagination
          onSelectPageIndex={(index: number) => {
            setStaffOrderQuery({ ...staffOrderQuery, page: index });
          }}
          pageable={pageable}
        />
      </HStack>
    </VStack>
  );
};

export default StaffOrderPage;
