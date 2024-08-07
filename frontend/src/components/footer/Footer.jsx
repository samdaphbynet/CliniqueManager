import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="footer-widget">
              <h4>Contactez le center clinique</h4>
              <p>53 Rue toulouse lautrec 31874, <br></br>Toulouse France</p>
              <p>
                <a href="#">+33-588-64-84-66</a>
              </p>
              <p>
                <a href="#">clinique@cliniuqe.com</a>
              </p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="footer-widget">
              <h4>About Us</h4>
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Services</a>
                </li>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="/appointment">Appointment</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="footer-widget">
              <h4>Notre Clinique</h4>
              <div className="logo">
                <img src="logo1.png" alt="" />
              </div>
              <p>
              Optimisez vos opérations cliniques avec notre plateforme intuitive et sécurisée. Gérez les dossiers des patients, planifiez les rendez-vous, et suivez les traitements avec facilité. Améliorez la qualité des soins et l'efficacité administrative dès aujourd'hui.
              </p>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="copyright-text">
              <p>
                Copyright © 2024 Clinique de santé. All Rights Reserved.
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
