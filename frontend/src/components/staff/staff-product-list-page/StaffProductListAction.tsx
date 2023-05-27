import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import Selector from "../../Selector";
import CATEGORIES from "../../../data/Categories";
import { StaffProductQuery } from "../../../hooks/useFetchStaffProduct";
import { Link } from "react-router-dom";
interface Props {
  staffProductQuery: StaffProductQuery;
  setStaffProductQuery: (staffProductQuery: StaffProductQuery) => void;
}

const StaffProductListAction = ({
  staffProductQuery,
  setStaffProductQuery,
}: Props) => {
  return (
    <VStack width="100%" p={4} m={4} marginTop={8} spacing={8}>
      <Link to="/product/create">
        <Button colorScheme="teal" size="md">
          Add new product
        </Button>
      </Link>

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
            if (isNaN(id)) {
              id = 0;
            }
            setStaffProductQuery({ ...staffProductQuery, category: id });
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
