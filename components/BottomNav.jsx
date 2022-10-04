import { AppBar, Container, IconButton, Stack, Toolbar } from "@mui/material";
import React from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HomeIcon from "@mui/icons-material/Home";
import PaymentIcon from "@mui/icons-material/Payment";
import SettingsIcon from "@mui/icons-material/Settings";
import PaidIcon from "@mui/icons-material/Paid";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
export default function BottomAppBar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        background: "#FFA610",
        top: "auto",
        bottom: 0,
        border: "1px solid #FF9D14",
        boxShadow: "0 1px 4px 0 rgb(0 0 0 / 50%)",
      }}
    >
      <Toolbar>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={0.1}
          sx={{ width: "100%" }}
        >
          <IconButton>
            <HomeIcon color="error" />
          </IconButton>
          <IconButton>
            <PersonAddIcon color="error" />
          </IconButton>
          <IconButton>
            <AttachMoneyIcon color="error" />
          </IconButton>
          <IconButton>
            <PaymentIcon color="error" />
          </IconButton>
          <IconButton>
            <PaidIcon color="error" />
          </IconButton>
          <IconButton>
            <SettingsIcon color="error" />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
