import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound: React.FC = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <p>Page not found</p>
        <Link to="/" className="btn-primary">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
