import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  HStack,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  VStack,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { FcShipped } from "react-icons/fc";
import { SiFastify, SiGrab } from "react-icons/si";

const CustomerShopDetailPage = () => {
  return (
    <>
      {/* <Link to="/shop">
        <Button colorScheme="teal" size="sm" ml="12">
          {"<< Danh sách sản phẩm"}
        </Button>
      </Link> */}

      <Box
        marginX="4"
        marginY="2"
        p="2"
        border="1px solid lightgray"
        objectFit="cover"
        borderRadius="8"
      >
        <HStack alignItems="flex-start">
          <Box flex="1" minWidth="200px">
            <Image
              marginTop="4"
              boxSize="90%"
              objectFit="cover"
              borderRadius="8"
              src="https://cf.shopee.vn/file/33252df5aa3af6dff27b4e9cda243e70_tn"
              alt="Dan Abramov"
            />
          </Box>
          <VStack flex="1" h="100%" alignItems="top" spacing="8">
            <HStack
              alignItems="flex-start"
              flexGrow="false"
              paddingY="4"
              fontWeight="medium"
            >
              <Heading fontSize="xl" letterSpacing="1px">
                Tên sản phẩm
              </Heading>
              <Badge colorScheme="red">Yêu thích</Badge>
            </HStack>

            <HStack>
              <Badge
                className="none-text-transform"
                // variant="solid"
                // colorScheme="gray"
                fontSize="lg"
                fontWeight="light"
                paddingX="2"
              >
                Giá
              </Badge>
              <Badge
                className="none-text-transform"
                variant="subtle"
                colorScheme="blue"
                fontSize="lg"
              >
                290.000đ
              </Badge>
            </HStack>

            <HStack>
              <Badge
                className="none-text-transform"
                // variant="solid"
                // colorScheme="gray"
                fontSize="md"
                fontWeight="bold"
                paddingX="2"
              >
                120 sản phẩm có sẵn
              </Badge>
            </HStack>

            <HStack spacing="4">
              <Badge
                className="none-text-transform"
                // variant="solid"
                // colorScheme="gray"
                fontSize="md"
                fontWeight="light"
                paddingX="2"
              >
                Vận chuyển
              </Badge>
              <HStack>
                <FcShipped size="32px" />
                <SiGrab size="32px" color="green" />
                <SiFastify size="32px" color="green" />
              </HStack>
            </HStack>
            <HStack>
              <Button colorScheme="blue" variant="outline" fontWeight="medium">
                Thêm vào giỏ hàng
              </Button>

              <Button colorScheme="blue" fontWeight="medium">
                Mua ngay
              </Button>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </>
  );
};

export default CustomerShopDetailPage;
