import axios from "axios";

const baseURL = "http://localhost:8080/api/v1";

export const axiosWithJwtAndXWWW = axios.create({
  baseURL: baseURL,
  timeout: 1000 * 10,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
  },
});
export const axiosXWWW = axios.create({
  baseURL: baseURL,
  timeout: 1000 * 10,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const axiosJSON = axios.create({
  baseURL: baseURL,
  timeout: 1000 * 10,
  headers: {
    "Content-Type": "application/json",
  },
});
export const axiosXWWWwithToken = (token:string) => {
  return axios.create({
    baseURL: baseURL,
    timeout: 1000 * 10,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
  });
}