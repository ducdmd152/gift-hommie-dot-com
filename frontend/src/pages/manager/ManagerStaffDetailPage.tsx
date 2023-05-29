import React from "react";
import {
  Badge, Box, Button, Card, CardBody, FormControl, FormHelperText, FormLabel, Wrap, WrapItem, Avatar,
  HStack, Heading, Input, NumberInput, NumberInputField, Select, Textarea,
  VStack, Image, Flex,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import managerStaffService, {
} from "../../services/staff-product-service";
import staffProductService from "../../services/staff-product-service";


const ManagerStaffDetailPage = () => {
  return (
    <>
      <Link to="/staff">
        <Button colorScheme="teal" size="sm" ml="12">
          {"<< Danh sách nhân viên"}
        </Button>
      </Link>
      <Card marginX="20" marginY="6" p="8" border="1px lightgray solid">
        <Box >
          <VStack flex="1" h="100%" px="8" spacing="4" marginTop='8px'>
            <Wrap>
              <Box>
                <WrapItem>
                  <Avatar size='xl' name='' src=''
                    border="1px lightgray solid"
                  />{' '}
                </WrapItem>
                <Heading size="sm" textAlign="center" marginBottom="4">
                  @UserName
                </Heading>
              </Box>
            </Wrap>
          </VStack>

          <VStack >
            <FormControl maxW="600px">
              <HStack >
                <FormLabel size="md" fontWeight="bold" marginRight='100px'>
                  FullName
                </FormLabel>
                <Input
                  isReadOnly
                  color="gray"
                  // value={product.name}
                  fontWeight="bold"
                />
              </HStack>
            </FormControl>

            <FormControl maxW="600px">
              <HStack>
                <FormLabel size="md" fontWeight="bold" marginRight='90px'>
                  UserName
                </FormLabel>
                <Input
                  isReadOnly
                  color="gray"
                  // value={product.name}
                  fontWeight="bold"
                />
              </HStack>
            </FormControl>

            <FormControl maxW="600px">
              <HStack>
                <FormLabel size="md" fontWeight="bold" marginRight='130px'>
                  Email
                </FormLabel>
                <Input
                  isReadOnly
                  color="gray"
                  // value={product.name}
                  fontWeight="bold"
                />
              </HStack>
            </FormControl>
            <FormControl maxW="600px">
              <HStack>
                <FormLabel size="md" fontWeight="bold" marginRight='123px'>
                  Phone
                </FormLabel>
                <Input
                  isReadOnly
                  color="gray"
                  // value={product.name}
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
            <FormControl maxW="600px" >
              <HStack>
                <FormLabel size="md" fontWeight="bold" marginRight='120px'>
                  Birth Year
                </FormLabel>
                <Input
                  isReadOnly
                  color="gray"
                  // value={product.name}
                  fontWeight="bold"
                />
              </HStack>
            </FormControl>
          </VStack>

          <HStack justifyContent='center' marginLeft='400px' marginTop='10px'>
            <Link to={"/staff/edit"}>
              <Button colorScheme="blue" size="md">
                Chỉnh sửa
              </Button>
            </Link>
            <Button
              colorScheme="red"
              size="md"
            >
              Xóa
            </Button>
          </HStack>
        </Box>
      </Card>
    </>
  );


};

export default ManagerStaffDetailPage;
