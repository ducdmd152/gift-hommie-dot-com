import {
  Box,
  Button,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

const ManagerStaffTable = () => {
  return (
    <Box paddingTop="6">
      <TableContainer borderRadius="12" border="solid 1px gray">
        <Table variant="striped">
          <TableCaption>BẢNG THÔNG TIN NHÂN VIÊN</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Tên</Th>
              <Th>Năm sinh</Th>
              <Th>Tên đăng nhập</Th>
              <Th>Email</Th>
              <Th>Điện thoại</Th>
              <Th>Địa chỉ</Th>
              <Th>Chi tiết</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>ID</Td>
              <Td>Tên</Td>
              <Td>Năm sinh</Td>
              <Td>Tên đăng nhập</Td>
              <Td>Email</Td>
              <Td>Điện thoại</Td>
              <Td>Địa chỉ</Td>
              <Td>
                <Button colorScheme="blue" paddingX="4" size="sm">
                  Chi tiết
                </Button>
              </Td>
            </Tr>

            <Tr>
              <Td>ID</Td>
              <Td>Tên</Td>
              <Td>Năm sinh</Td>
              <Td>Tên đăng nhập</Td>
              <Td>Email</Td>
              <Td>Điện thoại</Td>
              <Td>Địa chỉ</Td>
              <Td>
                <Button colorScheme="blue" paddingX="4" size="sm">
                  Chi tiết
                </Button>
              </Td>
            </Tr>
          </Tbody>
          <Tfoot>
            {/* <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr> */}
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManagerStaffTable;
