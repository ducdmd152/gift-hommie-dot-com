import React from "react";
import { Badge, Card, HStack, Heading, VStack, Text } from "@chakra-ui/react";
import OrderDTO from "../../type/OrderDTO";
import ORDER_STATUS_MAP, { OrderStatusItem } from "../../data/OrderStatusData";

const CustomerOrderDetailInfo = ({ order }: { order: OrderDTO }) => {
  //CODE FAKE DATA (TEMPORARY)
  // const [cartQuery, setCartQuery] = useState({} as CartQuery);
  // const { carts, pageable, setCarts } = useFetchCart(cartQuery);

  // GET DATA
  // console.log(order);

  let items = order.orderDetails;
  const amount = items.reduce((acc, item) => acc + item.total, 0) / 1000;
  const total =
    (items.reduce((acc, item) => acc + item.total, 0) + order.shippingFee) /
    1000;
  let status = order?.status
    ? ORDER_STATUS_MAP[order.status]
    : ({} as OrderStatusItem);
  if (["PENDING", "CONFIRMED"].includes(order?.status))
    status = {
      label: "ORDERED",
      desc: "Đã đặt hàng",
      descStaff: "Đã đặt hàng",
      descCustomer: "Shop đang chuẩn bị hàng",
      colorScheme: "teal",
      backgroundColor: "teal.300",
    };
  return (
    <Card>
      <VStack w="100%" alignItems={"flex-start"}>
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
              Ngày tạo đơn: {order.createTime}
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
              Ngày cập nhật: {order.updatedTime}
            </Badge>
          </VStack>
        </HStack>
        {order.comment ? (
          <Badge
            style={{
              marginTop: 0,
            }}
            w="100%"
            padding="2"
            fontSize={"md"}
            className="none-text-transform"
            fontStyle={"italic"}
            color="orange"
            textAlign={"right"}
            fontWeight={"medium"}
          >
            Chú thích: {order.comment}
          </Badge>
        ) : (
          <></>
        )}

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
                <Text
                  mt="-4"
                  w="100%"
                  textAlign={"right"}
                  fontSize="sm"
                  color="blue.300"
                  fontStyle="italic"
                >
                  Dự kiến giao hàng:{" "}
                  {new Date(order.expectedDeliveryTime).toLocaleDateString(
                    "en-GB"
                  )}
                </Text>
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
