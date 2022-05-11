import "../styles/globals.css";
import theme from "../context/mui-theme";
// import { ThemeProvider } from "@material-ui";
import { ThemeProvider } from "@mui/material/styles";
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
