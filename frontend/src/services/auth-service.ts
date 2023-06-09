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

  logout() {
    localStorage.removeItem("USER");
    window.location.href = "/";
  }
  register(username: String, password: String, isMale: boolean) {
    let auth = {
      username,
      email: username + "@dsocial.com",
      password: password,
      avt: avatarService.getRandomAvatar(isMale),
    };

    return this.apiClient
      .post(this.endpoints.register, auth)
      .then((response) => {
        const { accessToken, user } = response.data;

        this.apiClient.defaults.params = {
          ...this.apiClient.defaults.params,
          accessToken: accessToken,
        };

        localStorage.setItem("user", JSON.stringify(user));

        return true;
      })
      .catch((err) => {
        return false;
      });
  }
}

export default new AuthService(apiClient);
