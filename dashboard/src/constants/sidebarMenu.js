import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import FileOpenIcon from '@mui/icons-material/FileOpen';

export const sidebarMenu = [
    {
        title: 'Dashboard',
        icon: HomeOutlinedIcon,
        path: '/',
    },
    
    {
        title: 'Gestion médecin',
        icon: PeopleOutlinedIcon,
        path: '/doctor',
    },
    {
        title: 'Ajouter un Médecin',
        icon: ContactsOutlinedIcon,
        path: '/adddoctor',
    },
    {
        title: 'Documents',
        icon: FileOpenIcon,
        path: '/documents',
    },
    {
        title: 'Rendez-Vous',
        icon: ReceiptOutlinedIcon,
        path: '/appointment',
    },
    {
        title: 'Calendar',
        icon: CalendarTodayOutlinedIcon,
        path: '/calendar',
    },
    {
        title: 'Messages',
        icon: MessageOutlinedIcon,
        path: '/message',
    },
    {
        title: 'Bar Chart',
        icon: BarChartOutlinedIcon,
        path: '/bar',
    },
    {
        title: 'Line Chart',
        icon: TimelineOutlinedIcon,
        path: '/line',
    },
    {
        title: 'FAQ Page',
        icon: HelpOutlineOutlinedIcon,
        path: '/faq',
    },
]