import {
  Box,
  Card,
  HStack,
  VStack,
  Badge,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  List,
  ListItem,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import CheckoutBillList, {
  CheckoutBillItem,
} from "../checkout/CheckoutBillList";
import { GLOBAL_CONTEXT } from "../../App";
import CartDTO from "../../type/CartDTO";
import CustomerOrderItem from "./CustomerOrderItem";
import useFetchCart, { CartQuery } from "../../hooks/useFetchCart";

const CustomerOrderItems = () => {
  //CODE FAKE DATA (TEMPORARY)
  const [cartQuery, setCartQuery] = useState({} as CartQuery);
  const { carts, pageable, setCarts } = useFetchCart(cartQuery);
  // GET DATA
  let items = carts;
  return (
    <Box w="100%">
      <Card paddingX="8" paddingY="4" border="1px solid lightblue">
        <VStack>
          {/* ORDER INFO */}
          <HStack w="100%" justifyContent={"space-between"}>
            <Badge p="2" fontSize="md">
              Cập nhật: 17:59 06/06/2023
            </Badge>
            <Badge p="2" fontSize="md" colorScheme="yellow" bg="yellow.200">
              PENDING | Chờ xác nhận
            </Badge>
          </HStack>

          {/* ORDER MAIN */}
          <VStack spacing={"4"} w="100%">
            {items.map((item) => {
              return <CustomerOrderItem item={item} />;
            })}
          </VStack>

          {/* ORDER SUMMARY */}
          <HStack
            w="100%"
            justifyContent={"space-between"}
            alignItems="stretch"
          >
            <Badge flex="1" p="4" fontSize="md">
              Ngày tạo đơn: 06/06/2023
            </Badge>
            <Badge flex="1">
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
                  {items.reduce((acc, item) => acc + item.total, 0) / 1000}
                  {".000đ"}
                </Text>
              </HStack>
            </Badge>
          </HStack>
          {/* ORDER ACTIONS */}
        </VStack>
      </Card>
    </Box>
  );
};

export default CustomerOrderItems;
