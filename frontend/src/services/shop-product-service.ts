import ProductDTO from "../type/ProductDTO";
import apiClient from "./api-client";
import createHttpService from "./http-service";

const endpoint = "public/product";

export interface ShopProductDTO extends ProductDTO {
  available: number;
  sold: number;
}

export default createHttpService<ShopProductDTO>(apiClient, endpoint);
