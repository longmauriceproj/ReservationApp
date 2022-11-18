import React from "react";
import { Reservation } from "../../../app/models/reservation";

interface Props {
  reservations: Reservation[];
  selectReservation: (id: string) => void;
  deleteReservation: (id: string) => void;
}

const ReservationTable = ({
  reservations,
  selectReservation,
  deleteReservation,
}: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-compact w-full">
        <thead>
          <tr>
            <th>Confirmation #</th>
            <th>Name</th>
            <th>Date and Time</th>
            <th>Party Size</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <th>{reservation.id}</th>
              <td>{reservation.customerFullName}</td>
              <td>{reservation.bookingTime}</td>
              <td>{reservation.partySize}</td>
              <th>
                <button
                  onClick={() => deleteReservation(reservation.id)}
                  className="btn btn-error btn-xs"
                >
                  delete
                </button>
              </th>
              <th>
                <button
                  onClick={() => selectReservation(reservation.id)}
                  className="btn btn-ghost btn-xs"
                >
                  details
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationTable;
