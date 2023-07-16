import React from "react";
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
} from "@mui/material";
import alash from "../assets/ALASH.png";
import moefoe from "../assets/MOEFOE.png";
import bman from "../assets/BMAN.png";
import moeraad from "../assets/MOE_RAAD.png";
import aboutus from "../assets/ABOUTUS.jpg";

const AboutScreen = () => {
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
                textAlign: "right",
                fontSize: { xs: 24, md: 28 },
                fontWeight: 100,
              }}
            >
              <Box style={{ textAlign: "center" }}> (zaquurah 42)</Box>زقورة 42
              <br />
              وقد اخترنا هذا الاسم لأنه يرمز إلى حضارة بلدنا، ونحن مؤمنون بمزج
              العراقة والأصالة مع العصرية والحداثة. والزقورة هي محطة استراحة
              للأله نانا أله القمر، وكانت الزقورة مكان للإحتفال بها سنويًا بعزف
              الموسيقى والرقص، حتى تُبارك الآلهة الارض. وبالنسبة للرقم 42، فهو
              رقم الشارع الذي يقع فيه منزل صديقنا والعضو السابق في الفرقة، ليث
              الصفار.
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} mt={5} alignItems={"center"}>
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

      <div
        style={{
          background:
            "linear-gradient(313deg, #040404, transparent, transparent)",
          borderRadius: 12,
          margin: 0,
          padding: 0,
        }}
      >
        <Grid container mt={6}>
          <Grid
            item
            xs={12}
            md={6}
            textAlign={"right"}
            padding={3}
            sx={{
              fontSize: { lg: 46, md: 40, xs: 30 },
              fontFamily: "zest",
              color: "black",
            }}
          >
            محمد فارس، يبلغ من العمر 28 عامًا، وهو المغني الرئيسي وعازف كيتار
            وبيانو ايضًا. مغني من الطفولة و له في مجال الموسيقى اكثر من 10
            سنوات. يتمنى محمد أن يجد الناس انفسهم في اغاني زقورة ٤٢
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src={moefoe}
              style={{ minHeight: "100%", marginTop: "auto", maxWidth: "100%" }}
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
            textAlign={"right"}
            padding={3}
            sx={{
              fontSize: { lg: 46, md: 40, xs: 30 },
              fontFamily: "zest",
              color: "black",
            }}
          >
            مصطفى رحال، يبلغ من العمر 22 عامًا، وهو عازف البيس كيتار في الفرقة.
            وهو اخر عضو انظم للفرقة بعد ما كان من جمهورها ومتابعيها بكل مكان
            ليصبح اخيرًا العضو الرابع في زقورة ٤٢
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src={bman}
              style={{ minHeight: "100%", marginTop: "auto", maxWidth: "100%" }}
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
            textAlign={"right"}
            padding={3}
            sx={{
              fontSize: { lg: 46, md: 40, xs: 30 },
              fontFamily: "zest",
              color: "black",
            }}
          >
            يوسف علش، يبلغ من العمر 28 عامًا، وهو عازف صولو كيتار في الفرقة.
            يوسف لديه خبرة اكثر من 8 سنوات بالمجال. يعتبر يوسف الموسيقى الشئ
            الوحيد الذي يعطيه الاحساس بالحرية والاستمتاع
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src={alash}
              style={{ minHeight: "100%", marginTop: "auto", maxWidth: "100%" }}
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
            textAlign={"right"}
            padding={3}
            sx={{
              fontSize: { lg: 46, md: 40, xs: 30 },
              fontFamily: "zest",
              color: "black",
            }}
          >
            محمد رعد، يبلغ من العمر 26 عامًا، وهو عازف الدرامز في الفرقة. منذ
            طفولته، كان حلمه أن يصبح عازفًا للدرامز، وتحقق حلمه في عام 2020
            عندما أصبح عضوًا في فرقة زقورة 42
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src={moeraad}
              style={{ minHeight: "100%", marginTop: "auto", maxWidth: "100%" }}
            />
          </Grid>
        </Grid>
      </div>
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
