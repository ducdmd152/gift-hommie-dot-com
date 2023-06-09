import { Card } from "@chakra-ui/card";
import { Heading, VStack } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import React, { useState } from "react";

const CheckoutPaymentSelector = () => {
  const [value, setValue] = useState("COD");
  return (
    <Card w="100%" p="4">
      <Heading fontSize="lg">Hình thức thanh toán</Heading>
      <RadioGroup onChange={setValue} value={value}>
        <VStack alignItems={"flex-start"} p="4">
          <Radio value="COD">Thanh toán khi nhận hàng</Radio>
          <Radio value="MOMO" isDisabled={true}>
            Thanh toán qua Momo
          </Radio>
          <Radio value="VNPAY" isDisabled={true}>
            Thanh toán qua VNPay
          </Radio>
        </VStack>
      </RadioGroup>
    </Card>
  );
};

export default CheckoutPaymentSelector;
