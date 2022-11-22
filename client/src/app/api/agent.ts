import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Reservation } from "../models/reservation";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "https://localhost:5001/api";

// artificial delay to simulate loading times during real-world operations
// FIXME: react-router-dom v6.4+ offers data features--intercept responses and requests, error handling, form submission, etc.--but have breaking changes that don't support accessing history prop in a non-React context--which doesn't allow axios to redirect a user to a page based an error response axios intercepted.
// could probably get all the functionality of axios and formik.
// unstable_HistoryRouter is supported but can introduce bugs
// server errors should redirect to servererror component
// bad guid should redirect to not-found component
axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (error: AxiosError) => {
    const { data, status }: { data: any; status: number } = error.response!;
    switch (status) {
      case 400:
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key].errorMessage);
            }
          }
          throw modalStateErrors;
        } else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error("unauthorized");
        break;
      case 404:
        toast.error("not found");
        break;
      case 500:
        toast.error("server error");
        break;
    }
    return Promise.reject(error);
  }
);

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
