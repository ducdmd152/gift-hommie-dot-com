import { Badge, Button, Card, HStack } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { GLOBAL_CONTEXT } from "../../App";
import UserProfileView from "../../components/user/UserProfileView";
import accountService, { AccountDTO } from "../../services/account-service";

const StaffCustomerDetailPage = () => {
  const globalContext = useContext(GLOBAL_CONTEXT);
  const [customer, setStaff] = useState<AccountDTO>({} as AccountDTO);
  const [status, setStatus] = useState(false);
  useEffect(() => {
    let id = globalContext.userContext.getUserId();

    if (id == "") {
      navigate("/");
    }

    accountService
      .get(id)
      .then((res) => {
        setStaff(res.data);
        setStatus(res.data.enabled);
      })
      .catch((err) => {
        navigate("/");
      });
  }, []);
  const navigate = useNavigate();

  const onStatus = (id: string) => {
    if (customer.enabled)
      Swal.fire({
        title: `Bạn muốn khóa tài khoản @` + customer.username + `?`,
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
            .update({ ...customer, enabled: !customer.enabled })
            .then((res) => {
              setStaff(res.data);
              Swal.fire({
                title: "Đã khóa tài khoản @" + customer.username + ".",
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
          .update({ ...customer, enabled: !customer.enabled })
          .then((res) => {
            setStaff(res.data);
            Swal.fire({
              title: "Đã mở khóa tài khoản @" + customer.username + ".",
              text: "Tài khoản này có thể đăng nhập và hoạt động trở lại.",
              icon: "info",
              //   showConfirmButton: false,
              confirmButtonText: "Đã hiểu",
              //   timer: 2200,
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
      {/* <Link to="-1"> */}
      <Button colorScheme="teal" size="sm" ml="12" onClick={() => navigate(-1)}>
        {"<< Quay lại"}
      </Button>
      {/* </Link> */}
      <Card marginX="200" marginY="6" p="8" border="1px lightgray solid">
        <HStack justifyContent="space-between" marginTop="10px">
          {/* <Link to={"/staff/edit"}>
            <Button colorScheme="blue" size="md">
              Chỉnh sửa
            </Button>
          </Link> */}
          <Badge colorScheme="teal" fontSize="md">
            Hồ sơ khách hàng
          </Badge>
          <Button
            colorScheme={status ? "orange" : "teal"}
            size="md"
            onClick={() => onStatus(customer.id)}
          >
            {status ? "Khóa" : "Mở khóa"}
          </Button>
        </HStack>

        <UserProfileView userDTO={customer} />
      </Card>
    </>
  );
};

export default StaffCustomerDetailPage;
