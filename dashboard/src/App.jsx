import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Dashboard,
  Doctor,
  AddNewDoctor,
  Appointment,
  Calendars,
  Messages,
  Bar,
  FAQ,
  Line,
  SidebarMenu,
  Topbar,
} from "./pages";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material"; // reset all default css
import { ColorModeContext, useMode } from "./styles/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "./index";
import Login from "./pages/auth/Login";

const App = () => {
  const [theme, colorMode] = useMode();
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userAdmin = await axios.get(
          "http://localhost:5000/api/v1/user/getadmin",
          { withCredentials: true, }
        );
        setIsAuthenticated(true);
        setUser(userAdmin.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div style=
        {{
          position: "absolute", 
          top: "50%", 
          left: "50%", 
        }}
      >
        <img src="/spinner.svg" alt="" style={{width: "100px", height: "100px"}}/>
      </div>
    );
  }

  if (!isAuthenticated) { 
      return <Login />
  }


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {/* Rest CSS */}
        <CssBaseline />

        <BrowserRouter>
          <main className="app">

            <SidebarMenu />

            <section className="content">
              <Topbar />

              <Routes>
                <Route path="/login" element={<Login />} />
                {isAuthenticated ? (
                  <>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/doctor" element={<Doctor />} />
                    <Route path="/adddoctor" element={<AddNewDoctor />} />
                    <Route path="/appointment" element={<Appointment />} />
                    <Route path="/calendar" element={<Calendars />} />
                    <Route path="/message" element={<Messages />} />
                    <Route path="/bar" element={<Bar />} />
                    <Route path="/line" element={<Line />} />
                    <Route path="/faq" element={<FAQ />} />
                  </>
                ) : (
                  <Route path="*" element={<Navigate to="/login" />} />
                )}
              </Routes>
              <ToastContainer position="top-center" />
            </section>
          </main>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
