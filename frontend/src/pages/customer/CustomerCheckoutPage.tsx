import { Box, HStack, VStack } from "@chakra-ui/layout";
import React from "react";
import CheckoutDeliveryInfo from "../../components/checkout/CheckoutDeliveryInfo";
import CheckoutBillList from "../../components/checkout/CheckoutBillList";
import CheckoutPaymentSelector from "../../components/checkout/CheckoutPaymentSelector";
import { Button } from "@chakra-ui/button";

const CustomerCheckoutPage = () => {
  return (
    <Box p="2" marginBottom="8">
      <VStack spacing="4" paddingX="4">
        <CheckoutDeliveryInfo />
        <CheckoutBillList />
        <CheckoutPaymentSelector />
      </VStack>

      <HStack justifyContent={"center"}>
        <Button colorScheme="blue" size="lg" marginTop="4" paddingX="8">
          Đặt hàng
        </Button>
      </HStack>
    </Box>
  );
};

export default CustomerCheckoutPage;
