import {
  Badge, Box, Button, Card, CardBody, FormControl, FormHelperText, FormLabel, Radio, RadioGroup, Stack,
  HStack, Heading, Input, NumberInput, NumberInputField, Select, Wrap, WrapItem, Avatar,
  Textarea, VStack, Image, Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";


const ManagerStaffCreatePage = () => {
  return (

    <Card marginX="200" marginY="6" p="8" border="1px lightgray solid">
      <HStack justifyContent="space-between">
        <VStack alignItems="start">
          {/* <Badge variant="outline" display="inline-block">
            {"id >> " + "new"}
          </Badge> */}
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
            <Button colorScheme="red" size="md">
              Hủy
            </Button>
          </Link>
        </HStack>
      </HStack>


      <VStack flex="1" h="100%" px="8" spacing="4" marginTop='8px'>
        <Wrap>
          <Box>
            <WrapItem justifyContent='center'>
              <Avatar size='2xl'
                border="1px lightgray solid"
              />{' '}
            </WrapItem>
            <Heading size="sm" textAlign="center" marginBottom="4" marginTop='8'>
              @UserName
            </Heading>
          </Box>
        </Wrap>
        <Heading className="border-b" style={{ border: '1px lightgray solid', width: '800px' }} marginTop='20px'>
        </Heading>
      </VStack>


      <Box marginLeft='50px' marginTop='30px' marginRight='100px'>
        <FormControl marginTop='50px'>
          <HStack justifyContent='space-between'>
            <FormLabel size="md" fontWeight="bold" >
              Tên Đăng Nhập
            </FormLabel>
            <Input
              maxW='450px'
              color="gray"
              placeholder="Tên Đăng Nhập"
              // value={product.name}
              fontWeight="bold"
            />
          </HStack>
        </FormControl>

        <FormControl marginTop='50px'>
          <HStack justifyContent='space-between'>
            <FormLabel size="md" fontWeight="bold" >
              Họ
            </FormLabel>
            <Input
              maxW='450px'
              color="gray"
              placeholder="Họ"
              // value={product.name}
              fontWeight="bold"
            />
          </HStack>
        </FormControl>

        <FormControl marginTop='50px'>
          <HStack justifyContent='space-between'>
            <FormLabel size="md" fontWeight="bold" >
              Tên
            </FormLabel>
            <Input
              maxW='450px'
              color="gray"
              placeholder="Tên"
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
              placeholder="Email"
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
              placeholder="Số Điện Thoại"
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
              placeholder="Địa Chỉ"
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

    </Card>
  )
};

export default ManagerStaffCreatePage;
