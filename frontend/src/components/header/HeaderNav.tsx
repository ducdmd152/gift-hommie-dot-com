import { Button, HStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
const linkRoleMap = {
  ROLE_STAFF: [
    {
      label: "Trang chủ",
      link: "/",
    },
    {
      label: "Quản lí sản phẩm",
      link: "/product",
    },
    {
      label: "Quản lí đơn hàng",
      link: "/order",
    },
  ],
};
const HeaderNav = () => {
  let navs = linkRoleMap["ROLE_STAFF"];

  return (
    <HStack height="100%" paddingX="10" justifyContent={"center"}>
      {navs.map((nav) => (
        <Link key={nav.label} to={nav.link}>
          <Button
            fontSize="md"
            fontWeight={"medium"}
            variant="link"
            whiteSpace="normal"
            textAlign="left"
            paddingRight={8}
          >
            {nav.label}
          </Button>
        </Link>
      ))}
    </HStack>
  );
};

export default HeaderNav;
