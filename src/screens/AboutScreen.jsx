/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Slide,
  Button,
} from "@mui/material";
import alash from "../assets/ALASH.png";
import moefoe from "../assets/MOEFOE.png";
import bman from "../assets/BMAN.png";
import moeraad from "../assets/MOE_RAAD.png";
import aboutus from "../assets/ABOUTUS.jpg";

import Aos, { init } from "aos";
import "aos/dist/aos.css";

import { LanguageContext } from "../utils/languageContext";

const HeroComponent = () => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        color: "primary.contrastText",
        py: 8,
        textAlign: "center",
      }}
    >
      <Typography variant="h2" gutterBottom>
        Welcome to our Website
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Discover amazing things with Material-UI!
      </Typography>
      <Button variant="contained" color="secondary">
        Get Started
      </Button>
    </Box>
  );
};

const AboutScreen = () => {
  const { termReturner, currentReturner } = useContext(LanguageContext);
  useEffect(() => {
    Aos, init({ duration: 400 });
  }, []);

  return (
    <Container maxWidth="xl">
      <Grid container>
        <Grid
          item
          xs={12}
          mt={3}
          // display={"flex"}
          // alignItems={"center"}
          // justifyContent={"center"}
        >
          <Card elevation={12}>
            <CardMedia
              image={aboutus}
              sx={{
                height: { md: 400, xs: 200 },
                backgroundPositionY: { md: -12, sm: -3, lg: -8 },
              }}
            />
            <CardContent
              sx={{
                fontFamily: "zest",
                textAlign: currentReturner() == "ar" ? "right" : "left",
                fontSize: { xs: 20, md: 24 },
                fontWeight: 100,
              }}
            >
              <Box style={{ textAlign: "center" }}> (zaquurah 42)</Box>
              {termReturner("about1")}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} mt={12} alignItems={"center"}>
          <Typography
            variant="h2"
            textAlign={"center"}
            color={"black"}
            fontWeight={"300"}
          >
            BAND MEMBERS
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <div
          style={{
            background:
              "linear-gradient(313deg, #040404, transparent, transparent)",
            borderRadius: 12,
            margin: 0,
            padding: 0,
          }}
          //data-aos="fade-up"
        >
          <Grid container mt={6}>
            <Grid
              item
              xs={12}
              md={6}
              textAlign={currentReturner() == "ar" ? "right" : "left"}
              padding={3}
              sx={{
                fontSize: { lg: 46, md: 40, xs: 24 },
                fontFamily: "zest",
                color: "black",
              }}
            >
              {termReturner("moefoe")}
            </Grid>
            <Grid item xs={12} md={6}>
              <img
                src={moefoe}
                style={{
                  minHeight: "100%",
                  marginTop: "auto",
                  maxWidth: "100%",
                }}
              />
            </Grid>
          </Grid>
        </div>

        <div
          style={{
            background:
              "linear-gradient(313deg, #040404, transparent, transparent)",
            borderRadius: 12,
            margin: 0,
            padding: 0,
          }}
          // data-aos="fade-right"
          // data-aos-anchor-placement="bottom-bottom"
        >
          <Grid container mt={10}>
            <Grid
              item
              xs={12}
              md={6}
              textAlign={currentReturner() == "ar" ? "right" : "left"}
              padding={3}
              sx={{
                fontSize: { lg: 46, md: 40, xs: 24 },
                fontFamily: "zest",
                color: "black",
              }}
            >
              {termReturner("bman")}
            </Grid>
            <Grid item xs={12} md={6}>
              <img
                src={bman}
                style={{
                  minHeight: "100%",
                  marginTop: "auto",
                  maxWidth: "100%",
                }}
              />
            </Grid>
          </Grid>
        </div>

        <div
          style={{
            background:
              "linear-gradient(313deg, #040404, transparent, transparent)",
            borderRadius: 12,
            margin: 0,
            padding: 0,
          }}
          //data-aos="fade-right"
        >
          <Grid container mt={10}>
            <Grid
              item
              xs={12}
              md={6}
              textAlign={currentReturner() == "ar" ? "right" : "left"}
              padding={3}
              sx={{
                fontSize: { lg: 46, md: 40, xs: 24 },
                fontFamily: "zest",
                color: "black",
              }}
            >
              {termReturner("alash")}
            </Grid>
            <Grid item xs={12} md={6}>
              <img
                src={alash}
                style={{
                  minHeight: "100%",
                  marginTop: "auto",
                  maxWidth: "100%",
                }}
              />
            </Grid>
          </Grid>
        </div>
        <div
          style={{
            background:
              "linear-gradient(313deg, #040404, transparent, transparent)",
            borderRadius: 12,
            margin: 0,
            padding: 0,
          }}
        >
          <Grid container mt={10}>
            <Grid
              item
              xs={12}
              md={6}
              textAlign={currentReturner() == "ar" ? "right" : "left"}
              padding={3}
              sx={{
                fontSize: { lg: 46, md: 40, xs: 24 },
                fontFamily: "zest",
                color: "black",
              }}
            >
              {termReturner("moeraad")}
            </Grid>
            <Grid item xs={12} md={6}>
              <img
                src={moeraad}
                style={{
                  minHeight: "100%",
                  marginTop: "auto",
                  maxWidth: "100%",
                }}
              />
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Container>
  );
};

export default AboutScreen;

//for the indivual band member stylesheet
// linear-gradient(313deg, #040404, transparent, transparent)

//home
// hero component  = main photo mal 3emara
// under the hero component we put the main band description
//2 embed songs under the band description

//events page
//upcoming section
//previous events
