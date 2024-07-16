import React, { useState, useContext } from "react";
import axios from "axios";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {

  const {isAuthenticated, setIsAuthenticated} = useContext(Context)
  const [formRegister, setFormRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    birth: "",
    gender: "",
  });
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/user/register", 
        {
          firstName: formRegister.firstName, 
          lastName: formRegister.lastName,
          email: formRegister.email,
          password: formRegister.password,
          phone: formRegister.phone,
          birth: formRegister.birth,
          gender: formRegister.gender,
          role: "Patient",
        }, {
          withCredentials: true,
        });
      setIsAuthenticated(true);
      navigate("/");
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.data.message);
      console.log(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return navigate("/")
  }
  return (
    <div className="login-register">
      <div className="login">
        <div className="user_login">
          <form onSubmit={handleSubmit}>
            <label>firstName</label>
            <input
              onChange={(e) => {
                setFormRegister({...formRegister, firstName: e.target.value });
              }}
              value={formRegister.firstName}
              type="text" 
              className="input" />
            <br />

            <label>lastName</label>
            <input
              onChange={(e) => {
                setFormRegister({...formRegister, lastName: e.target.value });
              }}
              value={formRegister.lastName}
              type="text" 
              className="input" />
            <br />

            <label>Email</label>
            <input
              onChange={(e) => {
                setFormRegister({...formRegister, email: e.target.value });
              }}
              value={formRegister.email}
              type="text" 
              className="input" />
            <br />

            <label>Password</label>
            <input
              onChange={(e) => {
                setFormRegister({...formRegister, password: e.target.value });
              }}
              value={formRegister.password}
              type="password" 
              className="input" />
            <br />

            <label>Phone</label>
            <input
              onChange={(e) => {
                setFormRegister({...formRegister, phone: e.target.value });
              }}
              value={formRegister.phone}
              type="number" 
              className="input" />
            <br />

            <label>Birth</label>
            <input 
             onChange={(e) => {
                setFormRegister({...formRegister, birth: e.target.value });
              }}
              value={formRegister.birth}
              type="date" 
              className="input" />
            <br />

            <label>Gender</label>
            <select 
              value={formRegister.gender}
              onChange={(e) => {
                setFormRegister({...formRegister, gender: e.target.value });
              }}
              className="form-control input">
              <option value="select">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <div className="action_btns">
              <div className="one_half last">
                <button
                  type="submit"
                  className="btn btn-primary px-4 py-2 m-2 text-center"
                >
                  Register
                </button>
              </div>
            </div>
          </form>

          <div className="footer_register">
            <a href="login" className="forgot_password">
              Vous avez dèjà un compte?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
