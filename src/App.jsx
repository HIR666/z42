/* eslint-disable no-unused-vars */
//import { useState } from "react";

import "./App.css";
import { Outlet } from "react-router-dom";

import MainAppBar from "./components/AppBar";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import texture from "./assets/TEXTURE.jpg";

//fonts
import "./assets/fonts/ZESTBOLD.ttf";
import "./assets/fonts/ZESTREGULAR.ttf";
import "./assets/fonts/ZESTLIGHT.ttf";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

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
        <Outlet />
      </Box>
    </ThemeProvider>
  );
}

export default App;
