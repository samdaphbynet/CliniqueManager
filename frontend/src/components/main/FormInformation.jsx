import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./main.css";
import { department } from "../../data/doctor";
import { toast } from "react-toastify";
import { Context } from "../../main";


const FormInformation = (props) => {
  
  const {baseUrl} = useContext(Context)
  const navigate = useNavigate();
  const [appoint, setAppoint] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birth: "--",
    gender: "",
    doctor_firstName: "",
    doctor_lastName: "",
    department: "",
    address: "",
    appointment: new Date(),
    hasVisited: false,
  });

  // get name of all doctors
  const [doctorName, setDoctorName] = useState([]);
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/v1/user/doctor`
        );
        setDoctorName(response.data.doctors);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDoctor();
  }, []);

  // handle form submit
  const handleFormAppointment = (e) => {
    e.preventDefault();
    try {
      axios
        .post(
          `${baseUrl}/api/v1/appointment/appointment`,
          {
            firstName: appoint.firstName,
            lastName: appoint.lastName,
            email: appoint.email,
            phone: appoint.phone,
            birth: appoint.birth,
            gender: appoint.gender,
            department: appoint.department,
            doctor_firstName: appoint.doctor_firstName,
            doctor_lastName: appoint.doctor_lastName,
            address: appoint.address,
            appointment: appoint.appointment,
            hasVisited: appoint.hasVisited,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          toast.success("Votre rendez-vous est réservé avec succès");
          navigate("/");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.log(error.response);
        });
    } catch (error) {
      console.log(error);
      toast.error("Une erreur est survenue lors de la réservation");
    }
  };

  // handle day, month and year
  const handleDateChange = (e, type) => {
    const value = e.target.value;
    let newBerth = appoint.birth.split("-");
    if (type === "day") newBerth[2] = value.padStart(2, "0");
    if (type === "month") newBerth[1] = value.padStart(2, "0");
    if (type === "year") newBerth[0] = value;

    setAppoint({ ...appoint, birth: newBerth.join("-") });
  };

  // handle gender
  const handleGenderChange = (e) => {
    setAppoint({ ...appoint, gender: e.target.value });
  };

  // handle appointment change
  const handleDateAppointment = (e) => {
    setAppoint({ ...appoint, appointment: e.target.value });
  };

  return (
    <div className="form_information">
      <form onSubmit={handleFormAppointment}>
        <div className="row">
          <div className="input-group input-group-icon">
            <input
              type="text"
              placeholder="Nom"
              value={appoint.firstName}
              onChange={(e) => {
                setAppoint({ ...appoint, firstName: e.target.value });
              }}
            />
            <div className="input-icon">
              <i className="fa fa-user"></i>
            </div>
          </div>
          <div className="input-group input-group-icon">
            <input
              type="text"
              placeholder="Prénom"
              value={appoint.lastName}
              onChange={(e) => {
                setAppoint({ ...appoint, lastName: e.target.value });
              }}
            />
            <div className="input-icon">
              <i className="fa fa-user"></i>
            </div>
          </div>
          <div className="input-group input-group-icon">
            <input
              type="email"
              placeholder="Email Adress"
              value={appoint.email}
              onChange={(e) => {
                setAppoint({ ...appoint, email: e.target.value });
              }}
            />
            <div className="input-icon">
              <i className="fa fa-envelope"></i>
            </div>
          </div>
          <div className="input-group input-group-icon">
            <input
              type="number"
              placeholder="Téléphone Mobile"
              value={appoint.phone}
              onChange={(e) => {
                setAppoint({ ...appoint, phone: e.target.value });
              }}
            />
            <div className="input-icon">
              <i className="fa fa-phone"></i>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-half">
            <h4>Date de naissance</h4>
            <div className="input-group">
              <div className="col-third">
                <input
                  type="text"
                  placeholder="Jour"
                  onChange={(e) => handleDateChange(e, "day")}
                />
              </div>
              <div className="col-third">
                <input
                  type="text"
                  placeholder="Mois"
                  onChange={(e) => handleDateChange(e, "month")}
                />
              </div>
              <div className="col-third">
                <input
                  type="text"
                  placeholder="Année"
                  onChange={(e) => handleDateChange(e, "year")}
                />
              </div>
            </div>
          </div>
          {/* gender */}
          <div className="col-half">
            <h4>Gender</h4>
            <div className="form-check">
              <input
                onChange={handleGenderChange}
                type="radio"
                value="male"
                id="gender-male"
                className="form-check-input"
                checked={appoint.gender === "male"}
              />
              <label className="mb-2" htmlFor="gender-male">
                Homme
              </label>
              <input
                onChange={handleGenderChange}
                type="radio"
                value="female"
                id="gender-female"
                className="form-check-input"
                checked={appoint.gender === "female"}
              />
              <label htmlFor="gender-female">Femme</label>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <h4>Liste des départements Clinique</h4>
          {/* map list of department */}
          <div className="row my-4">
            {department.map((item) => (
              <div className="col-md-3" key={item.name}>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    value={item.name}
                    id={item.name}
                    checked={appoint.department === item.name}
                    onChange={(e) => {
                      setAppoint({ ...appoint, department: e.target.value });
                    }}
                  />
                  <label className="form-check-label" htmlFor={item.name}>
                    {item.name}
                  </label>
                </div>
              </div>
            ))}
          </div>
          {/* map list doctor */}
          <div className="my-4">
            <h4>Selectionez votre medcien</h4>

            <select
              onChange={(e) => {
                const [firstName, lastName] = e.target.value.split(" ");
                setAppoint({
                  ...appoint,
                  doctor_firstName: firstName,
                  doctor_lastName: lastName,
                });
              }}
              className="w-50 list_select"
            >
              <option disabled value="x">
                Choisissez votre medcien
              </option>
              {doctorName.map((item, index) => (
                <option
                  key={index}
                  value={`${item.firstName} ${item.lastName}`}
                >
                  {item.firstName} {item.lastName}
                </option>
              ))}
            </select>
          </div>

          {/* address */}
          <div className="col-half">
            <div className="input-group input-group-icon">
              <input
                type="text"
                placeholder="Votre Adresse"
                value={appoint.address}
                onChange={(e) => {
                  setAppoint({ ...appoint, address: e.target.value });
                }}
              />
              <div className="input-icon">
                <i className="fa fa-address-card"></i>
              </div>
            </div>
          </div>

          {/* appointment */}
          <div className="col-md-6 mb-3">
            <div className="input-group">
              <input
                type="date"
                placeholder="Date de Réservation"
                value={props.date}
                onChange={handleDateAppointment}
              />
            </div>
          </div>
        </div>
        {/* has visited */}
        <div className="row">
          <h4>Avez-vous déjà consulté ?</h4>
          <div className="input-group mt-3">
            <label htmlFor="terms"> Cochez cette case si oui. </label>
            <input
              className="appointment_checkbox mr-2"
              checked={appoint.hasVisited}
              type="checkbox"
              onChange={(e) => {
                setAppoint({ ...appoint, hasVisited: e.target.checked });
              }}
            />
          </div>
        </div>

        <button type="submit" className="form-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormInformation;
