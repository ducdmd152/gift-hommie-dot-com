import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  HStack,
} from "@chakra-ui/react";
import UserProfileView from "../../components/user/UserProfileView";
import managerStaffService, {
  ManagerStaffDTO,
} from "../../services/manager-staff-service";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import accountService from "../../services/account-service";

interface Props {
  userId: string;
}
const ManagerStaffDetailPage = ({ userId }: Props) => {
  const [staff, setStaff] = useState<ManagerStaffDTO>({} as ManagerStaffDTO);
  const [status, setStatus] = useState(false);
  useEffect(() => {
    let id = userId;

    if (id == "") {
      navigate("/staff");
    }
    managerStaffService
      .get(id)
      .then((res) => {
        setStaff(res.data);
        setStatus(res.data.enabled);
      })
      .catch((err) => {
        navigate("/staff");
      });
  }, []);
  const navigate = useNavigate();

  const onStatus = (id: string) => {
    if (staff.enabled)
      Swal.fire({
        title: `Bạn muốn khóa tài khoản @` + staff.username + `?`,
        text: "Tài khoản sẽ không được phép hoạt động cho đến khi bạn mở khóa.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "orange",
        cancelButtonColor: "gray",
        confirmButtonText: "Có",
        cancelButtonText: "Không",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await accountService
            .update({ ...staff, enabled: !staff.enabled })
            .then((res) => {
              setStaff(res.data);
              Swal.fire({
                title: "Đã khóa tài khoản @" + staff.username + ".",
                icon: "info",
                showConfirmButton: false,
                timer: 2200,
              });
              setStatus(!status);
            })
            .catch((error) => {
              alert("Không thể khóa tài khoản.");
            });
        }
      });
    else {
      (async () => {
        await accountService
          .update({ ...staff, enabled: !staff.enabled })
          .then((res) => {
            setStaff(res.data);
            Swal.fire({
              title: "Đã mở khóa tài khoản @" + staff.username + ".",
              text: "Tài khoản này có thể đăng nhập và hoạt động trở lại.",
              icon: "info",
              showConfirmButton: false,
              timer: 2200,
            });
            setStatus(!status);
          })
          .catch((error) => {
            alert("Không thể mở khóa tài khoản.");
          });
      })();
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
        <HStack justifyContent="flex-end" marginTop="10px">
          <Link to={"/staff/edit"}>
            <Button colorScheme="blue" size="md">
              Chỉnh sửa
            </Button>
          </Link>

          <Button
            colorScheme={status ? "orange" : "teal"}
            size="md"
            onClick={() => onStatus(staff.id)}
          >
            {status ? "Khóa" : "Mở khóa"}
          </Button>
        </HStack>

        <UserProfileView userDTO={staff} />
      </Card>
    </>
  );
};

export default ManagerStaffDetailPage;
