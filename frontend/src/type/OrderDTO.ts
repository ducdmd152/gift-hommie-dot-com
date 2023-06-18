import OrderDetailDTO from "./OrderDetailDTO";
import UserDTO from "./UserDTO";

export default interface OrderDTO {
  id: number;
  // personal inf
  name: string;
  phone: string;

  address: string;
  // = checkoutDTO.address + " " + checkoutDTO.wardName + " " + checkoutDTO.districtName + " " + checkoutDTO.provinceName
  wardCode: number;
  districtID: number;
  provinceID: number;

  message: string;

  orderDetails: OrderDetailDTO[];

  paymentMethod: number; // ~ paymentId

  shippingFee: number;
  shippingMethod: number;

  user: UserDTO; // The user order

  status: string; // PENDING CANCELLED REFUSED
  // CONFIRMED DELIVERING SUCCESSFUL FAIL
  // AUTO => PENDING WHEN CREATING
  comment: string;
  orderTime: string; // Auto-update by BE when CREATE ORDER
  lastUpdatedTime: string; // Auto-update by BE when CREATE/UPDATE ORDER

  expectedDeliveryTime: string; // ADD MORE // DATETIME
}
