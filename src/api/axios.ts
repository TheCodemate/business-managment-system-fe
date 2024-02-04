import axios from "axios";

export const axiosUser = axios.create({
  baseURL: "http://localhost:8081/api/members",
});

export const axiosCustomer = axios.create({
  baseURL: "http://localhost:8081/api/customers",
  // withCredentials: true,
});
export const axiosShoppingCart = axios.create({
  baseURL: "http://localhost:8081/api/shopping-cart",
  // withCredentials: true,
});

export const axiosProducts = axios.create({
  baseURL: "http://localhost:8081/api/products",
});
