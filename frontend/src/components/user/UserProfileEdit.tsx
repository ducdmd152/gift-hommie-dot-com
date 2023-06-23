import { useState, useEffect } from 'react'
import {
  Box, FormControl, FormLabel, Wrap, WrapItem, Avatar,
  HStack, Heading, Input, Radio, RadioGroup, Stack,
  VStack, Button, Select
} from "@chakra-ui/react";
import managerStaffService, { ManagerStaffDTO } from '../../services/manager-staff-service';
import { useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from "react-hook-form";
import UserDTO from '../../type/UserDTO';

interface Props {
  userDTO: UserDTO;
}
interface FormData extends UserDTO { }

const UserProfileEdit = ({ userDTO }: Props) => {
  const [staff, setStaff] = useState<UserDTO>(
    {} as UserDTO
  );

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const onSubmit = (data: FieldValues) => {
    const updateUser = data as UserDTO;
    updateUser.id = staff.id;
    console.log(updateUser);

    managerStaffService
      .update(updateUser)
      .then(() => {
        navigate("/staff");
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
        <VStack flex="1" h="100%" px="8" spacing="4" marginTop='8px'>
          <Wrap justifyContent='center'>
            <WrapItem >
              <Avatar size='2xl' name='' src=''
                border="1px lightgray solid"
              />{' '}
            </WrapItem>
          </Wrap>
          <Heading size="sm" textAlign="center" marginBottom="4" marginTop='30'>
            {userDTO.firstName + " " + userDTO.lastName}
          </Heading>
        </VStack>
        <Heading className="border-b" style={{ border: '1px lightgray solid', width: '800px' }} marginTop='30px'>
        </Heading>

        <Box marginLeft='50px' marginTop='30px' marginRight='100px'>
          <FormControl marginTop='50px'>
            <HStack justifyContent='space-between'>
              <FormLabel size="md" fontWeight="bold" >
                Tên Đăng Nhập
              </FormLabel>
              <Input
                maxW='450px'
                color="black"
                value={userDTO.username}
                fontWeight="bold"
              />
            </HStack>
          </FormControl>

          <FormControl marginTop='50px'>
            <HStack justifyContent='space-between'>
              <FormLabel size="md" fontWeight="bold" >
                Họ
              </FormLabel>
              <Input
                maxW='450px'
                color="black"
                {...register("firstName", { required: true })}
                defaultValue={userDTO.firstName}
                fontWeight="bold"
              />
            </HStack>
          </FormControl>

          <FormControl marginTop='50px'>
            <HStack justifyContent='space-between'>
              <FormLabel size="md" fontWeight="bold" >
                Tên
              </FormLabel>
              <Input
                maxW='450px'
                color="black"
                {...register("lastName", { required: true })}
                defaultValue={userDTO.lastName}
                fontWeight="bold"
              />
            </HStack>
          </FormControl>

          <FormControl marginTop='50px'>
            <HStack justifyContent='space-between'>
              <FormLabel size="md" fontWeight="bold" >
                Email
              </FormLabel>
              <Input
                maxW='450px'
                color="black"
                // {...register("email", { required: true })}
                value={userDTO.email}
                fontWeight="bold"
              />
            </HStack>
          </FormControl>
          <FormControl marginTop='50px'>
            <HStack justifyContent='space-between'>
              <FormLabel size="md" fontWeight="bold">
                Số Điện Thoại
              </FormLabel>
              <Input
                maxW='450px'
                color="black"
                {...register("phone", { required: true })}
                defaultValue={userDTO.phone}
                fontWeight="bold"
              />
            </HStack>
          </FormControl>

          <FormControl marginTop='50px'>
            <HStack justifyContent='space-between'>
              <FormLabel size="md" fontWeight="bold">
                Địa Chỉ
              </FormLabel>
              <Input
                maxW='450px'
                color="black"
                {...register("address", { required: true })}
                defaultValue={userDTO.address}
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
                  <Radio value='Male'>Male</Radio>
                  <Radio value='Female'>Female</Radio>
                  <Radio value='Other'>Other</Radio>
                </Stack>
              </RadioGroup>
            </HStack>
          </FormControl> */}

          <FormControl marginTop='50px' >
            <HStack justifyContent='space-between' marginRight='350px'>
              <FormLabel size="md" fontWeight="bold">
                Năm Sinh
              </FormLabel>
              <Select
                {...register("yob", { required: true })}
                maxW="100px"
                color="black"
                defaultValue={userDTO.yob}
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
        </Box>
      </form>
    </>
  )
}

export default UserProfileEdit