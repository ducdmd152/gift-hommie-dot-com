import apiClient from "./api-client";
import createHttpService from "./http-service";
import CheckoutDTO from "../type/OrderDTO";

const endpoint = "customer/checkout";

export default createHttpService<CheckoutDTO>(apiClient, endpoint);
