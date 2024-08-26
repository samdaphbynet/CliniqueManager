import React, { useContext, useEffect, useState } from "react";
import ButtonLogin from "./ButtonLogin";
import { Context } from "../../main";



const Header = () => {
  const { isAuthenticated } = useContext(Context);
  const [menu, setMenu] = useState("")

  // add class to preloader
  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".js-preloader").classList.add("loaded");
    }, 1000);
  }, [])

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
    }
  }, [])

  const toggleMenu = () => {
    const nav = document.querySelector(".main-nav ul");
    if (nav.classList.contains("navMenu")) {
      setMenu("")
    } else {
      setMenu("navMenu")
    }

  };

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
        className="header-area header-sticky wow slideInDown"
        data-wow-duration="0.75s"
        data-wow-delay="0s"
      >
        <div className="container-lg">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                <a href="/" className="logo">
                  <img src="logo1.png" alt="Logo clinique" />
                </a>
                <ul className={`nav ${menu}`}>
                  <li className="scroll-to-section">
                    <a href="/" className="active">
                      Home
                    </a>
                  </li>
                  <li className="scroll-to-section">
                    <a href="#services">Services</a>
                  </li>
                  <li className="scroll-to-section">
                    <a href="#about">About</a>
                  </li>
                  <li className="scroll-to-section">
                    <a href="#message">Envoyer un message</a>
                  </li>
                  
                  <li className="scroll-to-section">
                    <a href={isAuthenticated ? "/document" : "/login"}>Document</a>
                  </li>

                  <li className="scroll-to-section">
                    <a href={isAuthenticated ? "/appointment" : "/login"}>Rendez-vous</a>
                  </li>
                  <li>
                    <ButtonLogin />
                  </li>
                </ul>
                <a className="menu-trigger" onClick={toggleMenu}>
                  <span>Menu</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
