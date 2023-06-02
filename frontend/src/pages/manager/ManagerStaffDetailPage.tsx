// import React, { useState } from "react";
// import UserProfileView from "../../components/user/UserProfileView";
// import { ManagerStaffQuery } from "../../hooks/useFetchManagerStaff";
// import useFetchManagerStaff from "../../hooks/useFetchManagerStaff";

// const ManagerStaffDetailPage = () => {
//   const [managerStaffQuery, setManagerStaffQuery] = useState<ManagerStaffQuery>(
//     {} as ManagerStaffQuery
//   );
//   const { staffs, pageable, isLoading, error } =
//     useFetchManagerStaff(managerStaffQuery);
//   return (
//     <UserProfileView staffs={staffs}/>
//   );
// };

// export default ManagerStaffDetailPage;

import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, HStack, Heading, FormControl, FormLabel, Input, VStack, Wrap, WrapItem, Avatar } from "@chakra-ui/react";
import UserProfileView from "../../components/user/UserProfileView";
import { ManagerStaffDTO } from "../../services/manager-staff-service";
import { ManagerStaffQuery } from "../../hooks/useFetchManagerStaff";
import useFetchManagerStaff from "../../hooks/useFetchManagerStaff";
import { useState } from "react";

const ManagerStaffDetailPage = () => {
  const [managerStaffQuery, setManagerStaffQuery] = useState<ManagerStaffQuery>(
    {} as ManagerStaffQuery
  );
  const { staffs, pageable, isLoading, error } =
  useFetchManagerStaff(managerStaffQuery);
  return (
    <>
      <Link to="/staff">
        <Button colorScheme="teal" size="sm" ml="12">
          {"<< Danh sách nhân viên"}
        </Button>
      </Link>
      <Card marginX="200" marginY="6" p="8" border="1px lightgray solid">
        <HStack justifyContent='flex-end' marginTop='10px'>
          <Link to={"/staff/edit"}>
            <Button colorScheme="blue" size="md">
              Chỉnh sửa
            </Button>
          </Link>
          <Button colorScheme="red" size="md">
            Xóa
          </Button>
        </HStack>

        <UserProfileView staffs={staffs} />
      </Card>
    </>
  );
};

export default ManagerStaffDetailPage;