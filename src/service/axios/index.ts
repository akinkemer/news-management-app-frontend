import axios from "axios";

const baseURL = "http://localhost:8080/api/v1";

const token = localStorage.getItem("jwtToken");

export const axiosWithJwt = axios.create({
  baseURL: baseURL,
  timeout: 1000 * 10,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Bearer ${token}`,
  },
});
export const axiosCustom = axios.create({
  baseURL: baseURL,
  timeout: 1000 * 10,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});
