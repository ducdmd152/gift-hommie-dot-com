import React from "react";
import {
  Badge, Box, Button, Card, CardBody, FormControl, FormHelperText,
  FormLabel, HStack, Heading, Input, NumberInput, NumberInputField,
  Select, Textarea, VStack, Image, Flex, Link, Center, RadioGroup, Stack, Radio
} from "@chakra-ui/react";

const ManagerStaffEditPage = () => {
  return (
    <Box border="1px lightgray solid">
      <VStack flex="1" h="100%" px="8" spacing="4" marginTop='8px'>
        <Box>
          <Image
            borderRadius="8px"
            boxSize="120px"
            objectFit="cover"
          // src={productAvatarURL}
          />
        </Box>
        <Heading size="sm" textAlign="center" marginBottom="4">
          @UseName
        </Heading>
      </VStack>

      <VStack alignItems='center'>
        <FormControl maxW="450px">
          <HStack>
            <FormLabel size="md" fontWeight="bold">
              FullName
            </FormLabel>
            <Input
              color="gray"
              // value={product.name}
              fontWeight="bold"
            />
          </HStack>
        </FormControl>

        <FormControl maxW="450px">
          <HStack>
            <FormLabel size="md" fontWeight="bold">
              UserName
            </FormLabel>
            <Input
              color="gray"
              // value={product.name}
              fontWeight="bold"
            />
          </HStack>
        </FormControl>

        <FormControl maxW="450px">
          <HStack>
            <FormLabel size="md" fontWeight="bold">
              Email
            </FormLabel>
            <Input
              color="gray"
              // value={product.name}
              fontWeight="bold"
            />
          </HStack>
        </FormControl>
        <FormControl maxW="450px">
          <HStack>
            <FormLabel size="md" fontWeight="bold">
              Phone
            </FormLabel>
            <NumberInput
              // value={product.price} 
              color="gray"
              fontWeight="bold"
            >
              <NumberInputField />
            </NumberInput>
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
        <FormControl maxW="450px" >
          <HStack>
            <FormLabel size="md" fontWeight="bold">
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

      <HStack justifyContent='center' marginTop='10px'>
        <Button type="submit" colorScheme="blue" size="md">
          Save
        </Button>
        <Link>
          <Button colorScheme="red" variant="outline" size="md">
            Cancel
          </Button>
        </Link>
      </HStack>
    </Box>
  )
};

export default ManagerStaffEditPage;
