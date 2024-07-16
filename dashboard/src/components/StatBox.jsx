import { Box, Typography } from "@mui/material";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {

    return (
        <Box width="100%" m="0 30px">

            <Box display="flex" justifyContent="space-between">
                <Box>
                    {icon}
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        color="#000000"
                    >
                        {title}
                    </Typography>
                </Box>
                <Box>
                    <ProgressCircle progress={progress} size="70"/>
                </Box>
            </Box>

            <Box display="flex" justifyContent="space-between" mt="2px">
                <Typography variant="h5" color="#303030" fontSize="18px">
                    {subtitle}
                </Typography>
                <Typography
                    variant="h5"
                    fontStyle="italic"
                    color="#009425"
                >
                    {increase}
                </Typography>
            </Box>
            
        </Box>
    );
};

export default StatBox;