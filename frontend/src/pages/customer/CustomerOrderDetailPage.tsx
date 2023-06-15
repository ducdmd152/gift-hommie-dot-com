import React, { useContext, useEffect, useState } from "react";
import useFetchCart, { CartQuery } from "../../hooks/useFetchCart";
import CustomerOrderItems from "../../components/customer-order/CustomerOrderItems";
import { Badge, Box, Card, Heading } from "@chakra-ui/react";
import CustomerOrderDetailInfo from "../../components/customer-order/CustomerOrderDetailInfo";
import { Link, useNavigate } from "react-router-dom";
import OrderDTO from "../../type/OrderDTO";
import OrderDetailDTO from "../../type/OrderDetailDTO";
import customerOrderService from "../../services/customer-order-service";
import { GLOBAL_CONTEXT } from "../../App";
const CustomerOrderDetailPage = () => {
  const globalContext = useContext(GLOBAL_CONTEXT);
  const [order, setOrder] = useState<OrderDTO>({
    orderDetails: [] as OrderDetailDTO[],
  } as OrderDTO);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("dsafsaf");
    customerOrderService
      .get(globalContext.orderContext.getOrderId())
      .then((res) => {
        setOrder(res.data as OrderDTO);
      })
      .catch((err) => {
        navigate("/order");
      });
  }, []);

  return (
    <Box paddingX="8">
      <CustomerOrderDetailInfo />
      <Card p="4" w="100%" mt="4">
        <Heading size="md" textAlign={"center"} mb="4">
          Thông tin sản phẩm
        </Heading>
        <CustomerOrderItems orderDetails={order.orderDetails} />
      </Card>
    </Box>
  );
};

export default CustomerOrderDetailPage;
