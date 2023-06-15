import { Grid, GridItem, Heading } from "@chakra-ui/react";
import React from "react";
import CustomerOrderTabs from "../../components/customer-order/CustomerOrderTabs";
import CustomerOrderList from "../../components/customer-order/CustomerOrderList";

const CustomerOrderPage = () => {
  return (
    <>
      <Heading size="lg" textAlign="center" mb="4">
        Đơn hàng của bạn
      </Heading>
      <CustomerOrderList />
    </>
  );
};

export default CustomerOrderPage;
