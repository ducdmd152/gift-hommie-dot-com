import { PaginationQuery } from "../components/Pagination";
import customerOrderService from "../services/customer-order-service";
import shopProductService, {
  ShopProductDTO,
} from "../services/shop-product-service";
import staffProductService, {
  StaffProductDTO,
} from "../services/staff-product-service";
import CategoryDTO from "../type/CategoryDTO";
import HttpRequestQuery from "../type/HttpRequestQuery";
import OrderDTO from "../type/OrderDTO";
import useFetchEntities from "./useFetchEntities";

export interface CustomerOrderQuery extends HttpRequestQuery, PaginationQuery {
  status: string;
}

const useFetchCustomerOrder = (requestQuery: CustomerOrderQuery) => {
  const { entities, pageable, error, isLoading, setEntities, setError } =
    useFetchEntities<OrderDTO>(
      customerOrderService,
      {
        params: {
          page: requestQuery?.page,
          size: requestQuery?.size,
          search: requestQuery?.search,
          sort: requestQuery?.sort,
          status: requestQuery?.status,
          _order: requestQuery?.order,
        },
      },
      [requestQuery]
    );

  return {
    orders: entities,
    pageable,
    isLoading,
    error,
    setOrders: setEntities,
    // setError,
    // setUsers: setEntities,
  };
};

export default useFetchCustomerOrder;
