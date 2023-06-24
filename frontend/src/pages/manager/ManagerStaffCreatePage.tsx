import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  HStack,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Wrap,
  WrapItem,
  Avatar,
  Textarea,
  VStack,
  Image,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import managerStaffService, {
  ManagerStaffDTO,
} from "../../services/manager-staff-service";

const schema = z.object({
  username: z
    .string({
      required_error: "Vui lòng nhập tên đăng nhập.",
      invalid_type_error: "First name must be a string",
    })
    .min(6, {
      message: "Vui lòng nhập tên đăng nhập ít nhất 6 kí tự.",
    }),

  lastName: z
    .string({
      required_error: "Vui lòng nhập Tên.",
      invalid_type_error: "First name must be a string",
    })
    .min(6, {
      message: "Vui lòng nhập tên đầy đủ ít nhất 6 kí tự.",
    }),
  email: z
    .string({
      required_error: "Vui lòng nhập Email.",
      invalid_type_error: "First name must be a string",
    })
    .email("Vui lòng nhập đúng địa chỉ email."),
  phone: z
    .string({
      required_error: "Vui lòng nhập số điện thoại.",
      invalid_type_error: "First name must be a string",
    })
    .min(10, {
      message: "Số điện thoại phải từ 10 số trở lên",
    }),

  address: z.string({
    required_error: "Vui lòng nhập địa chỉ.",
    invalid_type_error: "First name must be a string",
  }),

  yob: z.string({
    required_error: "Vui lòng nhập năm sinh.",
    invalid_type_error: "First name must be a string",
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
    console.log(staff);

    managerStaffService
      .create(staff)
      .then((res) => {
        setUserId(res.data.id);
        navigate("/staff");
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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card marginX="200" marginY="6" p="8" border="1px lightgray solid">
          <HStack justifyContent="space-between">
            <VStack alignItems="start">
              <HStack>
                <Heading size="lg" colorScheme="black">
                  {"Tạo mới nhân viên"}
                </Heading>
              </HStack>
            </VStack>

            <HStack>
              <Button type="submit" colorScheme="blue" size="md">
                Hoàn tất
              </Button>
              <Button
                colorScheme="red"
                size="md"
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

          <VStack flex="1" h="100%" px="8" spacing="4" marginTop="8px">
            <Wrap>
              <Box>
                <WrapItem justifyContent="center">
                  <Avatar size="2xl" border="1px lightgray solid" />{" "}
                </WrapItem>
                <Heading
                  size="sm"
                  textAlign="center"
                  marginBottom="4"
                  marginTop="8"
                >
                  {/* {errors.username} */}
                </Heading>
              </Box>
            </Wrap>
            <Heading
              className="border-b"
              style={{ border: "1px lightgray solid", width: "800px" }}
              marginTop="20px"
            ></Heading>
          </VStack>

          <Box marginLeft="50px" marginTop="30px" marginRight="100px">
            <FormControl marginTop="50px">
              <HStack justifyContent="space-between">
                <FormLabel size="md" fontWeight="bold">
                  Tên Đăng Nhập
                </FormLabel>
                <Box maxW="520px" flex="1">
                  <Input
                    w="100%"
                    {...register("username")}
                    color="black"
                    placeholder="Tên Đăng Nhập"
                    fontWeight="bold"
                  />
                  {errors.username && (
                    <p className="form-error-message">
                      {errors.username?.message}
                    </p>
                  )}
                </Box>
              </HStack>
            </FormControl>

            <FormControl marginTop="50px">
              <HStack justifyContent="space-between">
                <FormLabel size="md" fontWeight="bold">
                  Tên
                </FormLabel>
                <Input
                  {...register("lastName")}
                  maxW="450px"
                  color="black"
                  placeholder="Tên"
                  fontWeight="bold"
                />
              </HStack>
              {errors.lastName && (
                <p className="form-error-message">{errors.lastName?.message}</p>
              )}
            </FormControl>

            <FormControl marginTop="50px">
              <HStack justifyContent="space-between">
                <FormLabel size="md" fontWeight="bold">
                  Email
                </FormLabel>
                <Input
                  {...register("email")}
                  maxW="450px"
                  color="black"
                  placeholder="Email"
                  fontWeight="bold"
                />
              </HStack>
              {errors.email && (
                <p className="form-error-message">{errors.email?.message}</p>
              )}
            </FormControl>
            <FormControl marginTop="50px">
              <HStack justifyContent="space-between">
                <FormLabel size="md" fontWeight="bold">
                  Số Điện Thoại
                </FormLabel>
                <Input
                  {...register("phone")}
                  maxW="450px"
                  color="black"
                  placeholder="Số Điện Thoại"
                  fontWeight="bold"
                />
              </HStack>
              {errors.phone && (
                <p className="form-error-message">{errors.phone?.message}</p>
              )}
            </FormControl>

            <FormControl marginTop="50px">
              <HStack justifyContent="space-between">
                <FormLabel size="md" fontWeight="bold">
                  Địa Chỉ
                </FormLabel>
                <Input
                  {...register("address")}
                  maxW="450px"
                  color="black"
                  placeholder="Địa Chỉ"
                  fontWeight="bold"
                />
              </HStack>
              {errors.address && (
                <p className="form-error-message">{errors.address?.message}</p>
              )}
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

            <FormControl marginTop="50px">
              <HStack justifyContent="space-between" marginRight="350px">
                <FormLabel size="md" fontWeight="bold">
                  Năm Sinh
                </FormLabel>
                <Select
                  {...register("yob")}
                  maxW="100px"
                  color="black"
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
    </>
  );
};

export default ManagerStaffCreatePage;
