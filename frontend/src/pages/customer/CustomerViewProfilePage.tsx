import React from "react";
import { useState, useEffect } from 'react';
import UserDTO from "../../type/UserDTO";
import { Link, useNavigate } from "react-router-dom";
import userService, { HttpUser } from "../../services/user-service";
import { Button, Card, HStack, Heading, FormControl, FormLabel, Input, VStack, Wrap, WrapItem, Avatar } from "@chakra-ui/react";
import UserProfileView from "../../components/user/UserProfileView";
import customerService from "../../services/customer-service";
import Swal from "sweetalert2";

interface Props {
  userId: string
}
const CustomerViewProfilePage = ({ userId }: Props) => {
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
        <HStack justifyContent='flex-end' marginTop='10px'>
          <Link to={""}>
            <Button colorScheme="blue" size="md">
              Chỉnh sửa
            </Button>
          </Link>
        </HStack>
        {/* <CustomerProfileView userId={userId} /> */}
        <UserProfileView userDTO={customer} />
      </Card>
    </>
  )
};

export default CustomerViewProfilePage;
