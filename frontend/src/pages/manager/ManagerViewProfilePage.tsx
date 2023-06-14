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
        <ManagerProfileView userId={userId} />
      </Card>
    </>
  )
};

export default ManagerViewProfilePage;
