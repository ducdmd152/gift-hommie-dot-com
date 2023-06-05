import {
  Box,
  Card,
  HStack,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Text,
  VStack,
  Image,
  Badge,
  Button,
} from "@chakra-ui/react";
import React from "react";

const CartSummary = () => {
  return (
    <Box p="4">
      <Card paddingY="4" paddingX="2">
        <Heading size="md" textAlign="center" mb="4">
          Lựa chọn
        </Heading>

        <Box>
          <Table size="sm" p="1">
            <Thead>
              <Tr>
                <Th>Sản phẩm</Th>
                <Th>Thành tiền</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td textAlign="center">
                  <CartSummaryItem />
                </Td>
                <Td textAlign="center">200.000đ</Td>
              </Tr>
              <Tr>
                <Td textAlign="center">
                  <CartSummaryItem />
                </Td>
                <Td textAlign="center">200.000đ</Td>
              </Tr>
              <Tr>
                <Td textAlign="center">
                  <CartSummaryItem />
                </Td>
                <Td textAlign="center">200.000đ</Td>
              </Tr>
            </Tbody>
          </Table>
          <HStack p="4">
            <Box
              textAlign="center"
              flex="1"
              //   border={"1px solid lightgray"}
            ></Box>
            <HStack
              flex="1"
              border={"1px solid lightgray"}
              justify="space-around"
            >
              <Box>Tổng: </Box>
              <Box fontWeight="bold">600.000đ </Box>
            </HStack>
          </HStack>
        </Box>

        <Button colorScheme="blue" variant="solid">
          Checkout
        </Button>
      </Card>
    </Box>
  );
};

const CartSummaryItem = () => {
  return (
    <HStack>
      <HStack spacing="2">
        <Image
          borderRadius={"8px"}
          boxSize="50px"
          objectFit="cover"
          src="https://bit.ly/dan-abramov"
        />
        <VStack alignItems={"flex-start"} spacing="2">
          <Text fontSize="md">Cốc sứ 2 màu</Text>
          <HStack>
            <HStack spacing="2">
              <Text fontSize="sm" color="gray">
                Giá
              </Text>
              <Badge colorScheme="blue">20.000đ</Badge>
            </HStack>
            <HStack spacing="2">
              <Text fontSize="sm" color="gray">
                Lượng
              </Text>
              <Badge colorScheme="blue">{"  - |  20 | +  "}</Badge>
            </HStack>
          </HStack>
        </VStack>
      </HStack>
    </HStack>
  );
};
export default CartSummary;
