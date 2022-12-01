require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.js");
const carRoutes = require("./routes/car.js");
const employeeRoutes = require("./routes/employee.js");
const reservationRoutes = require("./routes/reservation.js");
const paymentRoutes = require("./routes/payment.js");

const port = process.env.PORT || 3000;
const app = express();

global.__basedir = __dirname;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/auth", authRoutes);
app.use("/car", carRoutes);
app.use("/employee", employeeRoutes);
app.use("/reservation", reservationRoutes);
app.use("/payment", paymentRoutes);

app.listen(port, () => {
  console.log("Server is running...");
  console.log(`Listening on port ${port}`);
});
