import React from 'react';

const About = () => {
  return (
    <div id="about" className="about-us section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 align-self-center">
            <div className="section-heading">
              <h4>À propos <em>de notre clinique</em> &amp; de notre mission</h4>
              <img src="heading-line-dec.png" alt=""/>
              <p>À la Clinique de Santé de Toulouse, nous nous engageons à offrir des soins de santé de qualité, centrés sur le patient et accessibles à tous. Notre équipe de professionnels dévoués travaille ensemble pour garantir votre bien-être et votre satisfaction.</p>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="box-item">
                  <h4><a href="#">Soins Personnalisés</a></h4>
                  <p>Nous offrons des soins adaptés à chaque patient, en tenant compte de leurs besoins spécifiques et de leur état de santé.</p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="box-item">
                  <h4><a href="#">Support 24/7</a></h4>
                  <p>Notre équipe est disponible 24 heures sur 24, 7 jours sur 7, pour répondre à vos besoins urgents et vous offrir un soutien continu.</p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="box-item">
                  <h4><a href="#">Équipe Pluridisciplinaire</a></h4>
                  <p>Nos professionnels de santé travaillent en collaboration pour vous offrir des soins complets et coordonnés.</p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="box-item">
                  <h4><a href="#">Innovation Médicale</a></h4>
                  <p>Nous utilisons les dernières technologies et pratiques médicales pour assurer des soins de haute qualité.</p>
                </div>
              </div>
              <div className="col-lg-12">
                <p>Notre mission est de vous fournir des soins de santé exceptionnels et de promouvoir la santé et le bien-être de notre communauté grâce à des services de qualité et à une approche humaine.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="right-image">
              <img src="about_right.png" alt=""/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
