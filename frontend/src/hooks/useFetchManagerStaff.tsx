import { PaginationQuery } from "../components/Pagination";
import managerStaffService, {
  ManagerStaffDTO,
} from "../services/manager-staff-service";
import staffProductService, {
  StaffProductDTO,
} from "../services/staff-product-service";
import CategoryDTO from "../type/CategoryDTO";
import HttpRequestQuery from "../type/HttpRequestQuery";
import useFetchEntities from "./useFetchEntities";

// 1
export interface ManagerStaffQuery extends HttpRequestQuery, PaginationQuery {
  //   category: number; // logic
  // search: string;
}

// 2
const useFetchManagerStaff = (requestQuery: ManagerStaffQuery | null) => {
  const { entities, pageable, error, isLoading, setEntities, setError } =
    useFetchEntities<ManagerStaffDTO>( // 3
      managerStaffService, // 4
      {
        params: {
          page: requestQuery?.page,
          size: requestQuery?.size,
          search: requestQuery?.search,
          //   category: requestQuery?.category,
          _sort: requestQuery?.sort,
          _order: requestQuery?.order,
        },
      },
      [requestQuery]
    );

  //5
  return {
    staffs: entities,
    pageable,
    isLoading,
    error,
    // setError,
    // setUsers: setEntities,
  };
};

export default useFetchManagerStaff;
