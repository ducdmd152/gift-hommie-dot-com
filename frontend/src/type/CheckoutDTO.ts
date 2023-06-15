import CartDTO from "./CartDTO";
export default interface CheckoutDTO {
  id: string;
  name: string;
  phone: string;

  address: string;
  wardName: string;
  districtName: string;
  provinceName: string;

  wardCode: number;
  districtID: number;
  provinceID: number;

  message: string;

  carts: CartDTO[];

  paymentMethod: number;

  shippingFee: number;
  shippingMethod: number;

  expectedDeliveryTime: string;
}
