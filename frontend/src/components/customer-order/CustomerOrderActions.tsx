import { Button, HStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import OrderDTO from "../../type/OrderDTO";
import { GLOBAL_CONTEXT } from "../../App";
import { useNavigate } from "react-router-dom";
import { updateOrder } from "../../services/customer-order-service";
import cartActionSerivce from "../../services/cart-action-service";
import CartDTO from "../../type/CartDTO";

const CustomerOrderActions = ({
  order,
  setOrder,
}: {
  order: OrderDTO;
  setOrder: (order: OrderDTO) => void;
}) => {
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
        <Button
          colorScheme="blue"
          variant="outline"
          onClick={() => {
            order.orderDetails.forEach(async (od) => {
              let cart = await cartActionSerivce.addToCart(od.product.id, 0);

              cart.quantity = od.quantity;
              cart = await cartActionSerivce.updateCart(cart);

              globalContext.selectedCartContext.addItem(cart);
              navigate("/cart");
            });
          }}
        >
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
        <Button
          colorScheme="red"
          variant="outline"
          onClick={async () => {
            order.status = "CANCELLED";
            const orderDTO = await updateOrder(order);
            if (order === orderDTO) {
              alert("Không thể hủy đơn hàng.");
              order.status = "PENDING";
            } else {
              setOrder(orderDTO);
            }
          }}
        >
          Hủy
        </Button>
      )}
    </HStack>
  );
};

export default CustomerOrderActions;
