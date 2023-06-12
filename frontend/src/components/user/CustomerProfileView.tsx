import UserDTO from "../../type/UserDTO";
import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import customerService from "../../services/customer-service";
import {
    Badge, Box, Button, Card, CardBody, FormControl, FormHelperText, FormLabel, Wrap, WrapItem, Avatar,
    HStack, Heading, Input, NumberInput, NumberInputField, Select, Textarea, Radio, RadioGroup, Stack,
    VStack, Image, Flex, Grid,
} from "@chakra-ui/react";

interface Props {
    userId: string;
}

const CustomerProfileView = ({ userId }: Props) => {
    const [customer, setCustomer] = useState<UserDTO>(
        {} as UserDTO);

    const navigate = useNavigate();

    useEffect(() => {
        let id = userId;
        if (id == "") {
            navigate("/account");
        }
        customerService
            .get(id)
            .then((res) => {
                setCustomer(res.data);
            })
            .catch((err) => {
                navigate("/account");
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
                            {customer.firstName + " " + customer.lastName}
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
                            value={customer.username}
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
                            value={customer.firstName}
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
                            value={customer.lastName}
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
                            value={customer.email}
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
                            value={customer.phone}
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
                            value={customer.address}
                            fontWeight="bold"
                        />
                    </HStack>
                </FormControl>
                {/* <FormControl marginTop='50px'>
                    <HStack justifyContent='space-between' >
                        <FormLabel size="md" fontWeight="bold">
                            Gender
                        </FormLabel>
                        <RadioGroup value={customer.gender} >
                            <Stack direction='row' spacing={100}>
                                <Radio value='Male'>Male</Radio>
                                <Radio value='Female'>Female</Radio>
                                <Radio value='Other'>Other</Radio>
                            </Stack>
                        </RadioGroup>
                    </HStack>
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
                            value={customer.yob}
                            fontWeight="bold"
                        />
                    </HStack>
                </FormControl>
            </Box>


        </>
    );
}
export default CustomerProfileView;