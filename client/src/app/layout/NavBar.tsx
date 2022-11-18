import React from "react";

interface Props {
  openForm: () => void;
}

const NavBar = ({ openForm }: Props) => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl">demoRES</a>
      </div>
      <div className="navbar-end">
        <a onClick={openForm} className="btn btn-primary">
          + Reservation
        </a>
      </div>
    </div>
  );
};

export default NavBar;
