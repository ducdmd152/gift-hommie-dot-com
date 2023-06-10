import { HStack, VStack, Text } from "@chakra-ui/layout";
import React from "react";
import CheckoutPaymentSelector from "./CheckoutPaymentSelector";
import { Button } from "@chakra-ui/button";
import { Card } from "@chakra-ui/card";
import CheckoutShippingMethod from "./CheckoutShippingMethod";

const CheckoutSummary = () => {
  return (
    <Card p={2}>
      <CheckoutPaymentSelector />
      <CheckoutShippingMethod />
      <Card marginTop="2" p="4">
        {/* SUMMARY INFO */}
        <VStack alignItems={"flex-end"}>
          <HStack spacing="8">
            <Text fontSize="lg" width="140px">
              Tổng tiền hàng
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              200.000đ
            </Text>
          </HStack>
          <HStack spacing="8">
            <Text fontSize="lg" width="140px">
              Phí vận chuyển
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              Freeship
            </Text>
          </HStack>
          <HStack spacing="8">
            <Text fontSize="lg" width="140px">
              Tổng tiền hàng
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              200.000đ
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
