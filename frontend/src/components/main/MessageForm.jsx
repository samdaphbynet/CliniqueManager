import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../../main";

const MessageForm = () => {
  const navigate = useNavigate();
  const { baseUrl } = useContext(Context);
  const [message, setMessage] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  // handle submit message
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${baseUrl}/api/v1/message/patient`,
        {
          firstName: message.firstName,
          lastName: message.lastName,
          email: message.email,
          phone: message.phone,
          message: message.message,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setMessage({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div id="message" className="message_container">
      <h1 className="titleMessage">Envoyer un message</h1>
      <h6 className="w-50 text-center">
        Vous avez une question ou besoin d'informations supplémentaires ?
        Envoyez-nous un message et nous vous répondrons dans les plus brefs
        délais. Notre équipe est à votre disposition pour vous aider.
      </h6>

      <div className="formAndImg">
        <div className="backgroundLeft"></div>
        <div className="message">
          <div className="user_login">
            <form className="form_message" onSubmit={handleSubmit}>
              <label>Nom de famille</label>
              <input
                value={message.firstName}
                placeholder="Ex: Patric"
                onChange={(e) => {
                  setMessage({ ...message, firstName: e.target.value });
                }}
                type="text"
                className="input"
              />

              <label>Nom</label>
              <input
                value={message.lastName}
                placeholder="Ex: Adrien"
                onChange={(e) => {
                  setMessage({ ...message, lastName: e.target.value });
                }}
                type="text"
                className="input"
              />

              <label>Votre Email</label>
              <input
                value={message.email}
                placeholder="Ex: example@example.com"
                onChange={(e) => {
                  setMessage({ ...message, email: e.target.value });
                }}
                type="text"
                className="input"
              />

              <label>Téléphone</label>
              <input
                value={message.phone}
                placeholder="Ex: 0658648158"
                onChange={(e) => {
                  setMessage({ ...message, phone: e.target.value });
                }}
                type="number"
                className="input"
              />
              <label>Message</label>
              <textarea
                value={message.message}
                placeholder="Votre message"
                onChange={(e) => {
                  setMessage({ ...message, message: e.target.value });
                }}
                className="form-control"
                rows={7}
              />

              <div className="action_btns">
                <div className="one_half last">
                  <button
                    type="submit"
                    className="btn btn-primary px-4 py-2 m-2 text-center"
                  >
                    Send message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageForm;
