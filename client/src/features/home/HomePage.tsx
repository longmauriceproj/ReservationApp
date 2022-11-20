import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="prose">
      <h1>Home page</h1>
      <h3>
        Go to <Link to="/reservations">Reservations</Link>
      </h3>
    </div>
  );
};

export default HomePage;
