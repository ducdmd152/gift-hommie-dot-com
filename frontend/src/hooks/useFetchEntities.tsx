import { AxiosRequestConfig, CanceledError } from "axios";
import { useEffect, useState } from "react";
import { HttpEntity, HttpService } from "../services/http-service";
import FetchResponse from "../type/FetchResponse";
import PagableDTO from "../type/PagableDTO";

const useFetchEntities = <E extends HttpEntity>(
  service: HttpService<E>,
  requestConfig?: AxiosRequestConfig,
  deps?: any[]
) => {
  const [entities, setEntities] = useState<E[]>([]);
  const [pagable, setPagable] = useState<PagableDTO | null>(null);
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
          setPagable(response.data.pagable);
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

  return { entities, error, isLoading, setEntities, setError };
};

export default useFetchEntities;
