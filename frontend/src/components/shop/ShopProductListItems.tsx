import React from "react";
import { ShopProductDTO } from "../../services/shop-product-service";
import { SimpleGrid } from "@chakra-ui/react";
import ShopProductListItem from "./ShopProductListItem";
interface Props {
  products: ShopProductDTO[];
}
const ShopProductListItems = ({ products }: Props) => {
  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      spacing={6}
      padding="10px"
    >
      {products.map((product) => (
        <ShopProductListItem
          key={product.id}
          product={product}
        ></ShopProductListItem>
      ))}
    </SimpleGrid>
  );
};

export default ShopProductListItems;
