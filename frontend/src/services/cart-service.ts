import CartDTO from "../type/CartDTO";
import apiClient from "./api-client";
import createHttpService from "./http-service";

const endpoint = "customer/cart";

export default createHttpService<CartDTO>(apiClient, endpoint);
