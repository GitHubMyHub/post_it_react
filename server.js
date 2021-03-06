const express = require("express");
const connectDB = require("./config/db");

const app = express();

const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));

// Connect Database
connectDB();

app.use(express.json({ extended: false }));

//app.get("/", (req, res) => res.send({ msg: "Service ist online" }));

// Define Routes
app.use("/api/receipt", require("./routes/receipt"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
