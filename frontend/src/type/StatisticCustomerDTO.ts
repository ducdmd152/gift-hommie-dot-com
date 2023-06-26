import OrderDTO from "./OrderDTO";
import UserDTO from "./UserDTO";
interface OrderData {
  user: UserDTO;
  orderList: OrderDTO[];
}
interface AmountData {
  user: UserDTO;
  amount: number;
}
interface OrderValue {
  userTopOrderDTOList: OrderData[];
}
interface AmountValue {
  userTopAmountDTOList: AmountData[];
}
export default interface StatisticCustomerDTO {
  order: OrderValue;
  // product: Value;
  amountDTO: AmountValue;
}
