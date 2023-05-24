import { AxiosRequestConfig, CanceledError } from "axios";
import { useEffect, useState } from "react";
import { HttpEntity, HttpService } from "../services/http-service";
import FetchResponse from "../type/FetchResponse";
import PagableDTO from "../type/PageableDTO";

const useFetchEntities = <E extends HttpEntity>(
  service: HttpService<E>,
  requestConfig?: AxiosRequestConfig,
  deps?: any[]
) => {
  const [entities, setEntities] = useState<E[]>([]);
  const [pageable, setPageable] = useState<PagableDTO>({} as PagableDTO);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => {
      const controller = new AbortController();
      setIsLoading(true);

      const { request, cancel } =
        service.getAll<FetchResponse<E>>(requestConfig);

      request
        .then((response) => {
          setEntities(response.data.content);
          setPageable(response.data.pageable);
          setIsLoading(false); // hide the loader
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
          setIsLoading(false); // hide the loader
        });

      return () => cancel();
    },
    deps ? [...deps] : []
  );

  return { entities, error, isLoading, pageable, setEntities, setError };
};

export default useFetchEntities;
