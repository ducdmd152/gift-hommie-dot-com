import React, { useState } from "react";
import useFetchCart, { CartQuery } from "../../hooks/useFetchCart";
import { Badge, Card, HStack, Heading, VStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CustomerOrderDetailInfo = () => {
  //CODE FAKE DATA (TEMPORARY)
  const [cartQuery, setCartQuery] = useState({} as CartQuery);
  const { carts, pageable, setCarts } = useFetchCart(cartQuery);
  // GET DATA
  let items = carts;
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
          <Badge flex="1" p="2" fontSize={"lg"}>
            Chi tiết đơn hàng
            {" | ID >> 01"}
          </Badge>

          <Badge
            flex="1"
            p="2"
            fontSize={"lg"}
            textAlign={"right"}
            className="none-text-transform"
          >
            <HStack w="100%" justifyContent="flex-end">
              <Text>Trạng thái đơn hàng: </Text>
              <Badge
                colorScheme="yellow"
                fontSize={"lg"}
                className="none-text-transform"
              >
                {" "}
                PENDING | Chờ xác nhận
              </Badge>
            </HStack>
          </Badge>
        </HStack>

        {/* CUSTOMER INFO */}
        <Card p="4" w="100%">
          <Heading size="sm" mb="2" color="gray">
            Người nhận
          </Heading>
          <VStack w="100%" alignItems="flex-start">
            <Text fontWeight={"bold"}>TRẦN CƯƠNG QUYẾT </Text>
            <Text>
              {" "}
              Điện thoại: <strong>01214212412</strong>
            </Text>
            <Text>
              Địa chỉ: <strong>TX25, P.THẠNH XUÂN, Q12,THÀNH PHỐ HCM</strong>{" "}
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
                    Tổng thanh toán
                  </Text>
                  <Text
                    fontSize="lg"
                    textAlign="right"
                    flex="1"
                    fontWeight="bold"
                  >
                    {items.reduce((acc, item) => acc + item.total, 0) / 1000}
                    {".000đ"}
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
                    Freeship
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
                    {items.reduce((acc, item) => acc + item.total, 0) / 1000}
                    {".000đ"}
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
                    {items.reduce((acc, item) => acc + item.total, 0) / 1000}
                    {".000đ"}
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
                    fontSize="lg"
                    textAlign="right"
                    flex="3"
                    fontWeight="bold"
                  >
                    Thanh toán khi nhận hàng (COD)
                  </Text>
                </HStack>
                <HStack spacing="4" w="100%">
                  <Text fontSize="md" flex="2" textAlign="left">
                    Hình thức vận chuyển
                  </Text>
                  <Text
                    fontSize="lg"
                    textAlign="right"
                    flex="3"
                    fontWeight="bold"
                  >
                    Giao hàng tiêu chuẩn (nhanh)
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
