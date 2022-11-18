import React, { SyntheticEvent, useState } from "react";
import { Reservation } from "../../../app/models/reservation";

interface Props {
  reservations: Reservation[];
  selectReservation: (id: string) => void;
  deleteReservation: (id: string) => void;
  submitting: boolean;
}

const ReservationTable = ({
  reservations,
  selectReservation,
  deleteReservation,
  submitting,
}: Props) => {
  const [target, setTarget] = useState("");

  const handleReservationDelete = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(event.currentTarget.name);
    deleteReservation(id);
  };

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
                  name={reservation.id}
                  onClick={(e) => handleReservationDelete(e, reservation.id)}
                  className={
                    submitting && target === reservation.id
                      ? "btn btn-error btn-xs loading"
                      : "btn btn-error btn-xs"
                  }
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
