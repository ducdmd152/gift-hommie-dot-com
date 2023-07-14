import { useState } from "react";
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
  VStack,
  Button,
  Select,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import accountService, { AccountDTO } from "../../services/account-service";
import Swal from "sweetalert2";
interface UserFormErrors {
  id: string;
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  yob: string;
  avatar: string;
  address: string;
}
interface Props {
  user: AccountDTO;
  setUser(user: AccountDTO): void;
}
interface FormData extends AccountDTO {}

// type FormData = z.infer<typeof schema>;

const UserProfileEdit = ({ user, setUser }: Props) => {
  const [errors, setErrors] = useState<UserFormErrors>({} as UserFormErrors);
  const navigate = useNavigate();
  //{ resolver: zodResolver(schema) }
  const onValid = () => {
    let isErrors = false;
    let tmpErrors = {} as UserFormErrors;
    if (!user.lastName) {
      isErrors = true;
      tmpErrors.lastName = "Vui lòng nhập tên ít nhất 6 kí tự.";
      // console.log(user.lastName);
    } else if (user.lastName && user.lastName.length < 6) {
      isErrors = true;
      tmpErrors.lastName = "Vui lòng nhập tên ít nhất 6 kí tự.";
    }

    if (user.yob != null && (user.yob as number) <= 0) {
      user.yob = null;
    }

    if (
      user.phone &&
      !user.phone.match(
        /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
      )
    ) {
      isErrors = true;
      tmpErrors.phone = "Vui lòng nhập số điện thoại hợp lệ.";
    } else tmpErrors.phone = "";

    setErrors(tmpErrors);
    if (isErrors) {
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    console.log("onSubmit");

    if (onValid())
      accountService
        .update(user)
        .then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Cập nhật thông tin thành công.",
            showConfirmButton: false,
            timer: 2000,
          });
          if (window.location.pathname === "/staff/edit")
            navigate("/staff/detail");
          else navigate("/account");
        })
        .catch(() => {
          alert(
            `Không thể sửa thông tin của "${user.username}".\n Vui lòng thử lại.`
          );
        });
  };

  const years = [];
  for (let year = 1900; year <= 2023; year++) {
    years.push(year);
  }
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <VStack flex="1" h="100%" px="8" spacing="4" marginTop="8px">
          <Wrap justifyContent="center">
            <WrapItem>
              <Avatar size="2xl" name="" src="" border="1px lightgray solid" />{" "}
            </WrapItem>
          </Wrap>
          <Heading size="sm" textAlign="center" marginBottom="4" marginTop="30">
            {user.firstName + " " + user.lastName}
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
                  value={user.username}
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
                  onChange={(e) => {
                    user.lastName = e.target.value;
                    onValid();
                    setUser({ ...user });
                  }}
                  w="100%"
                  color="black"
                  value={user.lastName}
                  fontWeight="bold"
                />
                {errors.lastName && (
                  <p className="form-error-message">{errors.lastName}</p>
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
                  onChange={(e) => {
                    user.email = e.target.value;
                    setUser({ ...user });
                    onValid();
                  }}
                  w="100%"
                  isReadOnly={true}
                  color="black"
                  defaultValue={user.email}
                  fontWeight="bold"
                />
                {errors.email && (
                  <p className="form-error-message">{errors.email}</p>
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
                  onChange={(e) => {
                    user.phone = e.target.value;
                    onValid();
                    setUser({ ...user });
                  }}
                  w="100%"
                  type="number"
                  color="black"
                  defaultValue={user.phone}
                  fontWeight="bold"
                />
                {<p className="form-error-message">{errors.phone}</p>}
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
                  onChange={(e) => {
                    user.address = e.target.value;
                    setUser({ ...user });
                    onValid();
                  }}
                  w="100%"
                  color="black"
                  defaultValue={user.address}
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
                defaultValue={user.yob == null ? 0 : (user.yob as number)}
                onChange={(e) => {
                  let value = parseInt(e.target.value);
                  user.yob = !value ? -1 : value;
                  setUser({
                    ...user,
                  });
                  onValid();
                }}
                maxW="100px"
                color="black"
                fontWeight="bold"
                placeholder="Chọn năm sinh"
              >
                {years.map((year) => (
                  <option
                    key={year}
                    value={year}
                    // onClick={(e) => {
                    //   setYob(year);
                    //   console.log(yob);
                    // }}
                    selected={user.yob == year}
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
              onClick={() => {
                Swal.fire({
                  title: "Bạn muốn hủy thay đổi, thông tin sẽ không được lưu.",
                  // text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes",
                }).then((result) => {
                  if (result.isConfirmed) {
                    navigate("/account");
                    window.scrollTo(0, 0);
                  }
                });
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
