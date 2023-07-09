import React from "react";
import SearchInput from "../SearchInput";
import { Box, HStack, VStack } from "@chakra-ui/react";
import ShopProductListItems from "./ShopProductListItems";
import Pagination from "../Pagination";
import PageableDTO from "../../type/PageableDTO";
import useFetchShopProduct, {
  ShopProductQuery,
} from "../../hooks/useFetchShopProduct";
interface Props {
  shopProductQuery: ShopProductQuery;
  setShopProductQuery: (shopProductQuery: ShopProductQuery) => void;
}

const ShopProductListMain = ({
  shopProductQuery,
  setShopProductQuery,
}: Props) => {
  const { products, pageable, isLoading, error } =
    useFetchShopProduct(shopProductQuery);
  // console.log(products);

  return (
    <Box p="4" ml={2} mb={24}>
      <SearchInput
        defaultText={shopProductQuery.search}
        onSearch={(text: string) => {
          setShopProductQuery({
            ...shopProductQuery,
            page: 0,
            search: text,
          });
        }}
      />

      <Box marginTop="8">
        <ShopProductListItems products={products} />
      </Box>

      <HStack justifyContent={"center"} mt={4} mb={2}>
        <Pagination
          pageable={pageable}
          onSelectPageIndex={(index: number) =>
            setShopProductQuery({ ...shopProductQuery, page: index })
          }
        />
      </HStack>
    </Box>
  );
};

export default ShopProductListMain;
