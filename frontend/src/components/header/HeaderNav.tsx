import { Button, HStack } from "@chakra-ui/react";
import React from "react";
const linkRoleMap = {
  ROLE_STAFF: [
    {
      label: "Trang chủ",
      link: "/staff/product-management",
    },
    {
      label: "Quản lí sản phẩm",
      link: "/staff/product-management",
    },
    {
      label: "Quản lí đơn hàng",
      link: "/staff/order-management",
    },
  ],
};
const HeaderNav = () => {
  let navs = linkRoleMap["ROLE_STAFF"];

  return (
    <HStack height="100%" paddingX="10" justifyContent={"center"}>
      {navs.map((nav) => (
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
      ))}
    </HStack>
  );
};

export default HeaderNav;
