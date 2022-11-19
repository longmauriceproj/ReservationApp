import React, { useEffect } from "react";
import NavBar from "./NavBar";
import ReservationDashboard from "../../features/reservations/dashboard/ReservationDashboard";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { reservationStore } = useStore();

  useEffect(() => {
    reservationStore.loadReservations();
  }, [reservationStore]);

  if (reservationStore.loadingInitial)
    return <LoadingComponent content="Loading reservations..." />;

  return (
    <>
      <NavBar />
      <ReservationDashboard />
    </>
  );
}

export default observer(App);
