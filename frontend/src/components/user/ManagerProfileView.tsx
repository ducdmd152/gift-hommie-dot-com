import UserDTO from "../../type/UserDTO";
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import managerService, { ManagerDTO } from "../../services/manager-service";
import {
    Box, FormControl, FormLabel, Wrap, WrapItem, Avatar,
    HStack, Heading, Input, VStack
} from "@chakra-ui/react";

interface Props {
    userId: string
}

const ManagerProfileView = ({ userId }: Props) => {
    const [manager, setManager] = useState<UserDTO>(
        {} as UserDTO);

    const navigate = useNavigate();

    useEffect(() => {
        let id = userId;
        if (id == "") {
            navigate("/account");
        }
        managerService
            .get(id)
            .then((res) => {
                setManager(res.data);
            })
            .catch((err) => {
                navigate("/account");
            });
    }, [userId]);

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
                            {manager.firstName + " " + manager.lastName}
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
                            value={manager.username}
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
                            value={manager.firstName}
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
                            value={manager.lastName}
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
                            value={manager.email}
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
                            value={manager.phone}
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
                            value={manager.address}
                            fontWeight="bold"
                        />
                    </HStack>
                </FormControl>
                {/* <FormControl marginTop='50px'>
                    <HStack justifyContent='space-between' >
                        <FormLabel size="md" fontWeight="bold">
                            Gender
                        </FormLabel>
                        <RadioGroup value={manager.gender} >
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
                            value={manager.yob}
                            fontWeight="bold"
                        />
                    </HStack>
                </FormControl>
            </Box>


        </>
    )
}
export default ManagerProfileView;