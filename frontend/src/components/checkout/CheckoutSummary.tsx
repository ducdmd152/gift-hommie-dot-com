import { HStack, VStack, Text } from "@chakra-ui/layout";
import React, { useContext } from "react";
import CheckoutPaymentSelector from "./CheckoutPaymentSelector";
import { Button } from "@chakra-ui/button";
import { Card } from "@chakra-ui/card";
import CheckoutShippingMethod from "./CheckoutShippingMethod";
import { GLOBAL_CONTEXT } from "../../App";
import CheckoutDTO from "../../type/CheckoutDTO";
interface Props {
  checkoutData: CheckoutDTO;
  setCheckoutData: (data: CheckoutDTO) => void;
}
const CheckoutSummary = ({ checkoutData, setCheckoutData }: Props) => {
  const selectedCartContext = useContext(GLOBAL_CONTEXT).selectedCartContext;
  let items = selectedCartContext.getItems();
  let total = items.reduce((acc, item) => acc + item.total, 0);
  let shippingFee = checkoutData.shippingFee ? checkoutData.shippingFee : 0;
  let sum = total + shippingFee;
  return (
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
        >
          Đặt hàng
        </Button>
      </HStack>
    </Card>
  );
};

export default CheckoutSummary;
