import React from "react";
import { useStore } from "../stores/store";

const NavBar = () => {
  const { reservationStore } = useStore();
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl">demoRES</a>
      </div>
      <div className="navbar-end">
        <a
          onClick={() => reservationStore.openForm()}
          className="btn btn-primary"
        >
          + Reservation
        </a>
      </div>
    </div>
  );
};

export default NavBar;
