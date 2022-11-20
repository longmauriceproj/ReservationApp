import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { convertTimeFormat } from "../../../app/helpers/dateTime";
import { useStore } from "../../../app/stores/store";
import { Link } from "react-router-dom";

const ReservationTable = () => {
  const { reservationStore } = useStore();
  const { reservationsByDateAndTime, deleteReservation, loading } =
    reservationStore;
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
            <th>Date</th>
            <th>Time</th>
            <th>Party Size</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {reservationsByDateAndTime.map((reservation) => (
            <tr key={reservation.id}>
              <th>{reservation.id}</th>
              <td>{reservation.customerFullName}</td>
              <td>{reservation.bookingTime.split("T")[0]}</td>
              <td>
                {convertTimeFormat(reservation.bookingTime.split("T")[1])}
              </td>
              <td>{reservation.partySize}</td>
              <th>
                <button
                  name={reservation.id}
                  onClick={(e) => handleReservationDelete(e, reservation.id)}
                  className={
                    loading && target === reservation.id
                      ? "btn btn-error btn-xs loading"
                      : "btn btn-error btn-xs"
                  }
                >
                  delete
                </button>
              </th>
              <th>
                <Link
                  to={`/reservations/${reservation.id}`}
                  className="btn btn-ghost btn-xs"
                >
                  details
                </Link>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default observer(ReservationTable);
