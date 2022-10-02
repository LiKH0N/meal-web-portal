import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import FaxIcon from "@mui/icons-material/Fax";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
export default function Index() {
  return (
    <Paper
      sx={{
        width: "96%",
        margin: "auto",
       
      }}
    >
  
      <Typography
        variant="bold"
        sx={{ color: "gray" }}
        component="h1"
        align="center"
      >
        Contact
      </Typography>
      <List dense={true}>
        <ListItem disablePadding>
          <ListItemButton component="a" href="https://wa.me/+8801623218618">
            <ListItemIcon>
              <WhatsAppIcon />
            </ListItemIcon>
            <ListItemText>+8801623218618</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Paper>
  );
}
