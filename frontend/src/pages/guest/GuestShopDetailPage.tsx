import { Box, Heading, VStack } from "@chakra-ui/layout";
import ShopProductDetail from "../../components/shop/ShopProductDetail";
import ShopProductListItems from "../../components/shop/ShopProductListItems";
import useFetchShopProduct, {
  ShopProductQuery,
} from "../../hooks/useFetchShopProduct";
import { useContext, useState } from "react";
import { GLOBAL_CONTEXT } from "../../App";
import utilService from "../../services/util-service";

const GuestShopDetailPage = () => {
  const globalContext = useContext(GLOBAL_CONTEXT);
  const productId = globalContext.productContext.getProductId();

  console.log(productId);
  const [shopProductQuery, setShopProductQuery] = useState<ShopProductQuery>({
    size: 12,
    related: productId,
  } as ShopProductQuery);
  const { products, pageable, isLoading, error } =
    useFetchShopProduct(shopProductQuery);

  return (
    <>
      <VStack
        spacing="2"
        marginX="2"
        marginTop={utilService.HEADER_HEIGHT}
        mb="2"
      >
        <ShopProductDetail />

        <Box borderRadius="8" p="2" border="1px solid lightgray" width="100%">
          <VStack width="100%" padding="4" spacing="4">
            <Heading fontSize="3xl">Sản phẩm tương tự</Heading>
            <ShopProductListItems products={products} />
          </VStack>
        </Box>
      </VStack>
    </>
  );
};

export default GuestShopDetailPage;
