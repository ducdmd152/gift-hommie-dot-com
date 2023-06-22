import {
  Badge, Box, Button, Card, CardBody, FormControl, FormHelperText, FormLabel, Radio, RadioGroup, Stack,
  HStack, Heading, Input, NumberInput, NumberInputField, Select, Wrap, WrapItem, Avatar,
  Textarea, VStack, Image, Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, set, useForm } from "react-hook-form";
import managerStaffService, { ManagerStaffDTO } from "../../services/manager-staff-service";

const schema = z.object({
  username: z
    .string({
      required_error: "Vui lòng nhập tên đăng nhập.",
      invalid_type_error: "Vui lòng nhập tên đăng nhập",
    }),
  // firstName: z.string({
  //   required_error: "Vui lòng nhập Họ.",
  //   invalid_type_error: "First name must be a string",
  // }),
  lastName: z.string({
    required_error: "Vui lòng nhập Tên.",
    invalid_type_error: "Vui lòng nhập Tên",
  }),
  email: z.string({
    required_error: "Vui lòng nhập Email.",
    invalid_type_error: "Vui lòng nhập Email",
  }),
  phone: z
    .string({
      required_error: "Vui lòng nhập số điện thoại.",
      invalid_type_error: "Vui lòng nhập số điện thoại",
    }),

  address: z.string({
    required_error: "Vui lòng nhập địa chỉ.",
    invalid_type_error: "Vui lòng nhập địa chỉ",
  }),

  yob: z.number({
    required_error: "Vui lòng nhập năm sinh.",
    invalid_type_error: "Vui lòng nhập năm sinh",
  }),
});

type FormData = z.infer<typeof schema>;

interface Props {
  setUserId: (id: string) => void;
}
const ManagerStaffCreatePage = ({ setUserId }: Props) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    const staff = data as ManagerStaffDTO;
    staff.id = "";


    managerStaffService
      .create(staff)
      .then((res) => {
        setUserId(res.data.id);
        navigate("/staff/detail");
      })
      .catch(() => {
        alert(
          `Không thể tạo mới nhân viên "${staff.username}". \n Vui lòng thử lại.`
        );
        navigate("/staff/create");
      });
  };

  const years = [];
  for (let year = 1900; year <= 2023; year++) {
    years.push(year.toString());
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card marginX="200" marginY="6" p="8" border="1px lightgray solid">
        <HStack justifyContent="space-between">
          <VStack alignItems="start">
            <HStack>
              <Heading size="lg" colorScheme="gray">
                {"Tạo mới nhân viên"}
              </Heading>
            </HStack>
          </VStack>

          <HStack>
            <Button type="submit" colorScheme="blue" size="md">
              Hoàn tất
            </Button>

            <Button colorScheme="red" size="md"
              onClick={() => {
                if (
                  confirm(
                    `Bạn muốn hủy thay đổi, thông tin sẽ không được lưu.`
                  )
                ) {
                  navigate("/staff");
                }
              }}
            >
              Hủy
            </Button>
          </HStack>
        </HStack>


        <VStack flex="1" h="100%" px="8" spacing="4" marginTop='8px'>
          <Wrap>
            <Box>
              <WrapItem justifyContent='center'>
                <Avatar size='2xl'
                  border="1px lightgray solid"
                />{' '}
              </WrapItem>
              <Heading size="sm" textAlign="center" marginBottom="4" marginTop='8'>
                {/* {errors.username} */}
              </Heading>
            </Box>
          </Wrap>
          <Heading className="border-b" style={{ border: '1px lightgray solid', width: '800px' }} marginTop='20px'>
          </Heading>
        </VStack>


        <Box marginLeft='50px' marginTop='30px' marginRight='100px'>
          <FormControl marginTop='50px'>
            <HStack justifyContent='space-between'>
              <FormLabel size="md" fontWeight="bold" >
                Tên Đăng Nhập
              </FormLabel>
              <Input
                maxW='450px'
                color="gray"
                placeholder="Tên Đăng Nhập"
                {...register("username")}
                // value={errors.username}
                fontWeight="bold"
              />
              {/* {errors.username && (
                <p className="form-error-message">{errors.username?.message}</p>
              )} */}
            </HStack>
          </FormControl>

          {/* <FormControl marginTop='50px'>
            <HStack justifyContent='space-between'>
              <FormLabel size="md" fontWeight="bold" >
                Họ
              </FormLabel>
              <Input
                maxW='450px'
                color="gray"
                placeholder="Họ"
                {...register("firstName")}
                // value={product.name}
                fontWeight="bold"
              />
              {errors.firstName && (
                <p className="form-error-message">{errors.firstName?.message}</p>
              )}
            </HStack>
          </FormControl> */}

          <FormControl marginTop='50px'>
            <HStack justifyContent='space-between'>
              <FormLabel size="md" fontWeight="bold" >
                Tên
              </FormLabel>
              <Input
                maxW='450px'
                color="gray"
                placeholder="Tên"
                {...register("lastName")}
                // value={product.name}
                fontWeight="bold"
              />
              {/* {errors.lastName && (
                <p className="form-error-message">{errors.lastName?.message}</p>
              )} */}
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
                placeholder="Email"
                {...register("email")}
                // value={product.name}
                fontWeight="bold"
              />
              {/* {errors.email && (
                <p className="form-error-message">{errors.email?.message}</p>
              )} */}
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
                placeholder="Số Điện Thoại"
                {...register("phone")}
                // value={product.name}
                fontWeight="bold"
              />
              {/* {errors.phone && (
                <p className="form-error-message">{errors.phone?.message}</p>
              )} */}
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
                placeholder="Địa Chỉ"
                {...register("address")}
                // value={product.name}
                fontWeight="bold"
              />
              {/* {errors.address && (
                <p className="form-error-message">{errors.address?.message}</p>
              )} */}
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
                // value={staff.yob}
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

      </Card>
    </form>
  )
};

export default ManagerStaffCreatePage;
