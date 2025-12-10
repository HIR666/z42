import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  IconButton,
  Button,
  Paper,
  Container,
  Dialog,
  CircularProgress,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import seatImg from "../assets/moe_live.png";
import payImg from "../assets/pay.jpg";
import QRCode from "react-qr-code"; // npm install react-qr-code

// API BASE URL (Laravel backend)
const API_BASE = "https://ratback.tdelta.net";

const leftSection = [
  ["A1", "A2", "A3", "A4"],
  ["B2", "B3", "B4", "B5"],
  ["C1", "C2", "C3", "C4"],
  ["D1", "D2", "D3", "D4"],
  ["E1", "E2", "E3", "E4"],
  ["F1", "F2", "F3", "F4"],
  ["G1", "G2", "G3", "G4"],
  ["H1", "H2", "H3", "H4"],
  ["I1", "I2", "I3", "I4"],
  ["J1", "J2", "J3", "J4"],
];

const rightSection = [
  ["K1", "K2", "K3", "K4", "K5"],
  ["L2", "L3", "L4", "L5", "L6"],
  ["M1", "M2", "M3", "M4", "M5"],
  ["N1", "N2", "N3", "N4", "N5"],
  ["O1", "O2", "O3", "O4", "O5"],
  ["P1", "P2", "P3", "P4", "P5"],
  ["Q1", "Q2", "Q3", "Q4", "Q5"],
  ["R1", "R2", "R3", "R4", "R5"],
  ["S1", "S2", "S3", "S4", "S5"],
  ["T1", "T2", "T3", "T4", "T5"],
];

