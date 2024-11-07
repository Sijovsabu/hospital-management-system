const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { ObjectId } = require("mongodb");
const connectDB = require("./config/db");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

let db;
connectDB().then((database) => {
  db = database;
});

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Patients API endpoints
app.get("/patients", async (req, res) => {
  const patients = await db.collection("patients").find().toArray();
  res.json(patients);
});

app.post("/patients", upload.single("photo"), async (req, res) => {
  const patient = { ...req.body, photo: req.file ? req.file.filename : null };
  await db.collection("patients").insertOne(patient);
  res.json({ message: "Patient added successfully" });
});

app.put("/patients/:id", upload.single("photo"), async (req, res) => {
  const id = req.params.id;
  const { _id, ...patient } = req.body;
  if (req.file) {
    patient.photo = req.file.filename;
  }
  await db
    .collection("patients")
    .updateOne({ _id: new ObjectId(id) }, { $set: patient });
  res.json({ message: "Patient updated successfully" });
});

app.delete("/patients/:id", async (req, res) => {
  const id = req.params.id;
  await db.collection("patients").deleteOne({ _id: new ObjectId(id) });
  res.json({ message: "Patient deleted successfully" });
});
// Doctors
app.get("/doctors", async (req, res) => {
  const doctors = await db.collection("doctors").find().toArray();
  res.json(doctors);
});

app.post("/doctors", async (req, res) => {
  const doctor = req.body;
  await db.collection("doctors").insertOne(doctor);
  res.json({ message: "Doctor added successfully" });
});

app.put("/doctors/:id", async (req, res) => {
  const id = req.params.id;
  const { _id, ...doctor } = req.body;
  await db
    .collection("doctors")
    .updateOne({ _id: new ObjectId(id) }, { $set: doctor });
  res.json({ message: "Doctor updated successfully" });
});

app.delete("/doctors/:id", async (req, res) => {
  const id = req.params.id;
  await db.collection("doctors").deleteOne({ _id: new ObjectId(id) });
  res.json({ message: "Doctor deleted successfully" });
});

// Appointments
app.get("/appointments", async (req, res) => {
  const appointments = await db.collection("appointments").find().toArray();
  res.json(appointments);
});

app.post("/appointments", async (req, res) => {
  const appointment = req.body;
  await db.collection("appointments").insertOne(appointment);
  res.json({ message: "Appointment added successfully" });
});

app.delete("/appointments/:id", async (req, res) => {
  const id = req.params.id;
  await db.collection("appointments").deleteOne({ _id: new ObjectId(id) });
  res.json({ message: "Appointment deleted successfully" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
