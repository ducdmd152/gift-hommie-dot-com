import { Box, HStack, VStack } from "@chakra-ui/layout";
import React, { useState } from "react";
import CheckoutDeliveryInfo from "../../components/checkout/CheckoutDeliveryInfo";
import CheckoutBillList from "../../components/checkout/CheckoutBillList";
import CheckoutPaymentSelector from "../../components/checkout/CheckoutPaymentSelector";
import { Button } from "@chakra-ui/button";
import CheckoutSummary from "../../components/checkout/CheckoutSummary";
import CheckoutDTO from "../../type/CheckoutDTO";

const CustomerCheckoutPage = () => {
  const [checkoutData, setCheckoutData] = useState({} as CheckoutDTO);
  return (
    <Box p="2" marginBottom="8">
      <VStack spacing="4" paddingX="4">
        <HStack w="100%" spacing={"6"}>
          <Box flex="7">
            <CheckoutDeliveryInfo
              checkoutData={checkoutData}
              setCheckoutData={setCheckoutData}
            />
          </Box>

          <Box flex="3" alignSelf={"flex-start"}>
            <CheckoutSummary
              checkoutData={checkoutData}
              setCheckoutData={setCheckoutData}
            />
          </Box>
        </HStack>

        <CheckoutBillList
          checkoutData={checkoutData}
          setCheckoutData={setCheckoutData}
        />
      </VStack>
    </Box>
  );
};

export default CustomerCheckoutPage;
