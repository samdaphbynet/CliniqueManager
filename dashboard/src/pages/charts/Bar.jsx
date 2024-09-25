import { BarChart, Header } from "../../components";
import { Box } from "@mui/material";


const Bar = () => {

  return (
    <Box mt="6%" ml="300px" display="flex" flexDirection="column">

      <Header title="Bar Chart" subtitle="Simple Bar Chart" />

      <Box height="75vh">
        <BarChart />
      </Box>

    </Box>
  );
};

export default Bar;