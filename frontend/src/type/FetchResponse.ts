import PagableDTO from "./PageableDTO";

type FetchResponse<T> = {
  content: Array<T>;
  pageable: PagableDTO;
};

export default FetchResponse;
