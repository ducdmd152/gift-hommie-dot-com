import React, { useState } from "react";
import {
  Badge,
  Card,
  HStack,
  Heading,
  VStack,
  Text,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useFetchCart, { CartQuery } from "../../../hooks/useFetchCart";
import Selector from "../../Selector";

const StaffOrderDetailInfo = () => {
  //CODE FAKE DATA (TEMPORARY)
  const [cartQuery, setCartQuery] = useState({} as CartQuery);
  const { carts, pageable, setCarts } = useFetchCart(cartQuery);
  // GET DATA
  let items = carts;
  return (
    <Card>
      <VStack w="100%" alignItems={"flex-start"} className="child-full-width">
        {/* HEADER INFO */}
        <HStack justifyContent={"flex-end"}>
          <Button colorScheme="blue">Xác nhận</Button>
          <Button colorScheme="red" variant={"outline"}>
            Từ chối
          </Button>
          {/* <Button colorScheme="red">Hủy</Button> */}
        </HStack>
        <HStack w="100%" justifyContent={"space-between"} spacing="0">
          <VStack flex="1" spacing="0">
            <Badge p="2" fontSize={"lg"} w="100%">
              Chi tiết đơn hàng
              {" | ID >> 01"}
            </Badge>
            <Badge
              w="100%"
              paddingX="2"
              fontSize={"md"}
              className="none-text-transform"
              fontStyle={"italic"}
              color="gray"
            >
              Ngày tạo đơn: 06/06/2023
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
                  colorScheme="yellow"
                  fontSize={"lg"}
                  className="none-text-transform"
                >
                  {" "}
                  PENDING | Chờ xác nhận
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
            >
              Ngày cập nhật: 17:59 06/06/2023
            </Badge>
          </VStack>
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

export default StaffOrderDetailInfo;
