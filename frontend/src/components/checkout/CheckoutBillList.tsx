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
import React, { useContext } from "react";
import { GLOBAL_CONTEXT } from "../../App";
import CartDTO from "../../type/CartDTO";
import { Link } from "react-router-dom";
import CheckoutDTO from "../../type/CheckoutDTO";

interface Props {
  checkoutData: CheckoutDTO;
  setCheckoutData: (data: CheckoutDTO) => void;
}
const CheckoutBillList = ({ checkoutData, setCheckoutData }: Props) => {
  const selectedCartContext = useContext(GLOBAL_CONTEXT).selectedCartContext;
  let items = selectedCartContext.getItems();
  return (
    <Card width="100%" p="4">
      <Box width="100%">
        <Table size="sm" p="1">
          <Thead>
            <Tr>
              <Th fontSize="md">Sản phẩm</Th>
              <Th fontSize="md">Đơn giá</Th>
              <Th fontSize="md">Số lượng</Th>
              <Th fontSize="md">Thành tiền</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item) => {
              return (
                <Tr key={item.id}>
                  <Td fontSize="md">
                    <CheckoutBillItem selectedItem={item} />
                  </Td>
                  <Td fontSize="md">{item.product.price / 1000 + ".000đ"}</Td>
                  <Td fontSize="md">{item.quantity}</Td>
                  <Td fontSize="md">{item.total / 1000 + ".000đ"}</Td>
                </Tr>
              );
            })}
            <Tr>
              <Td></Td>
              <Td></Td>
              <Td fontSize="xl" fontWeight="bold">
                Tổng
              </Td>
              <Td fontSize="xl" fontWeight="bold">
                {items.reduce((acc, item) => acc + item.total, 0) / 1000}
                {".000đ"}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Card>
  );
};

const CheckoutBillItem = ({ selectedItem }: { selectedItem: CartDTO }) => {
  return (
    <HStack>
      <HStack spacing="2">
        <Image
          borderRadius={"8px"}
          boxSize="100px"
          objectFit="cover"
          src={selectedItem.product.avatar}
        />
        <Text fontSize="xl" fontWeight="medium">
          Cốc sứ 2 màu
        </Text>
      </HStack>
    </HStack>
  );
};

export default CheckoutBillList;
