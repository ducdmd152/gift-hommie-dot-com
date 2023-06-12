import React from "react";
import useFetchCart, { CartQuery } from "../../hooks/useFetchCart";
import CustomerOrderItems from "../../components/customer-order/CustomerOrderItems";
import { Box } from "@chakra-ui/react";
const CustomerOrderDetailPage = () => {
  return (
    <Box>
      <CustomerOrderItems />
    </Box>
  );
};

export default CustomerOrderDetailPage;
