import Home from "./components/main/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Appointment from "./components/main/Appointment";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Context } from "./main";
import { useContext, useEffect } from "react";
import axios from "axios";

function App() {

  const {isAuthenticated, setIsAuthenticated, setUser} = useContext(Context)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://clinique-manager-api.vercel.app/api/v1/user/getpatient", {withCredentials: true})
          setIsAuthenticated(true)
          setUser(response.data.user)
      } catch (error) {
          setIsAuthenticated(false)
          setUser({})
          console.log(error.response.data.message)
      }
    }
    fetchUser()
  }, [isAuthenticated])

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/appointment" element={<Appointment />} />
      </Routes>
      <Footer />
      <ToastContainer position="top-center" />
    </Router>
  );
}

export default App;
