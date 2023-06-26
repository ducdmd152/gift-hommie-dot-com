import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, HStack, Heading, FormControl, FormLabel, Input, VStack, Wrap, WrapItem, Avatar } from "@chakra-ui/react";
import UserProfileView from "../../components/user/UserProfileView";
import managerStaffService, { ManagerStaffDTO } from "../../services/manager-staff-service";
import { ManagerStaffQuery } from "../../hooks/useFetchManagerStaff";
import useFetchManagerStaff from "../../hooks/useFetchManagerStaff";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

interface Props {
  userId: string
}
const ManagerStaffDetailPage = ({ userId }: Props) => {
  const [staff, setStaff] = useState<ManagerStaffDTO>({} as ManagerStaffDTO);
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
  const navigate = useNavigate();


  const onDeleteStaff = (id: string) => {
    if (
      confirm(
        `Bạn có muốn xóa "${staff.username}" khỏi danh sách nhân viên không?`

      )
    ) {
      managerStaffService
        .delete(staff.id)
        .then(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Đã xóa "${staff.username}" khỏi danh sách nhân viên.`,
            showConfirmButton: false,
            timer: 1500,
          })
          navigate("/staff")
        })
        .catch(() => {
          // alert(
          //   `Không thể xóa "${staff.username}" khỏi danh sách nhân viên. \n Vui lòng thử lại.`
          // );
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Không thể xóa "${staff.username}" khỏi danh sách nhân viên`,
            footer: `Vui lòng thử lại`
          })
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

        <UserProfileView userDTO={staff} />
      </Card>
    </>
  );
};

export default ManagerStaffDetailPage;