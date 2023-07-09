import {
  Box,
  chakra,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  IconButton,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";

const Logo = (props: any) => {
  return (
    <Heading size={"xl"} color="teal">
      Hommie Store
    </Heading>
  );
};

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function Footer() {
  return (
    <Box className="child-100vw " mb="-100px">
      <Box
        bg={useColorModeValue("gray.50", "gray.900")}
        color={useColorModeValue("gray.700", "gray.200")}
      >
        <Container as={Stack} maxW={"6xl"} py={10}>
          <SimpleGrid
            templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 2fr" }}
            spacing={8}
          >
            <Stack spacing={6}>
              <Box>
                <Logo color={useColorModeValue("gray.700", "white")} />
              </Box>
              <Text fontSize={"sm"}>© 2023 Codies Team - FPTU HCM Campus</Text>
              <Text fontSize={"sm"} fontWeight={"600"}>
                Địa chỉ: Đường D1 Khu Công nghệ cao, Phường Long Thạnh Mỹ, Thủ
                Đức, TP. Hồ Chí Minh.
              </Text>
              <Stack direction={"row"} spacing={6}>
                <SocialButton label={"Twitter"} href={"#"}>
                  <FaTwitter />
                </SocialButton>
                <SocialButton label={"YouTube"} href={"#"}>
                  <FaYoutube />
                </SocialButton>
                <SocialButton label={"Instagram"} href={"#"}>
                  <FaInstagram />
                </SocialButton>
              </Stack>
            </Stack>
            <Stack align={"flex-start"}>
              <ListHeader>Cửa hàng</ListHeader>
              <Link href={"#"}>Thông tin</Link>
              <Link href={"#"}>Blog</Link>
              <Link href={"#"}>Liên hệ</Link>
              <Link href={"#"}>Đánh giá</Link>
            </Stack>
            <Stack align={"flex-start"}>
              <ListHeader>Hỗ trợ</ListHeader>
              <Link href={"#"}>Trung tâm hỗ trợ</Link>
              <Link href={"#"}>Liên hệ trực tiếp</Link>
            </Stack>
            <Stack align={"flex-start"}>
              <ListHeader>Đăng ký để nhận thông tin</ListHeader>
              <Stack direction={"row"}>
                <Input
                  placeholder={"Email của bạn..."}
                  bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
                  border={0}
                  _focus={{
                    bg: "whiteAlpha.300",
                  }}
                />
                <IconButton
                  bg={useColorModeValue("green.400", "green.800")}
                  color={useColorModeValue("white", "gray.800")}
                  _hover={{
                    bg: "green.600",
                  }}
                  aria-label="Subscribe"
                  icon={<BiMailSend />}
                />
              </Stack>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
}
