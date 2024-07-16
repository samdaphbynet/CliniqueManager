import { Box } from "@mui/material";

const ProgressCircle = ({ progress, size}) => {

    const angle = progress * 360;
    
    return (
        <Box
            sx={{
                background: `radial-gradient(#CCCCCC 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, #6D6D6D ${angle}deg 360deg),
            #00B7FF`,
                borderRadius: "50%",
                width: `${size}px`,
                height: `${size}px`,
            }}
        />
    );
};

export default ProgressCircle;