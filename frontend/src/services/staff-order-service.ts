import OrderDTO from "../type/OrderDTO";
import ProductDTO from "../type/ProductDTO";
import apiClient from "./api-client";
import createHttpService from "./http-service";

const endpoint = "staff/order";

export default createHttpService<OrderDTO>(apiClient, endpoint);

const orderService = createHttpService<OrderDTO>(apiClient, endpoint);
export const staffUpdateOrder = async (order: OrderDTO) => {
  return await orderService
    .update(order)
    .then((response) => {
      return response.data as OrderDTO;
    })
    .catch((error) => {
      return order;
    });
};
