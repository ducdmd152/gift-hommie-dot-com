import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import Selector from "../../Selector";
import CATEGORIES from "../../../data/Categories";
import { StaffProductQuery } from "../../../hooks/useFetchStaffProduct";
import { Link } from "react-router-dom";
import CategoryManagement from "./CategoryManagement";
import useFetchCategories, {
  CategoryQuery,
} from "../../../hooks/useFetchCategory";
interface Props {
  staffProductQuery: StaffProductQuery;
  setStaffProductQuery: (staffProductQuery: StaffProductQuery) => void;
}

const StaffProductListAction = ({
  staffProductQuery,
  setStaffProductQuery,
}: Props) => {
  const [query, setQuery] = useState({} as CategoryQuery);
  const { categories, setCategories } = useFetchCategories(query);
  return (
    <VStack width="100%" p={4} m={4} marginTop={8} spacing={8}>
      <CategoryManagement
        updateCategories={(categories) => {
          setCategories(categories);
        }}
        refresh={() => {
          setStaffProductQuery({ ...staffProductQuery, category: 0 });
        }}
      />
      <Link to="/product/create">
        <Button colorScheme="teal" size="md">
          Tạo mới sản phẩm
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
          choices={categories.filter((c) => c.status)}
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
          margin="2"
          fontSize="lg"
          textAlign="center"
          paddingBottom="2"
          borderBottom="1px solid lightgray"
        >
          Sắp xếp theo
        </Heading>

        <Selector
          field="Sắp xếp theo"
          onSelect={(field) => {
            setStaffProductQuery({
              ...staffProductQuery,
              sort: field as string,
            });
          }}
          choices={[
            { id: "name", name: "Tên" },
            { id: "price", name: "Giá tăng" },
            { id: "price-desc", name: "Giá giảm" },
          ]}
        />
      </Box>
    </VStack>
  );
};

export default StaffProductListAction;
