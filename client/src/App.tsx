import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [reservations, setReservations] = useState<any>([]);

  useEffect(() => {
    axios
      .get<any>("https://localhost:5001/api/reservationsdashboard")
      .then((response) => {
        console.log(response.data);
        setReservations(response.data);
      });
  }, []);

  return (
    <div className="App">
      <ul>
        {reservations.map((reservation: any) => (
          <li key={reservation.id}>{reservation.customerFullName}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
