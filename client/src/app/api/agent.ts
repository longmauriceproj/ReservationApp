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

const responseBody = <T>(response: AxiosResponse<T>) => response?.data;

const requests = {
  get: <T>(url: string, abortSignal?: AbortSignal) =>
    axios.get<T>(url, { signal: abortSignal }).then(responseBody),
  post: <T>(url: string, body: {}, abortSignal?: AbortSignal) =>
    axios.post<T>(url, body, { signal: abortSignal }).then(responseBody),
  put: <T>(url: string, body: {}, abortSignal?: AbortSignal) =>
    axios.put<T>(url, body, { signal: abortSignal }).then(responseBody),
  del: <T>(url: string, abortSignal?: AbortSignal) =>
    axios.delete<T>(url, { signal: abortSignal }).then(responseBody),
};

const Reservations = {
  record: (abortSignal?: AbortSignal) =>
    requests.get<Reservation[]>("/reservations", abortSignal),
  details: (id: string, abortSignal?: AbortSignal) =>
    requests.get<Reservation>(`/reservations/${id}`, abortSignal),
  create: (reservation: Reservation, abortSignal?: AbortSignal) =>
    requests.post<void>(`/reservations`, reservation, abortSignal),
  update: (reservation: Reservation, abortSignal?: AbortSignal) =>
    requests.put<void>(
      `/reservations/${reservation.id}`,
      reservation,
      abortSignal
    ),
  delete: (id: string, abortSignal?: AbortSignal) =>
    requests.del<void>(`/reservations/${id}`, abortSignal),
};

const agent = {
  Reservations,
};

export default agent;
