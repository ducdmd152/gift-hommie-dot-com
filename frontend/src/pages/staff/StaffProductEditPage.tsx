import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  currentProductId: number | null;
}
const StaffProductEditPage = ({ currentProductId }: Props) => {
  return (
    <>
      <Card m="12" p="8" border="1px lightgray solid">
        <HStack justifyContent="space-between">
          <VStack alignItems="start">
            <Badge variant="outline" display="inline-block">
              {"id >> 1"}
            </Badge>
            <Heading size="lg" colorScheme="gray">
              Product Name
            </Heading>
          </VStack>

          <HStack>
            <Button colorScheme="blue" size="md">
              Edit
            </Button>
            <Button colorScheme="red" size="md">
              Delete
            </Button>
          </HStack>
        </HStack>

        <HStack>
          <VStack>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
          </VStack>
        </HStack>
      </Card>
    </>
  );
};

export default StaffProductEditPage;
