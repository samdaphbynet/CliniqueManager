import React from "react";

const HeroSection = () => {

  return (
    <div id="home" className="main-banner wow fadeIn">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-6 align-self-center">
                <div
                  className="left-content show-up header-text wow fadeInLeft"
                  data-wow-duration="1s"
                  data-wow-delay="1s"
                >
                  <div className="row">
                    <div className="col-lg-12">
                      <h2>Gestion Clinique Simplifiée et Efficace</h2>
                      <p>
                      Optimisez vos opérations cliniques avec notre plateforme intuitive et sécurisée. Gérez les dossiers des patients, planifiez les rendez-vous, et suivez les traitements avec facilité. Améliorez la qualité des soins et l'efficacité administrative dès aujourd'hui.
                      </p>
                    </div>
                    <div className="col-lg-12">
                      <div className="white-button first-button scroll-to-section">
                        <a href="appointment">
                          PRENDRE RENDEZ-VOUS <i className="fa fa-calendar"></i>
                        </a>
                      </div>
                      <div className="white-button scroll-to-section">
                        <a href="#message">
                          Contact <i className="fa fa-user"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div
                  className="right-image wow fadeInRight"
                  data-wow-duration="1s"
                  data-wow-delay="0.5s"
                >
                  <img src="patient1.webp" alt="image_hero" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
