import { Box, Flex, HStack, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import Logo from "./Logo";
import Nav from "./HeaderNav";
import HeaderNav from "./HeaderNav";
import HeaderUser from "./HeaderUser";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <HStack
      width="100%"
      maxW={"1280px"}
      justifyContent={"space-between"}
      paddingX="8"
      paddingY="4"
      borderBottom={1}
      borderStyle={"solid"}
      borderColor={useColorModeValue("gray.200", "gray.900")}
    >
      <Link to="/">
        <Logo />
      </Link>

      <Box flex="1">
        <HeaderNav />
      </Box>

      <HeaderUser />
    </HStack>
  );
};

export default Header;
