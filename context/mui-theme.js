// import { green } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(20, 20, 20)",
      // contrastText: "white",
    },
    secondary: {
      main: "rgb(50, 50, 50)",
      // contrastText: "white",
    },
    error: {
      main: "rgb(200, 50, 50)",
    },
    warning: {
      main: "rgb(255, 255, 0)",
    },
    info: {
      main: "rgb(0, 255, 255)",
    },
    success: {
      main: "rgb(40, 150, 40)",
    },
    text: {
      main: "rgb(255, 255, 255)",
    },
  },
});

export default theme;
