import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { Box, IconButton } from "@mui/material";


const Topbar = () => {

  return (
    <Box 
      display="flex" 
      justifyContent="space-between" 
      p={2} 
      backgroundColor="#EBEBEB"
      boxShadow="0 0px 20px 0px #A0A0A0"
    >

      {/* 🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧 SEARCH BAR 🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧 */}
      <Box
        display="flex"
        borderRadius="3px"
        backgroundColor="#000000"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Recherche" />

        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>


      {/* 🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧 ICONS 🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧 */}
      <Box display="flex">

        <IconButton sx={{position: "relative", color: "black"}}>
          <Box position="absolute" top="-10px" fontSize="15px">
            0
          </Box>
          <NotificationsOutlinedIcon />
        </IconButton>

        <IconButton sx={{color: "black"}}>
          <SettingsOutlinedIcon />
        </IconButton>

        <IconButton sx={{color: "black"}}>
          <PersonOutlinedIcon />
        </IconButton>

      </Box>

    </Box>
  )
}

export default Topbar