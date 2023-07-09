import CartDTO from "../type/CartDTO";
import CategoryDTO from "../type/CategoryDTO";
import apiClient from "./api-client";
import createHttpService from "./http-service";

const endpoint = "staff/category";

export default createHttpService<CategoryDTO>(apiClient, endpoint);
