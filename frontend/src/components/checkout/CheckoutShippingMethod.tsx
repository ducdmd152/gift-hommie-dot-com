import { Card } from "@chakra-ui/card";
import { Heading, VStack } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import React, { useState } from "react";

const CheckoutShippingMethod = () => {
  const [value, setValue] = useState(2);
  return (
    <Card w="100%" p="4">
      <Heading fontSize="lg">Hình thức vận chuyển</Heading>
      <RadioGroup
        onChange={(choice) => {
          let method = parseInt(choice);
          setValue(method);
        }}
        value={value.toString()}
      >
        <VStack alignItems={"flex-start"} p="4">
          <Radio value="2">Giao hàng tiêu chuẩn (nhanh)</Radio>
          <Radio value="1" isDisabled={true}>
            Giao hàng hỏa tốc (express)
          </Radio>
        </VStack>
      </RadioGroup>
    </Card>
  );
};

export default CheckoutShippingMethod;
