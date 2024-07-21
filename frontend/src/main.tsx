import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Router from "./router.tsx";

const theme = createTheme({
  palette: {
    background: {
      default: "#111827",
      paper: "#1F2937",
    },
    primary:{
      main: "#11B886",
    },
    secondary:{
      main: "#6950E8"
    },
    text: {
      primary: "#FFFFFF",
      disabled: "#34394B",
      secondary: "#939AA6",
    },
  },
  components: {
    MuiPaper: {
      defaultProps: {
        sx: {
          borderRadius: "16px",
          boxShadow:
            "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  </React.StrictMode>
);
