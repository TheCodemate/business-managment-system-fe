import axios from "axios";

export const axiosMember = axios.create({
  baseURL: "http://localhost:8081/api/members",
});
