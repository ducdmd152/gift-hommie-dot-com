import UserDTO from "../../type/UserDTO";
import React from 'react'
import UserProfileEdit from '../../components/user/UserProfileEdit'
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, HStack, Heading, FormControl, FormLabel, Input, VStack, Wrap, WrapItem, Avatar } from "@chakra-ui/react";
import Swal from "sweetalert2";
import { useState, useEffect } from 'react';
import managerService from "../../services/manager-service";
import { FieldValues, useForm } from "react-hook-form";

interface FormData extends UserDTO { }

const ManagerEditProfilePage = () => {
    const [manager, setManager] = useState<UserDTO>(
        {} as UserDTO
    )
    const navigate = useNavigate();

    useEffect(() => {
        managerService
            .get("")
            .then((res) => {
                setManager(res.data);
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

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormData>();

    const onSubmit = (data: FieldValues) => {
        const updateManager = data as UserDTO;
        updateManager.id = manager.id;
        console.log(updateManager);

        managerService
            .update(updateManager)
            .then(() => {
                navigate("/edit");
            })
            .catch(() => {
                alert(`Không thể sửa thông tin của "${manager.username}".\n Vui lòng thử lại.`);
            });
    };


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card marginX="200" marginY="6" p="8" border="1px lightgray solid">

                    <UserProfileEdit userDTO={manager} />

                    <HStack justifyContent='center' marginTop='50px' marginLeft='400px'>
                        <Button type="submit" colorScheme="blue" size="md">
                            Cập nhật
                        </Button>
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
                            Hủy
                        </Button>
                    </HStack>
                </Card>
            </form>
        </>
    )
}
export default ManagerEditProfilePage