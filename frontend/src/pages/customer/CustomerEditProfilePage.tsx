import React from 'react'
import UserProfileEdit from '../../components/user/UserProfileEdit'
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, HStack, Heading, FormControl, FormLabel, Input, VStack, Wrap, WrapItem, Avatar } from "@chakra-ui/react";
import customerService from '../../services/customer-service';
import Swal from "sweetalert2";
import { useState, useEffect } from 'react';
import UserDTO from '../../type/UserDTO';
import { FieldValues, useForm } from "react-hook-form";


interface FormData extends UserDTO { }

const CustomerEditProfilePage = () => {
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

    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors, isValid },
    // } = useForm<FormData>();

    // const onSubmit = (data: FieldValues) => {
    //     const updateCustomer = data as UserDTO;
    //     updateCustomer.id = customer.id;
    //     console.log(updateCustomer);

    //     customerService
    //         .update(updateCustomer)
    //         .then(() => {
    //             navigate("/account");
    //         })
    //         .catch(() => {
    //             alert(`Không thể sửa thông tin của "${customer.username}".\n Vui lòng thử lại.`);
    //         });
    // };


    return (
        <>
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <Card marginX="200" marginY="6" p="8" border="1px lightgray solid">

                <UserProfileEdit userDTO={customer} />
            </Card>
            {/* </form> */}
        </>
    )
}

export default CustomerEditProfilePage