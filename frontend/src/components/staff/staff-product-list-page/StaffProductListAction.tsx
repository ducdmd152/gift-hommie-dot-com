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
          marginBottom="2"
          fontSize="lg"
          textAlign="center"
          paddingBottom="2"
          borderBottom="1px solid lightgray"
        >
          Bộ lọc
        </Heading>

        <Selector
          field="Danh mục"
          choices={CATEGORIES}
          onSelect={(id) => {
            if (isNaN(id as number)) {
              id = 0;
            }
            setStaffProductQuery({
              ...staffProductQuery,
              search: "",
              page: 0,
              category: id as number,
            });
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
          Sắp xếp theo
        </Heading>

        {/* <Selector field="Sort by" /> */}
      </Box>
    </VStack>
  );
};

export default StaffProductListAction;
