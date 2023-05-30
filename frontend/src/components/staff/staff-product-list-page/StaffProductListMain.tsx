import React from "react";
import SearchInput from "../../SearchInput";
import { StaffProductDTO } from "../../../services/staff-product-service";
import { Stack, Box, VStack, HStack } from "@chakra-ui/react";
import StaffProductListItems from "./StaffProductListItems";
import Pagination from "../../Pagination";
import useFetchStaffProduct, {
  StaffProductQuery,
} from "../../../hooks/useFetchStaffProduct";
import PageableDTO from "../../../type/PageableDTO";
interface Props {
  setCurrentProductId: (productId: number) => void;
  staffProductQuery: StaffProductQuery;
  setStaffProductQuery: (staffProductQuery: StaffProductQuery) => void;
}
const StaffProductMain = ({
  setCurrentProductId,
  staffProductQuery,
  setStaffProductQuery,
}: Props) => {
  const { products, pageable, isLoading, error } =
    useFetchStaffProduct(staffProductQuery);

  return (
    <Box p="4" ml={2} mb={24}>
      <SearchInput
        defaultText={staffProductQuery.search}
        onSearch={(text: string) => {
          setStaffProductQuery({
            ...staffProductQuery,
            search: text,
          });
        }}
      />

      <StaffProductListItems
        products={products}
        setCurrentProductId={setCurrentProductId}
      />

      <HStack justifyContent={"center"} mt={4} mb={8}>
        <Pagination
          pageable={pageable}
          onSelectPageIndex={(index: number) =>
            setStaffProductQuery({ ...staffProductQuery, page: index })
          }
        />
      </HStack>
    </Box>
  );
};

export default StaffProductMain;
