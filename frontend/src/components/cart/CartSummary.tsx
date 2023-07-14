import {
  Box,
  Card,
  HStack,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  VStack,
  Image,
  Badge,
  Button,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { GLOBAL_CONTEXT } from "../../App";
import CartDTO from "../../type/CartDTO";
import { Link } from "react-router-dom";

const CartSummary = () => {
  const selectedCartContext = useContext(GLOBAL_CONTEXT).selectedCartContext;
  let items = selectedCartContext.getItems();
  return (
    <Box p="4">
      <Card paddingY="4" paddingX="2">
        <Heading
          size="md"
          textAlign="center"
          mb="4"
          pb="4"
          borderBottom="1px solid lightgray"
        >
          Lựa chọn
        </Heading>
        {items.length == 0 ? (
          <Box>
            <Heading size="16px" fontStyle="italic" textAlign="center">
              Chưa có sản phẩm nào được chọn.
            </Heading>
          </Box>
        ) : (
          <Box>
            <Table size="sm" p="1">
              <Thead>
                <Tr>
                  <Th>Sản phẩm</Th>
                  <Th>Thành tiền</Th>
                </Tr>
              </Thead>
              <Tbody>
                {items.map((item) => {
                  return (
                    <Tr key={item.id}>
                      <Td textAlign="center">
                        <CartSummaryItem selectedItem={item} />
                      </Td>
                      <Td textAlign="center">{item.total / 1000 + ".000đ"}</Td>
                    </Tr>
                  );
                })}
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
                <Box fontWeight="bold">
                  {items.reduce((acc, item) => acc + item.total, 0) / 1000}
                  {".000đ"}
                </Box>
              </HStack>
            </HStack>
          </Box>
        )}
        <Link to="/checkout">
          <Box width="100%">
            <Button
              width="100%"
              colorScheme="blue"
              variant="solid"
              isDisabled={items.length == 0}
              mt="2"
            >
              Checkout
            </Button>
          </Box>
        </Link>
      </Card>
    </Box>
  );
};

const CartSummaryItem = ({ selectedItem }: { selectedItem: CartDTO }) => {
  return (
    <HStack>
      <HStack spacing="2">
        <Image
          borderRadius={"8px"}
          boxSize="50px"
          objectFit="cover"
          src={selectedItem.product.avatar}
        />
        <VStack alignItems={"flex-start"} spacing="2">
          <Text fontSize="md">{selectedItem.product.name}</Text>
          <HStack>
            <HStack spacing="2">
              <Text fontSize="sm" color="gray">
                Giá
              </Text>
              <Badge colorScheme="blue" className="none-text-transform">
                {selectedItem.product.price / 1000 + ".000đ"}
              </Badge>
            </HStack>
            <HStack spacing="2">
              <Text fontSize="sm" color="gray">
                Lượng
              </Text>
              <Badge colorScheme="blue">{`  - |  ${selectedItem.quantity} | +  `}</Badge>
            </HStack>
          </HStack>
        </VStack>
      </HStack>
    </HStack>
  );
};
export default CartSummary;
