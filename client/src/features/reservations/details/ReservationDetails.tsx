import React from "react";
import { Reservation } from "../../../app/models/reservation";

interface Props {
  reservation: Reservation;
  cancelSelectReservation: () => void;
  openForm: (id: string) => void;
}

const ReservationDetails = ({
  reservation,
  cancelSelectReservation,
  openForm,
}: Props) => {
  return (
    <div className="card w-96 bg-neutral text-neutral-content">
      <div className="card-body">
        <h2 className="card-title">Reservation Details</h2>
        <label className="label">
          <span className="label-text">Confirmation #</span>
        </label>
        <strong>{reservation.id}</strong>
        <label className="label">
          <span className="label-text">Date and Time</span>
        </label>
        <strong>{reservation.bookingTime}</strong>
        <label className="label">
          <span className="label-text">Party Size</span>
        </label>
        <strong>{reservation.partySize}</strong>
        <label className="label">
          <span className="label-text">Notes</span>
        </label>
        <strong>{reservation.notes}</strong>
        <div className="divider"></div>
        <h2 className="card-title">Customer Details</h2>
        <label className="label">
          <span className="label-text">Customer Name</span>
        </label>
        <strong>{reservation.customerFullName}</strong>
        <label className="label">
          <span className="label-text">Phone Number</span>
        </label>
        <strong>{reservation.phoneNumber}</strong>
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <strong>{reservation.email}</strong>
        <label className="label cursor-pointer">
          <span className="label-text">Allow SMS?</span>
          <input
            type="checkbox"
            readOnly
            checked={reservation.allowSMS}
            className="checkbox"
          />
        </label>
        <label className="label cursor-pointer">
          <span className="label-text">Allow Marketing?</span>
          <input
            type="checkbox"
            readOnly
            checked={reservation.allowMarketing}
            className="checkbox"
          />
        </label>
        <div className="card-actions justify-end">
          <button
            onClick={() => openForm(reservation.id)}
            className="btn btn-primary"
          >
            Edit
          </button>
          <button onClick={cancelSelectReservation} className="btn btn-ghost">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetails;
