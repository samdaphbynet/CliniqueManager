import { Typography, Box } from "@mui/material";

const Header = ({ title, subtitle }) => {

    return (
        <Box mb="30px">

            <Typography
                variant="h2"
                color="#000000"
                fontWeight="bold"
                sx={{ m: "0 0 20px 0" }}
            >
                {title}
            </Typography>

            <Typography variant="h5" color="#313131">
                {subtitle}
            </Typography>

        </Box>
    );
};

export default Header;