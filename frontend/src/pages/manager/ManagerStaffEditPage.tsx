import { useState, useEffect } from 'react'
import UserProfileEdit from "../../components/user/UserProfileEdit";
import managerStaffService, { ManagerStaffDTO } from '../../services/manager-staff-service';
import { Link, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from "react-hook-form";
import {
  Badge, Box, Button, Card, CardBody, FormControl, FormHelperText, FormLabel, HStack,
  Heading, Input, NumberInput, NumberInputField, Select, Textarea, VStack,
  Image, Flex, WrapItem, Wrap, Avatar, Radio, RadioGroup, Stack
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import UserDTO from '../../type/UserDTO';
import staffService from '../../services/staff-service';

interface FormData extends UserDTO { }

const ManagerStaffEditPage = () => {
  const [staff, setStaff] = useState<UserDTO>(
    {} as UserDTO
  );

  const navigate = useNavigate();

  useEffect(() => {

    managerStaffService
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

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const onSubmit = (data: FieldValues) => {
    const updateStaff = data as UserDTO;
    updateStaff.id = staff.id;
    console.log(updateStaff);

    managerStaffService
      .update(updateStaff)
      .then(() => {
        navigate("staff/edit");
      })
      .catch(() => {
        alert(`Không thể sửa thông tin của "${staff.username}".\n Vui lòng thử lại.`);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card marginX="200" marginY="6" p="8" border="1px lightgray solid">

          <UserProfileEdit userDTO={staff} />

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
                  navigate("/staff/detail");
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
};

export default ManagerStaffEditPage;
