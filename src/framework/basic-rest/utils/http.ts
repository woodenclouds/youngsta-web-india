import axios from "axios";
import { getToken } from "./get-token";
import { AxiosRequestHeaders } from "axios";

const http = axios.create({
    baseURL: "https://api.youngsta.in/api/v1/",
    timeout: 30000,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

// Change request data/error here
http.interceptors.request.use(
    (config) => {
        const token = getToken();
        config.headers = {
            ...config.headers,
            Authorization: `${token ? "Bearer " + token : ""}`,
        } as AxiosRequestHeaders; // Explicitly type the headers object
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default http;
