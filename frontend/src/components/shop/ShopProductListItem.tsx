import React, { useContext } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import utilService from "../../services/util-service";
import { GLOBAL_CONTEXT } from "../../App";
interface Props {
  product: ShopProductDTO;
}
const ShopProductListItem = ({ product }: Props) => {
  const productContext = useContext(GLOBAL_CONTEXT).productContext;

  const navigate = useNavigate();
  return (
    <Link
      to="/shop/detail"
      onClick={() => {
        productContext.setProductId(product.id);
      }}
    >
      <Card className="cursor-pointer product-card">
        <Image height="160px" src={product.avatar} objectFit="cover" />
        <CardBody>
          <HStack justifyContent="space-between" alignItems="top" spacing="2">
            <Heading fontSize="md" height="40px">
              {product.name}
            </Heading>
            <Box
              width="22px"
              className="product-cart-icon"
              onClick={(e) => {
                e.preventDefault();
                if (!utilService.getCurrentUser()) navigate("/login");
              }}
            >
              <BsFillCartPlusFill size="22px" />
            </Box>
          </HStack>
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
        </CardBody>
      </Card>
    </Link>
  );
};

export default ShopProductListItem;
