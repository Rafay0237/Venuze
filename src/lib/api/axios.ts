import axios from "axios";

interface ApiErrorBody {
  error?: string;
}

export const api = axios.create({
  baseURL: "https://reqres.in/api",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "reqres-free-v1",
  },
  timeout: 15000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const body = error.response?.data as ApiErrorBody | undefined;
      const message = body?.error ?? error.message ?? "Something went wrong";
      return Promise.reject(new Error(message));
    }
    return Promise.reject(error);
  },
);
