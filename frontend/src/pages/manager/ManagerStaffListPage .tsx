import { HStack, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import SearchInput from "../../components/SearchInput";
import ManagerStaffTable from "../../components/manager/manager-staff-list-page/ManagerStaffTable";
import Pagination from "../../components/Pagination";
import PageableDTO from "../../type/PageableDTO";

const ManagerStaffListPage = () => {
  return (
    <VStack alignItems={"space-between"} paddingX="12">
      <Heading size="md" textAlign="center" marginBottom="6">
        BẢNG THÔNG TIN NHÂN VIÊN
      </Heading>
      <SearchInput onSearch={() => 8} />
      <ManagerStaffTable />
      <HStack justifyContent="center" paddingTop="6">
        <Pagination pageable={{} as PageableDTO} onSelectPageIndex={() => 8} />
      </HStack>
    </VStack>
  );
};

export default ManagerStaffListPage;
