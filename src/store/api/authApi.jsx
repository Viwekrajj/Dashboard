import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:8080",
   headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = (data) => {
  return API.post("/auth/register", data);
};

export const loginUser = (data) => {
  return API.post("/auth/login", data);
};





