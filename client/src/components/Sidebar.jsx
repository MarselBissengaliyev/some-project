import React from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 sidebar"
        style={{ width: 280 }}
      >
        <Link
          to="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        >
          <span className="fs-4">Navigation</span>
        </Link>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <NavLink to="/" className="nav-link link-dark" aria-current="page">
              Боты
            </NavLink>
          </li>
          <li>
            <NavLink to="/pixels" className="nav-link link-dark">
              Пиксели
            </NavLink>
          </li>
          <li>
            <NavLink to="/deposits" className="nav-link link-dark">
              Депозиты
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
