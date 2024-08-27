import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Box, Button, IconButton, Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { sidebarMenu } from '../../constants/sidebarMenu';
import { useLocation } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SidebarMenuItem from "./SidebarMenuItem";
import "react-pro-sidebar/dist/css/styles.css";
import { Context } from "../../index";
import {useNavigate} from "react-router-dom"


const SidebarMenu = () => {

  const location = useLocation();
  const urlPathName = location.pathname;
  const [selected, setSelected] = useState(urlPathName);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, setIsAuthenticated, baseUrl } = useContext(Context);

  const navigate = useNavigate();

  // handle logout 
  const handleLogout = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/v1/user/logoutadmin`, {withCredentials: true})
      toast.success(res.data.message);
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box
      sx={{
        width: "250px",
        height: "100vh",
        position: "fixed",
        zIndex: "1000",
        top: 0,
        left: 0,
        "& .pro-sidebar-inner": {
          background: `#EBEBEB !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 15px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#008CFF !important",
        },
        "& .pro-menu-item.active": {
          color: "#008CFF !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>

        <Menu iconShape="square">

          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: "#000000",
            }}
          >
            {
              !isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography variant="h3" color="#000000" fontWeight="bold">
                    {user.role}
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon  sx={{color: "#000000"}} />
                  </IconButton>
                </Box>
              )
            }
          </MenuItem>

          {/* 🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧 */}
          {
            !isCollapsed && (
              <Box mb="25px">

                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={`../../doctorplaceholder.png`}
                    style={{ cursor: "pointer"}}
                  />
                </Box>

                <Box textAlign="center">
                  <Typography
                    variant="h2"
                    fontWeight="bold"
                    color="#292727"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    {user.firstName}
                  </Typography>
                  <Typography variant="h5" color="#333333">
                    {user.lastName}
                  </Typography>
                </Box>

              </Box>
            )
          }

          {/* 🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧 */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {
              sidebarMenu.map(menu =>
                menu.tag === 'divider'
                  ?
                  <Typography
                    variant="h6"
                    key={menu.title}
                    color="#000000"
                    sx={{ m: "15px 0 5px 20px" }}
                  >
                    {menu.title}
                  </Typography>
                  :
                  <SidebarMenuItem
                    key={menu.title}
                    menu={menu}
                    selected={selected}
                    setSelected={setSelected}
                  />
              )
            }
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" mt="20px">
            <Button
              onClick={handleLogout}
              sx={{
                backgroundColor: `${isCollapsed ? "transparent" : "white"}`,
                color: "black",
                borderRadius: "5px",
                padding: `${isCollapsed ? "" : "10px 20px"}`,
                "&:hover": {
                  backgroundColor: "#DFDFDF",
                },
              }}
            >
              <LogoutIcon></LogoutIcon>
              {isCollapsed ? "" : "Logout"}
            </Button>
          </Box>

        </Menu>

      </ProSidebar>
    </Box>
  );
};

export default SidebarMenu;