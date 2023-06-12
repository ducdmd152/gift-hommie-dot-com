import { Grid, GridItem, Heading } from "@chakra-ui/react";
import React from "react";
import CustomerOrderTabs from "../../components/customer-order/CustomerOrderTabs";
import CustomerOrderList from "../../components/customer-order/CustomerOrderList";

const CustomerOrderPage = () => {
  return (
    <>
      <Heading size="lg" textAlign="center" mb="4">
        Đơn hàng của bạn
      </Heading>
      <Grid
        // marginTop={utilService.HEADER_HEIGHT}
        templateAreas={{
          base: `"main aside-right"`,
          // sm: `"header header" "aside-left main"`,
          // lg: `"header header" "aside-left main"`,
        }}
        templateColumns={{
          base: `1fr 0fr`,
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
          <CustomerOrderList />
        </GridItem>
        <GridItem
          area="aside-right"
          className="aside-right"
          // backgroundColor={"red"}
        ></GridItem>
      </Grid>
    </>
  );
};

export default CustomerOrderPage;
