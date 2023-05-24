import React from "react";
import { StaffProductDTO } from "../../../services/staff-product-service";
import { VStack } from "@chakra-ui/react";
import StaffProductListItem from "./StaffProductListItem";
import useFetchStaffProduct, {
  StaffProductQuery,
} from "../../../hooks/useFetchStaffProduct";
interface Props {
  products: StaffProductDTO[];
}
const StaffProductListItems = ({ products }: Props) => {
  return (
    <VStack width="100%" marginTop={8}>
      {products?.map((product) => (
        <StaffProductListItem key={product.id} product={product} />
      ))}
    </VStack>
  );
};

export default StaffProductListItems;
