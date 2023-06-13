import {
  Button,
  Card,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import StaffOrderDetailInfo from "./StaffOrderDetailInfo";
import StaffOrderItems from "./StaffOrderItems";
interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
const StaffOrderDetailModal = ({ isOpen, onOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} preserveScrollBarGap={false}>
      <ModalOverlay />
      <ModalContent
        maxH="80vh"
        maxW="90vw"
        style={{ overflowY: "scroll", height: "90vh" }}
      >
        <ModalHeader>Chi tiết đơn hàng</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <StaffOrderDetailInfo />
          <Card p="4" w="100%" mt="4">
            <Heading size="md" textAlign={"center"} mb="4">
              Thông tin sản phẩm
            </Heading>
            <StaffOrderItems />
          </Card>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          {/* <Button variant="ghost">Secondary Action</Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default StaffOrderDetailModal;
