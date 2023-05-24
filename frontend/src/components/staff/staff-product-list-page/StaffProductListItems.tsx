import React from "react";
import { StaffProductDTO } from "../../../services/staff-product-service";
import { VStack } from "@chakra-ui/react";
import StaffProductListItem from "./StaffProductListItem";
import useFetchStaffProduct, {
  StaffProductQuery,
} from "../../../hooks/useFetchStaffProduct";
interface Props {
  setCurrentProductId: (productId: number) => void;
  products: StaffProductDTO[];
}
const StaffProductListItems = ({ products, setCurrentProductId }: Props) => {
  return (
    <VStack width="100%" marginTop={8}>
      {products?.map((product) => (
        <StaffProductListItem
          key={product.id}
          product={product}
          setCurrentProductId={setCurrentProductId}
        />
      ))}
    </VStack>
  );
};

export default StaffProductListItems;
