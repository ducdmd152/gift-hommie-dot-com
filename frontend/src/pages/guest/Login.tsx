import { Button } from "@chakra-ui/button";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { Input } from "@chakra-ui/input";
import { Flex, HStack, Heading, Text } from "@chakra-ui/layout";
import { useContext, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import authService from "../../services/auth-service";
import { useNavigate } from "react-router-dom";
import { VStack } from "@chakra-ui/react";
import navigationService from "../../services/navigation-service";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { GLOBAL_CONTEXT } from "../../App";
const schema = z.object({
  username: z
    .string({
      required_error: "Vui lòng nhập tên đăng nhập.",
      invalid_type_error: "First name must be a string",
    })
    .min(3, {
      message: "Vui lòng nhập tên đăng nhập ít nhất 3 kí tự.",
    }),
  password: z
    .string({
      required_error: "Vui lòng nhập mật khẩu.",
      invalid_type_error: "First name must be a string",
    })
    .min(6, {
      message: "Vui lòng nhập mật khẩu ít nhất 6 kí tự.",
    }),
});

type FormData = z.infer<typeof schema>;
const Login = () => {
  const navigate = useNavigate();
  const reload = useContext(GLOBAL_CONTEXT).rerender;
  const onAuthenticated = () => {
    reload();
    navigate("/");
  };

  let authenticated = sessionStorage.getItem("USER");
  if (authenticated) {
    onAuthenticated();
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [loginStatus, setLoginStatus] = useState("");
  const formBackground = useColorModeValue("gray.100", "gray.700");

  const onSubmit = (data: FieldValues) => {
    const checkLogin = async () => {
      const { username, password } = data;
      let res = await authService.login(username, password);
      if (res) {
        onAuthenticated();
      } else {
        setLoginStatus("Tên đăng nhập hoặc mật khẩu không đúng.");
      }
    };

    checkLogin();
  };

  return (
    <>
      <Flex h="100vh" alignItems="center" justifyContent="center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex
            flexDirection="column"
            bg={formBackground}
            paddingY={4}
            paddingX={8}
            borderRadius={8}
            boxShadow="lg"
            width="400px"
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
              Đăng nhập
            </Heading>
            <Input
              placeholder="Tên đăng nhập"
              {...register("username", { required: true })}
              type="text"
              variant="filled"
              mb={3}
              border="gray 1px solid"
            />

            <Input
              {...register("password", { required: true })}
              placeholder="Mật khẩu"
              type="password"
              variant="filled"
              mb={6}
              border="gray 1px solid"
            />

            <Text color="tomato" fontStyle="italic" mt={0} mb={2}>
              {loginStatus}
            </Text>

            <Button
              colorScheme="teal"
              mb={8}
              type="submit"
              onClick={() => {
                if (errors.password) {
                  setLoginStatus(errors.password.message as string);
                }
                if (errors.username) {
                  setLoginStatus(errors.username.message as string);
                }
              }}
            >
              Đăng nhập
            </Button>

            <HStack color="gray.400" marginX="auto">
              <Text>Bạn chưa đăng kí tài khoản?</Text>
              <Button
                color="teal"
                fontWeight="500"
                variant="link"
                // onClick={() => setRoute("register")}
              >
                Đăng kí
              </Button>
            </HStack>

            <Button
              onClick={() => navigationService.backToHome()}
              marginTop="4"
              alignSelf={"center"}
              colorScheme="teal"
              variant="ghost"
              size="sm"
              fontWeight="light"
              mb={8}
              type="submit"
            >
              Quay về trang chủ
            </Button>
          </Flex>
        </form>
      </Flex>
    </>
  );
};

export default Login;
