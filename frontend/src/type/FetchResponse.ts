import PagableDTO from "./PagableDTO";

type FetchResponse<T> = {
  content: Array<T>;
  pagable: PagableDTO;
};

export default FetchResponse;
