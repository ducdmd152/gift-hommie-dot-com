import { PaginationQuery } from "../components/Pagination";
import staffOrderService from "../services/staff-order-service";




import HttpRequestQuery from "../type/HttpRequestQuery";
import OrderDTO from "../type/OrderDTO";
import useFetchEntities from "./useFetchEntities";

export interface StaffOrderQuery extends HttpRequestQuery, PaginationQuery {
  status: string;
}

const useFetchStaffOrder = (requestQuery: StaffOrderQuery) => {
  const { entities, pageable, error, isLoading, setEntities, setError } =
    useFetchEntities<OrderDTO>(
      staffOrderService,
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
    // setError,
    setOrders: setEntities,
  };
};

export default useFetchStaffOrder;
