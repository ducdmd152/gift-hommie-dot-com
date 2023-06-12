import React from "react";
import { Button, Card, VStack, Wrap, WrapItem, Avatar } from "@chakra-ui/react";


interface Props {
  currentProductId: number
}
const StaffViewProfilePage = ({ currentProductId }: Props) => {

  return (
    <>
      <Card marginX="200" marginY="6" p="8" border="1px lightgray solid">
        {/* <HStack justifyContent='flex-end' marginTop='10px'>
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
        </HStack> */}
        {/* <StaffProfileView userId={userId} /> */}
      </Card>
    </>
  )
};


export default StaffViewProfilePage;
