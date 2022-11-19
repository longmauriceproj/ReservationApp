import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";

// TODO: The form is still missing a lot of validation, but all basic CRUD operations works. 11/19/2022

const ReservationForm = () => {
  const { reservationStore } = useStore();
  const {
    selectedReservation,
    closeForm,
    createReservation,
    updateReservation,
    loading,
  } = reservationStore;
  const initialState = selectedReservation ?? {
    id: "",
    bookingTime: "",
    partySize: 1,
    notes: "",
    customerFullName: "",
    phoneNumber: "",
    email: "",
    allowSMS: false,
    allowMarketing: false,
  };

  const [reservation, setReservation] = useState(initialState);

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    reservation.id
      ? updateReservation(reservation)
      : createReservation(reservation);
    console.log(reservation);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setReservation({ ...reservation, [name]: value });
  };

  const handleDateTimeInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let [date, time] = reservation.bookingTime.split("T");
    if (name === "reservationDate") date = value;
    if (name === "reservationTime") time = value + ":00";
    const newBookingTime = `${date}T${time}`;
    setReservation({ ...reservation, bookingTime: newBookingTime });
  };

  const handleCheckboxInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setReservation({ ...reservation, [name]: checked });
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="form-control card w-96 bg-neutral text-neutral-content"
    >
      <div className="card-body">
        <h2 className="card-title">Create Reservation</h2>
        <div className="py-2" />
        <input
          type="text"
          placeholder="Customer Name"
          value={reservation.customerFullName}
          name="customerFullName"
          onChange={handleInputChange}
          className="input input-bordered input-primary w-full max-w-xs"
        />
        <div className="py-1" />
        <input
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="111-111-1111"
          value={reservation.phoneNumber}
          name="phoneNumber"
          onChange={handleInputChange}
          className="input input-bordered input-primary w-full max-w-xs"
        />
        <div className="py-1" />
        <input
          type="email"
          placeholder="example@email.com"
          value={reservation.email}
          name="email"
          onChange={handleInputChange}
          className="input input-bordered input-primary w-full max-w-xs"
        />
        <div className="py-1" />
        <input
          type="date"
          placeholder="Date"
          value={reservation.bookingTime.split("T")[0]}
          name="reservationDate"
          onChange={handleDateTimeInputChange}
          className="input input-bordered input-primary w-full max-w-xs"
        />
        <div className="py-1" />
        <input
          type="time"
          placeholder="Time"
          value={
            reservation.bookingTime.split("T")[1] === undefined
              ? ""
              : reservation.bookingTime.split("T")[1]
          }
          name="reservationTime"
          onChange={handleDateTimeInputChange}
          className="input input-bordered input-primary w-full max-w-xs"
        />
        <div className="py-1" />
        <input
          type="number"
          min={1}
          placeholder="Party Size"
          value={reservation.partySize}
          name="partySize"
          onChange={handleInputChange}
          className="input input-bordered input-primary w-full max-w-xs"
        />
        <div className="py-1" />
        <textarea
          placeholder="Notes"
          value={reservation.notes || undefined}
          name="notes"
          onChange={handleInputChange}
          className="textarea textarea-primary"
        ></textarea>
        <div className="py-1" />
        <label className="label cursor-pointer">
          <span className="label-text">Allow SMS?</span>
          <input
            type="checkbox"
            checked={reservation.allowSMS}
            name="allowSMS"
            onChange={handleCheckboxInputChange}
            className="checkbox"
          />
        </label>
        <label className="label cursor-pointer">
          <span className="label-text">Allow Marketing?</span>
          <input
            type="checkbox"
            checked={reservation.allowMarketing}
            name="allowMarketing"
            onChange={handleCheckboxInputChange}
            className="checkbox"
          />
        </label>
        <div className="py-3" />
        <div className="card-actions justify-center">
          <button
            type="submit"
            className={loading ? "btn btn-primary loading" : "btn btn-primary"}
          >
            Submit
          </button>
          <button onClick={closeForm} type="button" className="btn btn-ghost">
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default observer(ReservationForm);
