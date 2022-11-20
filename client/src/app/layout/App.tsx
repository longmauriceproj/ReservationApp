import ReservationDashboard from "../../features/reservations/dashboard/ReservationDashboard";
import { observer } from "mobx-react-lite";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ReservationForm from "../../features/reservations/form/ReservationForm";
import ReservationDetails from "../../features/reservations/details/ReservationDetails";
import Dashboard from "./Dashboard";

// TODO: inactivity log out
function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route element={<Dashboard />}>
        <Route path="/reservations" element={<ReservationDashboard />} />
        <Route path="/reservations/:id" element={<ReservationDetails />} />
        {["/addReservation", "/manage/:id"].map((path) => (
          <Route path={path} element={<ReservationForm />} key={path} />
        ))}
      </Route>
    </Routes>
  );
}

export default observer(App);
