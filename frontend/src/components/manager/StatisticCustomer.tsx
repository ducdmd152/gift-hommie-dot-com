import { Card } from "@chakra-ui/card";
import { Image } from "@chakra-ui/image";
import { Badge, Box, HStack, Text } from "@chakra-ui/layout";
import React from "react";
import utilService from "../../services/util-service";

const StatisticCustomer = () => {
  return (
    <Box>
      <Card flex="1" p="4">
        <Text fontSize="xl">Lượt sản phẩm bán trong ngày</Text>
        <HStack w="100%" mt="4">
          <Card w="100%" p="2">
            <HStack justifyContent={"space-between"}>
              <HStack spacing="3" className="product-card">
                <Image
                  borderRadius={"8px"}
                  boxSize="50px"
                  objectFit="cover"
                  src={utilService.getURLImageUploadPresent()}
                />
                <Text
                  fontSize="md"
                  fontWeight="bold"
                  color="dark.200"
                  letterSpacing="2px"
                >
                  <Badge fontSize="xs" colorScheme="teal">
                    {"ID >> 1"}
                  </Badge>
                  <br />
                  {"Tên sản phẩm"}
                </Text>
              </HStack>
              <Text color="teal" fontWeight={"bold"}>
                10 đã bán
              </Text>
            </HStack>
          </Card>
        </HStack>
      </Card>
      <HStack mt="2">
        <Card flex="1" p="4">
          <Text fontSize="xl">Top sản phẩm bán chạy</Text>
          <Text fontSize="md" color="gray" fontStyle={"italic"}>
            (trong tháng)
          </Text>
          <HStack w="100%" mt="4">
            <Card w="100%" p="2">
              <HStack justifyContent={"space-between"}>
                <HStack spacing="3" className="product-card">
                  <Image
                    borderRadius={"8px"}
                    boxSize="50px"
                    objectFit="cover"
                    src={utilService.getURLImageUploadPresent()}
                  />
                  <Text
                    fontSize="md"
                    fontWeight="bold"
                    color="dark.200"
                    letterSpacing="2px"
                  >
                    <Badge fontSize="xs" colorScheme="teal">
                      {"ID >> 1"}
                    </Badge>
                    <br />
                    {"Tên sản phẩm"}
                  </Text>
                </HStack>
                <Text color="teal" fontWeight={"bold"}>
                  10 đã bán
                </Text>
              </HStack>
            </Card>
          </HStack>
        </Card>
        <Card flex="1" p="4">
          <Text fontSize="xl">Top sản phẩm yêu thích</Text>
          <Text fontSize="md" color="gray" fontStyle={"italic"}>
            (trong tháng)
          </Text>
          <HStack w="100%" mt="4">
            <Card w="100%" p="2">
              <HStack justifyContent={"space-between"}>
                <HStack spacing="3" className="product-card">
                  <Image
                    borderRadius={"8px"}
                    boxSize="50px"
                    objectFit="cover"
                    src={utilService.getURLImageUploadPresent()}
                  />
                  <Text
                    fontSize="md"
                    fontWeight="bold"
                    color="dark.200"
                    letterSpacing="2px"
                  >
                    <Badge fontSize="xs" colorScheme="teal">
                      {"ID >> 1"}
                    </Badge>
                    <br />
                    {"Tên sản phẩm"}
                  </Text>
                </HStack>
                <Text color="teal" fontWeight={"bold"}>
                  10 đã bán
                </Text>
              </HStack>
            </Card>
          </HStack>
        </Card>
      </HStack>
    </Box>
  );
};

export default StatisticCustomer;
