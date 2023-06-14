import { Grid, GridItem } from "@chakra-ui/react";
import React, { useState } from "react";
import Header from "../../components/header/Header";
import { Route, Routes } from "react-router-dom";
import ManagerStaffListPage from "./ManagerStaffListPage";
import ManagerStaffCreatePage from "./ManagerStaffCreatePage";
import ManagerStaffEditPage from "./ManagerStaffEditPage";
import ManagerStaffDetailPage from "./ManagerStaffDetailPage";
import ManagerViewProfilePage from "./ManagerViewProfilePage";
import AccountViewProfilePage from "../AccountProfileView";
const HEADER_HEIGHT = "100px";
const ManagerPage = () => {
  const [userId, setUserId] = useState<string>("");
  // userId state phải lưu ở Manager page để share cho 2 childs là ManagerStaffList và ManagerStaffDetail
  // console.log(userId);
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
            element={<ManagerStaffListPage setUserId={setUserId} />}
          />
          <Route
            path="/staff"
            element={<ManagerStaffListPage setUserId={setUserId} />}
          />
          <Route
            path="/staff/create"
            element={<ManagerStaffCreatePage setUserId={setUserId} />}
          />
          <Route
            path="/staff/detail"
            element={<ManagerStaffDetailPage userId={userId} />}
          />
          <Route
            path="/staff/edit"
            element={<ManagerStaffEditPage userId={userId} />}
          />
          <Route
            path="/account"
            element={<AccountViewProfilePage userId={"xyz"} />}
          />
        </Routes>
      </GridItem>
    </Grid>
  );
};

export default ManagerPage;
