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
import { set } from "zod";
import authService from "../../services/auth-service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const GuestForgotPasswordPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
                console.log("email");
                if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
                  setError("Vui lòng nhập đúng định dạng của email.");
                  return;
                }

                if (await authService.noneExistEmail(email)) {
                  setError("Email chưa được đăng ký.");
                  return;
                }

                setStep(2);
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
          maxW={"sm"}
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
                />
              </HStack>
            </Center>
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={(e) => {
                setCode(e.currentTarget.value);
                // Send email + code => BE => Receive STATUS
                // If 200
                setStep(3);
              }}
            >
              Xác thực
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );

  if (step == 3)
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
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Đặt lại mật khẩu
          </Heading>
          <FormControl isRequired>
            <FormLabel>Mật khẩu mới</FormLabel>
            <Input _placeholder={{ color: "gray.500" }} type="email" />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Xác nhận mật khẩu</FormLabel>
            <Input type="password" />
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={() => {
                // SEND email + code + password => BE => STATUS

                if (true) {
                  // IF 200
                  setStep(4);
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Đặt lại mật khẩu thành công.",
                    showConfirmButton: false,
                    timer: 2000,
                  });
                  navigate("/login");
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
              }}
            >
              Đặt lại
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );

  return <div>Nothing here</div>;
};

export default GuestForgotPasswordPage;
