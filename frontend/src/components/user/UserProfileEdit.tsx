import { useState, useEffect } from 'react'
import {
  Box, FormControl, FormLabel, Wrap, WrapItem, Avatar,
  HStack, Heading, Input, Radio, RadioGroup, Stack,
  VStack,
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

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>();

  return (
    <>
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
              color="gray"
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
              color="gray"
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
              color="gray"
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
              color="gray"
              {...register("email", { required: true })}
              defaultValue={userDTO.email}
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
              color="gray"
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
              color="gray"
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
                  <Radio value='1'>Male</Radio>
                  <Radio value='2'>Female</Radio>
                  <Radio value='3'>Other</Radio>
                </Stack>
              </RadioGroup>
            </HStack>
          </FormControl> */}

        <FormControl marginTop='50px' >
          <HStack justifyContent='space-between' marginRight='350px'>
            <FormLabel size="md" fontWeight="bold">
              Năm Sinh
            </FormLabel>
            <Input
              placeholder="YYYY"
              maxW='100px'
              color="gray"
              {...register("yob", { required: true })}
              defaultValue={userDTO.yob}
              fontWeight="bold"
            />
          </HStack>
        </FormControl>
      </Box>
    </>
  )
}

export default UserProfileEdit