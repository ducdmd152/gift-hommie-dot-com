import { Box, Button, Heading, List, ListItem, VStack } from "@chakra-ui/react";
import React from "react";
import Selector from "../Selector";
import CATEGORIES from "../../data/Categories";
import { ShopProductQuery } from "../../hooks/useFetchShopProduct";
interface Props {
  shopProductQuery: ShopProductQuery;
  setShopProductQuery: (shopProductQuery: ShopProductQuery) => void;
}
const ShopProductListFilter = ({
  shopProductQuery,
  setShopProductQuery,
}: Props) => {
  return (
    <VStack width="100%" p={4} m={4} marginTop={8} spacing={8}>
      <Box border="2px solid lightgray" borderRadius="md" width="100%" p={4}>
        <Heading
          fontSize="lg"
          textAlign="center"
          paddingBottom="2"
          borderBottom="1px solid lightgray"
          marginBottom="2"
        >
          Danh mục
        </Heading>
        <List spacing="1">
          <ListItem
            key={0}
            // paddingX="2"
            // paddingY="1"
            // border="1px solid lightgray"
            // borderRadius="4"
            className="cursor-pointer"
            onClick={() => {
              let id = 0;
              if (isNaN(id)) {
                id = 0;
              }
              setShopProductQuery({
                ...shopProductQuery,
                page: 0,
                search: "",
                category: id,
              });
            }}
          >
            <Button
              variant={shopProductQuery.category ? "outline" : "solid"}
              width="100%"
            >
              Tất cả
            </Button>
          </ListItem>
          {CATEGORIES.map((category) => (
            <ListItem
              key={category.id}
              // paddingX="2"
              // paddingY="1"
              // border="1px solid lightgray"
              // borderRadius="4"
              className="cursor-pointer"
              onClick={() => {
                let id = category.id;
                // console.log(id);page: 0,

                if (isNaN(id)) {
                  id = 0;
                }
                setShopProductQuery({
                  ...shopProductQuery,
                  page: 0,
                  search: "",
                  category: id,
                });
              }}
            >
              <Button
                variant={
                  category.id == shopProductQuery.category ? "solid" : "outline"
                }
                width="100%"
              >
                {category.name}
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box border="2px solid lightgray" borderRadius="md" width="100%" p={4}>
        <Heading
          fontSize="lg"
          textAlign="center"
          paddingBottom="2"
          borderBottom="1px solid lightgray"
          marginBottom="2"
        >
          Sắp xếp theo
        </Heading>

        <Selector
          field="Sắp xếp theo"
          onSelect={(field) => {
            setShopProductQuery({
              ...shopProductQuery,
              sort: field as string,
            });
          }}
          choices={[
            { id: "name", name: "Tên" },
            { id: "price", name: "Giá" },
          ]}
        />
      </Box>
    </VStack>
  );
};

export default ShopProductListFilter;
