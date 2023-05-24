import React from "react";
import SearchInput from "../../SearchInput";
import { StaffProductDTO } from "../../../services/staff-product-service";
import { Stack, Box, VStack, HStack } from "@chakra-ui/react";
import StaffProductListItems from "./StaffProductListItems";
import Pagination from "../../Pagination";
interface Props {
  products: StaffProductDTO[];
}
const StaffProductMain = ({ products }: Props) => {
  return (
    <Box p="4" mb={24}>
      <SearchInput onSearch={() => {}} />

      <StaffProductListItems products={products} />

      <HStack justifyContent={"center"} mt={4} mb={8}>
        <Pagination />
      </HStack>
    </Box>
  );
};

export default StaffProductMain;
