import React from "react";

interface Props {
  inverted?: boolean;
  content?: string;
}

const LoadingComponent = ({
  inverted = true,
  content = "loading...",
}: Props) => {
  return (
    <div className="grid min-w-full h-screen bg-base-100 place-items-center">
      <div className="card w-48 bg-base-200 shadow-xl">
        <div className="card-body items-center text-center">
          <button className="btn btn-ghost loading">{content}</button>
        </div>
      </div>
    </div>
  );
};

export default LoadingComponent;
