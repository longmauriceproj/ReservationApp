import React from "react";
import { Reservation } from "../../../app/models/reservation";
import ReservationDetails from "../details/ReservationDetails";
import ReservationForm from "../form/ReservationForm";
import ReservationTable from "./ReservationTable";

interface Props {
  reservations: Reservation[];
  selectedReservation: Reservation | undefined;
  selectReservation: (id: string) => void;
  cancelSelectReservation: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEditReservation: (reservation: Reservation) => void;
  deleteReservation: (id: string) => void;
}

const ReservationDashboard = ({
  reservations,
  selectedReservation,
  selectReservation,
  cancelSelectReservation,
  editMode,
  openForm,
  closeForm,
  createOrEditReservation,
  deleteReservation,
}: Props) => {
  return (
    <div className="p-4">
      <ReservationTable
        reservations={reservations}
        selectReservation={selectReservation}
        deleteReservation={deleteReservation}
      />
      <div className="divider" />
      {selectedReservation && !editMode && (
        <ReservationDetails
          reservation={selectedReservation}
          cancelSelectReservation={cancelSelectReservation}
          openForm={openForm}
        />
      )}
      {editMode && (
        <ReservationForm
          closeForm={closeForm}
          reservation={selectedReservation}
          createOrEdit={createOrEditReservation}
        />
      )}
    </div>
  );
};

export default ReservationDashboard;
