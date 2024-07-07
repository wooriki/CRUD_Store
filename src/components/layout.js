import React from "react";
import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white border-bottom box-shadow">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src="/ars.png"
              alt="Our Store logo"
              width="30"
              className="me-2"
            />
            Our Store
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link text-dark" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
            <ul
              className="navbar-menu"
              style={{ listStyleType: "none", paddingLeft: 0 }}
            >
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-dark"
                  href="/admin"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Admin
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/admin/products">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/logout">
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export function Footer() {
  return (
    <div className="text-center p-4 border-top">
      <img src="/ars.png" alt="Our Store logo" width="30" className="me-2" />
      Our Store
    </div>
  );
}
