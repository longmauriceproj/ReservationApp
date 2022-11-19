import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";

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
            <th>Date and Time</th>
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
              <td>{reservation.bookingTime}</td>
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
                <button
                  onClick={() =>
                    reservationStore.selectReservation(reservation.id)
                  }
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

export default observer(ReservationTable);
