import { AxiosInstance, AxiosRequestConfig } from "axios";
import UserDTO from "../type/UserDTO";
import utilService from "./util-service";
export interface HttpEntity {
  id: number | string;
}

export class HttpService<T extends HttpEntity> {
  apiClient: AxiosInstance;
  endpoint: string;

  constructor(apiClient: AxiosInstance, endpoint: string) {
    this.apiClient = apiClient;
    this.endpoint = endpoint;
  }

  getAll<FetchResponse>(requestConfig?: AxiosRequestConfig) {
    let USER = utilService.getCurrentUser() as UserDTO;

    const controller = new AbortController();
    const request = this.apiClient.get<FetchResponse>(this.endpoint, {
      signal: controller.signal,
      auth: USER,
      ...requestConfig,
    });
    return { request, cancel: () => controller.abort() };
  }

  get(id: number | string) {
    let USER = utilService.getCurrentUser() as UserDTO;

    return this.apiClient.get(this.endpoint + "/" + id, {
      auth: USER,
    });
  }

  create(entity: T) {
    let USER = utilService.getCurrentUser() as UserDTO;

    return this.apiClient.post(this.endpoint, entity, {
      auth: USER,
    });
  }

  update(entity: T) {
    let USER = utilService.getCurrentUser() as UserDTO;
    return this.apiClient.put(this.endpoint + "/" + entity.id, entity, {
      auth: USER,
    });
  }

  delete(id: number | string) {
    let USER = utilService.getCurrentUser() as UserDTO;
    return this.apiClient.delete(this.endpoint + "/" + id, {
      auth: USER,
    });
  }
}

const createHttpService = <T extends HttpEntity>(
  apiClient: AxiosInstance,
  endpoint: string
) => new HttpService<T>(apiClient, endpoint);

export default createHttpService;
