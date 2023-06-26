import axios from "axios";
import apiClient from "./api-client";
import { VerifyPasswordDTO } from "../type/VerifyPasswordDTO";

const resetPasswordService = {
  sendRequest: async (email: string) => {
    let result = true;
    await apiClient
      .post("public/account/reset/password/request", {
        email,
      } as VerifyPasswordDTO)
      .then((response) => {
        result = true;
      })
      .catch((error) => {
        result = false;
      });
    return result;
  },
  checkCode: async (email: string, code: string) => {
    let result = true;
    await apiClient
      .post("public/account/reset/password/token/check", {
        email,
        token: code,
      } as VerifyPasswordDTO)
      .then((response) => {
        result = true;
      })
      .catch((error) => {
        result = false;
      });
    return result;
  },
  resetPassword: async (email: string, code: string, password: string) => {
    let result = true;
    await apiClient
      .post("public/account/reset/password/reset", {
        email,
        token: code,
        password,
      } as VerifyPasswordDTO)
      .then((response) => {
        result = true;
      })
      .catch((error) => {
        result = false;
      });
    return result;
  },
};

export default resetPasswordService;
