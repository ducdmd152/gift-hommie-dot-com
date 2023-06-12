import { useState, useEffect } from 'react'
import UserProfileEdit from "../../components/user/UserProfileEdit";
import managerStaffService, { ManagerStaffDTO } from '../../services/manager-staff-service';
import { Link, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from "react-hook-form";
import {
  Badge, Box, Button, Card, CardBody, FormControl, FormHelperText, FormLabel, HStack,
  Heading, Input, NumberInput, NumberInputField, Select, Textarea, VStack,
  Image, Flex, WrapItem, Wrap, Avatar, Radio, RadioGroup, Stack
} from "@chakra-ui/react";

interface Props {
  userId: string
}
interface FormData extends ManagerStaffDTO { }

const ManagerStaffEditPage = ({ userId }: Props) => {
  const [staff, setStaff] = useState<ManagerStaffDTO>(
    {} as ManagerStaffDTO
  );

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
        navigate("/staff");
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const onSubmit = (data: FieldValues) => {
    const updateStaff = data as ManagerStaffDTO;
    updateStaff.id = staff.id;

    managerStaffService
      .update(updateStaff)
      .then(() => {
        navigate("/staff/detail");
      })
      .catch(() => {
        alert(`Không thể sửa thông tin của "${staff.username}".\n Vui lòng thử lại.`);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card marginX="200" marginY="6" p="8" border="1px lightgray solid">

          <UserProfileEdit userId={userId} />

          <HStack justifyContent='center' marginTop='50px' marginLeft='400px'>
            <Button type="submit" colorScheme="blue" size="md">
              Save
            </Button>
            {/* <Link to={"/staff/detail"}> */}
            <Button colorScheme="red" size="md"
              onClick={() => {
                if (
                  confirm(
                    `Bạn muốn hủy thay đổi, thông tin sẽ không được lưu.`
                  )
                ) {
                  navigate("/staff/detail");
                }
              }}
            >
              Cancel
            </Button>
            {/* </Link> */}
          </HStack>
        </Card>
      </form>
    </>
  )
};

export default ManagerStaffEditPage;
