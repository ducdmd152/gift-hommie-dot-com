import { Box, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import Selector from "../../Selector";
import CATEGORIES from "../../../data/Categories";

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

        <Selector
          field="Category"
          choices={CATEGORIES}
          onSelect={(id: number) => {
            console.log(id);
          }}
        />
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

        {/* <Selector field="Sort by" /> */}
      </Box>
    </VStack>
  );
};

export default StaffProductListAction;
