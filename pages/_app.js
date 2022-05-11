import "../styles/globals.css";
import theme from "../context/mui-theme";
import { ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material/styles";
function MyApp({ Component, pageProps }) {
  return (
    <StyledEngineProvider injectFirst>
      {/* injectFirst is needed to override the css of MUI without using "!important", see docs: https://mui.com/material-ui/guides/interoperability/#css-injection-order-3 */}
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default MyApp;
