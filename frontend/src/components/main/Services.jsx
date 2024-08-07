import React, { useState } from "react";
import { services } from "../../data/doctor";

const Services = () => {
  const [showMore, setShowMore] = useState({});

  const handleShow = (id) => {
    setShowMore((prev) => ({...prev, [id]: !prev[id]}));
  }

  return (
    <div id="services" className="services section">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div
              className="section-heading  wow fadeInDown"
              data-wow-duration="1s"
              data-wow-delay="0.5s"
            >
              <h4>
                A vos <em>côtés &amp; pour</em> votre santé
              </h4>
              <img src="heading-line-dec.png" alt="" />
              <p>
                Des équipes dévouées et attentives, des praticiens compétents et
                impliqués, un accès aux soins à la fois sûr et efficace : la
                clinique de Toulouse met tout en œuvre pour vous garantir un
                séjour agréable et une qualité des soins optimale.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="services_card">
        <div className="row item">
          {services.map((item) => (
            <div key={item.id} className="col-lg-2">
              <div className="service-item">
                <img src={item.image} alt="image_services" />
                <h4>{item.title}</h4>
                <p>
                  {showMore[item.id] ? item.content : `${item.content.substring(0, 60)}...`}
                </p>
                <div className="text-button">
                  <button onClick={() => handleShow(item.id)} className="showMore">
                    {showMore[item.id] ? "Reduire" : "Lire Plus"}{" "}
                    <i className="fa fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
