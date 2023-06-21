import { PaginationQuery } from "../components/Pagination";
import FeedbackDTO from "../type/FeedbackDTO";
import HttpRequestQuery from "../type/HttpRequestQuery";
import PageableDTO from "../type/PageableDTO";
import apiClient from "./api-client";

export interface ProductAdditionalDTO {
  sold: number;
  rating: number;
}

export interface FeedbackResponse {
  feedbacks: FeedbackDTO[];
  pageable: PageableDTO;
}

export interface FeedBackResponseQuery
  extends HttpRequestQuery,
    PaginationQuery {}

const getFeedbacks = async (
  productId: number,
  requestQuery: FeedBackResponseQuery
) => {
  let result = { feedbacks: [] as FeedbackDTO[] } as FeedbackResponse;
  let pageable = {} as PageableDTO;

  await apiClient
    .get("public/product/feedback/" + productId, {
      params: {
        page: requestQuery?.page,
        size: requestQuery?.size,
      },
    })
    .then((response) => {
      result = response.data as FeedbackResponse;
    })
    .catch((error) => {});

  return { result, pageable };
};

const getProductAdditional = async (productId: number) => {
  let result = {} as ProductAdditionalDTO;

  await apiClient
    .get("public/product/additional/" + productId)
    .then((response) => {
      result = response.data as ProductAdditionalDTO;
    })
    .catch((error) => {});
  return result;
};

export default {
  getFeedbacks,
  getProductAdditional,
};
