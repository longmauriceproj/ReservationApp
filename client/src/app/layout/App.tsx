import React, { useEffect, useState } from "react";
import axios from "axios";
import { Reservation } from "../models/reservation";
import NavBar from "./NavBar";
import ReservationDashboard from "../../features/reservations/dashboard/ReservationDashboard";
import { v4 as uuid } from "uuid";

function App() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<
    Reservation | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Reservation[]>("https://localhost:5001/api/reservations")
      .then((response) => {
        setReservations(response.data);
      });
  }, []);

  const handleSelectReservation = (id: string) => {
    setSelectedReservation(reservations.find((res) => res.id === id));
  };

  const handleCancelSelectReservation = () => {
    setSelectedReservation(undefined);
  };

  const handleFormOpen = (id?: string) => {
    id ? handleSelectReservation(id) : handleCancelSelectReservation();
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };

  const handleCreateOrEditReservation = (reservation: Reservation) => {
    reservation.id
      ? setReservations([
          ...reservations.filter((res) => res.id !== reservation.id),
          reservation,
        ])
      : setReservations([...reservations, { ...reservation, id: uuid() }]);
    setEditMode(false);
    setSelectedReservation(reservation);
  };

  const handleDeleteReservation = (id: string) => {
    setReservations([...reservations.filter((res) => res.id !== id)]);
  };

  return (
    <div className="App">
      <NavBar openForm={handleFormOpen} />
      <ReservationDashboard
        reservations={reservations}
        selectedReservation={selectedReservation}
        selectReservation={handleSelectReservation}
        cancelSelectReservation={handleCancelSelectReservation}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        createOrEditReservation={handleCreateOrEditReservation}
        deleteReservation={handleDeleteReservation}
      />
    </div>
  );
}

export default App;
