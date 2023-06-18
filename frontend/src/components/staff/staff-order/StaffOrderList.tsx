import {
  Badge,
  Box,
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import StaffOrderDetailModal from "./StaffOrderDetailModal";
import useFetchStaffOrder, {
  StaffOrderQuery,
} from "../../../hooks/useFetchStaffOrder";
import ORDER_STATUS_MAP from "../../../data/OrderStatusData";
import OrderDTO from "../../../type/OrderDTO";

interface Props {
  orders: OrderDTO[];
  staffOrderQuery: StaffOrderQuery;
  setStaffOrderQuery: (staffOrderQuery: StaffOrderQuery) => void;
}
const StaffOrderList = ({
  orders,
  staffOrderQuery,
  setStaffOrderQuery,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <TableContainer borderRadius="12" border="solid 1px gray">
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Ngày tạo đơn</Th>
              <Th>Trạng thái</Th>
              <Th>Người nhận</Th>
              <Th>Số điện thoại</Th>
              <Th>Địa chỉ nhận hàng</Th>
              <Th>Tổng thanh toán</Th>

              <Th>Chi tiết</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order) => (
              <Tr key={order.id}>
                <Td>
                  <strong>{order.id}</strong>
                </Td>
                <Td>{order.orderTime}</Td>
                <Td>
                  <Badge
                    colorScheme={ORDER_STATUS_MAP[order.status].colorScheme}
                    w="unset"
                  >
                    {ORDER_STATUS_MAP[order.status].label}
                  </Badge>
                </Td>
                <Td>
                  <strong>{order.name}</strong>
                </Td>
                <Td>
                  <strong>{order.phone}</strong>
                </Td>
                <Td maxW="320px">
                  <div className="text-truncate">{order.address}</div>
                </Td>
                <Td>
                  <strong>
                    {(
                      (order.orderDetails.reduce(
                        (acc, item) => acc + item.total,
                        0
                      ) +
                        order.shippingFee) /
                      1000
                    ).toFixed(3) + "đ"}
                  </strong>
                </Td>

                <Td>
                  <Button
                    colorScheme="blue"
                    paddingX="4"
                    size="sm"
                    onClick={() => {
                      onOpen();
                    }}
                  >
                    Chi tiết
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <StaffOrderDetailModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </Box>
  );
};

export default StaffOrderList;
