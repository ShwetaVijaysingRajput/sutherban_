import axios from "axios";
export default function apiClient2() {
  const instance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/",
    timeout: 1000,
    headers: { "X-Custom-Header": "foobar" },
  });

  return instance;
}
