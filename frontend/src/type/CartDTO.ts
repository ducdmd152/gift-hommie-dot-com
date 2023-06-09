import ProductDTO from "./ProductDTO";

export default interface CategoryDTO {
  id: number;
  productId: number;
  quantity: number;
  product: ProductDTO;
  total: number;
}
