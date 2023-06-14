import React from 'react'
import UserProfileEdit from '../../components/user/UserProfileEdit'
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, HStack, Heading, FormControl, FormLabel, Input, VStack, Wrap, WrapItem, Avatar } from "@chakra-ui/react";
import customerService from '../../services/customer-service';
import Swal from "sweetalert2";
import { useState, useEffect } from 'react';
import UserDTO from '../../type/UserDTO';

const CustomerEditPage = () => {
    const [customer, setCustomer] = useState<UserDTO>(
        {} as UserDTO
    )
    const navigate = useNavigate();

    useEffect(() => {
        customerService
            .get("")
            .then((res) => {
                setCustomer(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href="">Vui lòng thử lại sau</a>'
                });
            });
    }, []);

    return (
        <>
            <Card marginX="200" marginY="6" p="8" border="1px lightgray solid">
                <UserProfileEdit userDTO={customer} />
                <HStack justifyContent='center' marginTop='50px' marginLeft='400px'>
                    <Button type="submit" colorScheme="blue" size="md">
                        Save
                    </Button>
                    {/* <Link to={"/staff/detail"}> */}
                    <Button colorScheme="red" size="md"
                        onClick={() => {
                            if (
                                confirm(
                                    `Bạn muốn hủy thay đổi, thông tin sẽ không được lưu.`
                                )
                            ) {
                                navigate("/account");
                            }
                        }}
                    >
                        Cancel
                    </Button>
                    {/* </Link> */}
                </HStack>
            </Card>
        </>
    )
}

export default CustomerEditPage