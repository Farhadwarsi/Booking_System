const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json()); 
app.use(express.static(path.join(__dirname, "public"))); // serve frontend files

// ✅ MongoDB connection (point to your DB)
mongoose.connect(
  "mongodb+srv://farhad_user:mnbvcxz123@database123.blu12gv.mongodb.net/database123?retryWrites=true&w=majority",
  { serverSelectionTimeoutMS: 5000 }
)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Schema
const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true }
});

// ✅ Model
const Booking = mongoose.model("Booking", bookingSchema);

// ✅ Save booking
app.post("/api/bookings", async (req, res) => {
  try {
    console.log("📩 Received booking:", req.body);
    const booking = new Booking(req.body);
    await booking.save();
    res.json({ message: "Booking saved successfully!" });
  } catch (err) {
    console.error("❌ Error saving booking:", err.message);
    res.status(500).json({ error: "Failed to save booking", details: err.message });
  }
});

// ✅ Get all bookings
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    console.error("❌ Error fetching bookings:", err.message);
    res.status(500).json({ error: "Failed to fetch bookings", details: err.message });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
