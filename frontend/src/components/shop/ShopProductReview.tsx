import { Avatar } from "@chakra-ui/avatar";
import { Card } from "@chakra-ui/card";
import { Box, HStack, VStack, Text } from "@chakra-ui/layout";
import React from "react";
import { Rating } from "react-simple-star-rating";

const ShopProductReview = () => {
  return (
    <Box w="100%">
      <VStack w="100%">
        <Card w="100%" paddingX="4" paddingY="2">
          <HStack>
            <Avatar
              size="md"
              name="Kola Tioluwani"
              src="https://bit.ly/tioluwani-kolawole"
            />

            <VStack justifyContent={"flex-start"} spacing="0">
              <Text size="md" mt="2" mb="0">
                @username
              </Text>
              <Rating initialValue={5} readonly={true} size={18}></Rating>
            </VStack>
          </HStack>

          <Text color="gray" p="2" maxH="100px" overflowY={"auto"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt omnis
            hic aliquid harum consectetur iure dicta a mollitia totam? Voluptas.
          </Text>
        </Card>
      </VStack>
    </Box>
  );
};

export default ShopProductReview;
