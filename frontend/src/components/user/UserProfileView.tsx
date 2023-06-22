import { useEffect, useState } from "react";
import React from "react";
import {
  Badge, Box, Button, Card, CardBody, FormControl, FormHelperText, FormLabel, Wrap, WrapItem, Avatar,
  HStack, Heading, Input, NumberInput, NumberInputField, Select, Textarea, Radio, RadioGroup, Stack,
  VStack, Image, Flex, Grid,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { ManagerStaffDTO } from "../../services/manager-staff-service";
import managerStaffService from "../../services/manager-staff-service";
import StaffProductMain from "../staff/staff-product-list-page/StaffProductListMain";
import { HttpUser } from "../../services/user-service";
import userService from "../../services/user-service";
import UserDTO from "../../type/UserDTO";

interface Props {
  userDTO: UserDTO;
}
const UserProfileView = ({ userDTO }: Props) => {

  const years = [];
  for (let year = 1900; year <= 2023; year++) {
    years.push(year.toString());
  }
  return (
    <>
      <VStack flex="1" h="100%" px="8" spacing="4" marginTop="8px">
        <Wrap>
          <Box>
            <WrapItem justifyContent="center">
              <Avatar size="2xl" name="" src="" border="1px lightgray solid" />{" "}
            </WrapItem>
            <Heading
              size="sm"
              textAlign="center"
              marginBottom="4"
              marginTop="8"
            >
              {userDTO.firstName + " " + userDTO.lastName}
            </Heading>
            <Heading
              className="border-b"
              style={{ border: "1px lightgray solid", width: "800px" }}
            ></Heading>
          </Box>
        </Wrap>
      </VStack>

      <Box marginLeft="50px" marginTop="30px" marginRight="100px">
        <FormControl>
          <HStack justifyContent="space-between">
            <FormLabel size="md" fontWeight="bold">
              Tên Đăng Nhập
            </FormLabel>
            <Input
              maxW="450px"
              isReadOnly
              color="gray"
              value={userDTO.username}
              fontWeight="bold"
            />
          </HStack>
        </FormControl>

        {/* <FormControl marginTop="50px">
          <HStack justifyContent="space-between">
            <FormLabel size="md" fontWeight="bold">
              Họ
            </FormLabel>
            <Input
              maxW="450px"
              isReadOnly
              color="gray"
              value={userDTO.firstName}
              fontWeight="bold"
            />
          </HStack>
        </FormControl> */}

        <FormControl marginTop="50px">
          <HStack justifyContent="space-between">
            <FormLabel size="md" fontWeight="bold">
              Tên
            </FormLabel>
            <Input
              maxW="450px"
              isReadOnly
              color="gray"
              value={userDTO.lastName}
              fontWeight="bold"
            />
          </HStack>
        </FormControl>

        <FormControl marginTop="50px">
          <HStack justifyContent="space-between">
            <FormLabel size="md" fontWeight="bold">
              Email
            </FormLabel>
            <Input
              maxW="450px"
              isReadOnly
              color="gray"
              value={userDTO.email}
              fontWeight="bold"
            />
          </HStack>
        </FormControl>
        <FormControl marginTop="50px">
          <HStack justifyContent="space-between">
            <FormLabel size="md" fontWeight="bold">
              Số Điện Thoại
            </FormLabel>
            <Input
              maxW="450px"
              isReadOnly
              color="gray"
              value={userDTO.phone}
              fontWeight="bold"
            />
          </HStack>
        </FormControl>

        <FormControl marginTop="50px">
          <HStack justifyContent="space-between">
            <FormLabel size="md" fontWeight="bold">
              Địa Chỉ
            </FormLabel>
            <Input
              maxW="450px"
              isReadOnly
              color="gray"
              value={userDTO.address}
              fontWeight="bold"
            />
          </HStack>
        </FormControl>
        {/* <FormControl marginTop='50px'>
          <HStack justifyContent='space-between' >
            <FormLabel size="md" fontWeight="bold">
              Gender
            </FormLabel>
            <RadioGroup >
              <Stack direction='row' spacing={100}>
                <Radio value='1'>Male</Radio>
                <Radio value='2'>Female</Radio>
                <Radio value='3'>Other</Radio>
              </Stack>
            </RadioGroup>
          </HStack>
        </FormControl> */}
        <FormControl marginTop="50px">
          <HStack justifyContent="space-between" marginRight="350px">
            {/* <FormLabel size="md" fontWeight="bold">
              Năm Sinh
            </FormLabel>
            <Input
              maxW="100px"
              isReadOnly
              color="gray"
              value={userDTO.yob}
              fontWeight="bold"
            /> */}

            <FormLabel size="md" fontWeight="bold">
              Năm Sinh
            </FormLabel>
            <Select
              maxW="100px"
              isReadOnly
              color="gray"
              value={userDTO.yob}
              fontWeight="bold"
            >
              {years.map((year) => (
                <option key={year} value={year} disabled>
                  {year}
                </option>
              ))}
            </Select>
          </HStack>
        </FormControl>
      </Box>

      {/* </Card> */}
    </>
  );
};

export default UserProfileView;
