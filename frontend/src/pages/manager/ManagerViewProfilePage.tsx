import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, HStack } from "@chakra-ui/react";
import ManagerProfileView from "../../components/user/ManagerProfileView";

interface Props {
  userId: string;
}
const ManagerViewProfilePage = ({ userId }: Props) => {

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
        <ManagerProfileView userId={userId} />
      </Card>
    </>
  )
};

export default ManagerViewProfilePage;
