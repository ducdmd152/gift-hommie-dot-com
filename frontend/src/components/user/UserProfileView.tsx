
import React from "react";
import {
    Badge, Box, Button, Card, CardBody, FormControl, FormHelperText, FormLabel, Wrap, WrapItem, Avatar,
    HStack, Heading, Input, NumberInput, NumberInputField, Select, Textarea, Radio, RadioGroup, Stack,
    VStack, Image, Flex, Grid
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { ManagerStaffDTO } from "../../services/manager-staff-service";

interface Props {
    staffs: ManagerStaffDTO[];
}

const UserProfileView = ({ staffs }: Props) => {
    return (
        <>
            <VStack flex="1" h="100%" px="8" spacing="4" marginTop='8px'>
                <Wrap>
                    <Box>
                        <WrapItem justifyContent='center'>
                            <Avatar size='2xl' name='' src=''
                                border="1px lightgray solid"
                            />{' '}
                        </WrapItem>
                        <Heading size="sm" textAlign="center" marginBottom="4" marginTop='8' >
                            {staffs[0]?.username}
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
                            Tên Đăng Nhập
                        </FormLabel>
                        <Input
                            maxW='450px'
                            isReadOnly
                            color="gray"
                            value={staffs[0]?.username}
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
                            isReadOnly
                            color="gray"
                            value={staffs[0]?.firstName}
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
                            isReadOnly
                            color="gray"
                            value={staffs[0]?.lastName}
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
                            value={staffs[0]?.email}
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
                            value={staffs[0]?.phone}
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
                            isReadOnly
                            color="gray"
                            value={staffs[0]?.address}
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
                            value={staffs[0]?.yob}
                            fontWeight="bold"
                        />
                    </HStack>
                </FormControl>
            </Box>

            {/* </Card> */}
        </>
    );
}

export default UserProfileView