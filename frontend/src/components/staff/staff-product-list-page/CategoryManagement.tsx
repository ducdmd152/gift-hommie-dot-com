import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
// interface Props {
//   isOpen: boolean;
//   onOpen: () => void;
//   onClose: () => void;
// }
// const CategoryManagement = ({ isOpen, onOpen, onClose }: Props) => {
const CategoryManagement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          style={{ overflowY: "scroll", height: "90vh" }}
        >
          {/* <ModalHeader>Chi tiết đơn hàng</ModalHeader> */}
          <ModalCloseButton zIndex={4} />
          <ModalBody>dfsafsaf</ModalBody>

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
