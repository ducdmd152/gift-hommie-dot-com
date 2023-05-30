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
import { BsFillCartPlusFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
const ShopProductDetail = () => {
  return (
    <Card paddingY="2">
      <Box
        overflow="hidden"
        borderRadius="8"
        m="2"
        border="1px solid lightgray"
      >
        <Box p="2" objectFit="cover">
          <HStack alignItems="flex-start">
            <Box flex="4" minWidth="200px" padding="4">
              <Image
                marginTop="4"
                boxSize="90%"
                objectFit="cover"
                borderRadius="8"
                src="https://cf.shopee.vn/file/33252df5aa3af6dff27b4e9cda243e70_tn"
                alt="Dan Abramov"
              />
            </Box>
            <VStack
              paddingTop="4"
              flex="6"
              h="100%"
              alignItems="flex-start"
              spacing="12"
            >
              <VStack spacing="2" paddingTop="4" alignItems="flex-start">
                <HStack
                  alignItems="flex-start"
                  flexGrow="false"
                  fontWeight="medium"
                >
                  <Heading fontSize="4xl" letterSpacing="1px">
                    Tên sản phẩm
                  </Heading>
                  <Badge colorScheme="red">Yêu thích</Badge>
                </HStack>
                <HStack>
                  <Text>
                    <HStack spacing="1px">
                      <AiFillStar color="gold" />
                      <AiFillStar color="gold" />
                      <AiFillStar color="gold" />
                      <AiFillStar color="gold" />
                      <AiFillStar color="gold" />
                    </HStack>
                  </Text>
                  <Text>|</Text>
                  <Text>2,1k đã bán</Text>
                  <Text>|</Text>
                  <Text>Bán chạy</Text>
                </HStack>
              </VStack>

              <HStack>
                <Badge
                  className="none-text-transform"
                  // variant="solid"
                  // colorScheme="gray"
                  fontSize="2xl"
                  fontWeight="light"
                  paddingX="2"
                >
                  Giá
                </Badge>
                <Badge
                  className="none-text-transform"
                  variant="subtle"
                  colorScheme="blue"
                  fontSize="2xl"
                >
                  290.000đ
                </Badge>
              </HStack>

              <HStack>
                <Badge
                  className="none-text-transform"
                  // variant="solid"
                  // colorScheme="gray"
                  fontSize="xl"
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
                <Button
                  fontSize="xl"
                  colorScheme="blue"
                  variant="outline"
                  fontWeight="medium"
                  p="6"
                >
                  <HStack spacing="1">
                    <BsFillCartPlusFill size="24px" />
                    <Text>Thêm vào giỏ hàng</Text>
                  </HStack>
                </Button>

                <Button
                  p="6"
                  fontSize="xl"
                  colorScheme="blue"
                  fontWeight="medium"
                >
                  Mua ngay
                </Button>
              </HStack>
            </VStack>
          </HStack>
        </Box>
        <Box
          marginX="4"
          marginTop="2"
          paddingY="4"
          paddingX="6"
          border="1px solid rgba(0,0,0,0.1)"
          borderRadius="8"
        >
          <Heading fontSize="2xl" paddingY="2">
            Mô tả sản phẩm
          </Heading>
          <Text>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum
            reprehenderit consectetur minima in praesentium laudantium
            assumenda, eos provident odit veniam quis debitis, sit aliquid,
            repudiandae corrupti tempora rem? Deleniti fugit at sapiente animi
            vitae quidem praesentium, ullam aliquid optio fuga exercitationem
            dolor in excepturi veniam mollitia delectus cumque dolores
            perspiciatis sequi quod sint. Est fugit voluptate libero sequi non
            dolorem fugiat aperiam, possimus error quos officiis veritatis!
            Repellendus alias consequuntur quasi omnis explicabo non dolor esse
            nihil vero, totam neque sapiente nulla hic corporis soluta
            aspernatur quaerat aut praesentium? Mollitia magni non sequi, vitae
            sint at labore nesciunt minus cum.
          </Text>
        </Box>
      </Box>
    </Card>
  );
};

export default ShopProductDetail;
