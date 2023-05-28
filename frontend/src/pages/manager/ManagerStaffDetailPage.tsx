import React from "react";
import {
  Badge, Box, Button, Card, CardBody, FormControl, FormHelperText, FormLabel,
  HStack, Heading, Input, NumberInput, NumberInputField, Select, Textarea,
  VStack, Image, Flex,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import managerStaffService, {
} from "../../services/staff-product-service";
import staffProductService from "../../services/staff-product-service";


const ManagerStaffDetailPage = () => {
  return (
    <>
      <Link to="/staff">
        <Button colorScheme="teal" size="sm" ml="12">
          {"<< Danh sách nhân viên"}
        </Button>
      </Link>

      <Card marginX="12" marginY="8" p="8" border="1px lightgray solid">
        <HStack justifyContent="space-between">
          <VStack alignItems="start">
            <Badge variant="outline" display="inline-block">
              {"id >> 1"}
            </Badge>
            <HStack>
              <Heading size="lg" colorScheme="gray">
                { }
              </Heading>
              <Badge colorScheme="green" fontSize="md">
                View
              </Badge>
            </HStack>
          </VStack>

          <HStack>
            <Link to={"/staff/edit"}>
              <Button colorScheme="blue" size="md">
                Chỉnh sửa
              </Button>
            </Link>
            <Button
              colorScheme="red"
              size="md"
            >
              Xóa
            </Button>
          </HStack>
        </HStack>
        <VStack mt={6} p="4">
          <Flex width="100%" gap="8">
            <VStack spacing="8" flex="1">
              <FormControl>
                <FormLabel size="md" fontWeight="bold">
                  ID
                </FormLabel>
                <Input
                  // value={}
                  isDisabled
                  color="gray"
                  fontWeight="bold"
                />
              </FormControl>

              <FormControl>
                <FormLabel size="md" fontWeight="bold">
                  Tên nhân viên
                </FormLabel>
                <Input
                  isReadOnly
                  color="gray"
                  // value={ }
                  fontWeight="bold"
                />
              </FormControl>

              <FormControl>
                <FormLabel size="md" fontWeight="bold">
                  Phone
                </FormLabel>
                <NumberInput
                  // value={ }
                  isReadOnly
                  color="gray"
                  min={1000}
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel size="md" fontWeight="bold">
                  Yob
                </FormLabel>
                <NumberInput
                  // value={ }
                  isReadOnly
                  color="gray"
                  min={0}
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel size="md" fontWeight="bold">
                  Email
                </FormLabel>
                <NumberInput
                  // value={ }
                  isReadOnly
                  color="gray"
                  min={0}
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel size="md" fontWeight="bold">
                  Address
                </FormLabel>
                <NumberInput
                  // value={ }
                  isReadOnly
                  color="gray"
                  min={0}
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>
            </VStack>

            <VStack flex="1" h="100%" px="8" spacing="8">
              <Box>
                <Image
                  borderRadius="8px"
                  height="200px"
                  objectFit="cover"
                //src={ }
                //alt={ }
                />
              </Box>
              <FormControl>
                <FormLabel size="md" fontWeight="bold">
                </FormLabel>
                <Input
                  isReadOnly
                  color="gray"
                  //value={ }
                  fontWeight="bold"
                />
              </FormControl>
            </VStack>
          </Flex>
        </VStack>
      </Card>
    </>
  );


};

export default ManagerStaffDetailPage;
