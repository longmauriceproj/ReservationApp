import { createContext, useContext } from "react";
import ReservationStore from "./reservationStore";

interface Store {
  reservationStore: ReservationStore;
}

export const store: Store = {
  reservationStore: new ReservationStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => useContext(StoreContext);
