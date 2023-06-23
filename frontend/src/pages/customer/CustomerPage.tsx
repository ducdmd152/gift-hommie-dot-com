import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import Header from "../../components/header/Header";
import { Route, Routes } from "react-router-dom";
import utilService from "../../services/util-service";
import CustomerShopPage from "./CustomerShopPage";
import CustomerCartPage from "./CustomerCartPage";
import CustomerShopDetailPage from "./CustomerShopDetailPage";
import CustomerCheckoutPage from "./CustomerCheckoutPage";
import CustomerViewProfilePage from "./CustomerViewProfilePage";
import { useState } from "react";
import CustomerOrderPage from "./CustomerOrderPage";
import CustomerOrderDetailPage from "./CustomerOrderDetailPage";
import AccountViewProfilePage from "../AccountProfileView";
import ErrorPage from "../ErrorPage";
import CustomerEditProfilePage from "./CustomerEditProfilePage";
import Login from "../guest/Login";
import Register from "../guest/Register";

const CustomerPage = () => {
  const [customerId, seCustomerId] = useState<string>("");

  return (
    <Grid
      templateAreas={{
        base: `"header" "main"`,
      }}
      templateColumns={{
        base: `1fr`,
      }}
      h="100%"
    >
      <GridItem
        area="header"
        position="fixed"
        w="100%"
        backgroundColor="white"
        zIndex={999}
      >
        <Header />
      </GridItem>

      <GridItem area="main" mt={utilService.HEADER_HEIGHT}>
        <Routes>
          <Route index element={<CustomerShopPage />} />
          <Route path="/shop" element={<CustomerShopPage />} />
          <Route path="/shop/detail" element={<CustomerShopDetailPage />} />
          <Route path="/order" element={<CustomerOrderPage />} />
          <Route path="/order/detail" element={<CustomerOrderDetailPage />} />
          <Route path="/cart" element={<CustomerCartPage />} />
          <Route path="/checkout" element={<CustomerCheckoutPage />} />
          <Route path="/account" element={<AccountViewProfilePage />} />
          <Route path="/account/edit" element={<CustomerEditProfilePage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </GridItem>
    </Grid>
  );
};

export default CustomerPage;
