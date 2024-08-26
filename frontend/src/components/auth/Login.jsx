import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, baseUrl } = useContext(Context);
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${baseUrl}/api/v1/user/login`,
        {
          email: formLogin.email,
          password: formLogin.password,
          confirmPassword: formLogin.confirmPassword,
          role: formLogin.role,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(true);
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log("Error in login page:", err)
      });
  };

  if (isAuthenticated) {
    return navigate("/");
  }

  return (
    <div className="login-register">
      <div className="row logRegi">
        <div className="col-lg-6">
            <img src="patient2.png" width={700} height={700} alt="image login" />
        </div>
        
        <div className="login col-lg-6">
        <h1>Se connecter</h1>
          <div className="user_login">
            <form onSubmit={handleSubmit}>
              <label>Email</label>
              <input
                value={formLogin.email}
                onChange={(e) => {
                  setFormLogin({ ...formLogin, email: e.target.value });
                }}
                type="text"
                className="input"
              />
              <br />

              <label>Password</label>
              <input
                value={formLogin.password}
                onChange={(e) => {
                  setFormLogin({ ...formLogin, password: e.target.value });
                }}
                type="password"
                className="input"
              />
              <br />

              <label>Confirm Password</label>
              <input
                value={formLogin.confirmPassword}
                onChange={(e) => {
                  setFormLogin({ ...formLogin, confirmPassword: e.target.value });
                }}
                type="password"
                className="input"
              />
              <br />

              <label>Role</label>
              <select
                value={formLogin.role}
                onChange={(e) => {
                  setFormLogin({ ...formLogin, role: e.target.value });
                }}
                className="form-control"
              >
                <option value="Your Role">Sélectionnez votre role</option>
                <option value="Doctor">Doctor</option>
                <option value="Patient">Patient</option>
                <option value="Admin">Admin</option>
              </select>

              <div className="remember">
                <input className="check_remember" type="checkbox" />
                <label htmlFor="remember">Souviens-toi de moi sur cet ordinateur?</label>
              </div>

              <div className="action_btns">
                <div className="one_half last">
                  <button
                    type="submit"
                    className="btn btn-primary px-4 py-2 m-2 text-center"
                  >
                    Se connecter
                  </button>
                </div>
              </div>
            </form>

            <div className="footer_register">
              <a href="#" className="forgot_password">
              Mot de passe oublié ?
              </a>
              <a href="register" className="forgot_password">
                Vous avez pas de compte?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
