import { Button, HStack, Heading, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import SearchInput from "../../components/SearchInput";
import ManagerStaffTable from "../../components/manager/manager-staff-list-page/ManagerStaffTable";
import Pagination from "../../components/Pagination";
import PageableDTO from "../../type/PageableDTO";
import useFetchManagerStaff, {
  ManagerStaffQuery,
} from "../../hooks/useFetchManagerStaff";
import { Link } from "react-router-dom";

interface Props {
  setUserId: (id: string) => void;
}
const ManagerStaffListPage = ({ setUserId }: Props) => {
  const [managerStaffQuery, setManagerStaffQuery] = useState<ManagerStaffQuery>(
    {} as ManagerStaffQuery
  );

  const { staffs, pageable, isLoading, error } =
    useFetchManagerStaff(managerStaffQuery);

  return (
    <VStack alignItems={"space-between"} paddingX="12">
      <Heading size="md" textAlign="center" marginBottom="2">
        BẢNG THÔNG TIN NHÂN VIÊN
      </Heading>
      <HStack justifyContent={"right"} paddingX="4" paddingBottom="2">
        <Link to="/staff/create">
          <Button colorScheme="teal" size="md">
            Thêm nhân viên mới
          </Button>
        </Link>
      </HStack>

      <SearchInput
        onSearch={(text: string) => {
          //handle
          setManagerStaffQuery({ ...managerStaffQuery, search: text });
        }}
      />

      <ManagerStaffTable staffs={staffs} setUserId={setUserId} />

      <HStack justifyContent="center" paddingTop="6">
        <Pagination
          pageable={pageable}
          onSelectPageIndex={(index: number) => {
            setManagerStaffQuery({ ...managerStaffQuery, page: index });
          }}
        />
      </HStack>
    </VStack>
  );
};

export default ManagerStaffListPage;
