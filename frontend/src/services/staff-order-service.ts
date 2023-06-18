import OrderDTO from "../type/OrderDTO";
import ProductDTO from "../type/ProductDTO";
import apiClient from "./api-client";
import createHttpService from "./http-service";

const endpoint = "staff/order";

export default createHttpService<OrderDTO>(apiClient, endpoint);
