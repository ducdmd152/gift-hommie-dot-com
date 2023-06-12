import React from "react";
import { useState, useEffect } from 'react';
import UserDTO from "../../type/UserDTO";
import { Link, useNavigate } from "react-router-dom";
import userService, { HttpUser } from "../../services/user-service";
import { Button, Card, HStack, Heading, FormControl, FormLabel, Input, VStack, Wrap, WrapItem, Avatar } from "@chakra-ui/react";
import UserProfileView from "../../components/user/UserProfileView";
import customerService from "../../services/customer-service";
import { CustomerDTO } from "../../services/customer-service";
import CustomerProfileView from "../../components/user/CustomerProfileView";

interface Props {
  userId: string
}
const CustomerViewProfilePage = ({ userId }: Props) => {
  const [customer, setCustomer] = useState<CustomerDTO>(
    {} as CustomerDTO
  )
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

  // const onDeleteCustomer = (id: string) => {
  //   if (
  //     confirm(
  //       `Bạn có muốn xóa "${customer.username}" không?`
  //     )
  //   ) {
  //     customerService
  //       .delete(customer.id)
  //       .then(() => {
  //         alert(`Đã xóa "${customer.username}".`);
  //         navigate("/customer");
  //       })
  //       .catch(() => {
  //         alert(
  //           `Không thể xóa "${customer.username}". \n Vui lòng thử lại.`
  //         );
  //       });
  //   }
  // };

  return (
    <>
      <Card marginX="200" marginY="6" p="8" border="1px lightgray solid">
        <HStack justifyContent='flex-end' marginTop='10px'>
          <Link to={""}>
            <Button colorScheme="blue" size="md">
              Chỉnh sửa
            </Button>
          </Link>

          <Button colorScheme="red" size="md"
            // onClick={() => onDeleteCustomer(customer.id)}
          >
            Xóa
          </Button>
        </HStack>
        <CustomerProfileView userId={userId} />
      </Card>
    </>
  )
};

export default CustomerViewProfilePage;
