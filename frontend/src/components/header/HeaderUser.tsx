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
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { HttpUser } from "../../services/user-service";
import { FaUserAlt } from "react-icons/fa";
import authService from "../../services/auth-service";
import utilService from "../../services/util-service";
import UserDTO from "../../type/UserDTO";
import { Link } from "react-router-dom";
import useAfterAuthenticated from "../../hooks/useAfterAuthenticated";
import { BsCartFill } from "react-icons/bs";

const HeaderUser = () => {
  const USER = utilService.getCurrentUser() as UserDTO;
  const { afterAuthenticatedExecuting } = useAfterAuthenticated();

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
        <Link to="/register">
          <Badge
            className="badge-button"
            cursor="pointer"
            paddingX="2"
            paddingY="1"
            colorScheme="twitter"
            variant="outline"
            fontSize="sm"
          >
            Đăng ký
          </Badge>
        </Link>
      </Box>
    );

  return (
    <HStack spacing="2">
      {/* <BsCartFill /> */}
      <Stack alignItems={"center"}>
        <Menu>
          <MenuButton
            as={Button}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            minW={0}
          >
            <HStack>
              <Avatar size={"sm"} src={USER.avatar || ""} />
              <Text _hover={{ textTransform: "none!important" }}>
                {USER.firstName + USER.lastName}
              </Text>
            </HStack>
          </MenuButton>
          <MenuList minW="0" w={"180px"}>
            <Link to="/account">
              <MenuItem>Tài khoản</MenuItem>
            </Link>
            {/* {USER.authority == "ROLE_CUSTOMER" && (
              <Link to="/cart">
                <MenuItem>Giỏ hàng</MenuItem>
              </Link>
            )}
            {USER.authority == "ROLE_CUSTOMER" && (
              <Link to="/order">
                <MenuItem>Đơn mua</MenuItem>
              </Link>
            )} */}
            <MenuItem
              onClick={() => {
                utilService.logout();
                afterAuthenticatedExecuting();
              }}
            >
              Đăng xuất
            </MenuItem>
          </MenuList>
        </Menu>
      </Stack>
    </HStack>
  );
  return (
    <HStack onClick={() => authService.logout()}>
      User actions
      <FaUserAlt />
    </HStack>
  );
};

export default HeaderUser;
