import React from "react";
import { Button, Card, HStack, VStack, Wrap, WrapItem, Avatar } from "@chakra-ui/react";
import StaffProfileView from "../../components/user/StaffProfileView";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import UserDTO from "../../type/UserDTO";

interface Props {
  currentProductId: number | null
}
const StaffViewProfilePage = ({ currentProductId }: Props) => {
  const [product, setProduct] = useState<UserDTO>(
    {} as UserDTO
  )

  return (
    <>
      <Card marginX="200" marginY="6" p="8" border="1px lightgray solid">
        <HStack justifyContent='flex-end' marginTop='10px'>
          <Link to={""}>
            <Button colorScheme="blue" size="md">
              Chỉnh sửa
            </Button>
          </Link>

          {/* <Button colorScheme="red" size="md"
            onClick={() => onDeleteStaff(staff.id)}
          >
            Xóa
          </Button> */}
        </HStack>
        <StaffProfileView currentProductId={currentProductId} />
      </Card>
    </>
  )
};


export default StaffViewProfilePage;
