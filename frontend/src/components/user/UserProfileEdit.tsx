import { useState, useEffect } from 'react'
import {
  Box, FormControl, FormLabel, Wrap, WrapItem, Avatar,
  HStack, Heading, Input, Radio, RadioGroup, Stack,
  VStack,
} from "@chakra-ui/react";
import managerStaffService, { ManagerStaffDTO } from '../../services/manager-staff-service';
import { useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from "react-hook-form";

interface Props {
  userId: string
}
interface FormData extends ManagerStaffDTO { }

const UserProfileEdit = ({ userId }: Props) => {
  const [staff, setStaff] = useState<ManagerStaffDTO>(
    {} as ManagerStaffDTO
  );

  const navigate = useNavigate();

  useEffect(() => {
    let id = userId;
    if (id == "") {
      navigate("/staff");
    }
    managerStaffService
      .get(id)
      .then((res) => {
        setStaff(res.data);
      })
      .catch((err) => {
        navigate("/staff");
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const onSubmit = (data: FieldValues) => {
    const updateStaff = data as ManagerStaffDTO;
    updateStaff.id = staff.id;
    console.log(updateStaff);

    managerStaffService
      .update(updateStaff)
      .then(() => {
        navigate("/staff/detail");
      })
      .catch(() => {
        alert(`Không thể sửa thông tin của "${staff.username}".\n Vui lòng thử lại.`);
      });
  };
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
            {staff.firstName + " " + staff.lastName}
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
                {...register("username", { required: true })}
                value={staff.username}
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
                defaultValue={staff.firstName}
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
                defaultValue={staff.lastName}
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
                defaultValue={staff.email}
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
                defaultValue={staff.phone}
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
                defaultValue={staff.address}
                fontWeight="bold"
              />
            </HStack>
          </FormControl>

          <FormControl marginTop='50px'>
            <HStack justifyContent='space-between' >
              <FormLabel size="md" fontWeight="bold">
                Gender
              </FormLabel>
              <RadioGroup value={staff.gender}>
                <Stack direction='row' spacing={100}>
                  <Radio value='Male'>Male</Radio>
                  <Radio value='Female'>Female</Radio>
                  <Radio value='Other'>Other</Radio>
                </Stack>
              </RadioGroup>
            </HStack>
          </FormControl>

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
                defaultValue={staff.yob}
                fontWeight="bold"
              />
            </HStack>
          </FormControl>
        </Box>
      </form>
    </>
  )
}

export default UserProfileEdit