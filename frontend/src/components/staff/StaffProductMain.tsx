import React from "react";
import SearchInput from "../SearchInput";
import { StaffProductDTO } from "../../services/staff-product-service";
import { Stack, Box, VStack } from "@chakra-ui/react";
interface Props {
  products: StaffProductDTO[];
}
const StaffProductMain = ({ products }: Props) => {
  return (
    <Box padding="4">
      <SearchInput onSearch={() => {}} />

      <VStack paddingTop="8">
        {products.map((product) => (
          <h1>{product.name}</h1>
        ))}
      </VStack>
    </Box>
  );
};

export default StaffProductMain;
