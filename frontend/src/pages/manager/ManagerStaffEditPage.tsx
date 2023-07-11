import { useState, useEffect } from "react";
import UserProfileEdit from "../../components/user/UserProfileEdit";
import managerStaffService, {
  ManagerStaffDTO,
} from "../../services/manager-staff-service";
import { useNavigate } from "react-router-dom";
import {
  Card,
} from "@chakra-ui/react";
import Swal from "sweetalert2";

interface Props {
  userId: string;
}
interface FormData extends ManagerStaffDTO {}

const ManagerStaffEditPage = ({ userId }: Props) => {
  const [staff, setStaff] = useState<ManagerStaffDTO>({} as ManagerStaffDTO);

  const navigate = useNavigate();

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
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="">Vui lòng thử lại sau</a>',
        });
      });
  }, []);

  return (
    <>
      <Card marginX="200" marginY="6" p="8" border="1px lightgray solid">
        <UserProfileEdit user={staff} setUser={setStaff} />
      </Card>
    </>
  );
};

export default ManagerStaffEditPage;
