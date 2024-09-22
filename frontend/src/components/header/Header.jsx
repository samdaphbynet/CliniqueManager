import React, { useContext, useEffect, useState } from "react";
import ButtonLogin from "./ButtonLogin";
import { Context } from "../../main";

const Header = () => {
  const { isAuthenticated } = useContext(Context);

  // add class to preloader
  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".js-preloader").classList.add("loaded");
    }, 1000);
  }, []);

  // change background header on scroll
  useEffect(() => {
    const handleScroll = (e) => {
      const header = document.querySelector(".header-area");
      if (window.pageYOffset > 0) {
        header.style.backgroundColor = "#F1F1F1";
      } else {
        header.style.backgroundColor = "transparent";
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Preloader */}
      <div id="js-preloader" className="js-preloader">
        <div className="preloader-inner">
          <span className="dot"></span>
          <div className="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      {/* Header Area */}
      <header
        className="header-area header-sticky wow"
        data-wow-duration="0.75s"
        data-wow-delay="0s"
      >
        <nav className="main-nav navbar navbar-expand-lg">
          <div className="container-lg d-flex align-items-center">
            <a href="/" className="logo navbar-brand me-auto">
              <img src="logo1.png" alt="Logo clinique" />
            </a>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon text-danger"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item px-1">
                  <a className="nav-link active" href="/">
                    {" "}
                    Home{" "}
                  </a>
                </li>
                <li className="nav-item px-1">
                  <a className="nav-link" href="#services">Services</a>
                </li>
                <li className="nav-item px-1">
                  <a className="nav-link" href="#about">About</a>
                </li>
                <li className="nav-item px-1">
                  <a className="nav-link" href="#message">Envoyer un message</a>
                </li>
                <li
                  className={
                    isAuthenticated
                      ? "nav-item px-1"
                      : "nav-item px-1 d-none"
                  }
                >
                  <a className="nav-link" href={isAuthenticated ? "/document" : "/login"}>Document</a>
                </li>
                <li
                  className={
                    isAuthenticated
                      ? "nav-item px-1"
                      : "nav-item px-1 d-none"
                  }
                >
                  <a className="nav-link" href={isAuthenticated ? "/appointment" : "/login"}>
                    Rendez-vous
                  </a>
                </li>
                <li>
                  <ButtonLogin />
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
