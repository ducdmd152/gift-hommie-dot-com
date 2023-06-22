import {
  Box,
  Center,
  FormLabel,
  HStack,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import utilService from "../../services/util-service";
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { set, z } from "zod";
import authService from "../../services/auth-service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import resetPasswordService from "../../services/reset-password-serivce";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const schema = z
  .object({
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
  });

type PasswordFormData = z.infer<typeof schema>;

const GuestForgotPasswordPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PasswordFormData>({ resolver: zodResolver(schema) });

  if (step == 1)
    return (
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Bạn quên mật khẩu của mình?
          </Heading>
          <Text
            fontSize={{ base: "sm", sm: "md" }}
            //   color={useColorModeValue("gray.800", "gray.400")}
            fontStyle={"italic"}
            color={"teal.500"}
          >
            Nhập email tài khoản của bạn để đặt lại mật khẩu
          </Text>
          <FormControl id="email">
            <Input
              placeholder="Nhập email tài khoản của bạn..."
              _placeholder={{ color: "gray.500" }}
              type="email"
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
            />
          </FormControl>
          <Text color="tomato" fontStyle="italic" mt={1} mb={2}>
            {error}
          </Text>
          <Stack spacing={6}>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={async () => {
                // console.log("email");
                if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
                  setError("Vui lòng nhập đúng định dạng của email.");
                  return;
                }

                if (await authService.noneExistEmail(email)) {
                  setError("Email chưa được đăng ký.");
                  return;
                }
                setStep(2);
                if (await resetPasswordService.sendRequest(email)) {
                } else {
                  setStep(1);
                  setError("Yêu cầu thất bại!");
                }
              }}
            >
              Gửi
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );

  if (step == 2)
    return (
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={10}
        >
          <Center>
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
              Xác thực email của bạn
            </Heading>
          </Center>
          <Center
            fontSize={{ base: "sm", sm: "md" }}
            color={useColorModeValue("gray.800", "gray.400")}
          >
            Đã gửi mã code xác thực đến email của bạn
          </Center>
          <Center
            fontSize={{ base: "sm", sm: "md" }}
            fontWeight="bold"
            color={useColorModeValue("gray.800", "gray.400")}
          >
            {email}
          </Center>
          <FormControl mt="4">
            <Center>
              <HStack>
                <Input
                  type="text"
                  textAlign={"center"}
                  placeholder="Nhập mã xác thực..."
                  onChange={(e) => setCode(e.currentTarget.value)}
                />
              </HStack>
            </Center>
          </FormControl>
          <Text
            textAlign="center"
            color="tomato"
            fontStyle="italic"
            mt={1}
            mb={2}
          >
            {error}
          </Text>
          <Stack spacing={6}>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={async (e) => {
                if (await resetPasswordService.checkCode(email, code))
                  setStep(3);
                else setError("Mã code vừa nhập không đúng hoặc đã hết hạn!");
              }}
            >
              Xác thực
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    // IF 200
    if (await resetPasswordService.resetPassword(email, code, data.password)) {
      setStep(4);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Đặt lại mật khẩu thành công.",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/login");
      return;
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Hết hạn thời gian xác thực.",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/");
    }
  };

  if (step == 3)
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
            my={12}
          >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
              Đặt lại mật khẩu
            </Heading>
            <FormControl isRequired>
              <FormLabel>Mật khẩu mới</FormLabel>
              <Input
                {...register("password")}
                type="password"
                _placeholder={{ color: "gray.500" }}
              />
              <p className="form-error-message">{errors.password?.message}</p>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Xác nhận mật khẩu</FormLabel>
              <Input {...register("confirmPassword")} type="password" />
              <p className="form-error-message">
                {errors.confirmPassword?.message}
              </p>
            </FormControl>

            <Stack spacing={6}>
              <Button
                type="submit"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Đặt lại
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </form>
    );

  return <div>Nothing here</div>;
};

export default GuestForgotPasswordPage;
