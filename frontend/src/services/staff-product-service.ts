import apiClient from "./api-client";
import createHttpService from "./http-service";

const endpoint = "staff/product";

export interface StaffProductDTO {
  id: number;
  name: string;
  description: string;
  quantity: 20;
  price: number;
  categoryId: number;
  categoryName: string;
  avatar: string;
}

export default createHttpService<StaffProductDTO>(apiClient, endpoint);
