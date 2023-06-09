import { HStack, VStack } from "@chakra-ui/layout";
import React from "react";
import CheckoutDeliveryInfo from "../../components/checkout/CheckoutDeliveryInfo";
import CheckoutBillList from "../../components/checkout/CheckoutBillList";
import CheckoutPaymentSelector from "../../components/checkout/CheckoutPaymentSelector";

const CustomerCheckoutPage = () => {
  return (
    <VStack spacing="4" paddingX="4">
      <CheckoutDeliveryInfo />
      <CheckoutBillList />
      <CheckoutPaymentSelector />
    </VStack>
  );
};

export default CustomerCheckoutPage;
