import UserDTO from "../../type/UserDTO";
import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import staffService, { StaffDTO } from "../../services/staff-service";
import {
    Badge, Box, Button, Card, CardBody, FormControl, FormHelperText, FormLabel, Wrap, WrapItem, Avatar,
    HStack, Heading, Input, NumberInput, NumberInputField, Select, Textarea, Radio, RadioGroup, Stack,
    VStack, Image, Flex, Grid,
} from "@chakra-ui/react";

interface Props {
    currentProductId: number | null
}
const StaffProfileView = ({ currentProductId }: Props) => {
    const [staff, setStaff] = useState<StaffDTO>(
        {} as StaffDTO);

    const navigate = useNavigate();

    useEffect(() => {
        let currentProductId = 0

        if (currentProductId === null || currentProductId === 0) {
            navigate("/account");
        } else {
            staffService
                .get(currentProductId)
                .then((res) => {
                    setStaff(res.data);
                })
                .catch((err) => {
                    navigate("/account");
                });
        }
    }, [currentProductId]);

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
                {/* <FormControl marginTop='50px'>
                    <HStack justifyContent='space-between' >
                        <FormLabel size="md" fontWeight="bold">
                            Gender
                        </FormLabel>
                        <RadioGroup value={staff.gender} >
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
                            value={staff.yob}
                            fontWeight="bold"
                        />
                    </HStack>
                </FormControl>
            </Box>
        </>
    )
}

export default StaffProfileView;