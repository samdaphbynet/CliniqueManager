import {useContext} from 'react';

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { Box, IconButton } from "@mui/material";
import { Context } from '../../index';


const Topbar = () => {

  const {isCollapsed} = useContext(Context)

  return (
    <Box 
      display="flex" 
      justifyContent="space-between" 
      p={2} 
      position="fixed"
      right="2.2%"
      top="15px"
      borderRadius="10px"
      width={isCollapsed ? "92%" : "82%"} 
      height={65}
      zIndex={100}
      backgroundColor="#ffffff"
      boxShadow="0 0px 20px 0px #A0A0A0"
    >

      {/* 🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧 SEARCH BAR 🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧 */}
      <Box
        display="flex"
        borderRadius="3px"
        backgroundColor="#F5F1F1FF"
        border="1px solid black"
      >
        <InputBase 
          sx={{ 
            ml: 2,
            flex: 1,
            color: "black",
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px",
            borderRadius: "5px",
          }} 
          placeholder="Recherche..." />

        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon sx={{color: "black"}}/>
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