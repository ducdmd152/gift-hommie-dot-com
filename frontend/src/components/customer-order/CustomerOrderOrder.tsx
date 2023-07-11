import {
  Box,
  Card,
  HStack,
  VStack,
  Badge,
  Text,
} from "@chakra-ui/react";
import React from "react";


import CustomerOrderItems from "./CustomerOrderItems";
import OrderDTO from "../../type/OrderDTO";
import CustomerOrderActions from "./CustomerOrderActions";
import ORDER_STATUS_MAP from "../../data/OrderStatusData";

const CustomerOrderOrder = ({
  order,
  setOrder,
}: {
  order: OrderDTO;
  setOrder: (order: OrderDTO) => void;
}) => {
  //CODE FAKE DATA (TEMPORARY)
  // const [cartQuery, setCartQuery] = useState({} as CartQuery);
  // const { carts, pageable, setCarts } = useFetchCart(cartQuery);
  // GET DATA
  let items = order.orderDetails;
  let status = ORDER_STATUS_MAP[order.status];
  return (
    <Box w="100%">
      <Card
        paddingX="8"
        paddingY="4"
        border="1px solid lightblue"
        background={"gray.100"}
      >
        <VStack>
          {/* ORDER INFO */}
          <HStack w="100%" justifyContent={"space-between"}>
            <Text
              p="2"
              fontSize="md"
              fontWeight={"medium"}
              fontStyle={"italic"}
            >
              <strong>Cập nhật:</strong> {order.updatedTime}
            </Text>
            <Badge
              p="2"
              fontSize="md"
              colorScheme={status.colorScheme}
              bg={status.backgroundColor}
            >
              {status.label + " | " + status.descCustomer}
            </Badge>
          </HStack>

          {/* ORDER MAIN ~ ITEMS */}
          <CustomerOrderItems orderDetails={order.orderDetails} />
          {/* ORDER SUMMARY */}
          <HStack
            w="100%"
            justifyContent={"space-between"}
            alignItems="stretch"
          >
            <Text
              flex="1"
              p="4"
              fontSize="md"
              fontWeight={"medium"}
              fontStyle={"italic"}
            >
              <strong>Ngày tạo đơn:</strong> {order.createTime}
            </Text>
            <Badge flex="1" className="none-text-transform">
              <HStack justifyContent={"space-between"}>
                <VStack alignItems={"flex-start"}>
                  <Text fontSize="lg">Tổng đơn hàng</Text>
                  <Text fontSize="sm" fontStyle="italic" color="gray">
                    *Đã bao gồm phí ship (nếu có)
                  </Text>
                </VStack>
                <Text
                  fontSize="xl"
                  paddingX="8"
                  fontWeight="bold"
                  textAlign="center"
                >
                  {(
                    (items.reduce((acc, item) => acc + item.total, 0) +
                      order.shippingFee) /
                    1000
                  ).toFixed(3) + "đ"}
                </Text>
              </HStack>
            </Badge>
          </HStack>
          {/* separator */}
          <Box w="100%" borderBottom="1px solid lightgray"></Box>
          {/* ORDER ACTIONS */}
          <CustomerOrderActions order={order} setOrder={setOrder} />
        </VStack>
      </Card>
    </Box>
  );
};

export default CustomerOrderOrder;
