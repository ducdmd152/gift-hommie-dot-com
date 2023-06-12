import React from "react";
import useFetchCart, { CartQuery } from "../../hooks/useFetchCart";
import CustomerOrderItems from "../../components/customer-order/CustomerOrderItems";
import { Badge, Box, Card, Heading } from "@chakra-ui/react";
import CustomerOrderDetailInfo from "../../components/customer-order/CustomerOrderDetailInfo";
import { Link } from "react-router-dom";
const CustomerOrderDetailPage = () => {
  return (
    <Box paddingX="8">
      <CustomerOrderDetailInfo />
      <Card p="4" w="100%" mt="4">
        <Heading size="md" textAlign={"center"} mb="4">
          Thông tin sản phẩm
        </Heading>
        <CustomerOrderItems />
      </Card>
    </Box>
  );
};

export default CustomerOrderDetailPage;
