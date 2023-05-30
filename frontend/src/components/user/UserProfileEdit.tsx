import React from "react";
import {
  Badge, Box, Button, Card, CardBody, FormControl, FormHelperText, FormLabel, Wrap, WrapItem, Avatar,
  HStack, Heading, Input, NumberInput, NumberInputField, Select, Textarea,
  VStack, Image, Flex,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import managerStaffService, {
} from "../../services/staff-product-service";
import staffProductService from "../../services/staff-product-service";

const UserProfileEdit = () => {
  return (
    <Card marginX="20" marginY="6" p="8" border="1px lightgray solid">
      <Box>
        <VStack flex="1" h="100%" px="8" spacing="4" marginTop='8px'>
          <Wrap>
            <Box>
              <WrapItem>
                <Avatar size='xl' name='' src=''
                  border="1px lightgray solid"
                />{' '}
              </WrapItem>
              <Heading size="sm" textAlign="center" marginBottom="4">
                @UseName
              </Heading>
            </Box>
          </Wrap>
        </VStack>

        <VStack >
          <FormControl maxW="600px">
            <HStack >
              <FormLabel size="md" fontWeight="bold" marginRight='100px'>
                FullName
              </FormLabel>
              <Input
                color="gray"
                // value={product.name}
                fontWeight="bold"
              />
            </HStack>
          </FormControl>

          <FormControl maxW="600px">
            <HStack>
              <FormLabel size="md" fontWeight="bold" marginRight='90px'>
                UserName
              </FormLabel>
              <Input
                color="gray"
                // value={product.name}
                fontWeight="bold"
              />
            </HStack>
          </FormControl>

          <FormControl maxW="600px">
            <HStack>
              <FormLabel size="md" fontWeight="bold" marginRight='130px'>
                Email
              </FormLabel>
              <Input
                color="gray"
                // value={product.name}
                fontWeight="bold"
              />
            </HStack>
          </FormControl>
          <FormControl maxW="600px">
            <HStack>
              <FormLabel size="md" fontWeight="bold" marginRight='123px'>
                Phone
              </FormLabel>
              <Input
                color="gray"
                // value={product.name}
                fontWeight="bold"
              />
            </HStack>
          </FormControl>
          {/* <FormControl>
          <FormLabel size="md" fontWeight="bold">
            Gender
          </FormLabel>
          <RadioGroup >
            <Stack direction='row'>
              <Radio value='1'>Male</Radio>
              <Radio value='2'>Female</Radio>
              <Radio value='3'>Other</Radio>
            </Stack>
          </RadioGroup>
        </FormControl> */}
          <FormControl maxW="600px" >
            <HStack>
              <FormLabel size="md" fontWeight="bold" marginRight='120px'>
                Birth Year
              </FormLabel>
              <Input
                placeholder="YYYY"
                color="gray"
                // value={product.name}
                fontWeight="bold"
              />
            </HStack>
          </FormControl>
        </VStack>
        <HStack justifyContent='center' marginTop='10px' marginLeft='400px'>
          <Button type="submit" colorScheme="blue" size="md">
            Save
          </Button>
          <Link to={"/staff/detail"}>
            <Button colorScheme="red" variant="outline" size="md">
              Cancel
            </Button>
          </Link>
        </HStack>
      </Box>
    </Card>
  )
}

export default UserProfileEdit