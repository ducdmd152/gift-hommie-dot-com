import { Card } from "@chakra-ui/card";
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { HStack, Heading, VStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Textarea } from "@chakra-ui/textarea";
import React from "react";

const CheckoutDeliveryInfo = () => {
  return (
    <Card w="100%" paddingX="4" paddingY="4" border="1px lightgray solid">
      <Heading size="lg" textAlign="center">
        Thông tin nhận hàng
      </Heading>
      <VStack w="100%">
        <Card w="100%" p="4">
          <HStack justifyContent={"space-between"} w="100%">
            <FormControl>
              <FormLabel fontWeight="bold">Tên người nhận (*)</FormLabel>
              <Input type="text" />
            </FormControl>

            <FormControl>
              <FormLabel fontWeight="bold">Số điện thoại (*)</FormLabel>
              <Input type="number" />
              {/* <FormHelperText>We'll never share your number.</FormHelperText> */}
            </FormControl>
          </HStack>
        </Card>

        <Card w="100%" p="4">
          <VStack width="100%" alignItems={"flex-start"} spacing="2">
            <FormLabel fontWeight="bold">Địa chỉ nhận hàng (*)</FormLabel>

            <HStack w="100%" justifyContent="space-between">
              <Select placeholder="Tỉnh/thành phố" size="md" />
              <Select placeholder="Quận/huyện" size="md" />
              <Select placeholder="Phường/xã" size="md" />
            </HStack>

            <Textarea
              className="placeholeder-italic"
              placeholder="Địa chỉ cụ thể..."
            />
          </VStack>
        </Card>
        <Card w="100%" p="4">
          <FormLabel fontWeight="bold">Lời chúc, nhắn gửi</FormLabel>
          <Textarea
            className="placeholeder-italic"
            placeholder="Gửi một lời chúc thân thương đến người thân yêu nào..."
          />
        </Card>
      </VStack>
    </Card>
  );
};

export default CheckoutDeliveryInfo;
