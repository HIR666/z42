/* eslint-disable no-unused-vars */
//import { useState } from "react";

import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import AboutScreen from "./screens/AboutScreen";
import HomeScreen from "./screens/HomeScreen";
import MainAppBar from "./components/AppBar";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import texture from "./assets/TEXTURE.webp";

//fonts
import "./assets/fonts/ZESTBOLD.ttf";
import "./assets/fonts/ZESTREGULAR.ttf";
import "./assets/fonts/ZESTLIGHT.ttf";
import { LanguageProvider } from "./utils/languageContext";

const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: "unset" } },
    },
  },
  palette: {
    mode: "dark",
    direction: "ltr",
    background: {
      paper: "#000000", // your color
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LanguageProvider>
        <HashRouter>
          <MainAppBar />
          <Box
            component="div"
            sx={{
              position: "fixed",
              width: "100%",
              height: "100%",
              backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${texture})`,
              // backgroundPosition: "center",
              backgroundSize: "cover",
              // backgroundRepeat: "no-repeat",
              overflowY: "scroll",
              paddingBottom: 20,
            }}
          >
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/about" element={<AboutScreen />} />
            </Routes>
          </Box>
        </HashRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
