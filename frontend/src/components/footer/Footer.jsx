import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light">
      <Container>
        <Row>
          <Col md={3}>
            <img src="public/logo1.png" alt="" />
          </Col>
          <Col md={3}>
            <h5>ClinicPlus</h5>
            <p className="text-light">Votre santé, notre priorité. Nous sommes là pour répondre à vos besoins médicaux avec professionnalisme et bienveillance.</p>
          </Col>
          <Col md={3}>
            <h5>Liens utiles</h5>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-light">À propos</a></li>
              <li><a href="/contact" className="text-light">Contactez-nous</a></li>
              <li><a href="/services" className="text-light">Nos services</a></li>
              <li><a href="/faq" className="text-light">FAQ</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Contact</h5>
            <p className="text-light">Adresse : 123 Rue de la Santé, 31000 Toulouse</p>
            <p className="text-light">Téléphone : +33 5 67 89 00 11</p>
            <p className="text-light">Email : info@clinicplus.com</p>
          </Col>
        </Row>
        <hr className="bg-light"/>
        <Row>
          <Col className="text-center">
            <p className="mb-0 text-light">&copy; {new Date().getFullYear()} ClinicPlus. Tous droits réservés.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
