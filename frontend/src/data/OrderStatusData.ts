import utilService from "../services/util-service";

export interface OrderStatusItem {
  label: string;
  desc: string;
  descStaff: string;
  descCustomer: string;
  backgroundColor: string;
  colorScheme: string;
}

const ORDER_STATUS_MAP: { [status: string]: OrderStatusItem } = {
  PENDING: {
    label: "PENDING",
    desc: "Chờ xác nhận",
    descStaff: "Chờ xác nhận",
    descCustomer: "Chờ xác nhận",
    colorScheme: "yellow",
    backgroundColor: "yellow.400",
  } as OrderStatusItem,
  CANCELLED: {
    label: "CANCELLED",
    desc: "Đã hủy",
    descStaff: "Đã hủy bởi khách hàng",
    descCustomer: "Đã hủy bởi bạn",
    colorScheme: "gray",
    backgroundColor: "gray.400",
  } as OrderStatusItem,
  REFUSED: {
    label: "REFUSED",
    desc: "Đã từ chối",
    descStaff: "Đã từ chối",

    descCustomer: "Shop đã từ chối",
    colorScheme: "gray",
    backgroundColor: "gray.400",
  } as OrderStatusItem,
  CONFIRMED: {
    label: "CONFIRMED",
    desc: "Đã xác nhận",
    descStaff: "Đã xác nhận",
    descCustomer: "Đã được xác nhận, shop đang chuẩn bị hàng.",
    colorScheme: "teal",
    backgroundColor: "teal.300",
  } as OrderStatusItem,
  DELIVERING: {
    label: "DELIVERING",
    desc: "Đang vận chuyển",
    descStaff: "Đang giao",
    descCustomer: "Đang giao",
    colorScheme: "green",
    backgroundColor: "green.300",
  } as OrderStatusItem,
  SUCCESSFUL: {
    label: "SUCCESSFUL",
    desc: "Đơn hàng đã hoàn thành",
    descStaff: "Đơn hàng đã hoàn thành",
    descCustomer: "Đơn hàng đã hoàn thành",
    colorScheme: "green",
    backgroundColor: "green.400",
  } as OrderStatusItem,
  FAIL: {
    label: "FAIL",
    desc: "Đơn hàng thất bại",
    descStaff: "Đơn hàng không thành công",
    descCustomer: "Đơn hàng không thành công",
    colorScheme: "orange",
    backgroundColor: "orange.200",
  } as OrderStatusItem,
};
export default ORDER_STATUS_MAP;
