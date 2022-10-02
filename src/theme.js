import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    background: {
      default: "#FFFFFF",
    },
    btnColor: {
      main: "#FF9D14",
    },
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    textFielBorderColor: {
      main: "#ccc",
    },
    titleColor: {
      main: "#E13068",
    },
  },
});

export default theme;
