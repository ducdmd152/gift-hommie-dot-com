import React from "react";
import {
  Button,
  Card,
  HStack,
  VStack,
  Wrap,
  WrapItem,
  Avatar,
} from "@chakra-ui/react";
import StaffProfileView from "../../components/user/StaffProfileView";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import UserDTO from "../../type/UserDTO";

interface Props {
  currentProductId: number | null
}
const StaffViewProfilePage = ({ currentProductId }: Props) => {
  const [staff, setStaff] = useState<UserDTO>({} as UserDTO);

  const navigate = useNavigate();

  return (
    <>
      <Card marginX="200" marginY="6" p="8" border="1px lightgray solid">
        <StaffProfileView currentProductId={currentProductId} />
      </Card>
    </>
  );
};

export default StaffViewProfilePage;
