import { useState, useEffect, useRef } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Wrap,
  WrapItem,
  Avatar,
  HStack,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  VStack,
  Button,
  Select,
} from "@chakra-ui/react";
import managerStaffService, {
  ManagerStaffDTO,
} from "../../services/manager-staff-service";
import { useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import UserDTO from "../../type/UserDTO";
import accountService, { AccountDTO } from "../../services/account-service";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
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
        message: "Số điện thoại phải từ 10 số trở lên.",
      }),

    address: z.string({
      required_error: "Vui lòng nhập địa chỉ.",
      invalid_type_error: "First name must be a string",
    }),

    yob: z.string({
      required_error: "Vui lòng nhập năm sinh.",
      invalid_type_error: "First name must be a string",
    }),
  })
  .refine(
    (data) => {
      let phone = data?.phone;
      if (phone === undefined || phone.length === 0) {
        return true;
      }
      return phone.match(
        /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
      );
    },
    { message: "Số điện thoại không hợp lệ.", path: ["phone"] }
  );

interface Props {
  userDTO: AccountDTO;
}
interface FormData extends AccountDTO { }

const UserProfileEdit = ({ userDTO }: Props) => {
  const [user, setUser] = useState<AccountDTO>({} as AccountDTO);
  const [address, setAddress] = useState(userDTO.address);
  const [yob, setYob] = useState(userDTO.yob);
  const navigate = useNavigate();

  // console.log("UserDTO: ", userDTO);

  // console.log("Address before: " + address);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    let updateUser = data as UserDTO;
    updateUser.username = userDTO.username;
    updateUser.id = "";
    if (!address) updateUser.address = userDTO.address;
    if (!yob) updateUser.yob = userDTO.yob;

    // console.log("Address: " + address);

    // console.log("Updating: ", updateUser);
    // console.log(user);

    accountService
      .update(updateUser)
      .then(() => {
        navigate("/account");
      })
      .catch(() => {
        alert(
          `Không thể sửa thông tin của "${userDTO.username}".\n Vui lòng thử lại.`
        );
      });
  };

  const years = [];
  for (let year = 1900; year <= 2023; year++) {
    years.push(year);
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack flex="1" h="100%" px="8" spacing="4" marginTop="8px">
          <Wrap justifyContent="center">
            <WrapItem>
              <Avatar size="2xl" name="" src="" border="1px lightgray solid" />{" "}
            </WrapItem>
          </Wrap>
          <Heading size="sm" textAlign="center" marginBottom="4" marginTop="30">
            {userDTO.firstName + " " + userDTO.lastName}
          </Heading>
        </VStack>
        <Heading
          className="border-b"
          style={{ border: "1px lightgray solid", width: "800px" }}
          marginTop="30px"
        ></Heading>

        <Box marginLeft="50px" marginTop="30px" marginRight="100px">
          <FormControl marginTop="50px">
            <HStack justifyContent="space-between" alignItems={"flex-start"}>
              <FormLabel size="md" fontWeight="bold" mt="3">
                Tên đăng nhập
              </FormLabel>
              <Box maxW="450px" flex="1">
                <Input
                  w="100%"
                  isReadOnly
                  color="black"
                  value={userDTO.username}
                  fontWeight="bold"
                />
              </Box>
            </HStack>
          </FormControl>

          <FormControl marginTop="50px">
            <HStack justifyContent="space-between" alignItems={"flex-start"}>
              <FormLabel size="md" fontWeight="bold" mt="3">
                Tên
              </FormLabel>
              <Box maxW="450px" flex="1">
                <Input
                  {...register("lastName")}
                  w="100%"
                  color="black"
                  defaultValue={userDTO.lastName}
                  fontWeight="bold"
                />
                {errors.lastName && (
                  <p className="form-error-message">{errors.lastName?.message}</p>
                )}
              </Box>
            </HStack>
          </FormControl>

          <FormControl marginTop="50px">
            <HStack justifyContent="space-between" alignItems={"flex-start"}>
              <FormLabel size="md" fontWeight="bold" mt="3">
                Email
              </FormLabel>
              <Box maxW="450px" flex="1">
                <Input
                  {...register("email")}
                  w="100%"
                  isReadOnly
                  color="black"
                  defaultValue={userDTO.email}
                  fontWeight="bold"
                />
                {errors.email && (
                  <p className="form-error-message">{errors.email?.message}</p>
                )}
              </Box>
            </HStack>
          </FormControl>
          <FormControl marginTop="50px">
            <HStack justifyContent="space-between" alignItems={"flex-start"}>
              <FormLabel size="md" fontWeight="bold" mt="3">
                Số điện thoại
              </FormLabel>
              <Box maxW="450px" flex="1">
                <Input
                  {...register("phone")}
                  w="100%"
                  color="black"
                  defaultValue={userDTO.phone}
                  fontWeight="bold"
                />
                {errors.phone && (
                  <p className="form-error-message">{errors.phone?.message}</p>
                )}
              </Box>
            </HStack>
          </FormControl>

          <FormControl marginTop="50px">
            <HStack justifyContent="space-between" alignItems={"flex-start"}>
              <FormLabel size="md" fontWeight="bold" mt="3">
                Địa chỉ
              </FormLabel>
              <Box maxW="450px" flex="1">
                <Input
                  {...register("address")}
                  w="100%"
                  color="black"
                  defaultValue={userDTO.address}
                  onChange={(e) => setAddress(e.target.value)}
                  fontWeight="bold"
                />
                {/* {errors.address && (
                  <p className="form-error-message">{errors.address?.message}</p>
                )} */}
              </Box>
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

          <FormControl marginTop="50px">
            <HStack justifyContent="space-between" marginRight="350px">
              <FormLabel size="md" fontWeight="bold" mt="3">
                Năm sinh
              </FormLabel>
              <Select
                {...register("yob")}
                maxW="100px"
                color="black"
                defaultValue={userDTO.yob}
                fontWeight="bold"
                placeholder="Chọn năm sinh"
                onChange={(e) => {
                  let method = parseInt(e.target.value);
                  userDTO.yob = method;
                }}
              >
                {years.map((year) => (
                  <option
                    key={year}
                    value={year}
                    // onClick={(e) => {
                    //   setYob(year);
                    //   console.log(yob);
                    // }}
                    selected={userDTO.yob == year}
                  >
                    {year}
                  </option>
                ))}
              </Select>
            </HStack>
          </FormControl>
          <HStack justifyContent="center" marginTop="50px" marginLeft="400px">
            <Button type="submit" colorScheme="blue" size="md">
              Cập nhật
            </Button>
            <Button
              colorScheme="red"
              size="md"
              onClick={() => {
                if (
                  confirm(`Bạn muốn hủy thay đổi, thông tin sẽ không được lưu.`)
                ) {
                  navigate("/account");
                }
              }}
            >
              Hủy
            </Button>
          </HStack>
        </Box>
      </form >
    </>
  );
};

export default UserProfileEdit;
