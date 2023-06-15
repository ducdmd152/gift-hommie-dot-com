import React, { useState } from "react";
import useFetchCart, { CartQuery } from "../../hooks/useFetchCart";
import { Badge, Card, HStack, Heading, VStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import OrderDTO from "../../type/OrderDTO";
import ORDER_STATUS_MAP, { OrderStatusItem } from "../../data/OrderStatusData";

const CustomerOrderDetailInfo = ({ order }: { order: OrderDTO }) => {
  //CODE FAKE DATA (TEMPORARY)
  // const [cartQuery, setCartQuery] = useState({} as CartQuery);
  // const { carts, pageable, setCarts } = useFetchCart(cartQuery);

  // GET DATA
  console.log(order);

  let items = order.orderDetails;
  const amount = items.reduce((acc, item) => acc + item.total, 0) / 1000;
  const total =
    (items.reduce((acc, item) => acc + item.total, 0) + order.shippingFee) /
    1000;
  const status = order?.status
    ? ORDER_STATUS_MAP[order.status]
    : ({} as OrderStatusItem);
  return (
    <Card>
      <VStack w="100%" alignItems={"flex-start"}>
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
        {/* HEADER INFO */}
        <HStack w="100%" justifyContent={"space-between"} spacing="0">
          <VStack flex="1" spacing="0">
            <Badge p="2" fontSize={"lg"} w="100%">
              Chi tiết đơn hàng
              {" | ID >> " + order.id}
            </Badge>
            <Badge
              w="100%"
              paddingX="2"
              fontSize={"md"}
              className="none-text-transform"
              fontStyle={"italic"}
              fontWeight={"medium"}
              color="gray"
            >
              Ngày tạo đơn: {order.orderTime}
            </Badge>
          </VStack>
          <VStack flex="1" spacing="0">
            <Badge
              w="100%"
              p="2"
              fontSize={"lg"}
              textAlign={"right"}
              className="none-text-transform"
            >
              <HStack w="100%" justifyContent="flex-end">
                <Text>Trạng thái đơn hàng: </Text>
                <Badge
                  colorScheme={status.colorScheme}
                  color="white"
                  bg={status.backgroundColor}
                  fontSize={"md"}
                  className="none-text-transform"
                >
                  {status.label + " | " + status.descCustomer}
                </Badge>
              </HStack>
            </Badge>
            <Badge
              w="100%"
              paddingX="2"
              fontSize={"md"}
              className="none-text-transform"
              fontStyle={"italic"}
              color="gray"
              textAlign={"right"}
              fontWeight={"medium"}
            >
              Ngày cập nhật: {order.lastUpdatedTime}
            </Badge>
          </VStack>
        </HStack>

        {/* CUSTOMER INFO */}
        <Card p="4" w="100%">
          <Heading size="sm" mb="2" color="gray">
            Người nhận
          </Heading>
          <VStack w="100%" alignItems="flex-start">
            <Text fontWeight={"bold"}>{order.name} </Text>
            <Text>
              {" "}
              Điện thoại: <strong>{order.phone}</strong>
            </Text>
            <Text>
              Địa chỉ: <strong>{order.address}</strong>{" "}
            </Text>
          </VStack>
        </Card>

        <Card p="4" w="100%">
          <HStack
            w="100%"
            justifyContent={"space-between"}
            alignItems={"stretch"}
          >
            <Card background="blue.100" flex="1" p="4">
              <VStack>
                <HStack spacing="4" w="100%">
                  <Text fontSize="md" flex="2" textAlign="left">
                    Tổng tiền hàng
                  </Text>
                  <Text
                    fontSize="lg"
                    textAlign="right"
                    flex="1"
                    fontWeight="bold"
                  >
                    {amount.toFixed(3) + "đ"}
                  </Text>
                </HStack>
                <HStack spacing="4" w="100%">
                  <Text fontSize="md" flex="2" textAlign="left">
                    Phí vận chuyển
                  </Text>
                  <Text
                    fontSize="lg"
                    textAlign="right"
                    flex="1"
                    fontWeight="bold"
                  >
                    {(order.shippingFee / 1000).toFixed(3) + "đ"}
                  </Text>
                </HStack>
                <HStack spacing="4" w="100%">
                  <Text fontSize="md" flex="2" textAlign="left">
                    Tổng thanh toán
                  </Text>
                  <Text
                    fontSize="lg"
                    textAlign="right"
                    flex="1"
                    fontWeight="bold"
                  >
                    {total.toFixed(3) + "đ"}
                  </Text>
                </HStack>
                <HStack spacing="4" w="100%">
                  <Text fontSize="md" flex="2" textAlign="left">
                    Thanh toán khi nhận hàng
                  </Text>
                  <Text
                    fontSize="lg"
                    textAlign="right"
                    flex="1"
                    fontWeight="bold"
                  >
                    {(order.paymentMethod == 2 ? 0 : total).toFixed(3) + "đ"}
                  </Text>
                </HStack>
              </VStack>
            </Card>
            {/* METHODS */}
            <Card background="gray.100" flex="1" p="4">
              {/* SUMMARY INFO */}
              <VStack>
                <HStack spacing="4" w="100%">
                  <Text fontSize="md" flex="2" textAlign="left">
                    Hình thức thanh toán
                  </Text>
                  <Text
                    fontSize="md"
                    textAlign="right"
                    flex="3"
                    fontWeight="bold"
                  >
                    {order.paymentMethod == 1
                      ? "Thanh toán khi nhận hàng (COD)"
                      : "Thanh toán qua Paypal (đã thanh toán)"}
                  </Text>
                </HStack>
                <HStack spacing="4" w="100%">
                  <Text fontSize="md" flex="2" textAlign="left">
                    Hình thức vận chuyển
                  </Text>
                  <Text
                    fontSize="md"
                    textAlign="right"
                    flex="3"
                    fontWeight="bold"
                  >
                    {order.shippingMethod == 2
                      ? "Giao hàng tiêu chuẩn (nhanh)"
                      : "Giao hàng tốc hành (express)"}
                  </Text>
                </HStack>
              </VStack>
            </Card>
            {/* SUMMARY INFO */}
          </HStack>
        </Card>
      </VStack>
    </Card>
  );
};

export default CustomerOrderDetailInfo;
