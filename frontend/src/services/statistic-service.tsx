import axios from "axios";
import apiClient from "./api-client";
import utilService from "./util-service";
import StatisticRevenueDTO from "../type/StatisticRevenueDTO";
import OrderDTO from "../type/OrderDTO";
import StatisticOrderDTO from "../type/StatisticOrderDTO";
import StatisticProductDTO from "../type/StatisticProductDTO";
import StatisticCustomerDTO from "../type/StatisticCustomerDTO";

const getRevenue = async () => {
  let result = {} as StatisticRevenueDTO;
  await apiClient
    .get("manager/statistic/revenue", {
      headers: {
        auth: utilService.getCurrentUser(),
      },
      auth: utilService.getCurrentUser(),
    })
    .then((res) => {
      result = res.data as StatisticRevenueDTO;
    })
    .catch((err) => {});
  return result;
};
const getTodaySuccessfulOrders = async () => {
  let result = [] as OrderDTO[];
  await apiClient
    .get("manager/statistic/today/order/successful", {
      headers: {
        auth: utilService.getCurrentUser(),
      },
      auth: utilService.getCurrentUser(),
    })
    .then((res) => {
      result = res.data as OrderDTO[];
    })
    .catch((err) => {});
  return result;
};
const getOrder = async () => {
  let result = {} as StatisticOrderDTO;
  await apiClient
    .get("manager/statistic/order", {
      headers: {
        auth: utilService.getCurrentUser(),
      },
      auth: utilService.getCurrentUser(),
    })
    .then((res) => {
      result = res.data as StatisticOrderDTO;
    })
    .catch((err) => {});
  return result;
};
const getProduct = async () => {
  let result = {} as StatisticProductDTO;
  await apiClient
    .get("manager/statistic/product", {
      headers: {
        auth: utilService.getCurrentUser(),
      },
      auth: utilService.getCurrentUser(),
    })
    .then((res) => {
      result = res.data as StatisticProductDTO;
    })
    .catch((err) => {});
  return result;
};
const getCustomer = async () => {
  let result = {} as StatisticCustomerDTO;
  await apiClient
    .get("manager/statistic/user", {
      headers: {
        auth: utilService.getCurrentUser(),
      },
      auth: utilService.getCurrentUser(),
    })
    .then((res) => {
      result = res.data as StatisticCustomerDTO;
    })
    .catch((err) => {});
  return result;
};
export default {
  getRevenue,
  getTodaySuccessfulOrders,
  getOrder,
  getProduct,
  getCustomer,
};
