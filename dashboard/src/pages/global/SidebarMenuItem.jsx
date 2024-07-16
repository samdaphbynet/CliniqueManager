import { Typography } from "@mui/material";
import { MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";


const SidebarMenuItem = ({ menu, selected, setSelected }) => {

    return (
        <MenuItem
            icon={<menu.icon />}
            active={selected === menu.path}
            onClick={() => setSelected(menu.path)}
            style={{color: "#000000"}}
        >
            <Typography>{menu.title}</Typography>

            <Link to={menu.path} />
        </MenuItem>
    );
};

export default SidebarMenuItem