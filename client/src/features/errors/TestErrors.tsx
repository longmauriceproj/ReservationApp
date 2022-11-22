import React, { useState } from "react";
import axios from "axios";
import ValidationErrors from "./ValidationErrors";

// componenet to test error handling from client
const TestErrors = () => {
  const baseUrl = "https://localhost:5001/api/";
  const [errors, setErrors] = useState(null);

  const handleNotFound = () => {
    axios
      .get(baseUrl + "buggy/not-found")
      .catch((err) => console.error(err.response));
  };
  const handleBadRequest = () => {
    axios
      .get(baseUrl + "buggy/bad-request")
      .catch((err) => console.error(err.response));
  };
  const handleServerError = () => {
    axios
      .get(baseUrl + "buggy/server-error")
      .catch((err) => console.error(err.response));
  };

  const handleUnauthorised = () => {
    axios
      .get(baseUrl + "buggy/unauthorised")
      .catch((err) => console.error(err.response));
  };

  const handleBadGuid = () => {
    axios
      .get(baseUrl + "reservations/notaguid")
      .catch((err) => console.error(err.response));
  };

  const handleValidationError = () => {
    axios.post(baseUrl + "reservations", {}).catch((err) => setErrors(err));
  };

  return (
    <>
      <div className="prose">
        <h1>Test Error component</h1>
        <div className="btn-group">
          <button onClick={handleNotFound} className="btn">
            Not found
          </button>
          <button onClick={handleBadRequest} className="btn">
            Bad request
          </button>
          <button onClick={handleValidationError} className="btn">
            Validation error
          </button>
          <button onClick={handleServerError} className="btn">
            Server error
          </button>
          <button onClick={handleUnauthorised} className="btn">
            Unauthorized
          </button>
          <button onClick={handleBadGuid} className="btn">
            Bad Guid
          </button>
        </div>
      </div>
      {errors && <ValidationErrors errors={errors} />}
    </>
  );
};

export default TestErrors;
