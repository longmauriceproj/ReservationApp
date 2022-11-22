import React from "react";
import { useStore } from "../../app/stores/store";
import { Link } from "react-router-dom";

const ServerError = () => {
  return (
    <div className="grid h-screen place-items-center">
      <div className="prose text-center">
        <h2>
          <strong>500</strong> This is an error.
        </h2>
        <p>
          The server encountered an error and could not complete your request.
        </p>
        <p>
          Go to <Link to="/reservations">Reservations</Link>
        </p>
      </div>
    </div>
  );
};

export default ServerError;
