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

interface Props {
  userDTO: AccountDTO;
}
interface FormData extends AccountDTO {}

const UserProfileEdit = ({ userDTO }: Props) => {
  const [user, setUser] = useState<AccountDTO>({} as AccountDTO);
  const [address, setAddress] = useState(userDTO.address);
  const [yob, setYob] = useState(userDTO.yob);
  const navigate = useNavigate();

  console.log("UserDTO: ", userDTO);

  console.log("Address before: " + address);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>();

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
            <HStack justifyContent="space-between">
              <FormLabel size="md" fontWeight="bold">
                Tên Đăng Nhập
              </FormLabel>
              <Input
                maxW="450px"
                isReadOnly
                color="black"
                value={userDTO.username}
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
                {...register("lastName", { required: true })}
                maxW="450px"
                color="black"
                defaultValue={userDTO.lastName}
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
                {...register("email", { required: true })}
                maxW="450px"
                isReadOnly
                color="black"
                value={userDTO.email}
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
                {...register("phone", { required: true })}
                maxW="450px"
                color="black"
                defaultValue={userDTO.phone}
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
                {...register("address")}
                maxW="450px"
                color="black"
                defaultValue={userDTO.address}
                onChange={(e) => setAddress(e.target.value)}
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

          <FormControl marginTop="50px">
            <HStack justifyContent="space-between" marginRight="350px">
              <FormLabel size="md" fontWeight="bold">
                Năm Sinh
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
                    // selected={userDTO.yob.toString() == year}
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
      </form>
    </>
  );
};

export default UserProfileEdit;
