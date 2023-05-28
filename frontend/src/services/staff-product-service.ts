import ProductDTO from "../type/ProductDTO";
import apiClient from "./api-client";
import createHttpService from "./http-service";

const endpoint = "staff/product";

export interface StaffProductDTO extends ProductDTO {}

export default createHttpService<StaffProductDTO>(apiClient, endpoint);
