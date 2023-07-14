import React from "react";
import SearchInput from "../../SearchInput";
import { Box, Card, HStack, Text } from "@chakra-ui/react";
import StaffProductListItems from "./StaffProductListItems";
import Pagination from "../../Pagination";
import useFetchStaffProduct, {
  StaffProductQuery,
} from "../../../hooks/useFetchStaffProduct";
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

      {!isLoading && products?.length > 0 && (
        <>
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
        </>
      )}
      {!isLoading && products?.length == 0 && (
        <Card width={"100%"} p="4" mt="2">
          <Text size="lg" textAlign="center">
            Không có sản phẩm nào trùng khớp.
          </Text>
        </Card>
      )}
    </Box>
  );
};

export default StaffProductMain;
