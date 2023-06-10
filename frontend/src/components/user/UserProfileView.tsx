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

interface Props {
  userId: string;
}
const UserProfileView = ({ userId }: Props) => {
  const [staff, setStaff] = useState<ManagerStaffDTO>({} as ManagerStaffDTO);
  const navigate = useNavigate();

  useEffect(() => {
    let id = userId;
    if (id == "") {
      navigate("/staff");
    }
    managerStaffService
      .get(id)
      .then((res) => {
        setStaff(res.data);
      })
      .catch((err) => {
        navigate("/staff");
      });
  }, []);

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
              {staff.firstName + " " + staff.lastName}
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
              value={staff.username}
              fontWeight="bold"
            />
          </HStack>
        </FormControl>

        <FormControl marginTop="50px">
          <HStack justifyContent="space-between">
            <FormLabel size="md" fontWeight="bold">
              Họ
            </FormLabel>
            <Input
              maxW="450px"
              isReadOnly
              color="gray"
              value={staff.firstName}
              fontWeight="bold"
            />
          </HStack>
        </FormControl>

        <FormControl marginTop="50px">
          <HStack justifyContent="space-between">
            <FormLabel size="md" fontWeight="bold">
              Tên
            </FormLabel>
            <Input
              maxW="450px"
              isReadOnly
              color="gray"
              value={staff.lastName}
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
              value={staff.email}
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
              value={staff.phone}
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
              value={staff.address}
              fontWeight="bold"
            />
          </HStack>
        </FormControl>
        {/* <FormControl>
                            <FormLabel size="md" fontWeight="bold">
                                Gender
                            </FormLabel>
                            <RadioGroup >
                                <Stack direction='row'>
                                    <Radio value='1'>Male</Radio>
                                    <Radio value='2'>Female</Radio>
                                    <Radio value='3'>Other</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl> */}
        <FormControl marginTop="50px">
          <HStack justifyContent="space-between" marginRight="350px">
            <FormLabel size="md" fontWeight="bold">
              Năm Sinh
            </FormLabel>
            <Input
              maxW="100px"
              isReadOnly
              color="gray"
              value={staff.yob}
              fontWeight="bold"
            />
          </HStack>
        </FormControl>
      </Box>

      {/* </Card> */}
    </>
  );
};

export default UserProfileView;
