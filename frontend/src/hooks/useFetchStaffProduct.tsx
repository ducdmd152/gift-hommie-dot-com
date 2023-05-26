import { PaginationQuery } from "../components/Pagination";
import staffProductService, {
  StaffProductDTO,
} from "../services/staff-product-service";
import CategoryDTO from "../type/CategoryDTO";
import HttpRequestQuery from "../type/HttpRequestQuery";
import useFetchEntities from "./useFetchEntities";

export interface StaffProductQuery extends HttpRequestQuery, PaginationQuery {
  category: number;
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
          _sort: requestQuery?.sort,
          _order: requestQuery?.order,
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
