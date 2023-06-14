import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { HStack, VStack, Text } from "@chakra-ui/layout";
import React, { useContext } from "react";
import CheckoutPaymentSelector from "./CheckoutPaymentSelector";
import { Button } from "@chakra-ui/button";
import { Card } from "@chakra-ui/card";
import CheckoutShippingMethod from "./CheckoutShippingMethod";
import { GLOBAL_CONTEXT } from "../../App";
import CheckoutDTO from "../../type/CheckoutDTO";
import { Box, useDisclosure } from "@chakra-ui/react";
import CheckoutPaymentModal from "./CheckoutPaymentModal";
interface Props {
  checkoutData: CheckoutDTO;
  setCheckoutData: (data: CheckoutDTO) => void;
}
const CheckoutSummary = ({ checkoutData, setCheckoutData }: Props) => {
  let items = checkoutData.carts;
  const { isOpen, onOpen, onClose } = useDisclosure();
  let total = items.reduce((acc, item) => acc + item.total, 0);
  let shippingFee = checkoutData.shippingFee ? checkoutData.shippingFee : 0;
  let sum = total + shippingFee;
  return (
    <Box>
      <Card p={2}>
        <CheckoutPaymentSelector
          checkoutData={checkoutData}
          setCheckoutData={setCheckoutData}
        />
        <CheckoutShippingMethod
          checkoutData={checkoutData}
          setCheckoutData={setCheckoutData}
        />
        <Card marginTop="2" p="4">
          {/* SUMMARY INFO */}
          <VStack>
            <HStack spacing="4" w="100%">
              <Text fontSize="md" flex="2" textAlign="left">
                Tổng tiền hàng
              </Text>
              <Text fontSize="lg" textAlign="right" flex="1" fontWeight="bold">
                {(total / 1000).toFixed(3) + "đ"}
              </Text>
            </HStack>
            <HStack spacing="4" w="100%">
              <Text fontSize="md" flex="2" textAlign="left">
                Phí vận chuyển
              </Text>
              <Text fontSize="lg" textAlign="right" flex="1" fontWeight="bold">
                {(shippingFee / 1000).toFixed(3) + "đ"}
              </Text>
            </HStack>
            <HStack spacing="4" w="100%">
              <Text fontSize="md" flex="2" textAlign="left">
                Thành tiền
              </Text>
              <Text fontSize="lg" textAlign="right" flex="1" fontWeight="bold">
                {(sum / 1000).toFixed(3) + "đ"}
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
            onClick={() => {
              onOpen();
            }}
          >
            Đặt hàng
          </Button>
        </HStack>
      </Card>
      <CheckoutPaymentModal
        checkoutData={checkoutData}
        setCheckoutData={setCheckoutData}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </Box>
  );
};

export default CheckoutSummary;
