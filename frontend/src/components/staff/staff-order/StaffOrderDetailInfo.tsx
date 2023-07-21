import React, { useContext, useRef } from "react";
import {
  Badge,
  Card,
  HStack,
  Heading,
  VStack,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import OrderDTO from "../../../type/OrderDTO";
import ORDER_STATUS_MAP, {
  OrderStatusItem,
} from "../../../data/OrderStatusData";
import Swal from "sweetalert2";
import { staffUpdateOrder } from "../../../services/staff-order-service";
import { GLOBAL_CONTEXT } from "../../../App";

const StaffOrderDetailInfo = ({
  order,
  setOrder,
  transition,
}: {
  order: OrderDTO;
  setOrder: (order: OrderDTO) => void;
  transition: (order: OrderDTO) => void;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const globalContext = useContext(GLOBAL_CONTEXT);
  let items = order.orderDetails;
  const amount = items.reduce((acc, item) => acc + item.total, 0) / 1000;
  const total =
    (items.reduce((acc, item) => acc + item.total, 0) + order.shippingFee) /
    1000;
  const status = order?.status
    ? ORDER_STATUS_MAP[order.status]
    : ({} as OrderStatusItem);

  // CONFIRM/REFUSE
  const onConfirm = async () => {
    Swal.fire({
      title: "Xác nhận đơn hàng",
      text: "Bạn muốn xác nhận đơn hàng?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "blue",
      cancelButtonColor: "gray",
      confirmButtonText: "Ok",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // let timerInterval: string | number | NodeJS.Timeout | undefined;
        // Swal.fire({
        //   title: "Đang xử lí!",
        //   html: "Đơn hàng đang được xác nh <b id='timer'></b> milliseconds.",
        //   timer: 2000,
        //   timerProgressBar: true,
        //   didOpen: () => {
        //     Swal.showLoading();
        //     const b = window.document.querySelector("#timer");
        //     timerInterval = setInterval(() => {
        //       if (b != null)
        //         b.innerHTML = Swal.getTimerLeft()?.toString() || "";
        //     }, 100);
        //   },
        //   willClose: () => {
        //     clearInterval(timerInterval);
        //   },
        // }).then((result) => {
        //   /* Read more about handling dismissals below */
        //   if (result.dismiss === Swal.DismissReason.timer) {
        //     console.log("I was closed by the timer");
        //   }
        // });

        const orderDTO = await staffUpdateOrder({
          ...order,
          status: "CONFIRMED",
        });

        setOrder(orderDTO);
        transition(orderDTO);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Đã xác nhận thành công \n đơn hàng số: " + order.id + ".",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  const onPreRefuse = () => {
    onOpen();
  };
  const onNewRefuse = async () => {
    const orderDTO = await staffUpdateOrder({
      ...order,
      comment: commentRef?.current?.value || "",
      status: "REFUSED",
    });
    onClose();

    setOrder(orderDTO);
    Swal.fire({
      position: "center",
      icon: "info",
      title: "Đã từ chối \n đơn hàng số: " + order.id + ".",
      showConfirmButton: false,
      timer: 2000,
    });
  };
  const onRefuse = async () => {
    Swal.fire({
      title: "Từ chối đơn hàng?",
      text: "Bạn có thực sự muốn từ chối đơn hàng không!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "orange",
      cancelButtonColor: "gray",
      confirmButtonText: "Có",
      cancelButtonText: "Không",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const orderDTO = await staffUpdateOrder({
          ...order,
          status: "REFUSED",
        });

        setOrder(orderDTO);
        Swal.fire({
          position: "center",
          icon: "info",
          title: "Đã từ chối \n đơn hàng số: " + order.id + ".",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };
  // UI
  return (
    <Card mt="8">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent marginTop="40vh">
          <ModalHeader>Bạn muốn từ chối đơn hàng #{order.id}?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading fontSize="md">Chú thích</Heading>
            <Textarea ref={commentRef} marginTop="2" />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="yellow"
              onClick={() => onNewRefuse()}
              marginRight="2"
            >
              Xác nhận từ chối
            </Button>
            <Button
              colorScheme="yellow"
              variant="outline"
              mr={3}
              onClick={onClose}
            >
              Hủy
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <VStack w="100%" alignItems={"flex-start"} className="child-full-width">
        {/* HEADER INFO */}

        {/* HEADER INFO */}
        <HStack
          w="100%"
          justifyContent={"space-between"}
          spacing="0"
          background={"rgb(237, 242, 247)"}
        >
          <VStack flex="2" spacing="0">
            <Badge p="2" fontSize={"lg"} w="100%">
              Chi tiết đơn hàng
              {" | ID >> " + order.id}
            </Badge>
            <Badge
              w="100%"
              paddingX="2"
              fontSize={"md"}
              className="none-text-transform"
              fontStyle={"italic"}
              fontWeight={"medium"}
              color="gray"
            >
              Ngày tạo đơn: {order.createTime} | Tạo bởi{" "}
              <Link
                to="/customer/detail"
                onClick={() => {
                  globalContext.userContext.setUserId(order.user.username);
                }}
              >
                <Text
                  display="inline"
                  color="teal !important"
                  fontWeight={"bold"}
                >
                  {order.user.lastName}
                </Text>
              </Link>
            </Badge>
          </VStack>

          {/* ACTIONS */}
          <HStack
            justifyContent={"flex-end"}
            paddingX="12"
            display={order.status == "PENDING" ? "inline-block" : "none"}
          >
            <Button colorScheme="blue" onClick={() => onConfirm()}>
              Xác nhận
            </Button>
            <Button
              colorScheme="red"
              variant={"outline"}
              onClick={() => onPreRefuse()}
            >
              Từ chối
            </Button>
            {/* <Button colorScheme="red">Hủy</Button> */}
          </HStack>
          <VStack flex="2" spacing="0">
            <Badge
              w="100%"
              p="2"
              fontSize={"lg"}
              textAlign={"right"}
              className="none-text-transform"
            >
              <HStack w="100%" justifyContent="flex-end">
                <Text>Trạng thái đơn hàng: </Text>
                <Badge
                  colorScheme={status.colorScheme}
                  color="white"
                  bg={status.backgroundColor}
                  fontSize={"md"}
                  className="none-text-transform"
                >
                  {status.label + " | " + status.descStaff}
                </Badge>
              </HStack>
            </Badge>
            <Badge
              w="100%"
              paddingX="2"
              fontSize={"md"}
              className="none-text-transform"
              fontStyle={"italic"}
              color="gray"
              textAlign={"right"}
              fontWeight={"medium"}
            >
              Ngày cập nhật: {order.updatedTime}
            </Badge>
          </VStack>
        </HStack>

        {/* CUSTOMER INFO */}
        <Card p="4" w="100%">
          <Heading size="sm" mb="2" color="gray">
            Người nhận
          </Heading>
          <VStack w="100%" alignItems="flex-start">
            <Text fontWeight={"bold"}>{order.name} </Text>
            <Text>
              {" "}
              Điện thoại: <strong>{order.phone}</strong>
            </Text>
            <Text>
              Địa chỉ: <strong>{order.address}</strong>{" "}
            </Text>
          </VStack>
        </Card>

        <Card p="4" w="100%">
          <HStack
            w="100%"
            justifyContent={"space-between"}
            alignItems={"stretch"}
          >
            <Card background="blue.100" flex="1" p="4">
              <VStack>
                <HStack spacing="4" w="100%">
                  <Text fontSize="md" flex="2" textAlign="left">
                    Tổng tiền hàng
                  </Text>
                  <Text
                    fontSize="lg"
                    textAlign="right"
                    flex="1"
                    fontWeight="bold"
                  >
                    {amount.toFixed(3) + "đ"}
                  </Text>
                </HStack>
                <HStack spacing="4" w="100%">
                  <Text fontSize="md" flex="2" textAlign="left">
                    Phí vận chuyển
                  </Text>
                  <Text
                    fontSize="lg"
                    textAlign="right"
                    flex="1"
                    fontWeight="bold"
                  >
                    {(order.shippingFee / 1000).toFixed(3) + "đ"}
                  </Text>
                </HStack>
                <HStack spacing="4" w="100%">
                  <Text fontSize="md" flex="2" textAlign="left">
                    Tổng thanh toán
                  </Text>
                  <Text
                    fontSize="lg"
                    textAlign="right"
                    flex="1"
                    fontWeight="bold"
                  >
                    {total.toFixed(3) + "đ"}
                  </Text>
                </HStack>
                <HStack spacing="4" w="100%">
                  <Text fontSize="md" flex="2" textAlign="left">
                    Thanh toán khi nhận hàng
                  </Text>
                  <Text
                    fontSize="lg"
                    textAlign="right"
                    flex="1"
                    fontWeight="bold"
                  >
                    {(order.paymentMethod == 2 ? 0 : total).toFixed(3) + "đ"}
                  </Text>
                </HStack>
              </VStack>
            </Card>
            {/* METHODS */}
            <Card background="gray.100" flex="1" p="4">
              {/* SUMMARY INFO */}
              <VStack>
                <HStack spacing="4" w="100%">
                  <Text fontSize="md" flex="2" textAlign="left">
                    Hình thức thanh toán
                  </Text>
                  <Text
                    fontSize="md"
                    textAlign="right"
                    flex="3"
                    fontWeight="bold"
                  >
                    {order.paymentMethod == 1
                      ? "Thanh toán khi nhận hàng (COD)"
                      : "Thanh toán qua Paypal (đã thanh toán)"}
                  </Text>
                </HStack>
                <HStack spacing="4" w="100%">
                  <Text fontSize="md" flex="2" textAlign="left">
                    Hình thức vận chuyển
                  </Text>
                  <Text
                    fontSize="md"
                    textAlign="right"
                    flex="3"
                    fontWeight="bold"
                  >
                    {order.shippingMethod == 2
                      ? "Giao hàng tiêu chuẩn (nhanh)"
                      : "Giao hàng tốc hành (express)"}
                  </Text>
                </HStack>
                <Text
                  mt="-4"
                  w="100%"
                  textAlign={"right"}
                  fontSize="sm"
                  color="blue.300"
                  fontStyle="italic"
                >
                  Dự kiến giao hàng:{" "}
                  {new Date(order.expectedDeliveryTime).toLocaleDateString(
                    "en-GB"
                  )}
                </Text>
              </VStack>
            </Card>
            {/* SUMMARY INFO */}
          </HStack>
        </Card>
      </VStack>
    </Card>
  );
};

export default StaffOrderDetailInfo;
