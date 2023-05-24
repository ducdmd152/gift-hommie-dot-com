import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Textarea,
  VStack,
  Image,
  Flex,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  currentProductId: number | null;
}
const StaffProductEditPage = ({ currentProductId }: Props) => {
  return (
    <>
      <Card m="12" p="8" border="1px lightgray solid">
        <HStack justifyContent="space-between">
          <VStack alignItems="start">
            <Badge variant="outline" display="inline-block">
              {"id >> 1"}
            </Badge>
            <Heading size="lg" colorScheme="gray">
              Product Name
            </Heading>
          </VStack>

          <HStack>
            <Button colorScheme="blue" size="md">
              Edit
            </Button>
            <Button colorScheme="red" size="md">
              Delete
            </Button>
          </HStack>
        </HStack>
        <VStack mt={6} p="4">
          <Flex width="100%" gap="8">
            <VStack spacing="8" flex="1">
              <FormControl>
                <FormLabel size="md" fontWeight="bold">
                  Product ID
                </FormLabel>
                <Input
                  value="P-001"
                  isDisabled
                  color="blue"
                  fontWeight="bold"
                />
              </FormControl>

              <FormControl>
                <FormLabel size="md" fontWeight="bold">
                  Tên sản phẩm
                </FormLabel>
                <Input value="P-001" fontWeight="bold" />
              </FormControl>

              <FormControl>
                <FormLabel size="md" fontWeight="bold">
                  Giá
                </FormLabel>
                <NumberInput min={1000}>
                  <NumberInputField />
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel size="md" fontWeight="bold">
                  Số lượng
                </FormLabel>
                <NumberInput min={0}>
                  <NumberInputField />
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel size="md" fontWeight="bold">
                  Danh mục sản phẩm
                </FormLabel>
                <Select placeholder="Lựa chọn danh mục">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </FormControl>
            </VStack>
            <VStack flex="1" h="100%" px="8" spacing="8">
              <Box>
                <Image
                  borderRadius="8px"
                  boxSize="100%"
                  objectFit="cover"
                  src="https://bit.ly/dan-abramov"
                  alt="Dan Abramov"
                />
              </Box>

              <FormControl>
                <FormLabel size="md" fontWeight="bold">
                  IMAGE URL
                </FormLabel>
                <Input value="P-001.png" fontWeight="bold" />
              </FormControl>
            </VStack>
          </Flex>
          <FormControl>
            <FormLabel size="md" fontWeight="bold" mt="4">
              Mô tả sản phẩm
            </FormLabel>
            <Textarea
              fontWeight="medium"
              fontStyle="italic"
              letterSpacing="1"
            />
          </FormControl>
        </VStack>
      </Card>
    </>
  );
};

export default StaffProductEditPage;
