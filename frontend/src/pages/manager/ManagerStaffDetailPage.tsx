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
      <Box border="1px lightgray solid">
        <VStack flex="1" h="100%" px="8" spacing="4" marginTop='8px'>
          <Wrap>
            <Box>
              {/* <Image
              borderRadius="8px"
              boxSize="120px"
              objectFit="cover"
            // src={productAvatarURL}
            /> */}
              <WrapItem>
                <Avatar size='xl' name='' src=''
                  border="1px lightgray solid"
                />{' '}
              </WrapItem>
              <Heading size="sm" textAlign="center" marginBottom="4">
                @UseName
              </Heading>
            </Box>
          </Wrap>
        </VStack>

        <VStack >
          <FormControl maxW="600px">
            <HStack >
              <FormLabel size="md" fontWeight="bold">
                FullName
              </FormLabel>
              <Input
                color="gray"
                // value={product.name}
                fontWeight="bold"
              />
            </HStack>
          </FormControl>

          <FormControl maxW="600px">
            <HStack>
              <FormLabel size="md" fontWeight="bold">
                UserName
              </FormLabel>
              <Input
                color="gray"
                // value={product.name}
                fontWeight="bold"
              />
            </HStack>
          </FormControl>

          <FormControl maxW="600px">
            <HStack>
              <FormLabel size="md" fontWeight="bold">
                Email
              </FormLabel>
              <Input
                color="gray"
                // value={product.name}
                fontWeight="bold"
              />
            </HStack>
          </FormControl>
          <FormControl maxW="600px">
            <HStack>
              <FormLabel size="md" fontWeight="bold">
                Phone
              </FormLabel>
              <Input
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
              <FormLabel size="md" fontWeight="bold">
                Birth Year
              </FormLabel>
              <Input
                placeholder="YYYY"
                color="gray"
                // value={product.name}
                fontWeight="bold"
              />
            </HStack>
          </FormControl>
        </VStack>

        <HStack justifyContent='center' marginTop='10px'>
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
    </>
  );


};

export default ManagerStaffDetailPage;
