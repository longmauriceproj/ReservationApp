import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Reservation } from "../models/reservation";
import { v4 as uuid } from "uuid";

export default class ReservationStore {
  reservationRegistry = new Map<string, Reservation>();
  selectedReservation: Reservation | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get reservationsByDateAndTime() {
    return Array.from(this.reservationRegistry.values()).sort(
      (a, b) => Date.parse(a.bookingTime) - Date.parse(b.bookingTime)
    );
  }

  loadReservations = async () => {
    try {
      const reservations = await agent.Reservations.record();
      reservations.forEach((reservation) => {
        // TODO: need to work on the date time issues--I need both!
        reservation.bookingTime = reservation.bookingTime.split("T")[0];
        this.reservationRegistry.set(reservation.id, reservation);
      });
      this.setLoadingInitial(false);
    } catch (err) {
      console.error(err);
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  selectReservation = (id: string) => {
    this.selectedReservation = this.reservationRegistry.get(id);
  };

  cancelSelectReservation = () => {
    this.selectedReservation = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectReservation(id) : this.cancelSelectReservation();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createReservation = async (reservation: Reservation) => {
    this.setLoading(true);
    reservation.id = uuid();
    try {
      await agent.Reservations.create(reservation);
      runInAction(() => {
        this.reservationRegistry.set(reservation.id, reservation);
        this.selectedReservation = reservation;
        this.editMode = false;
        this.loading = false;
      });
    } catch (err) {
      console.error(err);
      this.setLoading(false);
    }
  };

  setLoading = (state: boolean) => {
    this.loading = state;
  };

  updateReservation = async (reservation: Reservation) => {
    this.setLoading(true);
    try {
      await agent.Reservations.update(reservation);
      runInAction(() => {
        this.reservationRegistry.set(reservation.id, reservation);
        this.selectedReservation = reservation;
        this.editMode = false;
        this.loading = false;
      });
    } catch (err) {
      console.error(err);
      this.setLoading(false);
    }
  };

  deleteReservation = async (id: string) => {
    this.setLoading(true);
    try {
      await agent.Reservations.delete(id);
      runInAction(() => {
        this.reservationRegistry.delete(id);
        if (this.selectedReservation?.id === id) this.cancelSelectReservation();
        this.loading = false;
      });
    } catch (err) {
      console.error(err);
      this.setLoading(false);
    }
  };
}
