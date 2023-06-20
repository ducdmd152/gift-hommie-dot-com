import { Box } from "@chakra-ui/react";
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

const GuestForgotPasswordPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

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

  return <div>Nothing here</div>;
};

export default GuestForgotPasswordPage;
