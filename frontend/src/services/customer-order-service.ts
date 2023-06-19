import apiClient from "./api-client";
import createHttpService from "./http-service";
import OrderDTO from "../type/OrderDTO";

const endpoint = "customer/order";

export default createHttpService<OrderDTO>(apiClient, endpoint);

const orderService = createHttpService<OrderDTO>(apiClient, endpoint);

export const updateOrder = async (order: OrderDTO) => {
  return await orderService
    .update(order)
    .then((response) => {
      return response.data as OrderDTO;
    })
    .catch((error) => {
      return order;
    });
};
