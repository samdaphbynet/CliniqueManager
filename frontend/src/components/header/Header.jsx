import React, {useContext} from "react";
import ButtonLogin from './ButtonLogin';
import { Context } from "../../main";

// add class to preloader
setTimeout(() => {
  document.querySelector('.js-preloader').classList.add('loaded');
}, 1000)

const Header = () => {
  const {isAuthenticated, user} = useContext(Context);
  return (
    <>
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
      <header className="header-area header-sticky wow">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                <a href="/" className="logo">
                  <img src="logo.png" alt="Chain App Dev" />
                </a>
                <ul className="nav">
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
                    <a href="appointment">Appointment</a>
                  </li>
                  <li>
                    <ButtonLogin />
                  </li>
                </ul>
                <a className="menu-trigger">
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
