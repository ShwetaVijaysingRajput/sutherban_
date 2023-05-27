import axios from "axios";
export default function apiClient() {
  const instance = axios.create({
    baseURL: "https://graph.microsoft.com/v1.0/",
    timeout: 1000,
    headers: { "X-Custom-Header": "foobar" },
  });

  return instance;
}
