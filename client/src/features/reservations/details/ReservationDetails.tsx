import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { convertTimeFormat } from "../../../app/helpers/dateTime";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { useParams, Link } from "react-router-dom";

const ReservationDetails = () => {
  const { reservationStore } = useStore();
  const {
    selectedReservation: reservation,
    loadReservation,
    loadingInitial,
  } = reservationStore;
  const { id } = useParams();

  useEffect(() => {
    if (id) loadReservation(id);
  }, [id, loadReservation]);

  // guard clause necessary to remove typescript errors even though guard clause in dashboard checks if reservation is undefined
  if (loadingInitial || !reservation) return <LoadingComponent />;

  return (
    <div className="card w-96 bg-neutral text-neutral-content">
      <div className="card-body">
        <h2 className="card-title">Reservation Details</h2>
        <label className="label">
          <span className="label-text">Confirmation #</span>
        </label>
        <strong>{reservation.id}</strong>
        <label className="label">
          <span className="label-text">Date</span>
        </label>
        <strong>{reservation.bookingTime.split("T")[0]}</strong>
        <label className="label">
          <span className="label-text">Time</span>
        </label>
        <strong>
          {convertTimeFormat(reservation.bookingTime.split("T")[1])}
        </strong>
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
          <Link to={`/manage/${reservation.id}`} className="btn btn-primary">
            Edit
          </Link>
          <Link to={`/reservations`} className="btn btn-ghost">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default observer(ReservationDetails);
