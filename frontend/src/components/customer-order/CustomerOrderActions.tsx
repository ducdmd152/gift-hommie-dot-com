import { Button, HStack, useDisclosure } from "@chakra-ui/react";
import React, { useContext } from "react";
import OrderDTO from "../../type/OrderDTO";
import { GLOBAL_CONTEXT } from "../../App";
import { useNavigate } from "react-router-dom";
import customerOrderService, {
  updateOrder,
} from "../../services/customer-order-service";
import cartActionSerivce from "../../services/cart-action-service";
import Swal from "sweetalert2";
import CustomerOrderFeedbackModal from "./CustomerOrderFeedbackModal";
import utilService from "../../services/util-service";

const CustomerOrderActions = ({
  order,
  setOrder,
}: {
  order: OrderDTO;
  setOrder: (order: OrderDTO) => void;
}) => {
  const globalContext = useContext(GLOBAL_CONTEXT);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const status = order.status;
  const onCancel = async () => {
    Swal.fire({
      title: "Bạn có muốn hủy đơn hàng?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "orange",
      cancelButtonColor: "gray",
      confirmButtonText: "Có",
      cancelButtonText: "Không",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let cur = order;
        await customerOrderService
          .get(order.id)
          .then((res) => (cur = res.data as OrderDTO))
          .catch((error) => {});
        if (cur.status != "PENDING") {
          setOrder(cur);
          Swal.fire({
            position: "center",
            icon: "info",
            title:
              "Đơn hàng đã chuyển trạng thái, không thể hủy, vui lòng thử lại.",
            showConfirmButton: false,
            timer: 2000,
          });
          return;
        }
        order.status = "CANCELLED";
        const orderDTO = await updateOrder(order);
        if (order === orderDTO) {
          alert("Không thể hủy đơn hàng.");
          order.status = "PENDING";
        } else {
          setOrder(orderDTO);
          Swal.fire({
            position: "center",
            icon: "info",
            title: "Đã hủy đơn hàng.",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    });
  };
  // console.log(order.createTime);

  return (
    <HStack w="100%" justifyContent={"right"} p="4">
      <CustomerOrderFeedbackModal
        order={order}
        setOrder={setOrder}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
      {status == "SUCCESSFUL" &&
        !order.evaluated &&
        !utilService.isOver30DaysFromToday(
          utilService.fconvertStringToDate(order.createTime)
        ) && (
          <Button
            colorScheme="blue"
            onClick={() => {
              onOpen();
              setOrder(order);
            }}
          >
            Đánh giá{" "}
          </Button>
        )}

      {order.evaluated && (
        <Button colorScheme="blue" isDisabled={true}>
          Đã đánh giá
        </Button>
      )}

      {["SUCCESSFUL", "CANCELLED"].includes(status) && (
        <Button
          colorScheme="teal"
          // variant="outline"
          onClick={async () => {
            globalContext.selectedCartContext.clean();

            await order.orderDetails.forEach(async (od) => {
              let cart = await cartActionSerivce.addToCart(od.product.id, 0);

              cart.quantity = od.quantity;
              cart = await cartActionSerivce.updateCart(cart);

              globalContext.selectedCartContext.addItem(cart);
            });

            navigate("/cart");
          }}
        >
          Mua lại
        </Button>
      )}

      {window.location.pathname == "/order" && (
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
      )}

      {["PENDING", "CONFIRMED", "DELIVERYING"].includes(status) && (
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
        <Button colorScheme="red" variant="outline" onClick={onCancel}>
          Hủy
        </Button>
      )}
    </HStack>
  );
};

export default CustomerOrderActions;
