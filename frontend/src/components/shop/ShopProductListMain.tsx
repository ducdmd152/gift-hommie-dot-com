import React from "react";
import SearchInput from "../SearchInput";
import { Box, HStack } from "@chakra-ui/react";
import ShopProductListItems from "./ShopProductListItems";
import Pagination from "../Pagination";
import PageableDTO from "../../type/PageableDTO";
// interface Props {
//   shopProductQuery: ShopProductQuery;
//   setShopProductQuery: (shopProductQuery: ShopProductQuery) => void;
// }

const ShopProductListMain = () => {
  // const { products, pageable, isLoading, error } =
  //   useFetchStaffProduct(staffProductQuery);

  let pageable = {} as PageableDTO;
  return (
    <Box p="4" ml={2} mb={24}>
      <SearchInput
        onSearch={(text: string) => {
          // setStaffProductQuery({
          //   ...staffProductQuery,
          //   search: text,
          // });
        }}
      />

      <ShopProductListItems
      // products={products}
      />

      <HStack justifyContent={"center"} mt={4} mb={8}>
        <Pagination
          pageable={pageable}
          onSelectPageIndex={
            (index: number) => index
            // setStaffProductQuery({ ...staffProductQuery, page: index })
          }
        />
      </HStack>
    </Box>
  );
};

export default ShopProductListMain;
