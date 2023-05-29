import {
  Badge, Box, Button, Card, CardBody, FormControl, FormHelperText, FormLabel,
  HStack, Heading, Input, NumberInput, NumberInputField, Select,
  Textarea, VStack, Image, Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";


const ManagerStaffCreatePage = () => {
  return (
    <>
      <Link to="/staff">
        <Button colorScheme="teal" size="sm" ml="12">
          {"<< Danh sách nhân viên"}
        </Button>
      </Link>
      <form>
        <Card marginX="12" marginY="8" p="8" border="1px lightgray solid">
          <HStack justifyContent="space-between">
            <VStack alignItems="start">
              <Badge variant="outline" display="inline-block">
                {"id >> " + "new"}
              </Badge>
              <HStack>
                <Heading size="lg" colorScheme="gray">
                  {"Tạo mới nhân viên"}
                </Heading>
              </HStack>
            </VStack>

            <HStack>
              <Button type="submit" colorScheme="blue" size="md">
                Hoàn tất
              </Button>
              <Link to={"/staff"}>
                <Button colorScheme="red" variant="outline" size="md">
                  Hủy
                </Button>
              </Link>
            </HStack>
          </HStack>
          <VStack mt={6} p="4">
            <Flex width="100%" gap="8">
              <VStack spacing="8" flex="1">
                <FormControl>
                  <FormLabel size="md" fontWeight="bold">
                    UserName
                  </FormLabel>
                  <Input
                    //{...register("name", { required: true, minLength: 3 })}
                    color="black"
                    placeholder="UserName..."
                    fontWeight="bold"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel size="md" fontWeight="bold">
                    FirstName
                  </FormLabel>
                  <Input
                    // {...register("name", { required: true, minLength: 3 })}
                    color="black"
                    placeholder="FirstName..."
                    fontWeight="bold"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel size="md" fontWeight="bold">
                    LastName
                  </FormLabel>
                  <Input
                    // {...register("name", { required: true, minLength: 3 })}
                    color="black"
                    placeholder="LastName..."
                    fontWeight="bold"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel size="md" fontWeight="bold">
                    Số điện thoại
                  </FormLabel>
                  <Input
                    // {...register("price", { required: true, min: 1000 })}
                    color="black"
                    type="number"
                    min={1000}
                    placeholder="Phone..."
                    fontWeight="bold"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel size="md" fontWeight="bold">
                    Năm Sinh
                  </FormLabel>
                  <Input
                    // {...register("quantity", {
                    //   required: true,
                    //   min: 0,
                    // })}
                    color="black"
                    type="number"
                    min={0}
                    placeholder="Năm sinh..."
                    fontWeight="bold"
                  />
                </FormControl>


                <FormControl>
                  <FormLabel size="md" fontWeight="bold">
                    Email
                  </FormLabel>
                  <Input
                    // {...register("name", { required: true, minLength: 3 })}
                    color="black"
                    placeholder="Email..."
                    fontWeight="bold"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel size="md" fontWeight="bold">
                    Địa chỉ
                  </FormLabel>
                  <Input
                    // {...register("name", { required: true, minLength: 3 })}
                    color="black"
                    placeholder="Address..."
                    fontWeight="bold"
                  />
                </FormControl>

              </VStack>
              <VStack flex="1" h="100%" px="8" spacing="8">
                <Box>
                  <Image
                    borderRadius="8px"
                    boxSize="240px"
                    objectFit="cover"
                  // src={productAvatarURL}
                  />
                </Box>

                <FormControl>
                  <FormLabel size="md" fontWeight="bold">
                    IMAGE URL
                  </FormLabel>
                  <Input
                    // {...register("avatar", {
                    //   // required: true,
                    // })}
                    color="black"
                    // value={productAvatarURL}
                    // onChange={(event) => {
                    //   setProductAvatarURL(event.target.value);
                    // }}
                    fontWeight="bold"
                  />
                </FormControl>
              </VStack>
            </Flex>
          </VStack>
        </Card>
      </form>
    </>
  );
};

export default ManagerStaffCreatePage;
