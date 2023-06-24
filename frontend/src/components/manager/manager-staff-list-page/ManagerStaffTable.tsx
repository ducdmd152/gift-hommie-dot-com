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
import useFetchManagerStaff, {
  ManagerStaffQuery,
} from "../../../hooks/useFetchManagerStaff";
import { ManagerStaffDTO } from "../../../services/manager-staff-service";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  staffs: ManagerStaffDTO[];
  setUserId: (id: string) => void;
}

const ManagerStaffTable = ({ staffs, setUserId }: Props) => {
  const navigate = useNavigate();
  return (
    <Box paddingTop="6">
      <TableContainer borderRadius="12" border="solid 1px gray">
        <Table variant="striped">
          <TableCaption>BẢNG THÔNG TIN NHÂN VIÊN</TableCaption>
          <Thead>
            <Tr>
              {/* <Th>ID</Th> */}
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
            {staffs.map((staff) => {
              return (
                <Tr>
                  {/* <Td>{staff.id}</Td> */}
                  <Td>{staff.firstName + " " + staff.lastName}</Td>
                  <Td>{staff.yob}</Td>
                  <Td>{staff.username}</Td>
                  <Td>{staff.email}</Td>
                  <Td>{staff.phone}</Td>
                  <Td>{staff.address}</Td>
                  <Td>
                    {/* <Link to="/staff/detail"> */}
                    <Button
                      colorScheme="blue"
                      paddingX="4"
                      size="sm"
                      onClick={() => {
                        setUserId(staff.id);
                        // console.log(staff.id);

                        navigate("/staff/detail");
                      }}
                    >
                      Chi tiết
                    </Button>
                    {/* </Link> */}
                  </Td>
                </Tr>
              );
            })}
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
