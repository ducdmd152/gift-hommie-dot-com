import { Button } from "@chakra-ui/button";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { Input } from "@chakra-ui/input";
import { Flex, HStack, Heading, Text } from "@chakra-ui/layout";
import { FieldValues, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import authService from "../../services/auth-service";
import { Box, Radio, RadioGroup, Stack, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import utilService from "../../services/util-service";

const Register = () => {
  let authenticated = sessionStorage.getItem("user");
  if (authenticated) {
    //setRoute("community");
    return null;
    // useEffect(() => {
    //   setTimeout(() => setRoute("community"), 100);
    // });
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const [registerStatus, setRegisterStatus] = useState("");

  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");

  const onSubmit = (data: FieldValues) => {
    const checkRegister = async () => {
      const { username, password, passwordAgain, gender } = data;
      if (username.length == 0 || password.length == 0) {
        setRegisterStatus("All fields are required.");
        return;
      }

      if (password !== passwordAgain) {
        setRegisterStatus("Password is not matched with the confirm.");
        return;
      }

      let res = await authService.register(
        username,
        password,
        gender === "male"
      );

      if (res) {
        //setRoute("community");
      } else {
        setRegisterStatus("Fail to register, try again.");
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
                  {...register("lastName", { required: true })}
                  type="text"
                  variant="outline"
                  mb={3}
                />
              </VStack>
              <VStack alignItems={"flex-start"} width="100%">
                <Box fontWeight={"bold"} fontStyle="italic">
                  Tên đăng nhập *
                </Box>
                <Input
                  width="100%"
                  // placeholder="Tên đăng nhập..."
                  {...register("username", { required: true })}
                  type="text"
                  variant="outline"
                  mb={3}
                />
              </VStack>

              <VStack alignItems={"flex-start"} width="100%">
                <Box fontWeight={"bold"} fontStyle="italic">
                  Mật khẩu *
                </Box>
                <Input
                  width="100%"
                  // placeholder="Mật khẩu..."
                  {...register("password", { required: true })}
                  type="text"
                  variant="outline"
                  mb={3}
                />
              </VStack>

              <VStack alignItems={"flex-start"} width="100%">
                <Box fontWeight={"bold"} fontStyle="italic">
                  Xác nhận lại mật khẩu *
                </Box>
                <Input
                  width="100%"
                  // placeholder="Xác nhận lại mật khẩu..."
                  {...register("repeatPassword", { required: true })}
                  type="text"
                  variant="outline"
                  mb={3}
                />
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
              <Text>Already have an account?</Text>
              <Link to="/login">
                <Button
                  color="teal"
                  fontWeight="500"
                  variant={"link"}
                  // onClick={() => setRoute("login")}
                >
                  Login
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
