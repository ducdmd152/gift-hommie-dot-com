
import React from "react";
import {
    Badge, Box, Button, Card, CardBody, FormControl, FormHelperText, FormLabel, Wrap, WrapItem, Avatar,
    HStack, Heading, Input, NumberInput, NumberInputField, Select, Textarea, Radio, RadioGroup, Stack,
    VStack, Image, Flex, Grid
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const UserProfileView = () => {
    return (
        <>
            <Link to="/staff">
                <Button colorScheme="teal" size="sm" ml="12">
                    {"<< Danh sách nhân viên"}
                </Button>
            </Link>
            <Card marginX="200" marginY="6" p="8" border="1px lightgray solid">
                <HStack justifyContent='flex-end' marginTop='10px'>
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

                <VStack flex="1" h="100%" px="8" spacing="4" marginTop='8px'>
                    <Wrap>
                        <Box>
                            <WrapItem justifyContent='center'>
                                <Avatar size='2xl' name='' src=''
                                    border="1px lightgray solid"
                                />{' '}
                            </WrapItem>
                            <Heading size="sm" textAlign="center" marginBottom="4" marginTop='8' >
                                @UserName
                            </Heading>
                            <Heading className="border-b" style={{ border: '1px lightgray solid', width: '800px' }}>
                            </Heading>
                        </Box>
                    </Wrap>
                </VStack>

                <Box marginLeft='50px' marginTop='30px' marginRight='100px'>
                    <FormControl>
                        <HStack justifyContent='space-between'>
                            <FormLabel size="md" fontWeight="bold" >
                                Tên Đầy Đủ
                            </FormLabel>
                            <Input
                                maxW='450px'
                                isReadOnly
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
                                isReadOnly
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
                                isReadOnly
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
                    <FormControl marginTop='50px'>
                        <HStack justifyContent='space-between' marginRight='350px'>
                            <FormLabel size="md" fontWeight="bold">
                                Năm Sinh
                            </FormLabel>
                            <Input
                                maxW='100px'
                                isReadOnly
                                color="gray"
                                // value={product.name}
                                fontWeight="bold"
                            />
                        </HStack>
                    </FormControl>
                </Box>
            </Card>
        </>
    );
}

export default UserProfileView