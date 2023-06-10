import { HStack, VStack, Text } from "@chakra-ui/layout";
import React, { useContext } from "react";
import CheckoutPaymentSelector from "./CheckoutPaymentSelector";
import { Button } from "@chakra-ui/button";
import { Card } from "@chakra-ui/card";
import CheckoutShippingMethod from "./CheckoutShippingMethod";
import { GLOBAL_CONTEXT } from "../../App";

const CheckoutSummary = () => {
  const selectedCartContext = useContext(GLOBAL_CONTEXT).selectedCartContext;
  let items = selectedCartContext.getItems();
  return (
    <Card p={2}>
      <CheckoutPaymentSelector />
      <CheckoutShippingMethod />
      <Card marginTop="2" p="4">
        {/* SUMMARY INFO */}
        <VStack>
          <HStack spacing="4" w="100%">
            <Text fontSize="md" flex="2" textAlign="left">
              Tổng thanh toán
            </Text>
            <Text fontSize="lg" textAlign="right" flex="1" fontWeight="bold">
              {items.reduce((acc, item) => acc + item.total, 0) / 1000}
              {".000đ"}
            </Text>
          </HStack>
          <HStack spacing="4" w="100%">
            <Text fontSize="md" flex="2" textAlign="left">
              Phí vận chuyển
            </Text>
            <Text fontSize="lg" textAlign="right" flex="1" fontWeight="bold">
              Freeship
            </Text>
          </HStack>
          <HStack spacing="4" w="100%">
            <Text fontSize="md" flex="2" textAlign="left">
              Tổng thanh toán
            </Text>
            <Text fontSize="lg" textAlign="right" flex="1" fontWeight="bold">
              {items.reduce((acc, item) => acc + item.total, 0) / 1000}
              {".000đ"}
            </Text>
          </HStack>
        </VStack>
      </Card>

      <HStack justifyContent={"center"}>
        <Button
          colorScheme="blue"
          size="lg"
          marginTop="4"
          paddingX="8"
          w="100%"
        >
          Đặt hàng
        </Button>
      </HStack>
    </Card>
  );
};

export default CheckoutSummary;
