import CartDTO from "./CartDTO";
export default interface CheckoutDTO {
  name: string;
  phone: string;
  address: string;
  wardCode: number;
  wardName: string;
  districtID: number;
  districtName: string;
  provinceID: number;
  provinceName: string;
  message: string;
  carts: CartDTO[];
  paymentMethod: number;
}
