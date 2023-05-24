import { Box, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import Selector from "../../Selector";

const StaffProductListAction = () => {
  return (
    <VStack width="100%" p={4} m={4} spacing={8}>
      <Box border="2px solid lightgray" borderRadius="md" width="100%" p={4}>
        <Heading
          fontSize="lg"
          textAlign="center"
          paddingBottom="2"
          borderBottom="1px solid lightgray"
        >
          Filter
        </Heading>

        <Selector field="Category" />
      </Box>
      <Box border="2px solid lightgray" borderRadius="md" width="100%" p={4}>
        <Heading
          fontSize="lg"
          textAlign="center"
          paddingBottom="2"
          borderBottom="1px solid lightgray"
        >
          Sort
        </Heading>

        <Selector field="Sort by" />
      </Box>
    </VStack>
  );
};

export default StaffProductListAction;
