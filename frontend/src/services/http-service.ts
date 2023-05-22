import { AxiosInstance, AxiosRequestConfig } from "axios";
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
    const userJSON = sessionStorage.getItem("user");
    const basicAuth = "Basic " + btoa("staff" + ":" + "123456");
    const controller = new AbortController();
    const request = this.apiClient.get<FetchResponse>(this.endpoint, {
      signal: controller.signal,
      auth: {
        username: "staff",
        password: "123456",
      },
      ...requestConfig,
    });
    return { request, cancel: () => controller.abort() };
  }

  get(id: number) {
    return this.apiClient.get(this.endpoint + "/" + id);
  }

  create(entity: T) {
    return this.apiClient.post(this.endpoint, entity);
  }

  update(entity: T) {
    return this.apiClient.patch(this.endpoint + "/" + entity.id, entity);
  }

  delete(entity: T) {
    return this.apiClient.delete(this.endpoint + "/" + entity.id);
  }
}

const createHttpService = <T extends HttpEntity>(
  apiClient: AxiosInstance,
  endpoint: string
) => new HttpService<T>(apiClient, endpoint);

export default createHttpService;
