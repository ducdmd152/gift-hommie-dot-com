import React from "react";
import { StaffProductDTO } from "../../../services/staff-product-service";
import { SimpleGrid } from "@chakra-ui/react";
import StaffProductListItem from "./StaffProductListItem";


interface Props {
  setCurrentProductId: (productId: number) => void;
  products: StaffProductDTO[];
}
const StaffProductListItems = ({ products, setCurrentProductId }: Props) => {
  return (
    <SimpleGrid width="100%" marginTop={8} columns={2} spacing={2}>
      {products?.map((product) => (
        <StaffProductListItem
          key={product.id}
          product={product}
          setCurrentProductId={setCurrentProductId}
        />
      ))}
    </SimpleGrid>
  );
};

export default StaffProductListItems;
