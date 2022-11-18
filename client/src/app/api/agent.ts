import axios, { AxiosResponse } from "axios";
import { Reservation } from "../models/reservation";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "https://localhost:5001/api";

// artificial delay to simulate loading times during real-world operations
axios.interceptors.response.use(async (response) => {
  try {
    await sleep(1000);
    return response;
  } catch (err) {
    console.error(err);
    return await Promise.reject(err);
  }
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Reservations = {
  record: () => requests.get<Reservation[]>("/reservations"),
  details: (id: string) => requests.get<Reservation>(`/reservations/${id}`),
  create: (reservation: Reservation) =>
    requests.post<void>(`/reservations`, reservation),
  update: (reservation: Reservation) =>
    requests.put<void>(`/reservations/${reservation.id}`, reservation),
  delete: (id: string) => requests.del<void>(`/reservations/${id}`),
};

const agent = {
  Reservations,
};

export default agent;
