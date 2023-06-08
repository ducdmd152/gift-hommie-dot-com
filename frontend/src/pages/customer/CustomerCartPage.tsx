import { Grid, GridItem, Heading } from "@chakra-ui/react";
import React from "react";
import CartListMain from "../../components/cart/CartListMain";
import CartSummary from "../../components/cart/CartSummary";

const CustomerCartPage = () => {
  return (
    <>
      <Heading size="lg" textAlign="center" mb="4">
        Giỏ hàng của bạn
      </Heading>
      <Grid
        // marginTop={utilService.HEADER_HEIGHT}
        templateAreas={{
          base: `"main aside-right"`,
          // sm: `"header header" "aside-left main"`,
          // lg: `"header header" "aside-left main"`,
        }}
        templateColumns={{
          base: `6fr 4fr`,
          // sm: `"1fr" "200px 1fr"`,
          // lg: `"1fr" "200px 1fr"`,
        }}
        h="100%"
      >
        <GridItem
          area="main"
          className="main"
          // backgroundColor={"green"}
        >
          <CartListMain />
        </GridItem>
        <GridItem
          area="aside-right"
          className="aside-right"
          // backgroundColor={"red"}
        >
          <CartSummary />
        </GridItem>
      </Grid>
    </>
  );
};

export default CustomerCartPage;
