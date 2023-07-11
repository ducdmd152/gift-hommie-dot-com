import { Card } from "@chakra-ui/card";
import { Heading, VStack } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import React from "react";
import CheckoutDTO from "../../type/CheckoutDTO";
interface Props {
  checkoutData: CheckoutDTO;
  setCheckoutData: (data: CheckoutDTO) => void;
}
const CheckoutPaymentSelector = ({ checkoutData, setCheckoutData }: Props) => {
  const setValue = (value: number) => {
    const replace = { ...checkoutData, paymentMethod: value };
    setCheckoutData(replace);
    return replace;
  };
  return (
    <Card w="100%" p="4">
      <Heading fontSize="lg">Hình thức thanh toán</Heading>
      <RadioGroup
        onChange={(choice) => {
          let method = parseInt(choice);
          setValue(method);
        }}
        value={checkoutData.paymentMethod.toString()}
      >
        <VStack alignItems={"flex-start"} p="4">
          <Radio value="1">Thanh toán khi nhận hàng</Radio>
          <Radio value="2">Thanh toán qua Paypal</Radio>
        </VStack>
      </RadioGroup>
    </Card>
  );
};

export default CheckoutPaymentSelector;
