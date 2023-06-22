import { Button, HStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserDTO from "../../type/UserDTO";
import RoleNavLinks from "../../data/RoleNavLinks";
import utilService from "../../services/util-service";

const HeaderNav = () => {
  const [pathname, setPathname] = useState("");
  const user = utilService.getCurrentUser() as UserDTO;
  let navs = RoleNavLinks["GUEST"];
  if (user != null) {
    navs = RoleNavLinks[user.authority];
  }

  return (
    <HStack height="100%" paddingX="10" justifyContent={"center"}>
      {navs.map((nav) => (
        <Link key={nav.label} to={nav.link}>
          <Button
            onClick={() => setPathname(window.location.pathname)}
            fontSize="md"
            // fontWeight={"medium"}
            variant="link"
            whiteSpace="normal"
            textAlign="left"
            paddingRight={8}
            color={window.location.pathname == nav.link ? "blue.600" : "gray"}
            fontWeight={
              window.location.pathname == nav.link ? "bold" : "medium"
            }
          >
            {nav.label}
          </Button>
        </Link>
      ))}
    </HStack>
  );
};

export default HeaderNav;
