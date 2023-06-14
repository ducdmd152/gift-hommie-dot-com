import apiClient from "./api-client";
import createHttpService from "./http-service";
import UserDTO from "../type/UserDTO";

const endpoint = "account"; // 1. modify root endpoint

// 2. Create the form of data type => DTO
export interface CustomerDTO extends UserDTO { }

// 3. Modify generic type
export default createHttpService<CustomerDTO>(apiClient, endpoint);
