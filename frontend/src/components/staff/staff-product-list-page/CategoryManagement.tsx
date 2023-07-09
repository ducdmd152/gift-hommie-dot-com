import {
  Badge,
  Box,
  Button,
  Card,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  SimpleGrid,
  Switch,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useFetchCategories, {
  CategoryQuery,
} from "../../../hooks/useFetchCategory";
// interface Props {
//   isOpen: boolean;
//   onOpen: () => void;
//   onClose: () => void;
// }
// const CategoryManagement = ({ isOpen, onOpen, onClose }: Props) => {
const CategoryManagement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [query, setQuery] = useState({} as CategoryQuery);
  const { categories } = useFetchCategories(query);
  const onDelete = (id: number) => {
    alert("Delete " + id);
  };
  const onStatus = (status: boolean) => {
    alert("Status " + status);
  };
  return (
    <>
      <Button colorScheme="teal" size="md" onClick={() => onOpen()}>
        Quản lý danh mục
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} preserveScrollBarGap={false}>
        <ModalOverlay />
        <ModalContent
          maxH="80vh"
          maxW="80vw"
          padding="8"
          style={{ overflowY: "scroll", height: "90vh" }}
        >
          {/* <ModalHeader>Chi tiết đơn hàng</ModalHeader> */}
          <ModalCloseButton zIndex={4} />
          <ModalBody>
            <Box>
              <Heading size="xl">Quản lý danh mục</Heading>
              <SimpleGrid columns={2} spacing={6} mt="6">
                {categories.map((category) => (
                  <Card p="4" bg="teal.100">
                    <HStack
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Text size="xl" fontWeight={"bold"}>
                        {category.name}
                      </Text>
                      <HStack justifyContent={"space-between"} spacing={4}>
                        <Switch
                          size="lg"
                          isChecked={category.status}
                          onChange={(e) => onStatus(!category.status)}
                        />
                        <Badge
                          fontSize={"sm"}
                          variant="outline"
                          className="badge-button none-text-transform"
                          colorScheme="red"
                          borderRadius={"4px"}
                          paddingX="4"
                          paddingY="4px"
                          fontWeight={"500"}
                          _hover={{
                            background: "red.200",
                          }}
                          onClick={() => onDelete(category.id)}
                        >
                          Xóa
                        </Badge>
                      </HStack>
                    </HStack>
                  </Card>
                ))}
                <Card p="4" bg="teal.100">
                  <HStack justifyContent={"space-between"}>
                    <Text size="xl">Danh mục số 1</Text>
                  </HStack>
                </Card>
              </SimpleGrid>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CategoryManagement;
