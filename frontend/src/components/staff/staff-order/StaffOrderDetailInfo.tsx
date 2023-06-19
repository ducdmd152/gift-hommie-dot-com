import React, { useState } from "react";
import {
  Badge,
  Card,
  HStack,
  Heading,
  VStack,
  Text,
  Button,
  Show,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useFetchCart, { CartQuery } from "../../../hooks/useFetchCart";
import Selector from "../../Selector";
import OrderDTO from "../../../type/OrderDTO";
import ORDER_STATUS_MAP, {
  OrderStatusItem,
} from "../../../data/OrderStatusData";
import Swal from "sweetalert2";
import { staffUpdateOrder } from "../../../services/staff-order-service";

const StaffOrderDetailInfo = ({
  order,
  setOrder,
}: {
  order: OrderDTO;
  setOrder: (order: OrderDTO) => void;
}) => {
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
        const orderDTO = await staffUpdateOrder({
          ...order,
          status: "CONFIRMED",
        });

        setOrder(orderDTO);
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
              Ngày tạo đơn: {order.createTime}
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
              onClick={() => onRefuse()}
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
