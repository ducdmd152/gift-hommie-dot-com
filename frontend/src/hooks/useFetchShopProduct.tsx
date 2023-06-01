import { PaginationQuery } from "../components/Pagination";
import shopProductService, {
  ShopProductDTO,
} from "../services/shop-product-service";
import staffProductService, {
  StaffProductDTO,
} from "../services/staff-product-service";
import CategoryDTO from "../type/CategoryDTO";
import HttpRequestQuery from "../type/HttpRequestQuery";
import useFetchEntities from "./useFetchEntities";

export interface ShopProductQuery extends HttpRequestQuery, PaginationQuery {
  related: number;
  category: number;
}

const useFetchStaffProduct = (requestQuery: ShopProductQuery) => {
  const { entities, pageable, error, isLoading, setEntities, setError } =
    useFetchEntities<ShopProductDTO>(
      shopProductService,
      {
        params: {
          page: requestQuery?.page,
          size: requestQuery?.size,
          search: requestQuery?.search,
          category: requestQuery?.category,
          sort: requestQuery?.sort,
          related: requestQuery?.related,
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
