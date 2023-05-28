import React from "react";
import { ShopProductDTO } from "../../services/shop-product-service";
import { AiFillStar } from "react-icons/ai";
import {
  Badge,
  Box,
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BsFillCartPlusFill } from "react-icons/bs";
interface Props {
  product: ShopProductDTO;
}
const ShopProductListItem = ({ product }: Props) => {
  return (
    <Card className="cursor-pointer product-card">
      <Image height="160px" src={product.avatar} objectFit="cover" />
      <CardBody>
        <HStack justifyContent="space-between" marginBottom={3}>
          <Badge colorScheme="blue" fontSize="sm">
            {" "}
            {product.price / 1000}
            {".000đ"}
          </Badge>

          <HStack spacing="1px">
            <AiFillStar color="gold" />
            <AiFillStar color="gold" />
            <AiFillStar color="gold" />
            <AiFillStar color="gold" />
            <AiFillStar color="gold" />
          </HStack>
        </HStack>
        <HStack justifyContent="space-between" alignItems="top" spacing="2">
          <Heading fontSize="xl">{product.name}</Heading>
          <Box width="22px" className="product-cart-icon">
            <BsFillCartPlusFill size="22px" />
          </Box>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default ShopProductListItem;
