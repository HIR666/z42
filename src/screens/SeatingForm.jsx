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
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import seatImg from "../assets/moe_live.png";
import payImg from "../assets/pay.jpg";
import QRCode from "react-qr-code";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const API_BASE = "https://ratback.tdelta.net";

// SEAT MAPS
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

// VIP LOGIC
const isVipSeat = (seat) =>
  seat.startsWith("A") ||
  seat.startsWith("B") ||
  seat.startsWith("K") ||
  seat.startsWith("L");

export default function SeatingForm() {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [reservedSeats, setReservedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [openLightbox, setOpenLightbox] = useState(false);

  const [successModal, setSuccessModal] = useState(false);
  const [ticketCode, setTicketCode] = useState("");
  const [ticketPrice, setTicketPrice] = useState(15000);

  const [form, setForm] = useState({
    name: "",
    phone: "",
  });

  const [copyToast, setCopyToast] = useState({
    open: false,
    message: "",
  });

  const showCopied = (msg) => setCopyToast({ open: true, message: msg });

  const handleFormChange = (field, value) =>
    setForm({ ...form, [field]: value });

  // FETCH RESERVED SEATS
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

  // GENERATE UNIQUE ID
  const generateUniqueId = (seat) => {
    const randStr = Math.random().toString(36).substring(2, 6);
    return `${seat}_${randStr}`;
  };

  // SUBMIT
  const handleSubmit = async () => {
    if (!selectedSeat || !form.name) return;

    const uid = generateUniqueId(selectedSeat);
    setTicketCode(uid);

    const price = isVipSeat(selectedSeat) ? 25000 : 15000;
    setTicketPrice(price);

    setSending(true);

    try {
      await axios.post(`${API_BASE}/api/moelive/reserve`, {
        name: form.name,
        phone: form.phone,
        seat: selectedSeat,
        unique_id: uid,
        price: price,
      });

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

  // SEAT BUTTON (WITH VIP COLOR)
  const SeatButton = ({ seat }) => {
    const vip = isVipSeat(seat);
    const taken = isSeatTaken(seat);

    return (
      <IconButton
        disabled={taken}
        onClick={() => setSelectedSeat(seat)}
        sx={{
          width: 45,
          height: 45,
          borderRadius: 1,
          border: taken ? "1px solid red" : "1px solid #999",
          backgroundColor: taken
            ? "#ffdddd"
            : selectedSeat === seat
            ? "black"
            : vip
            ? "#42cdd7ff" // VIP color
            : "white",
          color: selectedSeat === seat ? "white" : "black",
          "&:hover": {
            backgroundColor: taken
              ? "#ffdddd"
              : selectedSeat === seat
              ? "#333"
              : vip
              ? "#ffe199"
              : "#eee",
          },
        }}
      >
        <Typography variant="body2">{seat}</Typography>
      </IconButton>
    );
  };

  return (
    <Container maxWidth="lg">
      {/* SUCCESS MODAL */}
      <Dialog open={successModal} onClose={() => {}} fullScreen>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            width: "100%",
            maxWidth: "600px",
            margin: "0 auto",
            pt: 4,
          }}
        >
          {/* TITLE */}
          <Typography
            variant="h4"
            sx={{ mb: 3, mt: 1, fontFamily: "zest", width: "100%" }}
          >
            🎟️ تم تثبيت الحجز بنجاح
          </Typography>

          {/* UNIQUE ID */}
          <Typography variant="h6" sx={{ mb: 1, fontFamily: "zest" }}>
            رمز التذكرة الخاص بك:
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "green", fontFamily: "zest" }}
            >
              {ticketCode}
            </Typography>

            <IconButton
              onClick={() => {
                navigator.clipboard.writeText(ticketCode);
                showCopied("تم نسخ رمز التذكرة");
              }}
              sx={{ border: "1px solid #ccc", borderRadius: 1 }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Box>

          {/* QR */}
          <Box sx={{ mb: 3 }}>
            <QRCode value={ticketCode} size={220} />
          </Box>

          {/* PRICE */}
          <Typography
            variant="h5"
            sx={{
              color: "#b30000",
              fontWeight: "bold",
              my: 2,
              fontFamily: "zest",
            }}
          >
            سعر التذكرة: {ticketPrice.toLocaleString()} دينار عراقي
            {ticketPrice === 25000 && " (VIP)"}
          </Typography>

          {/* RED WARNING */}
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
            للدخول. يجب الدفع لتأكيد الحجز، وفي حال عدم الدفع سيتم إلغاء الحجز.
            <br />
            يرجى الرجوع إلى لقطة الشاشة أدناه لتوضيح عملية الدفع.
          </Typography>

          {/* PAYMENT NUMBER */}
          <Typography
            variant="h5"
            sx={{
              mt: 4,
              mb: 1,
              fontWeight: "bold",
              direction: "rtl",
              fontFamily: "zest",
            }}
          >
            للدفع عبر كي:
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Typography
              variant="h6"
              sx={{ direction: "rtl", color: "blue", fontFamily: "zest" }}
            >
              8080655536
            </Typography>

            <IconButton
              onClick={() => {
                navigator.clipboard.writeText("8080655536");
                showCopied("تم نسخ رقم الحساب");
              }}
              sx={{ border: "1px solid #ccc", borderRadius: 1 }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Box>

          {/* PAY QR */}
          <img
            src={payImg}
            alt="pay"
            style={{ width: "80%", maxWidth: 300, marginTop: 10 }}
          />

          {/* PAY GUIDE IMAGE */}
          <img
            src="https://ratback.tdelta.net/public/uzf/1/ktzpnbo4y4/pay_guide.png"
            alt="Payment Guide"
            style={{ width: "90%", marginTop: 25, borderRadius: 10 }}
          />

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 4, px: 5, py: 1.5, fontFamily: "zest" }}
            onClick={() => setSuccessModal(false)}
          >
            إغلاق
          </Button>
        </DialogContent>

        {/* SNACKBAR */}
        <Snackbar
          open={copyToast.open}
          autoHideDuration={2000}
          onClose={() => setCopyToast({ ...copyToast, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            {copyToast.message}
          </Alert>
        </Snackbar>
      </Dialog>

      {/* MAIN PAGE */}
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "zest",
        }}
      >
        <Grid item xs={12} md={10}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h4" mb={1}>
              SEATING RESERVATION
            </Typography>

            <Typography variant="h5" mb={3} sx={{ fontFamily: "zest" }}>
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
              <img src={seatImg} alt="layout" style={{ width: "100%" }} />
            </Dialog>

            <Typography
              variant="h6"
              sx={{ color: "red", mb: 2, fontFamily: "zest" }}
            >
              الرجاء الرجوع إلى الصورة لفهم توزيع اماكن الجلوس
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
            <Typography
              variant="h6"
              mb={2}
              sx={{
                fontFamily: "zest",
                color: "#42cdd7ff",
                direction: "rtl",
                fontWeight: "bold",
              }}
            >
              لون مقاعد الـ VIP
            </Typography>

            {/* SEAT GRID */}
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
