import { AxiosInstance, AxiosRequestConfig } from "axios";
import UserDTO from "../type/UserDTO";
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
    const userJSON = sessionStorage.getItem("USER") || "";
    let USER = null;
    if (userJSON) {
      USER = JSON.parse(userJSON);
    }

    const controller = new AbortController();
    const request = this.apiClient.get<FetchResponse>(this.endpoint, {
      signal: controller.signal,
      auth: USER,
      ...requestConfig,
    });
    return { request, cancel: () => controller.abort() };
  }

  get(id: number) {
    const userJSON = sessionStorage.getItem("USER") || "";
    let USER = null;
    if (userJSON) {
      USER = JSON.parse(userJSON);
    }

    return this.apiClient.get(this.endpoint + "/" + id, {
      auth: USER,
    });
  }

  create(entity: T) {
    const userJSON = sessionStorage.getItem("USER") || "";
    let USER = null;
    if (userJSON) {
      USER = JSON.parse(userJSON);
    }

    return this.apiClient.post(this.endpoint, entity, {
      auth: USER,
    });
  }

  update(entity: T) {
    const userJSON = sessionStorage.getItem("USER") || "";
    let USER = null;
    if (userJSON) {
      USER = JSON.parse(userJSON);
    }
    return this.apiClient.put(this.endpoint + "/" + entity.id, entity, {
      auth: USER,
    });
  }

  delete(id: number) {
    const userJSON = sessionStorage.getItem("USER") || "";
    let USER = null;
    if (userJSON) {
      USER = JSON.parse(userJSON);
    }
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
