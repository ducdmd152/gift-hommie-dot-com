import { Box, Card, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import CartDTO from "../../type/CartDTO";
import { Link } from "react-router-dom";
import { GLOBAL_CONTEXT } from "../../App";
import OrderDetailDTO from "../../type/OrderDetailDTO";

const CustomerOrderItem = ({ item }: { item: OrderDetailDTO }) => {
  const productContext = useContext(GLOBAL_CONTEXT).productContext;

  return (
    <Card w="100%" p="4">
      <HStack
        spacing="4"
        key={item.id}
        w="100%"
        justifyContent={"space-between"}
      >
        <Box flex="1" opacity={item.product.status ? "100%" : "70%"}>
          <Link
            className={item.product.status ? "" : "disable-link"}
            to="/shop/detail"
            onClick={() => {
              productContext.setProductId(item.product.id);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <HStack spacing="2" className="product-card">
              <Image
                borderRadius={"8px"}
                boxSize="60px"
                objectFit="cover"
                src={item.product.avatar}
              />
              <Text fontSize="xl" fontWeight="bold">
                {item.product.name}
              </Text>
            </HStack>
          </Link>
        </Box>
        <HStack flex="1" justifyContent={"space-between"}>
          <VStack>
            <Text fontWeight="medium" fontSize="md" color="gray">
              Đơn giá
            </Text>
            <Text fontWeight="bold" fontSize="md">
              {item.product.price / 1000 + ".000đ"}
            </Text>
          </VStack>

          <VStack>
            <Text fontWeight="medium" fontSize="md" color="gray">
              Số lượng
            </Text>
            <Text fontWeight="bold" fontSize="md">
              {item.quantity}
            </Text>
          </VStack>
          <VStack>
            <Text fontWeight="medium" fontSize="md" color="gray">
              Thành tiền
            </Text>
            <Text fontWeight="bold" fontSize="md">
              {item.total / 1000 + ".000đ"}
            </Text>
          </VStack>
        </HStack>
      </HStack>
    </Card>
  );
};

export default CustomerOrderItem;
