import { AxiosInstance, AxiosRequestConfig } from "axios";
import UserDTO from "../type/UserDTO";
export interface HttpEntity {
  id: number;
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
    let USER = JSON.parse(userJSON) as UserDTO;

    const controller = new AbortController();
    const request = this.apiClient.get<FetchResponse>(this.endpoint, {
      signal: controller.signal,
      auth: {
        username: USER?.username,
        password: USER?.password,
      },
      ...requestConfig,
    });
    return { request, cancel: () => controller.abort() };
  }

  get(id: number) {
    const userJSON = sessionStorage.getItem("USER") || "";
    let USER = JSON.parse(userJSON) as UserDTO;

    return this.apiClient.get(this.endpoint + "/" + id, {
      auth: {
        username: USER?.username,
        password: USER?.password,
      },
    });
  }

  create(entity: T) {
    const userJSON = sessionStorage.getItem("USER") || "";
    let USER = JSON.parse(userJSON) as UserDTO;

    return this.apiClient.post(this.endpoint, entity, {
      auth: {
        username: USER?.username,
        password: USER?.password,
      },
    });
  }

  update(entity: T) {
    const userJSON = sessionStorage.getItem("USER") || "";
    let USER = JSON.parse(userJSON) as UserDTO;
    return this.apiClient.put(this.endpoint + "/" + entity.id, entity, {
      auth: {
        username: USER?.username,
        password: USER?.password,
      },
    });
  }

  delete(id: number) {
    return this.apiClient.delete(this.endpoint + "/" + id, {
      auth: {
        username: "staff",
        password: "123456",
      },
    });
  }
}

const createHttpService = <T extends HttpEntity>(
  apiClient: AxiosInstance,
  endpoint: string
) => new HttpService<T>(apiClient, endpoint);

export default createHttpService;
