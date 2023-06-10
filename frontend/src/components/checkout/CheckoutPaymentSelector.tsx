import { Card } from "@chakra-ui/card";
import { Heading, VStack } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import React, { useState } from "react";
import CheckoutDTO from "../../type/CheckoutDTO";
interface Props {
  checkoutData: CheckoutDTO;
  setCheckoutData: (data: CheckoutDTO) => void;
}
const CheckoutPaymentSelector = ({ checkoutData, setCheckoutData }: Props) => {
  const [value, setValue] = useState(1);
  return (
    <Card w="100%" p="4">
      <Heading fontSize="lg">Hình thức thanh toán</Heading>
      <RadioGroup
        onChange={(choice) => {
          let method = parseInt(choice);
          setValue(method);
        }}
        value={value.toString()}
      >
        <VStack alignItems={"flex-start"} p="4">
          <Radio value="1">Thanh toán khi nhận hàng</Radio>
          <Radio value="2" isDisabled={true}>
            Thanh toán qua Momo
          </Radio>
          <Radio value="3" isDisabled={true}>
            Thanh toán qua VNPay
          </Radio>
        </VStack>
      </RadioGroup>
    </Card>
  );
};

export default CheckoutPaymentSelector;
