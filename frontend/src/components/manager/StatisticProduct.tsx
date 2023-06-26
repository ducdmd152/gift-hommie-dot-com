import { Card } from "@chakra-ui/card";
import { Image } from "@chakra-ui/image";
import { Badge, Box, HStack, Text } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import utilService from "../../services/util-service";
import StatisticProductDTO from "../../type/StatisticProductDTO";
import statisticService from "../../services/statistic-service";
import { VStack } from "@chakra-ui/react";
import { Rating } from "react-simple-star-rating";
import { FcNeutralTrading } from "react-icons/fc";
import { BiBadgeCheck } from "react-icons/bi";

const StatisticProduct = ({ overview }: { overview?: boolean }) => {
  const [product, setProduct] = useState({} as StatisticProductDTO);
  useEffect(() => {
    (async () => {
      setProduct(await statisticService.getProduct());
    })();
  }, []);

  return (
    <Box>
      {/* <Card flex="1" p="4">
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
      </Card> */}
      <HStack mt="2" alignItems={"stretch"}>
        <Card flex="1" p="4">
          <HStack>
            <Text fontSize="xl" color="teal" fontWeight={"bold"}>
              Top sản phẩm bán chạy
            </Text>
            <FcNeutralTrading />
          </HStack>

          <Text fontSize="md" color="gray" fontStyle={"italic"}>
            (trong tháng)
          </Text>
          <VStack w="100%" mt="4" spacing={2}>
            {product?.month?.value?.topSale.map((pro, index) =>
              index < 20 ? (
                <Card w="100%" p="2" border="teal 1px sold">
                  <HStack justifyContent={"space-between"}>
                    <HStack spacing="3" className="product-card">
                      <Image
                        borderRadius={"8px"}
                        boxSize="50px"
                        objectFit="cover"
                        src={
                          pro.avatar || utilService.getURLImageUploadPresent()
                        }
                      />
                      <Text
                        fontSize="md"
                        fontWeight="bold"
                        color="dark.200"
                        letterSpacing="2px"
                      >
                        <Badge fontSize="xs" colorScheme="teal">
                          {"ID >> " + pro.id}
                        </Badge>
                        <br />
                        {pro.name}
                      </Text>
                    </HStack>
                    <Text color="teal" fontWeight={"bold"}>
                      {pro.sold} đã bán
                    </Text>
                  </HStack>
                </Card>
              ) : (
                <></>
              )
            )}
          </VStack>
        </Card>
        {!overview && (
          <Card flex="1" p="4">
            <HStack>
              <Text fontSize="xl" color="teal" fontWeight={"bold"}>
                Top sản phẩm yêu thích
              </Text>
              <BiBadgeCheck color="green" fontSize="xl" />
            </HStack>
            <Text fontSize="md" color="gray" fontStyle={"italic"}>
              (trong tháng)
            </Text>
            <VStack w="100%" mt="4" spacing={2}>
              {product?.month?.value?.topRating.map((pro, index) =>
                index < 20 ? (
                  <Card w="100%" p="2">
                    <HStack justifyContent={"space-between"}>
                      <HStack spacing="3" className="product-card">
                        <Image
                          borderRadius={"8px"}
                          boxSize="50px"
                          objectFit="cover"
                          src={
                            pro.avatar || utilService.getURLImageUploadPresent()
                          }
                        />
                        <Text
                          fontSize="md"
                          fontWeight="bold"
                          color="dark.200"
                          letterSpacing="2px"
                        >
                          <Badge fontSize="xs" colorScheme="teal">
                            {"ID >> " + pro.id}
                          </Badge>
                          <br />
                          {pro.name}
                        </Text>
                      </HStack>
                      <Text color="teal" fontWeight={"bold"}>
                        <Rating initialValue={5} size={18} readonly={true} />
                      </Text>
                    </HStack>
                  </Card>
                ) : (
                  <></>
                )
              )}
            </VStack>
          </Card>
        )}
      </HStack>
    </Box>
  );
};

export default StatisticProduct;
