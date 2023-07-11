import { Box, HStack, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import Logo from "./Logo";
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
        <Box w="200px">
          <Logo />
        </Box>
      </Link>

      <Box flex="1">
        <HeaderNav />
      </Box>

      <Box maxW="200px">
        <HeaderUser />
      </Box>
    </HStack>
  );
};

export default Header;
