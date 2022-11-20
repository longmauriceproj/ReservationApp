import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ReservationTable from "./ReservationTable";

// FIXME: still have issue of permanently loading when refreshing a url for reservation details or editing a reservation detail
// should be resolved when error handling is implemented

const ReservationDashboard = () => {
  const { reservationStore } = useStore();
  const { loadReservations, reservationRegistry } = reservationStore;

  useEffect(() => {
    const controller = new AbortController();
    if (reservationRegistry.size <= 1) loadReservations(controller.signal);

    return () => {
      controller.abort();
    };
  }, [reservationRegistry.size, loadReservations]);

  if (reservationStore.loadingInitial)
    return <LoadingComponent content="Loading reservations..." />;

  return (
    <>
      <div className="p-4">
        <ReservationTable />
        <h2>Reservation filters</h2>
      </div>
    </>
  );
};

export default observer(ReservationDashboard);
