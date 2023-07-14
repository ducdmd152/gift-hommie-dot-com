import React from "react";
import SearchInput from "../SearchInput";
import { Box, Card, HStack, Text } from "@chakra-ui/react";
import ShopProductListItems from "./ShopProductListItems";
import Pagination from "../Pagination";
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

      {products.length > 0 ? (
        <HStack justifyContent={"center"} mt={4} mb={2}>
          <Pagination
            pageable={pageable}
            onSelectPageIndex={(index: number) =>
              setShopProductQuery({ ...shopProductQuery, page: index })
            }
          />
        </HStack>
      ) : (
        <Card width={"100%"} p="4">
          <Text size="lg" textAlign="center">
            Không có sản phẩm nào ở khớp kết quả.
          </Text>
        </Card>
      )}
    </Box>
  );
};

export default ShopProductListMain;
