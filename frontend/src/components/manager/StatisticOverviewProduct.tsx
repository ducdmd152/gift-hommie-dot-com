import { Badge, Card, HStack, Image, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { GLOBAL_CONTEXT } from "../../App";
import ProductDTO from "../../type/ProductDTO";
import utilService from "../../services/util-service";

const StatisticOverviewProduct = () => {
  return (
    <Card width="100%" minWidth="400px" p="4">
      <Text fontSize="xl">Top sản phẩm bán chạy</Text>
      <Text fontSize="md" color="gray" fontStyle={"italic"}>
        (trong tháng)
      </Text>
      <HStack w="100%" mt="4">
        <Card w="100%" p="2">
          <HStack justifyContent={"space-between"}>
            <HStack spacing="3" className="product-card">
              <Image
                borderRadius={"8px"}
                boxSize="50px"
                objectFit="cover"
                src={utilService.getURLImageUploadPresent()}
              />
              <Text
                fontSize="md"
                fontWeight="bold"
                color="dark.200"
                letterSpacing="2px"
              >
                <Badge fontSize="xs" colorScheme="teal">
                  {"ID >> 1"}
                </Badge>
                <br />
                {"Tên sản phẩm"}
              </Text>
            </HStack>
            <Text color="teal" fontWeight={"bold"}>
              10 đã bán
            </Text>
          </HStack>
        </Card>
      </HStack>
    </Card>
  );
};

export default StatisticOverviewProduct;

const ProductItem = ({ product }: { product: ProductDTO }) => {
  const productContext = useContext(GLOBAL_CONTEXT).productContext;
  return (
    // <Link
    //   to="/shop/detail"
    //   onClick={() => {
    //     productContext.setProductId(product.id);
    //     window.scrollTo({ top: 0, behavior: "smooth" });
    //   }}
    // >
    <HStack>
      <HStack spacing="2" className="product-card">
        <Image
          borderRadius={"8px"}
          boxSize="50px"
          objectFit="cover"
          src={product.avatar}
        />
        <Text fontSize="md" fontWeight="bold" color="gray" letterSpacing="2px">
          {product.name.toUpperCase()}
        </Text>
      </HStack>
    </HStack>
    // </Link>
  );
};
