import { PaginationQuery } from "../components/Pagination";
import publicCategoryService from "../services/public-category-service";
import CategoryDTO from "../type/CategoryDTO";
import HttpRequestQuery from "../type/HttpRequestQuery";
import useFetchEntities from "./useFetchEntities";

export interface CategoryQuery extends HttpRequestQuery, PaginationQuery {}

const useFetchCategories = (requestQuery: CategoryQuery) => {
  const { entities, pageable, error, isLoading, setEntities, setError } =
    useFetchEntities<CategoryDTO>(
      publicCategoryService,
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
    categories: entities,
    pageable,
    isLoading,
    error,
    // setError,
    setCategories: setEntities,
  };
};

export default useFetchCategories;
