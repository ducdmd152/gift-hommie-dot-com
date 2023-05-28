import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import Header from "../../components/header/Header";
import { Route, Routes } from "react-router-dom";
import ManagerStaffListPage from "./ManagerStaffListPage";
import ManagerStaffCreatePage from "./ManagerStaffCreatePage";
import ManagerStaffEditPage from "./ManagerStaffEditPage";
import ManagerStaffDetailPage from "./ManagerStaffDetailPage";
const HEADER_HEIGHT = "100px";
const ManagerPage = () => {
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
          <Route index element={<ManagerStaffListPage />} />
          <Route path="/staff" element={<ManagerStaffListPage />} />
          <Route path="/staff/create" element={<ManagerStaffCreatePage />} />
          <Route path="/staff/detail" element={<ManagerStaffDetailPage />} />
        </Routes>
      </GridItem>
    </Grid>
  );
};

export default ManagerPage;
