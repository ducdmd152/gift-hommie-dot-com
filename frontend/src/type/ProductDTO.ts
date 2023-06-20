export default interface ProductDTO {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  categoryId: number;
  categoryName: string;
  avatar: string;

  available: number;
  // sold: number;
  // ordered: number;
}
