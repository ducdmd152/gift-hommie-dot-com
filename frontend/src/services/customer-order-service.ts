import apiClient from "./api-client";
import createHttpService from "./http-service";
import OrderDTO from "../type/OrderDTO";

const endpoint = "customer/order";

export default createHttpService<OrderDTO>(apiClient, endpoint);
