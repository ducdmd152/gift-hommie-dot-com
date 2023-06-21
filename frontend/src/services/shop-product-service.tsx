import FeedbackDTO from "../type/FeedbackDTO";
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

const getFeedbacks = async (productId: number) => {
  let result = { feedbacks: [] as FeedbackDTO[] } as FeedbackResponse;

  await apiClient
    .get("public/product/feedback/" + productId)
    .then((response) => {
      result = response.data as FeedbackResponse;
    })
    .catch((error) => {});
  return result;
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
