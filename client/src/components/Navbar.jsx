// Navbar.jsx

import { NavLink } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes

export const Navbar = ({ handleLoginClick }) => {
  return (
    <>
      <div className="nav navbar container">
        <p className="navbar-brand fs-5">QuizKaroo</p>
        <div className="btn justify-content-end">
          <NavLink
            className="text-decoration-none border text text-dark ps-3 pe-3 pt-2 pb-2 rounded me-3"
            to="/login"
            onClick={handleLoginClick}
          >
            Log in
          </NavLink>
          <NavLink
            className="text-decoration-none border text text-light fw-bold ps-3 pe-3 pt-2 pb-2 rounded me-3"
            style={{ backgroundColor: "#37045e" }}
            to="/"
          >
            Sign up
          </NavLink>
        </div>
      </div>
    </>
  );
};

Navbar.propTypes = {
  handleLoginClick: PropTypes.func.isRequired,
};
