import React, { useEffect, useState } from "react";
import { Reservation } from "../models/reservation";
import NavBar from "./NavBar";
import ReservationDashboard from "../../features/reservations/dashboard/ReservationDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<
    Reservation | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Reservations.record().then((response) => {
      let reservations: Reservation[] = [];
      response.forEach((reservation) => {
        reservation.bookingTime = reservation.bookingTime.split("T")[0];
        reservations.push(reservation);
      });
      setReservations(response);
      setLoading(false);
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
    setSubmitting(true);
    if (reservation.id) {
      agent.Reservations.update(reservation).then(() => {
        setReservations([
          ...reservations.filter((res) => res.id !== reservation.id),
          reservation,
        ]);
        setSelectedReservation(reservation);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      reservation.id = uuid();
      agent.Reservations.create(reservation).then(() => {
        setReservations([...reservations, reservation]);
        setSelectedReservation(reservation);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  };

  const handleDeleteReservation = (id: string) => {
    setSubmitting(true);
    agent.Reservations.delete(id).then(() => {
      setReservations([...reservations.filter((res) => res.id !== id)]);
      setSubmitting(false);
    });
  };

  if (loading) return <LoadingComponent content="Loading reservations..." />;

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
        submitting={submitting}
      />
    </div>
  );
}

export default App;
