import { Button } from "@chakra-ui/button";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { Input } from "@chakra-ui/input";
import { Flex, HStack, Heading, Text } from "@chakra-ui/layout";
import { FieldValues, useForm } from "react-hook-form";
import { useContext, useState } from "react";
import authService from "../../services/auth-service";
import { Box, VStack } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import utilService from "../../services/util-service";
import { GLOBAL_CONTEXT } from "../../App";
import UserDTO from "../../type/UserDTO";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
const schema = z
  .object({
    name: z
      .string({
        required_error: "Vui lòng nhập tên.",
        invalid_type_error: "First name must be a string",
      })
      .min(6, {
        message: "Vui lòng nhập tên đầy đủ ít nhất 6 kí tự.",
      }),
    email: z
      .string({
        required_error: "Vui lòng nhập email của bạn.",
        invalid_type_error: "First name must be a string",
      })
      .email("Vui lòng nhập đúng địa chỉ email."),
    username: z
      .string({
        required_error: "Vui lòng nhập tên đăng nhập.",
        invalid_type_error: "First name must be a string",
      })
      .min(6, {
        message: "Vui lòng nhập tên đăng nhập ít nhất 6 kí tự.",
      }),
    password: z
      .string({
        required_error: "Vui lòng nhập mật khẩu.",
        invalid_type_error: "First name must be a string",
      })
      .min(6, {
        message: "Vui lòng nhập mật khẩu ít nhất 6 kí tự.",
      }),
    confirmPassword: z.string(),
    phone: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không trùng khớp.",
    path: ["confirmPassword"], // path of error
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
  )
  .refine(
    async (data) => {
      let username = data.username;
      let check = await authService.noneExistUsername(username);

      return check;
    },
    {
      message:
        "Tên đăng nhập đã tồn tại, vui lòng chọn một tên đăng nhập khác.",
      path: ["username"],
    }
  )
  .refine(
    async (data) => {
      let email = data.email;
      let check = await authService.noneExistEmail(email);

      return check;
    },
    {
      message: "Email đã tồn tại, vui lòng chọn một email khác.",
      path: ["email"],
    }
  );
type FormData = z.infer<typeof schema>;
const Register = () => {
  const navigate = useNavigate();
  const reload = useContext(GLOBAL_CONTEXT).rerender;
  const onAuthenticated = () => {
    reload();
    navigate("/");
  };

  let authenticated = utilService.getCurrentUser() as UserDTO;
  if (authenticated) {
    onAuthenticated();
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [registerStatus, setRegisterStatus] = useState("");

  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");

  const onSubmit = (data: FieldValues) => {
    const checkRegister = async () => {
      const { username, password, passwordAgain, gender } = data;

      // if (password !== passwordAgain) {
      //   setRegisterStatus("Password is not matched with the confirm.");
      //   return;
      // }

      let res = await authService.register(data as UserDTO);

      if (res) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Đăng kí tài khoản thành công",
          showConfirmButton: false,
          timer: 2000,
        });
        onAuthenticated();
      } else {
        setRegisterStatus("Đăng kí thất bại.");
      }
    };
    checkRegister();
  };

  return (
    <Box marginTop={utilService.HEADER_HEIGHT}>
      <Flex alignItems="center" justifyContent="center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex
            flexDirection="column"
            bg={formBackground}
            p={12}
            borderRadius={8}
            boxShadow="lg"
            width="480px"
            maxWidth="100%"
          >
            <Heading
              size="md"
              textAlign="center"
              letterSpacing={4}
              fontWeight="bold"
              className="logo-light"
              p={8}
            >
              HOMMIE STORE
            </Heading>
            <Heading mb={6} size="lg" textAlign="center">
              Đăng ký
            </Heading>

            <VStack spacing="2" alignItems={"flex-start"}>
              <VStack alignItems={"flex-start"} width="100%">
                <Box fontWeight={"bold"} fontStyle="italic">
                  Tên *
                </Box>
                <Input
                  width="100%"
                  // placeholder="Tên đầy đủ..."
                  {...register("name")}
                  type="text"
                  variant="outline"
                  mb={3}
                />
                <p className="form-error-message">
                  {errors.name?.message || "‎ "}
                </p>
              </VStack>
              <VStack alignItems={"flex-start"} width="100%">
                <Box fontWeight={"bold"} fontStyle="italic">
                  Email *
                </Box>
                <Input
                  width="100%"
                  // placeholder="Tên đăng nhập..."
                  {...register("email")}
                  type="text"
                  variant="outline"
                  mb={3}
                />
                <p className="form-error-message">
                  {errors.email?.message || "‎ "}
                </p>
              </VStack>
              <VStack alignItems={"flex-start"} width="100%">
                <Box fontWeight={"bold"} fontStyle="italic">
                  Tên đăng nhập *
                </Box>
                <Input
                  width="100%"
                  // placeholder="Tên đăng nhập..."
                  {...register("username")}
                  type="text"
                  variant="outline"
                  mb={3}
                />
                <p className="form-error-message">
                  {errors.username?.message || "‎ "}
                </p>
              </VStack>

              <VStack alignItems={"flex-start"} width="100%">
                <Box fontWeight={"bold"} fontStyle="italic">
                  Mật khẩu *
                </Box>
                <Input
                  type="password"
                  width="100%"
                  // placeholder="Mật khẩu..."
                  {...register("password")}
                  variant="outline"
                  mb={3}
                />
                <p className="form-error-message">
                  {errors.password?.message || "‎ "}
                </p>
              </VStack>

              <VStack alignItems={"flex-start"} width="100%">
                <Box fontWeight={"bold"} fontStyle="italic">
                  Xác nhận lại mật khẩu *
                </Box>
                <Input
                  type="password"
                  width="100%"
                  // placeholder="Xác nhận lại mật khẩu..."
                  {...register("confirmPassword")}
                  variant="outline"
                  mb={3}
                />
                <p className="form-error-message">
                  {errors.confirmPassword?.message || "‎ "}
                </p>
              </VStack>

              <VStack alignItems={"flex-start"} width="100%">
                <Box fontWeight={"bold"} fontStyle="italic">
                  Số điện thoại{" "}
                </Box>
                <Input
                  width="100%"
                  // placeholder="Xác nhận lại mật khẩu..."
                  {...register("phone")}
                  type="text"
                  variant="outline"
                  mb={3}
                />
                <p className="form-error-message">
                  {errors.phone?.message || "‎ "}
                </p>
              </VStack>

              <Text fontStyle={"italic"} color="gray" paddingTop="2">
                (*): thông tin cần phải có để hoàn thành đăng ký
              </Text>
            </VStack>

            <Text color="tomato" fontStyle="italic" mt={0} mb={2}>
              {registerStatus}
            </Text>
            <Button colorScheme="teal" mt={3} mb={8} type="submit">
              Đăng ký
            </Button>

            <HStack color="gray.400" marginX="auto">
              <Text>Bạn đã có tài khoản?</Text>
              <Link to="/login">
                <Button
                  color="teal"
                  fontWeight="500"
                  variant={"link"}
                  // onClick={() => setRoute("login")}
                >
                  Đăng nhập
                </Button>
              </Link>
            </HStack>
          </Flex>
        </form>
      </Flex>
    </Box>
  );
};

export default Register;
