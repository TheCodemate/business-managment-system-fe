import axios from "axios";

export const axiosUser = axios.create({
  baseURL: "http://localhost:8081/api/members",
});

export const axiosCustomer = axios.create({
  baseURL: "http://localhost:8081/api/customers",
});
export const axiosShoppingCart = axios.create({
  baseURL: "http://localhost:8081/api/shopping-cart",
});

export const axiosProducts = axios.create({
  baseURL: "http://localhost:8081/api/products",
});
export const axiosRequests = axios.create({
  baseURL: "http://localhost:8081/api/support-requests",
});
