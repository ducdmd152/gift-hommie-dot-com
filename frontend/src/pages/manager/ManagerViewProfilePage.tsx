import React from "react";
import { Button, Card, HStack } from "@chakra-ui/react";
import UserDTO from "../../type/UserDTO";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import managerService from "../../services/manager-service";
import Swal from "sweetalert2";
import UserProfileView from "../../components/user/UserProfileView";

const ManagerViewProfilePage = () => {
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
  return (
    <>
      <Card marginX="200" marginY="6" p="8" border="1px lightgray solid">
        <UserProfileView userDTO={manager} />
      </Card>
    </>
  )
};

export default ManagerViewProfilePage;
