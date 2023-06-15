import utilService from "../services/util-service";

export interface OrderStatusItem {
  label: string;
  desc: string;
  descStaff: string;
  descCustomer: string;
  backgroundColor: string;
  getMessage: () => string;
}
const ORDER_STATUS_LIST = {
  PENDING: {
    label: "PENDING",
    desc: "Chờ xác nhận",
    backgroundColor: "yellow.400",
  },
  CANCELLED: {
    label: "CANCELLED",
    desc: "Đã hủy",
    descStaff: "Đã hủy bởi khách hàng",
    descCustomer: "Đã hủy bởi bạn",
    backgroundColor: "gray.400",
  },
  REFUSED: {
    label: "REFUSED",
    desc: "Đã từ chối",
    descStaff: "Đã từ chối",
    descCustomer: "Shop đã từ chối",
    backgroundColor: "gray.400",
  },
  CONFIRMED: {
    label: "CONFIRMED",
    desc: "Đã xác nhận",
    descStaff: "Đã xác nhận",
    descCustomer: "Đã được xác nhận, shop đang chuẩn bị hàng.",
    backgroundColor: "teal.300",
  },
  DELIVERING: {
    label: "DELIVERING",
    desc: "Đang vận chuyển",
    descStaff: "Đang giao",
    descCustomer: "Đang giao",
    backgroundColor: "green.300",
  },
  SUCCESSFUL: {
    label: "SUCCESSFUL",
    desc: "Đơn hàng đã hoàn thành",
    descStaff: "Đơn hàng đã hoàn thành",
    descCustomer: "Đơn hàng đã hoàn thành",
    backgroundColor: "green.400",
  },
  FAIL: {
    label: "FAIL",
    desc: "Đơn hàng thất bại",
    descStaff: "Đơn hàng không thành công",
    descCustomer: "Đơn hàng không thành công",
    backgroundColor: "orange.200",
  },
};
export default ORDER_STATUS_LIST;
