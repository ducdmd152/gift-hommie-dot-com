import {
  Badge,
  Box,
  Button,
  Card,
  HStack,
  Heading,
  Image,
  VStack,
  Text,
  Checkbox,
} from "@chakra-ui/react";
import React from "react";
import imageService from "../../services/image-service";
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { red } from "@cloudinary/url-gen/actions/adjust";

const CartListItem = () => {
  return (
    <Card width="100%" paddingX="6" paddingY="4" border="1px solid #dddd">
      <HStack spacing={4}>
        <Checkbox
          colorScheme="green"
          iconSize="32"
          border="1px solid lightgreen"
          borderRadius="6px"
        ></Checkbox>

        <Image
          boxSize="100px"
          objectFit="cover"
          src={imageService.getDefaultProductAvatarURL()}
        />
        <VStack alignItems={"start"} spacing="4" paddingRight="6">
          <Heading fontSize="xl">Product Name</Heading>

          <HStack>
            <Badge colorScheme="teal" variant="outline">
              {"Cốc sứ"}
            </Badge>

            <Badge colorScheme="teal" variant="outline">
              Yêu thích
            </Badge>

            <Badge colorScheme="teal" variant="outline">
              Bán chạy
            </Badge>
          </HStack>
        </VStack>
        <HStack justifyContent={"space-between"} flex="1">
          <VStack>
            <Text>Đơn giá</Text>
            <Badge
              colorScheme="blue"
              paddingX="2"
              paddingY="1"
              variant="outline"
              className="none-text-transform"
            >
              10.000đ
            </Badge>
          </VStack>
          <VStack>
            <Text>Số lượng</Text>
            <Badge
              colorScheme="blue"
              paddingX="2"
              paddingY="1"
              variant="outline"
              className="none-text-transform"
            >
              20
            </Badge>
          </VStack>
          <VStack>
            <Text>Thành tiền</Text>
            <Badge
              colorScheme="blue"
              paddingX="2"
              paddingY="1"
              variant="outline"
              className="none-text-transform"
            >
              200.000đ
            </Badge>
          </VStack>
        </HStack>

        <Box paddingLeft="4">
          <Button
            variant="outline"
            colorScheme="gray"
            _hover={{
              border: "1px red solid",
              color: "red",
            }}
            p="1"
          >
            <BsTrash color="inherit" size="16" className="danger-hover" />
          </Button>
        </Box>
      </HStack>
    </Card>
  );
};

export default CartListItem;
