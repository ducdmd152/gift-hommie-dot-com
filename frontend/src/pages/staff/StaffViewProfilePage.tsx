import React from "react";
import {
  Button,
  Card,
  HStack,
  VStack,
  Wrap,
  WrapItem,
  Avatar,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import UserDTO from "../../type/UserDTO";
import staffService from "../../services/staff-service";
import Swal from "sweetalert2";
import UserProfileView from "../../components/user/UserProfileView";

const StaffViewProfilePage = () => {
  const [staff, setStaff] = useState<UserDTO>({} as UserDTO);

  const navigate = useNavigate();
  useEffect(() => {
    staffService
      .get("")
      .then((res) => {
        setStaff(res.data);
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
        <UserProfileView userDTO={staff} />
      </Card>
    </>
  );
};

export default StaffViewProfilePage;
