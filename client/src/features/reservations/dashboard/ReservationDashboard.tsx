import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../../app/stores/store";
import ReservationDetails from "../details/ReservationDetails";
import ReservationForm from "../form/ReservationForm";
import ReservationTable from "./ReservationTable";

const ReservationDashboard = () => {
  const { reservationStore } = useStore();
  const { selectedReservation, editMode } = reservationStore;

  return (
    <div className="p-4">
      <ReservationTable />
      <div className="divider" />
      {selectedReservation && !editMode && <ReservationDetails />}
      {editMode && <ReservationForm />}
    </div>
  );
};

export default observer(ReservationDashboard);
