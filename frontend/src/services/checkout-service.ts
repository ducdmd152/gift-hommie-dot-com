import CheckoutDTO from "../type/CheckoutDTO";
import apiClient from "./api-client";
import createHttpService from "./http-service";

const endpoint = "customer/checkout";

export default createHttpService<CheckoutDTO>(apiClient, endpoint);
