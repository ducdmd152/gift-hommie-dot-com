import React, { useContext, useEffect, useState } from "react";
import CustomerOrderItems from "../../components/customer-order/CustomerOrderItems";
import { Badge, Box, Card, HStack, Heading } from "@chakra-ui/react";
import CustomerOrderDetailInfo from "../../components/customer-order/CustomerOrderDetailInfo";
import { Link, useNavigate } from "react-router-dom";
import OrderDTO from "../../type/OrderDTO";
import OrderDetailDTO from "../../type/OrderDetailDTO";
import customerOrderService from "../../services/customer-order-service";
import { GLOBAL_CONTEXT } from "../../App";
import CustomerOrderActions from "../../components/customer-order/CustomerOrderActions";
const CustomerOrderDetailPage = () => {
  const globalContext = useContext(GLOBAL_CONTEXT);
  const [order, setOrder] = useState<OrderDTO>({
    orderDetails: [] as OrderDetailDTO[],
  } as OrderDTO);
  const navigate = useNavigate();

  useEffect(() => {
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
      <HStack mb="2" bg="gray.100">
        <Badge
          p="2"
          color="gray"
          _hover={{
            cursor: "pointer",
            color: "rgb(54, 113, 214)",
          }}
          fontSize={"sm"}
          className="none-text-transform"
          borderRight="1px solid lightgray"
        >
          <Link to="/order">{"< < < Trở lại "}</Link>
        </Badge>

        <CustomerOrderActions order={order} setOrder={setOrder} />
      </HStack>
      <CustomerOrderDetailInfo order={order} />
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
