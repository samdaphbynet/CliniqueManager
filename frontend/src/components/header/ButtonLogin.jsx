import React, { useContext, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ButtonLogin = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated, setIsAuthenticated, baseUrl} = useContext(Context);

  const navigate = useNavigate();

  // handle logout events
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${baseUrl}/api/v1/user/logoutpatient`,
        {},
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="gradient-button">
          <a href="/" onClick={handleLogout}>
            <i className="fa fa-sign-in-alt"></i> Se déconnecter
          </a>
        </div>
      ) : (
        <div className="gradient-button">
          <a href="login">
            <i className="fa fa-sign-in-alt"></i> Connectez vous
          </a>
        </div>
      )}
    </>
  );
};

export default ButtonLogin;
