import {
  Badge,
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
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import StaffOrderDetailModal from "./StaffOrderDetailModal";

const StaffOrderList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <TableContainer borderRadius="12" border="solid 1px gray">
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Ngày tạo đơn</Th>
            <Th>Người nhận</Th>
            <Th>Số điện thoại</Th>
            <Th>Địa chỉ nhận hàng</Th>
            <Th>Tổng thanh toán</Th>
            <Th>Trạng thái</Th>
            <Th>Chi tiết</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>ID</Td>
            <Td>Ngày tạo đơn</Td>
            <Td>Người nhận</Td>
            <Td>Số điện thoại</Td>
            <Td>Địa chỉ nhận hàng</Td>
            <Td>Tổng thanh toán</Td>
            <Td>
              <Badge colorScheme="yellow" w="unset">
                PENDING
              </Badge>
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
              <StaffOrderDetailModal
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
              />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default StaffOrderList;
