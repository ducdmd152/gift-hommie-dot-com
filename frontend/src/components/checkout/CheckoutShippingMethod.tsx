import { Card } from "@chakra-ui/card";
import { Heading, VStack, Text } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import React, { useState } from "react";
import CheckoutDTO from "../../type/CheckoutDTO";
import shippingService from "../../services/shipping-service";
interface Props {
  checkoutData: CheckoutDTO;
  setCheckoutData: (data: CheckoutDTO) => void;
}
const CheckoutShippingMethod = ({ checkoutData, setCheckoutData }: Props) => {
  const setValue = (value: number) => {
    const replace = { ...checkoutData, shippingMethod: value };
    setCheckoutData(replace);
    return replace;
  };
  return (
    <Card w="100%" p="4">
      <Heading fontSize="lg">Hình thức vận chuyển</Heading>

      <RadioGroup
        onChange={(choice) => {
          let method = parseInt(choice);
          shippingService.getPreviewOrder(setValue(method), setCheckoutData);
        }}
        value={checkoutData.shippingMethod.toString()}
      >
        <VStack alignItems={"flex-start"} p="4">
          <Radio value="2">Giao hàng tiêu chuẩn (nhanh)</Radio>
          <Radio value="1" isDisabled={true}>
            Giao hàng tốc hành (express)
          </Radio>
        </VStack>
      </RadioGroup>
      {checkoutData.expectedDeliveryTime && (
        <Text fontSize="sm" color="gray" fontStyle="italic">
          Dự kiến giao hàng:{" "}
          {new Date(checkoutData.expectedDeliveryTime).toLocaleDateString(
            "en-GB"
          )}
        </Text>
      )}
    </Card>
  );
};

export default CheckoutShippingMethod;
