import { Button, HStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import OrderDTO from "../../type/OrderDTO";
import { GLOBAL_CONTEXT } from "../../App";
import { useNavigate } from "react-router-dom";

const CustomerOrderActions = ({ order }: { order: OrderDTO }) => {
  const globalContext = useContext(GLOBAL_CONTEXT);
  const navigate = useNavigate();
  const status = order.status;

  return (
    <HStack w="100%" justifyContent={"right"} p="4">
      {status == "SUCCESSFUL" && <Button colorScheme="blue">Đánh giá</Button>}

      <Button
        colorScheme="blue"
        variant="outline"
        onClick={() => {
          globalContext.orderContext.setOrderId(order.id);
          navigate("/order/detail");
        }}
      >
        Chi tiết
      </Button>

      {status == "SUCCESSFUL" && (
        <Button colorScheme="blue" variant="outline">
          Mua lại
        </Button>
      )}
      {["PENDING", "DELIVERYING"].includes(status) && (
        <Button
          background="gray.600"
          color="white"
          isDisabled={true}
          _hover={{
            background: "gray.600",
            color: "white",
          }}
        >
          Chờ
        </Button>
      )}
      {status == "PENDING" && (
        <Button colorScheme="red" variant="outline">
          Hủy
        </Button>
      )}
    </HStack>
  );
};

export default CustomerOrderActions;
