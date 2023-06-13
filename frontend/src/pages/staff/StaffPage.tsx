import React, { useState } from "react";
import StaffProductListPage from "./StaffProductListPage";
import { Grid, GridItem, Text } from "@chakra-ui/react";
import Header from "../../components/header/Header";
import { Link, Route, Routes } from "react-router-dom";
import StaffProductEditPage from "./StaffProductEditPage";
import StaffProductDetailPage from "./StaffProductDetailPage";
import StaffProductCreatePage from "./StaffProductCreatePage";
import StaffViewProfilePage from "./StaffViewProfilePage";
const HEADER_HEIGHT = "100px";
const StaffPage = () => {
  const [productId, setProductId] = useState<number | null>(null);

  const setCurrentProductId = (id: number) => {
    setProductId(id);
  };

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

      <GridItem area="main" mt={HEADER_HEIGHT}>
        <Routes>
          <Route
            index
            element={
              <StaffProductListPage setCurrentProductId={setCurrentProductId} />
            }
          />
          <Route
            path="/product"
            element={
              <StaffProductListPage setCurrentProductId={setCurrentProductId} />
            }
          />
          <Route
            path="/product/detail"
            element={<StaffProductDetailPage currentProductId={productId} />}
          />
          <Route
            path="/product/edit"
            element={<StaffProductEditPage currentProductId={productId} />}
          />
          <Route
            path="/product/create"
            element={
              <StaffProductCreatePage
                setCurrentProductId={setCurrentProductId}
              />
            }
          />
          <Route path="/account" element={<StaffViewProfilePage currentProductId={productId} />} />
        </Routes>
      </GridItem>
    </Grid>
  );
};

export default StaffPage;
