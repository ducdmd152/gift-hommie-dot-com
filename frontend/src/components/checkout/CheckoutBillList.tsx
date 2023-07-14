import {
  Box,
  Card,
  HStack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Image,
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
  const items = checkoutData.carts;
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

export const CheckoutBillItem = ({
  selectedItem,
}: {
  selectedItem: CartDTO;
}) => {
  const productContext = useContext(GLOBAL_CONTEXT).productContext;
  return (
    <Link
      to="/shop/detail"
      onClick={() => {
        productContext.setProductId(selectedItem.product.id);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <HStack>
        <HStack spacing="2" className="product-card">
          <Image
            borderRadius={"8px"}
            boxSize="100px"
            objectFit="cover"
            src={selectedItem.product.avatar}
          />
          <Text fontSize="lg" fontWeight="bold">
            {selectedItem.product.name}
          </Text>
        </HStack>
      </HStack>
    </Link>
  );
};

export default CheckoutBillList;
