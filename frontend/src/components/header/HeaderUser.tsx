import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { HttpUser } from "../../services/user-service";
import { FaUserAlt } from "react-icons/fa";
import authService from "../../services/auth-service";
import utilService from "../../services/util-service";
import UserDTO from "../../type/UserDTO";
import { Link } from "react-router-dom";

const HeaderUser = () => {
  const USER = utilService.getCurrentUser() as UserDTO;

  if (USER == null)
    return (
      <Box>
        <Link to="/login">
          <Badge
            className="badge-button"
            cursor="pointer"
            marginRight="12px"
            paddingX="2"
            paddingY="1"
            colorScheme="twitter"
            variant="solid"
            fontSize="sm"
          >
            Đăng nhập
          </Badge>
        </Link>
        <Link to="/login">
          <Badge
            className="badge-button"
            cursor="pointer"
            paddingX="2"
            paddingY="1"
            colorScheme="twitter"
            variant="outline"
            fontSize="sm"
          >
            Đăng kí
          </Badge>
        </Link>
      </Box>
    );

  return (
    <Box>
      <Stack alignItems={"center"}>
        <Menu>
          <MenuButton
            as={Button}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            minW={0}
          >
            <Avatar size={"sm"} src={USER.avatar || ""} />
          </MenuButton>
          <MenuList minW="0" w={"180px"}>
            <Link to="/account">
              <MenuItem>Tài khoản</MenuItem>
            </Link>
            <MenuItem
              onClick={() => {
                utilService.logout();
              }}
            >
              Đăng xuất
            </MenuItem>
          </MenuList>
        </Menu>
      </Stack>
    </Box>
  );
  return (
    <HStack onClick={() => authService.logout()}>
      User actions
      <FaUserAlt />
    </HStack>
  );
};

export default HeaderUser;
