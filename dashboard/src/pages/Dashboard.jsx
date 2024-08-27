import { useContext, useRef, useState } from "react";
import { Header, ProgressCircle, LineChart, BarChart } from "../components";
import { Box, Button, IconButton, Typography } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { Context } from "../index";

import StateEmail from './componentDashboard/StateEmail';
import StateDoctor from './componentDashboard/StateDoctor';
import StatePatient from './componentDashboard/StatePatient';
import StateAppointment from './componentDashboard/StateAppointment';
import Transactions from "./componentDashboard/Transactions";

import {ReactToPrint} from "react-to-print";


const Dashboard = () => {
  const { user } = useContext(Context);
  const ref = useRef();

  return (
    <Box m="40px" mt="80px" marginLeft="300px">

      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle={`Bienvenu ${user?.firstName} - ${user?.lastName} dans votre dashboard`} />
        {/* download button */}
        <Box>
          <ReactToPrint
            trigger={() => <Button
              sx={{
                backgroundColor: "#008CFF",
                color: "white",
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <DownloadOutlinedIcon sx={{ mr: "10px" }} />
              Télécharger le raport
            </Button>}
            content={() => ref.current}
            documentTitle = "Statistique de clinique Toulouse"
            pageStyle = "print"
          />
          
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        ref={ref}
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="135px"
        gap="20px"
      >
        {/* 🟨🟨🟨🟨🟨🟨 ROW 1 🟨🟨🟨🟨🟨🟨 */}
        <StateEmail/>
        <StateDoctor/>
        <StatePatient/>
        <StateAppointment />

        {/* 🟨🟨🟨🟨🟨🟨 ROW 2 🟨🟨🟨🟨🟨🟨 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor="#EBEBEB"
          boxShadow="0 0px 20px 0px #A0A0A0"
        >
          {/* header line chart */}
          <Box
            mt="20px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color="#000000"
              >
                Revenus générés
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color="#000000"
              >
                59,342.32€
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: "#00A2FF" }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        {/* transactions */}
        <Transactions />

        {/* 🟨🟨🟨🟨🟨🟨 ROW 3 🟨🟨🟨🟨🟨🟨 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor="#EBEBEB"
          p="30px"
          boxShadow="0 0px 20px 0px #A0A0A0"
        >
          <Typography color="#000000" variant="h5" fontWeight="600">
            Campagne
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle progress="0.20" size="125" />
            <Typography
              variant="h5"
              color="#000000"
              sx={{ mt: "15px" }}
            >
              48 352€ de revenus générés
            </Typography>
            <Typography color="#5F5F5F">Comprend diverses dépenses et coûts supplémentaires</Typography>
          </Box>
        </Box>

        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor="#EBEBEB"
          boxShadow="0 0px 20px 0px #A0A0A0"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            color="#000000"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="350px" mt="-20px" ml="-280px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>

      </Box>
    </Box>
  );
};

export default Dashboard;