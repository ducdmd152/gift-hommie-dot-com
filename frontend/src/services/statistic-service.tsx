import axios from "axios";
import apiClient from "./api-client";
import utilService from "./util-service";
import StatisticRevenueDTO from "../type/StatisticRevenueDTO";

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

export default {
  getRevenue,
};
