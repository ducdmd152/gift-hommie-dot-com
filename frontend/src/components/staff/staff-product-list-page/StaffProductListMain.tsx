import React from "react";
import SearchInput from "../../SearchInput";
import { StaffProductDTO } from "../../../services/staff-product-service";
import { Stack, Box, VStack, HStack } from "@chakra-ui/react";
import StaffProductListItems from "./StaffProductListItems";
import Pagination from "../../Pagination";
import useFetchStaffProduct, {
  StaffProductQuery,
} from "../../../hooks/useFetchStaffProduct";
interface Props {
  staffProductQuery: StaffProductQuery;
  setStaffProductQuery: (staffProductQuery: StaffProductQuery) => void;
}
const StaffProductMain = ({
  staffProductQuery,
  setStaffProductQuery,
}: Props) => {
  return (
    <Box p="4" ml={2} mb={24}>
      <SearchInput onSearch={() => {}} />

      <StaffProductListItems staffProductQuery={staffProductQuery} />

      <HStack justifyContent={"center"} mt={4} mb={8}>
        <Pagination
          // currentIndex={staffProductQuery?.page || 0}
          onSelectPageIndex={(index: number) =>
            setStaffProductQuery({ ...staffProductQuery, page: index })
          }
        />
      </HStack>
    </Box>
  );
};

export default StaffProductMain;
