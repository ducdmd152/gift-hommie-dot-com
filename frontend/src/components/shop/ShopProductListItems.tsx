import React from "react";
import { ShopProductDTO } from "../../services/shop-product-service";
interface Props {
  products: ShopProductDTO[];
}
const ShopProductListItems = ({ products }: Props) => {
  return (
    <div>
      {products.map((product) => (
        <h2>{product.name}</h2>
      ))}
    </div>
  );
};

export default ShopProductListItems;
