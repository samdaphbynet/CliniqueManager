import { LineChart, Header } from "../../components";
import { Box } from "@mui/material";

const Line = () => {

  return (
    <Box mt="6%" ml="300px" display="flex" flexDirection="column">

      <Header title="Line Chart" subtitle="Simple Line Chart" />

      <Box height="75vh">
        <LineChart />
      </Box>

    </Box>
  );
};

export default Line;