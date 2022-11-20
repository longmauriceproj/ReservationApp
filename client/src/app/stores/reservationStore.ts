import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Reservation } from "../models/reservation";

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

  loadReservations = async (abortSignal?: AbortSignal) => {
    this.setLoadingInitial(true);
    try {
      const reservations = await agent.Reservations.record(abortSignal);
      reservations.forEach((reservation) => {
        this.setReservation(reservation);
      });
      this.setLoadingInitial(false);
    } catch (err) {
      console.error(err);
      this.setLoadingInitial(false);
    }
  };

  // TODO: Must note that getting reservation from memory only works if only one client is accessing and performing CRUD ops to the database, else info may not be up-to-date
  loadReservation = async (id: string, abortSignal?: AbortSignal) => {
    // checking and loading reservation from memory
    let reservation = this.getReservation(id);
    if (reservation) {
      this.selectedReservation = reservation;
      return reservation;
    } else {
      this.setLoadingInitial(true);
      try {
        reservation = await agent.Reservations.details(id, abortSignal);
        runInAction(() => {
          if (reservation) {
            this.setReservation(reservation);
            this.selectedReservation = reservation;
            return reservation;
          }
          this.loadingInitial = false;
        });
      } catch (err) {
        console.error(err);
        this.setLoadingInitial(false);
      }
    }
  };

  private setReservation = (reservation: Reservation) => {
    this.reservationRegistry.set(reservation.id, reservation);
  };

  // Helper method if we want to get reservation in memory
  // TODO: It's okay to do this as long as only one account is active at any given time. Else, reservations and reservation details may not be up to date.
  private getReservation = (id: string) => {
    return this.reservationRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createReservation = async (reservation: Reservation) => {
    this.setLoading(true);
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
        this.loading = false;
      });
    } catch (err) {
      console.error(err);
      this.setLoading(false);
    }
  };
}
