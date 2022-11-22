import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="grid h-screen place-items-center">
      <div className="prose text-center">
        <h2>Page not found</h2>
        <p>The page you requested does not exist.</p>
        <p>
          Go to <Link to="/reservations">Reservations</Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
