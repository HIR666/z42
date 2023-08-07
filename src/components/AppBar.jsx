/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import logo from "../assets/logoclear.png";

//switch
import { FormControlLabel, Switch } from "@mui/material";

import { LanguageContext } from "../utils/languageContext";

const Zaq = (s, m) => {
  return <img src={logo} style={{ width: 35, marginRight: 12 }} />;
};

//const pages = ["home", "about", "contact us"];

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function MainAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { toggleLanguage, termReturner, currentReturner } =
    useContext(LanguageContext);

  const handleLanguage = (e) => {
    if (e.target.checked) {
      toggleLanguage(e.target.value);
    } else {
      toggleLanguage("ar");
    }
  };

  const pages = [
    {
      display: termReturner("home"),
      url: "#/",
    },
    {
      display: termReturner("about"),
      url: "#/about",
    },
    // {
    //   display: "CONTACT US",
    //   url: "contact",
    // },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Zaq />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },

              fontFamily: currentReturner() == "ar" ? "zest" : "monospace",
              fontWeight: 700,
              // letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {termReturner("z42title")}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.url} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    component={"a"}
                    href={page.url}
                    style={{
                      color: "inherit",
                      textDecoration: "none",
                      fontFamily: "zest",
                    }}
                  >
                    {page.display}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <Zaq />
          </Box>
          <Typography
            variant="subtitle1"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: currentReturner() == "ar" ? "zest" : "monospace",
              fontWeight: 700,
              // letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {termReturner("z42title")}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                href={page.url}
                key={page.url}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontFamily: "zest",
                }}
              >
                {page.display}
              </Button>
            ))}
          </Box>

          {/* right side of appbar code begin */}

          <Box sx={{ flexGrow: 0 }}>
            <Typography
              sx={{ fontSize: { xs: 12, md: 14 } }}
              component={"span"}
            >
              AR
            </Typography>
            <Switch
              color="primary"
              onChange={(e) => {
                handleLanguage(e);
              }}
              value="en"
            />
            <Typography
              sx={{ fontSize: { xs: 12, md: 14 } }}
              component={"span"}
            >
              EN
            </Typography>
            {/* <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
          </Box>

          {/* right side of appbar code end */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MainAppBar;
