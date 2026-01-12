import React, { useState, useEffect } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, IconButton, Typography, Box, CssBaseline, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PoliceIcon from "@mui/icons-material/LocalPolice";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PublicIcon from "@mui/icons-material/Public";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const drawerWidth = 260;

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [pgCount, setPgCount] = useState(0);
  const [hotelCount, setHotelCount] = useState(0);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    axios.get("http://localhost/backend/getCounts.php")
      .then((response) => {
        setPgCount(response.data.pg);
        setHotelCount(response.data.hotel);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const menuItems = [
    { text: "List of PG", icon: <ApartmentIcon />, route: "/pg-list" },
    { text: "Hotels", icon: <HomeIcon />, route: "/hotels" },
    { text: "List of Police Stations", icon: <PoliceIcon />, route: "/police-stations" },
    { text: "SDPO", icon: <PoliceIcon />, route: "/sdpo" },
    { text: "ADSP", icon: <PoliceIcon />, route: "/adsp" },
    { text: "Add Police Station", icon: <AddBusinessIcon />, route: "/add-police-station" },
    { text: "Add SDPO", icon: <AddBusinessIcon />, route: "/add-sdpo" },
    { text: "Add ADSP", icon: <AddBusinessIcon />, route: "/add-adsp" },
    { text: "Notice", icon: <NotificationsIcon />, route: "/notice" },
    { text: "Geographical Lists", icon: <PublicIcon />, route: "/geographical-lists" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      
      {/* AppBar (Top Navbar) */}
      <AppBar position="fixed" sx={{ width: `calc(100% - ${open ? drawerWidth : 0}px)`, ml: open ? `${drawerWidth}px` : 0 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setOpen(!open)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Dashboard</Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar (Drawer) */}
      <Drawer
        sx={{ width: drawerWidth, flexShrink: 0, "& .MuiDrawer-paper": { width: drawerWidth } }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index} onClick={() => navigate(item.route)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Typography variant="h5">Dashboard Overview</Typography>
        <Typography variant="body1">Total PGs: {pgCount}</Typography>
        <Typography variant="body1">Total Hotels: {hotelCount}</Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
