import ProductDTO from "./ProductDTO";

export default interface OrderDetailDTO {
  id: number;
  orderID: number;
  productId: number;
  price: number;
  quantity: number;
  product: ProductDTO;
  total: number;
  // tạo một hàm getTotal { return quantity*price }
  // => auto có field total trong json
}
