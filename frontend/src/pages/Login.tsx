import { Button } from "@chakra-ui/button";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { Input } from "@chakra-ui/input";
import { Flex, HStack, Heading, Text } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import authService from "../services/auth-service";

const Login = () => {
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

  const [loginStatus, setLoginStatus] = useState("");

  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");

  const onSubmit = (data: FieldValues) => {
    const checkLogin = async () => {
      const { username, password } = data;

      // allow guest
      const guest = {
        id: 12,
        username: "guest",
        password: "123456",
      };
      if (username === guest.username && password === guest.password) {
        sessionStorage.setItem("user", JSON.stringify(guest));
        //setRoute("community");
        return;
      }

      // check real users
      if (username.length == 0 || password.length == 0) {
        setLoginStatus("Both username and password are required.");
        return;
      }
      let res = await authService.login(username, password);
      if (res) {
        //setRoute("community");
      } else {
        setLoginStatus("Username or password go to wrong.");
      }
    };
    checkLogin();
  };

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex
          flexDirection="column"
          bg={formBackground}
          p={12}
          borderRadius={8}
          boxShadow="lg"
          width="400px"
          maxWidth="100%"
        >
          <Heading mb={6}>Login</Heading>
          <Input
            placeholder="Username"
            {...register("username", { required: true })}
            type="text"
            variant="filled"
            mb={3}
          />

          <Input
            {...register("password", { required: true })}
            placeholder="**********"
            type="password"
            variant="filled"
            mb={6}
          />

          <Text color="tomato" fontStyle="italic" mt={0} mb={2}>
            {loginStatus}
          </Text>
          <Button colorScheme="teal" mb={8} type="submit">
            Login
          </Button>

          <HStack color="gray.400" marginX="auto">
            <Text>Create a new account?</Text>
            <Button
              color="gray.500"
              fontWeight="500"
              variant={"link"}
              // onClick={() => setRoute("register")}
            >
              Register
            </Button>
          </HStack>

          <Button
            mt="3"
            color="gray.400"
            fontWeight="300"
            fontStyle="italic"
            variant={"link"}
            // onClick={() => setRoute("community")}
          >
            ---Continue without login---
          </Button>

          {/* <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="dark_mode" mb="0">
            Dark Mode?
          </FormLabel>
          <Switch
            id="dark_mode"
            colorScheme="teal"
            size="lg"
            onChange={toggleColorMode}
          />
        </FormControl> */}
        </Flex>
      </form>
    </Flex>
  );
};

export default Login;
