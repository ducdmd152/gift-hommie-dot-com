import { Badge, Button, HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { HttpUser } from "../../services/user-service";
import { FaUserAlt } from "react-icons/fa";
import authService from "../../services/auth-service";
import utilService from "../../services/util-service";
import UserDTO from "../../type/UserDTO";

const HeaderUser = () => {
  const USER = utilService.getCurrentUser() as UserDTO;

  if (USER == null)
    return (
      <div>
        <Badge
          cursor="pointer"
          marginRight="12px"
          paddingX="2"
          paddingY="2"
          colorScheme="twitter"
          variant="solid"
          fontSize="sm"
        >
          Đăng nhập
        </Badge>
        <Badge
          cursor="pointer"
          paddingX="2"
          paddingY="2"
          colorScheme="twitter"
          variant="outline"
          fontSize="sm"
        >
          Đăng kí
        </Badge>
      </div>
    );

  return (
    <HStack onClick={() => authService.logout()}>
      User actions
      <FaUserAlt />
    </HStack>
  );
};

export default HeaderUser;
