import { Button, HStack, VStack } from "@chakra-ui/react";
import React from "react";

const Pagination = () => {
  return (
    <HStack>
      <Button colorScheme="teal" variant="outline">
        1
      </Button>
      <Button colorScheme="teal" variant="ghost">
        2
      </Button>
    </HStack>
  );
};

export default Pagination;
