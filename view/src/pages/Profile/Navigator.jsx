/* eslint-disable no-unused-vars */
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import PermMediaOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActual";
import PublicIcon from "@mui/icons-material/Public";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import TimerIcon from "@mui/icons-material/Timer";
import SettingsIcon from "@mui/icons-material/Settings";
import PhonelinkSetupIcon from "@mui/icons-material/PhonelinkSetup";
import { Link } from "react-router-dom";

const categories = [
  {
    id: "Build",
    children: [
      {
        id: "Profile",
        icon: <PeopleIcon />,
      },
      { id: "", icon: <DnsRoundedIcon /> },
      { id: "", icon: <PermMediaOutlinedIcon /> },
      { id: "", icon: <PublicIcon /> },
      { id: "", icon: <SettingsEthernetIcon /> },
      {
        id: "Machine ",
        icon: <SettingsInputComponentIcon />,
      },
    ],
  },
  {
    id: "Quality",
    children: [
      { id: "Upload Event", icon: <SettingsIcon /> },
      { id: "Performance", icon: <TimerIcon /> },
      { id: "Test Lab", icon: <PhonelinkSetupIcon /> },
    ],
  },
];

/* const admin = [
  {
    id: "Quality",
    children: [
      { id: "Analytics", icon: <SettingsIcon /> },
      { id: "Performance", icon: <TimerIcon /> },
      { id: "Test Lab", icon: <PhonelinkSetupIcon /> },
    ],
  },
]; */

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

/* const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
}; */

export default function Navigator(props) {
  const { ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <Box sx={{ bgcolor: "#101F33" }}>
          <ListItem sx={{ py: 2, px: 3 }}>
            <ListItemText sx={{ color: "#fff" }}>Profile</ListItemText>
          </ListItem>
          <ListItem disablePadding>
            <Link
              to="/profile"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={item}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link
              to="/profile/bookedEvent"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={item}>
                <ListItemIcon>
                  <DnsRoundedIcon />
                </ListItemIcon>
                <ListItemText>Booked Event</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
          {/* Add more links as needed */}
          <Divider sx={{ mt: 2 }} />
        </Box>
        <Box sx={{ bgcolor: "#101F33" }}>
          <ListItem sx={{ py: 2, px: 3 }}>
            <ListItemText sx={{ color: "#fff" }}>Admin</ListItemText>
          </ListItem>
          <ListItem disablePadding>
            <Link
              to="/profile/uploadEvent"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={item}>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText>Upload Event</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link
              to="/profile/editEvent"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={item}>
                <ListItemIcon>
                  <TimerIcon />
                </ListItemIcon>
                <ListItemText>Edit Event</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link
              to="/profile/editUsers"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={item}>
                <ListItemIcon>
                  <TimerIcon />
                </ListItemIcon>
                <ListItemText>Edit Users</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
          {/* Add more links as needed */}
          <Divider sx={{ mt: 2 }} />
        </Box>

        <Box sx={{ bgcolor: "#101F33" }}>
          <ListItem sx={{ py: 2, px: 3 }}>
            <ListItemText sx={{ color: "#fff" }}>Setting</ListItemText>
          </ListItem>
          <ListItem disablePadding>
            <Link
              to="/profile/editAccount"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={item}>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText>Edit Profile</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link
              to="/profile/updatePassword"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={item}>
                <ListItemIcon>
                  <TimerIcon />
                </ListItemIcon>
                <ListItemText>Update Password</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link
              to="/profile/editEvent"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={item}>
                <ListItemIcon>
                  <TimerIcon />
                </ListItemIcon>
                <ListItemText>Performance</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
          {/* Add more links as needed */}
          <Divider sx={{ mt: 2 }} />
        </Box>
      </List>
    </Drawer>
  );
}
