import React from "react";
import {
  Badge, Box, Button, Card, CardBody, FormControl, FormHelperText, FormLabel, Wrap, WrapItem, Avatar,
  HStack, Heading, Input, NumberInput, NumberInputField, Select, Textarea, Radio, RadioGroup, Stack,
  VStack, Image, Flex,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import managerStaffService, {
} from "../../services/staff-product-service";
import staffProductService from "../../services/staff-product-service";

const UserProfileEdit = () => {
  return (
    <Card marginX="200" marginY="6" p="8" border="1px lightgray solid">

      <VStack flex="1" h="100%" px="8" spacing="4" marginTop='8px'>
        <Wrap justifyContent='center'>
          <WrapItem >
            <Avatar size='2xl' name='' src=''
              border="1px lightgray solid"
            />{' '}
          </WrapItem>
        </Wrap>
        <Heading size="sm" textAlign="center" marginBottom="4" marginTop='30'>
          @UserName
        </Heading>
      </VStack>
      <Heading className="border-b" style={{ border: '1px lightgray solid', width: '800px' }} marginTop='30px'>
      </Heading>

      <Box marginLeft='50px' marginTop='30px' marginRight='100px'>
        <FormControl>
          <HStack justifyContent='space-between'>
            <FormLabel size="md" fontWeight="bold" >
              Tên Đầy Đủ
            </FormLabel>
            <Input
              maxW='450px'
              color="gray"
              // value={product.name}
              fontWeight="bold"
            />
          </HStack>
        </FormControl>

        <FormControl marginTop='50px'>
          <HStack justifyContent='space-between'>
            <FormLabel size="md" fontWeight="bold" >
              Tên Đăng Nhập
            </FormLabel>
            <Input
              maxW='450px'
              color="gray"
              // value={product.name}
              fontWeight="bold"
            />
          </HStack>
        </FormControl>

        <FormControl marginTop='50px'>
          <HStack justifyContent='space-between'>
            <FormLabel size="md" fontWeight="bold" >
              Email
            </FormLabel>
            <Input
              maxW='450px'
              color="gray"
              // value={product.name}
              fontWeight="bold"
            />
          </HStack>
        </FormControl>
        <FormControl marginTop='50px'>
          <HStack justifyContent='space-between'>
            <FormLabel size="md" fontWeight="bold">
              Số Điện Thoại
            </FormLabel>
            <Input
              maxW='450px'
              color="gray"
              // value={product.name}
              fontWeight="bold"
            />
          </HStack>
        </FormControl>

        <FormControl marginTop='50px'>
          <HStack justifyContent='space-between'>
            <FormLabel size="md" fontWeight="bold">
              Địa Chỉ
            </FormLabel>
            <Input
              maxW='450px'
              color="gray"
              // value={product.name}
              fontWeight="bold"
            />
          </HStack>
        </FormControl>

        <FormControl marginTop='50px'>
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
        </FormControl>

        <FormControl marginTop='50px' >
          <HStack justifyContent='space-between' marginRight='350px'>
            <FormLabel size="md" fontWeight="bold">
              Năm Sinh
            </FormLabel>
            <Input
              placeholder="YYYY"
              maxW='100px'
              color="gray"
              // value={product.name} 
              fontWeight="bold"
            />
          </HStack>
        </FormControl>
      </Box>
      <HStack justifyContent='center' marginTop='50px' marginLeft='400px'>
        <Button type="submit" colorScheme="blue" size="md">
          Save
        </Button>
        <Link to={"/staff/detail"}>
          <Button colorScheme="red" size="md">
            Cancel
          </Button>
        </Link>
      </HStack>
    </Card>
  )
}

export default UserProfileEdit