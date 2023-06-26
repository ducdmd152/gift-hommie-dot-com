import { Card } from "@chakra-ui/card";
import { Image } from "@chakra-ui/image";
import { Badge, Box, HStack, Text } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import utilService from "../../services/util-service";
import { Avatar } from "@chakra-ui/avatar";
import StatisticCustomerDTO from "../../type/StatisticCustomerDTO";
import statisticService from "../../services/statistic-service";
import { VStack } from "@chakra-ui/react";
import moneyService from "../../services/money-service";
import { FcNeutralTrading } from "react-icons/fc";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

const StatisticCustomer = ({ overview }: { overview?: boolean }) => {
  const [customer, setCustomer] = useState({} as StatisticCustomerDTO);
  useEffect(() => {
    (async () => {
      setCustomer(await statisticService.getCustomer());
      // console.log(customer?.amountDTO?.userTopAmountDTOList[0]);
    })();
  }, []);
  return (
    <Box>
      {/* <Card flex="1" p="4">
        <Text fontSize="xl">Khách hàng đặt đơn hôm nay</Text>
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
      <HStack mt="2" alignItems={"flex-start"}>
        <Card flex="1" p="4">
          <HStack>
            <Text fontSize="xl" color="teal" fontWeight={"bold"}>
              Top khách hàng tiềm năng
            </Text>
            <FcNeutralTrading />
          </HStack>
          <Text fontSize="md" color="gray" fontStyle={"italic"}>
            (theo tổng đơn)
          </Text>
          <VStack w="100%" mt="4">
            {customer?.order?.userTopOrderDTOList?.map((data) => {
              const user = data.user;
              const list = data.orderList;
              return (
                <Card w="100%" p="2">
                  <HStack justifyContent={"space-between"}>
                    <HStack spacing="3" className="product-card">
                      <Avatar
                        // borderRadius={"8px"}
                        boxSize="50px"
                        objectFit="cover"
                        src={user.avatar}
                      />
                      <Text
                        fontSize="md"
                        fontWeight="bold"
                        color="dark.200"
                        letterSpacing="2px"
                      >
                        <Badge
                          fontSize="xs"
                          colorScheme="teal"
                          className="none-text-transform"
                        >
                          {"@" + user.id}
                        </Badge>
                        <br />
                        {user.firstName + " " + user.lastName}
                      </Text>
                    </HStack>
                    <Text color="teal" fontSize="sm" fontWeight={"bold"} mr="4">
                      {list.reduce(
                        (cnt, item) =>
                          item.status == "SUCCESSFUL" ? cnt + 1 : cnt,
                        0
                      )}{" "}
                      đơn hàng thành công
                    </Text>
                  </HStack>
                </Card>
              );
            })}
          </VStack>
        </Card>
        {!overview && (
          <Card flex="1" p="4">
            <HStack>
              <Text fontSize="xl" color="teal" fontWeight={"bold"}>
                Top khách hàng tiềm năng
              </Text>
              <RiMoneyDollarCircleLine color="teal.800" fontSize="2xl" />
            </HStack>
            <Text fontSize="md" color="gray" fontStyle={"italic"}>
              (theo tổng tiền)
            </Text>
            <VStack w="100%" mt="4">
              {customer?.amountDTO?.userTopAmountDTOList?.map((data) => {
                const user = data.user;
                const amount = data.amount;

                return (
                  <Card w="100%" p="2">
                    <HStack justifyContent={"space-between"}>
                      <HStack spacing="3" className="product-card">
                        <Avatar
                          // borderRadius={"8px"}
                          boxSize="50px"
                          objectFit="cover"
                          src={user.avatar}
                        />
                        <Text
                          fontSize="md"
                          fontWeight="bold"
                          color="dark.200"
                          letterSpacing="2px"
                        >
                          <Badge
                            fontSize="xs"
                            colorScheme="teal"
                            className="none-text-transform"
                          >
                            {"@" + user.id}
                          </Badge>
                          <br />
                          {user.firstName + " " + user.lastName}
                        </Text>
                      </HStack>
                      <Text
                        color="teal"
                        fontSize="sm"
                        fontWeight={"bold"}
                        mr="4"
                      >
                        {moneyService.getVND(amount)}{" "}
                      </Text>
                    </HStack>
                  </Card>
                );
              })}
            </VStack>
          </Card>
        )}
      </HStack>
    </Box>
  );
};

export default StatisticCustomer;
