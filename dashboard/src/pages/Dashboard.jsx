import { useContext } from "react";
import { Header, ProgressCircle, LineChart, BarChart } from "../components";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { mockTransactions } from "../constants/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { Context } from "../index";
import StateEmail from './componentDashboard/StateEmail';
import StateDoctor from './componentDashboard/StateDoctor';
import StatePatient from './componentDashboard/StatePatient';
import StateAppointment from './componentDashboard/StateAppointment';

const Dashboard = () => {
  const { user } = useContext(Context);

  return (
    <Box m="20px">

      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">

        <Header title="DASHBOARD" subtitle={`Bienvenu ${user.firstName} - ${user.lastName} dans votre dashboard`} />

        {/* download button */}
        <Box>
          <Button
            sx={{
              backgroundColor: "#008CFF",
              color: "white",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>

      </Box>

      {/* GRID & CHARTS */}
      <Box
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
          <Box
            mt="25px"
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
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color="#000000"
              >
                $59,342.32
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

        <Box
          gridColumn="span 4"
          gridRow="span 4"
          backgroundColor="#EBEBEB"
          overflow="auto"
          boxShadow="0 0px 20px 0px #A0A0A0"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid #00AEFF`}
            colors="#000000"
            p="15px"
          >
            <Typography color="#000000" variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid #00AEFF`}
              p="15px"
            >
              <Box>
                <Typography
                  color="#0077FF"
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color="#000000">
                  {transaction.user}
                </Typography>
              </Box>
              <Box color="#575757">{transaction.date}</Box>
              <Box
                backgroundColor="#00FFFF"
                color="#000000"
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>

        {/* 🟨🟨🟨🟨🟨🟨 ROW 3 🟨🟨🟨🟨🟨🟨 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor="#EBEBEB"
          p="30px"
          boxShadow="0 0px 20px 0px #A0A0A0"
        >
          <Typography color="#000000" variant="h5" fontWeight="600">
            Campaign
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
              $48,352 revenue generated
            </Typography>
            <Typography color="#5F5F5F">Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
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
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>

      </Box>
    </Box>
  );
};

export default Dashboard;