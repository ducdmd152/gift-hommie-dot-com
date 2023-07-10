import { AxiosInstance } from "axios";
import apiClient from "./api-client";
import avatarService from "./avatar-service";
import UserDTO from "../type/UserDTO";

interface AuthEndpoints {
  login: string;
  register: string;
}

export interface AuthRequestDTO {
  usename: string;
  email?: string;
  password: string;
}

class AuthService {
  apiClient: AxiosInstance;
  endpoints: AuthEndpoints;
  constructor(
    apiClient: AxiosInstance,
    endpoints: AuthEndpoints = {
      login: "auth/login",
      register: "auth/register",
    }
  ) {
    this.apiClient = apiClient;
    this.endpoints = endpoints;
  }

  login(username: string, password: string) {
    let auth = {
      username,
      password,
    };

    return this.apiClient
      .post(this.endpoints.login, auth)
      .then((response) => {
        // const { accessToken, user } = response.data;

        // this.apiClient.defaults.params = {
        //   ...this.apiClient.defaults.params,
        //   accessToken: accessToken,
        // };

        const user = response.data as UserDTO;
        user.password = password;
        localStorage.setItem("USER", JSON.stringify(user));

        return true;
      })
      .catch((err) => {
        console.log(err);

        return false;
      });
  }

  async enabled(username: string, password: string) {
    let auth = {
      username,
      password,
    };

    return await this.apiClient
      .post(this.endpoints.login, auth)
      .then((response) => {
        return true;
      })
      .catch((err) => {
        return false;
      });
  }

  logout() {
    localStorage.removeItem("USER");
    window.location.href = "/";
  }

  register(userDTO: UserDTO) {
    return this.apiClient
      .post(this.endpoints.register, userDTO)
      .then((response) => {
        const user = response.data as UserDTO;
        user.password = userDTO.password;
        localStorage.setItem("USER", JSON.stringify(user));

        return true;
      })
      .catch((err) => {
        return false;
      });
  }
  async noneExistUsername(username: string) {
    return await this.apiClient
      .post("/auth/register/error/username", undefined, {
        params: {
          username: username,
        },
      })
      .then((response) => {
        return true;
      })
      .catch((err) => {
        return false;
      });
  }

  async noneExistEmail(email: string) {
    return await this.apiClient
      .post("/auth/register/error/email", undefined, {
        params: {
          email: email,
        },
      })
      .then((response) => {
        return true;
      })
      .catch((err) => {
        return false;
      });
  }
}

export default new AuthService(apiClient);
