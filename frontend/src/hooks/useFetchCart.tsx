import { PaginationQuery } from "../components/Pagination";
import cartService from "../services/cart-service";
import CartDTO from "../type/CartDTO";
import HttpRequestQuery from "../type/HttpRequestQuery";
import useFetchEntities from "./useFetchEntities";

export interface CartQuery extends HttpRequestQuery, PaginationQuery {}

const useFetchCart = (requestQuery: CartQuery) => {
  const { entities, pageable, error, isLoading, setEntities, setError } =
    useFetchEntities<CartDTO>(
      cartService,
      {
        params: {
          page: requestQuery?.page,
          size: requestQuery?.size,
          search: requestQuery?.search,
          sort: requestQuery?.sort,
          _order: requestQuery?.order,
        },
      },
      [requestQuery]
    );

  return {
    carts: entities,
    pageable,
    isLoading,
    error,
    // setError,
    // setUsers: setEntities,
  };
};

export default useFetchCart;
