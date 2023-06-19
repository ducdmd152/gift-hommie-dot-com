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
  const { orders, pageable, error, setOrders } =
    useFetchStaffOrder(staffOrderQuery);

  const onStatus = (status: string) => {
    setStaffOrderQuery({ ...staffOrderQuery, status });
  };
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

      <StaffOrderTabs onStatus={onStatus} />
      <StaffOrderList
        orders={orders}
        setOrders={setOrders}
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
