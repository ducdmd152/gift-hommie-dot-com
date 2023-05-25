import { Button, HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { HttpUser } from "../../services/user-service";
import { FaUserAlt } from "react-icons/fa";
import authService from "../../services/auth-service";

const HeaderUser = () => {
  const [user, setUser] = useState<HttpUser | null>(null);

  useEffect(() => {
    const userJSON = sessionStorage.getItem("user");
    if (userJSON) setUser(JSON.parse(userJSON));
  }, []);

  if (user == null) {
    setUser({
      id: 0,
      username: "staff",
    });
  }

  if (user == null)
    return (
      <div>
        <Button
          marginRight="12px"
          paddingX="2"
          paddingY="2"
          colorScheme="twitter"
          variant="solid"
          fontSize="sm"
        >
          Đăng nhập
        </Button>
        <Button
          paddingX="2"
          paddingY="2"
          colorScheme="twitter"
          variant="outline"
          fontSize="sm"
        >
          Đăng kí
        </Button>
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
