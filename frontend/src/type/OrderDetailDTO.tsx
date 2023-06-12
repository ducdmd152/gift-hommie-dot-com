import ProductDTO from "./ProductDTO";

export default interface CategoryDTO {
  id: number;
  orderID: number;
  productId: number;
  quantity: number;
  product: ProductDTO;
  total: number;
}
