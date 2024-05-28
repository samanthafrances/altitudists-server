import Axios from "axios";

export const BASE_URL =
  "https://altitudists-backend-bd7306004527.herokuapp.com/";

const Client = Axios.create({ baseURL: BASE_URL });

Client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    console.error("Error in request interceptor:", error);
    return Promise.reject(error);
  }
);

export default Client;