import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Checkbox,
  TextField,
  CircularProgress,
  Container,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import axios from "axios";

const API_BASE = "https://ratback.tdelta.net";

export default function MoeliveAdmin() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState({ open: false, message: "" });

  const showToast = (msg) => setToast({ open: true, message: msg });

  // Fetch all records
  const fetchRecords = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/moelive/all`, {
        params: { search },
      });
      setRecords(res.data.records);
    } catch (e) {
      console.error("Failed to fetch records", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [search]);

  const handleConfirmToggle = async (record, checked) => {
    try {
      await axios.post(`${API_BASE}/api/moelive/confirm`, {
        id: record.id,
        confirmed: checked,
      });
      showToast("تم تحديث حالة التأكيد");
      fetchRecords();
    } catch (e) {
      console.error("Failed to update status", e);
      showToast("خطأ أثناء تحديث الحالة");
    }
  };

  if (loading)
    return (
      <Box textAlign="center" mt={8}>
        <CircularProgress />
      </Box>
    );

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" mb={3} sx={{ fontFamily: "zest" }}>
        لوحة إدارة الحجوزات 🎟️
      </Typography>

      {/* Search Bar */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="بحث بالاسم أو رقم التذكرة أو المقعد..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 4 }}
      />

      {/* Grid of Cards */}
      <Grid container spacing={2}>
        {records.map((rec) => {
          const seat = rec.data?.seat || "---";
          const uniqueId = rec.data?.unique_id || "---";
          const confirmed = rec.data?.confirmed ?? false;
          const phone = rec.data?.phone || "N/A";

          return (
            <Grid item xs={12} sm={6} md={4} key={rec.id}>
              <Card
                sx={{
                  borderLeft: confirmed ? "6px solid green" : "6px solid #ccc",
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontFamily: "zest" }}>
                    {seat}
                  </Typography>

                  <Typography sx={{ fontFamily: "zest" }}>
                    الاسم: {rec.name}
                  </Typography>

                  <Typography sx={{ fontFamily: "zest" }}>
                    رقم التذكرة: {uniqueId}
                  </Typography>

                  <Typography sx={{ fontFamily: "zest" }}>
                    رقم الهاتف: {phone}
                  </Typography>
                  <Button
                    href={`tel:${phone}`}
                    variant="outlined"
                    sx={{ mt: 1 }}
                  >
                    اتصل
                  </Button>

                  <Typography sx={{ fontFamily: "zest" }}>
                    ID: {rec.id}
                  </Typography>

                  <Box mt={2} display="flex" alignItems="center" gap={1}>
                    <Checkbox
                      checked={confirmed}
                      onChange={(e) =>
                        handleConfirmToggle(rec, e.target.checked)
                      }
                    />
                    <Typography sx={{ fontFamily: "zest" }}>
                      تم التأكيد؟
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={2000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success">{toast.message}</Alert>
      </Snackbar>
    </Container>
  );
}
