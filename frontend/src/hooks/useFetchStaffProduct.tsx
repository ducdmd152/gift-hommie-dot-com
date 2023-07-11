import { PaginationQuery } from "../components/Pagination";
import staffProductService, {
  StaffProductDTO,
} from "../services/staff-product-service";
import HttpRequestQuery from "../type/HttpRequestQuery";
import useFetchEntities from "./useFetchEntities";

export interface StaffProductQuery extends HttpRequestQuery, PaginationQuery {
  category: number;
  status: boolean | null;
}

const useFetchStaffProduct = (requestQuery: StaffProductQuery | null) => {
  const { entities, pageable, error, isLoading, setEntities, setError } =
    useFetchEntities<StaffProductDTO>(
      staffProductService,
      {
        params: {
          page: requestQuery?.page,
          size: requestQuery?.size,
          search: requestQuery?.search,
          category: requestQuery?.category,
          sort: requestQuery?.sort,
          _order: requestQuery?.order,
          status: requestQuery?.status,
        },
      },
      [requestQuery]
    );

  return {
    products: entities,
    pageable,
    isLoading,
    error,
    // setError,
    // setUsers: setEntities,
  };
};

export default useFetchStaffProduct;
