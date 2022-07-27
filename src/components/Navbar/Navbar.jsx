import React from 'react';
import { Link } from 'react-router-dom';

export default function index() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="text-white " to="/">
          Evergreen
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item p-2  badge ">
              <Link className="text-white" to="/admin">
                Admin Dashboard
              </Link>
            </li>

            <li className="nav-item p-2  badge ">
              <Link className="text-white" to="/admin/login">
                Admin Login
              </Link>
            </li>

            <li className="nav-item p-2  badge ">
              <Link className="text-white" to="/admin/otp">
                Admin Otp
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
