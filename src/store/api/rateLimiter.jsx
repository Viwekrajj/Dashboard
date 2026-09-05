import { API } from "./authApi";


export const configureRateLimiter = (config) => {
  return API.post("/FixedWindow/updateConfiguration", config);
};

export const checkRateLimit = () => {
  return API.get("/FixedWindow/check/viwek");
};