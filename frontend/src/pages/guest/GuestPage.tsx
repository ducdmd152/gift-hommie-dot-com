import React, { useState } from "react";
import { Grid, GridItem, Text } from "@chakra-ui/react";
import Header from "../../components/header/Header";
import { Link, Route, Routes } from "react-router-dom";
import Login from "./Login";

const GuestPage = () => {
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
        {/* <Header /> */}
      </GridItem>

      <GridItem area="main">
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </GridItem>
    </Grid>
  );
};

export default GuestPage;
