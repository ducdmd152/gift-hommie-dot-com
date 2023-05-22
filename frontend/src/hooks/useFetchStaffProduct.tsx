import staffProductService, {
  StaffProductDTO,
} from "../services/staff-product-service";
import useFetchEntities from "./useFetchEntities";

export interface RequestQuery {
  sort: string;
  order: string;
  searchText: string;
}

const useFetchStaffProduct = (requestQuery: RequestQuery | null) => {
  const { entities, error, isLoading, setEntities, setError } =
    useFetchEntities<StaffProductDTO>(
      staffProductService,
      {
        params: {
          _sort: requestQuery?.sort,
          _order: requestQuery?.order,
          username_like: requestQuery?.searchText,
        },
      },
      [requestQuery]
    );

  return {
    products: entities,
    isLoading,
    error,
    // setError,
    // setUsers: setEntities,
  };
};

export default useFetchStaffProduct;
