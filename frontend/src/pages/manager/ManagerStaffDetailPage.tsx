import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, HStack, Heading, FormControl, FormLabel, Input, VStack, Wrap, WrapItem, Avatar } from "@chakra-ui/react";
import UserProfileView from "../../components/user/UserProfileView";
import managerStaffService, { ManagerStaffDTO } from "../../services/manager-staff-service";
import { ManagerStaffQuery } from "../../hooks/useFetchManagerStaff";
import useFetchManagerStaff from "../../hooks/useFetchManagerStaff";
import { useState, useEffect } from "react";

interface Props {
  userId: string
}
const ManagerStaffDetailPage = ({ userId }: Props) => {
  const [staff, setStaff] = useState<ManagerStaffDTO>(
    {} as ManagerStaffDTO
  );

  const navigate = useNavigate();

  //fetch staff from API
  useEffect(() => {
    let id = userId;
    if (id == "") {
      navigate("/staff");
    }
    managerStaffService
      .get(id)
      .then((res) => {
        setStaff(res.data);
      })
      .catch((err) => {
        navigate("/staff");
      });
  }, []);

  const onDeleteStaff = (id: string) => {
    if (
      confirm(
        `Bạn có muốn xóa "${staff.username}" khỏi danh sách nhân viên không?`
      )
    ) {
      managerStaffService
        .delete(staff.id)
        .then(() => {
          alert(`Đã xóa "${staff.username}" khỏi danh sách nhân viên.`);
          navigate("/staff");
        })
        .catch(() => {
          alert(
            `Không thể xóa "${staff.username}" khỏi danh sách nhân viên. \n Vui lòng thử lại.`
          );
        });
    }
  };

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

          <Button colorScheme="red" size="md"
            onClick={() => onDeleteStaff(staff.id)}
          >
            Xóa
          </Button>
        </HStack>
        <UserProfileView userId={userId} />
      </Card>
    </>
  );
};

export default ManagerStaffDetailPage;