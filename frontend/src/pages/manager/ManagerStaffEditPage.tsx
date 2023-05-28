import React from "react";
import {
  Badge, Box, Button, Card, CardBody, FormControl, FormHelperText,
  FormLabel, HStack, Heading, Input, NumberInput, NumberInputField,
  Select, Textarea, VStack, Image, Flex,
} from "@chakra-ui/react";

const ManagerStaffEditPage = () => {
  return (
    <VStack mt={6} p="4">
      <Flex width="100%" gap="8">
        <VStack spacing="8" flex="1">
          <FormControl>
            <FormLabel size="md" fontWeight="bold">
              ID
            </FormLabel>
            <Input
              // value={product.id}
              isDisabled
              color="blue"
              fontWeight="bold"
            />
          </FormControl>

          <FormControl>
            <FormLabel size="md" fontWeight="bold">
              Tên sản phẩm
            </FormLabel>
            <Input
              isReadOnly
              color="gray"
              // value={product.name}
              fontWeight="bold"
            />
          </FormControl>

          <FormControl>
            <FormLabel size="md" fontWeight="bold">
              Giá
            </FormLabel>
            <NumberInput
              // value={product.price}
              isReadOnly
              color="gray"
              min={1000}
            >
              <NumberInputField />
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel size="md" fontWeight="bold">
              Số lượng
            </FormLabel>
            <NumberInput
              // value={product.quantity}
              isReadOnly
              color="gray"
              min={0}
            >
              {/* <NumberInputField defaultValue={product.quantity} /> */}
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel size="md" fontWeight="bold">
              Danh mục sản phẩm
            </FormLabel>
            <Select
              isDisabled
              color="gray"
              placeholder="Lựa chọn danh mục"
            // value={product.categoryId}
            >
              {/* <option value={product.categoryId}>
                    {getCategoryName(product.categoryId)}
                  </option> */}
            </Select>
          </FormControl>
        </VStack>
      </Flex>
    </VStack>
  )
};

export default ManagerStaffEditPage;
