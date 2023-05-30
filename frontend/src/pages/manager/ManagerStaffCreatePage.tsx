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
            <Button colorScheme="red" size="md">
              Hủy
            </Button>
          </Link>
        </HStack>
      </HStack>

      <Box>
        <VStack flex="1" h="100%" px="8" spacing="4" marginTop='8px'>
          <Wrap>
            <Box>
              <WrapItem justifyContent='center'>
                <Avatar size='2xl'
                  border="1px lightgray solid"
                />{' '}
              </WrapItem>
              {/* <Heading size="sm" textAlign="center" marginBottom="4" marginTop='8'>
                @UserName
              </Heading> */}

            </Box>
          </Wrap>
        </VStack>
        <FormControl maxW='550px'>
          <HStack marginTop='20px' marginLeft='200px'>
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
          </HStack>
        </FormControl>
        <Heading className="border-b" style={{ border: '1px lightgray solid', width: '800px' }} marginTop='20px'>
        </Heading>
        <VStack marginTop='10'>
          <FormControl maxW="700px">
            <HStack >
              <FormLabel size="md" fontWeight="bold" marginRight='100px'>
                FullName
              </FormLabel>
              <Input
                color="gray"
                // value={product.name}
                fontWeight="bold"
              />
            </HStack>
          </FormControl>

          <FormControl maxW="700px">
            <HStack marginTop='20'>
              <FormLabel size="md" fontWeight="bold" marginRight='90px'>
                UserName
              </FormLabel>
              <Input
                color="gray"
                // value={product.name}
                fontWeight="bold"
              />
            </HStack>
          </FormControl>

          <FormControl maxW="700px">
            <HStack marginTop='20'>
              <FormLabel size="md" fontWeight="bold" marginRight='130px'>
                Email
              </FormLabel>
              <Input
                color="gray"
                // value={product.name}
                fontWeight="bold"
              />
            </HStack>
          </FormControl>
          <FormControl maxW="700px">
            <HStack marginTop='20'>
              <FormLabel size="md" fontWeight="bold" marginRight='123px'>
                Phone
              </FormLabel>
              <Input
                color="gray"
                // value={product.name}
                fontWeight="bold"
              />
            </HStack>
          </FormControl>

          <FormControl maxW="400px">
            <HStack marginTop='20'>
              <FormLabel size="md" fontWeight="bold" marginLeft='-150px' marginRight='130px'>
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

        </VStack>
        <FormControl maxW="400px">
          <HStack marginTop='20' >
            <FormLabel size="md" fontWeight="bold" marginLeft='60px' marginRight='130px'>
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
      </Box>
    </Card>
  )
};

export default ManagerStaffCreatePage;
