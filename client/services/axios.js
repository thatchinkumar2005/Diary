import axios_ from "axios";
const baseURL = "http://localhost:3000/api/v1";

export const axios = axios_.create({
  baseURL,
  withCredentials: true,
});

export const axiosPrivate = axios_.create({
  baseURL,
  withCredentials: true,
});
