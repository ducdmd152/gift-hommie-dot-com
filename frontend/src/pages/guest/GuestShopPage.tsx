import { Box, Grid, GridItem } from "@chakra-ui/react";
import React, { useState } from "react";
import Header from "../../components/header/Header";
import ShopProductListMain from "../../components/shop/ShopProductListMain";
import ShopProductListFilter from "../../components/shop/ShopProductListFilter";
import { ShopProductQuery } from "../../hooks/useFetchShopProduct";
const HEADER_HEIGHT = "100px";
const GuestShopPage = () => {
  const [shopProductQuery, setShopProductQuery] = useState<ShopProductQuery>(
    {} as ShopProductQuery
  );
  return (
    <>
      <Box position="fixed" w="100%" backgroundColor="white" zIndex={999}>
        <Header />
      </Box>
      <Grid
        marginTop={HEADER_HEIGHT}
        templateAreas={{
          base: `"aside-left main"`,
          // sm: `"header header" "aside-left main"`,
          // lg: `"header header" "aside-left main"`,
        }}
        templateColumns={{
          base: `240px 1fr`,
          // sm: `"1fr" "200px 1fr"`,
          // lg: `"1fr" "200px 1fr"`,
        }}
        h="100%"
      >
        {/* <Show above="sm"> */}
        <GridItem area="aside-left" className="aside-left">
          <ShopProductListFilter
            shopProductQuery={shopProductQuery}
            setShopProductQuery={setShopProductQuery}
          />
        </GridItem>
        {/* </Show> */}
        <GridItem area="main" className="main">
          <ShopProductListMain
            shopProductQuery={shopProductQuery}
            setShopProductQuery={setShopProductQuery}
          />
        </GridItem>
      </Grid>
    </>
  );
};

export default GuestShopPage;
