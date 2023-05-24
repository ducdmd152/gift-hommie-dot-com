// game-service.ts
import apiClient from "./api-client";
import createHttpService from "./http-service";

const endpoint = "users";

export interface HttpUser {
  id: number;
  username: string;
}

export default createHttpService<HttpUser>(apiClient, endpoint);
