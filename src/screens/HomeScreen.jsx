import React from "react";
import { Container, Box, Grid, Paper } from "@mui/material";
import hero from "../assets/hero.png";

const HomeScreen = () => {
  return (
    // <Box
    //   sx={{
    //     background: `linear-gradient(90deg, black, transparent, black), url(${hero})`,
    //     width: "100%",
    //     height: "80vh",
    //   }}
    // ></Box>
    <Grid container>
      <Grid
        item
        xs={12}
        alignItems={"center"}
        justifyContent={"center"}
        display={"flex"}
        flexDirection={"column"}
        m={0}
        p={0}
        // border={"2px solid crimson"}
      >
        {/* <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            // top: 0,
            // bottom: 0,
            // left: 0,
            background:
              "linear-gradient(0deg, black, transparent, transparent)",
            //border: "2px solid crimson",
          }}
        /> */}
        <img src={hero} style={{ maxWidth: "100%", maxHeight: "80vh" }} />
      </Grid>
      <Grid item xs={12} m={0} p={0}>
        <Paper
          p={3}
          sx={{
            backgroundColor: "black",
            textAlign: "center",
            fontFamily: "zest",
            fontSize: { md: 30, xs: 20 },
            padding: 3,
          }}
          elevation={12}
        >
          <Container maxWidth="lg">
            Zaquurah 42
            <br />
            هي فرقة موسيقية تأسست عام ٢٠٢٠ وتتكون من ٤ أشخاص. تقدم الفرقة الروك
            العراقي بأسلوب فريد يجمع بين العناصر الموسيقية الغربية مثل الجيتار
            والبيانو والطبول، مع الكلمات العراقية والعربية
          </Container>
        </Paper>
      </Grid>
      <Grid item xs={12} mt={3}>
        <Container maxWidth="lg">
          <Grid container>
            <Grid item md={6} xs={12} p={{ md: 2, xs: 1 }}>
              <iframe
                style={{ borderRadius: 12 }}
                src="https://open.spotify.com/embed/track/5nqOjKiRqVz419NELQpfYK?utm_source=generator&theme=0"
                width="100%"
                height="152"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </Grid>
            <Grid item md={6} xs={12} p={{ md: 2, xs: 1 }}>
              <iframe
                style={{ borderRadius: 12 }}
                src="https://open.spotify.com/embed/track/6BOIPwVT7VupN6EUwkwh17?utm_source=generator&theme=0"
                width="100%"
                height="152"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
};

export default HomeScreen;
