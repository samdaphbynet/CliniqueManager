import React, { useState } from "react";
import "./main.css";
import FormInformation from "./FormInformation";

const Appointment = () => {
  const [motif, setMotif] = useState("");
  const [date, setDate] = useState("");
  const [step, setStep] = useState(1);

  const handleSubmitDate = (e) => {
    e.preventDefault();
    if (date) {
      setStep(3);
    }
  }

  return (
    <div className="appointement">
      <h1>Prendre rendez-vous avec ClinicPlus</h1>
      <div className="presentation fs-6">
        <h2 className="info">
          <i className="fa fa-info"></i> Presentation
        </h2>
        ClinicPlus a Saint-girons, vous accueille du lundi au vendredi dans son cabinet
        (grands maison blanc)
      </div>

      <div className="formulaire">
        <h2 className="info">
          <i className="fa fa-calendar"></i> Prendre rendez-vous
        </h2>
        <div className="address p-4 my-4">
          <ul>
            <li className="fs-6">
              <i className="fa fa-check icon_rendez"></i>
              <span className="fw-bold">Lieu</span>: xxx sam 51 Rue Paris 13022 - france -{" "}
              <a href="">Voir Coordonnées</a>
            </li>
            {motif && (
              <li className="fs-6">
                <i className="fa fa-check icon_rendez"></i>
                <span className="fw-bold">Motif</span> {motif}
              </li>
            )}
            {date && (
              <li className="fs-6">
                <i className="fa fa-check icon_rendez"></i>
                <span className="fw-bold">Date</span> {date}
              </li>
            )}
          </ul>
        </div>

        <div className="rendez_vous container text-center">
          <div className="row row-cols-lg-3 rounded bg-secondary  text-white ">
            <div className={step === 1 ? "motif col p-2 selected" : "motif col p-2"}>
              <h6>MOTIF</h6>
            </div>
            <div className={step === 2 ? "date col p-2 selected" : "date col p-2"}>
              <h6>DATE</h6>
            </div>
            <div className={step === 3 ? "informations col p-2 selected" : "informations col p-2"}>
              <h6>INFORMATIONS</h6>
            </div>
          </div>
          {/* motif content */}
          <div className={step === 1 ? "motif_content py-4" : "d-none"}>
            <h6 className="my-4">
              <i className="fa fa-book"></i> Choisis un motif de RDV
            </h6>
            <select
              value={motif}
              onChange={(e) => {
                setMotif(e.target.value);
                if (e.target.value) {
                  setStep(2);
                }
              }}
              className="options mt-4 w-50 p-3 rounded text-black"
            >
              <option disabled value="">
                Selectionner un motif
              </option>
              <option value="consultation">premier consultation</option>
              <option value="suivi">consultation de suivi</option>
            </select>
          </div>

          {/* date content */}
          <div className={step === 2 ? "date_content py-4" : "d-none"}>
            <h6 className="my-4">
              <i className="fa fa-calendar"></i> Choisir une date de rendez-vous
            </h6>
            <form 
              onSubmit={handleSubmitDate} 
              className="form_date">
              <input
                value={date}
                onChange={(e) => {setDate(e.target.value)}}
                type="date"
                className="input w-50 p-3 rounded text-center"
              />
              <button type="submit" className="btn btn-primary w-50 mt-4">
                Reservez cette date
              </button>
            </form>
          </div>

          {/* informations content */}
          <div className={step === 3 ? "info_content py-4" : "d-none"}>
            <h6 className="my-2">
              <i className="fa fa-address-book"></i> Informations complémentaires
            </h6>
            {/* add more informations */}
            <FormInformation date={date}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
