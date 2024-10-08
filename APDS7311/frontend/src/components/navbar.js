import React from "react";
import logo from "../logo.svg"; // Assuming you need this logo somewhere in your component.
// We import bootstrap to make our application look better.
import 'bootstrap/dist/css/bootstrap.css';
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom"; // Fixed import syntax

// Here, we display our Navbar
export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          {/* If needed, you can place the logo here */}
          <img src={logo} alt="Logo" />
        </NavLink>
        <div className="navbar" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <NavLink className="nav-link" to="/">
              List
            </NavLink>
            <NavLink className="nav-link" to="/create">
              Create Post
            </NavLink>
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </ul>
        </div>
      </nav>
    </div>
  );
}
