import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useStore } from "../stores/store";

const NavBar = () => {
  const { reservationStore } = useStore();
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link to="/reservations" className="btn btn-ghost normal-case text-xl">
          demoRES
        </Link>
        <Link to="/errors" className="btn btn-ghost">
          Test Errors
        </Link>
      </div>
      <div className="navbar-end">
        <Link to="/addReservation" className="btn btn-primary">
          + Add Party
        </Link>
      </div>
    </div>
  );
};

export default observer(NavBar);