export default function SeatingForm() {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [reservedSeats, setReservedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [openLightbox, setOpenLightbox] = useState(false);

  // Success modal
  const [successModal, setSuccessModal] = useState(false);
  const [ticketCode, setTicketCode] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
  });

  const handleFormChange = (field, value) =>
    setForm({ ...form, [field]: value });

  // Fetch reserved seats
  const fetchReservations = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/moelive/reservations`);
      const taken = res.data.reservations.map((i) => i.data.seat);
      setReservedSeats(taken);
    } catch (e) {
      console.error("Failed to load reservations", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const isSeatTaken = (seat) => reservedSeats.includes(seat);

  const SeatButton = ({ seat }) => (
    <IconButton
      disabled={isSeatTaken(seat)}
      onClick={() => setSelectedSeat(seat)}
      sx={{
        width: 45,
        height: 45,
        borderRadius: 1,
        border: isSeatTaken(seat) ? "1px solid red" : "1px solid #999",
        backgroundColor:
          selectedSeat === seat
            ? "black"
            : isSeatTaken(seat)
            ? "#ffdddd"
            : "white",
        color: selectedSeat === seat ? "white" : "black",
        cursor: isSeatTaken(seat) ? "not-allowed" : "pointer",
        opacity: isSeatTaken(seat) ? 0.6 : 1,
        "&:hover": {
          backgroundColor: isSeatTaken(seat)
            ? "#ffdddd"
            : selectedSeat === seat
            ? "#333"
            : "#eee",
        },
      }}
    >
      <Typography variant="body2">{seat}</Typography>
    </IconButton>
  );

  // Generate ticket ID
  const generateUniqueId = (seat) => {
    const randStr = Math.random().toString(36).substring(2, 6);
    return `${seat}_${randStr}`;
  };

  // Submit reservation
  const handleSubmit = async () => {
    if (!selectedSeat || !form.name) return;

    const uid = generateUniqueId(selectedSeat);
    setTicketCode(uid);
    setSending(true);

    try {
      await axios.post(`${API_BASE}/api/moelive/reserve`, {
        name: form.name,
        phone: form.phone,
        seat: selectedSeat,
        unique_id: uid,
      });

      // Success → Show ticket modal
      setSuccessModal(true);
      fetchReservations();
      setSelectedSeat(null);
      setForm({ name: "", phone: "" });
    } catch (err) {
      if (err.response?.status === 409) {
        alert("هذا المقعد محجوز مسبقاً. الرجاء اختيار مقعد آخر.");
        fetchReservations();
      } else {
        alert("حدث خطأ أثناء إرسال الحجز. حاول مرة أخرى.");
      }
    } finally {
      setSending(false);
    }
  };

  if (loading)
    return (
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Container maxWidth="lg">
      {/* SUCCESS MODAL */}
      <Dialog open={successModal} onClose={() => {}} fullScreen>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            textAlign: "center",
            width: "100%",
            maxWidth: "600px",
            margin: "0 auto",
            pt: 4, // ***** FIX: pushes content below the title
          }}
        >
          {/* TITLE MOVED INSIDE CONTENT FOR PERFECT CENTERING */}
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              mt: 1,
              width: "100%",
              textAlign: "center",
            }}
          >
            🎟️ تم تثبيت الحجز بنجاح
          </Typography>

          <Typography variant="h6" sx={{ mb: 2 }}>
            رمز التذكرة الخاص بك:
          </Typography>

          <Typography
            variant="h4"
            sx={{ mb: 3, fontWeight: "bold", color: "green" }}
          >
            {ticketCode}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <QRCode value={ticketCode} size={220} />
          </Box>

          <Typography
            variant="h6"
            sx={{
              mt: 2,
              px: 2,
              lineHeight: 1.8,
              direction: "rtl",
              fontFamily: "zest",
              color: "red",
            }}
          >
            الرجاء أخذ لقطة شاشة أو كتابة الكود في مكان آمن، لأنه يعتبر تذكرتك
            للدخول. لن يسمح بالدخول بدون تقديم هذا الرمز.
          </Typography>

          <Typography
            variant="h5"
            sx={{ mt: 4, mb: 1, fontWeight: "bold", direction: "rtl" }}
          >
            للدفع عبر كي:
          </Typography>

          <Typography
            variant="h6"
            sx={{ mb: 2, direction: "rtl", color: "blue" }}
          >
            8080655536
          </Typography>

          <img
            src={payImg}
            alt="pay"
            style={{ width: "80%", maxWidth: 300, marginTop: 10 }}
          />

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 5, px: 5, py: 1.5 }}
            onClick={() => setSuccessModal(false)}
          >
            إغلاق
          </Button>
        </DialogContent>
      </Dialog>

      {/* MAIN PAGE UI */}
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "zest !important",
        }}
      >
        <Grid item xs={12} md={10}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h4" mb={1}>
              SEATING RESERVATION
            </Typography>
            <Typography variant="h5" mb={3}>
              ترتيب الجلوس
            </Typography>

            {/* IMAGE */}
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <img
                src={seatImg}
                alt="layout"
                style={{
                  width: "80%",
                  maxWidth: "350px",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
                onClick={() => setOpenLightbox(true)}
              />
            </Box>

            <Dialog
              open={openLightbox}
              onClose={() => setOpenLightbox(false)}
              maxWidth="md"
            >
              <img
                src={seatImg}
                alt="layout"
                style={{ width: "100%", height: "auto" }}
              />
            </Dialog>

            {/* RED NOTICE */}
            <Typography variant="h6" sx={{ color: "red", mb: 2 }}>
              الرجاء الرجوع إلى الصورة لفهم توزيع الكراسي
            </Typography>

            {/* FORM */}
            <Paper sx={{ p: 3, mb: 4, maxWidth: 400 }}>
              <TextField
                fullWidth
                label="الاسم"
                variant="outlined"
                sx={{ mb: 2 }}
                value={form.name}
                onChange={(e) => handleFormChange("name", e.target.value)}
              />
              <TextField
                fullWidth
                label="رقم الهاتف"
                variant="outlined"
                sx={{ mb: 2 }}
                value={form.phone}
                onChange={(e) => handleFormChange("phone", e.target.value)}
              />
            </Paper>

            {/* SEATING GRID */}
            <Grid container spacing={2} sx={{ justifyContent: "space-around" }}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" mb={1}>
                  Left Section
                </Typography>
                <Grid container spacing={1}>
                  {leftSection.map((row, i) => (
                    <Grid key={i} container item spacing={1}>
                      {row.map((seat) => (
                        <Grid item key={seat}>
                          <SeatButton seat={seat} />
                        </Grid>
                      ))}
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" mb={1}>
                  Right Section
                </Typography>
                <Grid container spacing={1}>
                  {rightSection.map((row, i) => (
                    <Grid key={i} container item spacing={1}>
                      {row.map((seat) => (
                        <Grid item key={seat}>
                          <SeatButton seat={seat} />
                        </Grid>
                      ))}
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 4, py: 1.5, px: 4 }}
              disabled={!selectedSeat || !form.name || sending}
              onClick={handleSubmit}
              fullWidth
            >
              {sending ? "جاري الإرسال..." : "تثبيت الحجز"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
