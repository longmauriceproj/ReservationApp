import { observer } from "mobx-react-lite";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ReservationDashboard from "../../features/reservations/dashboard/ReservationDashboard";
import HomePage from "../../features/home/HomePage";
import ReservationForm from "../../features/reservations/form/ReservationForm";
import ReservationDetails from "../../features/reservations/details/ReservationDetails";
import Dashboard from "./Dashboard";
import TestErrors from "../../features/errors/TestErrors";
import NotFound from "../../features/errors/NotFound";

// TODO: inactivity log out
function App() {
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route element={<Dashboard />}>
          <Route path="/reservations" element={<ReservationDashboard />} />
          <Route path="/reservations/:id" element={<ReservationDetails />} />
          {["/addReservation", "/manage/:id"].map((path) => (
            <Route path={path} element={<ReservationForm />} key={path} />
          ))}
          <Route path="/errors" element={<TestErrors />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default observer(App);
