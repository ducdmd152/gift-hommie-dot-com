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

interface Props {
  userId: string;
}
interface FormData extends UserDTO { }

const ManagerStaffEditPage = ({ userId }: Props) => {
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

  const years = [];
  for (let year = 1900; year <= 2023; year++) {
    years.push(year.toString());
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card marginX="200" marginY="6" p="8" border="1px lightgray solid">

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
            <RadioGroup >
              <Stack direction='row' spacing={100}>
                <Radio value='1'>Male</Radio>
                <Radio value='2'>Female</Radio>
                <Radio value='3'>Other</Radio>
              </Stack>
            </RadioGroup>
          </HStack>
        </FormControl> */}
            <FormControl marginTop="50px">
              <HStack justifyContent="space-between" marginRight="350px">
                {/* <FormLabel size="md" fontWeight="bold">
                  Năm Sinh
                </FormLabel>
                <Input
                  maxW="100px"
                  isReadOnly
                  color="gray"
                  value={staff.yob}
                  fontWeight="bold"
                /> */}

                <FormLabel size="md" fontWeight="bold">
                  Năm Sinh
                </FormLabel>
                <Select
                  maxW="100px"
                  isReadOnly
                  color="gray"
                  value={staff.yob}
                  fontWeight="bold"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Select>
              </HStack>
            </FormControl>
          </Box>
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
