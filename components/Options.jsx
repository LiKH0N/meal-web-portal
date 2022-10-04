import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { useRouter } from "next/router";
import HomeIcon from "@mui/icons-material/Home";
import PaymentIcon from "@mui/icons-material/Payment";
import SettingsIcon from "@mui/icons-material/Settings";
import PaidIcon from "@mui/icons-material/Paid";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import dynamic from "next/dynamic";
const actions = [
  { icon: <HomeIcon color="error" />, link: "/", name: "হোম" },
  {
    icon: <PersonAddIcon color="error" />,
    link: "/add-new-person",
    name: "মেম্বার",
  },
  {
    icon: <AttachMoneyIcon color="error" />,
    link: "/others-bill",
    name: "খরচ",
  },
  { icon: <PaymentIcon color="error" />, link: "/pay-now", name: "জমা" },
  {
    icon: <PaidIcon color="error" />,
    link: "/cost-entry",
    name: "বাজার",
  },
  { icon: <SettingsIcon color="error" />, link: "/settings", name: "সেটিংস" },
];

function Options() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const pageChange = (link) => {
    router.push(link);
  };

  return (
    <SpeedDial
      ariaLabel="SpeedDial tooltip example"
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        "& .MuiFab-primary": { backgroundColor: "gold", color: "black" },
      }}
      icon={<SpeedDialIcon />}
      onOpen={handleOpen}
      onClose={handleClose}
      open={open}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          tooltipOpen
          // sx={{
          //   background: open ? "#F29E12" : null,
          //   mb: open ? "3px" : null,
          //   border: open ? "1px solid #E97B0A" : null,
          //   borderRadius: open ? "12px" : null,
          // }}
          onClick={() => pageChange(action.link)}
        />
      ))}
    </SpeedDial>
  );
}

export default dynamic(() => Promise.resolve(Options), {
  ssr: false,
});
