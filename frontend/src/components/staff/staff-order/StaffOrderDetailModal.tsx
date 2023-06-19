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
import React, { useContext, useEffect, useState } from "react";
import StaffOrderDetailInfo from "./StaffOrderDetailInfo";
import StaffOrderItems from "./StaffOrderItems";
import OrderDTO from "../../../type/OrderDTO";
import staffOrderService from "../../../services/staff-order-service";
import { useNavigate } from "react-router-dom";
import OrderDetailDTO from "../../../type/OrderDetailDTO";
import { GLOBAL_CONTEXT } from "../../../App";
interface Props {
  order: OrderDTO;
  setOrder: (order: OrderDTO) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
const StaffOrderDetailModal = ({
  isOpen,
  onOpen,
  onClose,
  order,
  setOrder,
}: Props) => {
  // const globalContext = useContext(GLOBAL_CONTEXT);
  // const [order, setOrder] = useState<OrderDTO>({
  //   orderDetails: [] as OrderDetailDTO[],
  // } as OrderDTO);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   staffOrderService
  //     .get(globalContext.orderContext.getOrderId())
  //     .then((res) => {
  //       setOrder(res.data as OrderDTO);
  //       console.log("in", res.data as OrderDTO);
  //     })
  //     .catch((err) => {
  //       // navigate("/order");
  //     });
  // }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} preserveScrollBarGap={false}>
      <ModalOverlay />
      <ModalContent
        maxH="80vh"
        maxW="90vw"
        style={{ overflowY: "scroll", height: "90vh" }}
      >
        {/* <ModalHeader>Chi tiết đơn hàng</ModalHeader> */}
        <ModalCloseButton zIndex={4} />
        <ModalBody>
          <StaffOrderDetailInfo order={order} setOrder={setOrder} />
          <Card p="4" w="100%" mt="4">
            <Heading size="md" textAlign={"center"} mb="4">
              Thông tin sản phẩm
            </Heading>
            <StaffOrderItems order={order} />
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
